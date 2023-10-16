import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const delay = parseInt(form.elements.delay.value);
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    const promiseDelay = delay + (position - 1) * step;
    const promise = createPromise(position, promiseDelay);

    promise
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

//add styles 

const button = form.querySelector('button');

button.style.backgroundColor = '#007bff';
button.style.color = '#fff';
button.style.padding = '10px 20px';
button.style.border = 'none';
button.style.borderRadius = '5px';
button.style.cursor = 'pointer';

const inputElements = form.querySelectorAll('input');

inputElements.forEach(input => {
  input.style.padding = '10px';
  input.style.margin = '5px 0';
  input.style.border = '1px solid #ccc';
  input.style.borderRadius = '5px';
});

form.style.display = 'inline-block';
form.style.backgroundColor = '#f0f0f0';
form.style.padding = '20px';
form.style.border = '1px solid #ccc';

