import _ from "lodash";
import fs from "fs";

const dateEnum = {
  "Sun": "Sunday",
  "Mon": "Monday",
  "Tue": "Tuesday",
  "Wed": "Wednesday",
  "Thu": "Thursday",
  "Fri": "Friday",
  "Sat": "Saturday",
}

const dateEnumArr = [
  "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
]

const generateHours = (string) => {
  const hours = string.split("-");

  const format24hour = (hour) => {
    const split = hour.split(":");
    let h = split[0];
    let m = "00";
    if(split.length > 1) {
      m = split[1].replace("am", "").replace("pm", "");
    }
    const count = (hour.match(/pm/g) || []).length;
    if(count > 0) {
      h = String(parseInt(h, 10) + 12)
    }
    return h+":"+m
  }
  return {
    start: format24hour(hours[0]),
    end: format24hour(hours[1])
  }
}

const generateDayDuration = (string) => {
  const opening = {};
  const days = string.split("-");

  const from = dateEnumArr.findIndex(element => element === days[0]);
  const to = dateEnumArr.findIndex(element => element === days[1]);

  // IF til Sunday
  if(to === 0) {
    for(let i=from; i<=dateEnumArr.length-1; i++) {
      const simple = dateEnumArr[i];
      opening[dateEnum[simple]]={start: null, end: null}
    }
    opening[dateEnum[dateEnumArr[0]]]={start: null, end: null}
  } else {
    for(let i=from; i<=to; i++) {
      const simple = dateEnumArr[i];
      opening[dateEnum[simple]]={start: null, end: null}
    }
  }
  
  return opening
}

const formatOpening = (openingArr) => {
  let opening = {};

  const test = (str) => {
    let string = str
    let untilDuration = {};
    let addition = {};
    // Check Until
    const count = (string.match(/-/g) || []).length;
    if(count > 1) {
      const dashIndex = string.indexOf("-");
      let countText = "";
      for(let i=-3; i <= 3; i++) {
        countText = countText + string[dashIndex + i];
      }
      untilDuration = generateDayDuration(countText);
      string = string.replace(countText, "");
    }
    // Check Comma
    const comma = (string.match(/,/g) || []).length;
    if(comma > 0) {
      const commaIndex = string.indexOf(",");
      let commaText = "";
      for(let i=commaIndex+1; i <= 3; i++) {
        commaText = commaText + string[i];
      }
      addition[dateEnum[commaText]] = {start: null, end: null};
      string = string.replace("," + commaText, "");
    }
    // Get Hours
    const hours = generateHours(string);
    Object.keys(untilDuration).forEach(key => {
      untilDuration[key].start = hours.start;
      untilDuration[key].end = hours.end;
    })
    Object.keys(addition).forEach(key => {
      addition[key].start = hours.start;
      addition[key].end = hours.end;
    })
    opening = {...opening, ...untilDuration, ...addition}
  }

  openingArr.forEach(string => test(string));

  return opening
}

let data

fs.readFile("./data/data.json", (err, res) => {
  if (err) throw err;
  data = JSON.parse(JSON.stringify(res));
});

const raw = _.take(data, 100);
const formatted = raw.map(restaurant => {
  const opening = formatOpening(restaurant.opening
    .replace(/ /g, "")
    .replace(/Tues/g, "Tue")
    .replace(/Weds/g, "Wed")
    .replace(/Thurs/g, "Thu")
    .split("/")
  );

  return {...restaurant, opening}
});

fs.writeFile("./formatted.json", JSON.stringify(formatted), (err) => {
  if (err)
    console.log(err);
  else {
    console.log("File written successfully\n");
  }
});