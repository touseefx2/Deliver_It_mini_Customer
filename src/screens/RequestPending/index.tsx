import React, { useState } from 'react';
import { Text, View, TextInput, Image, StatusBar, PermissionsAndroid, TouchableOpacity, SafeAreaView, FlatList } from 'react-native'
import { superheroStore } from '../../store/Superheroes'
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import styles from './styles'
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import { gotoHome, ROOT_NAV_ID } from '../../navigation';
const RequestPending = observer(() => {


	return (
		<SafeAreaView style={styles.Container}>
			<LinearGradient colors={['#0e47a1', '#002171']} style={styles.LinearGradient}>
				<StatusBar
					animated={true}
					barStyle="light-content"
					backgroundColor={styles.Status.backgroundColor} />

				<View style={styles.Body}>
					<Image source={require('../../assets/images/logo.png')} style={styles.logo} />
					<Text style={styles.Description}>Thank you for booking your next ride with Karblock. Our customer service representative will confirm your booking with the car owner and will get back to you shortly.</Text>
					<TouchableOpacity style={styles.ContinueButton} onPress={() => gotoHome()}>

						<Text style={styles.ContinueButtonText}>Continue</Text>
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</SafeAreaView>
	);
})
export default RequestPending;
