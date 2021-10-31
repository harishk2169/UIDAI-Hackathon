import PushNotification from 'react-native-push-notification';
import * as Keychain from 'react-native-keychain';
import isRegistered from '../utils/isRegistered';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    // console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    // console.log('NOTIFICATIOasN:', notification);
    // process the notification
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    // console.log('ACTION:', notification.action);
    // console.log('NOTIFICATION:', notification);
    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    // console.error(err.message, err);
  },
  popInitialNotification: true,
  requestPermissions: true,
});

Keychain.getGenericPassword().then(credentials => {
  if (credentials) {
    isRegistered(credentials.username).then(alreadyRegistered => {
      if (alreadyRegistered) {
        PushNotification.createChannel({
          channelId: credentials.username, // (required)
          channelName: 'My channel', // (required)
          channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
          playSound: true, // (optional) default: true
          soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
          importance: 4, // (optional) default: 4. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        });
      }
    });
  }
});
