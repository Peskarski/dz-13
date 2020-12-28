import { $ } from './script.js';
import { convertToCels } from './script.js';
import { formatDate } from './script.js';

// class for future weather info

class FutureWeather {
    constructor(data) {
        this.date = formatDate(new Date(data.dt * 1000));
        this.temp = data.main.temp;
        this.weatherIcon = data.weather[0].icon;
    }

    render() {
        const futureInfo = document.createElement('div');
        futureInfo.classList.add('future-weather');

        const futureDate = document.createElement('p');
        futureDate.textContent = this.date;
        futureInfo.append(futureDate);

        const futureWeatherIcon = document.createElement('img');
        futureWeatherIcon.src = `http://openweathermap.org/img/wn/${this.weatherIcon}@2x.png`;
        futureInfo.append(futureWeatherIcon);

        const futureWeather = document.createElement('p');
        futureWeather.textContent = convertToCels(this.temp) + ' °C';
        futureInfo.append(futureWeather);

        $('.future-days').append(futureInfo);
    }
}

export { FutureWeather };