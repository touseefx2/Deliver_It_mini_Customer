import { observer } from 'mobx-react';
import React, { useState,useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  View,
  BackHandler,
  Alert
} from 'react-native';
import utils from "../../../utils/index"

import { Navigation } from 'react-native-navigation';
import { RNNDrawer } from 'react-native-navigation-drawer-extension';
import Icon from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { usermanager } from '../../../managers/UserManager';
import { goToLogin, gotoHome } from '../../../navigation';
import { ROOT_NAV_ID } from '../../../navigation/navs'
import styles from './styles';
import { ActivityIndicator } from 'react-native-paper';

interface Props {}

const CustomDrawer = observer((props: Props) => {

  const [imgLoad, setimgLoad] = useState(false);


  useEffect(() => {
    const subscription  = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    subscription.remove()
   }
  
  }, [])



function handleBackButtonClick() {
 RNNDrawer.dismissDrawer()
  return true;
 }

  const goto = () => {
    RNNDrawer.dismissDrawer()
    gotoHome()
  }
  const gotoWallet=()=>{
    RNNDrawer.dismissDrawer()
    Navigation.push(ROOT_NAV_ID, {
			component: {
				name: 'Wallet',
				options: {
					topBar: {
						visible: false,

					}

				},
			}
		})
  }
  const gotoSettings=()=>{
    RNNDrawer.dismissDrawer()
    Navigation.push(ROOT_NAV_ID, {
			component: {
				name: 'Settings',
				options: {
					topBar: {
						visible: false,

					}

				},
			}
		})
  }
  const gotoRides=()=>{
    RNNDrawer.dismissDrawer()
    Navigation.push(ROOT_NAV_ID, {
			component: {
				name: 'MyRides',
				options: {
					topBar: {
						visible: false,

					}

				},
			}
		})
  }
  const gotoPackages=()=>{
    RNNDrawer.dismissDrawer()
    Navigation.push(ROOT_NAV_ID, {
			component: {
				name: 'Packages',
				options: {
					topBar: {
						visible: false,

					}

				},
			}
		})
  }
 
  return (
    <SafeAreaView>
      <StatusBar
        animated={true}
        barStyle="dark-content"
        backgroundColor={'#fff'} />
      <View style={styles.mainContainer}>

 {(!usermanager.user.profile_image)&&(<utils.vectorIcon.FontAwesome  name="user-circle" color="#0E47A1" size={99} />)}
 {(usermanager.user.profile_image&&usermanager.user.profile_image!=="")&&(
 <View style={{width:100,height:100,borderColor:"#0E47A1",borderRadius:50,borderWidth:1,alignItems:"center",justifyContent:"center",marginTop:20}}>
 <Image onLoad={()=>{setimgLoad(true)}}  style={{width:99,height:99,borderRadius:49.5}}  source={{uri:usermanager.user.profile_image}} />
 {imgLoad==false && <ActivityIndicator size={20} color="#0E47A1" style={{top:45,position:"absolute"}} />}
  </View>
 )}
        {/* <SimpleLineIcons name='user' color='grey' size={60} style={{ marginTop: 40 }} /> */}
        <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Inter-Bold', marginTop: 10, fontSize: 22,color:'#0E47A1',textTransform:"capitalize"}}>{usermanager.user.fullname}</Text>
        {/* <View style={{ height: 48, marginTop: 10, backgroundColor: '#e5e5e5', borderRadius: 48, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ padding: 10, fontFamily: 'Inter-Bold', fontSize: 16 }}><Icon name={'gift'} size={18} color={'#000'} /> 0 points ></Text>
        </View> */}
        <View style={styles.Separator}></View>
        <TouchableOpacity style={styles.Box} onPress={gotoRides}>
          <View style={styles.Icon}>
            <MaterialCommunityIcons name='calendar-clock' size={30} color={'grey'} />
          </View>
          <View style={styles.RightBox}>
            <Text style={styles.Title}>Your rides</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Box} onPress={gotoWallet}>
          <View style={styles.Icon}>
            <MaterialCommunityIcons name='wallet' size={30} color={'grey'} />
          </View>
          <View style={styles.RightBox}>
            <Text style={styles.Title}>DeliverIt Mini pay</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Box} onPress={gotoPackages}>
          <View style={styles.Icon}>
            <MaterialCommunityIcons name='brightness-percent' size={30} color={'grey'} />
          </View>
          <View style={styles.RightBox}>
            <Text style={styles.Title}>Packages</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Box} onPress={gotoSettings}>
          <View style={styles.Icon}>
            <Feather name='settings' size={30} color={'grey'} />
          </View>
          <View style={styles.RightBox}>
            <Text style={styles.Title}>Settings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Box}>
          <View style={styles.Icon}>
            <MaterialCommunityIcons name='help-circle' size={30} color={'grey'} />
          </View>
          <View style={styles.RightBox}>
            <Text style={styles.Title}>Help</Text>
          </View>
        </TouchableOpacity>
        <View style={{ position: 'absolute', bottom: 20,flexDirection:'row',height:50,justifyContent:'center' }}>
          <MaterialCommunityIcons name='steering' size={26} color='#0E47A1' />
          <Text style={{ color: '#0E47A1', fontSize: 16,top:2,left:5 }}>Become a Captain</Text>
        </View>
      </View>
    </SafeAreaView>
  );
});


export default CustomDrawer;
