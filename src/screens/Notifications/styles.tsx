import theme from "../../theme";
import { StyleSheet, Dimensions } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: theme.colors.containerBackground,
  },
  Status: {
    backgroundColor: theme.colors.primary,
  },
  MenuButton: {
    height: 30,
    width: 30,
    left: 15,
  },
  Title: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Inter-Bold",
    marginLeft: 40,
  },
  Header: {
    backgroundColor: theme.colors.primary,
    height: 60,
    alignItems: "center",
    flexDirection: "row",
  },
  Body: {
    width: "100%",
    alignSelf: "center",
    paddingTop: 20,
  },
  Card: {
    padding: 10,
    width: "100%",
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    marginTop: 10,
    elevation: 3,
  },
  CardDate: {
    marginVertical: 10,
  },
  Card1: {
    height: 100,
    width: "100%",
    backgroundColor: "#E4E4E4",
    justifyContent: "center",
  },
  Row: {
    flexDirection: "row",
    alignItems: "center",
    width: "92%",
  },
  MailTitle: {
    fontSize: responsiveFontSize(2.1),
    fontFamily: "Inter-Bold",
    color: "#003F7D",
    lineHeight: 23,
  },
  MailText: {
    fontSize: responsiveFontSize(1.5),
    fontFamily: "Inter-Regular",
    textAlign: "right",
    alignSelf: "center",
    position: "absolute",
    right: 10,
    top: 5,
    color: theme.colors.textSubtitleColor,
  },
  MailTextDate: {
    fontSize: responsiveFontSize(2.3),
    fontFamily: "Inter-Bold",
    color: theme.colors.textColor,
    marginLeft: 10,
    textTransform: "capitalize",
    marginBottom: 15,
  },
  Dot: {
    backgroundColor: "#F05123",
    height: 7,
    width: 7,
    borderRadius: 3.5,
  },
  ModalBody: {
    backgroundColor: "#fff",
    width: "80%",
    alignSelf: "center",
  },
  ModalHeader: {
    alignSelf: "center",
    fontSize: 24,
    color: "#fff",
    fontFamily: "Inter-Regular",
  },
  ModalView: {
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "#fff",
  },
  LinearGradient: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  Message: {
    color: theme.colors.textSubtitleColor,
    fontFamily: "Inter-Regular",
    fontSize: responsiveFontSize(1.5),
    marginTop: 5,
    lineHeight: 17,
    textTransform: "capitalize",
  },
});

export default styles;
