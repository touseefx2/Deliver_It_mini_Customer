import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Linking, Image, StatusBar, PermissionsAndroid, TouchableOpacity, SafeAreaView, Animated, Alert } from 'react-native'
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import styles from './styles'
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { carmanager } from '../../managers/CarManager';
import {  goToLogin } from '../../navigation';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { AUTH_NAV_ID, ROOT_NAV_ID, } from '../../navigation/navs'
import LinearGradient from 'react-native-linear-gradient'
import { SideMenuView, RNNDrawer } from 'react-native-navigation-drawer-extension';
import { Picker } from '@react-native-picker/picker';
import { usermanager } from '../../managers/UserManager';
import {generalmanager} from '../../managers/generalManager';
import utilsS from '../../utilsS/index';
import db from "../../database/index"

interface Props { }
const Update = observer((props: Props) => {

	const mobileReg = /^[3]\d{9}$/;

	const [mobile,setMobile]=useState(usermanager.user.mobile_number.slice(3));
	const [isEmptyMobile, setIsEmptyMobile] = useState(false);
	const [invalidMobile, setInValidMobile] = useState(false);

	const [name,setname]=useState(usermanager.user.fullname);
	const [isEmptyName, setIsEmptyName] = useState(false);
	const [isInvalidName, setIsInvalidName] = useState(false);
	let maxNameLength=40

	const [email,setemail]=useState(usermanager.user.email);
	const [isEmptyEmail, setIsEmptyEmail] = useState(false);
	const [isInvalidEmail, setIsInvalidEmail] = useState(false);
	let maxEmailLength=50
   
	const [load, setLoad] = useState(false);


	const goBack = () => {
		Navigation.pop(ROOT_NAV_ID)
	}

	const update= () => {
	 	
					if(generalmanager.internet){
			
		            	 if(props.option == 'name'){
          
			if( usermanager.user.fullname.toLowerCase() != name.toLowerCase()){
			
				if(name.length<=0){
					setIsEmptyName(true)
					return  
				  }
				
				  if(!utilsS.validation.NameValidate(name)){
					setIsInvalidName(true)
					return
				  }
			 
			setLoad(true);
			setTimeout(() => {
			UpdateUser("name")	
			}, 1000);
					// usermanager.addName(name);
					// ToastAndroid.ToastAndroid_SB("Update Success");
					// goBack()
			}else{
				goBack()
			}

		
		 
		                 }

						if(props.option == 'mobile'){
						
							if(usermanager.user.mobile_number!=mobile){
							
								if (mobile.trim().length == 0) {
									setIsEmptyMobile(true)
									return
								}
								if (mobileReg.test(mobile.trim()) === false) {
									setInValidMobile(true)
									return
								}
						
								setLoad(true);
								setTimeout(() => {
								UpdateUser("mobile")	
								}, 1000);

							}else{
								goBack()
							}

					
						
						}

						if(props.option == 'email'){
							
							if(usermanager.user.email.toLowerCase()!=email.toLowerCase()){
					
							if(email!=""){
								
								if(!utilsS.validation.EmailValidate(email)){
									setIsInvalidEmail(true)
									return
								}
				
							setLoad(true);
							setTimeout(() => {
							UpdateUser("email")	
							}, 1000);
							}

							if(email==""){
							setLoad(true);
							setTimeout(() => {
							UpdateUser("email")	
							}, 1000);
							}
							
							
						
							}else{

								goBack()
							}
							
							
						}
			 
					}else{
					 utilsS.AlertMessage("","Please connect internet !")
					}
 	 

	   }

	   const UpdateUser=(c)=>{
		//update user
		 let uid=usermanager.user._id
		 let bodyData=null;
		  if(c=="name"){bodyData={fullname:name}}
		  if(c=="mobile"){bodyData={mobile_number:mobile}}
		  if(c=="email"){bodyData={email:email}}
		  const header=usermanager.authToken;

		  // method, path, body, header
		  db.api.apiCall("put",db.link.updateUser+uid,bodyData,header)
		  .then((response) => {
				
				 console.log("Update user response : " , response);
			
				 if(response.msg=="Invalid Token"){
					setLoad(false);
					utilsS.AlertMessage("", response.msg ) ;
					usermanager.attemptToLogout();
					carmanager.setvehicleType(false);
					goToLogin();
					return;
				}
				 
				 if(response.success){
					setLoad(false);
					usermanager.setUser(response.data);
					utilsS.ToastAndroid.ToastAndroid_SB("Update Success") 
					goBack();
					 return;
				 }
		
				 if(response.message){
					setLoad(false);
				   utilsS.AlertMessage("",response.message)
				  return;
			  }

			  setLoad(false);
			  return;
		 
		  }).catch((e) => {
			setLoad(false);
			 utilsS.AlertMessage("","Network request failed");
			 console.error("Update user catch error : ", e)
			return;
		  })
		
			}
	 
	return (
		<SafeAreaView style={styles.Container}>

			<StatusBar
				animated={true}
				barStyle="dark-content"
				backgroundColor={styles.Status.backgroundColor} />
						<utilsS.Loader load={load} fast={true} title="Update .." />


			<View style={styles.Header}>
				<TouchableOpacity onPress={goBack} style={styles.MenuButton}>
					{/* <Image source={require('../../assets/images/back.png')} style={styles.ArrowBack} /> */}
					<Icon name={'arrow-back-ios'} size={16} color={'#000'} style={{ marginTop: 10, marginLeft: 5 }} />
				</TouchableOpacity>
			</View>
			<ScrollView>

				{props.option == 'name' ? (
					<View style={styles.Body}>
						<Text style={{ fontFamily: 'Inter-Regular', fontSize: 24 }}>Update your name</Text>
						<Text style={{ fontFamily: 'Inter-Regular', color: 'grey', marginTop: 10 }}>Your name makes it easy for Captains to confirm who they are picking up</Text>
						<View>
						<TextInput maxLength={maxNameLength} style={styles.Input} value={name} placeholder='Enter your full name' onChangeText={(val)=>{setname(val);setIsEmptyName(false);setIsInvalidName(false)}}/>
						{name.length>0 && (<Text style={styles.showLength}>({name.length}/{maxNameLength})</Text>)}
						{isEmptyName ? (<Text style={styles.ErrorMessage}>Name is Required</Text>) : (null)}
						{isInvalidName ? (<Text style={styles.ErrorMessage}>Enter a valid Name.</Text>) : (null)}
						</View>

					</View>
				) : props.option == 'mobile' ? (
					<View style={styles.Body}>
						<Text style={{ fontFamily: 'Inter-Regular', fontSize: 24 }}>Update your nmobile number</Text>
						<Text style={{ fontFamily: 'Inter-Regular', color: 'grey', marginTop: 10 }}>We will send a code to your new mobile number to verify your account</Text>
						<View>
						<View style={styles.Input}>
							<Image source={require('../../assets/images/pakistan.png')} style={styles.CountryLogo} />			
							<Text style={{ paddingLeft:5,paddingRight:5,paddingBottom:2 }}>+92</Text>
							<TextInput style={styles.MobileInput} maxLength={10} value={mobile} keyboardType='phone-pad' placeholder='3123456789' onChangeText={val => { setMobile(val.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '')); setIsEmptyMobile(false); setInValidMobile(false)}} />
						</View>
						{isEmptyMobile ? (<Text style={styles.ErrorMessage}>Mobile is Required</Text>) : (null)}
						{invalidMobile ? (<Text style={styles.ErrorMessage}>Enter a valid Mobile No.</Text>) : (null)}
						</View>

					</View>
				) : props.option == 'email' ? (
					<View style={styles.Body}>
						<Text style={{ fontFamily: 'Inter-Regular', fontSize: 24 }}>Update your email</Text>
						<Text style={{ fontFamily: 'Inter-Regular', color: 'grey', marginTop: 10 }}>Recieve info about new updates and awesome promos in your inbox</Text>
						<TextInput style={styles.Input} maxLength={maxEmailLength} value={email} placeholder='Enter your new email address' onChangeText={(val)=>{setemail(val);setIsInvalidEmail(false)}}/>
						{email.length>0 && (<Text style={styles.showLength}>({email.length}/{maxEmailLength})</Text>)}
						{/* {isEmptyEmail ? (<Text style={styles.ErrorMessage}>Email is Required</Text>) : (null)} */}
						{isInvalidEmail ? (<Text style={styles.ErrorMessage}>Enter a valid Email.</Text>) : (null)}
					</View>
				) : null}

			</ScrollView>
			<TouchableOpacity style={styles.Button} onPress={update}>
				<Text style={{color:'#fff'}}>Update</Text>
			</TouchableOpacity>
		</SafeAreaView >
	);
})
export default Update;

