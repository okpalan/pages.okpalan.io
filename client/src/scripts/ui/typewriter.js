
const typeWriter = document.getElementById('typewriter-text');
const text = 'Nnọọ, I`m Nnamdi Okpala.';

typeWriter.innerHTML = text;
typeWriter.style.setProperty('--characters', text.length);

const texts = [ 'Python', 'C', 'NodeJS', 'Javascript','Lua'];
const element = document.getElementById('alternating-text');

let i = 0;
const listener = e => {
  i = i < texts.length - 1 ? i + 1 : 0;
  element.innerHTML = texts[i];
};

element.innerHTML = texts[0];
element.addEventListener('animationiteration', listener, false);