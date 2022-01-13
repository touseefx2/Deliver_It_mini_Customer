import theme from '../../theme'
import { StyleSheet, Dimensions } from 'react-native'
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
	Container: {
		flex: 1,
		backgroundColor: '#E5E5E5',
	},
	Status: {
		backgroundColor: '#0E47A1'
	},
	logo: {
		height: 96,
		width: 96,
		top: 65,
	},
	title: {
		color: '#000',
		fontSize: 32,
		width: 269,
		lineHeight: 32,
		height: 48,
		paddingTop: 10,
		fontFamily: 'Inter-Bold',
		fontWeight: 'bold',
		marginTop: 20
	},
	CarTitle: {
		color: '#000',
		fontSize: 16,
		width: '90%',
		lineHeight: 19,
		paddingTop: 10,
		fontFamily: 'Inter-Bold',
		fontWeight: 'bold',
	},
	helloText: {
		color: '#000',
		fontSize: 32,
		width: 269,
		lineHeight: 32,
		height: 48,
		paddingTop: 10,
		fontFamily: 'Inter-Regular',
		marginTop: 20
	},
	Title: {
		color: '#fff',
		fontSize: 18,
		fontFamily: 'Inter-Bold',
		marginLeft: 40
	},
	Header: {
		backgroundColor: '#0E47A1',
		height: 60,
		alignItems: 'center',
		flexDirection:'row',
		elevation:5
	},
	MenuButton: {
		height: 30,
		width: 30,
		left: 15
	},

	BellButton: {
		height: 30,
		width: 30,
		right: 20,
	},
	Body: {
		width: '90%',
		alignSelf: 'center',
	},
	subTitle: {
		color: '#9B9B9B',
		fontSize: 16,
		lineHeight: 32,
		fontFamily: 'Inter-Regular',
		width: '90%'
	},
	Banner: {
		backgroundColor: '#FF565E',
		width: '100%',
		height: 123,
		borderRadius: 10,
		marginTop: 10,
		// elevation:22
	},
	CarInput:{
		height:48,
		width:'100%',
		borderColor:'#0E47A1',
		borderWidth:1,
		flexDirection:'row',
		alignItems:'center',
		borderRadius:4
	},
	Button:{
		height:32,
		width:'100%',
		justifyContent:'center',
		marginTop:20,
	},
	
	MakeButton:{
		height:32,
		width:'53%',
		justifyContent:'center',
		marginTop:20
	},
	ButtonText:{
		color:'#000',
		fontFamily:'Inter-Bold',
		fontSize:16
	},
	PickUp:{
		height:48,
		width:'100%',
		flexDirection:'row',
		alignItems:'center',
	},
	Date:{
		flexDirection:'row',
		width:'47%',
		height:'100%',
		borderColor:'#0E47A1',
		borderWidth:1,
		alignItems:'center',
		borderRadius:4
		
	},
	Time:{
		flexDirection:'row',
		width:'47%',
		height:'100%',
		borderColor:'#0E47A1',
		borderWidth:1,
		position:'absolute',
		right:0,
		alignItems:'center',
		borderRadius:4
	},
	DateText:{
		marginLeft:10,
		color:'#000',
	},
	FindButton:{
		width:'100%',
		height:48,
		backgroundColor:'#0E47A1',
		marginTop:20,
		justifyContent:'center',
		alignItems:'center',
		marginBottom:20,
		borderRadius:4
	},
	FindText:{
		color:'#fff',
		fontFamily:'Inter-Regular',
		fontSize:16
	},
	BottomView:{
		height:60,
		width:'100%',
		position:'absolute',
		bottom:0,
		backgroundColor:'#0E47A1'
	},
	FloatingButton:{
		justifyContent:'center',
		height:50,
		width:50,
		borderRadius:70,
		backgroundColor:'#fff',
		elevation:20,
		alignSelf:'center',
		bottom:5,
		alignItems:'center',
	},
	LogoContainer:{ 
		height: 50, 
		width: 50,
		marginRight:25,
		marginBottom:10, 
		marginLeft:5,
		elevation: 5, 
		backgroundColor: '#fff', 
		borderRadius: 6,
		justifyContent:'center',
		alignItems:'center'
	},
	LogoIcons:{ 
		height: 45, 
		width: 45, 
		borderRadius: 6, 
		resizeMode: 'contain',
		alignSelf:'center' 
	},
	Card:{
		height:128,
		width:'100%',
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#fff',
		borderRadius:8,
		marginTop:20,
		elevation:5,
		overflow:'hidden',
		marginBottom:10
	},
	Image:{
		width:'46%',
		height:'100%'
	},
	Description:{
		height:'100%',
		width:'52%',
		justifyContent:'center',
		position:'absolute',
		right:0
	},
	Hour:{
		color:'#000',
		fontSize:12
	},
	Price:{
		color:'#0E47A1',
		fontSize:18
	},
	Rating:{
		flexDirection:'row',
		width:'95%',
		alignItems:'center'
	},
	TextRating:{
		color:'#797979',
		fontSize:12,
		fontFamily:'Inter-Regular'
	},
	Row:{
		flexDirection:'row',
		width:'100%'
	},
	Make:{
		height:48,
		width:'47%',
		borderColor:'#0E47A1',
		borderWidth:1,
		justifyContent:'center'
	},
	City:{
		height:48,
		width:'47%',
		borderColor:'#0E47A1',
		borderWidth:1,
		position:'absolute',
		right:0,
		justifyContent:'center'
	},
	DropDownArrow:{
		backgroundColor:'#F2F2F2',
		height:48,
		width:18,
		position:'absolute',
		right:0,
		justifyContent:'center'
	},
	DropDownLogo:{
		height:13,
		width:13,
		alignSelf:'center'
	},
	Picker:{
		width: '100%',
		color:'#0E47A1',
		marginLeft:-5
	},
	Checkbox:{ 
		backgroundColor: 'transparent', 
		marginLeft: -10, 
		marginTop: 20, 
		borderColor: 'transparent' 
	},
})

export default styles;