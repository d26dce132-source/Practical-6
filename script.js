// ==========================================
// GLOBAL VARIABLES
// ==========================================

let events = [];
let students = [];
let notices = [];
let faqs = [];

let currentEventPage = 1;
let currentStudentPage = 1;
let currentNoticePage = 1;

const itemsPerPage = 4;


// ==========================================
// LOAD JSON DATA USING FETCH API
// ==========================================

async function loadData() {

    try {

        const eventResponse = await fetch("data/events.json");
        events = await eventResponse.json();

        const studentResponse = await fetch("data/students.json");
        students = await studentResponse.json();

        const noticeResponse = await fetch("data/notices.json");
        notices = await noticeResponse.json();

        const faqResponse = await fetch("data/faqs.json");
        faqs = await faqResponse.json();

        displayEvents(events);
        displayStudents(students);
        displayNotices(notices);
        displayFAQs(faqs);

    } catch (error) {

        console.error("Error loading JSON files:", error);

        document.getElementById("eventList").innerHTML =
            '<p class="no-data">Error loading data.</p>';

    }
}


// ==========================================
// NAVIGATION
// ==========================================

function showSection(sectionId) {

    const sections = document.querySelectorAll(".section");

    sections.forEach(function(section) {
        section.classList.add("hidden");
    });

    document.getElementById(sectionId).classList.remove("hidden");
}


// ==========================================
// EVENTS
// ==========================================

function displayEvents(list) {

    const container = document.getElementById("eventList");

    const start = (currentEventPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const pageItems = list.slice(start, end);

    container.innerHTML = "";

    if (pageItems.length === 0) {

        container.innerHTML =
            '<p class="no-data">No events found.</p>';

        document.getElementById("eventPagination").innerHTML = "";

        return;
    }

    pageItems.forEach(function(event) {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML =
            "<h3>" + event.title + "</h3>" +

            "<p><strong>Date:</strong> " +
            event.date +
            "</p>" +

            "<p><strong>Location:</strong> " +
            event.location +
            "</p>" +

            "<p><strong>Description:</strong> " +
            event.description +
            "</p>" +

            '<span class="badge">' +
            event.category +
            "</span>";

        container.appendChild(card);

    });

    createPagination(
        list.length,
        currentEventPage,
        "eventPagination",
        function(page) {

            currentEventPage = page;
            displayEvents(list);

        }
    );
}


// SEARCH EVENTS

function searchEvents() {

    currentEventPage = 1;

    const searchText =
        document.getElementById("eventSearch")
        .value
        .toLowerCase();

    const category =
        document.getElementById("eventFilter").value;

    const result = events.filter(function(event) {

        const matchesSearch =
            event.title.toLowerCase().includes(searchText) ||
            event.description.toLowerCase().includes(searchText);

        const matchesCategory =
            category === "all" ||
            event.category === category;

        return matchesSearch && matchesCategory;

    });

    displayEvents(result);
}


// FILTER EVENTS

function filterEvents() {
    searchEvents();
}


// SORT EVENTS

function sortEvents() {

    const sortType =
        document.getElementById("eventSort").value;

    let result = [...events];

    if (sortType === "titleAsc") {

        result.sort(function(a, b) {
            return a.title.localeCompare(b.title);
        });

    }

    else if (sortType === "titleDesc") {

        result.sort(function(a, b) {
            return b.title.localeCompare(a.title);
        });

    }

    else if (sortType === "dateAsc") {

        result.sort(function(a, b) {
            return new Date(a.date) - new Date(b.date);
        });

    }

    else if (sortType === "dateDesc") {

        result.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
        });

    }

    currentEventPage = 1;

    displayEvents(result);
}


// ==========================================
// STUDENTS
// ==========================================

function displayStudents(list) {

    const container =
        document.getElementById("studentList");

    const start =
        (currentStudentPage - 1) * itemsPerPage;

    const end =
        start + itemsPerPage;

    const pageItems =
        list.slice(start, end);

    container.innerHTML = "";

    if (pageItems.length === 0) {

        container.innerHTML =
            '<p class="no-data">No students found.</p>';

        document.getElementById("studentPagination").innerHTML = "";

        return;
    }

    pageItems.forEach(function(student) {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML =
            "<h3>" + student.name + "</h3>" +

            "<p><strong>ID:</strong> " +
            student.id +
            "</p>" +

            "<p><strong>Email:</strong> " +
            student.email +
            "</p>" +

            "<p><strong>Department:</strong> " +
            student.department +
            "</p>" +

            "<p><strong>Semester:</strong> " +
            student.semester +
            "</p>";

        container.appendChild(card);

    });

    createPagination(
        list.length,
        currentStudentPage,
        "studentPagination",
        function(page) {

            currentStudentPage = page;
            displayStudents(list);

        }
    );
}


// SEARCH STUDENTS

function searchStudents() {

    currentStudentPage = 1;

    const searchText =
        document.getElementById("studentSearch")
        .value
        .toLowerCase();

    const department =
        document.getElementById("studentFilter").value;

    const result = students.filter(function(student) {

        const matchesSearch =
            student.name.toLowerCase().includes(searchText) ||
            student.id.toLowerCase().includes(searchText);

        const matchesDepartment =
            department === "all" ||
            student.department === department;

        return matchesSearch && matchesDepartment;

    });

    displayStudents(result);
}


// FILTER STUDENTS

function filterStudents() {
    searchStudents();
}


// SORT STUDENTS

function sortStudents() {

    const sortType =
        document.getElementById("studentSort").value;

    let result = [...students];

    if (sortType === "nameAsc") {

        result.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });

    }

    else if (sortType === "nameDesc") {

        result.sort(function(a, b) {
            return b.name.localeCompare(a.name);
        });

    }

    currentStudentPage = 1;

    displayStudents(result);
}


// ==========================================
// NOTICES
// ==========================================

function displayNotices(list) {

    const container =
        document.getElementById("noticeList");

    const start =
        (currentNoticePage - 1) * itemsPerPage;

    const end =
        start + itemsPerPage;

    const pageItems =
        list.slice(start, end);

    container.innerHTML = "";

    if (pageItems.length === 0) {

        container.innerHTML =
            '<p class="no-data">No notices found.</p>';

        document.getElementById("noticePagination").innerHTML = "";

        return;
    }

    pageItems.forEach(function(notice) {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML =
            "<h3>" + notice.title + "</h3>" +

            "<p><strong>Date:</strong> " +
            notice.date +
            "</p>" +

            "<p>" +
            notice.message +
            "</p>";

        container.appendChild(card);

    });

    createPagination(
        list.length,
        currentNoticePage,
        "noticePagination",
        function(page) {

            currentNoticePage = page;
            displayNotices(list);

        }
    );
}


// SEARCH NOTICES

function searchNotices() {

    currentNoticePage = 1;

    const searchText =
        document.getElementById("noticeSearch")
        .value
        .toLowerCase();

    const result = notices.filter(function(notice) {

        return (
            notice.title.toLowerCase().includes(searchText) ||
            notice.message.toLowerCase().includes(searchText)
        );

    });

    displayNotices(result);
}


// ==========================================
// FAQ
// ==========================================

function displayFAQs(list) {

    const container =
        document.getElementById("faqList");

    container.innerHTML = "";

    if (list.length === 0) {

        container.innerHTML =
            '<p class="no-data">No FAQs found.</p>';

        return;
    }

    list.forEach(function(faq, index) {

        const item = document.createElement("div");

        item.className = "faq-item";

        const question = document.createElement("button");

        question.className = "faq-question";

        question.textContent = faq.question;

        question.onclick = function() {
            toggleFAQ(index);
        };

        const answer = document.createElement("div");

        answer.id = "faq-answer-" + index;

        answer.className = "faq-answer";

        answer.textContent = faq.answer;

        item.appendChild(question);
        item.appendChild(answer);

        container.appendChild(item);

    });
}


// TOGGLE FAQ

function toggleFAQ(index) {

    const answer =
        document.getElementById("faq-answer-" + index);

    answer.classList.toggle("active");
}


// SEARCH FAQ

function searchFAQs() {

    const searchText =
        document.getElementById("faqSearch")
        .value
        .toLowerCase();

    const result = faqs.filter(function(faq) {

        return (
            faq.question.toLowerCase().includes(searchText) ||
            faq.answer.toLowerCase().includes(searchText)
        );

    });

    displayFAQs(result);
}


// ==========================================
// PAGINATION
// ==========================================

function createPagination(
    totalItems,
    currentPage,
    containerId,
    changePage
) {

    const container =
        document.getElementById(containerId);

    container.innerHTML = "";

    const totalPages =
        Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) {
        return;
    }


    // PREVIOUS BUTTON

    if (currentPage > 1) {

        const previousButton =
            document.createElement("button");

        previousButton.textContent = "Previous";

        previousButton.onclick = function() {
            changePage(currentPage - 1);
        };

        container.appendChild(previousButton);
    }


    // PAGE NUMBERS

    for (let i = 1; i <= totalPages; i++) {

        const button =
            document.createElement("button");

        button.textContent = i;

        if (i === currentPage) {
            button.classList.add("active");
        }

        button.onclick = function() {
            changePage(i);
        };

        container.appendChild(button);
    }


    // NEXT BUTTON

    if (currentPage < totalPages) {

        const nextButton =
            document.createElement("button");

        nextButton.textContent = "Next";

        nextButton.onclick = function() {
            changePage(currentPage + 1);
        };

        container.appendChild(nextButton);
    }
}


// ==========================================
// START APPLICATION
// ==========================================

loadData();