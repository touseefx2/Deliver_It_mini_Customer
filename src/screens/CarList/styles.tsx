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
	BackButton:{
		height:30,
		width:'15%',
		left:15,
	},
	title: {
		color: '#000',
		fontSize: 16,
		width: '90%',
		lineHeight: 19,
		paddingTop: 10,
		fontFamily: 'Inter-Bold',
		fontWeight: 'bold',
	},
	Header: {
		backgroundColor: '#0E47A1',
		height: 50,
		flexDirection:'row',
		alignItems:'center',
		elevation:5
	},
	Body: {
		width: '100%',
		alignSelf: 'center',
		flex:1,
	},
	subTitle: {
		color: '#9B9B9B',
		fontSize: 16,
		lineHeight: 32,
		fontFamily: 'Inter-Regular',
		width: '90%'
	},
	CarInput:{
		height:48,
		width:'100%',
		borderColor:'#0E47A1',
		borderWidth:1,
		marginTop:20,
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#FFFFFF'
	},
	Button:{
		height:32,
		width:100,
		justifyContent:'center',
		marginTop:20
	},
	ButtonText:{
		color:'#fff',
		fontFamily:'Inter-Regular',
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
		backgroundColor:'#FFFFFF'
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
		backgroundColor:'#FFFFFF'
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
	DateText:{
		marginLeft:10,
		color:'#0E47A1'
	},
	Top:{
		height:350,
		width:'100%',
		backgroundColor:'#0E47A1'
	},
	FilterView:{
		width:'90%',
		flexDirection:'row',
		alignItems:'center',
		marginTop:5,
		marginBottom:10,
		alignSelf:'center'
	},
	TextRight:{
		color:'#0E47A1',
		fontFamily:'Inter-Regular',
		width:'20%',
	},
	TextRightFilter:{
		color:'#0E47A1',
		fontFamily:'Inter-Regular',
		position:'absolute',
		right:0,
		width:'20%',
		textAlign:'right'
	},
	Card:{
		height:128,
		width:'90%',
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#fff',
		borderRadius:8,
		marginTop:10,
		elevation:5,
		overflow:'hidden',
		marginBottom:10,
		alignSelf:'center'
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
	SortModal:{ 
		width: 180,
		alignSelf: 'center', 
		backgroundColor: '#fff', 
		justifyContent: 'center', 
	},
	SortModalButton:{
		height:48,
		borderBottomColor:'#000',
		borderBottomWidth:0.5,
		justifyContent:'center'
	},
	SortHeader:{
		height:50,
		width:'100%',
		backgroundColor:'#0E47A1',
		justifyContent:'center',
		alignItems:'center'
	}
})

export default styles;