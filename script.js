// script.js
document.addEventListener('DOMContentLoaded', function () {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    // Переключение вкладок
    tabLinks.forEach(link => {
        link.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            // Убираем активный класс у всех вкладок и контентов
            tabLinks.forEach(link => link.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Добавляем активный класс к выбранной вкладке и контенту
            this.classList.add('active');

            if (tabId === 'projects') {
                loadProjects();
            }

            document.getElementById(tabId).classList.add('active');
        });
    });

    // Загрузка проектов через AJAX
    async function loadProjects() {
        const projectsContainer = document.getElementById('projects');
        projectsContainer.innerHTML = '<p>Загрузка проектов...</p>';

        try {
            const response = await fetch('projects.json'); // JSON файл с данными о проектах
            const projects = await response.json();

            let projectHTML = '';
            projects.forEach(project => {
                projectHTML += `
                    <div class="project">
                        <h3>${project.title}</h3>
                        <p><strong>Технологии:</strong> ${project.technologies.join(', ')}</p>
                        <p>${project.description}</p>
                        <button class="accordion-btn">Показать код</button>
                        <div class="accordion-content">
                            <pre><code class="${project.language}">${project.code}</code></pre>
                        </div>
                        <a href="${project.github}" target="_blank">GitHub</a> | 
                        <a href="${project.demo}" target="_blank">Демо</a>
                    </div>
                `;
            });

            projectsContainer.innerHTML = projectHTML;

            // Аккордеон для показа кода
            const accordionButtons = document.querySelectorAll('.accordion-btn');
            accordionButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const content = this.nextElementSibling;
                    content.style.display = content.style.display === 'block' ? 'none' : 'block';
                });
            });
        } catch (error) {
            projectsContainer.innerHTML = '<p>Ошибка загрузки проектов.</p>';
        }
    }
});
