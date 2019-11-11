const geolib = require("geolib");
const eventApi = require("../clients/event");
const directionRecordApi = require("../clients/direction-record");

exports.isLocationOnRoute = async body => {
  const { latLng, route, accuracy, toleranceInMeters } = body;
  return checkLatLngAndRoute(latLng, route, accuracy, toleranceInMeters);
};

exports.checkAllEventWithDirectionRecordById = async body => {
  const { directionRecordId, routes, accuracy, toleranceInMeters } = body;
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

  let checkRoutes, relatedEvents;
  routes ? (checkRoutes = routes) : (checkRoutes = notificationRoutes);
  relatedEvents = events.map(({ id, title, latitude, longitude }) => {
    const eventLatLng = {
      latitude: Number(latitude),
      longitude: Number(longitude)
    };
    const result = this.checkEventIsRelatedToThisRoutes(
      eventLatLng,
      direction.routes,
      checkRoutes,
      accuracy,
      toleranceInMeters
    );
    return {
      id,
      title,
      result
    };
  });
  const filterResult = relatedEvents.filter(item => item.result);
  return {
    directionRecordId,
    directionRecordName: name,
    checkRoutes,
    accuracy,
    toleranceInMeters,
    sum: filterResult.length,
    relatedEvent: filterResult
  };
};

exports.checkEventIsRelatedToThisRoutes = (
  eventLatLng,
  routes,
  routeIndexs,
  accuracy,
  toleranceInMeters
) => {
  const checkRoutes = routeIndexs.map(i => routes[i]);
  const result = checkRoutes.some(({ overview_path }) =>
    overview_path.some(({ lat, lng }) =>
      checkDistanceIsWithinMeters(
        eventLatLng,
        { lat, lng },
        accuracy,
        toleranceInMeters
      )
    )
  );
  return result;
};

const checkLatLngAndRoute = (latLng, route, accuracy, toleranceInMeters) => {
  const result = route.some(path =>
    checkDistanceIsWithinMeters(
      latLng,
      { latitude: path.lat, longitude: path.lng },
      accuracy,
      toleranceInMeters
    )
  );
  return result;
};

const checkDistanceIsWithinMeters = (
  start,
  end,
  accuracy = 1,
  toleranceInMeters = 100
) => {
  // console.log(geolib.getDistance(start, end, accuracy));
  return geolib.getDistance(start, end, accuracy) <= toleranceInMeters;
};
