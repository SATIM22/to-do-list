const buttonAddCategorie = document.getElementById('button-new-categorie');
buttonAddCategorie.addEventListener("click", () => {
        const categorie = prompt('Please enter the name of the new categorie');
        if (categorie) {
            saveCategorieLocalStorage(categorie);
            displayCategories();
        } else {
            alert("The prompt could 'not be empty");
        }
    })
    /* function addCategorie(categorie) {
        const categoriesul = document.getElementById('categorie-lists');
        const categorieElement = document.createElement('li');
    }
     */
function generateId() {
    return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

function saveCategorieLocalStorage(categorie) {
    let categories = localStorage.getItem('categories');
    const date = new Date();
    const newcategorie = {
        id: generateId(),
        text: categorie,
        dateCreated: date.toISOString()
    }
    console.log('ff', newcategorie);
    console.log('local', categories);
    if (categories) {
        try {
            categories = JSON.parse(categories);
            if (!Array.isArray(categories)) {
                categories = []; // Reset if the stored data is not an array
            }
        } catch (e) {
            console.error('Error parsing JSON from localStorage:', e);
            categories = []; // Reset if there was an error parsing
        }
    } else {
        categories = [];
    }
    console.log('fffggggggg', categories);
    categories.push(newcategorie);
    localStorage.setItem('categories', JSON.stringify(categories));
    console.log('local s', categories);
}

function displayCategories() {
    const categoriesul = document.getElementById('categorie-lists');
    let categories = [];
    let displayedCategories = new Set()
    categoriesparsed = localStorage.getItem('categories');
    categories = JSON.parse(categoriesparsed);
    if (categories) {
        categoriesul.innerHTML = '';
        categories.forEach(categorie => {
            const categorieElement = document.createElement('li');
            categorieElement.style.padding = "10px 9px";
            categorieElement.style.margin = "5px 7px";
            categorieElement.style.curser = "pointer";
            categorieElement.textContent = categorie.text;
            categoriesul.appendChild(categorieElement);
        });
    }
}

function appearDate() {
    const todaydate = document.getElementById('date');
    const greetingexp = document.getElementById('greeting');
    const date = new Date();
    const cformat = date.toLocaleString();
    todaydate.textContent = cformat;
    const currenthour = date.getHours();
    let greeting;
    if (currenthour < 12) {
        greeting = 'Good Morning'
    } else if (currenthour < 18) {
        greeting = 'Good Afternoon'
    } else { greeting = 'Good Evening' }
    greetingexp.textContent = greeting;
}
const buttontask = document.getElementById('button-new-task');
const baddtask = document.getElementById('addtask');
const taskinput = document.getElementById('task-input');
const ultasks = document.getElementById('ultasks');
const taskdate = document.getElementById('taskdate');
const tasknotes = document.getElementById('tasknotes');
const selectday = document.getElementById('selectday');
const calendar = document.getElementById('calendar');
const taskdiv = document.querySelector('.divtask');
const maincontent = document.querySelector('.main-content');
taskdiv.style.display = 'none';
calendar.style.display = 'none';
selectday.addEventListener('click', () => {
    const calendarc = flatpickr("#calendar", {
        inline: true,
        onDayCreate: function(dObj, dStr, fp, dayElem) {
            // Format the date to match the plannedDates format (YYYY-MM-DD)
            const dateStr = dayElem.dateObj.toISOString().split('T')[0];
            // Check if the date is in the plannedDates array
            if (plannedDates.includes(dateStr)) {
                // Apply custom style to highlight the date
                dayElem.style.backgroundColor = '#FFDD57'; // Custom color
                dayElem.style.color = '#000'; // Text color
                dayElem.style.borderRadius = '50%'; // Optional: make it a circle
            }
        }
    });
    if (calendar.style.display === 'none') {
        calendar.style.display === 'block'
    }
    document.addEventListener('click', (event) => {
        calendar.style.display = 'none';
    });
})
const date = new Date();
buttontask.addEventListener('click', () => {
    if (taskdiv.style.display === 'none' || taskdiv.style.display === '') {
        taskdiv.style.display = 'block';
    } else {
        taskdiv.style.display = 'none';
    }
})
baddtask.addEventListener('click', () => {
    addtask();
    taskinput.value = '';
})

function addtask() {
    const taskvalue = taskinput.value;
    const datevalue = taskdate.value;
    const notesvalue = tasknotes.value;
    if (taskvalue !== '') {
        let tasks = localStorage.getItem('tasks');
        const newtask = {
            id: generateId(),
            text: taskvalue,
            taskdate: datevalue,
            tasknotes: notesvalue,
            datecreated: date.toDateString(),
            completed: false
        }
        if (tasks) {
            try {
                tasks = JSON.parse(tasks);
                if (!Array.isArray(tasks)) {
                    tasks = []; // Reset if the stored data is not an array
                }
            } catch (e) {
                console.error('Error parsing JSON from localStorage:', e);
                tasks = []; // Reset if there was an error parsing
            }
        } else {
            tasks = [];
        }
        tasks.push(newtask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskdiv.style.display = 'none';
        tasksdisplay();
    }
}

function savetasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskStyle(elementid, completed, taskelement) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskindex = tasks.findIndex(task => task.id === elementid)
    if (taskindex !== -1) {
        tasks[taskindex] = {...tasks[taskindex], completed };
        savetasks(tasks);
    }
    if (completed) {
        taskelement.style.backgroundColor = '#e3f0d9'
    } else {
        taskelement.style.backgroundColor = ''
    }

}

function tasksdisplay() {
    const currentdate = new Date().toISOString().split('T')[0];
    let tasks = localStorage.getItem('tasks');
    if (tasks) {
        tasks = JSON.parse(tasks);
        if (!Array.isArray(tasks)) {
            tasks = [];
        }
        ultasks.innerHTML = '';
        const tasksfiltered = tasks.filter(task => task.taskdate === currentdate);
        console.log('filtredd', tasksfiltered)
        tasksfiltered.forEach(element => {
            const taskelement = document.createElement("li");
            const plusbutton = document.createElement("button");
            const plusdiv = document.createElement('div');
            plusdiv.classList.add('divplus');
            plusdiv.style.height = '190px';
            plusdiv.style.width = '890px';
            plusdiv.style.backgroundColor = '#efefef';
            plusdiv.style.display = 'none';
            plusdiv.style.position = 'relative';
            plusdiv.style.left = '-40px';
            plusdiv.style.margin = '10px 18px';
            plusdiv.style.borderRadius = '8px';
            plusbutton.textContent = 'notes';
            plusdiv.textContent = element.tasknotes;
            plusbutton.style.border = '1px gray solid'
            plusbutton.style.height = '30px';
            plusbutton.style.width = '45px';
            plusbutton.style.fontSize = '11px';
            plusbutton.style.position = 'absolute';
            plusbutton.style.right = '30px';
            plusbutton.style.marginTop = '-1px';
            plusbutton.style.textAlign = 'center';
            plusbutton.style.backgroundColor = '#efefef';
            plusbutton.style.borderRadius = '5px';
            plusbutton.style.cursor = 'pointer';
            plusbutton.style.fontStyle = 'bold';
            const checkbox = document.createElement("input");
            checkbox.classList.add('checkbox');
            checkbox.type = "checkbox";
            checkbox.style.width = '19px';
            checkbox.style.height = '19px';
            checkbox.style.borderRadius = '3px';
            checkbox.checked = element.completed;
            updateTaskStyle(element.id, checkbox.checked, taskelement);
            checkbox.addEventListener('change', () => {
                updateTaskStyle(element.id, checkbox.checked, taskelement);
            });
            plusbutton.addEventListener('click', () => {
                if (plusdiv.style.display === 'none' || plusdiv.style.display === '') {
                    plusdiv.style.display = 'block';
                } else {
                    plusdiv.style.display = 'none';
                }
            })
            taskelement.textContent = element.text;
            taskelement.appendChild(checkbox);
            taskelement.appendChild(plusbutton);
            taskelement.appendChild(plusdiv);
            ultasks.appendChild(taskelement);
            document.addEventListener('click', (event) => {
                if (plusdiv.style.display === 'block' && !plusdiv.contains(event.target) && event.target !== plusbutton) {
                    plusdiv.style.display = 'none';
                }
            });
        })
    }
}

function completedcheck() {

}
const plannedDates = ["2024-08-12", "2024-08-15", "2024-08-20"];

tasksdisplay();
window.onload = displayCategories();
/*window.onload = tasksdisplay(); */
window.onload = appearDate();
console.log('width', window.innerWidth)
    /* window.addEventListener('resize', function() {
                if (window.innerWidth < 600) {
                    document.querySelector('.sidebar').style.display = 'none';
                }
            }); */