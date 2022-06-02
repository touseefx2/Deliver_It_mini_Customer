import theme from "../../theme";
import { StyleSheet, Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  Status: {
    backgroundColor: "#fff",
  },
  Header: {
    backgroundColor: "#fff",
    height: 60,
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
  },
  header: {
    position: "absolute",
    top: 13,
    left: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  CrossButton: {
    height: 30,
    width: 30,
    backgroundColor: "#0E47A1",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  MenuButton: {
    height: 30,
    width: 30,
    marginTop: 15,
    backgroundColor: "#0E47A1",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  Body: {
    width: "90%",
    alignSelf: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    // position: 'absolute',
    // height : windowHeight,
    // width : windowWidth,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  markerFixed: {
    left: "50%",
    position: "absolute",
    top: "50%",
  },
  BottomView: {
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 15,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
    bottom: 0,
    elevation: 5,
  },
  Input: {
    borderRadius: 20,
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Title: {
    fontFamily: "Inter-Bold",
    fontSize: 22,
    color: "#000",
  },
  Dot: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: "#0E47A1",
  },
  Button: {
    height: 48,
    borderRadius: 48,
    marginTop: 10,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#0E47A1",
    justifyContent: "center",
  },
  ButtonText: {
    alignSelf: "center",
    color: "#fff",
    fontFamily: "Inter-Bold",
    fontSize: 16,
  },

  dropOff: {
    marginTop: 10,
    padding: 10,
    width: "100%",
    alignSelf: "center",
  },
  catImg: { width: 45, height: 45 },
});

export default styles;
