const hamburger = document.getElementById('hamburger-menu');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    navbar.classList.toggle('nav-active');
});
