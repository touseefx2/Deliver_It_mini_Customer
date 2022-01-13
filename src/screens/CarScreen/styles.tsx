import theme from '../../theme'
import { StyleSheet,Dimensions} from 'react-native'
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
	Container: {
		flex: 1,
		backgroundColor: '#E5E5E5',
	},
    Status:{
        backgroundColor:'#E5E5E5'
    },
	Body:{
		width:'90%',
		alignSelf:'center',
	},
	BackButton:{
		left:15
	},
	Header:{
		height:50,
		width:'100%',
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#E5E5E5',
		elevation:5
	},
	HeaderText:{
		fontSize:20,
		color:'#0E47A1'
	},
	ArrowBack:{
		height:24,
		width:24,
	},
	CarBox:{
		height:'100%',
		width:176,
		justifyContent:'center',
		alignItems:'center',
		marginRight:10
	},
	CarImage:{
		height:350,
		width:'100%',
	},
	DescriptionBox:{
		borderWidth:1,
		borderColor:'#0E47A1',
		width:'100%',
		marginTop:15,
		borderRadius:4,
	},
	DescriptionText:{
		fontSize:16,
		lineHeight:32,
		padding:10,
		fontFamily:'Inter-Regular'

	},
	Input:{
		backgroundColor:'#0E47A1',
		width:'100%',
		marginTop:10,
		height:48,
		alignItems:'center',
		flexDirection:'row',
		fontSize:16,
		padding:16,
		fontFamily:'Inter-Regular',
		borderRadius:4
	},
	BodyTitle:{
		fontSize:16,
		lineHeight:19,
		fontWeight:'bold',
		marginTop:10,
		color:'#fff',
		fontFamily:'Inter-Regular'
	},
	ModalBody:{ 
		backgroundColor: '#fff', 
		width: '100%', 
		alignSelf: 'center', 
		elevation:5
	},
	ModalHeader:{
		alignSelf:'center',
		height:30,
		fontSize:24,
		color:'#fff',
		marginTop:20,
		fontFamily:'Inter-Regular'
	},
	ModalSplit:{
		borderBottomWidth:1,
		borderBottomColor:'#5299D3',
		width:'100%',
		height:20
	},
	ModalView:{
		flexDirection:'row',
		width:'90%',
		alignSelf:'center',
		marginTop:5,
		marginBottom:5,
		// backgroundColor: '#2AV100', 
		borderRadius: 4, 
	},
	Features:{ 
		color: '#fff', 
		padding: 5, 
		backgroundColor:'#0E47A1',
		marginRight:10,
		borderRadius:4
	},
	Dots:{ 
		height: 15, 
		width: 15, 
		backgroundColor: '#0E47A1', 
		opacity: 0.6, 
		marginLeft: 5, 
		borderRadius: 10 
	},
	ActiveDotOuter:{ 
		height: 20, 
		width: 20, 
		backgroundColor: '#0E47A1', 
		borderRadius: 10, 
		justifyContent: 'center' 
	},
	ActiveDotInner:{ 
		borderWidth: 1, 
		borderColor: '#fff', 
		height: 17, 
		width: 17, 
		borderRadius: 10, 
		alignSelf: 'center' 
	},
	BottomButtons:{
		flexDirection:'row',
		width:'100%',
		height:60,
		marginBottom:20,
		marginTop:20
	},
	ButtonLeft:{
		width:'45%',
		justifyContent:'center',
		alignItems:'center',
		height:48,
		backgroundColor:'#0E47A1',
		opacity:0.6,
		marginRight:'5%',
		borderRadius:4
	},
	ButtonRight:{
		width:'45%',
		justifyContent:'center',
		alignItems:'center',
		height:48,
		backgroundColor:'#0E47A1',
		marginLeft:'5%',
		borderRadius:4,
	},
	ButtonText:{
		color:'#fff',
		fontSize:14,
		fontFamily:'Inter-Regular'
	},
	Info:{
		height:90,
		width:'100%',
		borderColor:'#0E47A1',
		borderWidth:1,
		marginTop:20,
		marginBottom:20,
		flexDirection:'row',
	},
	Image:{
		height:56,
		width:56
	},
	LeftBox:{
		width:'30%',
		height:'100%',
		justifyContent:'center',
		alignItems:'center'
	},
	RightBox:{
		width:'70%',
		height:'100%',
		justifyContent:'center',
	},
	RatingText:{
		fontSize:12,
		fontFamily:'Inter-Regular',
		color:'#000',
		marginLeft:5
	},
	BookNowButton:{
		width:'100%',
		justifyContent:'center',
		alignItems:'center',
		height:48,
		backgroundColor:'#0E47A1',
		borderRadius:4,
		marginBottom:20,
		alignSelf:'center',
		marginTop:20
	},
	Row:{
		flexDirection:'row',
		marginTop:5,
		marginBottom:5,
	},
	InfoLeft:{
		width:'50%',
		fontFamily:'Inter-Bold',
		color:'#0E47A1',
		paddingLeft:10
	},
	InfoRight:{
		width:'50%',
		fontFamily:'Inter-Regular',
		color:'#000',
		paddingRight:10,
		textAlign:'right'
	},
	Favourite:{
		height:40,
		width:40,
		backgroundColor:'#F0F0F0',
		borderRadius:40,
		position:'absolute',
		right:20,
		top:280,
		justifyContent:'center',
		alignItems:'center'
	}
})

export default styles;