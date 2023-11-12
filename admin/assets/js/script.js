let users = [];

fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => {
        users = data;
        renderUsers();
    })
    .catch((error) => {
        console.error('Error:', error);
    });

document.getElementById('user-form-admin').addEventListener('submit', function(e) {
    e.preventDefault();
    let img = document.getElementById('img').value;
    let name = document.getElementById('name').value;
    let job = document.getElementById('job').value;
    let newUser = {
        "img":img,
        "name": name,
        "job": job,
        "id": Math.random().toString(36).substring(7)
    };

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        users.push(data);
        renderUsers();
     
        // window.location.href = 'Admin.html'; 
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    window.location.href="Admin.html"

});

function getCreate(){
    window.location.href="AdminAdd.html"
}

function deleteUser(id) {
    fetch('http://localhost:3000/users/' + id, {
        method: 'DELETE',
    })
    .then(() => {
        users = users.filter(user => user.id !== id);
        renderUsers();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function updateUser(id) {
    let img = prompt("iage");
    let name = prompt("name");
    let job = prompt("job");
    let updatedUser = users.find(user => user.id === id);
    if (updatedUser) {
        updatedUser.img = img;
        updatedUser.name = name;
        updatedUser.job = job;

        fetch(`http://localhost:3000/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            users = users.map(user => user.id === id ? {...user, img, name, job} : user);
            renderUsers();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

function renderUsers() {
    let userList = document.getElementById('user-list');
    userList.innerHTML = '';
    users.forEach(user => {
        let userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
            <p>img:
               <img src="${user.img}" alt="">
            </p>
            <p>İsim: ${user.name}</p>
            <p>İş: ${user.job}</p>
            <button onclick="updateUser('${user.id}')">Update user</button>
            <button onclick="deleteUser('${user.id}')">Delete user</button>
        `;
        userList.appendChild(userCard);
    });
}


