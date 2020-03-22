const MENU = document.querySelector('.navigation');
const TAGS = document.querySelector('.portfolio_tags');
const PORTFOLIO_IMAGES = document.querySelector('.portfolio__items');


window.onload = function() {
    //MENU
    addMenuItemsClickHandler();
    document.addEventListener('scroll', onScroll);

    // SLIDER
    addSliderClickHandler();

    //PORTFOLIO TAGS
    addTagsClickHandler();

    //PORTFOLIO IMAGES
    addPortfolioImagesClickHandler();

    //QUOTE FORM
    addQuoteFormHandler();
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

const addSliderClickHandler = () => {
    const items = document.querySelectorAll('.slider__item');
    let currentItem = 0;
    let isEnabled = true;

    const changeCurrentItem = (n) => {
        currentItem = (n + items.length) % items.length;
    };

    const hideItem = (direction) => {
        isEnabled = false;
        items[currentItem].classList.add(direction);
        items[currentItem].addEventListener('animationend', function() {
            this.classList.remove('slider__item--active', direction);
        });
    };

    const showItem = (direction) => {
        items[currentItem].classList.add('slider__item--next', direction);
        items[currentItem].addEventListener('animationend', function() {
            this.classList.remove('slider__item--next', direction);
            this.classList.add('slider__item--active');
            isEnabled = true;
        });
    };

    const nextItem = (n) => {
        hideItem('to-left');
        changeCurrentItem(n + 1);
        showItem('from-right');
    };

    const previousItem = (n) => {
        hideItem('to-right');
        changeCurrentItem(n - 1);
        showItem('from-left');
    };

    document.querySelector('.slider__button-prev').addEventListener('click', function() {
        console.log(isEnabled);
        if (isEnabled) {
            previousItem(currentItem);
        }
    });

    document.querySelector('.slider__button-next').addEventListener('click', function() {
        if (isEnabled) {
            nextItem(currentItem);
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

const addQuoteFormHandler = () => {
    const form = document.querySelector('.quote form');
    console.log(form);

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const message = [
            `The letter was sent`,
            form.subject.value ? `Subject: ${form.subject.value}` : 'No subject',
            form.description.value ? `Description: ${form.description.value}` : 'No description'
        ].join('\n');

        alert(message);
        form.reset();
    });
};