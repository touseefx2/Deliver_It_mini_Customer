import React, { useState, useRef ,useEffect} from 'react';
import { Text, View, Linking, Image, StatusBar, Animated, TouchableOpacity, SafeAreaView, Platform,TextInput,BackHandler,KeyboardAvoidingView} from 'react-native'
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { AUTH_NAV_ID, ROOT_NAV_ID } from '../../navigation/navs'
import LinearGradient from 'react-native-linear-gradient'
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface Props { }

const AddCard = observer((props: Props) => {

	let from=props.from;

	let scroll= useRef(null);

	function handleBackButtonClick() {
		goBack();
		return true;
	   }
	
 
	useEffect(() => { 
		if(from=="search"){ BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick)}
		return () => {
			if(from=="search"){props.onback()}
		 BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick)
		             }
}, [])

	const goBack = () => {
		  Navigation.pop(ROOT_NAV_ID)
	}

	return (
		<SafeAreaView style={styles.Container}>
		 <StatusBar backgroundColor={'#fff'} barStyle='dark-content' />
		
			<KeyboardAwareScrollView 
			 showsVerticalScrollIndicator={false}
			 extraScrollHeight={110} 
			 enableOnAndroid={true} 
             keyboardShouldPersistTaps='handled' 
			 >
		 
			<ScrollView>

              <View style={styles.Header}>
				<TouchableOpacity onPress={()=>goBack()} style={styles.MenuButton}>
					<Icon name={'arrow-back-ios'} size={16} color={'#000'} style={{ marginTop: 9, marginLeft: 10 }} />
				</TouchableOpacity>
				<Text style={styles.Title}>Add new card</Text>
			</View>

				<View style={styles.Body}>
					<View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
						<View style={styles.Lock}>
							<Icon name={'lock'} size={16} color={'#fff'} />
						</View>
						<Text style={{ color: 'grey', fontFamily: 'Inter-Regular', marginLeft: 10 }}>Your payment info is stored securely</Text>
					</View>
					<View style={{ flexDirection: 'row', width: '  90%', alignSelf: 'center', marginTop: 20 }}>
						{/* <MaterialCommunityIcons name='card-bulleted' color='grey' size={50} style={{ width: '15%' }} /> */}
						<CreditCardInput   onChange={(val)=>console.log(val)}  />	
					</View>

					<View style={styles.BottomView}>			
				 
					<View  style={styles.CardIconBG}>
						<Image source={require('../../assets/images/Visa.png')} style={{ height: 25, width: 45, resizeMode: 'contain' }} />
					</View>
					<View style={[styles.CardIconBG,{marginHorizontal:15}]}>
						<Image source={require('../../assets/images/master.png')}  style={{ height: 25, width: 45, resizeMode: 'contain' }} />
					</View>
					<View style={styles.CardIconBG}>
						<Image source={require('../../assets/images/unionpay.png')}  style={{ height: 25, width: 45, resizeMode: 'contain' }} />
					</View>
			 
			  	</View> 

				</View>
 

			</ScrollView >
		
 	</KeyboardAwareScrollView>
			

				    <TouchableOpacity style={styles.BottomButton}>
						<LinearGradient colors={['#0e47a1', '#002171']} style={styles.LinearGradient}>
							<Text style={styles.buttonTextBottom}>Next</Text>
						</LinearGradient>
					</TouchableOpacity>

		


		</SafeAreaView >
	      );
})
export default AddCard;

