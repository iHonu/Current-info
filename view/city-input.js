import { getGeocodeByCity } from '../api.js';

export function getCityFromInput() {
  const loader = document.querySelector('.loader');
  const cityInput = document.getElementById('city-input');
  const cityBtn = document.getElementById('city-btn');
  const errorText = document.getElementById('error-text');
  const errorContainer = document.querySelector('.error-container');

  //hide loader
  loader.style.display = 'none';
  cityInput.style.display = 'block';
  cityBtn.style.display = 'block';
  errorText.style.display = 'block';
  errorContainer.style.display = 'flex';

  return new Promise((resolve, reject) => {
    cityBtn.addEventListener('click', async () => {
      const city = cityInput.value.trim();
      if (city === '') {
        errorText.innerHTML = 'Please enter a city name.';
        return;
      } else {
        // Show loader
        loader.style.display = 'flex';
        cityInput.style.display = 'none';
        cityBtn.style.display = 'none';
        errorText.style.display = 'none';
        errorContainer.style.display = 'none';

        try {
          const { lat, lon } = await getGeocodeByCity(city);
          resolve({ lat, lon });
          console.log('llllll9898');
        } catch (error) {
          console.log(error);
          //hide loader
          cityInput.value = '';
          cityInput.style.display = 'block';
          cityBtn.style.display = 'block';
          loader.style.display = 'none';
          errorText.style.display = 'block';
          errorContainer.style.display = 'flex';
          errorText.innerHTML = 'City not found.';
          reject('City not found.');
        }
      }
    });
  });
}
