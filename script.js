// fetchData with Promise

function fetchData(url, method) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.onload = () => {
            if (xhr.status == '200') {
                resolve(xhr.response);
            } else {
                reject(new Error('Error: ' + xhr.status + ' ' + xhr.statusText));
            }
        };
        xhr.onerror = () => {
            reject(new Error('Error: ' + xhr.status + ' ' + xhr.statusText));
        };

        xhr.send();
    });

    return promise;
}

// fast selctor function

function $(selector) {
    return document.querySelector(selector);
}

// convert to Cels function

function convertToCels(kelv) {
    return Math.round(kelv - 273.15);
}

// define wind direction function

function defineWindDirection(num) {
    let result = '';
    if (num > 315 || num < 45) {
        result = 'NORTH';
    } else if (num < 135) {
        result = 'EAST';
    } else if (num < 225) {
        result = 'SOUTH';
    } else {
        esult = 'WEST'
    }

    return result;
}

// date formating function

function formatDate(date) {
    const monthStr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const result = date.getDate() + ' ' + monthStr[date.getMonth()] + ' ' + date.getHours() + ':0' + date.getMinutes();
    return result;
}

const key = '03fb54ebf904aeecf7fbb0e169f0c7ad';
const urlWether = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=${key}`;
const urlWether5 = `https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=${key}`;

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

fetchData(urlWether, 'GET')
    .then(res => {
        const data = JSON.parse(res);
        const weather = new Weather(data);
        weather.render();
    });

fetchData(urlWether5, 'GET')
    .then(res => {
        const data = JSON.parse(res);
        data.list.forEach((element, index) => {
            if (index % 8 === 0) {
                const futureWeather = new FutureWeather(element);
                futureWeather.render();
            };
        });
    });






