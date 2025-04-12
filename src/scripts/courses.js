var Course = /** @class */ (function () {
    function Course(id, title, publishedBy, href) {
        this.id = id;
        this.title = title;
        this.publishedBy = publishedBy;
        this.href = href;
    }
    return Course;
}());
var EduWave = /** @class */ (function () {
    function EduWave() {
        this.courses = [
            new Course('1', 'Fundamental Of Electrical Circuit', 'Mr. Vittapu', '#electrical-circuit'),
            new Course('2', 'Fundamental Of Software Engineering', 'Mr. Vittapu', '#software-engineering'),
            new Course('3', 'Human Computer Interaction', 'Mr. Mittapu', '#human-computer-interaction'),
            new Course('4', 'Computer Architecture and Organization', 'Mr. Abebe', '#computer-architecture'),
            new Course('5', 'Website Development', 'Mr. Betsegaw', '#website-development')
        ];
    }
    EduWave.prototype.createNavbar = function () {
        var navbar = document.createElement('nav');
        navbar.className = 'navbar navbar-expand-lg navbar-light bg-light py-3';
        navbar.innerHTML = "\n            <div class=\"container\">\n                <a class=\"navbar-brand d-flex align-items-center\" href=\"#\">\n                    <svg class=\"logo me-2\" viewBox=\"0 0 100 100\" width=\"40\" height=\"40\">\n                        <path d=\"M20,20 Q50,10 80,20 Q50,30 20,20\" fill=\"none\" stroke=\"black\" stroke-width=\"4\"/>\n                        <path d=\"M20,40 Q50,30 80,40 Q50,50 20,40\" fill=\"none\" stroke=\"black\" stroke-width=\"4\"/>\n                        <path d=\"M20,60 Q50,50 80,60 Q50,70 20,60\" fill=\"none\" stroke=\"black\" stroke-width=\"4\"/>\n                    </svg>\n                    EduWave\n                </a>\n                <button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#navbarNav\">\n                    <span class=\"navbar-toggler-icon\"></span>\n                </button>\n                <div class=\"collapse navbar-collapse justify-content-end\" id=\"navbarNav\">\n                    <ul class=\"navbar-nav\">\n                        <li class=\"nav-item\"><a class=\"nav-link\" href=\"#\">Home</a></li>\n                        <li class=\"nav-item\"><a class=\"nav-link\" href=\"#\">Courses</a></li>\n                        <li class=\"nav-item\"><a class=\"nav-link\" href=\"#\">Profile</a></li>\n                    </ul>\n                </div>\n            </div>\n        ";
        return navbar;
    };
    EduWave.prototype.createCourseCard = function (course) {
        var card = document.createElement('div');
        card.className = 'col-md-6 mb-4';
        card.innerHTML = "\n            <div class=\"course-card\">\n                <a href=\"".concat(course.href, "\" class=\"text-white text-decoration-none\">\n                    <h3>").concat(course.title, "</h3>\n                </a>\n                <p class=\"mt-auto text-end mb-0\">Published by ").concat(course.publishedBy, "</p>\n            </div>\n        ");
        return card;
    };
    EduWave.prototype.createCoursesSection = function () {
        var _this = this;
        var section = document.createElement('div');
        section.className = 'container py-5';
        section.innerHTML = "\n            <h1 class=\"display-4 mb-4\">Courses</h1>\n            <p class=\"lead mb-5\">\n                EduWave offers a rich collection of notes and presentations from teachers, covering various subjects\n                like Mathematics, Science, Art, and more. With interactive lessons and resources, it's designed to help\n                students learn, grow, and excel at their own pace.\n            </p>\n        ";
        var courseGrid = document.createElement('div');
        courseGrid.className = 'row g-4';
        this.courses.forEach(function (course) {
            courseGrid.appendChild(_this.createCourseCard(course));
        });
        section.appendChild(courseGrid);
        return section;
    };
    EduWave.prototype.render = function () {
        document.body.className = 'bg-light';
        document.body.appendChild(this.createNavbar());
        document.body.appendChild(this.createCoursesSection());
        // Add necessary styles
        var style = document.createElement('style');
        style.textContent = "\n            .course-card {\n                background-color: #000;\n                color: white;\n                border-radius: 15px;\n                padding: 20px;\n                height: 100%;\n                transition: transform 0.2s;\n            }\n            .course-card:hover {\n                transform: translateY(-5px);\n            }\n            .logo {\n                width: 40px;\n                height: 40px;\n            }\n            .nav-link {\n                color: #000;\n                font-weight: 500;\n            }\n            .nav-link:hover {\n                color: #666;\n            }\n        ";
        document.head.appendChild(style);
    };
    return EduWave;
}());
// Run the application
window.onload = function () {
    var app = new EduWave();
    app.render();
};
