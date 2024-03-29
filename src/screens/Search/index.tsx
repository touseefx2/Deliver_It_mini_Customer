import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Image,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  Alert,
  Share,
} from "react-native";
import { observer } from "mobx-react";
import { Navigation } from "react-native-navigation";
import styles from "./styles";
import { usermanager } from "../../managers/UserManager";
import { generalmanager } from "../../managers/generalManager";
import { requestmanager } from "../../managers/requestManager";
import Icon from "react-native-vector-icons/Entypo";
import { ROOT_NAV_ID } from "../../navigation/navs";
import RBSheet from "react-native-raw-bottom-sheet";
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from "react-native-maps";

import {
  SideMenuView,
  RNNDrawer,
} from "react-native-navigation-drawer-extension";
import Geolocation from "react-native-geolocation-service";
import RNGooglePlaces from "react-native-google-places";
import utils from "../../utils/index";
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  DialogTitle,
} from "react-native-popup-dialog";
import ToggleSwitch from "toggle-switch-react-native";
import MapViewDirections from "react-native-maps-directions";
import { ScrollView } from "react-native-gesture-handler";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import moment from "moment";
import call from "react-native-phone-call";
import { showNotification } from "../../services/Notification/showNotification";
import StarRating from "react-native-star-rating";
import utilsS from "../../utilsS/index";
import db from "../../database/index";
import FastImage from "react-native-fast-image";
import { goToLogin } from "../../navigation";
import { carmanager } from "../../managers/CarManager";
const ENDPOINT = "https://deliveritbackend.herokuapp.com";
// import socketIOClient from "socket.io-client";
// const socket = socketIOClient(ENDPOINT);
import io from "socket.io-client";
import Geocoder from "react-native-geocoding";
import { isPointInPolygon } from "geolib";
import NetInfo from "@react-native-community/netinfo";
import GestureRecognizer from "react-native-swipe-gestures";
import themes from "../../themes";
import theme from "../../theme";

interface Props {}

function ieo(obj) {
  //check object is empty or not
  return JSON.stringify(obj) === "{}";
}

const Search = observer((props: Props) => {
  const gapikey = "AIzaSyAJeMjKbTTRvoZJe0YoJc48VhaqbtoTmug";
  const socket = io(ENDPOINT);
  let req = requestmanager.req;
  let vt = props.pickupType || "";

  const window = Dimensions.get("window");
  const { width, height } = window;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA + width / height;

  const [polygons, setpolygons] = useState([]);
  useEffect(() => {
    setpolygons(usermanager.polygons);
  }, [usermanager.polygons]);
  console.log("polygons : ", polygons);

  const [vta, setvta] = useState(carmanager.vehicleType.slice()); //rate captain sheet
  const [sr, setsr] = useState(vt); //selected ride

  const [isNoarea, setisNoarea] = useState(false); //rate captain sheet

  const [imgLoad, setimgLoad] = useState(false); //rate captain sheet

  const [imgLoadd, setimgLoadd] = useState(false); //arrive captain sheet

  const [cp, setcp] = useState({}); //device current position
  const [cl, setcl] = useState(false); //captain location

  const [captains, setcaptains] = useState([]); //captain location

  let rfalsetime = 1500;
  let cordmovetime = 500;

  let maxzoom = 1200;
  let minzoom = 2.5;

  console.log("cncltn chrg : ", usermanager.cancelationCharges);
  console.log("base chrg : ", usermanager.baseCharges);
  //after accept
  let ctnotcuttimeba = 10; //2min or 120 sec no cut charges if user cancel trip before 2 min so not cut charges otherwise cut charges
  let ctcfba = usermanager.cancelationCharges; //fine //40
  let ctcfaa = usermanager.baseCharges; //90

  const [ridedetail, setridedetail] = useState(false);

  const [cashDialog, setcashDialog] = useState(false);
  const [cashSwitch, setcashSwitch] = useState(false); //walet on

  const [starCount, setstarCount] = useState(0);

  const [zi, setzi] = useState(300);
  const [zo, setzo] = useState(2.5);

  const [ll, setll] = useState(false); //btn loadin

  const [loader, setloader] = useState(false); //btn loadin
  const [loaderT, setloaderT] = useState(false); //geting cent loc
  const [loaderB, setloaderB] = useState(false); //bookring ride

  const [l, setl] = useState(false); //simpl loader

  const [region, setregion] = useState({});

  const [mr, setmr] = useState(false);

  const [i, seti] = useState(1);

  const [se, setse] = useState(true);

  const [dpd, setdpd] = useState(""); // distance from    pickup location to dropofloce  startride true

  // const [tpd,settpd] = useState("");
  //  const [tpd2,settpd2] = useState(""); // time from  pickup location to dropofloce  startride true

  const [ft, setft] = useState(0);

  const [dropoff, setdropoff] = useState({});
  const [pickup, setpickup] = useState({});

  // let pickup=requestmanager.pickup;
  let gro = requestmanager.gro;
  let pm = requestmanager.pm;
  let ispickup = requestmanager.ispickup;
  let isdropoff = requestmanager.isdropoff;
  let chalo = requestmanager.chalo;
  let atime = requestmanager.atime;
  let grtime = requestmanager.grtime;
  let acceptRequest = requestmanager.acceptRequest;
  let arrive = requestmanager.arrive;
  let startride = requestmanager.startride;
  let endride = requestmanager.endride;
  let ar = requestmanager.ar;
  let td = requestmanager.td;
  let traveltime = requestmanager.traveltime;
  let tpd = requestmanager.tpd;

  const setgro = (c) => {
    requestmanager.setgro(c);
  };
  const setpm = (c) => {
    requestmanager.setpm(c);
  };
  const setispickup = (c) => {
    requestmanager.setispickup(c);
  };
  const setisdropoff = (c) => {
    requestmanager.setisdropoff(c);
  };
  const setchalo = (c) => {
    requestmanager.setchalo(c);
  };
  const setacceptRequest = (c) => {
    requestmanager.setacceptRequest(c);
  };
  const setatime = (c) => {
    requestmanager.setatime(c);
  };
  const setgrtime = (c) => {
    requestmanager.setgrtime(c);
  };
  const setarrive = (c) => {
    requestmanager.setarrive(c);
  };
  const setstartride = (c) => {
    requestmanager.setstartride(c);
  };
  const setendride = (c) => {
    requestmanager.setendride(c);
  };
  const setar = (c) => {
    requestmanager.setar(c);
  };
  const settd = (c) => {
    requestmanager.settd(c);
  };
  const settraveltime = (c) => {
    requestmanager.settraveltime(c);
  };
  const settpd = (c) => {
    requestmanager.settpd(c);
  };

  const [rbsheetUp, setrbsheetUp] = useState(false);

  let rBSheet = useRef(null);
  let rBSheetc = useRef(null);
  let mapRef = useRef(null);
  let lm = useRef(null); //pickup marker ref
  let watchID = null;

  const SocketOn = () => {
    console.log("socket on");
    socket.on("send_location_to_client", (l) => {
      console.log("recieve captn loc : ", l);
      const r = {
        latitude: l.coordinates[1],
        longitude: l.coordinates[0],
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      setcl(r);
    });
  };
  const SocketOff = () => {
    console.log("socket off");

    socket.emit("stop_sharing_location", { socket: socket.id });
  };

  // useeffects section

  useEffect(() => {
    const fid = sr._id;
    vta.sort((x, y) => {
      return x._id === fid ? -1 : y._id === fid ? 1 : 0;
    });
  }, []);

  useEffect(() => {
    if (cashDialog) {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          usermanager.getmyWalletinfo();
        }
      });
    }
  }, [cashDialog]);

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        if (!ieo(cp) && ieo(region) && !ispickup) {
          attemptToGetCaptains(cp);
        }

        if (!ieo(cp) && !ieo(region) && !ispickup) {
          attemptToGetCaptains(region.location);
        }
      }
    });
  }, [cp, region, ispickup]);

  const attemptToGetCaptains = (loc) => {
    setcaptains([]);
    const header = usermanager.authToken;
    let url = `?longitude=${loc.longitude}&latitude=${loc.latitude}`;
    // console.log("nearest captains url: ", db.link.getAllCaptainsCAR + url);
    // method, path, body, header
    db.api
      .apiCall("get", db.link.getAllCaptainsCAR + url, false, header)
      .then((response) => {
        console.log("nearest captains car response : ", response);

        if (response.message == "No records found") {
          setcaptains([]);
          return;
        }

        if (response.data) {
          setcaptains(response.data);
          return;
        }

        return;
      })
      .catch((e) => {
        console.error("nearest captains car error : ", e);
        return;
      });
  };

  console.log("captns  cars available : ", captains.length);
  // console.log("region : ", region);
  // console.log("dropoff : ", dropoff);

  useEffect(() => {
    if (req && !ieo(cp)) {
      if (generalmanager.internet && gro == false) {
        requestmanager.setgetreqloader(true);
        requestmanager.getReqById(req._id, "check");
      }
    }

    if (ieo(pickup) && ieo(dropoff) && req) {
      const pl = {
        location: {
          latitude: req.pickup.location.latitude,
          longitude: req.pickup.location.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        name: req.pickup.name,
        address: req.pickup.address,
      };

      const dl = {
        location: {
          latitude: req.dropoff.location.latitude,
          longitude: req.dropoff.location.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        name: req.dropoff.name,
        address: req.dropoff.address,
      };
      setpickup(pl);
      setdropoff(dl);
      setregion(dl);
    }
  }, [generalmanager.internet, req, cp]);

  useEffect(() => {
    if (!generalmanager.internet) {
      setgro(false);
    }
  }, [generalmanager.internet]);

  useEffect(() => {
    if (generalmanager.location) {
      getCurrentLocationOne();
    }

    if (!generalmanager.location) {
      Geolocation.clearWatch(watchID);
      Geolocation.stopObserving();
      watchID = null;
      locationEnabler();
    }
  }, [generalmanager.location]);

  useEffect(() => {
    Geocoder.init(gapikey, { language: "en" });
    return () => {
      Geolocation.clearWatch(watchID);
      Geolocation.stopObserving();
      watchID = null;
    };
  }, []);

  const addBackHandler = () => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClickk);
  };

  const removeBackHandler = () => {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      handleBackButtonClickk
    );
  };

  useEffect(() => {
    if (
      isdropoff ||
      ispickup ||
      cashDialog ||
      ridedetail ||
      chalo ||
      acceptRequest == true ||
      rbsheetUp
    ) {
      addBackHandler();
    }

    if (!isdropoff) {
      removeBackHandler();
    }

    return () => {
      removeBackHandler();
    };
  }, [
    isdropoff,
    ispickup,
    cashDialog,
    ridedetail,
    chalo,
    acceptRequest,
    rbsheetUp,
    endride,
  ]);

  useEffect(() => {
    if (mr && !ieo(cp)) {
      gotoCurrentLocFast();
      setmr(false);
      setTimeout(() => {
        seti(0);
        gotoCurrentLocFast();
        setft(1);
      }, 1000);
    }
  }, [mr, cp, req]);

  useEffect(() => {
    if (!chalo) {
      if (isdropoff == true) {
        if (ieo(pickup)) {
          setPickupLocationCurrent();
        }
      }

      if (isdropoff == false) {
        if (!ieo(dropoff)) {
          zoomin();
          mapRef?.current?.animateToRegion(dropoff.location, 1000);
          seti(0);
        }
      }
    }
  }, [isdropoff]);

  useEffect(() => {
    if (ispickup && chalo == false) {
      mapRef?.current?.fitToSuppliedMarkers(["mkp", "mkd"], {
        animated: true,
        edgePadding: {
          top: 250,
          right: 200,
          bottom: 750,
          left: 200,
        },
      });

      // lm.current.showCallout(); //show marker tootl tip
    }

    if (!ispickup) {
      settd("");
      settraveltime("");
    }
  }, [ispickup, chalo]);

  useEffect(() => {
    if (chalo) {
      setrbsheetUp(false);

      mapRef?.current?.animateToRegion(
        {
          latitude: req.pickup.location.latitude,
          longitude: req.pickup.location.longitude,
          latitudeDelta: LATITUDE_DELTA * Number(5 / 1000),
          longitudeDelta: LONGITUDE_DELTA * Number(5 / 1000),
        },
        1000
      );
    }
  }, [chalo]);

  useEffect(() => {
    if (!ieo(cp) && generalmanager.internet) {
      const bodyData = {
        location: {
          type: "Point",
          coordinates: [cp.longitude, cp.latitude], //long , lat
        },
      };

      UpdateUser(bodyData, false);
    }
  }, [cp, generalmanager.internet]);

  const cancelReq = () => {
    requestmanager.setreq(false);
    setchalo(false);
    setatime("");
    setacceptRequest("f");
    setarrive(false);
    settpd("---");
    SocketOff();
    setpm("cash");
    setimgLoad(false);
    setimgLoadd(false);
    setstartride(false);
    setendride(false);
    requestmanager.setar(0);
    rBSheetc?.current?.close();

    setgro(false);
    setgrtime("");
    setstarCount(0);
    setar(0);
    setcl(false);
  };

  const clearall = () => {
    cancelReq();
    setisdropoff(false);
    setispickup(false);
    settd("");
    settraveltime("");
    SocketOff();
    setimgLoad(false);
    setimgLoadd(false);
    goBack();
  };

  useEffect(() => {
    if (acceptRequest == true && req) {
      setrbsheetUp(false);

      setgrtime("");

      let mark1 = {
        latitude: req.pickup.location.latitude,
        longitude: req.pickup.location.longitude,
        description: "pickup",
        title: "p loc",
      };

      let mark2 = {
        latitude: !cl ? req.captain.location.coordinates[1] : cl.latitude,
        longitude: !cl ? req.captain.location.coordinates[0] : cl.longitude,
        description: "captain car",
        title: "c loc",
      };

      mapRef?.current?.fitToCoordinates([mark1, mark2], {
        animated: true,
        edgePadding: { top: 50, right: 50, bottom: 420, left: 50 },
      });
    }

    if (acceptRequest == false && req) {
      cancelReq();
    }
  }, [acceptRequest, req]);

  useEffect(() => {
    if (acceptRequest == true && generalmanager.internet) {
      SocketOn();
    }

    if (
      acceptRequest == false ||
      acceptRequest == "f" ||
      !generalmanager.internet
    ) {
      SocketOff();
      setcl(false);
    }
  }, [acceptRequest, generalmanager.internet]);

  useEffect(() => {
    if (endride && generalmanager.internet) {
      SocketOff();
      setcl(false);
    }
  }, [endride, generalmanager.internet]);

  useEffect(() => {
    if (!req) {
      cancelReq();
      SocketOff();
      setcl(false);
    }
  }, [req]);

  useEffect(() => {
    if (startride && req) {
      fetchDistanceBetweenPointsOnline(
        req.captain.location.coordinates[1],
        req.captain.location.coordinates[0],
        req.dropoff.location.latitude,
        req.dropoff.location.longitude,
        "startride"
      );

      setrbsheetUp(false);
      let mark1 = {
        latitude: req.captain.location.coordinates[1],
        longitude: req.captain.location.coordinates[0],
        description: "captain current pos",
        title: "cc loc",
      };

      let mark2 = {
        latitude: req.dropoff.location.latitude,
        longitude: req.dropoff.location.longitude,
        description: "dropodd loc",
        title: "d loc",
      };

      mapRef?.current?.fitToCoordinates([mark1, mark2], {
        animated: true,
        edgePadding: { top: 5, right: 80, bottom: 400, left: 80 },
      });
    }
  }, [startride, req]);

  //    useEffect(()=>{
  // 	   if(startride && req && generalmanager.internet && cl)
  // 	   {
  // 		   console.log("strt ride cptn loc chnge so fetch dis api cal again")
  // 	              fetchDistanceBetweenPointsOnline(
  // 		 			!cl ? req.captain.location.coordinates[1]:cl.latitude,
  // 		 			!cl?req.captain.location.coordinates[0]:cl.longitude,
  // 		 		    req.dropoff.location.latitude,
  // 		 		    req.dropoff.location.longitude,
  // 		 		   "startride")
  // 	   }
  //    },[cl,req,startride,generalmanager.internet])

  useEffect(() => {
    if (endride && req) {
      let mark1 = {
        latitude: req.pickup.location.latitude,
        longitude: req.pickup.location.longitude,
      };

      let mark2 = {
        latitude: req.dropoff.location.latitude,
        longitude: req.dropoff.location.longitude,
      };

      mapRef?.current?.fitToCoordinates([mark1, mark2], {
        animated: true,
        edgePadding: { top: 100, right: 80, bottom: 400, left: 80 },
      });

      setloader(false);
    }
  }, [endride, req]);

  useEffect(() => {
    if (loader) {
      setse(false);
    } else {
      setse(true);
    }
  }, [loader]);

  // method section

  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hr, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " min, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " sec") : "";
    return hDisplay + mDisplay + sDisplay;
  }

  const locationEnabler = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then((data) => {
        generalmanager.changeLocation(true);
      })
      .catch((err) => {
        utils.ToastAndroid.ToastAndroid_SB("Please turn on location !");
        setTimeout(() => {
          if (!generalmanager.location) {
            locationEnabler();
          }
        }, 5000);
        console.log("err loactn enbal : ", err);
      });
  };

  const UpdateUser = (location, suc) => {
    //update user
    let uid = usermanager.user._id;
    const bodyData = location;
    const header = usermanager.authToken;

    // method, path, body, header
    db.api
      .apiCall("put", db.link.updateUser + uid, bodyData, header)
      .then((response) => {
        console.log("Update user location response : ", response.data.location);

        if (response.msg == "Invalid Token") {
          utilsS.AlertMessage("", response.msg);
          usermanager.attemptToLogout();
          carmanager.setvehicleType(false);
          goToLogin();
          return;
        }

        if (response.data) {
          usermanager.setUser(response.data);

          if (suc) {
            // subscribeLocation()
          }

          return;
        }

        if (!response.data) {
          utils.ToastAndroid.ToastAndroid_SB(response.message);
          return;
        }

        return;
      })
      .catch((e) => {
        setloaderT(false);
        utils.ToastAndroid.ToastAndroid_SB(
          "Server error location not upate in backend"
        );
        console.error("Update user location catch error : ", e);
        return;
      });
  };

  const getCurrentLocationOne = () => {
    setloaderT(true);
    Geolocation.getCurrentPosition(
      //Will give you the current location
      async (position) => {
        setloaderT(false);

        const r = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };

        setcp(r);

        subscribeLocation();
      },
      (error) => {
        setloaderT(false);
        if (error.code == 3) {
          if (cp != "") {
            getCurrentLocationOne();
          }
        }

        if (error.code == 1) {
          // locationEnabler()
        }

        console.log("get crnt loc one error : ", error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
      }
    );
  };

  const subscribeLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //  console.log("geo location wathc postn then  : ",position);

        const window = Dimensions.get("window");
        const { width, height } = window;

        setloaderT(false);

        const r = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setcp(r);
      },
      (error) => {
        console.log("geo location watch postn error : ", error);
      },
      {
        showsBackgroundLocationIndicator: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
        distanceFilter: 10,
      }
    );
  };

  const onaddTrip = () => {
    setloaderB(true);
    let Pickup = {
      name: pickup.name,
      address: pickup.address,
      location: {
        longitude: pickup.location.longitude,
        latitude: pickup.location.latitude,
      },
    };

    let Dropoff = {
      name: dropoff.name,
      address: dropoff.address,
      location: {
        longitude: dropoff.location.longitude,
        latitude: dropoff.location.latitude,
      },
    };

    let bodyData = {
      customer: usermanager.user._id,
      pickup: Pickup,
      dropoff: Dropoff,
      type: sr._id,
      distance: td,
      payment_mode: pm,
      deduct_from_wallet: cashSwitch,
    };
    const header = usermanager.authToken;
    console.log("addtrip body data : ", bodyData);

    db.api
      .apiCall("post", db.link.addtrip, bodyData, header)
      .then((response) => {
        setloaderB(false);
        console.log("AddTrip response : ", response);

        if (response.msg == "Invalid Token") {
          setloaderB(false);
          utilsS.AlertMessage("", response.msg);
          usermanager.attemptToLogout();
          carmanager.setvehicleType(false);
          goToLogin();
          return;
        }

        if (response.success) {
          setgrtime(new Date());
          requestmanager.setreq(response.data);
          setloaderB(false);
          setchalo(true);
          return;
        }

        if (!response.success) {
          setloaderB(false);
          utilsS.AlertMessage("", response.message);
          return;
        }

        return;
      })
      .catch((e) => {
        setloaderB(false);
        utilsS.AlertMessage("", "Network request failed");
        console.error("AddTrip catch error : ", e);
        return;
      });
  };

  const onTripRating = () => {
    setloader(true);
    let bodyData = {
      rating: starCount,
    };
    const header = usermanager.authToken;

    db.api
      .apiCall("put", db.link.addTripRating + req._id, bodyData, header)
      .then((response) => {
        setloader(false);
        console.log("onTripRating response : ", response);

        if (response.msg == "Invalid Token") {
          utilsS.AlertMessage("", response.msg);
          usermanager.attemptToLogout();
          carmanager.setvehicleType(false);
          goToLogin();
          return;
        }

        if (response.success) {
          clearall();
          utils.ToastAndroid.ToastAndroid_SB("Trip Complete :)");
          return;
        }

        if (!response.success) {
          utilsS.AlertMessage("", response.message);
          return;
        }

        return;
      })
      .catch((e) => {
        setloader(false);
        utilsS.AlertMessage("", "Network request failed");
        console.error("onTripRating catch error : ", e);
        return;
      });
  };

  const onClickChalo = () => {
    if (generalmanager.internet) {
      if (td >= 0) {
        if (td < 0.5) {
          Alert.alert("", "Cannot book your ride, distance is too short");
          return;
        }
        onaddTrip();
      } else {
        utils.AlertMessage(
          "",
          "Total distance not calculate please try after some seconds !"
        );
      }
    } else {
      utils.AlertMessage("", "Please connect internet !");
    }
  };

  const fetchDistanceBetweenPointsOnline = (lat1, lng1, lat2, lng2, c) => {
    var urlToFetchDistance =
      "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric?mode=driving&origins=" +
      lat1 +
      "," +
      lng1 +
      "&destinations=" +
      lat2 +
      "%2C" +
      lng2 +
      "&key=" +
      gapikey;

    if (c == "picTodropDis") {
      try {
        setl(true);
        fetch(urlToFetchDistance)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            setl(false);
            if (res) {
              let distanceInMeter = res.rows[0].elements[0].distance.value; //in meter
              let distanceInKm = distanceInMeter / 1000; //in meter to km

              var timeSecond = res.rows[0].elements[0].duration.value;

              settd(distanceInKm);
              settraveltime(timeSecond);
              setispickup(true);
              setcaptains([]);
              return;
            }
          })
          .catch((error) => {
            setl(false);
            settd("");
            settraveltime("");
            utils.AlertMessage(
              "fetchdsistancematric api error ",
              "Network request failed"
            );
            console.log("fetchdsistancematric catch error : ", error);
            return;
          });
      } catch (error) {
        setl(false);
        settd("");
        settraveltime("");
        console.log("fetchdsistancematric catch error ", error);
      }
    } else {
      try {
        fetch(urlToFetchDistance)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            var distanceString = res.rows[0].elements[0].distance.text;
            var timeString = res.rows[0].elements[0].duration.text;
            var timeSecond = res.rows[0].elements[0].duration.value;

            setdpd(distanceString);
            let s = timeSecond;
            var travelTime = moment(new Date())
              .add(s, "seconds")
              .format("h:mm a");
            settpd(travelTime); //show in front end in user
            //   settpd2(timeString)
          })
          .catch((error) => {
            utils.AlertMessage(
              "fetchdsistancematric api error ",
              "Network request failed"
            );
            console.log("Problem occurred fetchdsistancematric : ", error);
          });
      } catch (error) {
        console.log("fetchdis api error", error);
      }
    }
  };

  const attemptToGetCharges = () => {
    const header = usermanager.authToken;

    // method, path, body, header
    db.api
      .apiCall("get", db.link.getCharges, false, header)
      .then((response) => {
        console.log("get charges response : ", response.data);

        if (response.data) {
          if (response.data[0]) {
            usermanager.setcanclchrg(response.data[0].cancellation_charges);
            usermanager.setbasechrg(response.data[0].base_charges);

            ctcfba = response.data[0].cancellation_charges; //fine //40
            ctcfaa = response.data[0].base_charges; //90

            let ctt = new Date();
            let at = moment(atime).format("hh:mm:ss a");
            let ct = moment(ctt).format("hh:mm:ss a");

            var acptTime = moment(at, "HH:mm:ss a");
            var crntTime = moment(ct, "HH:mm:ss a");
            var duration = moment.duration(crntTime.diff(acptTime));
            var sec = parseInt(duration.asSeconds());
            let cf = sec <= ctnotcuttimeba ? 0 : !arrive ? ctcfba : ctcfaa;

            if (acceptRequest == true && !arrive && !startride) {
              onClickcancelTrip(
                "Emergency (Canceling before arrive captain)",
                sec,
                sec == 0 ? sec : cf
              );
              return;
            }

            if (acceptRequest == true && arrive && !startride) {
              onClickcancelTrip(
                "Emergency (Canceling after arrive captain)",
                sec,
                sec == 0 ? sec : cf
              );
              return;
            }

            if (acceptRequest == true && arrive && startride) {
              onClickcancelTrip(
                "Emergency (Canceling after start ride captain)",
                sec,
                sec == 0 ? sec : cf
              );
              return;
            }
          }

          return;
        }

        return;
      })
      .catch((e) => {
        console.error("get charges  catch error : ", e);
        return;
      });
  };

  const cancelRide = () => {
    if (generalmanager.internet) {
      if (acceptRequest == "f") {
        onClickcancelTrip("No need (Canceling before accept captain)", 0, 0);
        return;
      }
      attemptToGetCharges();
    } else {
      utils.AlertMessage("", "Please connect internet !");
    }
  };

  const onClickcancelTrip = (r, wt, cf) => {
    setl(true);
    const bodyData = {
      cancellation_reason: r,
      waiting_time: wt,
      canceling_fee: cf,
    };
    const rid = requestmanager.req._id;
    const header = usermanager.authToken;
    // method, path, body, header
    db.api
      .apiCall("put", db.link.cancelTrip + rid, bodyData, header)
      .then((response) => {
        console.log("Cancel trip response : ", response);
        setl(false);

        if (response.success) {
          rBSheetc?.current?.close();
          setacceptRequest(false);
          setgrtime("");
          usermanager.getmyWalletinfo();
          utils.ToastAndroid.ToastAndroid_SB("Cancel");

          return;
        }

        if (!response.success) {
          utils.AlertMessage("", response.message);
          return;
        }

        return;
      })
      .catch((e) => {
        setl(false);
        //  utils.AlertMessage("","Network request failed");
        console.error("Cancel trip   catch error : ", e);
        return;
      });
  };

  function handleBackButtonClickk() {
    // if(acceptRequest && rbsheetUp){
    // 	setrbsheetUp(false)
    // }

    if (chalo && rbsheetUp) {
      console.log("1");
      setrbsheetUp(false);
    }

    if (chalo && acceptRequest == "f") {
      console.log("2");
    }

    if (chalo && acceptRequest == true) {
      console.log("3");
    }

    if (cashDialog) {
      console.log("4");
      setcashDialog(false);
    }

    if (ridedetail) {
      console.log("5");
      setridedetail(false);
    }

    if (
      isdropoff &&
      ispickup == false &&
      !cashDialog &&
      !ridedetail &&
      !chalo &&
      acceptRequest == "f"
    ) {
      console.log("6");
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClickk
      );

      attemptToGetCaptains(dropoff.location);
      seti(0),
        setisdropoff(false),
        setpickup({}),
        setTimeout(() => {}, rfalsetime);
    }

    if (
      isdropoff &&
      ispickup == true &&
      !cashDialog &&
      !ridedetail &&
      !chalo &&
      acceptRequest == "f"
    ) {
      console.log("7");
      setispickup(false);

      let mark = {
        latitude: pickup.location.latitude,
        longitude: pickup.location.longitude,
        description: "pickuploc",
        title: "",
      };

      mapRef?.current?.fitToCoordinates([mark], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }

    if (acceptRequest == true && endride) {
      console.log("8");
      clearall();
      utils.ToastAndroid.ToastAndroid_SB("Trip Complete :)");
    }

    return true;
  }

  const onbackaddEvenetlistener = () => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClickk);
  };

  const setPickupLocationCurrent = () => {
    let name = "";
    let address = "";
    setloader(true);

    const loc = { latitude: cp.latitude, longitude: cp.longitude };

    Geocoder.from(loc)
      .then((json) => {
        (name = json.results[0].formatted_address),
          (address = json.results[0].formatted_address);

        seti(1);

        const data = {
          name: name,
          address: address,
          location: cp,
        };

        setpickup(data);
        setregion(data);

        const point = { latitude: cp.latitude, longitude: cp.longitude };
        ISPointInPolygon(point);

        let tempCoords = { latitude: cp.latitude, longitude: cp.longitude };

        mapRef?.current?.animateToCoordinate(tempCoords, cordmovetime);

        setTimeout(() => {
          seti(0);
          setloader(false);
        }, 1500);
      })
      .catch((error) => {
        console.warn(error);
        setloader(false);
      });
  };

  const goBack = () => {
    Navigation.pop(ROOT_NAV_ID);
  };

  const ongoBack = () => {
    if (isdropoff && !ispickup) {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClickk
      );
      seti(0), setisdropoff(false), setpickup({});
    }

    if (isdropoff && ispickup) {
      setispickup(false);

      let mark = {
        latitude: pickup.location.latitude,
        longitude: pickup.location.longitude,
        description: "pickuploc",
        title: "",
      };

      mapRef?.current?.fitToCoordinates([mark], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  const GooglePlacesInput = () => {
    RNGooglePlaces.openAutocompleteModal(
      {
        initialQuery: "",
        country: "PK",
        useOverlay: false,
      },
      ["placeID", "location", "name", "address", "plusCode"]

      // ['placeID', 'location', 'name', 'address', 'types', 'openingHours', 'plusCode', 'rating', 'userRatingsTotal', 'viewport']
    )
      .then((place) => {
        setloader(false);
        setll(false);

        console.log("google places : ", place);

        const window = Dimensions.get("window");
        const { width, height } = window;
        const LATITUD_DELTA = 0.0922;
        const LONGITUDE_DELTA = LATITUD_DELTA + width / height;

        const data = {
          name: place.name,
          address: place.address,
          location: {
            latitude: place.location.latitude,
            longitude: place.location.longitude,
            latitudeDelta: LATITUD_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        };

        seti(1);

        if (!isdropoff) {
          setdropoff(data);
        }
        if (isdropoff) {
          setpickup(data);
        }
        setregion(data);

        zoomin();
        mapRef?.current?.animateToCoordinate(data.location, 1000);

        setTimeout(() => {
          seti(0);
        }, rfalsetime);
      })
      .catch((error) => {
        if (error.code == 4) {
          utils.AlertMessage(
            "",
            "Please enable billing account on your google map api key"
          );
        }
        console.log("gogole placess error : ", error.message);
      });
  };

  const gotoDropoff = () => {
    GooglePlacesInput();
  };

  const onMenuPressed = () => {
    RNNDrawer.showDrawer({
      component: {
        name: "customDrawer",
        passProps: {
          animationOpenTime: 300,
          animationCloseTime: 300,
          direction: "left",
          dismissWhenTouchOutside: true,
          fadeOpacity: 0.6,
          drawerScreenWidth: "85%" || 445,
          drawerScreenHeight: "100%" || 700,
          parentComponentId: props.componentId,
          style: {
            backgroundColor: "white",
          },
        },
        options: {
          layout: {
            componentBackgroundColor: "rgba(0,0,0,0.4)",
          },
        },
      },
    });
  };

  const confirmDropOff = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        // if (isNoarea) {
        //   utils.AlertMessage(
        //     "",
        //     "Deliverit mini does not operate in this area"
        //   );
        //   return;
        // }

        setisdropoff(true);
        seti(0);
        setloader(true);
        setcaptains([]);
      } else {
        utils.AlertMessage("", "Please connect internet");
      }
    });
  };

  const confirmPickup = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        // if (isNoarea) {
        //   utils.AlertMessage(
        //     "",
        //     "Deliverit mini does not operate in this area"
        //   );
        //   return;
        // }

        usermanager.getmyWalletinfo();
        fetchDistanceBetweenPointsOnline(
          pickup.location.latitude,
          pickup.location.longitude,
          dropoff.location.latitude,
          dropoff.location.longitude,
          "picTodropDis"
        );
      } else {
        utils.AlertMessage("", "Please connect internet");
      }
    });
  };

  const zoomin = () => {
    setse(false);
    seti(1);
    if (zi <= maxzoom) {
      let loc = !ieo(region) ? region.location : cp;

      mapRef?.current?.animateToRegion(
        {
          latitude: loc.latitude,
          longitude: loc.longitude,
          latitudeDelta: LATITUDE_DELTA * Number(5 / zi),
          longitudeDelta: LONGITUDE_DELTA * Number(5 / zi),
        },
        1200
      );
      let z = zi + 300;
      setzi(z);

      let zz = zo + 30;
      setzo(zz);
    } else {
      setzi(1200);
    }
    setTimeout(() => {
      setse(true);
      seti(0);
    }, rfalsetime);
  };

  const zoomout = () => {
    setse(false);
    seti(1);
    if (zo >= minzoom) {
      let loc = !ieo(region) ? region.location : cp;

      mapRef?.current?.animateToRegion(
        {
          latitude: loc.latitude,
          longitude: loc.longitude,
          latitudeDelta: LATITUDE_DELTA * Number(5 / zo),
          longitudeDelta: LONGITUDE_DELTA * Number(5 / zo),
        },
        1200
      );

      if (zo != 2.5) {
        let z = zo - 30;
        setzo(z);
      }

      if (zi != 300) {
        let zz = zi - 300;
        setzi(zz);
      }
    } else {
      setzi(300);
      setzo(minzoom);
    }
    setTimeout(() => {
      setse(true);
      seti(0);
    }, rfalsetime);
  };

  const gotoCurrentLocFast = () => {
    let mark1 = {
      latitude: cp.latitude,
      longitude: cp.longitude,
    };

    mapRef?.current?.fitToCoordinates([mark1], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: false,
    });
  };

  const gotoCurrentLoc = () => {
    let mark1 = {
      latitude: cp.latitude,
      longitude: cp.longitude,
      description: "current",
      title: "current loc",
    };

    mapRef?.current?.fitToCoordinates([mark1], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  };

  // const gotoAddCard = () => {
  //   BackHandler.removeEventListener(
  //     "hardwareBackPress",
  //     handleBackButtonClickk
  //   );

  //   Navigation.push(ROOT_NAV_ID, {
  //     component: {
  //       name: "AddCard",
  //       passProps: {
  //         from: "search",
  //         onback: () => {
  //           onbackaddEvenetlistener();
  //         },
  //       },
  //       options: {
  //         topBar: {
  //           visible: false,
  //         },
  //       },
  //     },
  //   });
  // };

  const callUser = (p) => {
    const args = {
      number: p, // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
    };
    call(args).catch((e) => {
      console.log("call error : ", e);
    });
  };

  const onclickDoneRide = () => {
    if (starCount > 0) {
      if (generalmanager.internet) {
        onTripRating();
      } else {
        utils.AlertMessage("", "Please connect internet .");
      }
    } else {
      clearall();
      utils.ToastAndroid.ToastAndroid_SB("Trip Complete :)");
    }
  };

  const destinationMarker = () => {
    return (
      <Marker
        identifier={"mkd"}
        ref={lm}
        tracksViewChanges={false}
        coordinate={dropoff.location}
        pinColor={"white"}
        anchor={{ x: 0.5, y: 1.0 }}
      >
        {!ispickup && (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: "white",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "green",
              }}
            >
              <utils.vectorIcon.Entypo
                name="location-pin"
                color="white"
                size={15}
              />
            </View>
            <View
              style={{
                width: 4,
                height: 8,
                borderRadius: 5,
                backgroundColor: "green",
              }}
            />
          </View>
        )}

        {((ispickup && !startride) || endride) && (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View
              style={{
                backgroundColor: "#0E47A1",
                marginBottom: 4,
                padding: 5,
                elevation: 5,
                width: 170,
                borderRadius: 10,
                opacity: 0.9,
              }}
            >
              <Text style={{ fontSize: 13, color: "silver" }}>Dropoff</Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: 14,
                  color: "white",
                  width: "100%",
                  textTransform: "capitalize",
                }}
              >
                {dropoff.name}
              </Text>
            </View>

            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                elevation: 5,
              }}
            >
              <utils.vectorIcon.FontAwesome
                name="circle"
                color="green"
                size={14}
              />
            </View>
          </View>
        )}

        {ispickup && startride && !endride && (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View
              style={{
                backgroundColor: "#0E47A1",
                marginBottom: 3,
                padding: 5,
                elevation: 5,
                borderRadius: 10,
                opacity: 0.8,
              }}
            >
              <Text
                style={{ fontSize: 13, color: "#ededed", alignSelf: "center" }}
              >
                Arrival
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  textTransform: "uppercase",
                }}
              >
                {tpd}
              </Text>
            </View>

            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                elevation: 5,
              }}
            >
              <utils.vectorIcon.FontAwesome
                name="circle"
                color="green"
                size={14}
              />
            </View>
          </View>
        )}
      </Marker>
    );
  };

  const pickupMarker = () => {
    return (
      <Marker
        // style={{height:50,width:40}}
        identifier="mkp"
        coordinate={pickup.location}
        ref={lm}
        pinColor={"green"}
      >
        {(!ispickup || (ispickup && chalo && !endride)) && (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: "white",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#0E47A1",
                opacity: chalo ? 0.8 : 1,
              }}
            >
              <utils.vectorIcon.Ionicons
                name="person"
                color="white"
                size={15}
              />
            </View>
            <View
              style={{
                width: 4,
                height: chalo ? 14 : 10,
                borderRadius: 5,
                backgroundColor: "#0E47A1",
                opacity: chalo ? 0.7 : 1,
              }}
            />
          </View>
        )}

        {((ispickup && !chalo) || endride) && (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View
              style={{
                backgroundColor: "white",
                marginBottom: 4,
                padding: 5,
                elevation: 5,
                width: 170,
                borderRadius: 10,
                opacity: 0.9,
              }}
            >
              <Text style={{ fontSize: 13, color: "gray" }}>Pickup</Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: 14,
                  color: "black",
                  width: "100%",
                  textTransform: "capitalize",
                }}
              >
                {pickup.name}
              </Text>
            </View>

            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                elevation: 5,
              }}
            >
              <utils.vectorIcon.FontAwesome
                name="circle"
                color="green"
                size={14}
              />
            </View>
          </View>
        )}
      </Marker>
    );
  };

  const currentPosMarker = () => {
    return (
      <Marker identifier="mkcpstn" coordinate={cp} pinColor={"#0E47A1"}>
        <utils.vectorIcon.Ionicons
          name="md-navigate-circle"
          color="#0E47A1"
          size={22}
        />
      </Marker>
    );
  };

  const captainsMarker = () => {
    let c = captains.map((e, i, a) => {
      const obj = {
        latitude: e.captain.location.coordinates[1],
        longitude: e.captain.location.coordinates[0],
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      // console.log(" nearest captan   : ", obj);
      return renderShowCars(
        obj,
        { uri: e.vehicle[0].type.image, priority: FastImage.priority.high } ||
          require("../../assets/images/pickup.png")
      );
    });

    return c;
  };

  const renderShowCars = (cars, img) => {
    return (
      <Marker identifier="mkcars" coordinate={cars} pinColor={"silver"}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={img}
          style={{ width: 30, height: 30, opacity: 0.65 }}
        />
      </Marker>
    );
  };

  const currentCaptainMarker = () => {
    let name = req.type.type.toLowerCase() || "";
    let n = "";

    if (name == "truck") n = require("../../assets/images/truck.png");

    if (name == "pickup") n = require("../../assets/images/pickup.png");

    if (name == "shehzore") n = require("../../assets/images/shehzore.png");

    if (name == "container") n = require("../../assets/images/container.png");

    let loc = {
      latitude: req.captain.location.coordinates[1],
      longitude: req.captain.location.coordinates[0],
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    return (
      <Marker
        identifier="mkcpstnc"
        coordinate={!cl ? loc : cl}
        pinColor={"silver"}
      >
        <Image
          source={n}
          style={{ width: 25, height: 25, opacity: 0.8, resizeMode: "contain" }}
        />
      </Marker>
    );
  };

  const ISPointInPolygon = (point) => {
    if (polygons.length > 0) {
      for (let index = 0; index < polygons.length; index++) {
        const e = polygons[index];
        let p = e.latlngs.length;
        if (p > 0) {
          const c = isPointInPolygon(point, e.latlngs);
          if (c) {
            setisNoarea(false);
            break;
          }
          setisNoarea(true);
        }
      }
    }
  };

  const ShareRideDetails = async () => {
    const shareOptions = {
      message: `Hey I booked a Deliverit mini! The Captain is ${req.captain.fullname}, driving a ${req.vehicle.color} ${req.vehicle.car_name.name}, ${req.vehicle.registration_number}, mobile number is ${req.captain.mobile_number}. `,
    };
    try {
      const result = await Share.share(shareOptions);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("result activityType", result.activityType);
          // shared with activity type of result.activityType
        } else {
          console.log("share");
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log("dismiis");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // calback method section

  const RegionChangeComplete = async (e) => {
    const loc = { latitude: e.latitude, longitude: e.longitude };

    // console.log("on region chnag cal : ");
    // let data = {
    //   name: "",
    //   address: "",
    //   location: e,
    // };
    // setregion(data);

    if (!ispickup) {
      if (ft > 0 && i == 0 && se) {
        // console.log("on region chnag cal : ", e);

        if (ieo(dropoff) && ieo(pickup)) {
          setll(true);
        }
        setloader(true);
        setisNoarea(false);

        let name = "";
        let address = "";

        Geocoder.from(loc)
          .then((json) => {
            setloader(false);
            setll(false);

            console.log("geocoder json : ", json);

            (name = json.results[0].formatted_address),
              (address = json.results[0].formatted_address);

            let data = {
              name: name,
              address: address,
              location: e,
            };

            if (!isdropoff) {
              setdropoff(data);
              setregion(data);
            }

            if (isdropoff) {
              setpickup(data);
              setregion(data);
            }

            const point = { latitude: e.latitude, longitude: e.longitude };
            ISPointInPolygon(point);

            return;
          })
          .catch((error) => {
            setloader(false);
            setll(false);
            if (error.code == 4) {
              utils.AlertMessage(
                "",
                "Please enable billing account on your google map api key"
              );
            }
            console.warn("geocoder error : ", error);
            return;
          });
      }
    }
  };

  const onmapReady = () => {
    setmr(true);
  };

  const gotoHelp = () => {
    Navigation.push(ROOT_NAV_ID, {
      component: {
        name: "Help",
        options: {
          topBar: {
            visible: false,
          },
        },

        passProps: {
          from: "search",
          addbackhandler: () => addBackHandler(),
          removebckhndlr: () => removeBackHandler(),
        },
      },
    });
  };

  const rednerDot = () => {
    return (
      <View style={styles.markerFixed}>
        {!generalmanager.internet && (
          <View
            style={{
              backgroundColor: "white",
              padding: 3,
              bottom: 10,
              alignSelf: "center",
              position: "absolute",
              width: 150,
              alignItems: "center",
              justifyContent: "center",
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 12, color: "black", borderRadius: 5 }}>
              No internet connection !
            </Text>
          </View>
        )}

        {generalmanager.internet && isNoarea && (
          <View
            style={{
              backgroundColor: "white",
              padding: 3,
              bottom: 10,
              alignSelf: "center",
              position: "absolute",
              width: 250,
              alignItems: "center",
              justifyContent: "center",
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 12, color: "black", borderRadius: 5 }}>
              Deliverit mini does not operate in this area
            </Text>
          </View>
        )}

        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: 6,
            backgroundColor: "black",
          }}
        />
      </View>
    );
  };

  const renderZoom = () => {
    return (
      <View
        style={{
          position: "absolute",
          top: 13,
          right: 12,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          opacity: 0.7,
          borderRadius: 5,
          padding: 4,
        }}
      >
        <TouchableOpacity onPress={() => gotoCurrentLoc()}>
          <utils.vectorIcon.MaterialIcons
            name="my-location"
            color="#0E47A1"
            size={27}
          />
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 15 }} onPress={zoomin}>
          <utils.vectorIcon.Feather name="zoom-in" color="#0E47A1" size={30} />
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 15 }} onPress={zoomout}>
          <utils.vectorIcon.Feather name="zoom-out" color="#0E47A1" size={30} />
        </TouchableOpacity>
      </View>
    );
  };

  const rednerHeader = () => {
    return (
      <View>
        <View style={styles.header}>
          {!isdropoff && (
            <TouchableOpacity onPress={goBack} style={styles.CrossButton}>
              <Icon name={"cross"} size={24} color={"#fff"} />
            </TouchableOpacity>
          )}
          {isdropoff && (
            <TouchableOpacity onPress={ongoBack} style={styles.CrossButton}>
              <utils.vectorIcon.Ionicons
                name="chevron-back-sharp"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onMenuPressed} style={styles.MenuButton}>
            <Icon name={"menu"} size={24} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };

    if (ispickup == false) {
      return (
        <View
          style={[
            styles.BottomView,
            {
              backgroundColor: !ieo(dropoff) ? "white" : "grey",
              opacity: !ieo(dropoff) ? 1 : 0.8,
            },
          ]}
        >
          <TouchableOpacity onPress={gotoDropoff}>
            <Text style={styles.Title}>
              {isdropoff == false
                ? "Where do you want to go?"
                : "Pickup location"}
            </Text>
          </TouchableOpacity>

          {ieo(dropoff) && ieo(pickup) && !ll && (
            <TouchableOpacity style={styles.Input} onPress={gotoDropoff}>
              <View style={styles.Dot}></View>
              <Text style={{ color: "grey", width: "90%" }}>
                Enter your destination
              </Text>
            </TouchableOpacity>
          )}

          {ieo(dropoff) && ieo(pickup) && ll && (
            <TouchableOpacity onPress={gotoDropoff}>
              <ActivityIndicator
                style={{ marginTop: 10 }}
                color="white"
                size={25}
              />
            </TouchableOpacity>
          )}

          {!ieo(dropoff) && !loader && (
            <View style={styles.dropOff}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onPress={gotoDropoff}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: !isdropoff ? "green" : "#0E47A1",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {!isdropoff && (
                    <utils.vectorIcon.Entypo
                      name={"location-pin"}
                      size={25}
                      color="white"
                    />
                  )}
                  {isdropoff && (
                    <utils.vectorIcon.Ionicons
                      name={"person"}
                      size={25}
                      color="white"
                    />
                  )}
                </View>
                <View style={{ width: "85%" }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ color: "black", fontSize: 20, lineHeight: 20 }}
                  >
                    {!isdropoff ? dropoff.name : pickup.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ color: "grey", fontSize: 13, lineHeight: 20 }}
                  >
                    {!isdropoff ? dropoff.address : pickup.address}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {loader && !ll && (
            <Image
              style={{
                marginVertical: 5,
                width: "90%",
                height: 40,
                resizeMode: "contain",
              }}
              source={require("../../assets/loaded.gif")}
            />
          )}

          {!ieo(dropoff) && (
            <TouchableOpacity
              disabled={loader}
              onPress={() => {
                if (!isdropoff) confirmDropOff();

                if (isdropoff) confirmPickup();
              }}
              style={styles.Button}
            >
              {!ieo(dropoff) && isdropoff == false && !loader && (
                <Text style={styles.ButtonText}>Confirm dropoff</Text>
              )}
              {!ieo(dropoff) && !isdropoff && loader && (
                <ActivityIndicator size={20} color="white" />
              )}
              {!ieo(dropoff) && isdropoff == true && !loader && (
                <Text style={styles.ButtonText}>Confirm pickup</Text>
              )}
              {!ieo(pickup) && isdropoff && loader && (
                <ActivityIndicator size={20} color="white" />
              )}
            </TouchableOpacity>
          )}
        </View>
      );
    } else {
      let stylee = !ridedetail
        ? [styles.BottomView, { paddingHorizontal: 0, paddingVertical: 0 }]
        : {
            paddingHorizontal: 10,
            backgroundColor: "white",
            paddingVertical: 15,
            height: "100%",
            width: "100%",
          };

      return (
        <GestureRecognizer
          onSwipeUp={(state) => setridedetail(true)}
          onSwipeDown={(state) => setridedetail(false)}
          config={config}
          style={{ flex: 1 }}
        >
          <View style={stylee}>
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 15,
                width: "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text style={{ fontSize: 13, color: "grey", width: "50%" }}>
                  {td.toFixed(1)} Km
                </Text>
              </View>

              {vta.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    setridedetail(!ridedetail);
                  }}
                  activeOpacity={0.6}
                  style={{
                    width: "100%",
                    flexDirection: "row",

                    alignItems: "center",

                    justifyContent: "space-between",
                    marginBottom: !ridedetail ? 0 : 5,
                  }}
                >
                  <Text style={{ fontSize: 20, color: "black" }}>
                    Ride details
                  </Text>
                  <utils.vectorIcon.MaterialIcons
                    name={
                      !ridedetail ? "keyboard-arrow-up" : "keyboard-arrow-down"
                    }
                    color="silver"
                    size={25}
                  />
                </TouchableOpacity>
              )}

              {vta.length > 0 ? (
                <>
                  {!ridedetail ? (
                    renderShowRides()
                  ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {renderShowRides()}
                    </ScrollView>
                  )}
                </>
              ) : (
                <>
                  <Text>Sorry , No any pickup type found</Text>
                </>
              )}
            </View>

            {!ridedetail && (
              <View
                style={{
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  elevation: 3,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setcashDialog(true);
                  }}
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <utils.vectorIcon.MaterialCommunityIcons
                      name="cash"
                      color="silver"
                      size={35}
                    />
                    <Text
                      style={{ marginLeft: 10, fontSize: 17, color: "black" }}
                    >
                      Cash
                    </Text>
                  </View>
                  <utils.vectorIcon.MaterialIcons
                    name="keyboard-arrow-down"
                    color="silver"
                    size={25}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    onClickChalo();
                  }}
                  style={styles.Button}
                >
                  {!loader && <Text style={styles.ButtonText}>CHALO!</Text>}
                  {loader && <ActivityIndicator size={20} color="white" />}
                </TouchableOpacity>
              </View>
            )}
          </View>
        </GestureRecognizer>
      );
    }
  };

  const renderFooterCaptainSheet = () => {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };

    let name = req.type.type;
    let rs = req.type.rent;

    let n =
      { uri: req.type.image, priority: FastImage.priority.high } ||
      require("../../assets/images/pickup.png");

    let title =
      !arrive && !startride
        ? "Get ready, your Captain is on the way"
        : arrive && !startride
        ? "Captain is waiting for you at pickup location"
        : "You're on your way";

    if (!endride) {
      return (
        <View
          style={{
            height: rbsheetUp ? height : height - 400,
            borderTopLeftRadius: rbsheetUp ? 0 : 20,
            borderTopRightRadius: rbsheetUp ? 0 : 20,
            backgroundColor: "white",
            elevation: 5,
            position: "absolute",
            bottom: 0,
          }}
        >
          <GestureRecognizer
            onSwipeUp={(state) => setrbsheetUp(true)}
            onSwipeDown={(state) => setrbsheetUp(false)}
            config={config}
            style={{
              flex: 1,
              backgroundColor: "white",
            }}
          >
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <View style={{ backgroundColor: "white", padding: 10 }}>
                <TouchableOpacity
                  style={{ alignSelf: "center" }}
                  onPress={() => {
                    setrbsheetUp(!rbsheetUp);
                  }}
                >
                  <utils.vectorIcon.AntDesign
                    name={rbsheetUp ? "down" : "up"}
                    size={20}
                    color="grey"
                  />
                </TouchableOpacity>

                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
                >
                  {title}
                </Text>
              </View>

              <View
                style={{ width: "100%", height: 3, backgroundColor: "silver" }}
              />

              <ScrollView
                scrollEnabled={rbsheetUp ? true : false}
                showsVerticalScrollIndicator={false}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: 10,
                    marginTop: 3,
                    backgroundColor: "white",
                  }}
                >
                  {(!req.captain.profile_image ||
                    req.captain.profile_image == "") && (
                    <utils.vectorIcon.FontAwesome
                      name="user-circle"
                      color="#0E47A1"
                      size={60}
                    />
                  )}
                  {req.captain.profile_image &&
                    req.captain.profile_image !== "" && (
                      <View
                        style={{
                          width: 60,
                          height: 60,
                          borderColor: "#0E47A1",
                          borderRadius: 30,
                          borderWidth: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          onLoad={() => {
                            setimgLoadd(true);
                          }}
                          style={{ width: 59, height: 59, borderRadius: 29.5 }}
                          source={{ uri: req.captain.profile_image }}
                        />
                        {imgLoadd == false && (
                          <ActivityIndicator
                            size={10}
                            color="#0E47A1"
                            style={{ top: 25, position: "absolute" }}
                          />
                        )}
                      </View>
                    )}

                  <View style={{ width: "62%" }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        fontSize: 20,
                        color: "black",
                        lineHeight: 25,
                        textTransform: "capitalize",
                      }}
                    >
                      {req.captain.fullname}
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        fontSize: 17,
                        color: "black",
                        lineHeight: 25,
                        textTransform: "capitalize",
                      }}
                    >
                      {req.vehicle.registration_number}
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        fontSize: 17,
                        color: "grey",
                        lineHeight: 25,
                        textTransform: "capitalize",
                      }}
                    >
                      {req.vehicle.car_name.name + " " + req.vehicle.color}
                    </Text>
                  </View>

                  <View style={{ width: "17%", height: 30 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        alignSelf: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                          color: "grey",
                          alignSelf: "flex-end",
                          lineHeight: 25,
                        }}
                      >
                        {ar.toFixed(1)}
                      </Text>
                      <utils.vectorIcon.FontAwesome
                        name="star"
                        color="grey"
                        style={{ marginLeft: 5 }}
                        size={17}
                      />
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    width: "100%",
                    height: 0.8,
                    backgroundColor: "silver",
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    backgroundColor: "silver",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      callUser(req.captain.mobile_number);
                    }}
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 7,
                      backgroundColor: "white",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <utils.vectorIcon.Ionicons
                        name="ios-call"
                        color="grey"
                        size={20}
                      />
                      <Text
                        style={{ fontSize: 15, color: "black", marginLeft: 5 }}
                      >
                        CALL
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {/* <TouchableOpacity style={{width:"49.8%",alignItems:"center",justifyContent:"center",padding:7,backgroundColor:"white"}}>
				 <View style={{flexDirection:"row",alignItems:"center"}}>
				<utils.vectorIcon.Ionicons name="chatbubble" color="grey" size={20}/>
				 <Text  style={{fontSize:15,color:"black",marginLeft:5}}>CHAT</Text> 
				 </View>
			 </TouchableOpacity> */}
                </View>

                <View
                  style={{
                    width: "100%",
                    height: 3,
                    backgroundColor: "silver",
                  }}
                />

                <View
                  style={{
                    width: "100%",
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 3,
                    backgroundColor: "white",
                  }}
                >
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <utils.vectorIcon.FontAwesome
                      name="circle-thin"
                      size={15}
                      color="#0E47A1"
                    />
                    <View
                      style={{
                        width: 1,
                        height: 50,
                        backgroundColor: "#0E47A1",
                      }}
                    />
                    <utils.vectorIcon.FontAwesome
                      name="circle"
                      size={15}
                      color="#0E47A1"
                    />
                  </View>

                  <View style={{ width: "90%" }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ fontSize: 18, color: "black", lineHeight: 25 }}
                    >
                      {req.pickup.name}
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ fontSize: 15, color: "silver", lineHeight: 20 }}
                    >
                      {req.pickup.address}
                    </Text>

                    <View
                      style={{
                        width: "100%",
                        backgroundColor: "silver",
                        height: 0.5,
                        alignSelf: "center",
                        opacity: 0.5,
                        marginVertical: 10,
                      }}
                    />

                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ fontSize: 18, color: "black", lineHeight: 25 }}
                    >
                      {req.dropoff.name}
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ fontSize: 15, color: "silver", lineHeight: 20 }}
                    >
                      {req.dropoff.address}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: "100%",
                    height: 3,
                    backgroundColor: "silver",
                  }}
                />

                <View
                  style={{
                    width: "100%",
                    padding: 10,
                    marginTop: 3,
                    backgroundColor: "white",
                  }}
                >
                  <Text style={{ fontSize: 16, color: "silver" }}>
                    Booking details
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <FastImage
                      resizeMode={FastImage.resizeMode.contain}
                      source={n}
                      style={{ width: 30, height: 30 }}
                    />

                    <Text
                      style={{
                        fontSize: 17,
                        color: "black",
                        marginLeft: 15,
                        textTransform: "capitalize",
                      }}
                    >
                      {name}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: "70%",
                      backgroundColor: "silver",
                      height: 0.5,
                      alignSelf: "center",
                      opacity: 0.5,
                      marginVertical: 10,
                    }}
                  />

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <utils.vectorIcon.MaterialCommunityIcons
                      name="cash"
                      color="silver"
                      size={30}
                    />
                    <Text
                      style={{
                        fontSize: 17,
                        color: "black",
                        marginLeft: 15,
                        textTransform: "capitalize",
                      }}
                    >
                      Cash
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: "100%",
                    height: 3,
                    backgroundColor: "silver",
                  }}
                />

                <View
                  style={{
                    width: "100%",
                    padding: 10,
                    marginTop: 3,
                    backgroundColor: "white",
                  }}
                >
                  <Text style={{ fontSize: 16, color: "silver" }}>
                    Manage rides
                  </Text>

                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                    onPress={() => ShareRideDetails()}
                  >
                    <utils.vectorIcon.MaterialCommunityIcons
                      name="share-circle"
                      color="silver"
                      size={25}
                    />
                    <Text
                      style={{ fontSize: 17, color: "black", marginLeft: 15 }}
                    >
                      Share ride details
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      width: "70%",
                      backgroundColor: "silver",
                      height: 0.5,
                      alignSelf: "center",
                      opacity: 0.5,
                      marginVertical: 15,
                    }}
                  />

                  <TouchableOpacity
                    onPress={gotoHelp}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <utils.vectorIcon.AntDesign
                      name="questioncircle"
                      color="silver"
                      size={22}
                    />
                    <Text
                      style={{ fontSize: 17, color: "black", marginLeft: 15 }}
                    >
                      Get support
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      width: "70%",
                      backgroundColor: "silver",
                      height: 0.5,
                      alignSelf: "center",
                      opacity: 0.5,
                      marginVertical: 15,
                    }}
                  />

                  <TouchableOpacity
                    onPress={() => rBSheetc?.current?.open()}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <utils.vectorIcon.Entypo
                      name="circle-with-cross"
                      color="#d66363"
                      size={25}
                    />
                    <Text
                      style={{
                        fontSize: 17,
                        color: "#c74242",
                        marginLeft: 15,
                        textTransform: "capitalize",
                      }}
                    >
                      Cancel ride
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </GestureRecognizer>
        </View>
      );
    } else if (endride) {
      return (
        <View
          style={{
            padding: 10,
            borderTopLeftRadius: rbsheetUp ? 0 : 20,
            borderTopRightRadius: rbsheetUp ? 0 : 20,
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            backgroundColor: "white",
            elevation: 5,
            position: "absolute",
            bottom: 0,
          }}
        >
          {(!req.captain.profile_image || req.captain.profile_image == "") && (
            <utils.vectorIcon.FontAwesome
              name="user-circle"
              color="#0E47A1"
              size={60}
            />
          )}
          {req.captain.profile_image && req.captain.profile_image !== "" && (
            <View
              style={{
                width: 60,
                height: 60,
                borderColor: "#0E47A1",
                borderRadius: 30,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                onLoad={() => {
                  setimgLoad(true);
                }}
                style={{ width: 59, height: 59, borderRadius: 29.5 }}
                source={{ uri: req.captain.profile_image }}
              />
              {imgLoad == false && (
                <ActivityIndicator
                  size={10}
                  color="#0E47A1"
                  style={{ top: 25, position: "absolute" }}
                />
              )}
            </View>
          )}

          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{
              fontSize: 18,
              color: "black",
              lineHeight: 25,
              marginBottom: 15,
            }}
          >
            How was your experience with {req.captain.fullname}. ?
          </Text>

          <StarRating
            containerStyle={{}}
            disabled={false}
            maxStars={5}
            starStyle={{ borderWidth: 0, marginLeft: 10 }}
            fullStarColor={"#0E47A1"}
            rating={starCount}
            selectedStar={(rating) => setstarCount(rating)}
          />

          {req.rent == 0 && (
            <View
              style={{
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: 16,
                  color: theme.colors.primary,
                  fontWeight: "bold",
                }}
              >
                Fare paid from wallet
              </Text>
            </View>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginTop: 10,
            }}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ fontSize: 16, color: "grey", width: "30%" }}
            >
              Total ride fare
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 17,
                color: "black",
                width: "65%",
                textAlign: "right",
                fontWeight: "bold",
              }}
            >
              PKR {req.rent > 0 ? req.rent : req.rent_afterBaseCharges}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              onclickDoneRide();
            }}
            style={[styles.Button, { marginTop: 15 }]}
          >
            {!loader && <Text style={styles.ButtonText}>Done</Text>}
            {loader && <ActivityIndicator size={20} color="white" />}
          </TouchableOpacity>
        </View>
      );
    }
  };

  const renderSepLine = () => {
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: "silver",
          height: 0.5,
          alignSelf: "center",
          opacity: 0.5,
          marginVertical: 5,
        }}
      />
    );
  };

  const renderCashdialog = () => {
    let titlefz = 15;

    return (
      <Dialog
        visible={cashDialog}
        dialogStyle={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: 0,
        }}
        containerStyle={{ justifyContent: "flex-end" }}
        hasOverlay={true}
        onTouchOutside={() => {
          setcashDialog(false);
        }}
        overlayOpacity={0.7}
        //  onHardwareBackPress={()=>false}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
            initialValue: 0, // optional
            animationDuration: 50, // optional
            useNativeDriver: true, // Add This line
          })
        }
      >
        <DialogContent style={{ paddingVertical: 15, paddingHorizontal: 5 }}>
          {/* first option	 */}
          <View
            style={{
              width: "100%",
              padding: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "45%",
              }}
            >
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <utils.vectorIcon.AntDesign
                  name="creditcard"
                  color="#0E47A1"
                  size={27}
                />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: titlefz, color: "black" }}>
                  DeliverIt Pay
                </Text>
                <Text style={{ fontSize: 13, color: "silver" }}>
                  Use credit first
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Text
                numberOfLines={1}
                ellipsizeMode={"tail"}
                style={{
                  fontSize: titlefz,
                  color: "#0E47A1",
                  width: "70%",
                  marginRight: 5,
                  textAlign: "right",
                }}
              >
                PKR {usermanager.uwbalance.toFixed()}
              </Text>
              <ToggleSwitch
                isOn={cashSwitch}
                onColor="#0E47A1"
                offColor="silver"
                size="medium"
                onToggle={(isOn) => {
                  if (usermanager.uwbalance > 0) {
                    setcashSwitch(isOn);
                  } else if (usermanager.uwbalance == 0) {
                    Alert.alert("", "Sorry, your wallet is empty");
                  } else if (usermanager.uwbalance < 0) {
                    Alert.alert(
                      "",
                      `You have an outstanding payment of ${usermanager.uwbalance} PKR. This amount will be added in your next booking.`
                    );
                  }
                }}
              />
            </View>
          </View>
          {renderSepLine()}

          {/* sencond option */}
          <TouchableOpacity
            onPress={() => {}}
            style={{
              width: "100%",
              padding: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: -3,
              }}
            >
              <utils.vectorIcon.MaterialCommunityIcons
                name="cash"
                color="silver"
                size={37}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: titlefz,
                  color: "black",
                  textTransform: "capitalize",
                }}
              >
                {pm}
              </Text>
            </View>
            <utils.vectorIcon.AntDesign
              name="checkcircle"
              color="#0E47A1"
              size={22}
            />
          </TouchableOpacity>
          {renderSepLine()}

          {/* third option */}
          {/* <TouchableOpacity
            onPress={() => gotoAddCard()}
            style={{
              width: "100%",
              padding: 5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <utils.vectorIcon.AntDesign name="plus" color="#0E47A1" size={20} />
            <Text
              style={{
                marginLeft: 20,
                fontSize: titlefz - 2,
                color: "#0E47A1",
              }}
            >
              ADD CARD
            </Text>
          </TouchableOpacity> */}
        </DialogContent>
      </Dialog>
    );
  };

  const renderShowRides = () => {
    let arr = !ridedetail ? vta.slice(0, 1) : vta;

    let c = arr.map((e, i, a) => {
      let name = e.type;
      let rent = e.rent;
      let n =
        { uri: e.image, priority: FastImage.priority.high } ||
        require("../../assets/images/pickup.png");
      let rs = rent * td.toFixed(1);
      let maxWeight = e.max_weight;
      let wc = e.waiting_charges;

      return (
        <TouchableOpacity
          onPress={() => {
            setsr(e);
            setridedetail(false);
            const fid = e._id;
            vta.sort((x, y) => {
              return x._id === fid ? -1 : y._id === fid ? 1 : 0;
            });
          }}
          style={{
            elevation: sr.type == name ? 5 : 0,
            marginTop: !ridedetail ? 7 : i == 0 ? 40 : 20,
            marginBottom: !ridedetail ? 0 : i == a.length - 1 ? 40 : 0,
            width: "98%",
            backgroundColor: "white",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "66%",
            }}
          >
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              source={n}
              style={styles.catImg}
            />
            <View style={{ marginLeft: 10, width: "85%" }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: 19,
                  color: "#0E47A1",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
              >
                {name}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ fontSize: 15, color: "grey" }}
              >
                Munasib savaree
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ fontSize: 15, color: "grey" }}
              >
                Max weight: {maxWeight} kg
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ fontSize: 15, color: "grey" }}
              >
                Waiting charges: PKR {wc}
              </Text>
            </View>
          </View>
          <View style={{ width: "26%" }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 14,
                color: "black",
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              PKR {rs.toFixed()}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });

    return c;
  };

  //find your captain and captain dtail botom shwwt if chalo true
  const renderRbsheet = () => {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    var name = sr.type;
    let n = { uri: sr.image } || require("../../assets/images/pickup.png");
    let rs = sr.rent;
    let id = sr._id;

    return (
      <>
        {acceptRequest == "f" && (
          <View
            style={{
              padding: 10,
              height: rbsheetUp ? height - 190 : height - 410,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: "white",
              position: "absolute",
              bottom: 0,
              elevation: 7,
            }}
          >
            <GestureRecognizer
              onSwipeUp={(state) => setrbsheetUp(true)}
              onSwipeDown={(state) => setrbsheetUp(false)}
              config={config}
              style={{
                backgroundColor: "white",
              }}
            >
              <View>
                <TouchableOpacity
                  style={{ alignSelf: "center" }}
                  onPress={() => {
                    setrbsheetUp(!rbsheetUp);
                  }}
                >
                  <utils.vectorIcon.AntDesign
                    name={rbsheetUp ? "down" : "up"}
                    size={20}
                    color="grey"
                  />
                </TouchableOpacity>

                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: 22,
                    color: "black",
                    fontWeight: "bold",
                    alignSelf: "center",
                    textAlign: "center",
                  }}
                >
                  Finding Your Captain
                </Text>

                <Image
                  style={{ width: "100%", height: 30, resizeMode: "contain" }}
                  source={require("../../assets/loaded.gif")}
                />
              </View>

              <View
                style={{ width: "100%", height: 3, backgroundColor: "silver" }}
              />

              <ScrollView
                scrollEnabled={rbsheetUp ? true : false}
                showsVerticalScrollIndicator={false}
              >
                <View
                  style={{
                    width: "100%",
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 3,
                    backgroundColor: "white",
                  }}
                >
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <utils.vectorIcon.FontAwesome
                      name="circle-thin"
                      size={15}
                      color="#0E47A1"
                    />
                    <View
                      style={{
                        width: 1,
                        height: 50,
                        backgroundColor: "#0E47A1",
                      }}
                    />
                    <utils.vectorIcon.FontAwesome
                      name="circle"
                      size={15}
                      color="#0E47A1"
                    />
                  </View>

                  <View style={{ width: "90%" }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ fontSize: 18, color: "black", lineHeight: 25 }}
                    >
                      {pickup.name}
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ fontSize: 15, color: "silver", lineHeight: 20 }}
                    >
                      {pickup.address}
                    </Text>

                    <View
                      style={{
                        width: "100%",
                        backgroundColor: "silver",
                        height: 0.5,
                        alignSelf: "center",
                        opacity: 0.5,
                        marginVertical: 10,
                      }}
                    />

                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ fontSize: 18, color: "black", lineHeight: 25 }}
                    >
                      {dropoff.name}
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ fontSize: 15, color: "silver", lineHeight: 20 }}
                    >
                      {dropoff.address}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: "100%",
                    height: 3,
                    backgroundColor: "silver",
                  }}
                />

                <View
                  style={{
                    width: "100%",
                    padding: 10,
                    marginTop: 3,
                    backgroundColor: "white",
                  }}
                >
                  <Text style={{ fontSize: 16, color: "silver" }}>
                    Booking details
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Image
                      source={n}
                      style={{ width: 30, height: 30, resizeMode: "contain" }}
                    />
                    <Text
                      style={{
                        fontSize: 17,
                        color: "black",
                        marginLeft: 15,
                        textTransform: "capitalize",
                      }}
                    >
                      {name}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: "70%",
                      backgroundColor: "silver",
                      height: 0.5,
                      alignSelf: "center",
                      opacity: 0.5,
                      marginVertical: 10,
                    }}
                  />

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <utils.vectorIcon.MaterialCommunityIcons
                      name="cash"
                      color="silver"
                      size={30}
                    />
                    <Text
                      style={{
                        fontSize: 17,
                        color: "black",
                        marginLeft: 15,
                        textTransform: "capitalize",
                      }}
                    >
                      Cash
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: "100%",
                    height: 3,
                    backgroundColor: "silver",
                  }}
                />

                <View
                  style={{
                    width: "100%",
                    padding: 10,
                    marginTop: 3,
                    backgroundColor: "white",
                  }}
                >
                  <Text style={{ fontSize: 16, color: "silver" }}>
                    Manage rides
                  </Text>

                  <TouchableOpacity
                    onPress={gotoHelp}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <utils.vectorIcon.AntDesign
                      name="questioncircle"
                      color="silver"
                      size={21}
                    />
                    <Text
                      style={{ fontSize: 17, color: "black", marginLeft: 15 }}
                    >
                      Get support
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      width: "70%",
                      backgroundColor: "silver",
                      height: 0.5,
                      alignSelf: "center",
                      opacity: 0.5,
                      marginVertical: 15,
                    }}
                  />

                  <TouchableOpacity
                    onPress={() => rBSheetc?.current?.open()}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <utils.vectorIcon.Entypo
                      name="circle-with-cross"
                      color="#d66363"
                      size={25}
                    />
                    <Text
                      style={{
                        fontSize: 17,
                        color: "#c74242",
                        marginLeft: 15,
                        textTransform: "capitalize",
                      }}
                    >
                      Cancel ride
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </GestureRecognizer>
          </View>
        )}
      </>
    );
  };

  const renderCancelRideSheet = () => {
    return (
      <RBSheet
        ref={rBSheetc}
        closeOnDragDown={false}
        closeOnPressMask={false}
        closeOnPressBack={true}
        c={"close"}
        keyboardAvoidingViewEnabled={true}
        animationType="slide"
        customStyles={{
          //   draggableIcon: {
          // 	  backgroundColor: 'grey',
          // 	  width:50
          //   },
          container: {
            padding: 15,
            width: "100%",
            height: "35%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: "white",
            elevation: 7,
          },
        }}
      >
        <View style={{ backgroundColor: "white" }}>
          <View style={{ height: "80%" }}>
            <utils.vectorIcon.MaterialIcons
              name="not-interested"
              color="#0E47A1"
              size={50}
            />
            <Text style={{ fontSize: 22, color: "black", marginTop: 10 }}>
              Are you sure you want to cancel ?
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              height: "20%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                rBSheetc?.current?.close();
              }}
              style={{
                padding: 10,
                backgroundColor: "silver",
                width: 150,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
            >
              <Text style={{ fontSize: 18, color: "black" }}>Don't cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                cancelRide();
              }}
              style={{
                padding: 10,
                backgroundColor: "#0E47A1",
                width: 150,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
            >
              <Text style={{ fontSize: 18, color: "white" }}>Cancel ride</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    );
  };

  let erPloc = null;
  let erDloc = null;

  if (endride && req) {
    erPloc = {
      latitude: req.pickup.location.latitude,
      longitude: req.pickup.location.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    erDloc = {
      latitude: req.dropoff.location.latitude,
      longitude: req.dropoff.location.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
  }

  //main return
  return (
    <SideMenuView style={{ flex: 1 }} drawerName={"customDrawer"}>
      <SafeAreaView style={styles.Container}>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor={"transparent"}
        />
        <utils.Loader loader={loaderT} location={true} />
        <utils.Loader loader={loaderB} ride={true} />
        <utils.Loader loader={requestmanager.getreqloader} l={true} />
        <utils.Loader loader={l} sl={true} />

        <MapView
          showsCompass={false}
          minZoomLevel={1} // default => 0
          maxZoomLevel={18} // default => 20
          provider={PROVIDER_GOOGLE}
          pitchEnabled={false}
          scrollEnabled={se}
          zoomEnabled={!ispickup ? false : true}
          rotateEnabled={!ispickup ? false : true}
          scrollDuringRotateOrZoomEnabled={false}
          style={styles.map}
          ref={mapRef}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          onMapReady={onmapReady}
          onRegionChangeComplete={(e) => {
            RegionChangeComplete(e);
          }}

          //cmnts
          // showsTraffic={true}
          // showsMyLocationButton={true}
          //   showsUserLocation ={true}
          // followsUserLocation
          // userLocationUpdateInterval={2000}
          //  region={!ieo(position)?position:initialRegion}
          //  onUserLocationChange={(e)=>{onChnageUserLoc(e)}}
          // scrollDuringRotateOrZoomEnabled={true}
          // onRegionChange={(region) => setPosition(region)}
        >
          {polygons.length > 0 &&
            polygons.map((polygon) => (
              <Polygon
                key={polygon._id}
                coordinates={polygon.latlngs}
                fillColor="rgba(0,0,0,0.1)"
                strokeColor="silver"
              />
            ))}

          {!ieo(cp) && currentPosMarker()}
          {!ispickup && captains.length > 0 && captainsMarker()}
          {acceptRequest == true && req && !endride && currentCaptainMarker()}
          {((!ieo(dropoff) && !isdropoff) ||
            (ispickup && !chalo) ||
            startride ||
            endride) &&
            destinationMarker()}
          {((((!ieo(pickup) && isdropoff) || ispickup || chalo) &&
            !startride) ||
            endride) &&
            pickupMarker()}

          {((ispickup && !chalo) || endride) && (
            <MapViewDirections
              origin={!endride ? pickup.location : erPloc}
              destination={!endride ? dropoff.location : erDloc}
              apikey={gapikey}
              mode="DRIVING"
              strokeWidth={4}
              strokeColor="green"
            />
          )}

          {acceptRequest == true && !startride && !endride && (
            <MapViewDirections
              origin={{
                latitude: req.pickup.location.latitude,
                longitude: req.pickup.location.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              destination={{
                latitude: !cl
                  ? req.captain.location.coordinates[1]
                  : cl.latitude,
                longitude: !cl
                  ? req.captain.location.coordinates[0]
                  : cl.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              apikey={gapikey}
              mode="DRIVING"
              strokeWidth={3}
              strokeColor="grey"
            />
          )}
          {/* {(captains.length>0 && (!ieo(dropoff) || !ieo(pickup)) && !ispickup )   && captainsMarker()} */}
        </MapView>

        {!generalmanager.internet && ispickup && (
          <utils.TopMessage p={"abs"} msg={"Please Connect internet !"} />
        )}
        {!chalo && rednerHeader()}
        {!ispickup && rednerDot()}
        {!chalo && renderFooter()}
        {chalo && acceptRequest == true && req && renderFooterCaptainSheet()}
        {chalo && acceptRequest != true && req && renderRbsheet()}
        {renderCancelRideSheet()}
        {!ispickup && renderZoom()}
        {renderCashdialog()}
      </SafeAreaView>
    </SideMenuView>
  );
});

export default Search;
