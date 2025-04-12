import { courses, Course } from './api';

document.addEventListener('DOMContentLoaded', async () => {
    const courseGrid = document.querySelector('.row.g-4');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Check if user is logged in
    if (!localStorage.getItem('token')) {
        window.location.href = '/login.html';
        return;
    }

    try {
        const coursesList = await courses.getAll();
        
        if (courseGrid) {
            courseGrid.innerHTML = ''; // Clear existing courses
            
            coursesList.forEach((course: Course) => {
                const courseElement = document.createElement('div');
                courseElement.className = 'col-md-6';
                courseElement.innerHTML = `
                    <a href="Detail.html?id=${course.id}" class="text-decoration-none">
                        <div class="card bg-dark text-white h-100">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${course.title}</h5>
                                <p class="card-text mt-auto text-end">Published by ${course.teacher}</p>
                            </div>
                        </div>
                    </a>
                `;
                courseGrid.appendChild(courseElement);
            });
        }
    } catch (error) {
        alert('Failed to load courses. Please try again later.');
        console.error('Error loading courses:', error);
    }

    // Update navigation based on user role
    const loginLink = document.querySelector('a[href="login.html"]') as HTMLAnchorElement;
    const logoutLink = document.querySelector('a[href="index.html"]') as HTMLAnchorElement;

    if (loginLink && logoutLink) {
        if (user.role === 'admin') {
            loginLink.href = 'Dashboard.html';
            loginLink.textContent = 'Dashboard';
        }

        // Update logout functionality
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/index.html';
        });
    }
});
