// Función para registrar un nuevo usuario
function registerUser() {
    // Obtener los valores del formulario de registro
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    // Verificar si el usuario ya existe
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username]) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Username already exists!',
        });
        return false;
    }

    // Guardar el nuevo usuario en localStorage
    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));

    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Registration successful!',
    });
    return false; // Evitar que el formulario se envíe de forma tradicional
}

// Función para iniciar sesión
function loginUser() {
    // Obtener los valores del formulario de inicio de sesión
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Verificar las credenciales
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username] === password) {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Login successful!',
        });
        return false; // Evitar que el formulario se envíe de forma tradicional
    }

    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Invalid username or password!',
    });
    return false; // Evitar que el formulario se envíe de forma tradicional
}

// Cargar conceptos desde el archivo JSON
async function loadConcepts() {
    const response = await fetch('data/concepts.json');
    const concepts = await response.json();
    localStorage.setItem('concepts', JSON.stringify(concepts));
}

// Cargar contactos desde el archivo JSON
async function loadContacts() {
    const response = await fetch('data/contacts.json');
    const contacts = await response.json();
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Inicializa los datos
async function initializeData() {
    await loadConcepts();
    await loadContacts();
    // Inicializa otros datos si es necesario
}
