import React, {useState} from 'react';
import RSAKey from 'react-native-rsa';
import CryptoJS from 'crypto-js';

import * as Keychain from 'react-native-keychain';
import {View, StyleSheet, Text} from 'react-native';
import {Button, Input} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';

const GeneratePIN = props => {
  const {UID} = props.route.params;
  const [PIN, setPIN] = useState();
  const [confirmPIN, setConfirmPIN] = useState();

  const numParser = inputText => {
    setPIN(inputText.replace(/[^0-9]/g, ''));
  };
  const numParser2 = inputText => {
    setConfirmPIN(inputText.replace(/[^0-9]/g, ''));
  };

  const reset = () => {
    setPIN('');
    setConfirmPIN('');
  };

  const GeneratePIN = async () => {
    try {
      console.log(PIN);
      console.log(confirmPIN);
      if (PIN.length < 6) throw new Error('PIN must be contain 6 digits');
      if (PIN !== confirmPIN) throw new Error('PIN do not match');

      const bits = 1024;
      const exponent = '10001'; // must be a string
      var rsa = new RSAKey();

      rsa.generate(bits, exponent);
      var publicKey = JSON.stringify(rsa.getPublicString()); // return json encoded string
      var privateKey = JSON.stringify(rsa.getPrivateString()); // return json encoded string

      console.log('PK', publicKey);
      console.log('SK', privateKey);

      // The encrypted version of private key is stored on DB
      // PIN isn' stored on the DB

      var encryptedSK = CryptoJS.AES.encrypt(privateKey, PIN);
      encryptedSK = encryptedSK.toString();

      // console.log('encrypted text', encryptedSK);
      // var bytes = CryptoJS.AES.decrypt(encryptedSK, PIN);
      // var plaintext = bytes.toString(CryptoJS.enc.Utf8);

      await firestore().collection('users').doc(UID).set({
        pK: publicKey,
        sK: encryptedSK,
        token: '',
      });

      //   Private is stored on the device in secure storage
      await Keychain.setGenericPassword(UID, privateKey);

      // TODO:  To remove later, For testing purposes
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log(
          'Credentials successfully loaded for user ' +
            credentials.username +
            ' ' +
            credentials.password,
        );
      } else {
        console.log('No credentials stored');
      }
      //END

      props.navigation.replace('Home');
    } catch (err) {
      console.log(err);
      reset();
      showMessage({
        message: 'Error',
        description: err.message,
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.screen}>
      <Input
        placeholder="Enter 6 digit PIN"
        label="New PIN"
        maxLength={6}
        onChangeText={val => {
          numParser(val);
        }}
        keyboardType="phone-pad"
      />
      <Input
        placeholder="Enter 6 digit PIN"
        label="Confirm PIN"
        maxLength={6}
        onChangeText={val => {
          numParser2(val);
        }}
        keyboardType="phone-pad"
      />
      <Button
        buttonStyle={styles.button}
        title="Confirm"
        onPress={GeneratePIN}
      />
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
  },
});

export default GeneratePIN;
