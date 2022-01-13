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
	HeaderText:{
		fontSize:20,
		color:'#fff',
		marginLeft:40
	},

	BellButton: {
		height: 30,
		width: 30,
		right: 10,
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
		width: '90%',
		lineHeight: 19,
		paddingTop: 10,
		fontFamily: 'Inter-Bold',
		marginLeft:10
	},
	Header: {
		backgroundColor: '#0E47A1',
		height: 50,
		alignItems: 'center',
		flexDirection:'row',
		elevation:5
	},
	DropDown:{
		borderWidth:1,
		borderColor:'#0E47A1',
		width:'100%',
		height:48,
		borderRadius:4,
		justifyContent:'center',
		overflow:'hidden',
		marginTop:30
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
	Body: {
		width: '90%',
		alignSelf: 'center',
		marginTop:10,
		marginBottom:10
	},
	FindButton:{
		width:'100%',
		height:48,
		backgroundColor:'#0E47A1',
		marginTop:10,
		justifyContent:'center',
		alignItems:'center',
		marginBottom:10,
		borderRadius:4
	},
	UploadButton:{
		width:'100%',
		height:48,
		borderWidth:1,
		borderColor:'#0E47A1',
		marginTop:20,
		justifyContent:'center',
		alignItems:'center',
		marginBottom:10,
		borderRadius:4,
		
	},
	UploadText:{
		color:'#000',
		fontFamily:'Inter-Regular',
		fontSize:12,
		padding:5
	},
	FindText:{
		color:'#fff',
		fontFamily:'Inter-Regular',
		fontSize:14,
		alignSelf:'center'
	},
	DirectionButton:{
		width:'100%',
		height:48,
		backgroundColor:'#0E47A1',
		marginTop:20,
		justifyContent:'center',
		alignItems:'center',
		marginBottom:10,
		borderRadius:4
	},
	DirectionText:{
		color:'#0E47A1',
		fontFamily:'Inter-Regular',
		fontSize:9,
		alignSelf:'center',marginTop:-10
	},
	CardRed:{
		width:'100%',
		backgroundColor:'#FF0000',
		borderRadius:4,
		marginTop:10,
		elevation:5,
		overflow:'hidden',
		marginBottom:10
	},
	CardBlue:{
		width:'100%',
		backgroundColor:'#F0F0F0',
		borderRadius:4,
		marginTop:10,
		elevation:5,
		overflow:'hidden',
		marginBottom:10
	},
	TopCard:{ 
		height: 127, 
		backgroundColor: '#fff',
		overflow:'hidden',
		borderBottomRightRadius:4,
		borderBottomLeftRadius:4 
	},
	Image:{
		width:'46%',
		height:127,
		backgroundColor:'#fff'
	},
	Description:{
		height:127,
		width:'54%',
		justifyContent:'center',
		position:'absolute',
		right:0,
		backgroundColor:'#fff'
	},
	Hour:{
		color:'#000',
		fontSize:12
	},
	Price:{
		color:'#0E47A1',
		fontSize:18,
		marginLeft:10,
		fontFamily:'Inter-Regular'
	},
	Rating:{
		flexDirection:'row',
		width:'95%',
		alignItems:'center',
		marginLeft:10
	},
	TextRating:{
		color:'#797979',
		fontSize:12,
		fontFamily:'Inter-Regular'
	},
	CardBottomText:{ 
		color: '#fff', 
		fontSize: 12, 
		padding: 5, 
		fontFamily: 'Inter-Regular' ,
		width: '90%'
	},
	InvoiceBody:{
		width:'90%',
		alignSelf:'center'
	},
	InvoiceTitle:{
		color: '#fff', 
		fontSize: 14, 
		fontFamily: 'Inter-Bold' ,
		marginTop:10
	},
	InvoiceText:{
		color: '#fff', 
		fontSize: 12, 
		fontFamily: 'Inter-Regular' ,
	},
	Invoice:{ width: '90%', alignSelf: 'center', justifyContent: 'center', backgroundColor: '#fff', elevation: 5, marginTop: -10 },
	InvoiceBodySmall:{ width: '90%', height: '90%', alignSelf: 'center' },
	HeadingLeft:{ fontFamily: 'Inter-Regular',  color: 'grey', width: '50%', fontSize: 12 },
	HeadingRight:{ fontFamily: 'Inter-Regular', color: 'grey', width: '50%', textAlign: 'right', fontSize: 12 },
	DescLeft:{ fontFamily: 'Inter-Bold',  color: '#000', width: '50%', fontSize: 12 },
	DescRight:{ fontFamily: 'Inter-Bold', marginBottom: 5, color: '#000', width: '50%', textAlign: 'right', fontSize: 12 },
	Desc:{ fontFamily: 'Inter-Bold',  color: '#000', width: '100%', fontSize: 12 },
	TitleCenter:{ fontFamily: 'Inter-Bold',  color: 'grey', width: '100%', fontSize: 16,textAlign:'center',marginTop:20 },
	DescCenter:{ fontFamily: 'Inter-Bold',  color: '#0e47a1', width: '100%', fontSize: 16,textAlign:'center' },
	Row:{ flexDirection: 'row', width: '100%', borderBottomWidth: 1, borderColor: 'silver' },
	Row1:{ flexDirection: 'row', width: '100%'}
})

export default styles;