import axios from "axios";
import link from "../Links/index";

export function apiCall(method, path, bodyData, headers) {
  let header;
  if (headers == "") {
    header = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  } else if (headers == "upload") {
    header = {
      "Content-Type": "multipart/form-data",
    };
  } else {
    header = new Headers({
      Authorization: "Bearer " + headers,
      "Content-Type": "application/json",
    });
  }

  let obj =
    bodyData != false
      ? {
          method: method,
          headers: header,
          body: headers !== "upload" ? JSON.stringify(bodyData) : bodyData,
        }
      : {
          method: method,
          headers: header,
        };

  return new Promise((resolve, reject) => {
    return fetch(link.links + path, obj)
      .then((res) => res.json())
      .then((data) => {
        if (headers != "upload") {
          return resolve(data);
        } else {
          return resolve(data.locationArray[0].fileLocation);
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export default api = {
  apiCall,
};
