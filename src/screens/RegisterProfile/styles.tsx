import theme from '../../themes/index'
import { StyleSheet} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const buttonBorderRadius=5
const inputBorderRadius=5

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:theme.color.mainColor,
	  },
	  body:{padding:15 },
	  title:{ fontSize: 37, color: theme.color.titleColor ,fontWeight:"bold"},
      avatar:
	  {
      width:115,
	  height:115,
	  borderRadius:57.5,
	  borderWidth:1,
	  borderColor:"blue",
	  alignItems:"center",
	  justifyContent:"center"
	  },
      upload:
	  {
		width:35,
		height:35,
		top:82,
		left:82,
		borderRadius:17.5,
		borderWidth:1,
		borderColor:"blue",
		backgroundColor:theme.color.bc2,
		alignItems:"center",
		justifyContent:"center",
		position:"absolute"
	  },
	  titleText:{color:theme.color.titleColor,fontSize:14,left:10,textTransform:"capitalize"},
	  showLength:{fontSize:10,alignSelf:"flex-end",right:10,top:-20},
	  inputContainer:{marginTop:5,borderWidth:1,borderRadius:inputBorderRadius,paddingHorizontal:5,height:45},
	  input:{color:theme.color.titleColor,backgroundColor:theme.color.mainColor,fontSize:16},
	  title2:{ fontSize: 14, color: theme.color.subtitleColor},
	  Button:{
		borderRadius:buttonBorderRadius,
		backgroundColor:theme.color.bc1,
		width:"95%",
		height:45,
	},
	genterTitle:{color:theme.color.mainColor ,fontSize:16,letterSpacing:0.5,textTransform:"capitalize"},
	LinearGradientGender:{
		height:45,
		width:'100%',
		backgroundColor:theme.color.bc1,
		justifyContent:'center',
		borderRadius:inputBorderRadius,
		alignItems:'center',
		borderWidth:1,
		borderColor:theme.color.fieldBorderColor
	},
	  LinearGradient:{
		height:"100%",
		width:'100%',
		justifyContent:'center',
		borderRadius:buttonBorderRadius,
		alignItems:'center',
	},
	 ButtonText:{
		alignSelf:'center',
		color:theme.color.mainColor,
		lineHeight:20,
		fontSize:18,
		letterSpacing:1,
		fontWeight:"500"
	},
	title3:{ fontSize: 14, color: theme.color.subtitleColor},
	title4:{ fontSize: 15, color: theme.color.subtitleColor,textDecorationLine:"underline",left:5},
	errorMessage:
	{
    color:"red",
	fontSize:13,
	lineHeight:20,
	}
})

export default styles;