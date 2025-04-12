import { auth, LoginCredentials } from './api';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('registerForm') as HTMLFormElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const idInput = document.getElementById('identification') as HTMLInputElement;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            const credentials: LoginCredentials = {
                email: emailInput.value,
                password: passwordInput.value,
                identification: idInput.value
            };

            const response = await auth.login(credentials);
            
            // Store the token and user data
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            // Show success message
            alert('Login successful!');

            // Redirect based on user role (you might want to adjust this based on your backend response)
            if (response.user.role === 'admin') {
                window.location.href = '/Dashboard.html';
            } else {
                window.location.href = '/courses.html';
            }
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Login failed. Please try again.');
        }
    });
});
