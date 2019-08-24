const geolib = require("geolib");

const checkDistanceIsWithinMeters = (start, end, toleranceInMeters = 100) => {
  // console.log(geolib.getDistance(start, end));
  return geolib.getDistance(start, end) <= toleranceInMeters;
};

exports.checkEventIsRelatedToThisRoutes = (
  event,
  routes,
  toleranceInMeters
) => {
  const eventLatLng = { latitude: event.latitude, longitude: event.longitude };
  const result = routes.some(({ overview_path }) =>
    overview_path.some(path =>
      checkDistanceIsWithinMeters(
        { latitude: path.lat, longitude: path.lng },
        eventLatLng,
        toleranceInMeters
      )
    )
  );
  return result;
};
