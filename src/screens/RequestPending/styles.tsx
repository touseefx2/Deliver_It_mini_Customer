import theme from '../../theme'
import { StyleSheet,Dimensions} from 'react-native'
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
	Container: {
		flex: 1,
		backgroundColor: '#0E47A1',
	},
    Status:{
        backgroundColor:'#0E47A1'
    },
	logo: {
		height: 96,
		width: 96,
		top: 65,
	},
	Description:{
		fontSize:16,
		lineHeight:32,
		width:300,
		fontFamily:'Inter-Regular',
		color: '#fff',
		marginTop: 110,
	},
	Body:{
		width:'90%',
		alignSelf:'center',
		flex:1
	},
	ContinueButton:{
		backgroundColor: '#fff',
		borderRadius: 4,
		height:48,
		justifyContent:'center',
		width:'100%',
		alignSelf:'center',
		position:'absolute',
		bottom:20,
	},
	ContinueButtonText:{
		alignSelf:'center',
		color:'#0E47A1',
		lineHeight:20,
		fontSize:16,
		fontFamily:'Inter-Regular'
	},
	LinearGradient:{
		height:'100%',
		width:'100%',
		justifyContent:'center',
		borderRadius:4,
		alignItems:'center'
	},
})

export default styles;