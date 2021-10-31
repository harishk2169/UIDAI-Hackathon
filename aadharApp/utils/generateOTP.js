const uuid = require('uuid-random');
import {showMessage} from 'react-native-flash-message';
const axios = require('axios');

const generateOTP = async uid => {
  try {
    const txnID = uuid();
    console.log(txnID);
    const resp = await axios.post(
      'https://stage1.uidai.gov.in/onlineekyc/getOtp/',

      {
        uid: uid,
        txnId: txnID,
      },
      {
        headers: {
          'x-request-id': uuid(),
          'Accept-Language': 'en_in',
          'Content-Type': 'application/json ',
        },
      },
    );
    if (resp.data.status.toLowerCase() === 'y') return txnID;
    throw new Error('Something went wrong');
  } catch (err) {
    console.log(err);
    showMessage({
      message: 'Error',
      description: err.message,
      type: 'danger',
    });
  }
};

module.exports = generateOTP;
