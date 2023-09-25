import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Color, FontSize, Height, fontEm } from '../GlobalStyles';
import { Ionicons } from '@expo/vector-icons';

const Checkbox = ({ children, checked, onChange }) => {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <TouchableOpacity onPress={handleToggle} style={styles.checkbox}>
      {checked &&
        < Ionicons style={styles.checkMark} name={"checkmark"} size={Height.hi_s} color={Color.darkcyan} />
      }
      <View style={styles.checkboxIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkboxIcon: {
    width: Height.hi_s,
    height: Height.hi_s,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.darkgray,
    margin: 10,
  },
  checkboxLabel: {
    fontSize: FontSize.size_base,
  },
  checkMark: {
    position: "absolute",
    right: 10
  }
});

export default Checkbox;
