/*
  A simple clock which renders the current time and date in a digital format.
  Callback should be used to update your UI.
*/
import clock from "clock";
import { preferences } from "user-settings";

import { days, months, monthsShort } from "./locales/en.js";
import * as util from "./utils";

let dateFormat, clockCallback;

export function initialize(granularity, dateFormatString, callback) {
  dateFormat = dateFormatString;
  clock.granularity = granularity;
  clockCallback = callback;
  clock.addEventListener("tick", tickHandler);
}

function tickHandler(evt) {
  let today = evt.date;
  let dayName = days[today.getDay()];
  let month = util.zeroPad(today.getMonth() + 1);
  let monthName = months[today.getMonth()];
  let monthNameShort = monthsShort[today.getMonth()];
  let dayNumber = util.zeroPad(today.getDate());

  let hours = today.getHours();
  hours = util.zeroPad(hours % 12) || 12;
  let mins = ' ' + util.zeroPad(today.getMinutes());

  let hour = hours;
  let min = mins;
  let dateString = today;

  switch(dateFormat) {
    case "shortDate":
      dateString = `${dayNumber} ${monthNameShort}`;
      break;
    case "mediumDate":
      dateString = `${dayNumber} ${monthName}`;
      break;
    case "longDate":
      dateString = `${dayName} ${monthName} ${dayNumber}`;
      break;
  }
  clockCallback({hour: hour, min: min, date: dateString});
}
