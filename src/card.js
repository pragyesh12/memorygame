import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
const {width} = Dimensions.get('window');

export default function Card({isOpen, isDisable, value, onPress}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={isDisable}>
      <View
        style={[
          styles.container,
          isDisable ? {backgroundColor: 'pink'} : null,
        ]}>
        {isOpen ? <Text style={styles.text}>{value}</Text> : <Text></Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: width / 4,
    width: width / 4 - 20,
    backgroundColor: 'purple',
    marginBottom: 10,
    elevation: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {fontSize: 25, fontWeight: '700', color: '#fff'},
});
