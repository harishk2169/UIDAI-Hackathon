import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-elements';

const Login = props => {
  return (
    <View style={styles.screen}>
      <Text>Login Screen</Text>
      <Button
        buttonStyle={styles.button}
        title="Login"
        onPress={() => props.navigation.navigate('Home')}
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

export default Login;
