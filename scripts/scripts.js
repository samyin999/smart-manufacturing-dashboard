document.addEventListener('DOMContentLoaded', function(){
    if(window.location.pathname.endsWith('productionIndex.html')){
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
});