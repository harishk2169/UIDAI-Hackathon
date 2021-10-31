import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-elements';

const Received = props => {
  return (
    <View style={styles.screen}>
      <Text>Received Screen</Text>
      <Button buttonStyle={styles.button} title="Received" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    width: 200,
    backgroundColor: 'tomato',
  },
});

export default Received;
