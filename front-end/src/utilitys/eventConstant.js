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
  { value: "carbreakdown", label: "รถเสีย", type: 1 },
  { value: "construction", label: "ก่อสร้าง", type: 2 },
  { value: "accident", label: "อุบัติเหตุ", type: 3 },
  { value: "rain", label: "ฝนตก", type: 5 },
  { value: "flood", label: "น้ำท่วม", type: 6 },
  { value: "demonstration", label: "สาธิต", type: 7 },
  { value: "information", label: "ประกาศข่าว", type: 8 },
  { value: "checkpoint", label: "ด่านตรวจ", type: 9 },
  { value: "trafficjam", label: "การจราจรติดขัด", type: 10 },
  { value: "misc", label: "เบ็ดเตล็ด", type: 11 },
  { value: "warning", label: "ประกาศเตือน", type: 12 },
  { value: "event", label: "กิจกรรม-เทศกาล", type: 13 },
  { value: "sale", label: "ลดราคา", type: 14 },
  { value: "fire", label: "ไฟไหม้", type: 15 },
  { value: "complaint", label: "ร้องเรียน", type: 16 }
];

function selectIcon(event) {
  let icon = "";
  switch (event.type) {
    case 1:
      icon =
        "https://follroad-bucket.s3-ap-southeast-1.amazonaws.com/carbreakdown2.png";
      break;
    case 2:
      icon =
        "https://follroad-bucket.s3-ap-southeast-1.amazonaws.com/excavator.png";
      break;
    case 3:
      icon =
        "https://follroad-bucket.s3-ap-southeast-1.amazonaws.com/accident2.png";
      break;
    case 5:
      icon =
        "https://follroad-bucket.s3-ap-southeast-1.amazonaws.com/rain2.png";
      break;
    case 6:
      icon =
        "https://follroad-bucket.s3-ap-southeast-1.amazonaws.com/flood.png";
      break;
    case 7:
      icon =
        "https://follroad-bucket.s3-ap-southeast-1.amazonaws.com/demonstration.png";
      break;
    case 8:
      icon =
        "https://follroad-bucket.s3-ap-southeast-1.amazonaws.com/information.png";
      break;
    case 9:
      icon =
        "https://follroad-bucket.s3-ap-southeast-1.amazonaws.com/checkpoint.png";
      break;
    case 10:
      icon =
        "https://follroad-bucket.s3-ap-southeast-1.amazonaws.com/traffic+jam.png";
      break;
    case 11:
      icon =
        "https://follroad-bucket.s3-ap-southeast-1.amazonaws.com/miscellaneous2.png";
      break;
    case 12:
      icon =
        "https://follroad-bucket.s3-ap-southeast-1.amazonaws.com/warning.png";
      break;
    case 13:
      icon =
        "https://follroad-bucket.s3-ap-southeast-1.amazonaws.com/event.png";
      break;
    case 14:
      icon = "https://follroad-bucket.s3-ap-southeast-1.amazonaws.com/sale.png";
      break;
    case 15:
      icon = "https://follroad-bucket.s3-ap-southeast-1.amazonaws.com/fire.png";
      break;
    case 16:
      icon =
        "https://follroad-bucket.s3-ap-southeast-1.amazonaws.com/complaint.png";
      break;
  }
  return icon;
}

export default {
  EVENT_CATEGORY,
  EVENT_CATEGORY_OBJECT,
  selectIcon
};
