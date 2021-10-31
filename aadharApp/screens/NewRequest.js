import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

import * as Keychain from 'react-native-keychain';
import {showMessage} from 'react-native-flash-message';
import Input from 'react-native-input-style';

const NewRequest = props => {
  const [aadhar, setAadhar] = useState('');
  const [pin, setPin] = useState('');
  const onSubmit = async () => {
    try {
      if (aadhar.length < 12 || pin.length < 6)
        throw new Error('Input not formatted properly');
      const credentials = await Keychain.getGenericPassword();
      var doc = {
        recipient: aadhar,
        sender: credentials.username,
        address: '',
        finalAddress: '',
        status: 0,
      };
      await firestore().collection('requests').add(doc);
      showMessage({
        message: 'Success',
        description: 'Requested Address Successfully',
        type: 'danger',
      });
      setTimeout(() => props.navigation.pop(), 5000);
    } catch (err) {
      showMessage({
        message: 'Error',
        description: err.message,
        type: 'Success',
      });
    }
  };
  return (
    <View style={styles.screen}>
      <Input
        autofocus
        id="Phone"
        keyboardType="phone-pad"
        labelStyle={{color: 'tomato'}}
        outlined
        minLength={12}
        maxLength={12}
        label="Aadhar Number"
        initialValue={aadhar}
        onInputChange={(s, e, t) => {
          setAadhar(e);
        }}
        errorText="Aadhar number should be 12 digit."
        borderColor="tomato"
        fontSize={20}
      />
      <Input
        id="pin"
        label="Enter Pin"
        labelStyle={{color: 'tomato'}}
        keyboardType="phone-pad"
        secureTextEntry
        required
        fontSize={20}
        minLength={6}
        maxLength={6}
        errorText="PIN should be 6 digit."
        onInputChange={(s, e, t) => {
          console.log(s, e, t);
          setPin(e);
        }}
        outlined
        initialValue=""
      />
      <View style={styles.ButtonContainer}>
        <Button
          title="Send Request"
          raised
          buttonStyle={styles.button}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 70,
    paddingLeft: 0,
    backgroundColor: 'white',
  },
  ButtonContainer: {
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  button: {
    width: 150,
    backgroundColor: 'tomato',
  },
});

export default NewRequest;
