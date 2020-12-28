import { $ } from './script.js';
import { convertToCels } from './script.js';
import { defineWindDirection } from './script.js';

// class for today weather info

class Weather {
    constructor(data) {
        this.city = data.name;
        this.state = data.sys.country;
        this.temp = data.main.temp;
        this.tempFeelsLike = data.main.feels_like;
        this.time = new Date(data.dt * 1000).getHours() + ':' + new Date(data.dt * 1000).getMinutes();
        this.windDeg = data.wind.deg;
        this.windSpeed = data.wind.speed;
        this.weatherIcon = data.weather[0].icon;
    }

    render() {
        $('#city').textContent = this.city + ', ' + this.state;
        $('#time').innerHTML += this.time;

        $('#weatherIcon').src = `http://openweathermap.org/img/wn/${this.weatherIcon}@2x.png`;
        $('#temp').textContent = convertToCels(this.temp) + ' ' + $('#temp').textContent;
        $('#feelsLike').textContent = 'Feels like ' + Math.round(convertToCels(this.tempFeelsLike)) + ' ' + $('#feelsLike').textContent;

        $('#windDirection').innerHTML += defineWindDirection(this.windDeg);
        $('#windSpeed').innerHTML += this.windSpeed + ' m/s';
    }
}

export { Weather };