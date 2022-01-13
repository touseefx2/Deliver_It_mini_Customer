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
const Packages = observer((props: Props) => {
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
				<Text style={styles.Title}>Learn more</Text>
			</View>
			<Text style={styles.BodyTitle}>Packages</Text>
			<View style={styles.Body}>
				<View style={styles.Circle}>
					<Image source={require('../../assets/images/percent.png')}/>
					<View style={styles.BackSoonView}>
						<Text style={styles.BSText}>BACK SOON</Text>
					</View>
				</View>
				<Text style={styles.SubTitle}>Packages aren't currently available</Text>
				<Text style={styles.MsgText}>We'll let you know when you can buy them again</Text>
				<TouchableOpacity style={styles.BottomButton} onPress={goBack}>
					<LinearGradient colors={['#0e47a1', '#002171']} style={styles.LinearGradient}>
						<Text style={styles.buttonTextBottom}>Back</Text>
					</LinearGradient>
				</TouchableOpacity>
			</View>
		</SafeAreaView >
	);
})
export default Packages;

