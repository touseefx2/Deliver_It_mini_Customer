import theme from '../../theme'
import { StyleSheet, Dimensions } from 'react-native'
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
	Container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	Status: {
		backgroundColor: '#fff'
	},
	Body: {
		width: '90%',
		alignSelf: 'center',
	},
	MenuButton: {
		height: 30,
		width: 30,
	},
	Title: {
		color: '#000',
		fontSize: 18,
		fontFamily: 'Inter-Regular',
		marginLeft: 20
	},
	Header: {
		backgroundColor: '#fff',
		height: 60,
		alignItems: 'center',
		flexDirection: 'row',
		alignContent: 'center',
		width: '90%',
		alignSelf: 'center'
	},
	Picker: {
		width: 250,
	},

	DropDownArrow: {
		backgroundColor: '#E5E5E5',
		height: 48,
		width: 18,
		position: 'absolute',
		right: 5,
		justifyContent: 'center'
	},
	DropDownLogo: {
		height: 13,
		width: 13,
		alignSelf: 'center'
	},
})

export default styles;