const $board = document.querySelector('#board');

//количество квадратов:
const SQUARE_NUMBER = 300;

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
  const color = `hsl(${getRandomValue()}, 72%, 62%)`;
  element.style.backgroundColor = color;
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(element){
  element.style.backgroundColor = '#1d1d1d';
  element.style.boxShadow = `0 0 2px #000`;
}

function getRandomValue(){
  const index = Math.floor(Math.random() * 360);
  return index;
}