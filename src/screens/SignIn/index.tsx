import React, { useState ,useEffect} from 'react';
import { Text, View, TextInput, Image, StatusBar, TouchableOpacity, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import styles from './styles'
import { usermanager } from '../../managers/UserManager';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { ROOT_NAV_ID, AUTH_NAV_ID, gotoHome } from '../../navigation';
import LinearGradient from 'react-native-linear-gradient'
import {generalmanager} from '../../managers/generalManager';
import utils from '../../utils';
 
const SignIn = observer(() => {
	const mobileReg = /^[3]\d{9}$/;
	const [isEmptyMobile, setIsEmptyMobile] = useState(false);
	const [invalidMobile, setInValidMobile] = useState(false);
	const [mobile, setMobile] = useState('');
	
	useEffect(() => {
 
	}, [])

	const goBack = () => {
		Navigation.pop(AUTH_NAV_ID)
	}
	const Continue = () => {
		if (mobile.trim().length == 0) {
			setIsEmptyMobile(true)
			return
		}
		if (mobileReg.test(mobile.trim()) === false) {
			setInValidMobile(true)
			return
		}

		if(generalmanager.internet){
			usermanager.addMobile("+92"+mobile)
			gotoOTP();
		}else{
			utils.AlertMessage("","Please connect internet !")
		}

		
	}

	
	const gotoOTP=()=>{
		Navigation.push(AUTH_NAV_ID, {
			component: {
				name: 'OTP',
				options: {
					topBar: {
						visible: false
					}
				}
			}
		})
	}
	return (
		<SafeAreaView style={styles.container}>
			
			<StatusBar
				animated={true}
				barStyle="dark-content"
				backgroundColor={styles.Status.backgroundColor} />
			<View style={styles.Header}>
				<TouchableOpacity onPress={goBack} style={styles.MenuButton}>
					{/* <Image source={require('../../assets/images/back.png')} style={styles.ArrowBack} /> */}
					<Icon name={'arrow-back-ios'} size={18} color={'#000'} style={{marginTop:9,marginLeft:7}}/>
				</TouchableOpacity>
			</View>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View style={styles.Body}>
					<Text style={styles.title}>Enter your mobile number</Text>
					<Text style={styles.subTitle}>Enter your mobile number to create an account or log in.</Text>
					<View style={styles.FormTitle1}>
						<View style={styles.Input}>
							<Image source={require('../../assets/images/pakistan.png')} style={styles.CountryLogo} />
							
							<Text style={{ paddingLeft:5,paddingRight:5,paddingBottom:2 }}>+92</Text>
							<TextInput style={styles.MobileInput} maxLength={10} keyboardType='phone-pad' value={mobile} placeholder='3123456789' onChangeText={val => { setMobile(val.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '')); setIsEmptyMobile(false); setInValidMobile(false); }} />
							{/* <Entypo name={'cross'} size={18} color={'grey'} onPress={()=>setMobile('')}/> */}
						</View>
						{isEmptyMobile ? (<Text style={styles.ErrorMessage}>Mobile is Required</Text>) : (null)}
						{invalidMobile ? (<Text style={styles.ErrorMessage}>Enter a valid Mobile No.</Text>) : (null)}
					</View>
					<TouchableOpacity onPress={Continue} style={styles.BottomButton}>
						<LinearGradient colors={['#0e47a1', '#002171']} style={styles.LinearGradient}>
							<Text style={styles.buttonTextBottom}>Continue</Text>
						</LinearGradient>
					</TouchableOpacity>
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView >
	);
})
export default SignIn;
