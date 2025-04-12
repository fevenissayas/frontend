import { auth, RegisterData } from './api';

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm') as HTMLFormElement;
    const nameInput = document.getElementById('fullName') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;
    const idInput = document.getElementById('identification') as HTMLInputElement;

    // Add loading state elements
    const submitButton = registerForm.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalButtonText = submitButton.textContent || 'Agree and Register';

    function showLoading(isLoading: boolean) {
        submitButton.disabled = isLoading;
        submitButton.textContent = isLoading ? 'Registering...' : originalButtonText;
    }

    function validateForm(): { isValid: boolean; errors: string[] } {
        const errors: string[] = [];

        // Name validation
        if (nameInput.value.trim().length < 2) {
            errors.push('Full name must be at least 2 characters long');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            errors.push('Please enter a valid email address');
        }

        // Password validation
        if (passwordInput.value.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }

        if (!/[A-Z]/.test(passwordInput.value)) {
            errors.push('Password must contain at least one uppercase letter');
        }

        if (!/[0-9]/.test(passwordInput.value)) {
            errors.push('Password must contain at least one number');
        }

        // Confirm password
        if (passwordInput.value !== confirmPasswordInput.value) {
            errors.push('Passwords do not match');
        }

        // ID validation
        if (idInput.value.trim().length < 3) {
            errors.push('ID must be at least 3 characters long');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    function showErrors(errors: string[]) {
        // Remove any existing error messages
        const existingErrors = registerForm.querySelector('.alert');
        if (existingErrors) {
            existingErrors.remove();
        }

        // Create and show new error messages
        if (errors.length > 0) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'alert alert-danger mt-3';
            errorDiv.innerHTML = `
                <h6 class="alert-heading">Please fix the following errors:</h6>
                <ul class="mb-0">
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
            `;
            registerForm.insertBefore(errorDiv, submitButton.parentElement);
        }
    }

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate form
        const { isValid, errors } = validateForm();
        if (!isValid) {
            showErrors(errors);
            return;
        }

        // Clear any existing errors
        showErrors([]);

        try {
            showLoading(true);

            const registerData: RegisterData = {
                fullName: nameInput.value.trim(),
                email: emailInput.value.trim(),
                password: passwordInput.value,
                identification: idInput.value.trim()
            };

            const response = await auth.register(registerData);
            
            // Show success message
            const successDiv = document.createElement('div');
            successDiv.className = 'alert alert-success mt-3';
            successDiv.textContent = 'Registration successful! Redirecting...';
            registerForm.insertBefore(successDiv, submitButton.parentElement);

            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = response.user.role === 'admin' 
                    ? '/Dashboard.html' 
                    : '/courses.html';
            }, 1500);

        } catch (error) {
            showErrors([error instanceof Error ? error.message : 'Registration failed. Please try again.']);
        } finally {
            showLoading(false);
        }
    });

    // Clear errors when user starts typing again
    const inputs = [nameInput, emailInput, passwordInput, confirmPasswordInput, idInput];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const existingErrors = registerForm.querySelector('.alert');
            if (existingErrors) {
                existingErrors.remove();
            }
        });
    });
});
