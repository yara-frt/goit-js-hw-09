import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button');
const dataTimer = {
    dataDays: document.querySelectorAll('.value')[0],
    dataHours: document.querySelectorAll('.value')[1],
    dataMinutes: document.querySelectorAll('.value')[2],
    dataSeconds: document.querySelectorAll('.value')[3],
}
const date = new Date();
let intervalId = null;
let futureDate = null;

btn.addEventListener('click', onClickBtnTimer);

onDisabled(btn);


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= date) {
            showsMessageWrongDate()
            
        } else {
            futureDate = selectedDates[0].getTime();
            closeDisabled(btn)   
        }
        
            
                

  },
};

flatpickr(input, options);

function showsMessageWrongDate() {
    onDisabled(btn)
    window.alert("Please choose a date in the future");
}

function onDisabled(btn) {
    btn.setAttribute('disabled', 'disabled');
}

function closeDisabled(btn) {
    btn.removeAttribute('disabled');
}

function onClickBtnTimer() {
    onDisabled(btn);
    intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = futureDate - currentTime;           
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    showTimer({ days, hours, minutes, seconds })
    
    if (deltaTime <= 1000) {
        endsTheInterval()
    }
    }, 1000)
}

function showTimer({ days, hours, minutes, seconds }) {
    dataTimer.dataDays.textContent = addLeadingZero(days);
    dataTimer.dataHours.textContent = addLeadingZero(hours);
    dataTimer.dataMinutes.textContent = addLeadingZero(minutes);
    dataTimer.dataSeconds.textContent = addLeadingZero(seconds);
}

function endsTheInterval() {
     clearInterval(intervalId);
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}




function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

