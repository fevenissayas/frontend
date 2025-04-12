var AdminDashboard = /** @class */ (function () {
    function AdminDashboard() {
        this.teachersData = [
            { id: 1, name: 'Mr. Betsegaw', teacherId: '1234', email: 'betsegaw@gmail.com', course: 'Website Development' },
            { id: 2, name: 'Mr. Vittapu', teacherId: '5678', email: 'vittapu@gmail.com', course: 'Fundamental of Electrical Circuit' }
        ];
        this.studentsCount = 200;
        this.nextTeacherId = 3;
        // Initialize properties
        this.teachersList = document.querySelector('#teachers tbody');
        this.teachersTab = document.getElementById('teachers-tab');
        this.studentsTab = document.getElementById('students-tab');
        this.totalTeachersElement = document.querySelector('.card-body h3');
        this.totalStudentsElement = document.querySelectorAll('.card-body h3')[1];
        this.addTeacherButton = document.getElementById('add-teacher-btn');
        // Initialize components
        this.addEventListeners();
        this.renderTeachers();
        this.updateStats();
    }
    AdminDashboard.prototype.addEventListeners = function () {
        var _this = this;
        var _a;
        this.teachersTab.addEventListener('click', function () { return _this.switchTab('teachers'); });
        this.studentsTab.addEventListener('click', function () { return _this.switchTab('students'); });
        (_a = this.addTeacherButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return _this.addNewTeacher(); });
    };
    AdminDashboard.prototype.renderTeachers = function () {
        var _this = this;
        this.teachersList.innerHTML = '';
        this.teachersData.forEach(function (teacher, index) {
            var row = _this.createTeacherRow(teacher, index);
            _this.teachersList.appendChild(row);
        });
        this.updateDeleteLinks();
    };
    AdminDashboard.prototype.createTeacherRow = function (teacher, index) {
        var _this = this;
        var row = document.createElement('tr');
        row.setAttribute('data-teacher-id', teacher.id.toString());
        row.innerHTML = "\n            <td>".concat(index + 1, "</td>\n            <td contenteditable=\"true\">").concat(teacher.name, "</td>\n            <td contenteditable=\"true\">").concat(teacher.teacherId, "</td>\n            <td contenteditable=\"true\">").concat(teacher.email, "</td>\n            <td contenteditable=\"true\">").concat(teacher.course, "</td>\n            <td>\n                <a href=\"#\" class=\"delete-teacher\">Delete</a>\n            </td>\n        ");
        // Add event listeners for editable cells
        var editableCells = row.querySelectorAll('[contenteditable="true"]');
        editableCells.forEach(function (cell) {
            cell.addEventListener('blur', function () { return _this.updateTeacherData(row); });
        });
        // Add delete button event listener
        var deleteButton = row.querySelector('.delete-teacher');
        deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener('click', function (e) {
            e.preventDefault();
            _this.deleteTeacher(teacher.id);
        });
        return row;
    };
    AdminDashboard.prototype.updateTeacherData = function (row) {
        var teacherId = parseInt(row.getAttribute('data-teacher-id') || '0');
        var cells = row.cells;
        var teacherIndex = this.teachersData.findIndex(function (t) { return t.id === teacherId; });
        if (teacherIndex !== -1) {
            this.teachersData[teacherIndex] = {
                id: teacherId,
                name: cells[1].textContent || '',
                teacherId: cells[2].textContent || '',
                email: cells[3].textContent || '',
                course: cells[4].textContent || ''
            };
        }
    };
    AdminDashboard.prototype.addNewTeacher = function () {
        var newTeacher = {
            id: this.nextTeacherId++,
            name: 'New Teacher',
            teacherId: 'Enter ID',
            email: 'Enter Email',
            course: 'Enter Course'
        };
        this.teachersData.push(newTeacher);
        var row = this.createTeacherRow(newTeacher, this.teachersData.length - 1);
        this.teachersList.appendChild(row);
        this.updateStats();
        this.updateDeleteLinks();
    };
    AdminDashboard.prototype.deleteTeacher = function (teacherId) {
        var index = this.teachersData.findIndex(function (t) { return t.id === teacherId; });
        if (index !== -1) {
            this.teachersData.splice(index, 1);
            this.renderTeachers();
            this.updateStats();
            this.updateDeleteLinks();
        }
    };
    AdminDashboard.prototype.updateDeleteLinks = function () {
        var _this = this;
        var deleteLinks = this.teachersList.querySelectorAll('.delete-teacher');
        deleteLinks.forEach(function (link) {
            var row = link.closest('tr');
            if (_this.teachersData.length === 1) {
                link.classList.add('disabled');
                link.setAttribute('style', 'pointer-events: none; color: gray;');
            }
            else {
                link.classList.remove('disabled');
                link.setAttribute('style', 'pointer-events: auto; color: initial;');
            }
        });
    };
    AdminDashboard.prototype.switchTab = function (tab) {
        var _a, _b, _c, _d;
        if (tab === 'teachers') {
            this.teachersTab.classList.add('active');
            this.studentsTab.classList.remove('active');
            (_a = document.getElementById('teachers')) === null || _a === void 0 ? void 0 : _a.classList.add('show', 'active');
            (_b = document.getElementById('students')) === null || _b === void 0 ? void 0 : _b.classList.remove('show', 'active');
        }
        else {
            this.teachersTab.classList.remove('active');
            this.studentsTab.classList.add('active');
            (_c = document.getElementById('teachers')) === null || _c === void 0 ? void 0 : _c.classList.remove('show', 'active');
            (_d = document.getElementById('students')) === null || _d === void 0 ? void 0 : _d.classList.add('show', 'active');
        }
    };
    AdminDashboard.prototype.updateStats = function () {
        this.totalTeachersElement.textContent = this.teachersData.length.toString();
        this.totalStudentsElement.textContent = this.studentsCount.toString();
    };
    return AdminDashboard;
}());
document.addEventListener('DOMContentLoaded', function () {
    new AdminDashboard();
});
