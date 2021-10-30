const NodeRSA = require("node-rsa");

var object = {
  address: "Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi",
};

const key = new NodeRSA({ b: 1024 });
const text = object.address;

function cryptedAddress(key, text) {
  // a second method of encrypting and decrypting from the key class

  // const encrypted = key.encrypt(text, "base64"); // encrypted address  of the sender

  // console.log("encrypted: ", encrypted);

  // const decrypted = key.decrypt(encrypted, "utf8");

  // console.log("decrypted: ", decrypted);

  var public_key = key.exportKey("public"); // extracting public key from the key class
  // console.log(public_key);

  var private_key = key.exportKey("private"); // extracting private key from the key class
  // console.log(private_key);

  let key_private = new NodeRSA(private_key); // creating individual keys

  let key_public = new NodeRSA(public_key);

  var encryptedString = key_public.encrypt(text, "base64"); // encrypting

  console.log(encryptedString);

  var decryptedString = key_private.decrypt(encryptedString, "utf8"); // decrypting

  console.log(decryptedString);
}

cryptedAddress(key, text);
