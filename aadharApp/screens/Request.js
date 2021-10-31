import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-elements';
import RequestList from '../components/RequestList';
import ForeGroundNotify from '../components/Foreground';

const Request = props => {
  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Request History...</Text>
      <RequestList />
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.button}
          title="Request Address Update"
          onPress={() => {
            props.navigation.navigate('NewRequest');
          }}
        />
      </View>
      <ForeGroundNotify />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    height: '100%',
    backgroundColor: 'white',
  },
  buttonContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  header: {
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 30,
    paddingTop: 30,
    paddingBottom: 0,
    paddingRight: 0,
    fontSize: 24,
  },
  button: {
    width: 200,
    backgroundColor: 'tomato',
  },
});

export default Request;
