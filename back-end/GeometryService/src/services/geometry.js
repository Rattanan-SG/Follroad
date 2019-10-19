const geolib = require("geolib");

exports.checkEventIsRelatedToThisRoutes = (
  eventLatLng,
  routes,
  routeIndexs,
  toleranceInMeters
) => {
  const checkRoutes = routeIndexs.map(i => routes[i]);
  const result = checkRoutes.some(({ overview_path }) =>
    overview_path.some(({ lat, lng }) =>
      checkDistanceIsWithinMeters(eventLatLng, { lat, lng }, toleranceInMeters)
    )
  );
  return result;
};

exports.isLocationOnRoute = async body => {
  const { latLng, route, toleranceInMeters } = body;
  return checkLatLngAndRoute(latLng, route, toleranceInMeters);
};

const checkDistanceIsWithinMeters = (start, end, toleranceInMeters = 100) => {
  // console.log(geolib.getDistance(start, end));
  return geolib.getDistance(start, end) <= toleranceInMeters;
};

const checkLatLngAndRoute = (latLng, route, toleranceInMeters) => {
  const result = route.some(path =>
    checkDistanceIsWithinMeters(
      latLng,
      { latitude: path.lat, longitude: path.lng },
      toleranceInMeters
    )
  );
  return result;
};
