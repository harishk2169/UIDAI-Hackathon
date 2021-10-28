import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Component = props => {
  return (
    <View style={styles.container}>
      <Text>This is a dummy Component!!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Dimensions;
