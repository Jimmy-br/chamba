import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../navigation/OnboardingStack';
import { globalStyles } from '../styles/globalStyles';
import auth from '@react-native-firebase/auth';
import { useAuth } from '../context/AuthContext';
import { BACKEND_URL } from '@env';
import { locations, LocationsType } from '../data/locations';

type NavProp = NativeStackNavigationProp<OnboardingStackParamList, 'Location'>;

export default function LocationScreen() {
  const navigation = useNavigation<NavProp>();
  const { user } = useAuth();

  const [province, setProvince] = useState('');
  const [canton, setCanton] = useState('');
  const [district, setDistrict] = useState('');
  const [exactAddress, setExactAddress] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Estados para DropDownPicker
  const [openProvince, setOpenProvince] = useState(false);
  const [openCanton, setOpenCanton] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);

  const [provinceOptions, setProvinceOptions] = useState(
    Object.keys(locations).map((prov) => ({ label: prov, value: prov }))
  );
  const [cantonOptions, setCantonOptions] = useState<{ label: string; value: string }[]>([]);
  const [districtOptions, setDistrictOptions] = useState<{ label: string; value: string }[]>([]);

  // Actualizar cantones al cambiar provincia
  useEffect(() => {
    if (province) {
      const cantons = Object.keys(locations[province as keyof LocationsType]);
      setCantonOptions(cantons.map((c) => ({ label: c, value: c })));
      setCanton('');
      setDistrict('');
      setDistrictOptions([]);
    }
  }, [province]);

  // Actualizar distritos al cambiar cantón
  useEffect(() => {
    if (province && canton) {
      const districts = locations[province as keyof LocationsType][canton] ?? [];
      setDistrictOptions(districts.map((d) => ({ label: d, value: d })));
      setDistrict('');
    }
  }, [province, canton]); 

  //Validación de campos
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!province) newErrors.province = 'Seleccione una provincia';
    if (!canton) newErrors.canton = 'Seleccione un cantón';
    if (!district) newErrors.district = 'Seleccione un distrito';
    if (!exactAddress.trim()) newErrors.exactAddress = 'Ingrese su dirección exacta';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Envío al backend
  const handleSubmit = async () => {
    if (!validate()) return;  
    if (!user || user.role === 'guest') {
      Alert.alert('Error', 'Usuario no válido');
      return;
    }

    try {
      const idToken = await auth().currentUser?.getIdToken();
      await axios.put(
        `${BACKEND_URL}/api/users/${user.uid}/location`,
        { province, canton, district, exactAddress },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      Alert.alert('Éxito', 'Ubicación guardada correctamente');
      navigation.navigate('MainTabs');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo guardar la ubicación');
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" nestedScrollEnabled>
      <Text style={styles.title}>¿Dónde necesitas el servicio?</Text>
      <Text style={styles.subtitle}>
        Usaremos esta información para conectarte con trabajadores en tu zona
      </Text>

      {/* Provincia */}
      <View style={[styles.inputGroup, { zIndex: openProvince ? 3000 : 1 }]}>
        <Text style={globalStyles.label}>Provincia</Text>
        <DropDownPicker
          open={openProvince}
          value={province}
          items={provinceOptions}
          setOpen={setOpenProvince}
          setValue={setProvince}
          setItems={setProvinceOptions}
          placeholder="Seleccione una provincia"
          placeholderStyle={{ color: '#aaa' }}
          style={styles.dropdown}
          textStyle={{ color: '#fff' }}
          dropDownContainerStyle={styles.dropdownContainer}
          listItemLabelStyle={{ color: '#fff' }}
          ArrowDownIconComponent={() => <Icon name="arrow-drop-down" size={24} color="#fff" />}
          ArrowUpIconComponent={() => <Icon name="arrow-drop-up" size={24} color="#fff" />}
          TickIconComponent={() => <Icon name="check" size={20} color="#fff" />}
        />
        {errors.province && <Text style={styles.error}>{errors.province}</Text>}
      </View>

      {/* Cantón */}
      <View style={[styles.inputGroup, { zIndex: openCanton ? 2000 : 1 }]}>
        <Text style={globalStyles.label}>Cantón</Text>
        <DropDownPicker
          open={openCanton}
          value={canton}
          items={cantonOptions}
          setOpen={setOpenCanton}
          setValue={setCanton}
          setItems={setCantonOptions}
          placeholder="Seleccione un cantón"
          placeholderStyle={{ color: '#aaa' }}
          style={styles.dropdown}
          textStyle={{ color: '#fff' }}
          dropDownContainerStyle={styles.dropdownContainer}
          listItemLabelStyle={{ color: '#fff' }}
          ArrowDownIconComponent={() => <Icon name="arrow-drop-down" size={24} color="#fff" />}
          ArrowUpIconComponent={() => <Icon name="arrow-drop-up" size={24} color="#fff" />}
          TickIconComponent={() => <Icon name="check" size={20} color="#fff" />}
          disabled={!province}
        />
        {errors.canton && <Text style={styles.error}>{errors.canton}</Text>}
      </View>

      {/* Distrito */}
      <View style={[styles.inputGroup, { zIndex: openDistrict ? 1000 : 1 }]}>
        <Text style={globalStyles.label}>Distrito</Text>
        <DropDownPicker
          open={openDistrict}
          value={district}
          items={districtOptions}
          setOpen={setOpenDistrict}
          setValue={setDistrict}
          setItems={setDistrictOptions}
          placeholder="Seleccione un distrito"
          placeholderStyle={{ color: '#aaa' }}
          style={styles.dropdown}
          textStyle={{ color: '#fff' }}
          dropDownContainerStyle={styles.dropdownContainer}
          listItemLabelStyle={{ color: '#fff' }}
          ArrowDownIconComponent={() => <Icon name="arrow-drop-down" size={24} color="#fff" />}
          ArrowUpIconComponent={() => <Icon name="arrow-drop-up" size={24} color="#fff" />}
          TickIconComponent={() => <Icon name="check" size={20} color="#fff" />}
          disabled={!canton}
        />
        {errors.district && <Text style={styles.error}>{errors.district}</Text>}
      </View>

      {/* Dirección exacta */}
      <Text style={globalStyles.label}>Ubicación exacta</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Escribe tu dirección exacta"
        placeholderTextColor={globalStyles.placeholderText.color}
        value={exactAddress}
        onChangeText={setExactAddress}
        multiline
      />
      {errors.exactAddress && <Text style={styles.error}>{errors.exactAddress}</Text>}

      {/* Botón */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}>
        <Text style={styles.saveText}>Continuar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('MainTabs')}>
        <Text style={styles.skipText}>Completar después</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        <Text style={styles.noteBold}>Importante: </Text>
        Tu ubicación solo será visible para los trabajadores que contrates. No se compartirá públicamente.
      </Text>
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
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#bbb',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 12,
    width: '100%',
  },
  dropdown: {
    backgroundColor: '#1B0000',
    borderColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  dropdownContainer: {
    backgroundColor: '#1B0000',
    borderColor: '#fff',
  },
  saveBtn: {
    backgroundColor: '#00BFD8',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipText: {
    textAlign: 'center',
    color: '#00BFD8',
    fontSize: 14,
    marginBottom: 20,
  },
  note: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'center',
  },
  noteBold: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
});
