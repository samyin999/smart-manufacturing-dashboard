<?php
require_once 'includes/db_connect.php';

// Turn on error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Pete's code, commented out code = doesn't work
session_start();

// $conn = mysqli_connect('localhost', 'dbamin', '', 'productiondb');
// if (!$conn) {
//     die("Connection failed: " . mysqli_connect_error());
// }

$receivedID = 1; #NOTE THIS MUST BE RECEIVED AND BE pre-PROCESSED TO ENSURE NO INJECTION ATTACKS
$_SESSION['employeeId'] = $receivedID;

// $name = "SELECT name FROM users WHERE user_id=$receivedID;";
// $result = mysqli_query($conn, $name);
// $row = mysqli_fetch_assoc($result);
// $fullName = ($row['name'] . ' ' . $row['lastName']);

// $jobQueryStmt = $conn->prepare("SELECT jobID, jobName, jobNote, jobStatus FROM jobList WHERE employeeID = ?");
// $jobQueryStmt->bind_param("i", $receivedID);
// $jobQueryStmt->execute();
// $jobResult = $jobQueryStmt->get_result();

// Below is what ended up working for me

$stmt = $pdo->prepare("SELECT name FROM users WHERE user_id = ?");
$stmt->execute([$receivedID]);
$result = $stmt->fetch();
$name = $result['name'] ?? 'User not found'; //

try {
    // Get both jobs and machines
    $stmt_jobs = $pdo->query("SELECT * FROM jobs");
    $jobs = $stmt_jobs->fetchAll();

    $stmt_machines = $pdo->query("SELECT * FROM machines");
    $machines = $stmt_machines->fetchAll();
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
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
        <!-- "main" page -->
        <section class="display-page" id="main-page" style="display:block">

            <div class="login-prompt">
                <h2 id="user-name-login"> <!--To be linked from main.html when signing in-->
                    <?php echo $name; ?>
                </h2>
                <!-- <input class="user-password-login" type="form" name="userPasswordLogin" placeholder="Enter Password" />
                <div class="login-inline">
                    <a href="main.php"><button class="switch-user-button">Different User</button></a>
                    <button class="login-button" id="login-button">Login</button>
                </div> -->
                <form id="passwordForm" method="POST" action="passwordChecker.php"> 
                    <input class="user-password-login" type="password" id="userPasswordLogin" name="userPasswordLogin" placeholder="Enter Password" required/>
                    <br><br><br>
                        <div class="login-inline">
                            <a href="main.php"><button type="button" class="switch-user-button">Different User</button></a>
                            <button type="submit" class="login-button" id="login-button">Login</button> 
                        </div>
                </form>
            </div>
        </section>

        <!-- nav bar -->
        <nav class="primary-nav" id="primary-nav-container" style="display:none">
            <nav class="nav-container">
                <h1 id="nav-title">Production Operator : ${name}</h1>
                <span>
                    <a href="main.php"><img class="nav-icon" src="images/logout.png" alt="logout-icon"></a> <!--main.html required for link-->
                    <img class="nav-icon" src="images/user-icon.png" alt="user-icon"> <!--What even is the use of user-icon what page would it link to-->
                </span>
            </nav>
        </nav>

        <!-- Landing page -->
        <section class="display-page" id="landing-page" style="display:none">
            <div class="top-subtitle">
                <h3>Company notice: </h3>
                <h4>Fire drill today at 3:00PM ACST</h4>
            </div>
            <div class="middle-container">
                <!-- Pete's static pages -->
                <!-- <div><a class="attribute-container" id="job-pointer-atr"><img src="images/suitcase.png" alt="update-job-icon" class="attribute-icon">Job List</a></div>

                <div><a class="attribute-container" id="performance-pointer-atr"><img src="images/performance.png" alt="factory-performance-icon" class="attribute-icon">
                        Factory Performance</a></div>
                <div><a class="attribute-container" id="machine-pointer-atr"><img src="images/machine.png" alt="update-machine-icon" class="attribute-icon">
                        Update Machine</a></div> 
                        
                I reimplemented the parts here as traversing through pages linearly does not work with the three branching paths (jobs/factory/update)
                        -->

                <div><a class="operator-task-icons" id="show-jobs"><img src="images/suitcase.png" alt="update-job-icon">Job List</a></div>

                <div><a class="operator-task-icons" id="show-performance"><img src="images/performance.png" alt="update-job-icon">Factory Performance</a></div>

                <div><a class="operator-task-icons" id="show-machines"><img src="images/machine.png" alt="update-job-icon">Update Machine</a></div>
            </div>
        </section>

        <!-- Pete's static job page -->
        <section class="display-page" id="job-page" style="display:none">
            <h1>placehold fake job page</h1>
            <div class="x-track"> <!--Data to be extracted from database-->
                <ul class="job-pointer">Job: CNC Machine Inspection</ul>
                <ul class="job-pointer">Job: 3D Printer Troubleshooting</ul>
                <ul class="job-pointer">Job: CNC Inspection</ul>
                <ul class="job-pointer">Job: CNC Irregular Mount</ul>
                <ul class="job-pointer">Job: Unstable network</ul>

            </div>
        </section>

        <!-- real job page -->
        <!-- shows jobs that are in the database, currently only shows the list of jobs, clicking on them does not do anything yet, but should link to the current job page -->

        <section class="display-page" id="real-job-page" style="display:none">
            <h2>Jobs Database</h2>
            <div class="x-track">
                <?php
                if (!empty($jobs)) {
                    foreach ($jobs as $job) { ?>
                        <ul class="job-pointer">
                            Job: <?php echo $job['name']; ?>
                            <span class="job-status">
                                (<?php echo $job['status']; ?>)
                            </span>
                        </ul>
                <?php }
                } else {
                    echo "<p>No jobs found</p>";
                }
                ?>
            </div>

            <br>
            <div><button class="footer-button" id="jobs-page-back">Back</button></div>
        </section>


        <!-- current job page -->
        <!-- I haven't touched this page -->

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

        <!-- Factory performance -->

        <section class="display-page" id="performance-page" style="display:none">
            <div><img src="images/fake-performance-stats.png" alt="update-job-icon"></div>
            <br>
            <div><button class="footer-button" id="performance-page-back">Back</button></div>
        </section>

        <!-- Machines page -->
        <!-- Similar to jobs, clicking on a machine should bring it to the next page -->

        <section class="display-page" id="machines-page" style="display:none">

            <div class="top-subtitle">
                <h2>Machines Database</h2>
            </div>
            <div class="x-track">
                <?php
                if (!empty($machines)) {
                    foreach ($machines as $machine) { ?>
                        <ul class="job-pointer">
                            Machine: <?php echo $machine['machine_name']; ?>
                            <span class="job-status">
                                (ID: <?php echo $machine['id']; ?>)
                            </span>
                        </ul>
                <?php }
                } else {
                    echo "<p>No machines found</p>";
                }
                ?>
            </div>
            <br>
            <div><button class="footer-button" id="machines-page-back">Back</button></div>
            <br>
            <div><button class="footer-button" id="demo-machine-edit-page">Demo machine edit</button></div>

        </section>

        <!-- Edit machines page -->

        <section class="display-page" id="current-machine-page" style="display:none">
            <div class="top-subtitle">
                <h3>Machine: </h3>
                <h4 id="current-job-text">CURRENT MACHINE NAME</h4>
            </div>
            <div class="middle-container" style="justify-content: center;">
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Timestamp</th>
                            <th>Machine Name</th>
                            <th>Temperature</th>
                            <th>Pressure</th>
                            <th>Vibration</th>
                            <th>Humidity</th>
                            <th>Power Consumption</th>
                            <th>Status</th>
                            <th>Error Code</th>
                            <th>Production Count</th>
                            <th>Maintenance Log</th>
                            <th>Speed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>2024-03-20 14:30:00</td>
                            <td>CNC Machine</td>
                            <td>75.30</td>
                            <td>14.50</td>
                            <td>2.45</td>
                            <td>45.60</td>
                            <td>1200.50</td>
                            <td>active</td>
                            <td>NULL</td>
                            <td>1500</td>
                            <td>Regular maintenance completed</td>
                            <td>60.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="top-subtitle">
                <h2>Click to edit (not implemented)</h2>
            </div>
            <br>
            <button class="footer-button" id="current-machine-back">Back</button>
        </section>

        <!-- Footer -->

        <footer class="bottom-container" id="footer-container" style="display: none;">
            <div>
                <img src="images/manufactoring-logo.png" alt="manufactoring-logo" class="footer-manufacture-logo">
                <button class="footer-button" id="back-button" style="display:none">Back</button>
                <button class="footer-button" id="update-button" style="display:none">Update</button> <!--Needs the form update in current-jobpage-->
                <button class="footer-button" id="help-button">Help</button> <!--What is this for-->
            </div>
        </footer>


    </main>

    <script type="text/javascript" src="scripts/scripts.js"></script>
</body>

</html>