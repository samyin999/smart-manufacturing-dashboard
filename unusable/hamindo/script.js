const workersData = {
    administrator: ['Alice Smith', 'John Doe', 'Jane Brown', 'Mike Johnson', 'Emma Davis'],
    factoryManager: ['Bob Johnson', 'Tom Hanks', 'Chris Evans', 'Natalie Portman', 'Scarlett Johansson'],
    productionOperator: ['Rajit Sharma', 'Bruce Wayne', 'Clark Kent', 'Tony Stark', 'Wade Wilson'],
    auditor: ['Bruce Banner', 'Natasha Romanoff', 'Diana Prince', 'Stephen Strange', 'Barry Allen']
};

function redirectToWorkers(role) {
    window.location.href = `workers.html?role=${role}`;
}

function displayWorkers(role) {
    const workerList = document.getElementById('workerList');
    const userRole = document.getElementById('userRole');

    userRole.textContent = role.charAt(0).toUpperCase() + role.slice(1).replace('-', ' ');

    workerList.innerHTML = '';


    if (workersData[role]) {
 
        workersData[role].forEach(worker => {
            const button = document.createElement('button');
            button.textContent = worker;
            button.onclick = () => {
                redirectToDashboard(worker, role);
            };
            workerList.appendChild(button);
        });
    } else {
        workerList.innerHTML = '<p>No workers found for this role.</p>';
    }
}


function redirectToDashboard(worker, role) {
    localStorage.setItem('workerName', worker); 

    if (role === 'productionOperator') {
        window.location.href = 'productionIndex.html'; 
    } else {
        window.location.href = 'dashboard.html'; 
    }
}


const urlParams = new URLSearchParams(window.location.search);
const role = urlParams.get('role');
if (role) {
    displayWorkers(role);
} else {
    const workerList = document.getElementById('workerList');
    workerList.innerHTML = '<p>No role selected.</p>';
}

if (document.title === "Worker Dashboard" || document.title === "Production Operator") {
    const workerName = localStorage.getItem('workerName');
    document.getElementById('workerName').textContent = workerName || 'User';
}
