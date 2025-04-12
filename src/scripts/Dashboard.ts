class AdminDashboard {
    private teachersData: Teacher[] = [
        { id: 1, name: 'Mr. Betsegaw', teacherId: '1234', email: 'betsegaw@gmail.com', course: 'Website Development' },
        { id: 2, name: 'Mr. Vittapu', teacherId: '5678', email: 'vittapu@gmail.com', course: 'Fundamental of Electrical Circuit' }
    ];
    private studentsCount: number = 200;
    private nextTeacherId: number = 3;

    private teachersList: HTMLTableSectionElement;
    private teachersTab: HTMLButtonElement;
    private studentsTab: HTMLButtonElement;
    private totalTeachersElement: HTMLElement;
    private totalStudentsElement: HTMLElement;
    private addTeacherButton: HTMLButtonElement;

    constructor() {
        // Initialize properties
        this.teachersList = document.querySelector('#teachers tbody') as HTMLTableSectionElement;
        this.teachersTab = document.getElementById('teachers-tab') as HTMLButtonElement;
        this.studentsTab = document.getElementById('students-tab') as HTMLButtonElement;
        this.totalTeachersElement = document.querySelector('.card-body h3') as HTMLElement;
        this.totalStudentsElement = document.querySelectorAll('.card-body h3')[1] as HTMLElement;
        this.addTeacherButton = document.getElementById('add-teacher-btn') as HTMLButtonElement;

        // Initialize components
        this.addEventListeners();
        this.renderTeachers();
        this.updateStats();
    }

    private addEventListeners(): void {
        this.teachersTab.addEventListener('click', () => this.switchTab('teachers'));
        this.studentsTab.addEventListener('click', () => this.switchTab('students'));
        this.addTeacherButton?.addEventListener('click', () => this.addNewTeacher());
    }

    private renderTeachers(): void {
        this.teachersList.innerHTML = '';
        this.teachersData.forEach((teacher, index) => {
            const row = this.createTeacherRow(teacher, index);
            this.teachersList.appendChild(row);
        });
        this.updateDeleteLinks();
    }

    private createTeacherRow(teacher: Teacher, index: number): HTMLTableRowElement {
        const row = document.createElement('tr');
        row.setAttribute('data-teacher-id', teacher.id.toString());
        row.innerHTML = `
            <td>${index + 1}</td>
            <td contenteditable="true">${teacher.name}</td>
            <td contenteditable="true">${teacher.teacherId}</td>
            <td contenteditable="true">${teacher.email}</td>
            <td contenteditable="true">${teacher.course}</td>
            <td>
                <a href="#" class="delete-teacher">Delete</a>
            </td>
        `;

        // Add event listeners for editable cells
        const editableCells = row.querySelectorAll('[contenteditable="true"]');
        editableCells.forEach(cell => {
            cell.addEventListener('blur', () => this.updateTeacherData(row));
        });

        // Add delete button event listener
        const deleteButton = row.querySelector('.delete-teacher');
        deleteButton?.addEventListener('click', (e) => {
            e.preventDefault();
            this.deleteTeacher(teacher.id);
        });

        return row;
    }

    private updateTeacherData(row: HTMLTableRowElement): void {
        const teacherId = parseInt(row.getAttribute('data-teacher-id') || '0');
        const cells = row.cells;
        const teacherIndex = this.teachersData.findIndex(t => t.id === teacherId);

        if (teacherIndex !== -1) {
            this.teachersData[teacherIndex] = {
                id: teacherId,
                name: cells[1].textContent || '',
                teacherId: cells[2].textContent || '',
                email: cells[3].textContent || '',
                course: cells[4].textContent || ''
            };
        }
    }

    private addNewTeacher(): void {
        const newTeacher: Teacher = {
            id: this.nextTeacherId++,
            name: 'New Teacher',
            teacherId: 'Enter ID',
            email: 'Enter Email',
            course: 'Enter Course'
        };

        this.teachersData.push(newTeacher);
        const row = this.createTeacherRow(newTeacher, this.teachersData.length - 1);
        this.teachersList.appendChild(row);
        this.updateStats();
        this.updateDeleteLinks();
    }

    private deleteTeacher(teacherId: number): void {
        const index = this.teachersData.findIndex(t => t.id === teacherId);
        if (index !== -1) {
            this.teachersData.splice(index, 1);
            this.renderTeachers();
            this.updateStats();
            this.updateDeleteLinks();
        }
    }

    private updateDeleteLinks(): void {
        const deleteLinks = this.teachersList.querySelectorAll('.delete-teacher');
        deleteLinks.forEach(link => {
            const row = link.closest('tr') as HTMLTableRowElement;
            if (this.teachersData.length === 1) {
                link.classList.add('disabled');
                link.setAttribute('style', 'pointer-events: none; color: gray;');
            } else {
                link.classList.remove('disabled');
                link.setAttribute('style', 'pointer-events: auto; color: initial;');
            }
        });
    }

    private switchTab(tab: 'teachers' | 'students'): void {
        if (tab === 'teachers') {
            this.teachersTab.classList.add('active');
            this.studentsTab.classList.remove('active');
            document.getElementById('teachers')?.classList.add('show', 'active');
            document.getElementById('students')?.classList.remove('show', 'active');
        } else {
            this.teachersTab.classList.remove('active');
            this.studentsTab.classList.add('active');
            document.getElementById('teachers')?.classList.remove('show', 'active');
            document.getElementById('students')?.classList.add('show', 'active');
        }
    }

    private updateStats(): void {
        this.totalTeachersElement.textContent = this.teachersData.length.toString();
        this.totalStudentsElement.textContent = this.studentsCount.toString();
    }
}

interface Teacher {
    id: number;
    name: string;
    teacherId: string;
    email: string;
    course: string;
}

document.addEventListener('DOMContentLoaded', () => {
    new AdminDashboard();
});
