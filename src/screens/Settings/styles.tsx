import theme from '../../theme'
import { StyleSheet,Dimensions} from 'react-native'
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
	Container: {
		flex: 1,
		backgroundColor: '#fff',
	},
    Status:{
        backgroundColor:'#fff'
    },
	Body:{
		flex:1,
		width:'90%',
		alignSelf:'center'
	},
	Header:{
		height:60,
		width:'100%',
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#0E47A1',
		elevation:5
	},
	HeaderText:{
		fontSize:20,
		color:'#fff'
	},
	BackButton:{
		height:30,
		width:'15%',
		left:15,
		top:2
	},
	ModalBody:{
		width:'90%',
		backgroundColor:'#fff',
		justifyContent:'center',
		alignSelf:'center'
	},
	Box:{
		width:'100%',
		alignSelf:'center',
		flexDirection:'row',
		alignItems:'center',
	},
	Icon:{ 
		height: 70,
		width:50,
		justifyContent:'center' 
	},
	IconRight:{ 
		height: 70,
		width:60,
		alignItems:'center',
		justifyContent:'center',
		position:'absolute',
		right:0 
	},
	RightBox:{
		height:70,
		justifyContent:'center',
		width:'75%'
	},
	Title:{
		fontFamily:'Inter-Regular',
		fontSize:16
	},
	SubTitle:{
		fontFamily:'Inter-Regular',
		color:'grey',
		fontSize:14,
		textTransform:"capitalize"
		
	},
	Separator:{
		width:'100%',
		borderWidth:1,
		borderColor:'#e5e5e5',
		marginTop:5
	},
})

export default styles;