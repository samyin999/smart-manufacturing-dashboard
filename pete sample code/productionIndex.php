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
    <?php
    
    session_start();
    $conn = mysqli_connect('localhost', 'dbamin', '', 'productiondb');
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    $receivedID = 1; #NOTE THIS MUST BE RECEIVED AND BE pre-PROCESSED TO ENSURE NO INJECTION ATTACKS
    $_SESSION['employeeId'] = $receivedID;

    $name = "SELECT firstName, lastName FROM employeeData WHERE employeeID=$receivedID;";
    $result = mysqli_query($conn, $name);
    $row = mysqli_fetch_assoc($result);
    $fullName = ($row['firstName'].' '.$row['lastName']);
    
    $jobQueryStmt = $conn->prepare("SELECT jobID, jobName, jobNote, jobStatus FROM jobList WHERE employeeID = ?");
    $jobQueryStmt -> bind_param("i", $receivedID);
    $jobQueryStmt -> execute();
    $jobResult = $jobQueryStmt -> get_result();
    

    ?>
    
        <section class="display-page" id="main-page" style="display:block">
            <nav class="secondary-nav">
                <h1 id="employee-title">Production Operator</h1>
                <img class="secondary-nav-logo" src="images/manufactoring-logo.png" alt="manufactoring-logo">
            </nav>
            <div class="login-prompt">
                <h2 id="user-name-login"> <!--To be linked from main.html when signing in. Use session_start or transfer from js-->
                    <?php echo $fullName; ?>
                </h2>
                <form id="passwordForm" method="POST" action="passwordChecker.php"> 
                    <input class="user-password-login" type="password" id="userPasswordLogin" name="userPasswordLogin" placeholder="Enter Password" required/> 
                        <div class="login-inline">
                            <a href="main.php"><button type="button" class="switch-user-button">Different User</button></a>
                            <button type="submit" class="login-button" id="login-button">Login</button> 
                        </div>
                </form>
            </div> 
        </section>
        <div class="primary-nav" id="primary-nav-container"style="display:none">
            <nav class="nav-container">
                <h1 id="nav-title">Production Operator : ${name}</h1>
                <span>
                    <a href="main.php"><img class="nav-icon" src="images/logout.png" alt="logout-icon"></a> <!--main.html required for link-->
                    <img class="nav-icon" src="images/user-icon.png" alt="user-icon"> 
                </span>
            </nav>
        </div>
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

        <section class="display-page" id="job-page" style="display:none">
            <div class="x-track"> 
                <?php 
                if($jobResult -> num_rows>0){
                    while($row = $jobResult -> fetch_assoc()){
                        echo "<form class='job-pointer-container' method='post' action =''>";
                        echo "<button type='submit' class='job-pointer' value='".($row['jobID'])."'> Job:". htmlspecialchars($row['jobName']) . "</button>";
                        echo "</form>";
                    }
                } else{
                    echo "<button class='job-pointer'> No Jobs found </ul>";
                }
                ?>
                
            </div>
        </section>
        <section class="display-page" id="current-job-page" style="display:none">
            <div class="top-subtitle">
                <h4 id="current-job-text">${current-job.textContent}</h4> 
            </div>
            <div class="middle-container" style="justify-content: center;">
                <div id="left-job-container">
                    <h4 style="margin-top:2vh;">Status: </h4>
                    <div>
                        <div>
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
                    <h4>Notes:</h4> 
                    <input type="form" id="form-notes"name="submitNotes" placeholder="Enter any additional information regarding the job, including issues, requests, and further commodities">
                </div>
            </div>
        </section>
       
        <div id="help-overlay-container">
            <div id="help-overlay">
                <button id="close-help">X</button>
                <h1 style="position: absolute; top:4vmin">Help!</h1>
                <img src="images/manufactoring-logo.png" alt="manufactoring-logo" style="width: 12vmin; height:10vmin">
                <p style="max-width: 20vmin; font-size: 1.5vmin;">If you have any questions or need assistance while using this site, please contact our support team at 1-800-123-4567. We're here to help!</p>
            </div>
        </div>
        <footer class="bottom-container" id="footer-container" style="display: none;">
            <div>
                <img src="images/manufactoring-logo.png" alt="manufactoring-logo" class="footer-manufacture-logo">
                <button class="footer-button" id="back-button" style="display:none">Back</button> 
                <button class="footer-button"id="update-button" style="display:none">Update</button> 
                <button class="footer-button" id="help-button">Help</button>
            </div>
        </footer>
    
    </main>

    <script type="text/javascript" src="scripts/scripts.js"></script>
    
</body>
</html>