const MENU = document.querySelector('.navigation');
const TAGS = document.querySelector('.portfolio_tags');

window.onload = function() {
    //MENU
    addMenuItemsClickHandler();

    //TAGS
    addTagsClickHandler();
};

const addMenuItemsClickHandler = () => {
    MENU.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            MENU.querySelectorAll('li').forEach(elem => elem.classList.remove('active'));
            event.target.parentNode.classList.add("active");
        }
    })
};

const addTagsClickHandler = () => {
    TAGS.addEventListener('click', (event) => {
        let clickedTag = event.target;
        if (clickedTag.tagName === 'BUTTON') {
            removeSelectedTags();
            selectClickedTag(clickedTag);
            randomMixImages();
        }
    })
};

const removeSelectedTags = () => {
    TAGS.querySelectorAll('button').forEach(elem => elem.classList.remove('tag_selected'));
    TAGS.querySelectorAll('button').forEach(elem => elem.classList.add('tag_bordered'));
};

const selectClickedTag = (clickedTag) => {
    clickedTag.classList.add("tag_selected");
};

const randomMixImages = () => {
    let images = document.querySelectorAll('.portfolio__item');
    let random = Math.round(Math.random() * (images.length - 1));
    for (let i = 0; i < images.length; i++) {
        if (random + i >= images.length) {
            images[i].childNodes[1].setAttribute('src','./assets/images/portfolio/image_'+
                (random + i - images.length + 1) +'.png');
        }
        else {
            images[i].childNodes[1].setAttribute('src','./assets/images/portfolio/image_'+
                (random + i + 1) +'.png');
        }
    }
};
