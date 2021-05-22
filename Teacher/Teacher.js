class Teacher {
    constructor(id, name, subject, phoneNumber, email){
        this.id = id;
        this.name = name;
        this.subject = subject;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}

class UI {
    static displayTeachers(){
        const teachers = Store.getTeachers();
        teachers.forEach((teacher) => UI.addTeacher(teacher));
    }

    static addTeacher(teacher){
        const list = document.getElementById('teacher-list');
        const newTeacher = document.createElement('tr');
        newTeacher.innerHTML = `
            <td>${teacher.id}</td>
            <td>${teacher.name}</td>
            <td>${teacher.subject}</td>
            <td>${teacher.phoneNumber}</td>
            <td>${teacher.email}</td>
            <td><a href="" class="btn btn-danger btn-sm delete">X</a></td>
            <td><a href="" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(newTeacher);
    }

    static clearField(){
        document.getElementById('id').value = '';
        document.getElementById('name').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('phoneNumber').value = '';
        document.getElementById('email').value = '';
    }

    static removeTeacher(e){
        if(e.classList.contains('delete')){
            if(confirm("Bạn chắc chắn có muốn xóa không ?")){
                e.parentElement.parentElement.remove();
            }
        }
    }

    static showAlert(message, className){
        const container = document.querySelector('.container');
        const form = document.querySelector('#teacher-form');
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}

class Store {
    static getTeachers(){
        let teachers;
        if(localStorage.getItem('teachers') == null){
            teachers = [];
        } else {
            teachers = JSON.parse(localStorage.getItem('teachers'));
        }
        return teachers;
    }

    static addTeacher(teacher){
        const teachers = Store.getTeachers();
        teachers.push(teacher);
        localStorage.setItem('teachers', JSON.stringify('teachers')); 
    }

    static removeTeacher(id){
        const teachers = Store.getTeachers();
        teachers.forEach((teacher, index) => {
            if(teacher.id === id){
                teachers.splice(index, 1);
            }
            localStorage.setItem('teachers', JSON.stringify('teachers'));
        });
    }
}

document.addEventListener('DOMContentLoaded', UI.displayTeachers);

const form = document.getElementById('teacher-form');
form.addEventListener('submit', add);
function add(e){
    e.preventDefault();
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const subject = document.getElementById('subject').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;

    if(id === '' || name === '' || subject === '' || phoneNumber === '' || email === ''){
        UI.showAlert('Chú ý điền đầy đủ thông tin', 'danger');
    } else {
        const teacher = new Teacher(id, name, subject, phoneNumber, email);
        UI.addTeacher(teacher);
        Store.addTeacher(teacher);
        UI.clearField();
        UI.showAlert('Đã thêm giáo viên mới', 'success');
    }
}

const list = document.getElementById('teacher-list');
list.addEventListener('click', remove);
function remove(e){
    e.preventDefault();
    UI.removeTeacher(e.target);
    Store.removeTeacher(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Đã xóa giáo viên', 'success');
}

