const uuid = require('uuid-random');
const axios = require('axios');

const auth = async () => {
  const txnID = '569f6ef2-09a1-497a-8319-b2fa94996211';
  const resp = await axios.post(
    'https://stage1.uidai.gov.in/onlineekyc/getAuth/',

    {
      uid: '999991682487',
      otp: '338404',
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

auth();
