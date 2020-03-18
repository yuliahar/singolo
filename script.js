const MENU = document.querySelector('.navigation');
const TAGS = document.querySelector('.portfolio_tags');
const PORTFOLIO_IMAGES = document.querySelector('.portfolio__items');


window.onload = function() {
    //MENU
    addMenuItemsClickHandler();
    document.addEventListener('scroll', onScroll);

    //TAGS
    addTagsClickHandler();

    //PORTFOLIO
    addPortfolioImagesClickHandler();

};

const addMenuItemsClickHandler = () => {
    MENU.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            MENU.querySelectorAll('li').forEach(elem => elem.classList.remove('active'));
            event.target.parentNode.classList.add("active");
        }
    })
};

const onScroll = () => {
    const currentPosition = window.scrollY + 95;
    document.querySelectorAll('section').forEach((section) => {
        if (section.offsetTop <= currentPosition && (section.offsetTop + section.offsetHeight) > currentPosition) {
            MENU.querySelectorAll('li>a').forEach(menuItem => {
                menuItem.parentNode.classList.remove('active');
                if (section.getAttribute('class') === menuItem.getAttribute('href').substring(1)) {
                    menuItem.parentNode.classList.add('active');
                }
            });
        }
    });
};

const addTagsClickHandler = () => {
    TAGS.addEventListener('click', (event) => {
        const clickedTag = event.target;

        if (!clickedTag) {
            return;
        }

        if (clickedTag.tagName === 'BUTTON') {
            removeSelectedTags();
            selectClickedTag(clickedTag);
            shuffleImages();
            removeSelectedPortfolio();
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

const shuffleImages = () => {
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

const addPortfolioImagesClickHandler = () => {
    PORTFOLIO_IMAGES.addEventListener('click', (event) => {
        const clickedImage = event.target;//.closest('.portfolio__item');

        if (!clickedImage) {
            return;
        }

        if (clickedImage.tagName === 'IMG') {
            const current = PORTFOLIO_IMAGES.querySelector('.image-bordered');


            if (current) {
                current.classList.remove('image-bordered');
            }

            if (current !== clickedImage) {
                clickedImage.classList.add('image-bordered');
            }
        }
    })
};

const removeSelectedPortfolio = () => {
    const current = document.querySelector('.portfolio .image-bordered');

    if (current) {
        current.classList.remove('image-bordered');
    }
};