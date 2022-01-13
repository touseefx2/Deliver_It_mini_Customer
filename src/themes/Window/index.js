import {Dimensions} from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
// 44 - on iPhoneX
// 20 - on iOS device
// X - on Android platfrom (runtime value)
// 0 - on all other platforms (default)
// console.log(getStatusBarHeight());
// will be 0 on Android, because You pass true to skipAndroid
// console.log(getStatusBarHeight(true));

 const  Width = Dimensions.get('window').width;
 const  Height = Dimensions.get('window').height;
 const statusBarHeight=getStatusBarHeight();
  

export default window ={
    Width,
    Height,
    statusBarHeight
};

 