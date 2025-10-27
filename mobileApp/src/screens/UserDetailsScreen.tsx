import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
  Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardingStackParamList } from "../navigation/OnboardingStack";
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateInput from '../components/DateInput';
import { globalStyles } from '../styles/globalStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { BACKEND_URL } from '@env';
import auth from '@react-native-firebase/auth';
import { useAuth } from '../context/AuthContext';

type NavProp = NativeStackNavigationProp<OnboardingStackParamList, "UserDetails">;

export default function UserDetailsScreen({ navigation }: { navigation: NavProp }) {
  const { user } = useAuth();

  const [name, setName] = useState('');
  const [lastName1, setLastName1] = useState('');
  const [lastName2, setLastName2] = useState('');
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isAdult, setIsAdult] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [open, setOpen] = useState(false);
  const [idTypeOptions, setIdTypeOptions] = useState([
    { label: 'Cédula', value: 'ID' },
    { label: 'DIMEX', value: 'DIMEX' },
    { label: 'Pasaporte', value: 'Passport' }
  ]);
  // Pantalla temporal mientras no haya usuario cargado
  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando usuario...</Text>
      </View>
    );
  }

  // Validación de campos
  // Función auxiliar para capitalizar nombres
  const capitalizeWords = (text: string) =>
    text
      .toLowerCase()
      .replace(/\b\p{L}/gu, (c) => c.toUpperCase());

  // Validación de campos
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    // Nombre y apellidos
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (!name.trim()) newErrors.name = 'Nombre requerido';
    else if (!nameRegex.test(name)) newErrors.name = 'El nombre solo puede contener letras';
    else setName(capitalizeWords(name));

    if (!lastName1.trim()) newErrors.lastName1 = 'Primer apellido requerido';
    else if (!nameRegex.test(lastName1)) newErrors.lastName1 = 'Solo letras permitidas';
    else setLastName1(capitalizeWords(lastName1));

    if (!lastName2.trim()) newErrors.lastName2 = 'Segundo apellido requerido';
    else if (!nameRegex.test(lastName2)) newErrors.lastName2 = 'Solo letras permitidas';
    else setLastName2(capitalizeWords(lastName2));

    // Tipo de identificación
    if (!idType) newErrors.idType = 'Seleccione tipo de identificación';

    // Número de identificación según tipo
    if (!idNumber.trim()) newErrors.idNumber = 'Identificación requerida';
    else if (idType === 'ID' && !/^[1-9][0-9]{8}$/.test(idNumber))
      newErrors.idNumber = 'Ingrese una cédula válida';
    else if (idType === 'DIMEX' && !/^[0-9]{12}$/.test(idNumber))
      newErrors.idNumber = 'DIMEX debe tener 12 dígitos numéricos';
    else if (idType === 'Passport' && !/^[A-Za-z0-9]{6,20}$/.test(idNumber))
      newErrors.idNumber = 'Pasaporte inválido';

    // Teléfono
    if (!phone.trim()) newErrors.phone = 'Celular requerido';
    else if (!/^[0-9]{8}$/.test(phone))
      newErrors.phone = 'El número debe tener 8 dígitos';

    // Fecha de nacimiento
    if (!birthDate) newErrors.birthDate = 'Fecha de nacimiento requerida';

    // Mayor de edad
    if (!isAdult) {
      newErrors.isAdult = 'Debe confirmar que es mayor de 18 años';
      Alert.alert('Aviso', 'Debes ser mayor de 18 años para continuar.');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    if (!user || user.role === 'guest') {
      Alert.alert('Error', 'Usuario no válido');
      return;
    }

    try {
      const idToken = await auth().currentUser?.getIdToken();

      await axios.put(
        `${BACKEND_URL}/api/users/${user.uid}`,
        {
          firstName: capitalizeWords(name),
          lastName: capitalizeWords(lastName1),
          secondLastName: capitalizeWords(lastName2),
          idType,
          idNumber,
          phone,
          birthDate: birthDate?.toISOString().split('T')[0],
          isOver18: isAdult,
        },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      Alert.alert('Éxito', 'Información guardada correctamente');
      navigation.navigate('Location');
    } catch (err: any) {
      console.error(err);
      Alert.alert('Error', 'No se pudo guardar la información');
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" nestedScrollEnabled={true}>
      <Text style={styles.title}>Completa tu información de contacto</Text>

      {/* Foto de perfil */}
      <View style={styles.profileContainer}>
        <Icon name="person-add" size={70} color="#fff" style={styles.profileImage} />
        <TouchableOpacity style={styles.uploadBtn}>
          <Text style={styles.uploadText}>+ Cargar foto de perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Nombre */}
      <View style={styles.inputGroupFullWidth}>
        <Text style={globalStyles.label}>Nombre</Text>
        <TextInput
          style={[globalStyles.input, styles.fullWidthInput]}
          placeholder="Nombre*"
          placeholderTextColor={globalStyles.placeholderText.color}
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}
      </View>

      {/* Apellidos */}
      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={globalStyles.label}>Primer apellido</Text>
          <TextInput
            style={[globalStyles.input, styles.halfInput]}
            placeholder="Primer apellido*"
            placeholderTextColor={globalStyles.placeholderText.color}
            value={lastName1}
            onChangeText={setLastName1}
          />
          {errors.lastName1 && <Text style={styles.error}>{errors.lastName1}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={globalStyles.label}>Segundo apellido</Text>
          <TextInput
            style={[globalStyles.input, styles.halfInput]}
            placeholder="Segundo apellido*"
            placeholderTextColor={globalStyles.placeholderText.color}
            value={lastName2}
            onChangeText={setLastName2}
          />
          {errors.lastName2 && <Text style={styles.error}>{errors.lastName2}</Text>}
        </View>
      </View>

      {/* Tipo y número de identificación */}
      <View style={[styles.row, { zIndex: open ? 1000 : 1 }]}>
  <View style={styles.inputGroup}>
    <Text style={globalStyles.label}>Tipo de identificación</Text>
    <DropDownPicker
      open={open}
      value={idType}
      items={idTypeOptions}
      setOpen={setOpen}
      setValue={setIdType}
      setItems={setIdTypeOptions}
      placeholder="Selecciona tipo de identificación"
      placeholderStyle={{ color: '#aaa' }}
      style={styles.dropdown}
      textStyle={{ color: '#fff' }}
      dropDownContainerStyle={styles.dropdownContainer}
      listItemLabelStyle={{ color: '#fff' }}
      ArrowDownIconComponent={() => (
        <Icon name="arrow-drop-down" size={24} color="#fff" />
      )}
      ArrowUpIconComponent={() => (
        <Icon name="arrow-drop-up" size={24} color="#fff" />
      )}
      TickIconComponent={() => (
        <Icon name="check" size={20} color="#fff" />
      )}
      zIndex={1000}
    />
    {errors.idType && <Text style={styles.error}>{errors.idType}</Text>}
  </View>

  <View style={styles.inputGroup}>
    <Text style={globalStyles.label}>Identificación</Text>
    <TextInput
      style={[globalStyles.input, styles.halfInput]}
      placeholder="Identificación*"
      placeholderTextColor="#aaa"
      value={idNumber}
      onChangeText={setIdNumber}
    />
    {errors.idNumber && <Text style={styles.error}>{errors.idNumber}</Text>}
  </View>
</View>


      {/* Celular y fecha de nacimiento */}
      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={globalStyles.label}>Celular</Text>
          <TextInput
            style={[globalStyles.input, styles.halfInput]}
            placeholder="Celular*"
            placeholderTextColor={globalStyles.placeholderText.color}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={globalStyles.label}>Fecha de nacimiento</Text>
          <DateInput
            value={birthDate}
            onChange={setBirthDate}
            placeholder="Fecha de nacimiento*"
            style={styles.halfInput}
          />
          {errors.birthDate && <Text style={styles.error}>{errors.birthDate}</Text>}
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={birthDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setBirthDate(date);
          }}
        />
      )}

      {/* Checkbox */}
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isAdult}
          onValueChange={setIsAdult}
          tintColors={{ true: '#fff', false: '#fff' }}
        />
        <Text style={styles.checkboxLabel}>Confirmo que soy mayor de 18 años</Text>
      </View>
      {errors.isAdult && <Text style={styles.error}>{errors.isAdult}</Text>}

      {/* Botón */}
      <TouchableOpacity style={styles.addLocationBtn} onPress={handleSubmit}>
        <Text style={styles.addLocationText}>Continuar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("MainTabs")}>
        <Text style={styles.skipText}>Completar después</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B0000',
    padding: 20,
    marginTop: Platform.OS === 'ios' ? 50 : 20,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1B0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  uploadBtn: {
    marginTop: 8,
    padding: 6,
  },
  uploadText: {
    color: '#fff',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    flexWrap: 'wrap',
    zIndex: 1,
  },
  inputGroup: {
    marginBottom: 12,
    width: '48%',
  },
  inputGroupFullWidth: {
    marginBottom: 12,
    width: '100%',
  },
  fullWidthInput: {
    width: '100%',
  },
  halfInput: {
    width: '100%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxLabel: {
    color: '#fff',
    marginLeft: 6,
  },
  addLocationBtn: {
    backgroundColor: '#00BFD8',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  addLocationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipText: {
    textAlign: 'center',
    color: '#00BFD8',
    fontSize: 14,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
  dropdown: {
  backgroundColor: '#1B0000',
  borderColor: '#fff',
  borderRadius: 6,
  paddingHorizontal: 10,
  zIndex: 1000, // Elevarlo para evitar conflictos visuales
},
dropdownContainer: {
  backgroundColor: '#1B0000',
  borderColor: '#fff',
  zIndex: 1000,
},

});
