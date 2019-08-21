const geolib = require("geolib");

const checkDistance = (start, end, toleranceInMeters = 1000) => {
  // console.log(geolib.getDistance(start, end));
  return geolib.getDistance(start, end) <= toleranceInMeters;
};

exports.mappingEventAndRecords = (event, records) => {
  //   const routes = records.direction.routes;
  const routes = records.routes;
  const eventLatLng = { latitude: event.latitude, longitude: event.longitude };
  const result = routes.some(({ overview_path }) =>
    overview_path.some(path =>
      checkDistance({ latitude: path.lat, longitude: path.lng }, eventLatLng)
    )
  );
  return result;
};
