//local link
// const links = "http://192.168.10.8:3001/";
// const socket = "http://192.168.10.8:3001";

//online link
const links = "http://ec2-13-233-155-200.ap-south-1.compute.amazonaws.com/";
const socket = "http://ec2-13-233-155-200.ap-south-1.compute.amazonaws.com";

const login = "user/loginCustomer";
const signup = "user/addCustomer";
const updateUser = "user/updateUser/";

const addtrip = "trip/addTripRequest";

const getVehicleType = "vehicle_type";

const uploadFile = "upload/uploadFile";

const cancelTrip = "trip/cancelTrip/";

const getUserById = "user?_id=";

const getallTripsbyuid = "trip/getTrips?customer=";

const getTripsbyId = "trip/getTrips?_id=";

const getAvgRating = "user/getAverageRating?user=";

const addTripRating = "trip/rateCaptain/";

const getcustomerWalletinfo = "transaction_history/getHistoryByUser?user=";

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
  socket,
  getallTripsbyuid,
};
