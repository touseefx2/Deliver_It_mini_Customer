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
	Header:{
		height:60,
		width:'100%',
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#E5E5E5',
		elevation:5
	},
	HeaderText:{
		fontSize:20,
		color:'#fff',
		marginLeft:40,
		fontFamily:'Inter-Bold'
	},
	ArrowBack:{
		height:24,
		width:24,
	},
	BackButton:{
		left:15,
	},
	logo: {
		height: 96,
		width: 96,
		marginTop:30
	},
	title: {
		color: '#fff',
		fontSize: 40,
		width: 269,
		marginTop: 50,
		lineHeight: 32,
		height:48,
		paddingTop:10,
		fontFamily:'Inter-Regular'
	},
	Description:{
		fontSize:16,
		lineHeight:32,
		width:300,
		fontFamily:'Inter-Regular',
		color:'#000',
		marginTop:10
	},
	Body:{
		width:'90%',
		alignSelf:'center',
		flex:1
	},
	LinearGradient:{
		height:'100%',
		width:'100%',
		justifyContent:'center',
		borderRadius:4,
		alignItems:'center'
	},
	Card:{
		width:'100%',
		elevation:5,
		borderRadius:10,
		backgroundColor:'#fff',
		marginTop:20,
		marginBottom:10
	},
	ModalBody:{ 
		backgroundColor: '#fff', 
		width: '80%', 
		alignSelf: 'center', 
	},
	ModalHeader:{
		alignSelf:'center',
		fontSize:22,
		color:'#fff',
	},
	ModalSplit:{
		borderBottomWidth:1,
		borderBottomColor:'#5299D3',
		width:'100%',
		height:20
	},
	ModalView:{
		width:'85%',
		alignSelf:'center',
		marginTop:10
	},
	ModelFeatureButton:{
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
		marginBottom:20
	},
	ContinueButtonText:{
		alignSelf:'center',
		color:'#fff',
		lineHeight:20,
		fontSize:16,
		fontFamily:'Inter-Regular',
	},
	Row:{
		flexDirection:'row',
		width:'100%',
		alignSelf:'center',
	},
	CardDescription:{
		color:'#000',
		width:'90%',
		lineHeight:24,
		fontFamily:'Inter-Regular',
		fontSize:16,
		marginBottom:10
	},
	CardTitle:{
		color:'#0E47A1',
		fontSize:18,
		fontFamily:'Inter-Bold',
		width:'90%',
		alignSelf:'center',
		marginTop:10
	},
	Button:{
		height:32,
		width:'100%',
		justifyContent:'center',
		marginTop:20
	},
	
	MakeButton:{
		height:32,
		width:'53%',
		justifyContent:'center',
		marginTop:20
	},
	ButtonText:{
		color:'#0E47A1',
		fontFamily:'Inter-Bold',
		fontSize:16
	},
	PickUp:{
		height:48,
		width:'100%',
		flexDirection:'row',
		alignItems:'center',
		marginTop:10
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
		height:'100%',
		borderColor:'#0E47A1',
		borderWidth:1,
		position:'absolute',
		right:0,
		alignItems:'center'
	},
	DateText:{
		marginLeft:10,
		color:'#0E47A1',
		fontFamily:'Inter-Regular'
	},
	DateTitleText:{
		color:'#0E47A1',
		fontFamily:'Inter-Bold',
		fontSize:16
	},
	RatingText:{ 
		width: '50%',
		marginTop:30,
		fontFamily:'Inter-Regular',
		fontSize:16,
		lineHeight:19 
	},
	Rating:{ 
		width: '50%',
		height:30 
	},
	BottomText:{
		marginTop:30,
		fontFamily:'Inter-Bold',
		fontSize:16
	},
	CommentBox:{	
		height:120,
		width:'100%',
		borderRadius:8,
		backgroundColor:'#fff',
		marginTop:10,
		elevation:5,
		justifyContent:'center'
	}
})

export default styles;