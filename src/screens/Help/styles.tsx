import theme from "../../theme";
import { StyleSheet, Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  Header: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0E47A1",
    elevation: 5,
  },
  HeaderText: {
    fontSize: 20,
    color: "#fff",
  },
  BackButton: {
    height: 30,
    width: "15%",
    left: 15,
    top: 2,
  },

  Body: {
    flex: 1,
    width: "80%",
    alignSelf: "center",
    marginTop: 15,
  },
  title: {
    color: theme.colors.textColor,
    fontSize: 18,
    width: "90%",
    alignSelf: "center",
    lineHeight: 32,
    paddingTop: 10,
    fontFamily: "Inter-Bold",
  },
  helloText: {
    color: theme.colors.textColor,
    fontSize: 16,
    lineHeight: 32,
    paddingTop: 10,
    fontFamily: "Inter-Regular",
  },
  LinearGradient: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    borderRadius: 4,
    alignItems: "center",
  },
  AddressBox: {
    width: "100%",
    marginVertical: 15,
  },
  BoxTitle: {
    fontFamily: "Inter-Bold",
    color: theme.colors.primary,
    width: "24%",
    // backgroundColor: 'red',
  },
  Row: {
    flexDirection: "row",
    width: "100%",
    marginTop: 25,
    justifyContent: "space-between",
  },
  image: {
    height: 186,
    width: 224,
    resizeMode: "contain",
    alignSelf: "center",
  },
  text: {
    fontFamily: "Inter-Regular",
    color: theme.colors.textColor,
    width: "83%",
  },
});

export default styles;
