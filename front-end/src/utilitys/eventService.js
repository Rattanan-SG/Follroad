const EVENT_CATEGORY = [
  "carbreakdown",
  "construction",
  "accident",
  "rain",
  "flood",
  "demonstration",
  "information",
  "checkpoint",
  "trafficjam",
  "miscellaneous",
  "warning",
  "event",
  "sale",
  "fire"
];

const EVENT_CATEGORY_OBJECT = [
  { value: "carbreakdown", label: "รถเสีย" },
  { value: "construction", label: "ก่อสร้าง" },
  { value: "accident", label: "อุบัติเหตุ" },
  { value: "rain", label: "ฝนตก" },
  { value: "flood", label: "น้ำท่วม" },
  { value: "demonstration", label: "สาธิต" },
  { value: "information", label: "ประกาศข่าว" },
  { value: "checkpoint", label: "ด่านตรวจ" },
  { value: "trafficjam", label: "การจราจรติดขัด" },
  { value: "miscellaneous", label: "เบ็ดเตล็ด" },
  { value: "warning", label: "ประกาศเตือน" },
  { value: "event", label: "กิจกรรม-เทศกาล" },
  { value: "sale", label: "ลดราคา" },
  { value: "fire", label: "ไฟไหม้" }
];

function selectIcon(event) {
  let icon = "";
  switch (event.icon) {
    case EVENT_CATEGORY[0]:
      icon =
        "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/carbreakdown.png";
      break;
    case EVENT_CATEGORY[1]:
      icon =
        "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/construction.png";
      break;
    case EVENT_CATEGORY[2]:
      icon =
        "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/accident.png";
      break;
    case EVENT_CATEGORY[3]:
      icon = "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/rain.png";
      break;
    case EVENT_CATEGORY[4]:
      icon =
        "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/flood.png";
      break;
    case EVENT_CATEGORY[5]:
      icon =
        "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/demonstration.png";
      break;
    case EVENT_CATEGORY[6]:
      icon =
        "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/information.png";
      break;
    case EVENT_CATEGORY[7]:
      icon =
        "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/checkpoint.png";
      break;
    case EVENT_CATEGORY[8]:
      icon =
        "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/traffic+jam.png";
      break;
    case EVENT_CATEGORY[9]:
      icon = "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/fire.png";
      break;
    case EVENT_CATEGORY[10]:
      icon =
        "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/warning.png";
      break;
    case EVENT_CATEGORY[11]:
      icon =
        "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/event.png";
      break;
    case EVENT_CATEGORY[12]:
      icon = "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/sale.png";
      break;
    case EVENT_CATEGORY[13]:
      icon = "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/fire.png";
      break;
  }
  return icon;
}

function eventPaginate(events, pageSize, pageNumber) {
  return events.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
}

export default {
  EVENT_CATEGORY,
  EVENT_CATEGORY_OBJECT,
  selectIcon,
  eventPaginate
};
