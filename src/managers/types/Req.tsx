export type  REQ_TYPE =
    {
 
		  id: number,   
		  
		  captain:  obj,
	 
		  user:{
		  uid:string, //customer user id
		  name:string,
		  number:string,
		  rating:string, //user k total rating
		  captainrate:string       //wo rate jo user captan ko de ga
		  },
		  pickupL: {
			 
			latitude: number ,
			longitude: number,
			latitudeDelta: number,
			longitudeDelta: number,
		
		},
		dropoffL: {
		 
			latitude: number,
			longitude: number,
			latitudeDelta: number,
			longitudeDelta: number,
		
		},
	 
		   rideType:string,
		   pickup:{
			name:string,
			address:string,
			location: object
		  },
		   dropoff:{
			name:string,
			address:string,
			location:object
		  },
		   rs:string,
	 
		  createdAt:string,
		  collectcash:string,
		  cardPay:boolean,
		  normalPay:boolean,
		  finish:boolean,
	 
		  wait_time:string,         
		  total_distance:string,
		  total_time:string,       
		  status:string,
		  cancelStatus:string,
		  cancelby:string, 
		  startRideTime:string,
		  endRideTime:string,
 
		  accept:boolean,
		  arrive:boolean,
		  startride:boolean,
		  endride:boolean
		}
