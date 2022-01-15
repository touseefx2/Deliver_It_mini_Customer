// sdk.dir=C:\Users\touse\AppData\Local\Android\Sdk
import {LogBox} from 'react-native'
import {RNNDrawer} from 'react-native-navigation-drawer-extension';
import CustomDrawer from './src/screens/components/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/screens/Login';
import Splash from './src/screens/Splash';
import OTP from './src/screens/OTP';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile'
import Search from './src/screens/Search'
import { Navigation } from 'react-native-navigation';
import { create } from 'mobx-persist';
import { usermanager } from './src/managers/UserManager'
import { requestmanager } from './src/managers/requestManager'
import { carmanager } from './src/managers/CarManager'
import SignIn from './src/screens/SignIn';
import Notifications from './src/screens/Notifications';
import NotificationDetails from './src/screens/NotificationDetails';
import Settings from './src/screens/Settings';
import Update from './src/screens/Update';
import DropoffLocation from './src/screens/DropoffLocation';
import Wallet from './src/screens/Wallet';
import AddCard from './src/screens/AddCard';
import MyRides from './src/screens/MyRides';
import Credit from './src/screens/Credit';
import Packages from './src/screens/Packages';
import RideDetail from './src/screens/RideDetail';
import PushNotification  from 'react-native-push-notification'
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import {showNotification} from "./src/services/Notification/showNotification"
import messaging from '@react-native-firebase/messaging';
import RegisterProfile from './src/screens/RegisterProfile';

async function hydrateStores() {
    const hydrate = create({ storage: AsyncStorage});
    await hydrate('usermanager', usermanager);
    await hydrate('requestmanager', requestmanager);
    await hydrate('carmanager', carmanager);
}


PushNotification.configure({ 
   
    onNotification: async function (notification) {
    console.log("onNOTIFICATION :", notification);

    let data=notification.data || null;
    let title=notification.title;
    let msg=notification.message || ""


   if(notification.userInteraction==false)
   {
    showNotification(title,msg)
   }

   if(notification.userInteraction==true )
  {
        console.log("ntfctn click")
   }
   
    //  if(title=="Your captain is on his way"){
    //  if(requestmanager.req!==false){
    //     requestmanager.getReqById(requestmanager.req._id,"")
    //  }
    //  }

     if(title=="Trip has been canceled."||title=="Your captain is arrived."||title=="Your captain is on his way" || title=="Your captain start ride."|| title=="Your trip has ended."){
        if(requestmanager.req!==false){
            requestmanager.getReqById(requestmanager.req._id,"check")
        }
       }

      
 
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  // console.log('OK')
  },
 
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,

});
   
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('ntfctn fcm Message handled in the background!', remoteMessage);
    // showNotification(remoteMessage.notification.title,remoteMessage.notification.body )
  });
  
 
Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Splash', () => Splash);
Navigation.registerComponent('Home', () => Home);
Navigation.registerComponent('OTP', () => OTP);
Navigation.registerComponent('RegisterProfile', () => RegisterProfile);
Navigation.registerComponent('SignIn', () => SignIn);
Navigation.registerComponent('Profile',()=>Profile);
Navigation.registerComponent('Settings',()=>Settings);
Navigation.registerComponent('Search',()=>Search);
Navigation.registerComponent('Notifications',()=>Notifications);
Navigation.registerComponent('NotificationDetails',()=>NotificationDetails);
Navigation.registerComponent('Update',()=>Update);
Navigation.registerComponent('Wallet',()=>Wallet);
Navigation.registerComponent('AddCard',()=>AddCard);
Navigation.registerComponent('MyRides',()=>MyRides);
Navigation.registerComponent('Credit',()=>Credit);
Navigation.registerComponent('Packages',()=>Packages);
Navigation.registerComponent('RideDetail',()=>RideDetail);
Navigation.registerComponent('DropoffLocation',()=>DropoffLocation);
Navigation.registerComponent('customDrawer', () =>
  RNNDrawer.create(CustomDrawer),
);
Navigation.registerComponent('customFilter', () =>
RNNDrawer.create(CustomFilter),
);
LogBox.ignoreAllLogs(true)
Navigation.setDefaultOptions({
    statusBar: {
        backgroundColor: 'black'
    },
    topBar: {
        title: {
            color: 'black'
        }
    }
})

Navigation.events().registerAppLaunchedListener(() => {
    hydrateStores().then(() => {
        
        Navigation.setRoot({
            root: {
                stack: {
                    id: 'LoadingStack',
                    children: [
                        {
                            component: {
                                name: 'Splash',
                                options: {

                                    topBar: {
                                        visible:false

                                    }
                                }
                            }
                        },
                    ]
                }
            }

        });

    });
});

