const API_BASE_URL = 'http://localhost:3000';

interface ApiError {
    message: string;
    statusCode?: number;
    errors?: Record<string, string[]>;
}

// Get the JWT token from localStorage
function getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}

// Generic API Request Function
export async function apiRequest<T>(
    endpoint: string,
    method: string,
    body?: object,
    requiresAuth: boolean = false
): Promise<T> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(requiresAuth && getAuthHeaders()),
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        const data = await response.json();

        if (!response.ok) {
            const error: ApiError = {
                message: data.message || 'API Request Failed',
                statusCode: response.status,
                errors: data.errors
            };
            throw error;
        }

        return data;
    } catch (error) {
        if ((error as ApiError).statusCode) {
            throw error;
        }
        throw new Error('Network error occurred');
    }
}

// Auth-related interfaces
export interface LoginCredentials {
    email: string;
    password: string;
    identification: string;
}

export interface RegisterData {
    fullName: string;
    email: string;
    password: string;
    identification: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: number;
        email: string;
        name: string;
        role: 'admin' | 'teacher' | 'student';
    };
}

// Course-related interfaces
export interface Course {
    id: number;
    title: string;
    teacher: string;
    description?: string;
}

// Note-related interfaces
export interface Note {
    id: number;
    title: string;
    content: string;
    courseId: number;
    createdAt: string;
}

// API functions for authentication
export const auth = {
    login: (credentials: LoginCredentials) => 
        apiRequest<AuthResponse>('/auth/login', 'POST', credentials),
    
    register: async (data: RegisterData) => {
        try {
            const response = await apiRequest<AuthResponse>('/auth/register', 'POST', data);
            // Store auth data immediately on successful registration
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            return response;
        } catch (error) {
            const apiError = error as ApiError;
            if (apiError.errors) {
                // Handle validation errors
                const errorMessages = Object.entries(apiError.errors)
                    .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                    .join('\n');
                throw new Error(`Validation failed:\n${errorMessages}`);
            }
            throw error;
        }
    },
    
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

// API functions for courses
export const courses = {
    getAll: () => 
        apiRequest<Course[]>('/courses', 'GET', undefined, true),
    
    getById: (id: number) => 
        apiRequest<Course>(`/courses/${id}`, 'GET', undefined, true),
    
    create: (course: Omit<Course, 'id'>) => 
        apiRequest<Course>('/courses', 'POST', course, true),
    
    update: (id: number, course: Partial<Course>) => 
        apiRequest<Course>(`/courses/${id}`, 'PUT', course, true),
    
    delete: (id: number) => 
        apiRequest<void>(`/courses/${id}`, 'DELETE', undefined, true)
};

// API functions for notes
export const notes = {
    getAllByCourse: (courseId: number) => 
        apiRequest<Note[]>(`/courses/${courseId}/notes`, 'GET', undefined, true),
    
    getById: (courseId: number, noteId: number) =>
        apiRequest<Note>(`/courses/${courseId}/notes/${noteId}`, 'GET', undefined, true),
    
    create: (courseId: number, note: Omit<Note, 'id' | 'courseId' | 'createdAt'>) => 
        apiRequest<Note>(`/courses/${courseId}/notes`, 'POST', note, true),
    
    update: (courseId: number, noteId: number, note: Partial<Note>) => 
        apiRequest<Note>(`/courses/${courseId}/notes/${noteId}`, 'PUT', note, true),
    
    delete: (courseId: number, noteId: number) => 
        apiRequest<void>(`/courses/${courseId}/notes/${noteId}`, 'DELETE', undefined, true)
}; 