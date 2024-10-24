// document.addEventListener('DOMContentLoaded', function(){
    
//     // Operators logic
//     if (/operatorIndex\.(html|php)$/.test(window.location.pathname)){

//         // Sam's implementation

//         // Pages
//         const realJobPage = document.getElementById('real-job-page');
//         const currentJobPage= document.getElementById('current-job-page');
//         const landingPage = document.getElementById('landing-page');
//         const performancePage = document.getElementById('performance-page');
//         const machinesPage = document.getElementById('machines-page');
//         const currentMachinePage = document.getElementById('current-machine-page');

//         // Buttons

//         // I know this is a dumb solution but I dont have time to figure out an elegant solution, but it works as our website is small, linear pages don't work too well with branching paths

//         const displayJobs = document.getElementById('show-jobs');
//         const displayPerformance = document.getElementById('show-performance');
//         const displayMachines = document.getElementById('show-machines');``
//         const displayDemoMachinePage = document.getElementById('demo-machine-edit-page');

//         const performancePageBack = document.getElementById('performance-page-back');
//         const jobsPageBack = document.getElementById('jobs-page-back');
//         const machinesPageBack = document.getElementById('machines-page-back');
//         const currentMachineBack = document.getElementById('current-machine-back');

//         const queued = document.getElementById("queued");
//         const progress = document.getElementById("progress");
//         const completed= document.getElementById("completed");
        
//         // forwards navigation
//         displayJobs.addEventListener('click', function(){
//             landingPage.style.display='none';
//             realJobPage.style.display='block';
//         });
//         displayPerformance.addEventListener('click', function(){
//             landingPage.style.display='none';
//             performancePage.style.display='block';
//         });
//         displayMachines.addEventListener('click', function(){
//             landingPage.style.display='none';
//             machinesPage.style.display='block';
//         });
       
        
//         // backwards navigation
//         performancePageBack.addEventListener('click', function(){
//             landingPage.style.display='block';
//             performancePage.style.display='none';
//         });
//         jobsPageBack.addEventListener('click', function(){
//             landingPage.style.display='block';
//             realJobPage.style.display='none';
//         });
//         machinesPageBack.addEventListener('click', function(){
//             landingPage.style.display='block';
//             machinesPage.style.display='none';
//         });
//         currentMachineBack.addEventListener('click', function(){
//             landingPage.style.display='block';
//             currentMachinePage.style.display='none';
//         });
        

//         // Pete

//         const displayMain = document.getElementById('main-page');
//         const displayMainNav = document.getElementById('primary-nav-container');
//         const displayFooter = document.getElementById('footer-container');

//         const displayFooterBack =document.getElementById('back-button');
//         const displayFooterUpdate =document.getElementById('update-button');
//         const displayFooterHelp = document.getElementById('help-button');


//         displayFooterBack.addEventListener('click',function(){
//             realJobPage.style.display='block';
//             currentJobPage.style.display='none';
//             displayFooterUpdate.style.display='none';
//             displayFooterBack.style.display='none';
//         });

//         console.log(`Found Document ${window.location.pathname}`);

//         const section = document.querySelectorAll('.display-page');
//         let pageCounter =0;


//         document.getElementById('login-button').addEventListener('click', function(){
//             console.log("Form submitted");
            
//             var userPassword = document.getElementById('userPasswordLogin').value;
//             console.log("Password entered:", userPassword);
        
//             var xhr = new XMLHttpRequest();
//             xhr.open('POST', 'phpDb/passwordChecker.php', true);
//             xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            
//             xhr.onreadystatechange = function() {
//                 console.log('detected a change in the system');
//                 if (xhr.readyState === 4 && xhr.status === 200) {
//                     var response = xhr.responseText.trim();
//                     if (response === 'correct') {
//                         displayMain.style.display='none';
//                         const username=document.getElementById('user-name-login').textContent;
//                         document.getElementById('nav-title').textContent=`Production Operator : ${username}`;
//                         pageTransition(1,0,0);
//                     } else if (response == 'incorrect') {
//                         alert("Incorrect password");
//                     } else if (response == 'notfound') {
//                         alert("Employee ID not found.");
//                     } else {
//                         console.log("Unexpected response: " + response);
//                     }
//                 }
//             };
//             xhr.send('userPasswordLogin=' + userPassword + '&userRole=' + "operator");

//             //AND CHECK WITH DATABASE IF PASSWORD===PASSWORD
            
//         });
//         let jobID=0;
//         let employeeID=0;
        
//         document.querySelectorAll('.job-pointer-container').forEach(function(jobPointer){
//             jobPointer.addEventListener('submit', function(event) {
//                 event.preventDefault();
//                 console.log("Job submitted");
//                 var form = event.target.querySelector('button');
//                 var selectedJob = form.value.trim();
//                 console.log(selectedJob);
//                 var xhr = new XMLHttpRequest();
//                 xhr.open('POST', 'phpDb/jobPointer.php', true);
//                 xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                
//                 xhr.onreadystatechange = function() {
//                     console.log('detected a change in the system');
//                     if (xhr.readyState === 4 && xhr.status === 200) {
//                         var response = xhr.responseText.trim();
//                         var responseArray = response.split(",");
//                         jobID = responseArray[3];
//                         employeeID = responseArray[4];
//                         console.log('Full response: ' + response);
//                         console.log('Job Name: ' + responseArray[0]); // jobName
//                         console.log('Job Status: ' + responseArray[1]); // jobStatus
//                         console.log('Job Note: ' + responseArray[2]); // jobNote
//                         console.log('Updated job id and employee id to: ' + jobID + ", " + employeeID);
//                         jobDetails(responseArray[1],responseArray[2]);

//                         document.getElementById('current-job-text').textContent=responseArray[0];
//                         console.log("Response by system is"+response);
//                     }
//                 };
//                 console.log('selectedJob=' + selectedJob);
//                 xhr.send('selectedJob=' + selectedJob);
//             });
//         });
//         function jobDetails(status, note){
//             if(status == "queued"){
//                 queued.checked=true;
//                 progress.checked=false;
//                 completed.checked=false;
//             }else if(status == "progress"){
//                 queued.checked=true;
//                 progress.checked=true;
//                 completed.checked=false;
//             }else if(status == "completed"){
//                 queued.checked=true;
//                 progress.checked=true;
//                 completed.checked=true;
//             }
//             realJobPage.style.display="none";
//             currentJobPage.style.display="block";
//             displayFooterBack.style.display="block";
//             displayFooterUpdate.style.display="block";
//             document.getElementById('form-notes').value=note;
//         };
    

//         // document.querySelectorAll('.attribute-container').forEach(function(button){
//         //     button.addEventListener('click', function(event){
//         //         const buttonId = event.currentTarget.id;
//         //         if(buttonId == 'job-pointer-atr'){
//         //             pageTransition(1,1,0);
//         //         }else if(buttonId == 'performance-pointer-atr'){
//         //             factoryPerformancePage();
//         //         }else{
//         //             updateMachinePage();
//         //         }
//         //     });
//         // });



//         // document.querySelectorAll('.job-pointer').forEach(function(jobPointer){
//         //     jobPointer.addEventListener('click', function(event){
//         //         document.getElementById('current-job-text').textContent=event.currentTarget.textContent;
//         //         pageTransition(1, 1, 1);
//         //     });
//         // });

//         // displayFooterBack.addEventListener('click',function(){
//         //     pageTransition(0,1,0);
//         // });
//         displayFooterHelp.addEventListener('click', function(){
//             const helpOverlay = document.getElementById('help-overlay-container');
//             helpOverlay.style.display='flex';
//             document.getElementById('close-help').addEventListener('click', function(){
//                 helpOverlay.style.display='none';
//             });
            
//         });
//         console.log("Do we even get to here test");
//         displayFooterUpdate.addEventListener('click', function(){
//             console.log("Footer update has been clickedf");
//             let latestStatus = "";
//             if(queued.checked){
//                 latestStatus="queued";
//             }
//             if(progress.checked){
//                 latestStatus="progress";
//             }
//             if(completed.checked){
//                 latestStatus="completed";
//             }
//             var latestNotes = document.getElementById('form-notes').value;
//             updateJob(latestStatus, latestNotes);
//         });
//         function updateJob(latestStatus, latestNotes) {
//             var xhr = new XMLHttpRequest();
//             xhr.open("POST", "phpDb/updateJob.php", true);
//             xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//             console.log("Before processing data to be sent latestStatus is: "+latestStatus +"\njobID is "+jobID);
//             // Create the data string to send
//             var data = "jobStatus=" + encodeURIComponent(latestStatus) +
//                        "&jobNotes=" + encodeURIComponent(latestNotes) +
//                        "&jobID=" + encodeURIComponent(jobID) +
//                        "&employeeID=" + encodeURIComponent(employeeID); // Ensure employeeID is defined
            

//             console.log(data);
//             xhr.onreadystatechange = function () {
//                 if (xhr.readyState === 4 && xhr.status === 200) {
//                     console.log("Update response:", xhr.responseText);
//                     // Handle response here, e.g., display a success message
//                 }
//             };
        
//             // Send the request with the data
//             xhr.send(data);
//         }
//         function pageTransition(page, back, update){
//             displayMainNav.style.display='block';
//             displayFooter.style.display='block';
//             if(page==1){
//                 section[pageCounter].style.display='none';
//                 section[pageCounter+1].style.display='block';
//                 pageCounter++;
//             }else{
//                 section[pageCounter].style.display='none';
//                 section[pageCounter-1].style.display='block'; 
//                 pageCounter--;
//             }

//             if(back==0 || pageCounter==1){
//                 displayFooterBack.style.display='none';
//             }else if(back==1){displayFooterBack.style.display='block';}
//             if(update==0){
//                 displayFooterUpdate.style.display='none';
//             }else{displayFooterUpdate.style.display='block';}
//         };


//         const checkboxes = document.querySelectorAll('input[type="checkbox"]');
//         checkboxes.forEach(function(checkbox) {
//             checkbox.addEventListener('change', function() {
//                 const label = document.querySelector(`label[for="${this.id}"]`);
//                 if (this.checked) {
//                     label.style.textDecoration = 'line-through'; 
//                 } else {
//                     label.style.textDecoration = 'none';
//                 }
//             });
//         });
        
//         document.querySelectorAll('.machine-pointer-container').forEach(function(machinePointer) {
//             machinePointer.addEventListener('submit', function(event) {
//                 event.preventDefault();
//                 console.log("Machine submitted");
//                 var form = event.target.querySelector('button');
//                 var selectedMachine = form.value.trim(); // Get the machine ID
//                 console.log(selectedMachine);
                
//                 var xhr = new XMLHttpRequest();
//                 xhr.open('POST', 'phpDb/machinePointer.php', true);
//                 xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                
//                 xhr.onreadystatechange = function() {
//                     console.log('Detected a change in the system');
//                     if (xhr.readyState === 4 && xhr.status === 200) {
//                         var response = xhr.responseText.trim();
//                         var responseArray = response.split(",");
//                         console.log('Full response: ' + response);
//                         console.log('Machine Name: ' + responseArray[0]); // Machine Name
//                         console.log('Timestamp: ' + responseArray[1]); // Timestamp
//                         console.log('Temperature: ' + responseArray[2]); // Temperature
//                         console.log('Pressure: ' + responseArray[3]); // Pressure
//                         console.log('Vibration: ' + responseArray[4]); // Vibration
//                         console.log('Humidity: ' + responseArray[5]); // Humidity
//                         console.log('Power Consumption: ' + responseArray[6]); // Power Consumption
//                         console.log('Operational Status: ' + responseArray[7]); // Operational Status
//                         console.log('Error Code: ' + responseArray[8]); // Error Code
//                         console.log('Production Count: ' + responseArray[9]); // Production Count
//                         console.log('Maintenance Log: ' + responseArray[10]); // Maintenance Log
//                         console.log('Speed: ' + responseArray[11]); // Speed
                        
//                         // Display the machine details
//                         machineDetails(responseArray);
//                     }
//                 };
//                 console.log('selectedMachine=' + selectedMachine);
//                 xhr.send('selectedMachine=' + selectedMachine);
//             });
//         });
        
//         function machineDetails(details) {
//             // Update the UI with the machine details
//             document.getElementById('machine-id').textContent = details[0]; // Machine ID
//             document.getElementById('current-machine-name').textContent = details[0]; // Machine Name
//             document.getElementById('timestamp').textContent = details[1]; // Timestamp
//             document.getElementById('temperature').textContent = details[2]; // Temperature
//             document.getElementById('pressure').textContent = details[3]; // Pressure
//             document.getElementById('vibration').textContent = details[4]; // Vibration
//             document.getElementById('humidity').textContent = details[5]; // Humidity
//             document.getElementById('power-consumption').textContent = details[6]; // Power Consumption
//             document.getElementById('operational-status').textContent = details[7]; // Operational Status
//             document.getElementById('error-code').textContent = details[8] !== 'NULL' ? details[8] : 'No Error'; // Error Code
//             document.getElementById('production-count').textContent = details[9] !== 'NULL' ? details[9] : 'N/A'; // Production Count
//             document.getElementById('maintenance-log').textContent = details[10] !== 'NULL' ? details[10] : 'No Maintenance'; // Maintenance Log
//             document.getElementById('speed').textContent = details[11]; // Speed
            
//             // Show the machine details page
//             document.getElementById('current-machine-page').style.display = "block";
//             machinesPage.style.display="none";
//         }
        
        
//         // Sam's implementation




//     }

//     // Admin logic
//     if (/adminIndex\.(html|php)$/.test(window.location.pathname)){
        
//         //borrowed logic from Pete's implementation
//         const displayMain = document.getElementById('main-page');
//         const displayMainNav = document.getElementById('primary-nav-container');

//         console.log(`Found Document ${window.location.pathname}`);
        
//         // Sam's implementation
        
//         // pages
//         const landingPage = document.getElementById('landing-page');
//         const databasePage = document.getElementById('database-page');
//         const addUserPage = document.getElementById('add-user-page');
//         const deleteUserPage = document.getElementById('delete-user-page');

//         // buttons
//         const displayDatabase = document.getElementById('database-button');
//         const addUser = document.getElementById('add-user-button');
//         const deleteUser = document.getElementById('delete-user-button');
        
//         // back buttons
//         const databasePageBack = document.getElementById('database-page-back');
//         const addUserCancel = document.getElementById('add-user-cancel');
//         const deleteUserCancel = document.getElementById('delete-user-cancel');



//         document.getElementById('login-button').addEventListener('click', function(){
//             //AND CHECK WITH DATABASE IF PASSWORD===PASSWORD
//             console.log("Form submitted");
            
//             var userPassword = document.getElementById('userPasswordLogin').value;
//             console.log("Password entered:", userPassword);
        
//             var xhr = new XMLHttpRequest();
//             xhr.open('POST', 'phpDb/passwordChecker.php', true);
//             xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            
//             xhr.onreadystatechange = function() {
//                 console.log('detected a change in the system');
//                 if (xhr.readyState === 4 && xhr.status === 200) {
//                     var response = xhr.responseText.trim();
//                     if (response === 'correct') {
//                         displayMain.style.display='none';
//                     const username=document.getElementById('user-name-login').textContent;
//                     document.getElementById('nav-title').textContent=`Production Operator : ${username}`;

//                     landingPage.style.display='block';
//                     displayMainNav.style.display='block';
//                     } else if (response == 'incorrect') {
//                         alert("Incorrect password");
//                     } else if (response == 'notfound') {
//                         alert("Employee ID not found.");
//                     } else {
//                         console.log("Unexpected response: " + response);
//                     }
//                 }
//             };
//             xhr.send('userPasswordLogin=' + userPassword + '&userRole=' + "admin");

            
//         })

//         displayDatabase.addEventListener('click', function(){
//             landingPage.style.display='none';
//             databasePage.style.display='block';
//         });
//         databasePageBack.addEventListener('click', function(){
//             databasePage.style.display='none';
//             landingPage.style.display='block';
//         });
//         addUser.addEventListener('click', function(){
//             databasePage.style.display='none';
//             addUserPage.style.display='block';
//         });
//         deleteUser.addEventListener('click', function(){
//             databasePage.style.display='none';
//             deleteUserPage.style.display='block';
//         });
//         addUserCancel.addEventListener('click', function(){
//             addUserPage.style.display='none';
//             databasePage.style.display='block';
//         });
//         deleteUserCancel.addEventListener('click', function(){
//             deleteUserPage.style.display='none';
//             databasePage.style.display='block';
//         });
//         //JAVASCRIPT TO HANDLE PAGE REFRESH WHEN FORM SUBMITTED AND OTHER FORMS
//     const addUserForm  =document.getElementById('addUserForm');

//     document.getElementById('refresh-user-list').addEventListener('click', function() {
//         // Fetch updated user list via AJAX
//         fetch('./phpDb/getUsers.php')
//             .then(response => response.text())
//             .then(data => {
//                 // Replace the content inside the user table body
//                 document.getElementById('userTableBody').innerHTML = data;
//             })
//             .catch(error => console.error('Error fetching user list:', error));
//     });
    
//     document.getElementById('delete-user-confirm').addEventListener('click', function(event) {
//         event.preventDefault(); // Prevent form submission if any
        
//         // Get all checked checkboxes
//         let checkboxes = document.querySelectorAll('input[name="selectedUsers[]"]:checked');
        
//         // Array to hold the selected user IDs
//         let selectedUserIds = [];
        
//         // Loop through the checkboxes and collect the user IDs
//         checkboxes.forEach(function(checkbox) {
//             selectedUserIds.push(checkbox.value);
//         });
//         console.log('"Within delete user upon click');
//         if (selectedUserIds.length > 0) {
//             // Now you have an array of selected user IDs (selectedUserIds)
//             // For now, we can just log them to the console to check
//             console.log('Selected User IDs:', selectedUserIds);

//                 deleteUsers(selectedUserIds);
            
//         } else {
//             alert("No users selected for deletion.");
//         }
//     });
    
//     // Function to send selected user IDs to the server for deletion
//     function deleteUsers(userIds) {
//         // Create a form dynamically to submit via POST
//         let form = document.createElement('form');
//         form.method = 'POST';
//         form.action = './phpDb/deleteUsers.php';  // The PHP script that handles deletion
        
//         console.log("Within deleteUsers function");
//         // Add user IDs as hidden input fields
//         userIds.forEach(function(userId) {
//             let input = document.createElement('input');
//             input.type = 'hidden';
//             input.name = 'userIds[]'; // Array of user IDs
//             input.value = userId;
//             form.appendChild(input);
//         });
        
//         // Append the form to the body and submit it
//         document.body.appendChild(form);
//         form.submit();
//     }

//     }

//     // Auditor logic
//     // Most was written by Ajay (Mortx), I dont know if it's good 
//     if (/auditorIndex\.(html|php)$/.test(window.location.pathname)){
//         function showPage(hideId, showId) {
//             document.getElementById(hideId).style.display = 'none';
//             document.getElementById(showId).style.display = 'block';
//         }
        
//         document.getElementById('login-button').addEventListener('click', function() {
//             showPage('main-page', 'attribute-page');
//             document.getElementById('common-footer').style.display = 'block';
//         });
        
//         document.getElementById('generate-button-1').addEventListener('click', function() {
//             showPage('attribute-page', 'report-page');
//         });
        
//         document.getElementById('generate-button-2').addEventListener('click', function() {
//             showPage('report-page', 'download-page');
//         });
        
//         document.getElementById('back-button').addEventListener('click', function() {
//             if (document.getElementById('report-page').style.display === 'block') {
//                 showPage('report-page', 'attribute-page');
//             } else if (document.getElementById('download-page').style.display === 'block') {
//                 showPage('download-page', 'report-page');
//             }
//         });
//     }

//     if (/managerIndex\.(html|php)$/.test(window.location.pathname)) {
//         // Main page elements
//         const displayMain = document.getElementById('main-page');
//         const displayMainNav = document.getElementById('primary-nav-container');
//         const footerContainer = document.getElementById('footer-container');
        
//         // Pages
//         const landingPage = document.getElementById('landing-page');
//         const performancePage = document.getElementById('performance-page');
//         const machinesManagementPage = document.getElementById('machines-management-page');
//         const machineFormPage = document.getElementById('machine-form-page');
//         const jobsManagementPage = document.getElementById('jobs-management-page');
//         const jobFormPage = document.getElementById('job-form-page');
//         const assignmentsPage = document.getElementById('assignments-page');

//         // Navigation buttons
//         const showPerformance = document.getElementById('show-performance');
//         const showMachinesManagement = document.getElementById('show-machines-management');
//         const showJobsManagement = document.getElementById('show-jobs-management');
//         const showAssignments = document.getElementById('show-assignments');

//         // Back buttons
//         const performanceBack = document.getElementById('performance-page-back');
//         const machinesManagementBack = document.getElementById('machines-management-back');
//         const jobsManagementBack = document.getElementById('jobs-management-back');
//         const assignmentsBack = document.getElementById('assignments-page-back');

//         // Form buttons
//         const addMachineButton = document.getElementById('add-machine-button');
//         const machineFormCancel = document.getElementById('machine-form-cancel');
//         const addJobButton = document.getElementById('add-job-button');
//         const jobFormCancel = document.getElementById('job-form-cancel');

//         // Utility function to hide all pages
//         function hideAllPages() {
//             const pages = document.querySelectorAll('.display-page');
//             pages.forEach(page => page.style.display = 'none');
//         }

//         // Utility function to show a specific page
//         function showPage(page) {
//             hideAllPages();
//             page.style.display = 'block';
//         }

//         document.getElementById('machine-form-cancel').addEventListener('click', function() {
//             // Clear the form
//             document.getElementById('machineForm').reset();
//             // Hide the form page and show the machines management page
//             document.getElementById('machine-form-page').style.display = 'none';
//             document.getElementById('machines-management-page').style.display = 'block';
//         });

//         // Login handler

//         // gpt generated this part

//         // document.getElementById('login-button').addEventListener('click', function(e) {
//         //     e.preventDefault(); // Prevent form submission for demo
//         //     displayMain.style.display = 'none';
//         //     const username = document.getElementById('user-name-login').textContent;
//         //     document.getElementById('nav-title').textContent = `Factory Manager: ${username}`;
//         //     displayMainNav.style.display = 'block';
//         //     footerContainer.style.display = 'block';
//         //     showPage(landingPage);
//         // });

//         document.getElementById('login-button').addEventListener('click', function() {
//             displayMain.style.display = 'none';
//             const username = document.getElementById('user-name-login').textContent;
//             document.getElementById('nav-title').textContent = `Factory Manager: ${username}`;
//             landingPage.style.display = 'block';
//             displayMainNav.style.display = 'block';
//         });

//         // Navigation handlers
//         showPerformance.addEventListener('click', () => showPage(performancePage));
//         showMachinesManagement.addEventListener('click', () => showPage(machinesManagementPage));
//         showJobsManagement.addEventListener('click', () => showPage(jobsManagementPage));
//         showAssignments.addEventListener('click', () => showPage(assignmentsPage));

//         // Back button handlers
//         performanceBack.addEventListener('click', () => showPage(landingPage));
//         machinesManagementBack.addEventListener('click', () => showPage(landingPage));
//         jobsManagementBack.addEventListener('click', () => showPage(landingPage));
//         assignmentsBack.addEventListener('click', () => showPage(landingPage));

//         // // Machine Management
//         // addMachineButton.addEventListener('click', function() {
//         //     document.getElementById('machine-form-title').textContent = 'Add New Machine';
//         //     document.getElementById('machineForm').reset();
//         //     document.getElementById('machine-id').value = '';
//         //     showPage(machineFormPage);
//         // });


//         // machineFormCancel.addEventListener('click', () => showPage(machinesManagementPage));

//         // // Handle machine edit buttons
//         // document.querySelectorAll('[data-machine-id]').forEach(button => {
//         //     if (button.classList.contains('edit-button')) {
//         //         button.addEventListener('click', function() {
//         //             const machineId = this.dataset.machineId;
//         //             document.getElementById('machine-form-title').textContent = 'Edit Machine';
//         //             document.getElementById('machine-id').value = machineId;
//         //             // Here you would typically fetch machine data and populate the form
//         //             showPage(machineFormPage);
//         //         });
//         //     } else if (button.classList.contains('delete-button')) {
//         //         button.addEventListener('click', function() {
//         //             const machineId = this.dataset.machineId;
//         //             if (confirm('Are you sure you want to delete this machine?')) {
//         //                 // Here you would typically send a delete request to the server
//         //                 console.log('Deleting machine:', machineId);
//         //             }
//         //         });
//         //     }
//         // });

//         // // Machine form submission
//         // document.getElementById('machineForm').addEventListener('submit', function(e) {
//         //     e.preventDefault();
//         //     const formData = new FormData(this);
//         //     // Here you would typically send the form data to the server
//         //     console.log('Saving machine:', Object.fromEntries(formData));
//         //     showPage(machinesManagementPage);
//         // });

//         // Machine Management
// addMachineButton.addEventListener('click', function() {
//     document.getElementById('machine-form-title').textContent = 'Add New Machine';
//     document.getElementById('machineForm').reset();
//     document.getElementById('machine-id').value = '';
//     showPage(machineFormPage);
// });

// // Handle machine edit
// document.querySelectorAll('[data-machine-id]').forEach(button => {
//     if (button.classList.contains('edit-button')) {
//         button.addEventListener('click', function() {
//             const machineId = this.dataset.machineId;
//             document.getElementById('machine-form-title').textContent = 'Edit Machine';
            
//             // Fetch machine data from the server
//             fetch(`api/get_machine.php?id=${machineId}`)
//                 .then(response => response.json())
//                 .then(machine => {
//                     // Pre-fill the form with machine data
//                     document.getElementById('machine-id').value = machine.id;
//                     document.getElementById('machine-name').value = machine.machine_name;
//                     document.getElementById('temperature').value = machine.temperature;
//                     document.getElementById('pressure').value = machine.pressure;
//                     document.getElementById('vibration').value = machine.vibration;
//                     document.getElementById('humidity').value = machine.humidity;
//                     document.getElementById('power-consumption').value = machine.power_consumption;
//                     document.getElementById('operational-status').value = machine.operational_status;
//                     document.getElementById('error-code').value = machine.error_code || '';
//                     document.getElementById('production-count').value = machine.production_count || '';
//                     document.getElementById('maintenance-log').value = machine.maintenance_log || '';
//                     document.getElementById('speed').value = machine.speed;
                    
//                     showPage(machineFormPage);
//                 })
//                 .catch(error => {
//                     console.error('Error fetching machine data:', error);
//                     alert('Error loading machine data. Please try again.');
//                 });
//         });
//     }
// });

// // Handle form submission
// document.getElementById('machineForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//     const formData = new FormData(this);
//     const machineId = document.getElementById('machine-id').value;
//     const url = machineId ? 'api/update_machine.php' : 'api/add_machine.php';

//     // Add timestamp for new machines
//     if (!machineId) {
//         formData.append('timestamp', new Date().toISOString().slice(0, 19).replace('T', ' '));
//     }

//     fetch(url, {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             alert(machineId ? 'Machine updated successfully!' : 'Machine added successfully!');
//             showPage(machinesManagementPage);
//             // Reload the page to show updated data
//             location.reload();
//         } else {
//             alert('Error: ' + (data.message || 'Unknown error occurred'));
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('An error occurred. Please try again.');
//     });
// });

//         // Job Management
//         addJobButton.addEventListener('click', function() {
//             document.getElementById('job-form-title').textContent = 'Add New Job';
//             document.getElementById('jobForm').reset();
//             document.getElementById('job-id').value = '';
//             showPage(jobFormPage);
//         });

//         jobFormCancel.addEventListener('click', () => showPage(jobsManagementPage));

//         // Handle job edit buttons
//         document.querySelectorAll('[data-job-id]').forEach(button => {
//             if (button.classList.contains('edit-button')) {
//                 button.addEventListener('click', function() {
//                     const jobId = this.dataset.jobId;
//                     document.getElementById('job-form-title').textContent = 'Edit Job';
//                     document.getElementById('job-id').value = jobId;
//                     // Here you would typically fetch job data and populate the form
//                     showPage(jobFormPage);
//                 });
//             } else if (button.classList.contains('delete-button')) {
//                 button.addEventListener('click', function() {
//                     const jobId = this.dataset.jobId;
//                     if (confirm('Are you sure you want to delete this job?')) {
//                         // Here you would typically send a delete request to the server
//                         console.log('Deleting job:', jobId);
//                     }
//                 });
//             }
//         });

//         // Job form submission
//         document.getElementById('jobForm').addEventListener('submit', function(e) {
//             e.preventDefault();
//             const formData = new FormData(this);
//             // Here you would typically send the form data to the server
//             console.log('Saving job:', Object.fromEntries(formData));
//             showPage(jobsManagementPage);
//         });

//         // Assignment Management
//         document.getElementById('assignmentForm').addEventListener('submit', function(e) {
//             e.preventDefault();
//             const operatorId = document.getElementById('operator-select').value;
//             const jobId = document.getElementById('job-select').value;
            
//             // Here you would typically send the assignment to the server
//             console.log('Creating assignment:', { operatorId, jobId });
            
//             // For demo purposes, add the assignment to the table
//             const tbody = document.getElementById('assignments-table');
//             const tr = document.createElement('tr');
//             tr.innerHTML = `
//                 <td>${document.getElementById('operator-select').selectedOptions[0].text}</td>
//                 <td>${document.getElementById('job-select').selectedOptions[0].text}</td>
//                 <td>Assigned</td>
//                 <td>
//                     <button class="delete-button" onclick="this.closest('tr').remove()">Remove</button>
//                 </td>
//             `;
//             tbody.appendChild(tr);
//             this.reset();
//         });

//         // Add AJAX functionality for form submissions
//         function handleFormSubmit(url, formData) {
//             return fetch(url, {
//                 method: 'POST',
//                 body: formData,
//                 headers: {
//                     'X-Requested-With': 'XMLHttpRequest'
//                 }
//             })
//             .then(response => response.json())
//             .catch(error => {
//                 console.error('Error:', error);
//                 alert('An error occurred. Please try again.');
//             });
//         }

//         // Handle update machine status
//         function updateMachineStatus(machineId, status) {
//             const formData = new FormData();
//             formData.append('machine_id', machineId);
//             formData.append('status', status);
//             return handleFormSubmit('update_machine_status.php', formData);
//         }

//         // Handle update job status
//         function updateJobStatus(jobId, status) {
//             const formData = new FormData();
//             formData.append('job_id', jobId);
//             formData.append('status', status);
//             return handleFormSubmit('update_job_status.php', formData);
//         }

//         // Initialize any tooltips or popovers
//         const tooltips = document.querySelectorAll('[data-toggle="tooltip"]');
//         tooltips.forEach(tooltip => {
//             tooltip.addEventListener('mouseover', function() {
//                 this.setAttribute('title', this.dataset.originalTitle);
//             });
//         });
//     }


    


// });





document.addEventListener('DOMContentLoaded', function(){
    
    // Operators logic
    if (/operatorIndex\.(html|php)$/.test(window.location.pathname)){

        // Sam's implementation

        // Pages
        const realJobPage = document.getElementById('real-job-page');
        const currentJobPage= document.getElementById('current-job-page');
        const landingPage = document.getElementById('landing-page');
        const performancePage = document.getElementById('performance-page');
        const machinesPage = document.getElementById('machines-page');
        const currentMachinePage = document.getElementById('current-machine-page');

        // Buttons

        // I know this is a dumb solution but I dont have time to figure out an elegant solution, but it works as our website is small, linear pages don't work too well with branching paths

        const displayJobs = document.getElementById('show-jobs');
        const displayPerformance = document.getElementById('show-performance');
        const displayMachines = document.getElementById('show-machines');``


        const performancePageBack = document.getElementById('performance-page-back');
        const jobsPageBack = document.getElementById('jobs-page-back');
        const machinesPageBack = document.getElementById('machines-page-back');
        const currentMachineBack = document.getElementById('current-machine-back');

        const queued = document.getElementById("queued");
        const progress = document.getElementById("progress");
        const completed= document.getElementById("completed");
        
        // forwards navigation
        displayJobs.addEventListener('click', function(){
            landingPage.style.display='none';
            realJobPage.style.display='block';
        });
        displayPerformance.addEventListener('click', function(){
            landingPage.style.display='none';
            performancePage.style.display='block';
        });
        displayMachines.addEventListener('click', function(){
            landingPage.style.display='none';
            machinesPage.style.display='block';
        });
    
        
        // backwards navigation
        performancePageBack.addEventListener('click', function(){
            landingPage.style.display='block';
            performancePage.style.display='none';
        });
        jobsPageBack.addEventListener('click', function(){
            landingPage.style.display='block';
            realJobPage.style.display='none';
        });
        machinesPageBack.addEventListener('click', function(){
            landingPage.style.display='block';
            machinesPage.style.display='none';
        });
        currentMachineBack.addEventListener('click', function(){
            landingPage.style.display='block';
            currentMachinePage.style.display='none';
        });
        

        // Pete

        const displayMain = document.getElementById('main-page');
        const displayMainNav = document.getElementById('primary-nav-container');
        const displayFooter = document.getElementById('footer-container');

        const displayFooterBack =document.getElementById('back-button');
        const displayFooterUpdate =document.getElementById('update-button');
        const displayFooterHelp = document.getElementById('help-button');


        displayFooterBack.addEventListener('click',function(){
            realJobPage.style.display='block';
            currentJobPage.style.display='none';
            displayFooterUpdate.style.display='none';
            displayFooterBack.style.display='none';
        });

        console.log(`Found Document ${window.location.pathname}`);

        const section = document.querySelectorAll('.display-page');
        let pageCounter =0;


        document.getElementById('login-button').addEventListener('click', function(){
            console.log("Form submitted");
            
            var userPassword = document.getElementById('userPasswordLogin').value;
            console.log("Password entered:", userPassword);
        
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'phpDb/passwordChecker.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            
            xhr.onreadystatechange = function() {
                console.log('detected a change in the system');
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var response = xhr.responseText.trim();
                    if (response === 'correct') {
                        displayMain.style.display='none';
                        const username=document.getElementById('user-name-login').textContent;
                        document.getElementById('nav-title').textContent=`Production Operator : ${username}`;
                        pageTransition(1,0,0);
                    } else if (response == 'incorrect') {
                        alert("Incorrect password");
                    } else if (response == 'notfound') {
                        alert("Employee ID not found.");
                    } else {
                        console.log("Unexpected response: " + response);
                    }
                }
            };
            xhr.send('userPasswordLogin=' + userPassword + '&userRole=' + "operator");

            //AND CHECK WITH DATABASE IF PASSWORD===PASSWORD
            
        });
        let jobID=0;
        let employeeID=0;
        
        document.querySelectorAll('.job-pointer-container').forEach(function(jobPointer){
            jobPointer.addEventListener('submit', function(event) {
                event.preventDefault();
                console.log("Job submitted");
                var form = event.target.querySelector('button');
                var selectedJob = form.value.trim();
                console.log(selectedJob);
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'phpDb/jobPointer.php', true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                
                xhr.onreadystatechange = function() {
                    console.log('detected a change in the system');
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var response = xhr.responseText.trim();
                        var responseArray = response.split(",");
                        jobID = responseArray[3];
                        employeeID = responseArray[4];
                        console.log('Full response: ' + response);
                        console.log('Job Name: ' + responseArray[0]); // jobName
                        console.log('Job Status: ' + responseArray[1]); // jobStatus
                        console.log('Job Note: ' + responseArray[2]); // jobNote
                        console.log('Updated job id and employee id to: ' + jobID + ", " + employeeID);
                        jobDetails(responseArray[1],responseArray[2]);

                        document.getElementById('current-job-text').textContent=responseArray[0];
                        console.log("Response by system is"+response);
                    }
                };
                console.log('selectedJob=' + selectedJob);
                xhr.send('selectedJob=' + selectedJob);
            });
        });
        function jobDetails(status, note){
            if(status == "queued"){
                queued.checked=true;
                progress.checked=false;
                completed.checked=false;
            }else if(status == "progress"){
                queued.checked=true;
                progress.checked=true;
                completed.checked=false;
            }else if(status == "completed"){
                queued.checked=true;
                progress.checked=true;
                completed.checked=true;
            }
            realJobPage.style.display="none";
            currentJobPage.style.display="block";
            displayFooterBack.style.display="block";
            displayFooterUpdate.style.display="block";
            document.getElementById('form-notes').value=note;
        };

        displayFooterHelp.addEventListener('click', function(){
            const helpOverlay = document.getElementById('help-overlay-container');
            helpOverlay.style.display='flex';
            document.getElementById('close-help').addEventListener('click', function(){
                helpOverlay.style.display='none';
            });
            
        });
        console.log("Do we even get to here test");
        displayFooterUpdate.addEventListener('click', function(){
            console.log("Footer update has been clickedf");
            let latestStatus = "";
            if(queued.checked){
                latestStatus="queued";
            }
            if(progress.checked){
                latestStatus="progress";
            }
            if(completed.checked){
                latestStatus="completed";
            }
            var latestNotes = document.getElementById('form-notes').value;
            updateJob(latestStatus, latestNotes);
        });
        function updateJob(latestStatus, latestNotes) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "phpDb/updateJob.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            console.log("Before processing data to be sent latestStatus is: "+latestStatus +"\njobID is "+jobID);
            // Create the data string to send
            var data = "jobStatus=" + encodeURIComponent(latestStatus) +
                       "&jobNotes=" + encodeURIComponent(latestNotes) +
                       "&jobID=" + encodeURIComponent(jobID) +
                       "&employeeID=" + encodeURIComponent(employeeID); // Ensure employeeID is defined
            

            console.log(data);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log("Update response:", xhr.responseText);
                    // Handle response here, e.g., display a success message
                }
            };
        
            // Send the request with the data
            xhr.send(data);
        }
        function pageTransition(page, back, update){
            displayMainNav.style.display='block';
            displayFooter.style.display='block';
            if(page==1){
                section[pageCounter].style.display='none';
                section[pageCounter+1].style.display='block';
                pageCounter++;
            }else{
                section[pageCounter].style.display='none';
                section[pageCounter-1].style.display='block'; 
                pageCounter--;
            }

            if(back==0 || pageCounter==1){
                displayFooterBack.style.display='none';
            }else if(back==1){displayFooterBack.style.display='block';}
            if(update==0){
                displayFooterUpdate.style.display='none';
            }else{displayFooterUpdate.style.display='block';}
        };


        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
                const label = document.querySelector(`label[for="${this.id}"]`);
                if (this.checked) {
                    label.style.textDecoration = 'line-through'; 
                } else {
                    label.style.textDecoration = 'none';
                }
            });
        });
        
        document.querySelectorAll('.machine-pointer-container').forEach(function(machinePointer) {
            machinePointer.addEventListener('submit', function(event) {
                event.preventDefault();
                console.log("Machine submitted");
                var form = event.target.querySelector('button');
                var selectedMachine = form.value.trim(); // Get the machine ID
                console.log(selectedMachine);
                
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'phpDb/machinePointer.php', true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                
                xhr.onreadystatechange = function() {
                    console.log('Detected a change in the system');
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var response = xhr.responseText.trim();
                        var responseArray = response.split(",");
                        console.log('Full response: ' + response);
                        console.log('Machine Name: ' + responseArray[0]); // Machine Name
                        console.log('Timestamp: ' + responseArray[1]); // Timestamp
                        console.log('Temperature: ' + responseArray[2]); // Temperature
                        console.log('Pressure: ' + responseArray[3]); // Pressure
                        console.log('Vibration: ' + responseArray[4]); // Vibration
                        console.log('Humidity: ' + responseArray[5]); // Humidity
                        console.log('Power Consumption: ' + responseArray[6]); // Power Consumption
                        console.log('Operational Status: ' + responseArray[7]); // Operational Status
                        console.log('Error Code: ' + responseArray[8]); // Error Code
                        console.log('Production Count: ' + responseArray[9]); // Production Count
                        console.log('Maintenance Log: ' + responseArray[10]); // Maintenance Log
                        console.log('Speed: ' + responseArray[11]); // Speed
                        
                        // Display the machine details
                        machineDetails(responseArray);
                    }
                };
                console.log('selectedMachine=' + selectedMachine);
                xhr.send('selectedMachine=' + selectedMachine);
            });
        });
        
        function machineDetails(details) {
            // Update the UI with the machine details
            document.getElementById('machine-id').textContent = details[0]; // Machine ID
            document.getElementById('current-machine-name').textContent = details[0]; // Machine Name
            document.getElementById('timestamp').textContent = details[1]; // Timestamp
            document.getElementById('temperature').textContent = details[2]; // Temperature
            document.getElementById('pressure').textContent = details[3]; // Pressure
            document.getElementById('vibration').textContent = details[4]; // Vibration
            document.getElementById('humidity').textContent = details[5]; // Humidity
            document.getElementById('power-consumption').textContent = details[6]; // Power Consumption
            document.getElementById('operational-status').textContent = details[7]; // Operational Status
            document.getElementById('error-code').textContent = details[8] !== 'NULL' ? details[8] : 'No Error'; // Error Code
            document.getElementById('production-count').textContent = details[9] !== 'NULL' ? details[9] : 'N/A'; // Production Count
            document.getElementById('maintenance-log').textContent = details[10] !== 'NULL' ? details[10] : 'No Maintenance'; // Maintenance Log
            document.getElementById('speed').textContent = details[11]; // Speed
            
            // Show the machine details page
            document.getElementById('current-machine-page').style.display = "block";
            machinesPage.style.display="none";
        }
        
        
        // Sam's implementation




    }

    // Admin logic
    if (/adminIndex\.(html|php)$/.test(window.location.pathname)){
        
        //borrowed logic from Pete's implementation
        const displayMain = document.getElementById('main-page');
        const displayMainNav = document.getElementById('primary-nav-container');

        console.log(`Found Document ${window.location.pathname}`);
        
        // Sam's implementation
        
        // pages
        const landingPage = document.getElementById('landing-page');
        const databasePage = document.getElementById('database-page');
        const addUserPage = document.getElementById('add-user-page');
        const deleteUserPage = document.getElementById('delete-user-page');

        // buttons
        const displayDatabase = document.getElementById('database-button');
        const addUser = document.getElementById('add-user-button');
        const deleteUser = document.getElementById('delete-user-button');
        
        // back buttons
        const databasePageBack = document.getElementById('database-page-back');
        const addUserCancel = document.getElementById('add-user-cancel');
        const deleteUserCancel = document.getElementById('delete-user-cancel');



        document.getElementById('login-button').addEventListener('click', function(){
            //AND CHECK WITH DATABASE IF PASSWORD===PASSWORD
            console.log("Form submitted");
            
            var userPassword = document.getElementById('userPasswordLogin').value;
            console.log("Password entered:", userPassword);
        
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'phpDb/passwordChecker.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            
            xhr.onreadystatechange = function() {
                console.log('detected a change in the system');
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var response = xhr.responseText.trim();
                    if (response === 'correct') {
                        displayMain.style.display='none';
                    const username=document.getElementById('user-name-login').textContent;
                    document.getElementById('nav-title').textContent=`Production Operator : ${username}`;

                    landingPage.style.display='block';
                    displayMainNav.style.display='block';
                    } else if (response == 'incorrect') {
                        alert("Incorrect password");
                    } else if (response == 'notfound') {
                        alert("Employee ID not found.");
                    } else {
                        console.log("Unexpected response: " + response);
                    }
                }
            };
            xhr.send('userPasswordLogin=' + userPassword + '&userRole=' + "admin");

            
        })

        displayDatabase.addEventListener('click', function(){
            landingPage.style.display='none';
            databasePage.style.display='block';
        });
        databasePageBack.addEventListener('click', function(){
            databasePage.style.display='none';
            landingPage.style.display='block';
        });
        addUser.addEventListener('click', function(){
            databasePage.style.display='none';
            addUserPage.style.display='block';
        });
        deleteUser.addEventListener('click', function(){
            databasePage.style.display='none';
            deleteUserPage.style.display='block';
        });
        addUserCancel.addEventListener('click', function(){
            addUserPage.style.display='none';
            databasePage.style.display='block';
        });
        deleteUserCancel.addEventListener('click', function(){
            deleteUserPage.style.display='none';
            databasePage.style.display='block';
        });
        //JAVASCRIPT TO HANDLE PAGE REFRESH WHEN FORM SUBMITTED AND OTHER FORMS
    const addUserForm  =document.getElementById('addUserForm');

    document.getElementById('refresh-user-list').addEventListener('click', function() {
        // Fetch updated user list via AJAX
        fetch('./phpDb/getUsers.php')
            .then(response => response.text())
            .then(data => {
                // Replace the content inside the user table body
                document.getElementById('userTableBody').innerHTML = data;
            })
            .catch(error => console.error('Error fetching user list:', error));
    });
    
    document.getElementById('delete-user-confirm').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission if any
        
        // Get all checked checkboxes
        let checkboxes = document.querySelectorAll('input[name="selectedUsers[]"]:checked');
        
        // Array to hold the selected user IDs
        let selectedUserIds = [];
        
        // Loop through the checkboxes and collect the user IDs
        checkboxes.forEach(function(checkbox) {
            selectedUserIds.push(checkbox.value);
        });
        console.log('"Within delete user upon click');
        if (selectedUserIds.length > 0) {
            // Now you have an array of selected user IDs (selectedUserIds)
            // For now, we can just log them to the console to check
            console.log('Selected User IDs:', selectedUserIds);

                deleteUsers(selectedUserIds);
            
        } else {
            alert("No users selected for deletion.");
        }
    });
    
    // Function to send selected user IDs to the server for deletion
    function deleteUsers(userIds) {
        // Create a form dynamically to submit via POST
        let form = document.createElement('form');
        form.method = 'POST';
        form.action = './phpDb/deleteUsers.php';  // The PHP script that handles deletion
        
        console.log("Within deleteUsers function");
        // Add user IDs as hidden input fields
        userIds.forEach(function(userId) {
            let input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'userIds[]'; // Array of user IDs
            input.value = userId;
            form.appendChild(input);
        });
        
        // Append the form to the body and submit it
        document.body.appendChild(form);
        form.submit();
    }

    }

    // Auditor logic
    // Most was written by Ajay (Mortx), I dont know if it's good 
    if (/auditorIndex\.(html|php)$/.test(window.location.pathname)){
        function showPage(hideId, showId) {
            document.getElementById(hideId).style.display = 'none';
            document.getElementById(showId).style.display = 'block';
        }
        
        document.getElementById('login-button').addEventListener('click', function() {
            showPage('main-page', 'attribute-page');
            document.getElementById('common-footer').style.display = 'block';
        });
        
        document.getElementById('generate-button-1').addEventListener('click', function() {
            showPage('attribute-page', 'report-page');
        });
        
        document.getElementById('generate-button-2').addEventListener('click', function() {
            showPage('report-page', 'download-page');
        });
        
        document.getElementById('back-button').addEventListener('click', function() {
            if (document.getElementById('report-page').style.display === 'block') {
                showPage('report-page', 'attribute-page');
            } else if (document.getElementById('download-page').style.display === 'block') {
                showPage('download-page', 'report-page');
            }
        });
    }

    if (/managerIndex\.(html|php)$/.test(window.location.pathname)) {
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

        // Job Management
        addJobButton.addEventListener('click', function() {
            document.getElementById('job-form-title').textContent = 'Add New Job';
            document.getElementById('jobForm').reset();
            document.getElementById('job-id').value = '';
            showPage(jobFormPage);
        });

        jobFormCancel.addEventListener('click', () => showPage(jobsManagementPage));

        // Handle job edit buttons
        document.querySelectorAll('[data-job-id]').forEach(button => {
            if (button.classList.contains('edit-button')) {
                button.addEventListener('click', function() {
                    const jobId = this.dataset.jobId;
                    document.getElementById('job-form-title').textContent = 'Edit Job';
                    document.getElementById('job-id').value = jobId;
                    // Here you would typically fetch job data and populate the form
                    showPage(jobFormPage);
                });
            } else if (button.classList.contains('delete-button')) {
                button.addEventListener('click', function() {
                    const jobId = this.dataset.jobId;
                    if (confirm('Are you sure you want to delete this job?')) {
                        // Here you would typically send a delete request to the server
                        console.log('Deleting job:', jobId);
                    }
                });
            }
        });

        // Job form submission
        document.getElementById('jobForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            // Here you would typically send the form data to the server
            console.log('Saving job:', Object.fromEntries(formData));
            showPage(jobsManagementPage);
        });

        // Assignment Management
        document.getElementById('assignmentForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const operatorId = document.getElementById('operator-select').value;
            const jobId = document.getElementById('job-select').value;
            
            // Here you would typically send the assignment to the server
            console.log('Creating assignment:', { operatorId, jobId });
            
            // For demo purposes, add the assignment to the table
            const tbody = document.getElementById('assignments-table');
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${document.getElementById('operator-select').selectedOptions[0].text}</td>
                <td>${document.getElementById('job-select').selectedOptions[0].text}</td>
                <td>Assigned</td>
                <td>
                    <button class="delete-button" onclick="this.closest('tr').remove()">Remove</button>
                </td>
            `;
            tbody.appendChild(tr);
            this.reset();
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
    }


    


});







