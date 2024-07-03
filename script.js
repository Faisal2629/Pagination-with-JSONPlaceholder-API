const userContainer = document.getElementById('user-container');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

let currentPage = 1;
const usersPerPage = 6;

async function fetchUsers(page) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${usersPerPage}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Fetch error: ', error);
        userContainer.innerHTML = '<p>Something went wrong while fetching the user data.</p>';
    }
}

function renderUsers(users) {
    userContainer.innerHTML = '';
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
        `;
        userContainer.appendChild(userCard);
    });
}

async function loadUsers(page) {
    const users = await fetchUsers(page);
    if (users) {
        renderUsers(users);
    }
}

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadUsers(currentPage);
    }
});

nextButton.addEventListener('click', () => {
    currentPage++;
    loadUsers(currentPage);
});

// Initial load
loadUsers(currentPage);
