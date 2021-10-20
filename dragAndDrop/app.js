const $item        = document.querySelector('.item');
const $placeholders = document.querySelectorAll('.placeholder');

$item.addEventListener('dragstart', dragStart);
$item.addEventListener('dragend', dragEnd);

function dragStart(event){
    // console.log('start dragging', event.target);
    event.target.classList.add('hold');
    setTimeout( () => {
        event.target.classList.add('hide');
    }, 0);

}

function dragEnd(event){
    // console.log('end dragging');
    event.target.classList.remove('hold', 'hide');
}

for(const placeholder of $placeholders){
    placeholder.addEventListener('dragover', dragOver);
    placeholder.addEventListener('dragenter', dragEnter);
    placeholder.addEventListener('dragleave', dragLeave);
    placeholder.addEventListener('drop', dragDrop);
}

function dragOver(event){
    // console.log('dragging over');
    event.preventDefault();
}

function dragEnter(event){
    // console.log('dragging enter');
    event.target.classList.add('hovered');
}

function dragLeave(event){
    // console.log('dragging leave');
    event.target.classList.remove('hovered');
}

function dragDrop(event){
    // console.log('dropping');
    event.target.classList.remove('hovered');
    $item.textContent = 'Выполнено';
    event.target.append($item);
}