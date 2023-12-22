console.log('안녕하세요')

const list = document.getElementById('list');
const createBtn = document.getElementById('create-btn'); ////변수 변경

let todo = [];

createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
    const item = {
        id: new Date().getTime(),
        text: '',
        complete: false
    };

    todo.unshift(item);

    // 요소 생성하기
    const { itemEl, inputEl, editBtnEl, removeBtnEl } = createTodoElement(item);
    list.prepend(itemEl);

    inputEl.removeAttribute('disabled');

    inputEl.focus();
    saveToLocalStorage();
}

function createTodoElement(item) {
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = item.complete;
    if (item.complete) {
        itemEl.classList.add('complete');
    }

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute('disabled', '');

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons', 'remove-btn');
    removeBtnEl.innerText = 'remove_circles';

    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked;

        if (item.complete) {
            itemEl.classList.add('complete');
        } else {
            itemEl.classList.remove('complete');
        }
        saveToLocalStorage();
    });

    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled', '');
        saveToLocalStorage();
    });

    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
    });

    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
    });

    removeBtnEl.addEventListener('click', () => {
        todo = todo.filter(t => t.id !== item.id);
        
        itemEl.remove();
        saveToLocalStorage();
    });

    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);

    return { itemEl, inputEl, editBtnEl, removeBtnEl };
}

function saveToLocalStorage() {
    const data = JSON.stringify(todo);

    //window.localStorage.setItem('my_todo', data);
    localStorage.setItem('my_todo', data);
}

function loadFromLocalStorage() {
    const data = localStorage.getItem('my_todo');

    if(data) {
        todo = JSON.parse(data);
    }
}

function displayTodo() {
    loadFromLocalStorage();

    for (let i = 0; i < todo.length; i++) {
        const item = todo[i];
        const { itemEl } = createTodoElement(item);
        
        list.append(itemEl);
    }

}

displayTodo();