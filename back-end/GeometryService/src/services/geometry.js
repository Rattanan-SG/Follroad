const geolib = require("geolib");
const eventApi = require("../clients/event");
const directionRecordApi = require("../clients/direction-record");

exports.isLocationOnRoute = async body => {
  const { latLng, route, toleranceInMeters } = body;
  return checkLatLngAndRoute(latLng, route, toleranceInMeters);
};

exports.checkAllEventWithDirectionRecordById = async body => {
  const { directionRecordId, routes, toleranceInMeters } = body;
  const {
    name,
    direction,
    notificationRoutes
  } = await directionRecordApi.getRecordById(directionRecordId, {
    fields: "name direction notificationRoutes"
  });
  const events = await eventApi.getEvent({
    fields: "id title latitude longitude"
  });

  let relatedEvents;
  if (!routes) {
    relatedEvents = events.map(({ id, title, latitude, longitude }) => {
      const eventLatLng = {
        latitude: Number(latitude),
        longitude: Number(longitude)
      };
      const result = this.checkEventIsRelatedToThisRoutes(
        eventLatLng,
        direction.routes,
        notificationRoutes,
        toleranceInMeters
      );
      return {
        id,
        title,
        result
      };
    });
  }
  const filterResult = relatedEvents.filter(item => item.result);
  return {
    directionRecordId,
    directionRecordName: name,
    directionRecordRoutes: notificationRoutes,
    toleranceInMeters,
    relatedEvent: filterResult
  };
};

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
