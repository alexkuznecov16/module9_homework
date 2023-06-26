# module9_homework

## Exercise 2
# Условие
Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать JSON в JS-объект и выводить его в консоль.

# Solution
Я создал в`JS__ переменную, которая содержит __JSON__.
```
const jsonFile = `
{
  "list": [
   {
    "name": "Petr",
    "age": "20",
    "prof": "mechanic"
   },
   {
    "name": "Vova",
    "age": "60",
    "prof": "pilot"
   }
  ]
 }`
```
Затем я `parse` __JSON__ и сделал __JS объект__.
```
const jsonFile = `
{
  "list": [
   {
    "name": "Petr",
    "age": "20",
    "prof": "mechanic"
   },
   {
    "name": "Vova",
    "age": "60",
    "prof": "pilot"
   }
  ]
 }`
let obj = JSON.parse(jsonFile)
console.log(obj)
console.log(typeof obj) // object
```


# Exercise 3
# Условие
Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

        Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
        Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.

Пример. Если пользователь ввёл 5, то запрос будет вида: https://picsum.photos/v2/list?limit=5.

После получения данных вывести ниже картинки на экран.

# Solution
Создал функцию с названием __request__, внутри неё я сразу получил переменные для работы, такие как число и блок результата (куда будут выводиться картинки в HTML). После переменных я создал проверку на число. Если число попадает в диапазон от 1 до 10, то мы создаём новый xhr xml запрос и открываем ссылку с картинками (к ссылке с картинками будет добавлять число в конце, это до какой картинки означает). Дальше при загрузке мы проверяем, если статус рабочий то создаём __result__ в котором хранится объект __JS__ со всеми картинками, далее мы проводим цикл для добавления картинок с определенным индексом и ссылкой и всё это с помощью `appendChild` добавляем в блок __resultDiv__. Если статус не рабочий то выводим ошибку. Далее мы проводим такие функции, как __onprogress__ - которая выведет в консоль прогресс и __onerror__ - выведет ошибку если не рабочая ссылка на картинки например. `send()` - отправляет запрос. Далее если число введенное пользователем не в диапазоне то выводится ошибка. И в конце всего это за пределами функции __request__ создаём событие при нажатии на кнопку отправки числа. При нажатии будет вызываться функция __request__.
```
function request(){
    // variables
    let numberValue = document.getElementById('numberInput').value;
    let number = parseInt(numberValue); // string to number
    let resultDiv = document.getElementById('result');

    // value checking
    if (number >= 1 && number <= 10){
        const xhr = new XMLHttpRequest(); // new request create
        xhr.open('GET', 'https://picsum.photos/v2/list?limit=' + number, true); // open with get request a picsum photos

        // On loading function
        xhr.onload = () => {
            // status checking
            if(xhr.status >= 200 && xhr.status < 400){
                let result = JSON.parse(xhr.responseText); // change json to js

                // for (cycle || loop)
                for(let i = 0; i < number; i++){
                    let image = document.createElement('img'); // new element create
                    image.src = result[i].download_url; // get source for every image
                    resultDiv.appendChild(image); // add image to html block
                }
            } else{
                resultDiv.innerText = 'Ошибка' // error
            }
        }

        // On progress function
        xhr.onprogress = (event) => {
            console.log(`Загружено: ${event.loaded} из ${event.total}`)
        }

        // On error function
        xhr.onerror = () => {
            resultDiv.innerText = `Ошибка при загрузке картинок, Status: ${xhr.status}`;
        };

        xhr.send(); // request send
    } else {
        resultDiv.innerText = 'Число должно быть в диапазоне от 1 до 10'
    }
}

// Event on click to submit button
document.getElementById('numberSubmit').addEventListener('click', request);
```


# Exercise 4
# Условие
Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

        Заголовок первого input — «номер страницы».
        Заголовок второго input — «лимит».
        Заголовок кнопки — «запрос».

При клике на кнопку происходит следующее:

        Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
        Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
        Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
        Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.

Пример. Если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.

После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).

# Solution
# Variables
Создал 2 основные переменные для работы с приложением.
```
const btn = document.getElementById('btn');
const resultBlock = document.querySelector('.result');
```

# Button on click event
При нажатии на кнопку будет асинхронная работа с __event__. Получаем данные из __input__ и переводим их в числа из строк. Далее проверяем оба числа на корректность, если оба числа в диапазоне от 1 до 10 то в блоке `resultBlock` (в котором буду выводиться картинки) создаётся пустая строка для перезагрузки картинок и вызываем функцию `makeRequest()`, которая будет делать запрос. Если числа вне диапазона то будут выдаваться определенные ошибки в блоке.
```
btn.addEventListener('click', async() => {
    // variables area
    pageInput = document.getElementById('input-page').value;
    limitInput = document.getElementById('input-limit').value;
    pageValue = parseInt(pageInput);
    limitValue = parseInt(limitInput);

    // numbers check
    if (pageValue >= 1 && pageValue <= 10 && limitValue >= 1 && limitValue <= 10){
        resultBlock.innerHTML = ''; // after new request we will remove all images and get new
        const result = await makeRequest(); // make request
        console.log(result);
    } else if (pageValue < 1 || pageValue > 10) {
        resultBlock.innerHTML = `<p>Номер страницы вне диапазона от 1 до 10</p>`
        console.log('Выполнен запрос!')
    } else if (limitValue < 1 || limitValue > 10) {
        resultBlock.innerHTML = `<p>Лимит вне диапазона от 1 до 10</p>`
        console.log('Выполнен запрос!')
    } else{
        resultBlock.innerHTML = `<p>Номер страницы и лимит вне диапазона от 1 до 10</p>`
        console.log('Выполнен запрос!')
    }
})
```


# fetch request
В этой функции я использовал другую ссылку на картинки потому что она не работала, в итоге мне ментор прислал другую ссылку.
При получении обоих цифр мы создаём пустой массив __images__, далее с помощью цикла `for` мы получаем, а потом добавляем каждую ссылку картинки в массив __images__ и выводим их всех добавляя в блок `resultBlock`. После добавления картинок по тз мы вызвали функцию, которая принимает все картинки выбранные пользователем, ниже покажу как я их сохранил.
```
const makeRequest = () => {
    return fetch(`https://picsum.photos/v2/list?page=${pageValue}&limit=${limitValue}`)
        .then((response) => {
            console.log(`Response: ${response}`)
            return response.json();
        })
        .then((data) => {
            const images = [];
            for (let i = 0; i < limitValue; i++) {
                const imageUrl = data[i].download_url; // get url for images
                images.push(imageUrl); // append new images
                resultBlock.innerHTML += `<img width="200px" height="200px" src="${imageUrl}" alt="image">`;
            }
            saveImagesToLocalStorage(images);
        })
        .catch((error) => {
            console.log(`error: ${error}`);
        })
}
```

# images saving
После добавления картинок в массив мы вызываем функцию `saveImagesToLocalStorage`, которая принимает все картинки. Внутри неё мы с помощью __localStorage__ добавляем ссылки картинок и преобразуем их в строки. Выше написан __event__, который после перезагрузки создаёт переменную __savedImages__, которая парсит JSON-строку и получает ссылки на все картинки. Далее если массив имеет хотя-бы 1 ссылку на картинку то перебираем массив и добавляем картинки на сайт.
```
// on refresh of page close event
document.addEventListener('DOMContentLoaded', () => {
    const savedImages = JSON.parse(localStorage.getItem('images')); // get saved images
    if (savedImages.length > 0 && savedImages.length > 0) {
        // iterate every images url
        for (const download_url of savedImages) {
            resultBlock.innerHTML += `<img width="200px" height="200px" src="${download_url}" alt="image">`;
        }
    }
});


function saveImagesToLocalStorage(images){
    localStorage.setItem('images', JSON.stringify(images)); // append items for saving
}
```