const BASE_URL = 'http://localhost:3001/api';

const input = document.querySelector('input');
const list = document.querySelector('ul');
const button = document.querySelector('button');
button.addEventListener('click', async () => {
  try {
    await fetch(BASE_URL + '/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: input.value }),
    });

    list.insertAdjacentHTML('beforeend', `<li>${input.value}</li>`);
  } catch {
    console.error('error');
  }
});

(async () => {
  try {
    const res = await fetch(BASE_URL + '/todos');
    const data = await res.json();
    data.forEach(todo => {
      list.insertAdjacentHTML('beforeend', `<li>${todo.text}</li>`);
    });
  } catch {
    console.error('error');
  }
})();
