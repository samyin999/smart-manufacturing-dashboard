document.addEventListener('DOMContentLoaded', function(){
    
    // Operators logic
    if (/operatorIndex\.(html|php)$/.test(window.location.pathname)){
        const displayMain = document.getElementById('main-page');
        const displayMainNav = document.getElementById('primary-nav-container');
        const displayFooter = document.getElementById('footer-container');

        const displayFooterBack =document.getElementById('back-button');
        const displayFooterUpdate =document.getElementById('update-button');
        const displayFooterHelp =document.getElementById('help-button');

        console.log(`Found Document ${window.location.pathname}`);

        const section = document.querySelectorAll('.display-page');
        let pageCounter =0;

        document.getElementById('login-button').addEventListener('click', function(){
            //AND CHECK WITH DATABASE IF PASSWORD===PASSWORD
            displayMain.style.display='none';
            const username=document.getElementById('user-name-login').textContent;
            document.getElementById('nav-title').textContent=`Production Operator : ${username}`;
            pageTransition(1,0,0);
            
        })

        document.querySelectorAll('.attribute-container').forEach(function(button){
            button.addEventListener('click', function(event){
                const buttonId = event.currentTarget.id;
            

                if(buttonId == 'job-pointer-atr'){
                    pageTransition(1,1,0);
                }else if(buttonId == 'performance-pointer-atr'){
                    factoryPerformancePage();
                }else{
                    updateMachinePage();
                }
            });
        });

        document.querySelectorAll('.job-pointer').forEach(function(jobPointer){
            jobPointer.addEventListener('click', function(event){
                document.getElementById('current-job-text').textContent=event.currentTarget.textContent;
                pageTransition(1, 1, 1);
            });
        });
        displayFooterBack.addEventListener('click',function(){
            pageTransition(0,1,0);
        });

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
        
        function factoryPerformancePage(){

        }
        function updateMachinePage(){

        }
    }

    // Admin logic
    if (/adminIndex\.(html|php)$/.test(window.location.pathname)){
        
        //borrowed logic from Pete's implementation
        const displayMain = document.getElementById('main-page');
        const displayMainNav = document.getElementById('primary-nav-container');
        const displayFooter = document.getElementById('footer-container');

        console.log(`Found Document ${window.location.pathname}`);
        
        // Sam's implementation


        const displayLanding = document.getElementById('landing-page');
        const displayDatabase = document.getElementById('admin-database');

        document.getElementById('login-button').addEventListener('click', function(){
            //AND CHECK WITH DATABASE IF PASSWORD===PASSWORD
            displayMain.style.display='none';
            const username=document.getElementById('user-name-login').textContent;
            document.getElementById('nav-title').textContent=`Production Operator : ${username}`;

            displayLanding.style.display='block';
            displayMainNav.style.display='block';
            displayFooter.style.display='block';
        })

        document.getElementById('database-button').addEventListener('click', function(){
            displayLanding.style.display='none';
            displayDatabase.style.display='block';
        });

    }
});

// Ajay's Javascript

// function showPage(hideId, showId) {
//     document.getElementById(hideId).style.display = 'none';
//     document.getElementById(showId).style.display = 'block';
// }

// document.getElementById('login-button').addEventListener('click', function() {
//     showPage('main-page', 'attribute-page');
//     document.getElementById('common-footer').style.display = 'block';
// });

// document.getElementById('generate-button-1').addEventListener('click', function() {
//     showPage('attribute-page', 'report-page');
// });

// document.getElementById('generate-button-2').addEventListener('click', function() {
//     showPage('report-page', 'download-page');
// });

// document.getElementById('back-button').addEventListener('click', function() {
//     if (document.getElementById('report-page').style.display === 'block') {
//         showPage('report-page', 'attribute-page');
//     } else if (document.getElementById('download-page').style.display === 'block') {
//         showPage('download-page', 'report-page');
//     }
// });
