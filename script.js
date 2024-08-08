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
    categoriesul.innerHTML = '';
    if (categories) {
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
    const cformat = date.toISOString().split('T')[0];
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
window.onload = displayCategories();
window.onload = appearDate();
console.log('widthggg', window.innerWidth)
    /* window.addEventListener('resize', function() {
        if (window.innerWidth < 600) {
            document.querySelector('.sidebar').style.display = 'none';
        }
    }); */