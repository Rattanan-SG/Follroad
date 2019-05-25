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
  "misc",
  "warning",
  "event",
  "sale",
  "fire",
  "complaint"
];

const EVENT_CATEGORY_OBJECT = [
  { value: "carbreakdown", label: "รถเสีย", type: "1" },
  { value: "construction", label: "ก่อสร้าง", type: "2" },
  { value: "accident", label: "อุบัติเหตุ", type: "3" },
  { value: "rain", label: "ฝนตก", type: "5" },
  { value: "flood", label: "น้ำท่วม", type: "6" },
  { value: "demonstration", label: "สาธิต", type: "7" },
  { value: "information", label: "ประกาศข่าว", type: "8" },
  { value: "checkpoint", label: "ด่านตรวจ", type: "9" },
  { value: "trafficjam", label: "การจราจรติดขัด", type: "10" },
  { value: "misc", label: "เบ็ดเตล็ด", type: "11" },
  { value: "warning", label: "ประกาศเตือน", type: "12" },
  { value: "event", label: "กิจกรรม-เทศกาล", type: "13" },
  { value: "sale", label: "ลดราคา", type: "14" },
  { value: "fire", label: "ไฟไหม้", type: "15" },
  { value: "complaint", label: "ร้องเรียน", type: "16" }
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
      icon =
        "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/miscellaneous.png";
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
    case EVENT_CATEGORY[14]:
      icon =
        "https://s3-ap-southeast-1.amazonaws.com/follroad-bucket/complaint.png";
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
