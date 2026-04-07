const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
const navLinks = siteNav.querySelectorAll('a[href^="#"]');

navToggle.addEventListener('click', () => {
  siteNav.classList.toggle('active');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('active');
  });
});
