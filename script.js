   
   // Створення констант та пошук елементів 
let isRuning = false;
let clearintervalId;
let timeSeconds = Number(localStorage.getItem('timeSeconds')) || 0;  
let timeMinutes = Number(localStorage.getItem('timeMinutes')) || 0;
let saveTimerTimeFromLoad = () => {
    localStorage.setItem("progressS", timeSeconds);
    localStorage.setItem("progressM", timeMinutes);
}
const texth1 = document.querySelector('.timer');  
const cont = document.querySelector('.btns');
const loadBtnCont = document.querySelector('.load-reset-btns');
        
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
let btnSave = `<button id="save-btn">Save</button>`;
let btnLoad = `<button id="load-btn">Load</button>`;

// добавлення кнопок на сторінку
cont.insertAdjacentHTML('beforeend', btnon);
cont.insertAdjacentHTML('beforeend', btnres);
cont.insertAdjacentHTML('beforeend', btnpause);
loadBtnCont.insertAdjacentHTML('beforeend', btnSave);
loadBtnCont.insertAdjacentHTML('beforeend',btnLoad);
        
// додаємо функції за прослушкою события
document.querySelector('#butn-reset').addEventListener('click', resetTimer);
document.querySelector('#btn-include').addEventListener('click', startTimer);
document.querySelector('#btn-pause').addEventListener('click', pauseTimer)
document.querySelector('#save-btn').addEventListener('click', ()=> {
  saveTimerTimeFromLoad()
});
document.querySelector('#load-btn').addEventListener('click', ()=>{
   if (isRuning) {
        clearInterval(clearintervalId)
        isRuning = false
    }
   timeSeconds = Number(localStorage.getItem("progressS")) || 0;
   timeMinutes = Number(localStorage.getItem("progressM")) || 0;
   updateTimermessage()
   texth1.style.animationIterationCount = 0
})