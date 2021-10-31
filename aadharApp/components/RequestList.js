import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Badge, ListItem, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

// const data = [
//   {
//     address: 'wfgdd439w0epodedjnkvf',
//     finalAddress: 'hdmmfdakjas',
//     recipient: '54612298123',
//     sender: '43567890',
//     status: 0,
//   },
//   {
//     address: 'wfgdd439w0epodedjnkvf',
//     finalAddress: 'hdmmfdakjas',
//     recipient: '98772789032',
//     sender: '43567890',
//     status: 0,
//   },
//   {
//     address: 'wfgdd439w0epodedjnkvf',
//     finalAddress: 'hdmmfdakjas',
//     recipient: '43512789032',
//     sender: '43567890',
//     status: 1,
//   },
//   {
//     address: 'wfgdd439w0epodedjnkvf',
//     finalAddress: 'hdmmfdakjas',
//     recipient: '745412789032',
//     sender: '43567890',
//     status: 2,
//   },
// ];

const getStatus = code => {
  if (code == 0) return 'Pending';
  else if (code == 1) return 'Accepted';
  else return 'Rejected';
};

const RequestList = ({navigation}) => {
  const [requests, setRequests] = useState([]);
  const getData = async () => {
    const reqs = await firestore()
      .collection('requests')
      .where('sender', '==', '999909223753')
      .get();
    reqs.docs.forEach(item => {
      setRequests([...requests, item.data()]);
    });
  };
  useEffect(() => {
    getData();
    console.log(requests);
  }, []);
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {requests.map((req, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.listItem}
            onPress={() => alert('This will show request')}>
            <ListItem bottomDivider>
              <View>
                <Avatar
                  rounded
                  source={{
                    uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                  }}
                  size="medium"
                />
                <Badge
                  status={
                    req.status === 0
                      ? 'error'
                      : req.status === 1
                      ? 'success'
                      : 'warning'
                  }
                  containerStyle={{position: 'absolute', top: -4, right: -4}}
                />
              </View>
              <ListItem.Content>
                <ListItem.Title>{req.recipient}</ListItem.Title>
                <ListItem.Subtitle>{getStatus(req.status)}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: '100%',
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: '40%',
      height: '30%',
    },
  },
  padding: {
    fontSize: 18,
    fontWeight: 300,
    padding: 20,
  },
});

export default RequestList;
