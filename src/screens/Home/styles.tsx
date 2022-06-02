import theme from "../../theme";
import { StyleSheet, Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  Status: {
    backgroundColor: "#0E47A1",
  },
  HeaderLeft: {
    color: "#0E47A1",
    fontFamily: "Inter-Bold",
    fontSize: 24,
    marginLeft: 10,
  },
  Header: {
    flexDirection: "row",
    // justifyContent:"space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  HeaderRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  Body: {
    width: "90%",
    alignSelf: "center",
  },
  TopCard: {
    width: "95%",
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#0E47A1",
    justifyContent: "center",
    marginTop: 10,
  },
  TopCardTitle: {
    color: "#fff",
    fontFamily: "Inter-Bold",
    fontSize: 17,
    marginLeft: 20,
  },
  TopCardDescription: {
    color: "#fff",
    fontFamily: "Inter-Regular",
    fontSize: 14,
    marginLeft: 20,
    marginTop: 5,
  },
  CategoryBox: {
    height: 100,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  carImageLoader: {
    height: 15,
    width: 15,
    resizeMode: "contain",
  },
  Category: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "#e4f0f2",
    justifyContent: "center",
    alignItems: "center",
  },
  Middle: {
    marginLeft: "25%",
    marginRight: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  CatImage: {
    height: 35,
    width: 30,
  },
  CatText: {
    textAlign: "center",
    marginTop: 10,
    fontFamily: "Inter-Regular",
    color: "#0E47A1",
    fontSize: 12,
    textTransform: "capitalize",
    width: "98%",
  },
  Card: {
    width: "100%",
    borderRadius: 10,
    elevation: 3,
    marginBottom: 10,
    marginTop: 10,
  },
  CardTitle: {
    color: "grey",
    fontFamily: "Inter-Bold",
    marginTop: 20,
    marginLeft: 20,
  },
  CardImage: {
    height: 150,
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 10,
  },
  CardDescription: {
    color: "grey",
    fontFamily: "Inter-Regular",
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  CardButton: {
    width: "90%",
    height: 48,
    backgroundColor: "#0E47A1",
    borderRadius: 48,
    alignSelf: "center",
    opacity: 0.85,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  SearchView: {
    height: 38,
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default styles;
