document.addEventListener('DOMContentLoaded', function(){
    if(window.location.pathname.endsWith('productionIndex.php')){
        const displayMain = document.getElementById('main-page');
        const displayMainNav = document.getElementById('primary-nav-container');
        const displayFooter = document.getElementById('footer-container');

        const displayFooterBack =document.getElementById('back-button');
        const displayFooterUpdate =document.getElementById('update-button');
        const displayFooterHelp =document.getElementById('help-button');

        const queued = document.getElementById("queued");
        const progress = document.getElementById("progress");
        const completed= document.getElementById("completed");

        console.log(`Found Document ${window.location.pathname}`);

        let section = document.querySelectorAll('.display-page');
        let pageCounter =0;

        document.getElementById('passwordForm').addEventListener('submit', function(event) {
         
            event.preventDefault();
            console.log("Form submitted");
            
            var userPassword = document.getElementById('userPasswordLogin').value;
            console.log("Password entered:", userPassword);
        
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'phpscript/passwordChecker.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            
            xhr.onreadystatechange = function() {
                console.log('detected a change in the system');
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var response = xhr.responseText.trim();
                    if (response === 'correct') {
                        pageTransition(1, 0, 0);
                        displayMain.style.display = 'none';
                        const username = document.getElementById('user-name-login').textContent;
                        document.getElementById('nav-title').textContent = `Production Operator: ${username}`;
                    } else if (response == 'incorrect') {
                        alert("Incorrect password");
                    } else if (response == 'notfound') {
                        alert("Employee ID not found.");
                    } else {
                        console.log("Unexpected response: " + response);
                    }
                }
            };
            xhr.send('userPasswordLogin=' + userPassword);

        });

        
        document.querySelectorAll('.attribute-container').forEach(function(button){
            button.addEventListener('click', function(event){
                const buttonId = event.currentTarget.id;
            

                if(buttonId == 'job-pointer-atr'){
                    pageTransition(1,1,0);
                }else if(buttonId == 'performance-pointer-atr'){
                    factoryPerformancePage();
                }else{
                    pageTransition(1,1,0);
                }
            });
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
                xhr.open('POST', 'phpscript/jobPointer.php', true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                
                xhr.onreadystatechange = function() {
                    console.log('detected a change in the system');
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var response = xhr.responseText.trim();
                        var responseArray = response.split(",");
                        jobID = responseArray[3];
                        employeeID = responseArray[4];
                        console.log('Updated job id and employee id to: '+jobID +", "+employeeID);
                        jobDetails(responseArray[1],responseArray[2]);
                        document.getElementById('current-job-text').textContent=responseArray[0];
                        pageTransition(1, 1, 1);
                        console.log("Response by system is"+response);
                    }
                };
                xhr.send('selectedJob=' + selectedJob);
            });
        })
        
        displayFooterBack.addEventListener('click',function(){
            pageTransition(0,1,0);
        });
        displayFooterUpdate.addEventListener('click', function(){
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
        displayFooterHelp.addEventListener('click', function(){
            const helpOverlay = document.getElementById('help-overlay-container');
            helpOverlay.style.display='flex';
            document.getElementById('close-help').addEventListener('click', function(){
                helpOverlay.style.display='none';
            });
            
        });

        function updateJob(latestStatus, latestNotes) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "phpscript/updateJob.php", true);
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
            console.log('pageCounter being processed: '+pageCounter);
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
            document.getElementById('form-notes').value=note;
        };

    }
});