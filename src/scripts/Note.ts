import { notes } from './api';

document.addEventListener('DOMContentLoaded', async () => {
    // Check if user is logged in
    if (!localStorage.getItem('token')) {
        window.location.href = '/login.html';
        return;
    }

    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const courseIdParam = urlParams.get('courseId');
    const noteIdParam = urlParams.get('noteId');
    
    const courseId = courseIdParam ? parseInt(courseIdParam) : 0;
    const noteId = noteIdParam ? parseInt(noteIdParam) : null;

    if (!courseId) {
        alert('Invalid course ID');
        window.location.href = '/courses.html';
        return;
    }

    const titleInput = document.getElementById('titleInput') as HTMLInputElement;
    const noteInput = document.getElementById('noteInput') as HTMLDivElement;
    const backButton = document.getElementById('backButton') as HTMLAnchorElement;
    const formatButtons = document.querySelectorAll('[data-format]');

    // If editing existing note, load its content
    if (noteId) {
        try {
            const note = await notes.getById(courseId, noteId);
            titleInput.value = note.title;
            noteInput.innerHTML = note.content;
        } catch (error) {
            alert('Failed to load note');
            console.error('Error:', error);
        }
    }

    // Format buttons functionality
    formatButtons.forEach(button => {
        button.addEventListener('click', () => {
            const format = button.getAttribute('data-format');
            document.execCommand(format || '', false);
            noteInput.focus();
        });
    });

    // Auto-save functionality
    let saveTimeout: number;
    const autoSave = async () => {
        const title = titleInput.value.trim();
        const content = noteInput.innerHTML.trim();

        if (!title || !content) return;

        try {
            if (noteId) {
                await notes.update(courseId, noteId, { title, content });
            } else {
                const newNote = await notes.create(courseId, { title, content });
                // Update URL with new note ID
                history.replaceState(null, '', `?courseId=${courseId}&noteId=${newNote.id}`);
            }
        } catch (error) {
            console.error('Auto-save failed:', error);
        }
    };

    // Setup auto-save triggers
    const triggerAutoSave = () => {
        clearTimeout(saveTimeout);
        saveTimeout = window.setTimeout(autoSave, 1000) as unknown as number;
    };

    titleInput.addEventListener('input', triggerAutoSave);
    noteInput.addEventListener('input', triggerAutoSave);

    // Update back button href
    if (backButton) {
        backButton.href = `Detail.html?id=${courseId}`;
    }

    // Handle paste to strip formatting
    noteInput.addEventListener('paste', (e) => {
        e.preventDefault();
        const text = e.clipboardData?.getData('text/plain');
        if (text) {
            document.execCommand('insertText', false, text);
        }
    });
});
