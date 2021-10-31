import React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import {Button} from 'react-native-elements';
import * as Keychain from 'react-native-keychain';
import isRegistered from '../utils/isRegistered';

import logo from '../assets/logo.jpg';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const GetStarted = props => {
  const navigate = async () => {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const alreadyRegistered = await isRegistered(credentials.username);
      if (alreadyRegistered) {
        props.navigation.replace('Home');
        return;
      }
    }
    props.navigation.replace('Login');
  };
  return (
    <View style={styles.screen}>
      <Image source={logo} style={styles.image} />
      <Button
        buttonStyle={styles.button}
        title="Get Started"
        onPress={navigate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    width: 200,
    backgroundColor: 'tomato',
  },
  image: {
    width: (3 * width) / 4,
    height: (2 * height) / 9,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

export default GetStarted;
