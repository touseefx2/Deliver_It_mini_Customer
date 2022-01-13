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
	HeaderText:{
		fontSize:20,
		color:'#fff',
		marginLeft:40
	},

	BellButton: {
		height: 30,
		width: 30,
		right: 20,
		position: 'absolute'
	},
	logo: {
		height: 96,
		width: 96,
		top: 65,
	},
	MenuButton: {
		height: 30,
		width: 30,
		left: 15
	},
	title: {
		color: '#000',
		fontSize: 16,
		width: '95%',
		lineHeight: 19,
		fontFamily: 'Inter-Bold',
		alignSelf:'center',
		marginBottom:10
	},
	Header: {
		backgroundColor: '#fff',
		height: 50,
		alignItems: 'center',
		flexDirection:'row',
	},
	Body: {
		width: '90%',
		alignSelf: 'center',
		marginTop:20,
	},
	Button:{ 
		height: 48, 
		width: '90%', 
		alignSelf: 'center', 
		justifyContent: 'center', 
		alignItems: 'center', 
		borderRadius: 4, 
		backgroundColor: '#0e47a1', 
		position: 'absolute', 
		bottom: 20 
	},
	Input:{
		borderBottomWidth:2,
		borderBottomColor:'#000',
		width:'100%',
		height:48,
		alignItems:'center',
		flexDirection:'row',
		fontFamily:'Inter-Regular',
	},
	PInput:{
		borderBottomWidth:2,
		borderBottomColor:'grey',
		width:'100%',
		height:48,
		alignItems:'center',
		flexDirection:'row',
		fontFamily:'Inter-Regular',
		marginBottom:20
	},
	CountryLogo:{
		height:25,
		width:25,
		resizeMode:'contain',
	},
	MobileInput:{
		width:'78%',
	},
	ErrorMessage:{
		color:'red',
		marginTop:7,
		fontSize:10,
		fontFamily:'Inter-Regular'
	},
	showLength:{
    color:'black',
	position:"absolute",
	right:0,
	top:55,
	alignSelf:"flex-end",
	fontSize:10,
	fontFamily:'Inter-Regular'},
})

export default styles;