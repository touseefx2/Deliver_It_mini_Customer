import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet, Image, StatusBar, TouchableOpacity, SafeAreaView,Platform} from 'react-native'
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import styles from './styles'
import { usermanager } from '../../managers/UserManager'
import {generalmanager} from '../../managers/generalManager';
import Icon from 'react-native-vector-icons/MaterialIcons';
import utils from '../../utils';
import CountDown from 'react-native-countdown-component';
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { AUTH_NAV_ID, gotoHome } from '../../navigation';
import auth from '@react-native-firebase/auth';
import {fcmService} from "../../services/Notification/FCMService"  //firebase cloud mesaging
import db from "../../database/index" 
import utilsS from "../../utilsS/index"
import AlertMessage from '../../utilsS/alertMessage';

const CELL_COUNT = 6;
const OTP = observer(() => {

	const [loader, setloader] = useState(false);
 
	const [isFinish, setFinish] = useState(false);
 
	const [confirm, setConfirm] = useState(null);

	const [value, setValue] = useState('');
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});
	const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT });

	async function signInWithPhoneNumber(phoneNumber) {
		try {
			setloader(true);
			const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
			setConfirm(confirmation);
			setloader(false)
			console.log("cnfrm : ",confirmation)
		} catch (error) {
		     	console.log('signInWithPhoneNumber error : ',error);
			    setValue("");
				setConfirm(null)
				setloader(false)
				var errorMessage = error.message;
				var si  = errorMessage.indexOf("]")+1
				var  ei  = errorMessage.length -1
				const msg = errorMessage.substr(si,ei)
				utils.AlertMessage("",msg)
				
		}
		
	  }

	  async function confirmCode() {
		//   if(confirm!=null){
		// 	try {
		// 		 setloader(true)
		// 		 await confirm.confirm(value);
		// 		  Continue();
		// 	  } catch (error) {
		// 		console.log('Invalid  code : ',error);
		// 		setloader(false)
		// 		setValue("");
		// 		let errorMessage=""

		// 		if(error.code =='auth/invalid-verification-code'){
        //           errorMessage="Invalid verification code, Please enter correct confirmation code !"
		// 		  }else
		// 		if(error.code =='auth/session-expired'){
		// 			errorMessage="The sms code has expired or to many invalid code attempt. Please re-send the verification code to try again"
		// 		  }else
		// 		if(error.code =='auth/network-request-failed'){
		// 			errorMessage="Please connect internet and renter confirmation code ! "
		// 		  }else{
		// 			var em = error.message;
		// 			var si  = em.indexOf("]")+1
		// 			var  ei  = em.length -1
		// 			errorMessage = em.substr(si,ei)
		// 		  }
 
		// 	 	utils.AlertMessage("",errorMessage)


 
		// 		// var errorMessage = error.message;
		// 		// var si  = errorMessage.indexOf("]")+1
		// 		// var  ei  = errorMessage.length -1
		// 		// const msg = errorMessage.substr(si,ei)
			
		// 	  }
		//   }else{
		// 	//   utils.AlertMessage("","Please wait for sending authentication code through sms .. ");
		// 	  setValue("")
		//   }
	 
	 setloader(true);
	 Continue()

	  }

	const goBack = () => {
		Navigation.pop(AUTH_NAV_ID)
	}

	const checkIsUserRegister=(token)=>{
		
		usermanager.addnt(token);

		const bodyData={
			mobile_number:usermanager.mobile,
			registration_token:token           //ntfctn token
		}
		const header=""
	 
		// method, path, body, header
		db.api.apiCall("post",db.link.login,bodyData,header)
		.then((response) => {
		  
		  console.log("checkIsUserRegister response : " , response);
		 
		  if(!response.token){

			setloader(false)
           

			if(response.message=="User Not Registered"){
				auth().currentUser?.delete();
				auth().signOut();
                 gotoRegisterProfile()
			    return;
			}

			utils.AlertMessage("",response.message) ;
            return;
          }

		  if(response.token){
			auth().currentUser?.delete();
			auth().signOut();
			usermanager.setUser(response.data)
			usermanager.addnotificationToken(token);
			usermanager.addauthToken(response.token);
			setloader(false)
			utilsS.ToastAndroid.ToastAndroid_SB("Login Success") 
			gotoHome();
			return;
 
	  }
		  
	         setloader(false);
			 return;
		}).catch((e) => {
			setloader(false);
			setValue("")
		   utils.AlertMessage("","Network request failed");
		   console.error("checkIsUserRegister catch error : ", e)
		  return;
		})
		
		
	}

	const onRegister = (token) =>
	{
	  console.log("[App] onRegister :", token);
	  if(token!=null)
	 { 
		 
		checkIsUserRegister(token);
	 }
		else{
			setloader(false);
			utils.AlertMessage("","Notification token not genereated !")
		}
	  
    }

	const gotoRegisterProfile = () => {
		Navigation.push(AUTH_NAV_ID, {
			component: {
				name: 'RegisterProfile',
				options: {
					topBar: {
						visible: false
					}
				}
			}
		})
	}
  
	const Continue = () => {
		if(Platform.OS=="ios"){
			// fcmService.registerAppwithFCM();//forios
		  }else{
			fcmService.register(onRegister);
		  }
 
	}

const reSend=()=>{
	setFinish(false);
	setValue("");
	setConfirm(null);
	setloader(false)
	signInWithPhoneNumber(usermanager.mobile);
}

 useEffect(() => {
//  signInWithPhoneNumber(usermanager.mobile);

//   const Subscribe =  auth().onAuthStateChanged( async (user)=> {
// 			if (user)  {
// 			setloader(true);	
// 			setTimeout(() => {
// 			 Continue()	
// 			}, 500);
		
// 				} 
// 		});	
	 
//  	return()=>{
// 				Subscribe(); //remove listener
// 			}

	
		},[])
 

	return (
       <SafeAreaView style={styles.container}>
 
 		<utils.Loader l={true} loader={loader} />
			<StatusBar
				animated={true}
				barStyle="dark-content"
				backgroundColor={'#fff'}
			/>
			{!generalmanager.internet && <utils.TopMessage msg={"Please Connect internet !"} />}
			<View style={styles.Header}>
				<TouchableOpacity onPress={goBack} style={styles.BackButton}>
					{/* <Image source={require('../../assets/images/back.png')} style={styles.ArrowBack} /> */}
					<Icon name={'arrow-back-ios'} size={16} color={'#000'} />
				</TouchableOpacity>

			</View>
			<Text style={styles.title}>Enter your code</Text>
			<Text style={styles.subtitle}>You will recieve a sms with verification pin on</Text>
			<Text style={styles.subtitle}>+92 3*****{usermanager.mobile.substring(9, 13)}.</Text>
			<View style={{ width: '90%', alignSelf: 'center' }}>
				<CodeField
					ref={ref}
					{...props}
					value={value}
					onChangeText={setValue}
					onEndEditing={()=>confirmCode()}
					cellCount={CELL_COUNT}
					rootStyle={styles.codeFieldRoot}
					keyboardType="number-pad"
					textContentType="oneTimeCode"
					renderCell={({ index, symbol, isFocused }) => (
						<Text
							key={index}
							style={[styles.cell, isFocused && styles.focusCell]}
							onLayout={getCellOnLayoutHandler(index)}>
							{symbol || (isFocused ? <Cursor /> : null)}
						</Text>
					)}
				/>
			</View>

			{isFinish ? (
				<View>
					<View style={styles.Timer}>
						<Text style={styles.TimerText}>Did't recieve code? Resend code</Text>
					</View>
					{/* <View style={{ flexDirection: 'row', height: 48, width: '90%', alignSelf: 'center', marginTop: 10 }}> */}
						<TouchableOpacity onPress={reSend} style={{ width: '90%', height: 40, backgroundColor: '#0E47A1', borderRadius: 4, alignItems: 'center', justifyContent: 'center',alignSelf:"center",marginTop:10}}>
							<Text style={{ color: '#fff', fontSize: 16,fontFamily:'Inter-Regular' }}>Resend Code</Text>
						</TouchableOpacity>
						{/* <TouchableOpacity style={{ width: '47%', position: 'absolute', right: 0, opacity: 0.6, height: '100%', backgroundColor: '#0E47A1', borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
							<Text style={{ color: '#fff', fontSize: 16,fontFamily:'Inter-Regular' }}><FontAwesome name={'whatsapp'} size={16} color={'#fff'} /> Whatsapp</Text>
						</TouchableOpacity> */}
					{/* </View> */}
				</View>
			) : (
				<View style={styles.Timer}>
					{/* <AntDesign name='clockcircleo' size={24} style={styles.TimerText} /> */}
					<Text style={styles.TimerText}>Resend code:</Text>
					<CountDown
						size={14}
						until={60}
						onFinish={() => setFinish(true)}
						digitStyle={{ backgroundColor: 'transparent' }}
						digitTxtStyle={{ color: 'grey' }}
						timeToShow={['S']}
						timeLabels={{ s: null }}
						showSeparator
					/>

				</View>
			)}
		</SafeAreaView>
	);
})
export default OTP;
