# module9_homework

## Exercise 2
# Условие
Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать JSON в JS-объект и выводить его в консоль.

# Solution
Я создал в __JS__ переменную, которая содержит __JSON__.
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