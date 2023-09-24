import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const dateInput = document.querySelector('#datetime-picker');
const bthStart = document.querySelector('[data-start]');
const daysData = document.querySelector('[data-days]');
const hoursData = document.querySelector('[data-hours]');
const minutesData = document.querySelector('[data-minutes]');
const secondsData = document.querySelector('[data-seconds]');

let chosenDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const pickedDate = selectedDates[0];
    if (pickedDate > new Date()) {
      chosenDate = pickedDate;
      bthStart.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      bthStart.disabled = true;
    }
  },
};

flatpickr(dateInput, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => value.toString().padStart(2, '0');

let countInterval = 0;

const startCount = () => {
  if (countInterval) {
    clearInterval(countInterval);
  }
  countInterval = setInterval(() => {
    const actualTime = new Date();
    const difference = chosenDate - actualTime;
    if (difference < 0) {
      clearInterval(countInterval);
      return;
    }
    const objectTime = convertMs(difference);

    daysData.textContent = addLeadingZero(objectTime.days);
    hoursData.textContent = addLeadingZero(objectTime.hours);
    minutesData.textContent = addLeadingZero(objectTime.minutes);
    secondsData.textContent = addLeadingZero(objectTime.seconds);
  }, 1000);
};

bthStart.addEventListener('click', startCount);