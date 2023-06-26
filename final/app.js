/* Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

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
 */

 
const btn = document.getElementById('btn');
const resultBlock = document.querySelector('.result');

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

// button on click async event
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
    } else {
        resultBlock.innerHTML = `<p>Номер страницы и лимит вне диапазона от 1 до 10</p>`
        console.log('Выполнен запрос!')
    }
})

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

function saveImagesToLocalStorage(images){
    localStorage.setItem('images', JSON.stringify(images)); // append items for saving
}