const geolib = require("geolib");

const checkDistanceIsWithinMeters = (start, end, toleranceInMeters = 100) => {
  // console.log(geolib.getDistance(start, end));
  return geolib.getDistance(start, end) <= toleranceInMeters;
};

exports.checkEventIsRelatedToThisRoutes = (
  eventLatLng,
  routes,
  toleranceInMeters
) => {
  const result = routes.some(({ overview_path }) =>
    overview_path.some(path =>
      checkDistanceIsWithinMeters(
        eventLatLng,
        { latitude: path.lat, longitude: path.lng },
        toleranceInMeters
      )
    )
  );
  return result;
};
