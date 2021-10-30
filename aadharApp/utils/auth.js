const uuid = require('uuid-random');
const axios = require('axios');
import {showMessage} from 'react-native-flash-message';

const auth = async (txnID, UID, OTP) => {
  try {
    const resp = await axios.post(
      'https://stage1.uidai.gov.in/onlineekyc/getAuth/',

      {
        uid: UID,
        otp: OTP,
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
    if (resp.data.status.toLowerCase() === 'y') return true;
    throw new Error('OTP Incorrect');
  } catch (err) {
    console.log(err);
    showMessage({
      message: 'Error',
      description: err.message,
      type: 'danger',
    });
    return false;
  }
};

module.exports = auth;
