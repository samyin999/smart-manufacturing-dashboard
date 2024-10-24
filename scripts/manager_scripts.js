document.addEventListener('DOMContentLoaded', function(){
    
    // Main page elements
    const displayMain = document.getElementById('main-page');
    const displayMainNav = document.getElementById('primary-nav-container');
    const footerContainer = document.getElementById('footer-container');
    
    // Pages
    const landingPage = document.getElementById('landing-page');
    const performancePage = document.getElementById('performance-page');
    const machinesManagementPage = document.getElementById('machines-management-page');
    const machineFormPage = document.getElementById('machine-form-page');
    const jobsManagementPage = document.getElementById('jobs-management-page');
    const jobFormPage = document.getElementById('job-form-page');
    const assignmentsPage = document.getElementById('assignments-page');

    // Navigation buttons
    const showPerformance = document.getElementById('show-performance');
    const showMachinesManagement = document.getElementById('show-machines-management');
    const showJobsManagement = document.getElementById('show-jobs-management');
    const showAssignments = document.getElementById('show-assignments');

    // Back buttons
    const performanceBack = document.getElementById('performance-page-back');
    const machinesManagementBack = document.getElementById('machines-management-back');
    const jobsManagementBack = document.getElementById('jobs-management-back');
    const assignmentsBack = document.getElementById('assignments-page-back');

    // Form buttons
    const addMachineButton = document.getElementById('add-machine-button');
    const machineFormCancel = document.getElementById('machine-form-cancel');
    const addJobButton = document.getElementById('add-job-button');
    const jobFormCancel = document.getElementById('job-form-cancel');

    // Utility function to hide all pages
    function hideAllPages() {
        const pages = document.querySelectorAll('.display-page');
        pages.forEach(page => page.style.display = 'none');
    }

    // Utility function to show a specific page
    function showPage(page) {
        hideAllPages();
        page.style.display = 'block';
    }

    document.getElementById('machine-form-cancel').addEventListener('click', function() {
        // Clear the form
        document.getElementById('machineForm').reset();
        // Hide the form page and show the machines management page
        document.getElementById('machine-form-page').style.display = 'none';
        document.getElementById('machines-management-page').style.display = 'block';
    });

    // Login handler

    // gpt generated this part

    // document.getElementById('login-button').addEventListener('click', function(e) {
    //     e.preventDefault(); // Prevent form submission for demo
    //     displayMain.style.display = 'none';
    //     const username = document.getElementById('user-name-login').textContent;
    //     document.getElementById('nav-title').textContent = `Factory Manager: ${username}`;
    //     displayMainNav.style.display = 'block';
    //     footerContainer.style.display = 'block';
    //     showPage(landingPage);
    // });

    document.getElementById('login-button').addEventListener('click', function() {
        displayMain.style.display = 'none';
        const username = document.getElementById('user-name-login').textContent;
        document.getElementById('nav-title').textContent = `Factory Manager: ${username}`;
        landingPage.style.display = 'block';
        displayMainNav.style.display = 'block';
    });

    // Navigation handlers
    showPerformance.addEventListener('click', () => showPage(performancePage));
    showMachinesManagement.addEventListener('click', () => showPage(machinesManagementPage));
    showJobsManagement.addEventListener('click', () => showPage(jobsManagementPage));
    showAssignments.addEventListener('click', () => showPage(assignmentsPage));

    // Back button handlers
    performanceBack.addEventListener('click', () => showPage(landingPage));
    machinesManagementBack.addEventListener('click', () => showPage(landingPage));
    jobsManagementBack.addEventListener('click', () => showPage(landingPage));
    assignmentsBack.addEventListener('click', () => showPage(landingPage));

    // // Machine Management
    // addMachineButton.addEventListener('click', function() {
    //     document.getElementById('machine-form-title').textContent = 'Add New Machine';
    //     document.getElementById('machineForm').reset();
    //     document.getElementById('machine-id').value = '';
    //     showPage(machineFormPage);
    // });


    // machineFormCancel.addEventListener('click', () => showPage(machinesManagementPage));

    // // Handle machine edit buttons
    // document.querySelectorAll('[data-machine-id]').forEach(button => {
    //     if (button.classList.contains('edit-button')) {
    //         button.addEventListener('click', function() {
    //             const machineId = this.dataset.machineId;
    //             document.getElementById('machine-form-title').textContent = 'Edit Machine';
    //             document.getElementById('machine-id').value = machineId;
    //             // Here you would typically fetch machine data and populate the form
    //             showPage(machineFormPage);
    //         });
    //     } else if (button.classList.contains('delete-button')) {
    //         button.addEventListener('click', function() {
    //             const machineId = this.dataset.machineId;
    //             if (confirm('Are you sure you want to delete this machine?')) {
    //                 // Here you would typically send a delete request to the server
    //                 console.log('Deleting machine:', machineId);
    //             }
    //         });
    //     }
    // });

    // // Machine form submission
    // document.getElementById('machineForm').addEventListener('submit', function(e) {
    //     e.preventDefault();
    //     const formData = new FormData(this);
    //     // Here you would typically send the form data to the server
    //     console.log('Saving machine:', Object.fromEntries(formData));
    //     showPage(machinesManagementPage);
    // });

    // Machine Management
addMachineButton.addEventListener('click', function() {
document.getElementById('machine-form-title').textContent = 'Add New Machine';
document.getElementById('machineForm').reset();
document.getElementById('machine-id').value = '';
showPage(machineFormPage);
});

// Handle machine edit
document.querySelectorAll('[data-machine-id]').forEach(button => {
if (button.classList.contains('edit-button')) {
    button.addEventListener('click', function() {
        const machineId = this.dataset.machineId;
        document.getElementById('machine-form-title').textContent = 'Edit Machine';
        
        // Fetch machine data from the server
        fetch(`api/get_machine.php?id=${machineId}`)
            .then(response => response.json())
            .then(machine => {
                // Pre-fill the form with machine data
                document.getElementById('machine-id').value = machine.id;
                document.getElementById('machine-name').value = machine.machine_name;
                document.getElementById('temperature').value = machine.temperature;
                document.getElementById('pressure').value = machine.pressure;
                document.getElementById('vibration').value = machine.vibration;
                document.getElementById('humidity').value = machine.humidity;
                document.getElementById('power-consumption').value = machine.power_consumption;
                document.getElementById('operational-status').value = machine.operational_status;
                document.getElementById('error-code').value = machine.error_code || '';
                document.getElementById('production-count').value = machine.production_count || '';
                document.getElementById('maintenance-log').value = machine.maintenance_log || '';
                document.getElementById('speed').value = machine.speed;
                
                showPage(machineFormPage);
            })
            .catch(error => {
                console.error('Error fetching machine data:', error);
                alert('Error loading machine data. Please try again.');
            });
    });
}
});

// Handle form submission
document.getElementById('machineForm').addEventListener('submit', function(e) {
e.preventDefault();
const formData = new FormData(this);
const machineId = document.getElementById('machine-id').value;
const url = machineId ? 'api/update_machine.php' : 'api/add_machine.php';

// Add timestamp for new machines
if (!machineId) {
    formData.append('timestamp', new Date().toISOString().slice(0, 19).replace('T', ' '));
}

fetch(url, {
    method: 'POST',
    body: formData
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        alert(machineId ? 'Machine updated successfully!' : 'Machine added successfully!');
        showPage(machinesManagementPage);
        // Reload the page to show updated data
        location.reload();
    } else {
        alert('Error: ' + (data.message || 'Unknown error occurred'));
    }
})
.catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
});
});











    // // Job Management
    // addJobButton.addEventListener('click', function() {
    //     document.getElementById('job-form-title').textContent = 'Add New Job';
    //     document.getElementById('jobForm').reset();
    //     document.getElementById('job-id').value = '';
    //     showPage(jobFormPage);
    // });

    // jobFormCancel.addEventListener('click', () => showPage(jobsManagementPage));

    // // Handle job edit buttons
    // document.querySelectorAll('[data-job-id]').forEach(button => {
    //     if (button.classList.contains('edit-button')) {
    //         button.addEventListener('click', function() {
    //             const jobId = this.dataset.jobId;
    //             document.getElementById('job-form-title').textContent = 'Edit Job';
    //             document.getElementById('job-id').value = jobId;
    //             // Here you would typically fetch job data and populate the form
    //             showPage(jobFormPage);
    //         });
    //     } else if (button.classList.contains('delete-button')) {
    //         button.addEventListener('click', function() {
    //             const jobId = this.dataset.jobId;
    //             if (confirm('Are you sure you want to delete this job?')) {
    //                 // Here you would typically send a delete request to the server
    //                 console.log('Deleting job:', jobId);
    //             }
    //         });
    //     }
    // });

    // // Job form submission
    // document.getElementById('jobForm').addEventListener('submit', function(e) {
    //     e.preventDefault();
    //     const formData = new FormData(this);
    //     // Here you would typically send the form data to the server
    //     console.log('Saving job:', Object.fromEntries(formData));
    //     showPage(jobsManagementPage);
    // });

    // // Assignment Management
    // document.getElementById('assignmentForm').addEventListener('submit', function(e) {
    //     e.preventDefault();
    //     const operatorId = document.getElementById('operator-select').value;
    //     const jobId = document.getElementById('job-select').value;
        
    //     // Here you would typically send the assignment to the server
    //     console.log('Creating assignment:', { operatorId, jobId });
        
    //     // For demo purposes, add the assignment to the table
    //     const tbody = document.getElementById('assignments-table');
    //     const tr = document.createElement('tr');
    //     tr.innerHTML = `
    //         <td>${document.getElementById('operator-select').selectedOptions[0].text}</td>
    //         <td>${document.getElementById('job-select').selectedOptions[0].text}</td>
    //         <td>Assigned</td>
    //         <td>
    //             <button class="delete-button" onclick="this.closest('tr').remove()">Remove</button>
    //         </td>
    //     `;
    //     tbody.appendChild(tr);
    //     this.reset();
    // });

    // Job Management
document.getElementById('add-job-button').addEventListener('click', function() {
    document.getElementById('job-form-title').textContent = 'Add New Job';
    document.getElementById('jobForm').reset();
    document.getElementById('job-id').value = '';
    showPage(jobFormPage);
});

// Cancel button for job form
document.getElementById('job-form-cancel').addEventListener('click', function() {
    document.getElementById('jobForm').reset();
    showPage(jobsManagementPage);
});

// Handle job edit buttons
document.querySelectorAll('[data-job-id]').forEach(button => {
    if (button.classList.contains('edit-button')) {
        button.addEventListener('click', function() {
            const jobId = this.dataset.jobId;
            document.getElementById('job-form-title').textContent = 'Edit Job';
            
            fetch(`api/get_job.php?id=${jobId}`)
                .then(response => response.json())
                .then(job => {
                    document.getElementById('job-id').value = job.id;
                    document.getElementById('job-name').value = job.name;
                    document.getElementById('job-status').value = job.status;
                    document.getElementById('job-notes').value = job.notes || '';
                    document.getElementById('job-operator').value = job.operator;
                    document.getElementById('job-machine').value = job.machine;
                    
                    showPage(jobFormPage);
                })
                .catch(error => {
                    console.error('Error fetching job data:', error);
                    alert('Error loading job data. Please try again.');
                });
        });
    }
});

// Handle job delete buttons
document.querySelectorAll('.delete-button').forEach(button => {
    if (button.closest('#jobs-management-page')) {  // Only for job delete buttons
        button.addEventListener('click', function() {
            const jobId = this.dataset.jobId;
            if (confirm('Are you sure you want to delete this job?')) {
                fetch('api/delete_job.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `id=${jobId}`
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Job deleted successfully!');
                        location.reload();
                    } else {
                        alert('Error: ' + (data.message || 'Failed to delete job'));
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while deleting the job');
                });
            }
        });
    }
});

// Handle job form submission
document.getElementById('jobForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const jobId = document.getElementById('job-id').value;
    const url = jobId ? 'api/update_job.php' : 'api/add_job.php';

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(jobId ? 'Job updated successfully!' : 'Job added successfully!');
            showPage(jobsManagementPage);
            location.reload();
        } else {
            alert('Error: ' + (data.message || 'Unknown error occurred'));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});



    // Add AJAX functionality for form submissions
    function handleFormSubmit(url, formData) {
        return fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => response.json())
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    }

    // Handle update machine status
    function updateMachineStatus(machineId, status) {
        const formData = new FormData();
        formData.append('machine_id', machineId);
        formData.append('status', status);
        return handleFormSubmit('update_machine_status.php', formData);
    }

    // Handle update job status
    function updateJobStatus(jobId, status) {
        const formData = new FormData();
        formData.append('job_id', jobId);
        formData.append('status', status);
        return handleFormSubmit('update_job_status.php', formData);
    }

    // Initialize any tooltips or popovers
    const tooltips = document.querySelectorAll('[data-toggle="tooltip"]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseover', function() {
            this.setAttribute('title', this.dataset.originalTitle);
        });
    });
});