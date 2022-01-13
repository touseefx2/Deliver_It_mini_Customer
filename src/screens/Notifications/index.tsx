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
const Notifications = observer((props: Props) => {
	const [isModalVisible, setModalVisible] = useState(false);
	const [message, setMessage] = useState('');
	const [title, setTitle] = useState('');
	const goBack = () => {
		Navigation.pop(ROOT_NAV_ID)
	}
	const gotoDetails=()=>{
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
				<Text style={styles.Title}>Notifications</Text>
			</View>
			<ScrollView>
				<View style={styles.Body}>
					<TouchableOpacity style={{borderBottomWidth:0.5}} onPress={gotoDetails}>
						<Text style={{width:'90%',fontFamily:'Inter-Bold',alignSelf:'center',marginTop:10,fontSize:16}}>There has been a slight change...</Text>
						<Text style={{width:'90%',fontFamily:'Inter-Regular',alignSelf:'center',marginTop:10,fontSize:12,color:'#000'}}>The limit for paying extra cash to the captain has been updated. Read more</Text>
						<Text style={{width:'90%',fontFamily:'Inter-Regular',alignSelf:'center',marginTop:10,marginBottom:10,fontSize:12,color:'grey'}}>27 July</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{borderBottomWidth:0.5}}>
						<Text style={{width:'90%',fontFamily:'Inter-Bold',alignSelf:'center',marginTop:10,fontSize:16}}>Soch Tumhari, Delivery Hamari</Text>
						<Text style={{width:'90%',fontFamily:'Inter-Regular',alignSelf:'center',marginTop:10,fontSize:12,color:'#000'}}>Need to transport your goods urgently? DeliverIt Mini is always thereto save the day!</Text>
						<Text style={{width:'90%',fontFamily:'Inter-Regular',alignSelf:'center',marginTop:10,marginBottom:10,fontSize:12,color:'grey'}}>19 July</Text>
					</TouchableOpacity><TouchableOpacity style={{borderBottomWidth:0.5}}>
						<Text style={{width:'90%',fontFamily:'Inter-Bold',alignSelf:'center',marginTop:10,fontSize:16}}>4 millions Cornettos, 4 million promos</Text>
						<Text style={{width:'90%',fontFamily:'Inter-Regular',alignSelf:'center',marginTop:10,fontSize:12,color:'#000'}}>Flip your Cornetto lid & get a chance to win an upto 50% credit-back promor & and Iphone 12.</Text>
						<Text style={{width:'90%',fontFamily:'Inter-Regular',alignSelf:'center',marginTop:10,marginBottom:10,fontSize:12,color:'grey'}}>9 June</Text>
					</TouchableOpacity>


				</View>
			</ScrollView >

		</SafeAreaView >
	);
})
export default Notifications;

