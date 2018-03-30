import PushNotification from 'react-native-push-notification';
import {PushNotificationIOS} from 'react-native';

const configure = () => {
  PushNotification.configure({
    onRegister: function (token) {
      //Do something with token
    },
    onNotification: function(notification){
      //process the notification
      //required on IOS only
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },
    popInitialNotification: true,
    requestPermissions: true
  });
};

const localNotification = ({bigText, subText, title, message}) => {
  console.log("inlocal notificaio")
  PushNotification.localNotification({
    autoCancel: true,
    bigText: bigText,
    subText: subText,
    vibrate: true,
    vibration: 300,
    title: title,
    message: message,
    playSound: true,
    soundName: 'default',
    actions: '["Accept", "Reject"]'
  });
};

export {
  configure,
  localNotification
};
