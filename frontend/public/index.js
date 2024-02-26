const BASE_URL = 'http://localhost:3001/api';

const input = document.querySelector('input');
const ul = document.querySelector('ul');

const appendTodo = async (id, text) => {
  const li = document.createElement('li');
  li.textContent = text;
  li.addEventListener('click', async () => {
    try {
      await fetch(BASE_URL + '/todos/' + id, {
        method: 'DELETE',
      });
      li.remove();
    } catch {
      console.error('error');
    }
  });
  ul.append(li);
};

const button = document.querySelector('button');
button.addEventListener('click', async () => {
  try {
    const res = await fetch(BASE_URL + '/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: input.value }),
    });
    const data = await res.json();
    appendTodo(data._id, input.value);
  } catch {
    console.error('error');
  }
});

const main = async () => {
  try {
    const res = await fetch(BASE_URL + '/todos');
    const data = await res.json();
    data.forEach(todo => appendTodo(todo._id, todo.text));
  } catch {
    console.error('error');
  }
};

main();
