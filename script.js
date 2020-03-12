const MENU = document.querySelector('.navigation');
const TAGS = document.querySelector('.portfolio_tags');

MENU.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        MENU.querySelectorAll('li').forEach(elem => elem.classList.remove('active'));
        event.target.parentNode.classList.add("active");
    }
});

TAGS.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        TAGS.querySelectorAll('button').forEach(elem => elem.classList.remove('tag_selected'));
        TAGS.querySelectorAll('button').forEach(elem => elem.classList.add('tag_bordered'));
        event.target.classList.add("tag_selected");
        randomMixImages();
    }
});

function randomMixImages(){
    let images = document.querySelectorAll('.portfolio__item');
    let random = Math.round(Math.random() * (images.length - 1));
    for (let i = 0; i < images.length; i++) {
        if (random + i >= images.length) {
            console.log(random + i - images.length + 2);
            images[i].childNodes[1].setAttribute('src','./assets/images/portfolio/image_'+
                (random + i - images.length + 1) +'.png');
        }
        else {
            images[i].childNodes[1].setAttribute('src','./assets/images/portfolio/image_'+
                (random + i + 1) +'.png');
        }
    }
};