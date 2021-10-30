const uuid = require('uuid-random');
const axios = require('axios');
const xmlToJSON = require('xml-js');

const eKYC = async () => {
  const txnID = '814ec078-7ef9-4afe-aa68-35d5b935b716';
  const resp = await axios.post(
    'https://stage1.uidai.gov.in/onlineekyc/getEkyc/',

    {
      uid: '999991682487',
      otp: '810508',
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
