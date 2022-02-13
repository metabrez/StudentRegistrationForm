// Book Class: Represent student
class Student {
    constructor(registration, name, grade, address) {
        this.registration = registration;
        this.name = name;
        this.grade = grade;
        this.address = address;
    }
}
// UI class: Handle UI tasks
class UI {
    static displayStudents() {
        const registeredStudents = [
            {
                registration: '123',
                name: 'Tabrez',
                grade: '9',
                address: 'Providence'
            },
            {
                registration: '124',
                name: 'Jack',
                grade: '8',
                address: 'Smithfield'
            }
        ];
        const students = registeredStudents;
        // Loop the books and add it to the list
        students.forEach((student) => UI.addStudentToList(student));

        console.log(students)

    }
    static addStudentToList(student) {
        const list = document.querySelector('#student-list');
        // Create tr element to keep the students info in the table.
        const row = document.createElement('tr');

        row.innerHTML = `
                    <td>${student.registration}</td>
                    <td>${student.name}</td>
                    <td>${student.grade}</td>
                    <td>${student.address}</td>
                     <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
        // append the row to the list
        list.appendChild(row);
        console.log(student)
    }

    // Delete Student 
    static deleteStudent(el) {
        if (el.classList.contains('delete')) {
            // this below code first goes to td and then it will look for // its parent ie tr. 
            el.parentElement.parentElement.remove();
        }
    }
    // show Alert
    // Adding the div to display danger or success message.
    // <div class = "alert alert-danger">
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#student-form');
        container.insertBefore(div, form);

        // Vanish alert in 5 secons.
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
    // Clear Student after submitting 
    static clearStudent() {
        document.querySelector('#registration').value = '';
        document.querySelector('#name').value = '';
        document.querySelector('#grade').value = '';
        document.querySelector('#address').value = '';
    }

}
// Store Class: Handles storage

// Event: Display Students

document.addEventListener('DOMContentLoaded', UI.displayStudents);

// Event: Add a Student
const registrationForm = document.querySelector('#registration-form');
registrationForm.addEventListener('submit', (e) => {
    // prevent default action
    e.preventDefault();
    const registration = document.querySelector('#registration').value;
    const name = document.querySelector('#name').value;
    const grade = document.querySelector('#grade').value;
    const address = document.querySelector('#address').value;

    // Validate the student form field
    if (registration === '' || name === '' || grade === '' || address === '') {
        UI.showAlert('please fill all the fields', 'danger')
        console.log('book empty')

    } else {
        // Instantiate Student
        const student = new Student(registration, name, grade, address);

        //console.log('Adding student', student)
        // Add student to the list
        UI.addStudentToList(student);

        // Show student registered information alert

        UI.showAlert('Student registered', 'success')
        // Clear the student 
        UI.clearStudent();
    }

});
// Event: Remove a Student
document.querySelector('#student-list').addEventListener('click', (e) => {
    console.log(e.target)
    UI.deleteStudent(e.target);
})