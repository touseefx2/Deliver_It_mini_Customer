//local link
// const links = "http://10.7.148.97:3001/";
// const socket = "http://10.7.148.97:3001";

//online link heroko
// const links = "https://deliveritbackend.herokuapp.com/";
// const socket = "https://deliveritbackend.herokuapp.com";

//online link ec2
const links = "http://ec2-13-233-155-200.ap-south-1.compute.amazonaws.com/";
// const socket = "http://ec2-13-233-155-200.ap-south-1.compute.amazonaws.com";

const login = "user/loginCustomer";
const signup = "user/addCustomer";
const updateUser = "user/updateUser/";

const addtrip = "trip/addTripRequest";

const getVehicleType = "vehicle_type";

const uploadFile = "upload/uploadFile";

const cancelTrip = "trip/cancelTrip/";

const getUserById = "user?_id=";

const getPolygons = "map";

const getallTripsbyuid = "trip/getTrips?customer=";

const getTripsbyId = "trip/getTrips?_id=";

const getAvgRating = "user/getAverageRating?user=";

const addTripRating = "trip/rateCaptain/";

const getcustomerWalletinfo = "transaction_history/getHistoryByUser?user=";
const GET_NOTIFICATION = "notification/getNotification/";
const UPDATE_NOTIFICATION = "notification/readNotification/";

const RENTER_REG_EP = "user/addCustomer";

// const getAlbumsById = "customer/albums?customer_id=" //login cstmr buy albums

export default link = {
  links,
  login,
  signup,
  updateUser,
  uploadFile,
  addtrip,
  getVehicleType,
  getUserById,
  cancelTrip,
  getTripsbyId,
  getAvgRating,
  addTripRating,
  getcustomerWalletinfo,
  // socket,
  getallTripsbyuid,
  GET_NOTIFICATION,
  UPDATE_NOTIFICATION,
  getPolygons,
  RENTER_REG_EP,
};
