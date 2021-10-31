import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-elements';
import ReceivedList from '../components/ReceivedList';

const Received = props => {
  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Received Requests...</Text>
      <ReceivedList />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    height: '100%',
    backgroundColor: 'white',
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
});

export default Received;
