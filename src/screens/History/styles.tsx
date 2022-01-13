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
		fontSize:20,
		color:'#fff',
		marginLeft:40,
		fontFamily:'Inter-Regular',
	},
	Header: {
		backgroundColor: '#0E47A1',
		height: 60,
		alignItems:'center',
		flexDirection:'row',
		elevation:5
	},
	Card:{
		height:96,
		width:'90%',
		borderColor:'#0E47A1',
		alignSelf:'center',
		borderWidth:1,
		borderRadius:8,
		marginTop:10,
		marginBottom:10
	},
	Row:{
		flexDirection:'row',
		alignItems:'center',
		height:40,
		width:'90%',
		alignSelf:'center'
	},
	MailTitle:{
		fontSize:16,
		fontFamily:'Inter-Bold',
		marginLeft:10,
		color:'#000'
	},
	MailText:{
		fontSize:12,
		fontFamily:'Inter-Regular',
		width:'95%',
		alignSelf:'center',
		lineHeight:24
	},
	BillTextLeft:{
		fontSize:12,
		fontFamily:'Inter-Regular',
		width:'50%',
		lineHeight:24
	},
	BillTextRight:{
		fontSize:12,
		fontFamily:'Inter-Regular',
		width:'50%',
		lineHeight:24,
		textAlign:'right'
	},
	ViewText:{
		fontSize:12,
		fontFamily:'Inter-Regular',
		alignSelf:'flex-end',
		right:10,
		color:'#686868'
	},
	ModalBody:{ 
		backgroundColor: '#fff', 
		width: '80%', 
		alignSelf: 'center', 
	},
	ModalHeader:{
		fontSize:24,
		color:'#fff',
		fontFamily:'Inter-Regular'
	},
	ModalView:{
		width:'100%',
		alignSelf:'center',
		marginTop:10,
		backgroundColor:'#fff',
	},
	Wallet:{
		height:100,
		width:'90%',
		alignSelf:'center',
		marginTop:10,
		borderRadius:8,
		justifyContent:'center',
		alignItems:'center',
		marginBottom:10
	},
	WalletTitle:{ 
		color: '#fff', 
		fontFamily: 'Inter-Regular', 
		fontSize: 14 
	},
	WalletSubTitle:{ 
		color: '#fff', 
		fontFamily: 'Inter-Bold', 
		fontSize: 22, 
		marginTop: 10 
	},
	HistoryTitle:{
		fontFamily:'Inter-Bold',
		fontSize:16,
		marginLeft:10,
		marginTop:10,
		color:'#000'
	},
	HistorySubTitle:{
		fontFamily:'Inter-Regular',
		fontSize:16,
		color:'grey',
		marginLeft:10,
		marginBottom:10
	},
	LinearGradient:{height:50,width:'100%',alignItems:'center',justifyContent:'center'}
})

export default styles;