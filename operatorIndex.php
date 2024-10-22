<?php
// Include database connection
require_once 'includes/db_connect.php';

// Fetch all users from the database
$stmt = $pdo->query("SELECT * FROM users");
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Function to safely output HTML
function h($string)
{
    return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Pete Lim">
    <meta name="description" content="Production operator index/login page">
    <link rel="stylesheet" href="styles/styles.css" type="text/css">
    <title>Production operator Index page</title>
</head>
<body>
    <main>
        <!-- page 1 -->
        <section class="display-page" id="main-page" style="display:block">

            <div class="login-prompt">
                <h2 id="user-name-login"> <!--To be linked from main.html when signing in-->
                    Rajit Sharma
                </h2>
                <input class="user-password-login" type="form" name="userPasswordLogin"placeholder="Enter Password"/><!--Check with database for correct entry-->
                <div class="login-inline">
                    <a href="main.php"><button class="switch-user-button">Different User</button></a><!--TODO LINK TO MAIN-PAGE-->
                    <button class="login-button" id="login-button">Login</button> 
                </div>
            </div> 
        </section>

        <!-- nav bar -->
        <nav class="primary-nav" id="primary-nav-container"style="display:none">
            <nav class="nav-container">
                <h1 id="nav-title">Production Operator : ${name}</h1>
                <span>
                    <a href="main.php"><img class="nav-icon" src="images/logout.png" alt="logout-icon"></a> <!--main.html required for link-->
                    <img class="nav-icon" src="images/user-icon.png" alt="user-icon"> <!--What even is the use of user-icon what page would it link to-->
                </span>
            </nav>
        </nav>

        <!-- page 1 -->
        <section class="display-page" id="attribute-page" style="display:none">
            <div class="top-subtitle">
                <h3>Company notice: </h3>
                <h4>Fire drill today at 3:00PM ACST</h4> 
            </div>
            <div class="middle-container">
                <div><a class="attribute-container" id="job-pointer-atr"><img src="images/suitcase.png" alt="update-job-icon" class="attribute-icon">Job List</a></div>
                <div><a class="attribute-container" id="performance-pointer-atr"><img src="images/performance.png" alt="factory-performance-icon" class="attribute-icon">
                    Factory Performance</a></div> <!--Will need to be linked with h-ref? or to have a section within this page-->
                <div><a class="attribute-container" id="machine-pointer-atr"><img src="images/machine.png" alt="update-machine-icon" class="attribute-icon">
                    Update Machine</a></div> <!--Same as performance, but theres no design page for this-->
            </div>
        </section>

        <!-- page 2 -->
        <section class="display-page" id="job-page" style="display:none">
            <div class="x-track"> <!--Data to be extracted from database-->
                <ul class="job-pointer">Job: CNC Machine Inspection</ul>
                <ul class="job-pointer">Job: 3D Printer Troubleshooting</ul>
                <ul class="job-pointer">Job: CNC Inspection</ul>
                <ul class="job-pointer">Job: CNC Irregular Mount</ul>
                <ul class="job-pointer">Job: Unstable network</ul>
            
            </div>
        </section>

        <!-- page 3 -->
        <section class="display-page" id="current-job-page" style="display:none">
            <div class="top-subtitle">
                <h3>Job: </h3>
                <h4 id="current-job-text">${current-job.textContent}</h4> 
            </div>
            <div class="middle-container" style="justify-content: center;">
                <div id="left-job-container">
                    <h4 style="margin-top:2vh;">Status: </h4>
                    <div>
                        <div> <!--Data to be updated by and to update database-->
                            <label for="queued">Queued</label>
                            <input type="checkbox" name="queued" id="queued">
                        </div>
                        <div>
                            <label for="progress">Progress</label>
                            <input type="checkbox" name="progress" id="progress">
                        </div>
                        <div>
                            <label for="completed">Completed</label>
                            <input type="checkbox" name="completed" id="completed">
                        </div>
                    </div>

                </div>
                <div id="right-job-container">
                    <h4>Notes:</h4> <!--Data to be submitted to database, and allow the update button to be functional-->
                    <input type="form" name="submitNotes" placeholder="Enter any additional information regarding the job, including issues, requests, and further commodities">
                </div>
            </div>
        </section>

        <footer class="bottom-container" id="footer-container" style="display: none;">
            <div>
                <img src="images/manufactoring-logo.png" alt="manufactoring-logo" class="footer-manufacture-logo">
                <button class="footer-button" id="back-button" style="display:none">Back</button> 
                <button class="footer-button"id="update-button" style="display:none">Update</button> <!--Needs the form update in current-jobpage-->
                <button class="footer-button" id="help-button">Help</button> <!--What is this for-->
            </div>
        </footer>

        
    </main>

    <script type="text/javascript" src="scripts/scripts.js"></script>
</body>
</html>