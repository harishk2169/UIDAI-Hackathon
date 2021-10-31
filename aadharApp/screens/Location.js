import axios from 'axios';
import React, {useState} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import URL from '../constants/URL';

const {accessTokenAPI, textSearchAPI, geoCodeAPI, distanceMatrix} = URL;

const clientID =
  '33OkryzDZsLy_YhZ2CNxEhE_xSgTdqe9rFUeUrRL7wLbaSAdAUNJQle-d8961zFPIkXR4ae-Fe3EIRvt481BMQ==';
const clientSecret =
  'lrFxI-iSEg-zpBqz_PjrF0bqKGfluBaHa0yudiJxLWl5ulhsxq7FjwYahRb5LYuJ6ISEIsaNhtkHubO9jsGqRXr1SPB97EH3';

const data = {
  co: 'S/O Ved Parkash',
  country: 'India',
  dist: 'Jalandhar',
  loc: 'National Avenue',
  pc: '144023',
  state: 'Punjab',
  street: 'Street No. 6',
  vtc: 'Jalandhar -II',
};

const userdata = {
  co: 'S/O Ved Parkash',
  country: 'India',
  dist: 'Jalandhar',
  loc: 'National Avenue',
  pc: '144023',
  state: 'Punjab',
  street: 'Street No. 6',
  vtc: 'Jalandhar -II',
  'House No.': '242',
};

const convert_to_single_string = dat => {
  var address = '';
  Object.keys(dat).map(key => {
    address += dat[key] + ' ';
  });
  return address;
};

//   function to get token
const get_Token = async setAccessToken => {
  try {
    const resp = await axios.post(
      accessTokenAPI + `client_id=${clientID}&client_secret=${clientSecret}`,
    );
    setAccessToken(resp.data.access_token);
  } catch (err) {
    showMessage({
      message: 'Failure Token',
      description: 'Internal Error',
      type: 'danger',
    });
  }
};

const get_eloc = async (address, setLandLordEloc, accessToken) => {
  try {
    const resp = await axios.get(geoCodeAPI + address, {
      headers: {authorization: `bearer ${accessToken}`},
    });
    setLandLordEloc(resp.data.copResults.eLoc);
  } catch (err) {
    showMessage({
      message: 'Failure Landlord ELoc',
      description: 'Internal Error',
      type: 'danger',
    });
  }
};

//   get all the possible address of the user
const get_user_eloc = async (address, setUserEloc, accessToken) => {
  try {
    const resp = await axios.get(textSearchAPI + address, {
      headers: {authorization: `bearer ${accessToken}`},
    });
    var temp_arr = [];
    resp.data.suggestedLocations.map(key => {
      temp_arr.push(key.eLoc);
    });
    setUserEloc(temp_arr);
  } catch (err) {
    showMessage({
      message: 'Failure user ELoc',
      description: 'Internal Error',
      type: 'danger',
    });
    console.log(err);
  }
};

// get distance between two eLoc

const distance = (x, y) => Math.sqrt(x * x + y * y);

const get_min_dist = async (userEloc, landlordEloc, setMinDist) => {
  var possible_address = [];
  var dist_arr = [];
  userEloc.map(key => {
    possible_address.push(`${landlordEloc}%3B${key}`);
  });
  try {
    await Promise.all(
      possible_address.map(async key => {
        const resp = await axios.get(distanceMatrix + key);
        dist_arr.push(resp.data.results.distances[0]);
      }),
    );
  } catch (err) {
    console.log(err);
  }
  var minD = 100000;

  dist_arr.map(key => {
    var x = distance(key[0], key[1]);
    if (x < minD) {
      minD = x;
    }
  });

  setMinDist(minD);
};

const Location = () => {
  const [accessToken, setAccessToken] = useState();
  const [landlordEloc, setLandLordEloc] = useState();
  const [userEloc, setUserEloc] = useState([]);
  const [minDist, setMinDist] = useState();
  const landLordAddress = convert_to_single_string(data);
  const userAddress = convert_to_single_string(userdata);

  //   consvert string to formatted address

  //   console.log(userEloc);

  return (
    <View style={styles.screen}>
      <Text>{accessToken}</Text>
      <Button
        title="token"
        onPress={() => {
          get_Token(setAccessToken);
        }}
      />
      <Button
        title="landlord eloc"
        onPress={() => {
          get_eloc(landLordAddress, setLandLordEloc, accessToken);
        }}
      />
      <Button
        title="user eLoc"
        onPress={() => {
          get_user_eloc(userAddress, setUserEloc, accessToken);
        }}
      />
      <Button
        title="Min Dist"
        onPress={() => {
          get_min_dist(userEloc, landlordEloc, setMinDist);
        }}
      />

      {console.log(minDist)}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default Location;
