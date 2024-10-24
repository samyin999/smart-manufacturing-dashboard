// Worker data will be populated from PHP
let workersData;

function redirectToWorkers(role) {
    document.getElementById('index-page').style.display = 'none';
    document.getElementById('worker-page').style.display = 'block';
    displayWorkers(role);
}

function displayWorkers(role) {
    const workerList = document.getElementById('workerList');
    const userRole = document.getElementById('userRole');

    // Format role name for display
    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);
    userRole.textContent = formattedRole;

    workerList.innerHTML = '';

    if (workersData[role]) {
        workersData[role].forEach(worker => {
            const button = document.createElement('button');
            button.textContent = worker.name;
            button.onclick = () => {
                redirectToDashboard(worker.name, worker.id, role);
            };
            workerList.appendChild(button);
        });
    } else {
        workerList.innerHTML = '<p>No workers found for this role.</p>';
    }
}

function redirectToDashboard(workerName, workerId, role) {
    // Store worker information
    localStorage.setItem('workerName', workerName);
    localStorage.setItem('workerId', workerId);
    localStorage.setItem('workerRole', role);

    // Redirect based on role
    if (role === 'operator') {
        document.getElementById('worker-page').style.display = 'none';
        document.getElementById('production-login-page').style.display = 'block';
        document.getElementById('workerName').textContent = workerName;
    } else {
        document.getElementById('worker-page').style.display = 'none';
        document.getElementById('dashboard-page').style.display = 'block';
        document.getElementById('nav-title').textContent = `Welcome, ${workerName}`;
    }
}

function showIndexPage() {
    document.getElementById('worker-page').style.display = 'none';
    document.getElementById('index-page').style.display = 'block';
}

// Function to show the current job
function showCurrentJob(job) {
    document.getElementById('job-page').style.display = 'none';
    document.getElementById('current-job-page').style.display = 'block';
    document.getElementById('current-job-text').textContent = job;
}

// Page Initialization
document.addEventListener('DOMContentLoaded', function () {
    const workerName = localStorage.getItem('workerName');
    
    if (workerName) {
        const workerNameElements = document.querySelectorAll('.workerName');
        workerNameElements.forEach(element => {
            element.textContent = workerName;
        });
    }

    // Set up event listeners for the login button
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        loginButton.addEventListener('click', function () {
            const username = document.getElementById('user-name-login').textContent;
            document.getElementById('nav-title').textContent = `Production Operator: ${username}`;
            pageTransition(1, 0, 0);
        });
    }

    // Event listener for job list button in post-login page
    const jobPointerAtr = document.getElementById('job-pointer-atr');
    if (jobPointerAtr) {
        jobPointerAtr.addEventListener('click', function () {
            document.getElementById('attribute-page').style.display = 'none';
            document.getElementById('job-page').style.display = 'block';
        });
    }

    // Footer buttons and navigation
    const displayFooterBack = document.getElementById('back-button');
    const displayFooterUpdate = document.getElementById('update-button');
    const displayFooterHelp = document.getElementById('help-button');

    if (displayFooterBack) {
        displayFooterBack.addEventListener('click', function () {
            pageTransition(0, 1, 0);
        });
    }

    // Page transition function
    function pageTransition(page, back, update) {
        const sections = document.querySelectorAll('.display-page');
        let pageCounter = 0;

        if (page === 1) {
            sections[pageCounter].style.display = 'none';
            sections[pageCounter + 1].style.display = 'block';
            pageCounter++;
        } else {
            sections[pageCounter].style.display = 'none';
            sections[pageCounter - 1].style.display = 'block';
            pageCounter--;
        }

        // Update navigation and footer buttons
        const primaryNav = document.getElementById('primary-nav-container');
        if (primaryNav) primaryNav.style.display = 'block';
        
        if (displayFooterBack) {
            displayFooterBack.style.display = back === 0 || pageCounter === 1 ? 'none' : 'block';
        }
        if (displayFooterUpdate) {
            displayFooterUpdate.style.display = update === 0 ? 'none' : 'block';
        }
        if (displayFooterHelp) {
            displayFooterHelp.style.display = 'block';
        }
    }
    
    // Checkbox functionality
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            const label = document.querySelector(`label[for="${this.id}"]`);
            if (label) {
                if (this.checked) {
                    label.style.textDecoration = 'line-through';
                } else {
                    label.style.textDecoration = 'none';
                }
            }
        });
    });
});

// Machine Updating Functionality
function initializeMachineUpdates() {
    const machines = ['3dprinter', 'cncmachine', 'conveyorbelt', 'injectionmolding', 'lasercutter'];

    machines.forEach(machine => {
        const machinePage = document.getElementById(`${machine}-page`);
        if (machinePage) {
            const updateButton = machinePage.querySelector('#updateButton');
            const progressBar = machinePage.querySelector('.progress-bar');

            if (updateButton && progressBar) {
                updateButton.addEventListener('click', function () {
                    let progress = 0;
                    updateButton.disabled = true;

                    const interval = setInterval(() => {
                        if (progress >= 100) {
                            clearInterval(interval);
                            alert(`${machine.charAt(0).toUpperCase() + machine.slice(1)} Update Complete!`);
                            updateButton.disabled = false;
                            progressBar.style.width = '0%';
                        } else {
                            progress += 1;
                            progressBar.style.width = progress + '%';
                        }
                    }, 50);
                });
            }
        }
    });
}

function redirectToMachinePage() {
    document.getElementById('attribute-page').style.display = 'none';
    document.getElementById('select-machine-header').style.display = 'block';
    document.getElementById('select-machine-content').style.display = 'block';
}

// Initialize machine updates on page load
document.addEventListener("DOMContentLoaded", initializeMachineUpdates);

// Machine selection event listeners
const machinePointerAtr = document.getElementById('machine-pointer-atr');
if (machinePointerAtr) {
    machinePointerAtr.addEventListener('click', function () {
        document.getElementById('attribute-page').style.display = 'none';
        document.getElementById('select-machine-header').style.display = 'block';
    });
}

// Individual machine button event listeners
const machineButtons = {
    'cncmachine-btn': 'cncmachine-page',
    '3D-Printer-btn': '3dprinter-page',
    'lasercutter-btn': 'lasercutter-page',
    'conveyorbelt-btn': 'conveyorbelt-page',
    'injectionmolding-btn': 'injectionmolding-page'
};

Object.entries(machineButtons).forEach(([buttonId, pageId]) => {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('click', function () {
            document.getElementById('select-machine-content').style.display = 'none';
            document.getElementById(pageId).style.display = 'block';
        });
    }
});