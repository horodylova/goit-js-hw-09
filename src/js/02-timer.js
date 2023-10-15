import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';


const flatPickrInput = document.querySelector('[id="datetime-picker"]');
const buttonStart = document.querySelector('[data-start]');

buttonStart.disabled = true; 

const currentDate = new Date();

const currentHours = currentDate.getHours();
const currentMinutes = currentDate.getMinutes();
const currentSeconds = currentDate.getSeconds();

let selectedDate = new Date(); 

const selectedHours = selectedDate.getHours(); 
const selectedMinutes = selectedDate.getMinutes(); 
const selectedSeconds = selectedDate.getSeconds(); 

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: currentDate,
    minuteIncrement: 1,
    onClose(selectedDates) {
    //   console.log(selectedDates[0]);

      selectedDate = selectedDates[0];

      if(selectedDate < currentDate) {
        Notiflix.Notify.warning('Please choose a date in the future');
    } else {
        buttonStart.disabled = false;
        buttonStart.addEventListener('click', startCountdown);

    }}
};

  const flatpickrInstance = flatpickr(flatPickrInput, options);

  buttonStart.disabled = true; 

// Downcounter function 

    function startCountdown() {
        const timerElement = document.querySelector('.timer');
        const daysElement = timerElement.querySelector('[data-days]');
        const hoursElement = timerElement.querySelector('[data-hours]');
        const minutesElement = timerElement.querySelector('[data-minutes]');
        const secondsElement = timerElement.querySelector('[data-seconds]');

    const intervalId = setInterval(() => {
        const timeLeft = selectedDate - currentDate;
    
        if (timeLeft <= 0) {
            clearInterval(intervalId); 
            Notiflix.Notify.failure('Countdown has ended');
        } else {
            const timeDifference = convertMs(timeLeft);
            const { days, hours, minutes, seconds } = timeDifference;
            
            daysElement.textContent = days.toString().padStart(2, '0');
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');

            console.log(timeDifference);
        }
    }, 1000);
  };

// formules

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
  
 
  const fields = document.querySelectorAll('.field');

  /// add styles

    fields.forEach(field => {

        field.style.display = 'inline-block';
        field.style.marginRight = '20px';

    const valueElement = field.querySelector('.value');
    const labelElement = field.querySelector('.label');

    
    valueElement.style.fontWeight = 'bold';
    valueElement.style.fontSize = '24px';
    valueElement.style.color = 'blue';

    labelElement.style.fontStyle = 'italic';
    labelElement.style.fontSize = '16px';
    labelElement.style.color = 'gray';
});






