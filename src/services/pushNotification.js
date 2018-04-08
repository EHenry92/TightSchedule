import PushNotification from 'react-native-push-notification';
import {PushNotificationIOS} from 'react-native';
import PushNotificationAndroid from 'react-native-push-notification';
import EventEmitter from 'EventEmitter';

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
    actions: '["Accept", "Reject"]'
  });
};
const scheduleNotification = ({bigText ,title, messge, date}) => {
  PushNotification.localNotificationSchedule({
    message: message,
    date: date
  });
};


const register = () => {}
// (function() {
//   // Register all the valid actions for notifications here and add the action handler for each action
//   PushNotificationAndroid.registerNotificationActions(['End','Next','Pause','Resume']);
//   EventEmitter.addListener('notificationActionReceived', function(action){
//     console.log ('Notification action received: ' + action);
//     const info = JSON.parse(action.dataJSON);
//     if (info.action == 'End') {
//       console.log("ending")

//       stopSchedule();
//     } else if (info.action == 'Next') {
//       console.log("nexting")
//       // set notification as complete, remove notification off of list
//       //start next scejdule item
//     } else if (info.action == 'Pause') {
//       console.log("pausing")

//       //send a resume notification

//     } else if (info.action == 'Resume') {

//       //resume notifications
//     }
//   });
// })();

export {
  configure,
  localNotification,
  scheduleNotification,
  register
};





