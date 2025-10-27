import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { globalStyles } from '../styles/globalStyles';

interface DateInputProps {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  style?: object;
}

export default function DateInput({
  value,
  onChange,
  placeholder = 'Seleccionar fecha',
  style,
}: DateInputProps) {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) onChange(selectedDate);
  };

  return (
    <View style={[styles.inputContainer, style]}>
      <TouchableOpacity
        style={[styles.touchArea, globalStyles.input]}  // Aseguramos que se mantenga consistente
        onPress={() => setShowPicker(true)}
      >
        <Text style={value ? styles.dateText : globalStyles.placeholderText}>
          {value ? value.toLocaleDateString('es-CR') : placeholder}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',  // Aseguramos que ocupe todo el ancho
    marginBottom: 12,
  },
  touchArea: {
    flex: 1,
    paddingVertical: 12,  // Añadimos padding vertical similar al de los demás inputs
    paddingHorizontal: 12,  // Añadimos padding horizontal para mantener consistencia
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    backgroundColor: '#1B0000',
    height: 53,
  },
  dateText: {
    color: '#fff',
  },
});
