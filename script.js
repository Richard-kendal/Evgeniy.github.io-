// script.js
document.addEventListener('DOMContentLoaded', function () {
    const accordionButtons = document.querySelectorAll('.accordion-btn');

    accordionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const content = this.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Темная тема
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-theme');
        });
    }
});