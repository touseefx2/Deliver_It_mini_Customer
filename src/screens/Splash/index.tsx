import React, { useEffect } from 'react';
import { Text, View, StatusBar, Image, ActivityIndicator, SafeAreaView } from 'react-native'
import { usermanager } from '../../managers/UserManager';
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { gotoHome, goToLogin } from '../../navigation';
import utils from '../../utils';
import NetInfo from "@react-native-community/netinfo";
import {generalmanager} from '../../managers/generalManager';
import { requestmanager } from '../../managers/requestManager';
import { ROOT_NAV_ID } from '../../navigation';

const SplashScreen = observer(() => {

 
	const setispickup=(c)=>{requestmanager.setispickup(c)};
	const setisdropoff=(c)=>{requestmanager.setisdropoff(c)};
	const setchalo=(c)=>{requestmanager.setchalo(c)};
	const settd=(c)=>{requestmanager.settd(c)};
	const setacceptRequest=(c)=>{requestmanager.setacceptRequest(c)};
	const settpd=(c)=>{requestmanager.settpd(c)};

	const handleConnectivityChange = (state) => {
		if (state.isConnected)
		  {
            generalmanager.changeInternet(true)
		  }
		else
		  {
			generalmanager.changeInternet(false)
		  }
	  };

  
	useEffect(() => {
		NetInfo.addEventListener(handleConnectivityChange);
		setTimeout(() => {
	
			if (usermanager.user) {

				if(!requestmanager.req){
					setisdropoff(false);setispickup(false);setchalo(false);settd("");settpd("");
				}

				if(requestmanager.req){
					let status=requestmanager.req.status[requestmanager.req.status.length-1].status
					if(status=="ended"){
				   	requestmanager.setreq(false);setisdropoff(false);setispickup(false);setchalo(false);settd("");settpd("")
				}
				}

                gotoHome("");
			}
			else {
				goToLogin()
			}
	
		}, 2000);


	}, []);

 
	  console.log("user : ",usermanager.user)
	// console.log("authToken : ",usermanager.authToken)
	// console.log("notiToken : ",usermanager.notificationToken)

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				animated={true}
				barStyle="dark-content"
				backgroundColor={'#fff'} />
			<Image source={require('../../assets/images/animatedtruck.gif')} />
			<View>
				<Text style={{ fontFamily: 'Inter-Bold', fontSize: 34, padding: 10, color: '#0e47a1' }}>DeliverIt</Text>
			</View>

		</SafeAreaView>
	);
})
export default SplashScreen;
