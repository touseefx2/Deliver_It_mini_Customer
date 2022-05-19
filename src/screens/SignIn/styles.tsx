import theme from "../../theme";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
  logo: {
    height: 96,
    width: 96,
    top: 65,
    left: 32,
  },
  title: {
    color: "black",
    fontSize: 24,
    top: 10,
    lineHeight: 32,
    fontFamily: "Inter-Regular",
  },
  subTitle: {
    color: "#9B9B9B",
    fontSize: 12,
    top: 20,
    lineHeight: 22,
    fontFamily: "Inter-Regular",
    width: "90%",
  },
  Header: {
    height: 70,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },
  ArrowBack: {
    height: 24,
    width: 24,
  },
  BackButton: {
    height: 30,
    width: 30,
    left: 15,
  },
  HeaderTitle: {
    color: "#0E47A1",
    width: 128,
    height: 19,
    lineHeight: 19.36,
    fontSize: 16,
    left: 30,
    fontFamily: "Inter-Bold",
  },
  BottomButton: {
    width: "100%",
    position: "absolute",
    bottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0E47A1",
    height: 48,
    borderRadius: 4,
  },
  buttonTextBottom: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 19.36,
    fontFamily: "Inter-Bold",
  },
  Status: {
    backgroundColor: "#E5E5E5",
  },
  Body: {
    width: "90%",
    alignSelf: "center",
    flex: 1,
  },
  MenuButton: {
    height: 30,
    width: 30,
    left: 15,
  },
  FormTitle1: {
    flexDirection: "row",
    top: 35,
  },
  Input: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    width: "100%",
    height: 48,
    alignItems: "center",
    flexDirection: "row",
    fontFamily: "Inter-Regular",
  },
  CountryLogo: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  MobileInput: {
    width: "78%",
    color: "black",
  },
  ErrorMessage: {
    color: "red",
    position: "absolute",
    top: 47,
    fontSize: 10,
    fontFamily: "Inter-Regular",
  },
  ConfirmModal: {
    backgroundColor: "#0E47A1",
    height: 151,
    width: "80%",
    alignSelf: "center",
  },
  ModalHeader: {
    color: "white",
    left: 10,
    top: 20,
  },
  ModalText: {
    color: "white",
    left: 10,
    top: 40,
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  ModalBody: {
    flexDirection: "row",
    top: 80,
    alignSelf: "flex-end",
    right: 20,
  },
  ModalEditButton: {
    color: "white",
    fontSize: 16,
    right: 20,
    fontFamily: "Inter-Regular",
  },
  ModalConfirmButton: {
    color: "white",
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  LinearGradient: {
    height: "100%",
    width: "100%",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
