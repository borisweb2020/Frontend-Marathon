const $upBtn = document.querySelector('.up-button');
const $downBtn = document.querySelector('.down-button');

const $sideBar = document.querySelector('.sidebar');
const $mainSlide = document.querySelector('.main-slide');
const $container = document.querySelector('.container');

const images = new Promise(function(resolve, reject){
    const imagesRequest = new XMLHttpRequest();
    imagesRequest.onload = function(){
        if(imagesRequest.status === 200){
            resolve(this.responseText);
        } else {
            reject('ERROR ' + imagesRequest.status);
        }
    }
    imagesRequest.open('GET', 'images.json');
    imagesRequest.send();
});

images.then(result =>{
    const imagesObj = createObject(result);
    const imagesArr = imagesObj.images;
    for(let i = 0; i < 100; i++){
        createSlides(imagesArr);
    }

    const slidesCount = $mainSlide.querySelectorAll('div').length;
    const medium = slidesCount / 2;
    const height = $container.clientHeight;
    $mainSlide.style.top = `-${medium * 100}vh`;
    $sideBar.style.top = `-${medium * 100}vh`;

    let activeSlideIndex = 0;

    function changeSlide(direction){

        if(direction === 'up'){
            activeSlideIndex++;
        } else if(direction === 'down'){
            activeSlideIndex--;
        }

        if(activeSlideIndex > 0){
            $mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;
            $sideBar.style.transform = `translateY(-${activeSlideIndex * height}px)`;
        } else {
            activeSlideIndexABS = Math.abs(activeSlideIndex);
            $mainSlide.style.transform = `translateY(${activeSlideIndexABS * height}px)`;
            $sideBar.style.transform = `translateY(${activeSlideIndexABS * height}px)`;
        }


    }

    $upBtn.addEventListener('click', ()=>{
        changeSlide('up');
    });

    $downBtn.addEventListener('click', ()=>{
        changeSlide('down');
    });
}).catch(error =>{
    console.log(error);
});

function createObject(value){
    const obj = JSON.parse(value);
    return obj;
}

function createElement(tag, className){
    const el = document.createElement(tag);

    if(className){
        el.classList.add(className);
    }

    return el;
}

function createSlides(array){
    for(let obj of array){
        const divEl = createElement('div', 'main-slide__item');

        const imgEl = createElement('img', 'main-slide__img');
        imgEl.src = obj.url;
        imgEl.alt = obj.title;
        divEl.append(imgEl);

        $mainSlide.append(divEl);

        const divElSide = createElement('div');
        divElSide.style.background = `linear-gradient(90deg, ${obj.mainColor} 0%, ${obj.subColor} 100%)`;

        const h1El = createElement('h1');
        h1El.textContent = obj.title;
        const pEl = createElement('p');
        pEl.textContent = obj.description;
        divElSide.append(h1El, pEl);

        $sideBar.append(divElSide);
    }
}







