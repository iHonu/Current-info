// Use location API
export async function getLocationData(lat, lon) {
  try {
    const reverseGeocodeURL = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&language=en&key=df34329c5e9c4776a759743fc9b20df1`;
    const response = await fetch(reverseGeocodeURL);
    const data = await response.json();

    // Handle when location is not a city
    const components = data.results[0].components;
    const keys = ['city', 'town', 'village', 'state'];
    const locationKey = keys.find((key) => components[key]);

    const locationName = components[locationKey];
    const countryFlag = data.results[0].annotations.flag;
    const countryCode = components.country_code;

    return {
      location: locationName,
      locationType: locationKey,
      flag: countryFlag,
      countryCode: countryCode,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Unable to get location data');
  }
}

// Use weather API
export async function getCurrentWeather(lat, lon) {
  try {
    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0090cc931da4498541f43037147ec092&units=metric`;
    const response = await fetch(weatherURL);
    const data = await response.json();

    const currentTemperature = Math.round(data.main.temp);
    const weatherDescription = data.weather[0].description;

    return { temperature: currentTemperature, description: weatherDescription };
  } catch (error) {
    console.log(error);
    throw new Error('Unable to get weather data');
  }
}

// Use quote API
export async function getRandomQuote() {
  try {
    const quoteURL = `https://api.quotable.io/quotes/random?tags=famous-quotes`;
    const response = await fetch(quoteURL);
    const data = await response.json();
    return {
      quote: data[0].content,
      author: data[0].author,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Unable to get quote data');
  }
}

export async function getNews(countryCode) {
  try {
    const newsURL = `https://gnews.io/api/v4/top-headlines?country=${countryCode}&token=97b5d70d080437306ded051f410d743c`;
    const response = await fetch(newsURL);
    const data = await response.json();
    const newsItems = data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      // image: article.image,
      link: article.url,
    }));
    return newsItems;
  } catch (error) {
    console.log(error);
    throw new Error('Unable to get news data');
  }
}

//Error: Convert city name to lat and lon
export async function getGeocodeByCity(city) {
  try {
    const geocodeCityURL = `https://api.opencagedata.com/geocode/v1/json?q=${city}&language=en&key=df34329c5e9c4776a759743fc9b20df1`;
    const response = await fetch(geocodeCityURL);
    const data = await response.json();
    return {
      lat: data.results[0].geometry.lat,
      lon: data.results[0].geometry.lng,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Unable to get geocode data');
  }
}
