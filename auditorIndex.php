<?php
session_start();
$_SESSION['employeeID'] = 3;

// for demo purposes 1=bob manager, 2=rajit operator, 3=john auditor, 4=john admin

// Include database connection
require_once 'includes/db_connect.php';

// No database required here.
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Ajay Kishan">
    <meta name="description" content="Generate Report Pages">
    <link rel="stylesheet" href="styles/styles.css" type="text/css">
    <title>Generate Report Pages</title>
</head>
<body>
    <footer class="bottom-container" id="common-footer" style="display:none">
        <div>
            <img src="images/manufactoring-logo.png" alt="Manufacturing Logo" class="footer-manufacture-logo">
            <button class="footer-button" id="back-button">Back</button>
            <button class="footer-button" id="help-button">Help</button>
        </div>
    </footer>

    <section class="display-page" id="main-page" style="display:on">
        <div class="login-prompt">
            <h2 id="user-name-login">John Auditorman</h2>
            <input class="user-password-login" type="password" name="userPasswordLogin" placeholder="Enter Password">
            <div class="login-inline">
                <a href="#"><button class="switch-user-button">Different User</button></a>
                <button class="login-button" id="login-button">Login</button>
            </div>
        </div>
    </section>

    <section class="display-page" id="attribute-page" style="display:none">
    <nav class="secondary-nav">
            <h1 id="employee-title">Auditor</h1>
            <img class="secondary-nav-logo" src="images/manufactoring-logo.png" alt="manufactoring-logo">
        </nav>
        <!-- <nav class="primary-nav" id="primary-nav-container">
            <div class="nav-container">
                <h1 id="nav-title">Auditor: John Auditorman</h1>
                <span>
                    <a href="settings.php">Settings</a>
                    <a href="logout.php">Logout</a>
                    <img class="nav-icon" src="images/user-icon.png" alt="Profile">
                </span>
            </div>
        </nav> -->
        <div class="top-subtitle">
            <h3>Company notice:</h3>
            <h4>Fire drill today at 3:00PM ACST</h4>
            <h4>Systems operational</h4>
            <h4>Temperature normal</h4>
        </div>
        <div class="report-section">
            <input class="summary-report" type="text" placeholder="Generate Summary report">
            <button class="generate-report-button" id="generate-button-1">✉️ Generate</button>
        </div>
    </section>

    <section class="display-page" id="report-page" style="display:none">
        <nav class="primary-nav" id="primary-nav-container">
            <div class="nav-container">
                <h1 id="nav-title">Generate Report : John Auditorman</h1>
                <span>
                    <img class="nav-icon" src="images/user-icon.png" alt="Profile">
                    <span>Profile</span>
                </span>
            </div>
        </nav>
        <div class="report-header">
            <h3>Generate report</h3>
        </div>
        <div class="date-range-section">
            <h4>Select date range:</h4>
            <div class="date-picker">
                <input type="date" class="date-input" id="start-date">
                <span>to</span>
                <input type="date" class="date-input" id="end-date">
            </div>
            <div class="button-section">
                <button class="footer-button" id="generate-button-2">Generate</button>
            </div>
        </div>
    </section>

    <section class="display-page" id="download-page" style="display:none">
        <nav class="primary-nav" id="primary-nav-container">
            <div class="nav-container">
                <h1 id="nav-title">Report Download : John Auditorman</h1>
                <span>
                    <img class="nav-icon" src="images/user-icon.png" alt="Profile">
                    <span>Profile</span>
                </span>
            </div>
        </nav>
        <div class="report-header">
            <h3>Generate report</h3>
        </div>
        <div class="report-status">
            <h4>Generated report for selected dates.</h4>
            <div class="popup-message">
                <p>Google Chrome Popup: downloading report.pdf</p>
            </div>
        </div>
    </section>

    <script src="scripts/scripts.js"></script>
</body>
</html>