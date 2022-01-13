import React, { useState } from 'react';
import { Text, View, ScrollView, Image, StatusBar, TextInput, TouchableOpacity, SafeAreaView, FlatList } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import styles from './styles'
import Icon from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import LinearGradient from 'react-native-linear-gradient'
import { AirbnbRating } from 'react-native-elements';
import { BOOKINGS_NAV_ID, gotoHome, gotoRequestPending, ROOT_NAV_ID, WALLET_NAV_ID } from '../../navigation';
import StarRating from 'react-native-star-rating';
interface Props { }
const Rating = observer((props: Props) => {
	const [comment, setComment] = useState('');
	const [starCount,setStarCount]=useState(0);
	const goBack = () => {
		Navigation.pop(ROOT_NAV_ID)
	}
	return (
		<SafeAreaView style={styles.Container}>

			<StatusBar
				animated={true}
				barStyle="light-content"
				backgroundColor='#0e47a1' />
			<LinearGradient colors={['#0e47a1', '#002171']} style={styles.Header}>
				<TouchableOpacity onPress={goBack} style={styles.BackButton}>
					{/* <Image source={require('../../assets/images/back.png')} style={styles.ArrowBack} /> */}
					<Icon name={'arrow-back'} size={30} color={'#fff'} />
				</TouchableOpacity>
				<Text style={styles.HeaderText}>Review</Text>
			</LinearGradient>
			<ScrollView>
				<View style={styles.Body}>
					<Entypo name='star' color='#FFD600' size={100} style={{ alignSelf: 'center', marginTop: 30 }} />
					<Text style={{ textAlign: 'center', width: '100%', lineHeight: 29, fontFamily: 'Inter-Regular', marginTop: 30 }}>Thank you for using Karblock for renting out your vehicle. Please rate your experience with the renter so that we can make our services even better for you.</Text>
					{/* <View style={styles.Row}>
						<Text style={styles.RatingText}>
							Communication
						</Text>
						<View style={styles.Rating}>
							<AirbnbRating
								count={5}
								reviews={[]}
								defaultRating={0}
								size={20}
								onFinishRating={(rating)=>console.log(rating)}
							/>
						</View>
					</View>
					<View style={styles.Row}>
						<Text style={styles.RatingText}>
							Punctuality
						</Text>
						<View style={styles.Rating}>
							<AirbnbRating
								count={5}
								reviews={[]}
								defaultRating={0}
								size={20}
								onFinishRating={(rating)=>console.log(rating)}
							/>
						</View>
					</View>
					<View style={styles.Row}>
						<Text style={styles.RatingText}>
							Reliablilty
						</Text>
						<View style={styles.Rating}>
							<AirbnbRating
								count={5}
								reviews={[]}
								defaultRating={0}
								size={20}
								onFinishRating={(rating)=>console.log(rating)}
							/>
						</View>
					</View>
					<View style={styles.Row}>
						<Text style={styles.RatingText}>
							Professional
						</Text>
						<View style={styles.Rating}>
							<AirbnbRating
								count={5}
								reviews={[]}
								defaultRating={0}
								size={20}
								onFinishRating={(rating)=>console.log(rating)}
							/>
						</View>
					</View>
					<View style={styles.Row}>
						<Text style={styles.RatingText}>
							Recommendation
						</Text>
						<View style={styles.Rating}>
							<AirbnbRating
								count={5}
								reviews={[]}
								defaultRating={0}
								size={20}
								onFinishRating={(rating)=>console.log(rating)}
							/>
						</View>
					</View> */}

					<View style={styles.Rating}>
						{/* <AirbnbRating
							count={5}
							reviews={[]}
							defaultRating={0}
							size={50}
							onFinishRating={(rating) => console.log(rating)}
						/> */}
						<StarRating
							disabled={false}
							maxStars={5}
							fullStarColor={'#FFD600'}
							rating={starCount}
							selectedStar={(rating) => setStarCount(rating)}
						/>
					</View>
					<Text style={styles.BottomText}>Anything else you want to mention</Text>
					<View style={styles.CommentBox}>
						<TextInput style={{ height: '100%', width: '100%' }} onChangeText={(val) => setComment(val)} />
					</View>
					<TouchableOpacity style={styles.ContinueButton} onPress={gotoHome}>
						<LinearGradient colors={['#0e47a1', '#002171']} style={styles.LinearGradient}>

							<Text style={styles.ContinueButtonText}>Submit</Text>
						</LinearGradient>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
})
export default Rating;
