import AuthNavigator from "./routes/AuthNavigator";
import { Provider } from "react-redux";
import { store } from "./redux";
import React, { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";
export default function App() {
  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log("Authorization status:", authStatus);
  //   }
  // };
  // useEffect(() => {
  //   if (requestUserPermission()) {
  //     messaging()
  //       .getToken()
  //       .then((token) => {
  //         console.log("=>  file: App.js:19  messaging  token:", token);
  //       });
  //   } else {
  //     console.log("Authorization status:", authStatus);
  //   }

  //   messaging()
  //     .getInitialNotification()
  //     .then(async (remoteMessage) => {
  //       if (remoteMessage) {
  //         console.log(
  //           "Notification caused app to open from quit state:",
  //           remoteMessage.notification
  //         );
  //       }
  //     });

  //   messaging().onNotificationOpenedApp(async (remoteMessage) => {
  //     console.log(
  //       "Notification caused app to open from background state:",
  //       remoteMessage.notification
  //     );
  //   });

  //   // Register background handler
  //   messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //     console.log("Message handled in the background!", remoteMessage);
  //   });

  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     // Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
  //     console.log("=>  file: App.js:54  unsubscribe  remoteMessage.notification:", remoteMessage.notification)
  //   });
  //   return unsubscribe;
  // }, []);
  return (
    <Provider store={store}>
      <AuthNavigator />
    </Provider>
  );
}
