const adminSDK = require("./adminSDK");
const customNotify = require("./notify");

const listen = async () => {
    adminSDK
        .firestore()
        .collection("requests")
        .onSnapshot((snap) => {
            const data = snap.docs.map(async (doc) => {
                var dat = doc.data();
                if (dat.status === 0) {
                    var x = await adminSDK
                        .firestore()
                        .collection("users")
                        .doc(dat.recipient)
                        .get();
                    x = x.data();
                    console.log(x);

                    customNotify(
                        x.token,
                        "New Request",
                        "Hi there, there is new address request"
                    );
                }
            });
        });
};

module.exports = listen;
