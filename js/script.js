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

export function $(selector) {
    return document.querySelector(selector);
}


// convert to Cels function

export function convertToCels(kelv) {
    return Math.round(kelv - 273.15);
}

// define wind direction function

export function defineWindDirection(num) {
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

export function formatDate(date) {
    const monthStr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const result = date.getDate() + ' ' + monthStr[date.getMonth()] + ' ' + date.getHours() + ':0' + date.getMinutes();
    return result;
}

const key = '03fb54ebf904aeecf7fbb0e169f0c7ad';
const urlWether = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=${key}`;
const urlWether5 = `https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=${key}`;

import { Weather } from './today-weather.js';
import { FutureWeather } from './future-weather.js';

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






