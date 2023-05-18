import { getLocationData, getCurrentWeather } from './api.js';
import { getRandomQuote } from './api.js';
import { date, timeOfTheDay } from './date.js';
import { getHelloWord } from './word-translation.js';

// Get the location of the user
function getUserLocation() {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      }, reject);
    } else {
      reject('Geolocation is not supported by this browser.');
    }
  });
}

getUserLocation()
  .then(async ({ lat, lon }) => {
    try {
      const { location, locationType, flag, countryCode } =
        await getLocationData(lat, lon);
      const [{ temperature, description }, { author, quote }, helloWord] =
        await Promise.all([
          getCurrentWeather(lat, lon),
          getRandomQuote(),
          getHelloWord(countryCode),
        ]);

      return {
        hello: helloWord,
        location: location,
        locationType: locationType,
        flag: flag,
        temperature: temperature,
        description: description,
        countryCode: countryCode,
        author: author,
        quote: quote,
        date: date,
        time: timeOfTheDay,
      };
    } catch (error) {
      console.log(error);
      return {
        hello: 'Hello',
        location: 'Earth',
        locationType: 'country',
        flag: '🌍',
        temperature: '0',
        description: 'nothing',
        countryCode: 'en',
        author: 'Uncle Ben',
        quote: 'With great power comes great responsibility.',
      };
    }
  })
  .then((items) => {
    populatePage(items);
  })
  .catch((error) => {
    console.log(error);
  });

function populatePage(items) {
  Object.keys(items).forEach((item) => {
    const element = document.getElementById(item);
    if (element) {
      element.innerHTML = items[item];
    }
  });

  document.querySelector('.loader-container').style.display = 'none';
  // Show the main container
  const mainContainer = document.querySelector('.main-container');
  mainContainer.style.display = 'flex';
}
