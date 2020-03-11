const MENU = document.querySelector('.navigation');

MENU.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        MENU.querySelectorAll('li').forEach(elem => elem.classList.remove('active'));
        event.target.parentNode.classList.add("active");
    }
});