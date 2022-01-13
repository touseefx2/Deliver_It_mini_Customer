import React, { useState, useRef } from 'react';
import { Text, View, Linking, Image, StatusBar, Animated, TouchableOpacity, SafeAreaView, } from 'react-native'
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { AUTH_NAV_ID, ROOT_NAV_ID } from '../../navigation/navs'
import LinearGradient from 'react-native-linear-gradient'
interface Props { }
const Credit = observer((props: Props) => {
	const [isModalVisible, setModalVisible] = useState(false);
	const [message, setMessage] = useState('');
	const [title, setTitle] = useState('');
	const goBack = () => {
		Navigation.pop(ROOT_NAV_ID)
	}
	const gotoDetails = () => {
		Navigation.push(ROOT_NAV_ID, {
			component: {
				name: 'NotificationDetails',
				options: {
					topBar: {
						visible: false,

					}

				},
			}
		})
	}
	return (

		<SafeAreaView style={styles.Container}>
			<StatusBar backgroundColor={'#fff'} barStyle='dark-content' />
			<View style={styles.Header}>
				<TouchableOpacity onPress={goBack} style={styles.MenuButton}>
					{/* <Image source={require('../../assets/images/back.png')} style={styles.ArrowBack} /> */}
					<Icon name={'arrow-back-ios'} size={16} color={'#000'} style={{ marginTop: 9, marginLeft: 10 }} />
				</TouchableOpacity>
				<Text style={styles.Title}>{props.option}</Text>
			</View>

			<View style={styles.Body}>
				<View style={styles.Card}>
					<Text style={styles.CardTitle}>Transfer Amount</Text>
					<View style={styles.CardRow}>
						<Text style={styles.PKR}>PKR</Text>
						<TextInput style={styles.PKRInput} keyboardType='numeric' />
					</View>
					{/* <Text>Error Message</Text> */}
					<View style={{ height: 1, width: '100%', marginTop: 20, backgroundColor: 'silver' }}></View>
					<TextInput style={{ alignSelf: 'center', height: 70, fontFamily: 'Inter-Regular', fontSize: 16 }} placeholder='Add a message...' />
				</View>

				{/* <View style={{flexDirection:'row',justifyContent:'center',marginTop:30}}>
						<View style={styles.LeftCircle}>

						</View>
						<View style={styles.RightCircle}>

						</View>
					</View> */}
				<TouchableOpacity style={styles.BottomButton}>
					<LinearGradient colors={['#0e47a1', '#002171']} style={styles.LinearGradient}>
						<Text style={styles.buttonTextBottom}>Next</Text>
					</LinearGradient>
				</TouchableOpacity>
			</View>


		</SafeAreaView >
	);
})
export default Credit;

