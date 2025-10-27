import { StyleSheet } from 'react-native';

export const colors = {
  background: '#1B0000',
  primary: '#00bcd4',
  text: '#fff',
  placeholder: '#aaa',
  border: '#fff',
};

export const globalStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 15,
  },
  inputWithIcon: {
    flex: 1,
    padding: 10,
    color: colors.text,
  },
    label: {
    color: '#fff',
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
  },
    placeholderText: {
    color: colors.placeholder,
  },
});
