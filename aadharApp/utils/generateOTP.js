const uuid = require('uuid-random');
const axios = require('axios');

const generateOTP = async () => {
  const txnID = uuid();
  const resp = await axios.post(
    'https://stage1.uidai.gov.in/onlineekyc/getOtp/',

    {
      uid: '999991682487',
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
  console.log(resp);
};

generateOTP();
