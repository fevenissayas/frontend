var DocumentManager = /** @class */ (function () {
    function DocumentManager() {
        this.chaptersContainer = document.getElementById('chaptersContainer');
        this.initialize();
    }
    DocumentManager.prototype.initialize = function () {
        var _this = this;
        // Add button click handler
        var addButton = document.getElementById('addButton');
        if (addButton) {
            addButton.addEventListener('click', function () { return _this.addNewChapter(); });
        }
        // Initialize existing chapters (if any)
        this.setupChapterListeners();
    };
    DocumentManager.prototype.addNewChapter = function () {
        var chapterNumber = this.chaptersContainer.children.length + 1;
        var chapterItem = document.createElement('div');
        chapterItem.className = 'chapter-item mb-3'; // Add margin class for spacing
        chapterItem.innerHTML = "\n            <button class=\"chapter-button list-group-item list-group-item-action d-flex justify-content-between align-items-center bg-dark text-white border-0 rounded-3\">\n                <span class=\"chapter-text\" contenteditable=\"true\">Chapter ".concat(chapterNumber, "</span>\n                <span class=\"file-name\"></span>\n                <span class=\"minus-icon cursor-pointer\">\u2212</span>\n            </button>\n        ");
        this.chaptersContainer.appendChild(chapterItem);
        this.setupChapterListeners();
    };
    DocumentManager.prototype.setupChapterListeners = function () {
        var _this = this;
        // Remove all existing listeners first
        var existingIcons = document.querySelectorAll('.minus-icon');
        existingIcons.forEach(function (icon) {
            var _a;
            var newIcon = icon.cloneNode(true);
            (_a = icon.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(newIcon, icon);
        });
        // Add new listeners for minus icons
        var minusIcons = document.querySelectorAll('.minus-icon');
        minusIcons.forEach(function (icon) {
            icon.addEventListener('click', function (e) { return _this.removeChapter(e); });
        });
        // Add listeners for chapter text editing
        var chapterTexts = document.querySelectorAll('.chapter-text');
        chapterTexts.forEach(function (text) {
            // Make text editable on click
            text.addEventListener('click', function () {
                text.contentEditable = 'true';
                text.focus();
            });
            text.addEventListener('keydown', function (e) {
                var keyboardEvent = e;
                var target = keyboardEvent.target;
                if (keyboardEvent.key === 'Enter') {
                    e.preventDefault();
                    target.contentEditable = 'false';
                    target.blur();
                }
            });
            text.addEventListener('blur', function () {
                var _a;
                var textElement = text;
                textElement.contentEditable = 'false';
                if (!((_a = textElement.textContent) === null || _a === void 0 ? void 0 : _a.trim())) {
                    textElement.textContent = "Chapter ".concat(_this.getChapterIndex(textElement) + 1);
                }
            });
        });
        // Add listeners for chapter buttons (file upload)
        var chapterButtons = document.querySelectorAll('.chapter-button');
        chapterButtons.forEach(function (button) {
            button.addEventListener('click', function (e) {
                var target = e.target;
                // Don't trigger file upload if clicking on the text or minus icon
                if (target.classList.contains('chapter-text') || target.classList.contains('minus-icon')) {
                    return;
                }
                _this.handleFileUpload();
            });
        });
    };
    DocumentManager.prototype.getChapterIndex = function (element) {
        var chapterItem = element.closest('.chapter-item');
        if (!chapterItem)
            return 0;
        return Array.from(this.chaptersContainer.children).indexOf(chapterItem);
    };
    DocumentManager.prototype.removeChapter = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var icon = event.target;
        var chapterItem = icon.closest('.chapter-item');
        if (chapterItem && chapterItem.parentElement) {
            chapterItem.parentElement.removeChild(chapterItem);
        }
    };
    DocumentManager.prototype.handleFileUpload = function () {
        var _this = this;
        var fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.pdf,.doc,.docx,.txt'; // You can customize accepted file types
        fileInput.addEventListener('change', function (e) {
            var _a;
            var target = e.target;
            var file = (_a = target.files) === null || _a === void 0 ? void 0 : _a[0];
            if (file) {
                // Here you can handle the file upload
                console.log('Selected file:', file.name);
                // You can add your file upload logic here
                // For example, sending to a server using FormData
                _this.uploadFile(file);
            }
        });
        fileInput.click(); // Trigger file picker
    };
    DocumentManager.prototype.uploadFile = function (file) {
        // Example upload function
        var formData = new FormData();
        formData.append('file', file);
        // You can implement your upload logic here
        // For example:
        /*
        fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Upload successful:', data);
            // Handle successful upload
        })
        .catch(error => {
            console.error('Upload failed:', error);
      '*/ 
    };
    return DocumentManager;
}());
