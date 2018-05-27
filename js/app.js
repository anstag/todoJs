; const main = (document => {
    function createElement(tag, props, ...children) {
        const element = document.createElement(tag);

        Object.keys(props).forEach( key => {
            element[key] = props[key];
        });

        if (children.length > 0) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    child = document.createTextNode(child);
                }

                element.appendChild(child);
            });
        }

        return element;
    }

    function createTodoItem(title) {
        // const checkbox = document.createElement('input');
        // checkbox.type = 'checkbox';
        // checkbox.className = 'checkbox';
        // const label = document.createElement('label');
        // label.innerText = title;
        // label.className = 'title';
        // const editInput = document.createElement('input');
        // editInput.type = 'text';
        // editInput.className = 'textfield';
        // const editButton = document.createElement('button');
        // editButton.innerText = 'Изменить';
        // editButton.className = 'edit';
        // const deleteButton = document.createElement('button');
        // deleteButton.innerText = 'Удалить';
        // deleteButton.className = 'delete';
        // const listItem = document.createElement('li');
        // listItem.className = 'todo-item';
        // listItem.appendChild(checkbox);
        // listItem.appendChild(label);
        // listItem.appendChild(editInput);
        // listItem.appendChild(editButton);
        // listItem.appendChild(deleteButton);

        const checkbox = createElement('input', {
            type: 'checkbox',
            className: 'checkbox'
        });

        const label = createElement('label', {
            className: 'title'
        }, title);

        const editInput = createElement('input', {
            type: 'text',
            className: 'textfield'
        });

        const editButton = createElement('button', {
            className: 'edit'
        }, 'Изменить');

        const deleteButton = createElement('button', {
            className: 'delete'
        }, 'Удалить');

        const listItem = createElement('li', {
            className: 'todo-item'
        }, checkbox, label, editInput, editButton, deleteButton);

        bindEvents(listItem);

        return listItem;
    }

    function bindEvents(todoItem) {
        const checkbox = todoItem.querySelector('.checkbox');
        const editButton = todoItem.querySelector('button.edit');
        const deleteButton = todoItem.querySelector('button.delete');

        checkbox.addEventListener('change', toggleTodoItem);
        editButton.addEventListener('click', editTodoItem);
        deleteButton.addEventListener('click', deleteTodoItem);
    }

    function addTodoItem(event) {
        event.preventDefault();

        if (addInput.value === '') {
            return alert('Введите название задачи!');
        }

        const todoItem = createTodoItem(addInput.value);
        todoList.appendChild(todoItem);
        addInput.value = '';
    }

    function toggleTodoItem() {
        const listItem = this.parentElement;
        listItem.classList.toggle('completed');
    }

    function editTodoItem() {
        const listItem = this.parentElement;
        const title = listItem.querySelector('.title');
        const editInput = listItem.querySelector('.textfield');
        const isEditing = listItem.classList.contains('editing');

        if (isEditing) {
            title.innerText = editInput.value;
            this.innerText = 'Изменить';
        } else {
            editInput.value = title.innerText;
            this.innerText = 'Сохранить';
        }

        listItem.classList.toggle('editing');
    }

    function deleteTodoItem() {
        const listItem = this.parentElement;
        todoList.removeChild(listItem);
    }

    // function load() {
    //     const data = JSON.parse(localStorage.getItem('todos'));
    //     return data;
    // }
    //
    // function save(data) {
    //     const string = JSON.stringify(data);
    //     localStorage.setItem('todos', string);
    // }

    function main() {
        todoForm.addEventListener('submit', addTodoItem);
        todoItems.forEach( item => bindEvents(item) );
    }

    const todoForm = document.getElementById('todo-form');
    const addInput = document.getElementById('add-input');
    const todoList = document.getElementById('todo-list');
    const todoItems = document.querySelectorAll('.todo-item');

    return main;
})(document);

main();
