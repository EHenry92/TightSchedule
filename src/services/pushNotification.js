import PushNotification from 'react-native-push-notification';
import {PushNotificationIOS} from 'react-native';
import PushNotificationAndroid from 'react-native-push-notification';
import {DeviceEventEmitter} from 'react-native';

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

const localNotification = ({bigText, title, message}) => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText: bigText,
    vibrate: true,
    vibration: 300,
    title: title,
    message: message,
    playSound: true,
    soundName: 'default',
    actions: '["End", "Next"]'
  });
};
const scheduleNotification = ({bigText ,title, message, date}) => {
  PushNotification.localNotificationSchedule({
    message: message,
    date: date
  });
};


const register = () => {}
(function() {
  // Register all the valid actions for notifications here and add the action handler for each action
  PushNotificationAndroid.registerNotificationActions(['End','Next','Pause','Resume']);
  DeviceEventEmitter.addListener('notificationActionReceived', function(e){
    console.log ('notificationActionReceived event received: ' + e);
    const info = JSON.parse(e.dataJSON);
    if (info.action == 'End') {
      console.log("ending action")
    } else if (info.action == 'Next') {
      // Do work pertaining to Reject action here
      console.log("nexting actions")
    }
    // Add all the required actions handlers
  });
})();

export {
  configure,
  localNotification,
  scheduleNotification,
  register
};





