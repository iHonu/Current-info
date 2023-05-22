# API-Project

[DEMO](https://ihonu.github.io/API-Project/)

(./screenshots/Desktop-1.svg)

This project demonstrates the capabilities of asynchronous code and APIs to provide users with personalized information. The website begins by fetching location data and utilizes various APIs to deliver a tailored experience. By utilizing the user's location, it offers real-time weather updates, details about the user's city, country information, and current date and time.

In the event that users deny access to their location, the website offers an alternative solution. Users can manually input their city name, and the application seamlessly converts it to latitude and longitude coordinates, ensuring a smooth continuation of the functionality.

## APIs used

- **Location API:** Retrieves the location data based on latitude and longitude coordinates using the OpenCageData API. It returns the location name, location type, and country code.
- **Weather API:** Fetches the current weather data based on latitude and longitude coordinates using the OpenWeatherMap API. It provides the current temperature and weather description in Celsius.
- **Quote API:** Retrieves a random famous quote using the Quotable API. It returns the quote content and author.
- **News API:** Fetches top headlines news articles based on the provided country code using the GNews API. It returns an array of news items, including the title, description, and link to each article.
