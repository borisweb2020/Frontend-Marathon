const $slides = document.querySelectorAll('.slide');

for(let slide of $slides){
    slide.addEventListener('click', () =>{
        removeActiveClass();
        slide.classList.add('active');
    });
}

function removeActiveClass(){
    $slides.forEach(item => {
        item.classList.remove('active');
    });
}