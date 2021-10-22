const $board = document.querySelector('#board');

//количество квадратов:
const SQUARE_NUMBER = 500;

const colors = ['#ff0036', '#ffe500', '#4dde00', '#009999', '#1b1bb3', '#7109aa', '#d8005e'];

for (let i = 0; i < SQUARE_NUMBER; i++){
  const square = document.createElement('div');
  square.classList.add('square');

  square.addEventListener('mouseover', ()=> {
    setColor(square);
  });

  square.addEventListener('mouseleave', ()=> {
    removeColor(square);
  });

  $board.append(square);
}

function setColor(element){
  const color = getRandomColor();
  element.style.backgroundColor = color;
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(element){
  element.style.backgroundColor = '#1d1d1d';
  element.style.boxShadow = `0 0 2px #000`;
}

function getRandomColor(){
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}