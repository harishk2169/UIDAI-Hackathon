import firestore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';

const isRegistered = async UID => {
  try {
    // console.log(UID);
    const user = await firestore().collection('users').doc(UID).get();
    // console.log(user);
    const userData = user.data();
    // console.log(userData);
    if (!userData) return false;
    return true;
  } catch (err) {
    console.log(err);
    showMessage({message: 'Error', description: err.message, type: 'danger'});
    return false;
  }
};

module.exports = isRegistered;
