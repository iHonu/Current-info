//Get current date
const currentDate = new Date();
const options = { weekday: 'long', day: 'numeric', month: 'long' };
export const date = currentDate.toLocaleDateString('en-US', options);

//Get current time
export let timeOfTheDay;

function getTimeOfTheDay() {
  const currentHour = currentDate.getHours();
  switch (true) {
    case currentHour >= 5 && currentHour < 12:
      timeOfTheDay = 'morning';
      break;
    case currentHour >= 12 && currentHour < 17:
      timeOfTheDay = 'afternoon';
      break;
    case currentHour >= 17 && currentHour < 22:
      timeOfTheDay = 'evening';
      break;
    case currentHour >= 22 || currentHour < 5:
      timeOfTheDay = 'night';
      break;
    default:
      'day';
  }
}

getTimeOfTheDay();
