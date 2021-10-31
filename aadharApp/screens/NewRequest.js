import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import Input from 'react-native-input-style';

const NewRequest = () => {
  const [aadhar, setAadhar] = useState('');
  const [pin, setPin] = useState('');
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
          onPress={() => {
            console.log('clicked');
          }}
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
