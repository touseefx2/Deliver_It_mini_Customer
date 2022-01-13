import React, { useState, useRef } from 'react';
import { Text, View, Linking, Image, StatusBar, Animated, TouchableOpacity, SafeAreaView, } from 'react-native'
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { AUTH_NAV_ID, ROOT_NAV_ID } from '../../navigation/navs'
import LinearGradient from 'react-native-linear-gradient'
interface Props { }
const NotificationDetails = observer((props: Props) => {
	const [isModalVisible, setModalVisible] = useState(false);
	const [message, setMessage] = useState('');
	const [title, setTitle] = useState('');
	const goBack = () => {
		Navigation.pop(ROOT_NAV_ID)
	}
	return (
		<SafeAreaView style={styles.Container}>
			<StatusBar backgroundColor={'#fff'} barStyle='dark-content' />
			<View style={styles.Header}>
				<TouchableOpacity onPress={goBack} style={styles.MenuButton}>
					{/* <Image source={require('../../assets/images/back.png')} style={styles.ArrowBack} /> */}
					<Icon name={'arrow-back-ios'} size={16} color={'#000'} style={{ marginTop: 9, marginLeft: 10 }} />
				</TouchableOpacity>
			</View>
			<ScrollView>
				<View style={styles.Body}>
					<Text style={{ width: '90%', fontFamily: 'Inter-Bold', alignSelf: 'center', marginTop: 40, fontSize: 24 }}>There has been a slight change...</Text>
					<Text style={styles.Message}>The limit for paying extra cash to the captain has been updated. Read more</Text>
					<Text style={styles.Message}>Hi! Waleed</Text>
					<Text style={styles.Message}>We design all our policies keeping in mind the convenience of both our Customers & Captains.</Text>
					<Text style={styles.Message}>To make the procewss of payments easier for all of you, we have updated the limit for paying extra cash to the Captain after the ride ends.</Text>
					<Text style={styles.Message}>Now, out Gold customers can pay an extra amount of PKR 400 to the Captain and our non-gold customers can pay an extra PKR 100 after each ride to add to their Careem PAY Wallet. Don't forget to double-check the upated amount in your Wallet after paying the Captain.</Text>

				</View>
			</ScrollView >
			<TouchableOpacity style={styles.Button} onPress={goBack}>
				<Text style={styles.ButtonText}>Close</Text>
			</TouchableOpacity>
		</SafeAreaView >
	);
})
export default NotificationDetails;

