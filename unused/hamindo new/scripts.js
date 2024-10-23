const workersData = {
    administrator: ['Alice Smith', 'John Doe', 'Jane Brown', 'Mike Johnson', 'Emma Davis'],
    factoryManager: ['Bob Johnson', 'Tom Hanks', 'Chris Evans', 'Natalie Portman', 'Scarlett Johansson'],
    productionOperator: ['Rajit Sharma', 'Bruce Wayne', 'Clark Kent', 'Tony Stark', 'Wade Wilson'],
    auditor: ['Bruce Banner', 'Natasha Romanoff', 'Diana Prince', 'Stephen Strange', 'Barry Allen']
};

function redirectToWorkers(role) {
    document.getElementById('index-page').style.display = 'none';
    document.getElementById('worker-page').style.display = 'block';
    displayWorkers(role);
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
        document.getElementById('worker-page').style.display = 'none';
        document.getElementById('production-login-page').style.display = 'block';
        document.getElementById('workerName').textContent = worker;
    } else {
        document.getElementById('worker-page').style.display = 'none';
        document.getElementById('dashboard-page').style.display = 'block';
        // Update dashboard navigation title
        document.getElementById('nav-title').textContent = `Welcome, ${worker}`;
    }
}

// Function to show the current job
function showCurrentJob(job) {
    document.getElementById('job-page').style.display = 'none';
    document.getElementById('current-job-page').style.display = 'block';
    document.getElementById('current-job-text').textContent = job;
}

function showIndexPage() {
    document.getElementById('worker-page').style.display = 'none';
    document.getElementById('index-page').style.display = 'block';
}

// Page Initialization
document.addEventListener('DOMContentLoaded', function () {
    const workerName = localStorage.getItem('workerName');
    
    if (workerName) {
        document.getElementById('workerName').textContent = workerName;
    }

    // Set up event listeners for the login button and other interactions
    document.getElementById('login-button').addEventListener('click', function () {
        const username = document.getElementById('user-name-login').textContent;
        document.getElementById('nav-title').textContent = `Production Operator: ${username}`;
        pageTransition(1, 0, 0);
    });

    // Event listener for job list button in post-login page
    document.getElementById('job-pointer-atr').addEventListener('click', function () {
        document.getElementById('attribute-page').style.display = 'none'; // Hide post-login page
        document.getElementById('job-page').style.display = 'block'; // Show job page
    });

    // Footer buttons and navigation
    const displayFooterBack = document.getElementById('back-button');
    const displayFooterUpdate = document.getElementById('update-button');
    const displayFooterHelp = document.getElementById('help-button');

    displayFooterBack.addEventListener('click', function () {
        pageTransition(0, 1, 0);
    });

    function pageTransition(page, back, update) {
        const section = document.querySelectorAll('.display-page');
        let pageCounter = 0;

        if (page === 1) {
            section[pageCounter].style.display = 'none';
            section[pageCounter + 1].style.display = 'block';
            pageCounter++;
        } else {
            section[pageCounter].style.display = 'none';
            section[pageCounter - 1].style.display = 'block';
            pageCounter--;
        }

        // Ensure navigation and footer buttons are displayed
        document.getElementById('primary-nav-container').style.display = 'block'; // Show navigation bar
        displayFooterBack.style.display = back === 0 || pageCounter === 1 ? 'none' : 'block'; // Show/hide back button
        displayFooterUpdate.style.display = update === 0 ? 'none' : 'block'; // Show/hide update button
        displayFooterHelp.style.display = 'block'; // Ensure help button is always visible
    }
    
    // Checkbox functionality
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            const label = document.querySelector(`label[for="${this.id}"]`);
            if (this.checked) {
                label.style.textDecoration = 'line-through';
            } else {
                label.style.textDecoration = 'none';
            }
        });
    });
});

// Machine Updating Functionality
function initializeMachineUpdates() {
    const machines = ['3dprinter', 'cncmachine', 'conveyorbelt', 'injectionmolding', 'lasercutter'];

    machines.forEach(machine => {
        const updateButton = document.getElementById(`${machine}-page`).querySelector('#updateButton');
        const progressBar = document.getElementById(`${machine}-page`).querySelector('.progress-bar');

        updateButton.addEventListener('click', function () {
            let progress = 0;
            updateButton.disabled = true; 

            const interval = setInterval(() => {
                if (progress >= 100) {
                    clearInterval(interval);
                    alert(`${machine.charAt(0).toUpperCase() + machine.slice(1)} Update Complete!`);
                    updateButton.disabled = false; 
                    progressBar.style.width = '0%'; // Reset progress bar for next update
                } else {
                    progress += 1;
                    progressBar.style.width = progress + '%';
                }
            }, 50); 
        });
    });
}

function redirectToMachinePage() {
    document.getElementById('attribute-page').style.display = 'none'; // Hide current page
    document.getElementById('select-machine-header').style.display = 'block'; // Show select machine header
    document.getElementById('select-machine-content').style.display = 'block'; // Show select machine content
}


document.addEventListener("DOMContentLoaded", initializeMachineUpdates);


// redirect from update machine button to select machine to update page
document.getElementById('machine-pointer-atr').addEventListener('click', function () {
document.getElementById('attribute-page').style.display = 'none'; // Hide post-login page
document.getElementById('select-machine-header').style.display = 'block'; // Show job page
    
});


// redirect from CNC-machine button to CNC-machine page
document.getElementById('cncmachine-btn').addEventListener('click', function () {
document.getElementById('select-machine-content').style.display = 'none'; // Hide selectmachine page
document.getElementById('cncmachine-page').style.display = 'block'; // Show cncmachine page
    
});

// redirect from 3d-printer button to 3d-printer page
document.getElementById('3D-Printer-btn').addEventListener('click', function () {
    document.getElementById('select-machine-content').style.display = 'none'; // Hide selectmachine page
    document.getElementById('3dprinter-page').style.display = 'block'; // Show 3dprinter page
        
    });

    // redirect from lasercutter button to lasercutter page
document.getElementById('lasercutter-btn').addEventListener('click', function () {
    document.getElementById('select-machine-content').style.display = 'none'; // Hide selectmachine page
    document.getElementById('lasercutter-page').style.display = 'block'; // Show lasercutter page
        
    });

    // redirect from conveyorbelt button to conveyorbelt page
    document.getElementById('conveyorbelt-btn').addEventListener('click', function () {
        document.getElementById('select-machine-content').style.display = 'none'; // Hide selectmachine page
        document.getElementById('conveyorbelt-page').style.display = 'block'; // Show conveyorbelt page
            
        });

    // redirect from injectionmolding button to injectionmolding page
    document.getElementById('injectionmolding-btn').addEventListener('click', function () {
        document.getElementById('select-machine-content').style.display = 'none'; // Hide selectmachine page
        document.getElementById('injectionmolding-page').style.display = 'block'; // Show injectionmolding page
            
        });
