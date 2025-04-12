// Data for courses
var courses = [
    {
        title: "Website Development",
        chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"],
        notes: [
            { title: "How to Work on HTML", description: "Write your HTML code in a .html file and open it in a browser." },
            { title: "How to Work on CSS", description: "Link your .css file to your HTML and style your webpage." },
        ],
    },
    {
        title: "JavaScript Basics",
        chapters: ["Introduction", "Variables", "Functions", "DOM Manipulation"],
        notes: [
            { title: "Working with Variables", description: "Learn how to declare and use variables in JavaScript." },
            { title: "DOM Manipulation", description: "Learn how to modify HTML elements dynamically." },
        ],
    },
];
// References to HTML elements
var courseTitleElement = document.getElementById("course-title");
var chaptersElement = document.getElementById("chapters");
var notesElement = document.getElementById("notes");
var addNoteButton = document.querySelector(".add-note-btn");
// Track the currently selected course
var currentCourseIndex = 0;
// Function to render chapters
function renderChapters(chapters) {
    chaptersElement.innerHTML = ""; // Clear previous chapters
    chapters.forEach(function (chapter) {
        var chapterButton = document.createElement("button");
        chapterButton.className = "chapter-btn";
        chapterButton.textContent = chapter;
        chaptersElement.appendChild(chapterButton);
    });
}
// Function to render notes
function renderNotes(notes) {
    notesElement.innerHTML = ""; // Clear previous notes
    notes.forEach(function (note) {
        var noteCard = "\n        <div class=\"col-md-6\">\n          <div class=\"card note-card p-3\">\n            <h5 class=\"card-title\">".concat(note.title, "</h5>\n            <p class=\"card-text\">").concat(note.description, "</p>\n            <a href=\"#\" class=\"text-decoration-none\">\u270F\uFE0F</a>\n          </div>\n        </div>\n      ");
        notesElement.innerHTML += noteCard;
    });
}
// Function to render the selected course
function renderCourse(courseIndex) {
    currentCourseIndex = courseIndex;
    var course = courses[courseIndex];
    courseTitleElement.textContent = course.title;
    renderChapters(course.chapters);
    renderNotes(course.notes);
}
// Event Listener for the "+" button to add a new note
addNoteButton.addEventListener("click", function () {
    var newNoteTitle = prompt("Enter the note title:");
    var newNoteDescription = prompt("Enter the note description:");
    if (newNoteTitle && newNoteDescription) {
        // Add the new note to the current course
        courses[currentCourseIndex].notes.push({
            title: newNoteTitle,
            description: newNoteDescription,
        });
        // Re-render the notes
        renderNotes(courses[currentCourseIndex].notes);
    }
});
// Simulate clicking a course from a Courses Page
function simulateCourseChange() {
    var coursesPage = document.createElement("div");
    coursesPage.style.position = "fixed";
    coursesPage.style.bottom = "10px";
    coursesPage.style.left = "10px";
    courses.forEach(function (course, index) {
        var courseButton = document.createElement("button");
        courseButton.textContent = course.title;
        courseButton.className = "btn btn-primary m-1";
        courseButton.addEventListener("click", function () {
            renderCourse(index);
        });
        coursesPage.appendChild(courseButton);
    });
    document.body.appendChild(coursesPage);
}
// Initial Render
renderCourse(currentCourseIndex);
simulateCourseChange();
