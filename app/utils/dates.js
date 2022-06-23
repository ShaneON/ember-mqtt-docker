export default function getHours(alertFrom, alertTo) {
  let startTime = new Date(alertFrom).getTime();
  let endTime;
  let millis;
  if (alertTo) {
    endTime = new Date(alertTo).getTime();
    millis = endTime - startTime;
  } else {
    millis = new Date().getTime() - startTime;
  }
  return Math.round((millis / 1000 / 60 / 60) * 100) / 100;
}
