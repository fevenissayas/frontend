import { courses, notes, Course, Note } from './api';

document.addEventListener('DOMContentLoaded', async () => {
    // Check if user is logged in
    if (!localStorage.getItem('token')) {
        window.location.href = '/login.html';
        return;
    }

    // Get course ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseIdParam = urlParams.get('id');
    const courseId = courseIdParam ? parseInt(courseIdParam) : 0;

    if (!courseId) {
        alert('Invalid course ID');
        window.location.href = '/courses.html';
        return;
    }

    const courseTitleElement = document.getElementById('course-title');
    const notesContainer = document.getElementById('notes');
    const addNoteButton = document.querySelector('.btn.btn-dark.rounded-circle') as HTMLButtonElement | null;

    if (!notesContainer || !addNoteButton) {
        console.error('Required DOM elements not found');
        return;
    }

    try {
        // Fetch course details
        const course = await courses.getById(courseId);
        if (courseTitleElement) {
            courseTitleElement.textContent = `Course Title: ${course.title}`;
        }

        // Fetch notes for the course
        const courseNotes = await notes.getAllByCourse(courseId);
        
        // Clear existing notes
        notesContainer.innerHTML = '';
        
        // Create and append note elements
        courseNotes.forEach((note: Note) => {
            const noteElement = createNoteElement(note, courseId);
            notesContainer.appendChild(noteElement);
        });

        // Add note button functionality
        addNoteButton.addEventListener('click', () => {
            window.location.href = `/Note.html?courseId=${courseId}`;
        });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        alert(`Failed to load course details: ${errorMessage}`);
        console.error('Error:', error);
    }
});

function createNoteElement(note: Note, courseId: number): HTMLDivElement {
    const noteElement = document.createElement('div');
    noteElement.className = 'col-md-6';
    noteElement.innerHTML = `
        <div class="card note-card">
            <div class="card-body">
                <h5 class="card-title">${escapeHtml(note.title)}</h5>
                <p class="card-text">${escapeHtml(note.content)}</p>
                <div class="d-flex justify-content-end mt-2">
                    <button class="btn btn-link text-danger delete-note" data-note-id="${note.id}">Delete</button>
                    <button class="btn btn-link edit-note" data-note-id="${note.id}">Edit</button>
                </div>
            </div>
        </div>
    `;

    // Add event listeners for edit and delete buttons
    const deleteBtn = noteElement.querySelector('.delete-note');
    const editBtn = noteElement.querySelector('.edit-note');

    deleteBtn?.addEventListener('click', async () => {
        if (confirm('Are you sure you want to delete this note?')) {
            try {
                await notes.delete(courseId, note.id);
                noteElement.remove();
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
                alert(`Failed to delete note: ${errorMessage}`);
            }
        }
    });

    editBtn?.addEventListener('click', () => {
        window.location.href = `/Note.html?courseId=${courseId}&noteId=${note.id}`;
    });

    return noteElement;
}

// Helper function to prevent XSS
function escapeHtml(unsafe: string): string {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
  