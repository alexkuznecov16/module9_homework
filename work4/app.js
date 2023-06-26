/* Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число.

При клике на кнопку происходит следующее:

        Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
        Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
*/


const btn = document.getElementById('btn');;
const resultBlock = document.querySelector('.result')

btn.addEventListener('click', async () => {
    const widthInput = document.getElementById('input-width').value;
    const heightInput = document.getElementById('input-height').value;

    widthValue = parseInt(widthInput);
    heightValue = parseInt(heightInput);
    if ((widthValue >= 100 && widthValue <= 300) && (heightValue >= 100 && heightValue <= 300)){
        const result = await imgRequest()
        console.log(result);
    } else {
        resultBlock.innerHTML = `<p>Одно из чисел вне диапазона от 100 до 300</p>`
        console.log('Выполнен запрос!')
    }
})

const imgRequest = () => {
    return fetch('https://picsum.photos/v2/list?limit=')
    
        .then((response) => {
            console.log(`Response: ${response}`)
            return response.json();
        })
        .then((data) => {
            let randomNum = Math.floor(Math.random() * 30); // random num 0 - 29
            console.log(data)
            let randomImg = data[randomNum].download_url
            console.log(randomImg)
            resultBlock.innerHTML = `<img width="${widthValue}" height="${heightValue}" src="${randomImg}" alt="image">`
        })
        .catch(() => {
            console.log('error');
        })
}