interface Chapter {
    id: number;
    title: string;
    isEditing: boolean;
}

class DocumentManager {

    private chaptersContainer: HTMLElement;

    constructor() {
        this.chaptersContainer = document.getElementById('chaptersContainer')!;
        this.initialize();
    }

    private initialize(): void {
        // Add button click handler
        const addButton = document.getElementById('addButton');
        if (addButton) {
            addButton.addEventListener('click', () => this.addNewChapter());
        }

        // Initialize existing chapters (if any)
        this.setupChapterListeners();
    }

    private addNewChapter(): void {
        const chapterNumber = this.chaptersContainer.children.length + 1;
        const chapterItem = document.createElement('div');
        chapterItem.className = 'chapter-item';
        chapterItem.innerHTML = `
            <button class="chapter-button">
                <span class="chapter-text" contenteditable="true">Chapter ${chapterNumber}</span>
                <span class="minus-icon">−</span>
            </button>
        `;
        this.chaptersContainer.appendChild(chapterItem);
        this.setupChapterListeners();
    }

    private setupChapterListeners(): void {
        // Remove all existing listeners first
        const existingIcons = document.querySelectorAll('.minus-icon');
        existingIcons.forEach(icon => {
            const newIcon = icon.cloneNode(true);
            icon.parentNode?.replaceChild(newIcon, icon);
        });

        // Add new listeners for minus icons
        const minusIcons = document.querySelectorAll('.minus-icon');
        minusIcons.forEach(icon => {
            icon.addEventListener('click', (e: Event) => this.removeChapter(e));
        });

        // Add listeners for chapter text editing
        const chapterTexts = document.querySelectorAll('.chapter-text');
        chapterTexts.forEach(text => {
            // Make text editable on click
            text.addEventListener('click', (e: Event) => {
                const target = e.target as HTMLElement;
                target.contentEditable = 'true';
                target.focus();
            });

            text.addEventListener('keydown', (e: Event) => {
                const keyboardEvent = e as KeyboardEvent;
                const target = keyboardEvent.target as HTMLElement;
                if (keyboardEvent.key === 'Enter') {
                    e.preventDefault();
                    target.contentEditable = 'false';
                    target.blur();
                }
            });

            text.addEventListener('blur', (e: Event) => {
                const target = e.target as HTMLElement;
                target.contentEditable = 'false';
                if (!target.textContent?.trim()) {
                    target.textContent = `Chapter ${this.getChapterIndex(target) + 1}`;
                }
            });
        });

        // Add listeners for chapter buttons
        const chapterButtons = document.querySelectorAll('.chapter-button');
        chapterButtons.forEach(button => {
            button.addEventListener('click', (e: Event) => {
                const target = e.target as HTMLElement;
                const buttonElement = target.closest('.chapter-button') as HTMLElement;
                
                if (!target.classList.contains('chapter-text') && 
                    !target.classList.contains('minus-icon') &&
                    buttonElement) {
                    this.handleFileUpload(buttonElement);
                }
            });
        });
    }

    private getChapterIndex(element: HTMLElement): number {
        const chapterItem = element.closest('.chapter-item');
        if (!chapterItem) return 0;
        return Array.from(this.chaptersContainer.children).indexOf(chapterItem);
    }

    private removeChapter(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        const icon = event.target as HTMLElement;
        const chapterItem = icon.closest('.chapter-item');
        if (chapterItem && chapterItem.parentElement) {
            chapterItem.parentElement.removeChild(chapterItem);
        }
    }

    private handleFileUpload(button: HTMLElement): void {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.pdf,.doc,.docx,.txt';

        fileInput.addEventListener('change', (e: Event) => {
            const input = e.target as HTMLInputElement;
            if (input && input.files && input.files.length > 0) {
                const file = input.files[0];
                this.uploadFile(file, button);
            }
        });

        fileInput.click();
    }

    private uploadFile(file: File, button: HTMLElement): void {
        const formData = new FormData();
        formData.append('file', file);

        // Find or create file name span within this specific button
        let fileNameSpan = button.querySelector('.file-name') as HTMLElement | null;
        if (!fileNameSpan) {
            fileNameSpan = document.createElement('span');
            fileNameSpan.className = 'file-name';
            // Insert before the minus icon
            const minusIcon = button.querySelector('.minus-icon');
            if (minusIcon) {
                button.insertBefore(fileNameSpan, minusIcon);
            } else {
                button.appendChild(fileNameSpan);
            }
        }

        // Ensure fileNameSpan is an HTMLElement before accessing style
        if (fileNameSpan instanceof HTMLElement) {
            // Update UI to show selected file
            fileNameSpan.textContent = `(${file.name})`;
            fileNameSpan.style.fontSize = '0.8em';
            fileNameSpan.style.marginLeft = '10px';
            fileNameSpan.style.color = '#6c757d';
        }

        // Example upload implementation
        try {
            // Your upload logic here
            console.log('Uploading file:', file.name);

            // Simulated upload success
            // Replace this with your actual upload code
            /*
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }
            */
        } catch (error) {
            console.error('Upload error:', error);
            if (fileNameSpan instanceof HTMLElement) {
                fileNameSpan.textContent = '(Upload failed)';
                fileNameSpan.style.color = '#dc3545';
            }
        }
    }
}

// Initialize the document manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const manager = new DocumentManager();
});
