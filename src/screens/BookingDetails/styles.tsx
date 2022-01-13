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
	MenuButton: {
		height: 30,
		width: 30,
		left: 15
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
		alignItems:'center',
		flexDirection:'row'
	},
	LinearGradient:{
		height:50,
		width:'100%',
		alignItems:'center',
		justifyContent:'center'
	},
	Profile:{
		height:100,
		width:'90%',
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#fff',
		alignSelf:'center',
		elevation:5
	},
	ProfileImage:{
		height:80,
		width:80,
		borderRadius:999,
		marginLeft:20
	},
	ProfileName:{
		marginLeft: 10, 
		fontSize: 20 ,
		fontFamily:'Inter-Bold',
		color:'#0E47A1'
	},
	Rating:{
		flexDirection:'row',
		marginLeft:10
	},
	CarRating:{
		flexDirection:'row',
	},
	TextRating:{
		color:'#797979',
		fontSize:12,
		fontFamily:'Inter-Regular',
		marginLeft:10
	},
	Card:{
		height:128,
		width:'90%',
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#fff',
		borderRadius:8,
		marginTop:20,
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
	title: {
		color: '#000',
		fontSize: 16,
		width: '90%',
		lineHeight: 19,
		paddingTop: 10,
		fontFamily: 'Inter-Bold',
		fontWeight: 'bold',
	},
	DateText:{
		color:'grey',
		width:'45%',
		textAlign:'right',
		fontFamily:'Inter-Regular'
	},
	Top:{
		flex:1,
		width:'90%',
		alignSelf:'center'
	},
	Button:{
		height:35,
		width:'100%',
		marginTop:20,
		flexDirection:'row',
	},
	ButtonEnd:{
		height:48,
		width:'100%',
		marginTop:20,
		flexDirection:'row',
		borderBottomWidth:1,
		borderTopWidth:1,
		alignItems:'center'
	},
	ButtonInvoice:{
		height:40,
		width:'100%',
		justifyContent:'center',
		marginTop:20,
		borderBottomWidth:2,
		borderBottomColor:'#0E47A1'
	},
	ButtonInvoiceText:{
		color:'#0E47A1',
		fontFamily:'Inter-Bold',
		fontSize:16
	},
	ButtonText:{
		color:'#000',
		fontFamily:'Inter-Regular',
		fontSize:16,
		width:'55%',

	},
	PickUp:{
		height:48,
		width:'100%',
		flexDirection:'row',
		alignItems:'center',
		borderBottomColor:'#0E47A1',
		borderBottomWidth:1
	},
	ButtonTextLeft:{
		color:'#0E47A1',
		fontFamily:'Inter-Bold',
		fontSize:16,
		width:'50%',
	},
	
	ButtonTextRight:{
		color:'#0E47A1',
		fontFamily:'Inter-Bold',
		fontSize:16,
		width:'47%',
		position:'absolute',
		right:0,
	},
	Date:{
		flexDirection:'row',
		width:'47%',
		height:'100%',
		alignItems:'center',
	},
	Time:{
		flexDirection:'row',
		width:'47%',
		position:'absolute',
		right:0,
		alignItems:'center',
	},
	Location:{
		flexDirection:'row',
		width:'100%',
		height:'100%',
		borderColor:'#0E47A1',
		borderWidth:1,
		alignItems:'center',
	},
	EndButtom:{
		width:'100%',
		height:48,
		backgroundColor:'#FF3D00',
		justifyContent:'center',
		alignItems:'center',
		borderRadius:4,
		marginBottom:20,
		marginTop:20
	},
	EndButtomText:{
		color:'#fff',
		fontSize:16,
		fontFamily:'Inter-Regular'
	},
	ModalBody:{ 
		backgroundColor: '#fff', 
		width: '90%', 
		alignSelf: 'center', 
	},
	ModalHeader:{
		alignSelf:'center',
		fontSize:24,
		color:'#fff',
	},
	ModalSplit:{
		borderBottomWidth:1,
		borderBottomColor:'#5299D3',
		width:'100%',
		height:20
	},
	ModalView:{
		flexDirection:'row',
		width:'85%',
		alignSelf:'center',
		marginTop:10
	},
	ModalContinueButtonText:{
		alignSelf:'center',
		color:'#0E47A1',
		lineHeight:20,
		fontSize:16
	},
	ModalFeatureButton:{
		backgroundColor: '#A6A6A6',
		borderRadius: 4,
		height:48,
		justifyContent:'center',
		width:'85%',
		alignSelf:'center',
		marginBottom:20,
		marginTop:20
	},
	ContinueButton:{
		backgroundColor: '#0E47A1',
		borderRadius: 4,
		height:48,
		justifyContent:'center',
		marginTop:20,
		width:'100%',
		alignSelf:'center',
		marginBottom:20,
		overflow:'hidden'
	},
	ContinueButtonText:{
		alignSelf:'center',
		color:'#fff',
		lineHeight:20,
		fontSize:16,
		fontFamily:'Inter-Regular',
	},
})

export default styles;