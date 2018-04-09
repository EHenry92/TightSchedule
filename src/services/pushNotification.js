import PushNotification from 'react-native-push-notification';
import {PushNotificationIOS} from 'react-native';
import PushNotificationAndroid from 'react-native-push-notification';
import {DeviceEventEmitter, AsyncStorage} from 'react-native';
import {markCmp} from '../actions'

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

const localNotification = ({bigText, title, message, actions, vibrate}) => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText,
    vibrate,
    vibration: 300,
    title,
    message,
    playSound: true,
    soundName: 'default',
    actions
  });
};
const scheduleNotification = ({bigText ,title, message, date}) => {
  PushNotification.localNotificationSchedule({
    title: title,
    message: message,
    date: date,
    actions: '["Next", "End"]'
  });
};


const register = () => {}
(function() {
  // Register all the valid actions for notifications here and add the action handler for each action
  PushNotificationAndroid.registerNotificationActions(['End','Next',"Start", "Cancel"]);
  DeviceEventEmitter.addListener('notificationActionReceived', function(e){
    console.log ('notificationActionReceived event received: ' + e);
    const info = JSON.parse(e.dataJSON);
    if (info.action == 'End' || info.action == 'Cancel') {
      console.log("ending action")
      AsyncStorage.removeItem('TightSchedule-schedule');
    }
    else if (info.action == 'Next' || info.action == 'Start') {
      AsyncStorage.getItem('TightSchedule-schedule',
        (err, result) => {
          if(err){
            console.log(err)
          }
          else if(result) {
            let {tasks, ptr, schedule} = JSON.parse(result);
            const maxPtr = schedule.taskCount;

            if(ptr < schedule.taskCount && ptr >= 0) {
              let cur = tasks[ptr];
              let minTime = cur.durationHr * 60 + cur.durationMin;
              localNotification({
                title:`${schedule.title}`,
                message: `Time to start ${cur.title}`,
                bigText: `${cur.title} for ${cur.durationHr}hrs ${cur.durationMin}min`,
                vibrate: false
              })

              scheduleNotification({
                title:`${schedule.title}`,
                message: `Time to end ${cur.title}`,
                bigText: `You  did ${cur.title} for ${cur.durationHr}hrs ${cur.durationMin}min`,
                date: new Date(Date.now() + (minTime * 60 * 1000))
              });
              AsyncStorage.setItem('TightSchedule-schedule',
                JSON.stringify({schedule, tasks, ptr: ptr + 1}),
                  () => {}
              );
              // mark that task as complete
              markCmp(schedule.uid, cur)
            }
            else {
              //if schedule is complete
              localNotification({
                title:`${schedule.title}`,
                message: `You've completed ${schedule.title}`,
                vibrate: false
              })
            }
          }
        });

      }
  });
})();

export {
  configure,
  localNotification,
  scheduleNotification,
  register
};





