import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-elements';
import ForeGroundNotify from '../components/Foreground';

const Request = props => {
  return (
    <View style={styles.screen}>
      <Text>Request Screen</Text>
      <Button buttonStyle={styles.button} title="Request" />
      <ForeGroundNotify />
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

export default Request;
