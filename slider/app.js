const $upBtn = document.querySelector('.up-button');
const $downBtn = document.querySelector('.down-button');

const $sideBar = document.querySelector('.sidebar');
const $mainSlide = document.querySelector('.main-slide');
const $container = document.querySelector('.container');


let activeSlideIndex = 0;

function changeSlide(direction, slidesCount){

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

    const height = $container.clientHeight;

    $mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;
    $sideBar.style.transform = `translateY(-${activeSlideIndex * height}px)`;
}




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
    createSlides(imagesArr);

    $upBtn.addEventListener('click', ()=>{
        changeSlide('up', imagesArr.length);
    });

    $downBtn.addEventListener('click', ()=>{
        changeSlide('down', imagesArr.length);
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







