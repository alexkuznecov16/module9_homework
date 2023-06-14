/* Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

        Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
        Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.

Пример. Если пользователь ввёл 5, то запрос будет вида: https://picsum.photos/v2/list?limit=5.

После получения данных вывести ниже картинки на экран. */


// function which make request
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