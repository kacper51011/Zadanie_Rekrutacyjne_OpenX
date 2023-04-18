import { useEffect, useState } from "react";
import { User } from "../types";
import axios, { AxiosResponse } from "axios";

export const Users = () => {
  const [firstUser, setFirstUser] = useState<User["name"]>();
  const [secondUser, setSecondUser] = useState<User["name"]>();

  function getDistanceBetweenTwoPoints(
    cord1: User["address"]["geolocation"],
    cord2: User["address"]["geolocation"]
  ) {
    if (cord1.lat == cord2.lat && cord1.long == cord2.long) {
      return 0;
    }

    const radlat1 = (Math.PI * parseInt(cord1.lat)) / 180;
    const radlat2 = (Math.PI * parseInt(cord2.lat)) / 180;

    const theta = parseInt(cord1.long) - parseInt(cord2.long);
    const radtheta = (Math.PI * theta) / 180;

    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    if (dist > 1) {
      dist = 1;
    }

    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344; //convert miles to km

    return dist;
  }

  const loadUsers = async () => {
    let longestDistance = 0;
    let longestDistanceUser;
    let longestDistancesecondUser;
    try {
      const response: AxiosResponse<User[]> = await axios.get(
        "https://fakestoreapi.com/users"
      );

      response.data.forEach((user) => {
        response.data.forEach((user2) => {
          const distance = getDistanceBetweenTwoPoints(
            user.address.geolocation,
            user2.address.geolocation
          );
          if (longestDistance < distance) {
            longestDistance = distance;
            longestDistanceUser = user.name;
            longestDistancesecondUser = user2.name;
          }
        });
      });
      setFirstUser(longestDistanceUser);
      setSecondUser(longestDistancesecondUser);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadUsers();
  }, []);

  // long: -180 to 180
  // lat: -90 to 90

  return (
    <>
      <h3>Location task</h3>
      <div>longest distance:</div>
      <div>
        {firstUser?.firstname + " " + firstUser?.lastname} and
        {" " + secondUser?.firstname + " " + secondUser?.lastname}
      </div>
    </>
  );
};
