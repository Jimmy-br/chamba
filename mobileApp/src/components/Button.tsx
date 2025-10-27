import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../styles/globalStyles';

type Props = {
  title: string;
  onPress: () => void;  
  disabled?: boolean;
  style?: ViewStyle;
};

export default function Button({ title, onPress, disabled, style }: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && { opacity: 0.6 }, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 16,
  },
});
