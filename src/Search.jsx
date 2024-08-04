import { stateCoordinates } from "./constants/states";

const stateFruits = await fetch("/seasonal/US_Seasonal.json").then((data) =>
  data.json()
);

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export const findNearestState = () => {
  if (!navigator.geolocation) {
    return {title: "Error",subheading: "Geolocation is not supported by this browser.", context: null};
  }
  navigator.geolocation.getCurrentPosition((position) => {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;
    // Find the nearest state
    let nearestState = "";
    let minDistance = Infinity;

    stateCoordinates.forEach((state) => {
      const { name, lat, lon } = state;
      const distance = getDistance(userLat, userLon, lat, lon);
      if (distance < minDistance) {
        minDistance = distance;
        nearestState = name;
      }
    });
    if (nearestState) {
      const currentMonth = new Date().toLocaleString("default", {
        month: "long",
      });
      const fruits = stateFruits[nearestState] || {};
      const availableFruits = Object.keys(fruits).filter((fruit) =>
        fruits[fruit].includes(currentMonth)
      );
      if (availableFruits.length > 0) {
        console.log({title: nearestState, subheading: "Fruits in Season", context: availableFruits.join(', ')})
        return {title: nearestState, subheading: "Fruits in Season", context: availableFruits.join(', ')};
      } else {
        return {title: nearestState, subheading: "Fruits in Season", context: "No fruits are in season during this month."};
      }
    }
  });
};
