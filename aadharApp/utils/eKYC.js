const uuid = require('uuid-random');
const axios = require('axios');
const xmlToJSON = require('xml-js');

const eKYC = async () => {
  const txnID = 'c73c196b-b4b7-441f-88e3-33613d1602d0';
  const resp = await axios.post(
    'https://stage1.uidai.gov.in/onlineekyc/getEkyc/',

    {
      uid: '999909223753',
      otp: '980320',
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
  console.log(
    'Compact\n\n',
    xmlToJSON.xml2json(resp.data.eKycString, {compact: true, spaces: 4}),
  );
  console.log(
    'Expanded\n\n',
    xmlToJSON.xml2json(resp.data.eKycString, {compact: false, spaces: 4}),
  );
};

eKYC();
