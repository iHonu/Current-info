import {
  getLocationData,
  getCurrentWeather,
  getRandomQuote,
  getNews,
} from './api.js';
import { date, timeOfTheDay } from './date.js';
import { getHelloWord } from './word-translation.js';
import { displayNews } from './view//news-page.js';
import { getCityFromInput } from './view/city-input.js';

// Get the location of the user if everything is ok
function getUserLocation() {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
      );
    } else {
      reject('Geolocation is not supported by this browser.');
    }
  });
}

// Execute the code after getting the location
async function executeCode(lat, lon) {
  try {
    const { location, locationType, countryCode } = await getLocationData(
      lat,
      lon,
    );
    const [{ temperature, description }, { author, quote }, helloWord] =
      await Promise.all([
        getCurrentWeather(lat, lon),
        getRandomQuote(),
        getHelloWord(countryCode),
      ]);

    const items = {
      hello: helloWord,
      location: location,
      locationType: locationType,
      temperature: temperature,
      description: description,
      countryCode: countryCode,
      author: author,
      quote: quote,
      date: date,
      time: timeOfTheDay,
    };

    const newsItems = await getNews(items.countryCode);
    populatePage(items);
    displayNews(newsItems);
  } catch (error) {
    console.log(error);
    const items = {
      hello: 'Hello',
      location: 'Earth',
      locationType: 'country',
      temperature: '0',
      description: 'nothing',
      countryCode: 'en',
      author: 'Uncle Ben',
      quote: 'With great power comes great responsibility.',
      date: date,
      time: timeOfTheDay,
    };
    populatePage(items);
  }
}

// Populate the page with the data
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
  mainContainer.style.display = 'block';
}

// Handle the error when the user doesn't allow the location
function handleGeolocationError(error) {
  if (error.code === 1) {
    getCityFromInput()
      .then(({ lat, lon }) => {
        executeCode(lat, lon);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

// Find a way to get the location of the user
getUserLocation()
  .then(({ lat, lon }) => {
    executeCode(lat, lon);
  })
  .catch((error) => {
    handleGeolocationError(error);
  });
