const EVENT_CATEGORY = {
  CARBREAKDOWN: "carbreakdown",
  CONSTRUCTION: "construction",
  ACCIDENT: "accident",
  RAIN: "rain",
  FLOOD: "flood",
  DEMONSTRATION: "demonstration",
  INFORMATION: "information",
  CHECKPOINT: "checkpoint",
  TRAFFICJAM: "trafficjam",
  MISC: "misc",
  WARNING: "warning",
  EVENT: "event",
  SALE: "sale",
  FIRE: "fire",
  COMPLAINT: "complaint"
};

const EVENT_SOURCE = {
  FOLLROAD: "follroad",
  ITIC: "itic"
};

const EVENT_MAPPING = [
  { icon: "carbreakdown", type: "1", defaultDuration: { hours: 2 } },
  { icon: "construction", type: "2", defaultDuration: { days: 2 } },
  { icon: "accident", type: "3", defaultDuration: { hours: 2 } },
  { icon: "rain", type: "5", defaultDuration: { hours: 2 } },
  { icon: "flood", type: "6", defaultDuration: { hours: 2 } },
  { icon: "demonstration", type: "7", defaultDuration: { hours: 2 } },
  { icon: "information", type: "8", defaultDuration: { days: 2 } },
  { icon: "checkpoint", type: "9", defaultDuration: { hours: 2 } },
  { icon: "trafficjam", type: "10", defaultDuration: { hours: 2 } },
  { icon: "misc", type: "11", defaultDuration: { hours: 2 } },
  { icon: "warning", type: "12", defaultDuration: { hours: 2 } },
  { icon: "event", type: "13", defaultDuration: { days: 2 } },
  { icon: "sale", type: "14", defaultDuration: { hours: 2 } },
  { icon: "fire", type: "15", defaultDuration: { hours: 2 } },
  { icon: "complaint", type: "16", defaultDuration: { days: 2 } }
];

module.exports = {
  EVENT_CATEGORY,
  EVENT_SOURCE,
  EVENT_MAPPING
};
