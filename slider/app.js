const $upBtn = document.querySelector('.up-button');
const $downBtn = document.querySelector('.down-button');

const $sideBar = document.querySelector('.sidebar');
const $mainSlide = document.querySelector('.main-slide');
const $container = document.querySelector('.container');

// Расчет количесвто div-ов (слайдов) внутри:
const slidesCount = $mainSlide.querySelectorAll('div').length;

// Смещаем позицию sidebar в зависимости от числа слайдов
$sideBar.style.top = `-${(slidesCount - 1) * 100}vh`; // -300vh

// Переменная, которая следит какой сейчас слайд активен:
let activeSlideIndex = 0; // in default = 0


$upBtn.addEventListener('click', ()=>{
    changeSlide('up');
});

$downBtn.addEventListener('click', ()=>{
    changeSlide('down');
});

function changeSlide(direction){

    if(direction === 'up'){
        activeSlideIndex++;

        if(activeSlideIndex === slidesCount){
            activeSlideIndex = 0;
        }
    } else if(direction === 'down'){
        activeSlideIndex--;

        if(activeSlideIndex < 0){
            activeSlideIndex = slidesCount - 1;
        }
    }

    // Вычисляем высоту контейнера, на которую будут перемещаться слайды:
    const height = $container.clientHeight;

    $mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;
    $sideBar.style.transform = `translateY(${activeSlideIndex * height}px)`;
}