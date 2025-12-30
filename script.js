// Створення констант та пошук елементів  
let isRuning = false;
let clearintervalId;
let timeSeconds = Number(localStorage.getItem('timeSeconds')) || 0;  
let timeMinutes = Number(localStorage.getItem('timeMinutes')) || 0;
const texth1 = document.querySelector('.timer');  
const cont = document.querySelector('.btns');
        
// Медіа файли
const offSound = new Audio('off-btn.mp3');
const tickSound = new Audio('tick-timer.mp3');

// -------------Функції таймера-------------
const updateTimermessage = () => {
    texth1.textContent = `${timeMinutes}m ${timeSeconds}s`
};
        
updateTimermessage()
        
function saveTime() {
    localStorage.setItem('timeSeconds', timeSeconds)
    localStorage.setItem('timeMinutes', timeMinutes)
}
        
function play(sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
}

function startTimer() {
    if (!isRuning) {
        isRuning = true;
        clearintervalId = setInterval(function () {
        timeSeconds++;
            if (timeSeconds >= 60) {
                timeSeconds = 0;
                timeMinutes++;
            }
            texth1.style.animationIterationCount = "infinite"
            updateTimermessage();
            saveTime();
            play(tickSound)
        }, 1000);
        play(offSound);
    }
}

function resetTimer() {
    if (isRuning) {
        clearInterval(clearintervalId)
        isRuning = false
    }
    play(offSound)
    timeSeconds = 0;
    timeMinutes = 0;
    updateTimermessage()
    saveTime()
    texth1.style.animationIterationCount = 0
}
        
function pauseTimer() {
    if (isRuning == true) {
        clearInterval(clearintervalId)
        isRuning = false;
    }
    texth1.style.animationIterationCount = 0
    play(offSound)
}

// ---створення елементів (кнопки)----
let btnres = '<button id="butn-reset">Reset</button>';
let btnon = '<button id="btn-include">Start</button>';
let btnpause = '<button id="btn-pause">Pause</button>';

// добавлення кнопок на сторінку
cont.insertAdjacentHTML('beforeend', btnon);
cont.insertAdjacentHTML('beforeend', btnres);
cont.insertAdjacentHTML('beforeend', btnpause);
        
// додаємо функції за прослушкою события
document.querySelector('#butn-reset').addEventListener('click', resetTimer);
document.querySelector('#btn-include').addEventListener('click', startTimer);
document.querySelector('#btn-pause').addEventListener('click', pauseTimer)