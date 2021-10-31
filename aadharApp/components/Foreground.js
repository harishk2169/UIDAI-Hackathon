import React, {useEffect} from 'react';

import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const ForeGroundNotify = props => {
  useEffect(() => {
    const local = async message => {
      const credentials = await Keychain.getGenericPassword();
      PushNotification.localNotification({
        channelId: credentials.username,
        bigText: message.data.message,
        title: message.data.title,
        message: '',
        color: 'red',
        vibrate: true,
        vibration: 100,
        playSound: true,
        soundName: 'default',
      });
    };

    const unsubscribe = messaging().onMessage(mess => local(mess));
    return unsubscribe;
  }, []);

  return null;
};

export default ForeGroundNotify;
