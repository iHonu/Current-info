import {
  getLocationData,
  getCurrentWeather,
  getRandomQuote,
  getNews,
} from './api.js';
import { date, timeOfTheDay } from './date.js';
import { getHelloWord } from './word-translation.js';
import { displayNews } from '../view//news-page.js';
import { getCityFromInput } from '../view/city-input.js';

getUserLocation()
  .then(({ lat, lon }) => {
    executeCode(lat, lon);
  })
  .catch((error) => {
    getGeolocationManually(error);
  });

async function getGeolocationManually(error) {
  if (error.code === 1) {
    try {
      const { lat, lon } = await askUserLocation();
      executeCode(lat, lon);
    } catch (error) {
      console.log(error);
    }
  }
}

async function askUserLocation() {
  try {
    const { lat, lon } = await getCityFromInput();
    return { lat, lon };
  } catch (error) {
    console.log(error);
    // if the city was not found or any other error try again
    return askUserLocation();
  }
}

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

function populatePage(items) {
  Object.keys(items).forEach((item) => {
    const element = document.getElementById(item);
    if (element) {
      element.innerHTML = items[item];
    }
  });

  document.querySelector('.loader-container').style.display = 'none';

  const mainContainer = document.querySelector('.main-container');
  mainContainer.style.display = 'block';
}
