<?php
session_start();

// Include database connection
require_once 'includes/db_connect.php';

// Fetch all users from the database
$stmt = $pdo->query("SELECT * FROM users");
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

$stmtp = $pdo->prepare("SELECT * FROM users WHERE user_id = :employeeid");
$stmtp->bindParam(':employeeid', $employeeId, PDO::PARAM_INT); 
$stmtp->execute();
$userp= $stmtp->fetch(PDO::FETCH_ASSOC);

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
    <meta name="author" content="Hamido, Pete Lim">
    <meta name="description" content="Production operator index/login page">
    <link rel="stylesheet" href="styles/hamindo_styles.css" type="text/css">
    <title>SMD</title>
</head>
<body>  
    <main>
        <!-- Index Page -->
        <section class="indexContainer" id="index-page" style="display:block">
            <br>
            <h1>Welcome to the Smart Manufacturing Dashboard</h1>
            <img src="images/manufactoring-logo.png" class="MainPageLogo" alt="Main Logo">
            <p>Please select your role to continue:</p>
        
            <div class="role-buttons">
                <button onclick="redirectToWorkers('administrator')">Administrator</button><br>
                <button onclick="redirectToWorkers('factoryManager')">Factory Manager</button><br>
                <button onclick="redirectToWorkers('productionOperator')">Production Operator</button><br>
                <button onclick="redirectToWorkers('auditor')">Auditor</button>
            </div>
        </section>

        <!-- Workers Page -->
        <section class="workerContainer" id="worker-page" style="display:none">
            <h1>Select a Worker</h1>
            <br>
            <p>You have selected the role: <strong id="userRole"></strong></p>
            <img src="image/MainLogo.png" class="workerLogo">
            <div id="workerList" class="worker-buttons"></div>
            <p class="worker-not-you">Not you? <a href="index.html">Click here to change</a></p>
        </section>

        <script type="text/javascript" src="scripts/hamindo_scripts.js"></script>

        
    </main>
</body>