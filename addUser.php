<?php
// add_user.php

// Database connection
$host = 'localhost';
$dbname = 'user_management';
$username = 'root';
$password = ''; // Leave blank if you haven't set a password in XAMPP

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Could not connect to the database $dbname :" . $e->getMessage());
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password
    $category = $_POST['category'];
    $role = $_POST['role'];
    $full_name = $_POST['full_name'];
    $description = $_POST['description'];

    try {
        // Prepare and execute the stored procedure
        $stmt = $pdo->prepare("CALL add_user(?, ?, ?, ?, ?, ?)");
        $stmt->execute([$username, $password, $category, $role, $full_name, $description]);

        echo "User added successfully!";
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>