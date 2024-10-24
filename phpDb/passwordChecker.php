<?php
session_start();

// Include database connection using PDO
require_once '../includes/db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the input password from the POST request
    $employeeId =0;
    

    $userRole = $_POST['userRole'] ?? '';
    if ($userRole=="admin") {
        $employeeId = $_SESSION['employeeID'];
    } elseif ($userRole=="operator") {
        $employeeId = $_SESSION['employeeOpId'];
    } else {
        die("No valid session found.");
    }

    $inputPassword = $_POST['userPasswordLogin'] ?? '';
    //echo "Input Password: " . htmlspecialchars($inputPassword) . "<br>";
    // Prepare the SQL statement to fetch the user based on employee ID from the session
    $stmt = $pdo->prepare("SELECT password FROM users WHERE user_id = :employeeid");
    $stmt->bindParam(':employeeid', $employeeId, PDO::PARAM_INT);
    $stmt->execute();
    
    // Fetch the result
    $pasrow = $stmt->fetch(PDO::FETCH_ASSOC);
   //echo "Employee ID: " . htmlspecialchars($employeeId) . "<br>";

    if ($pasrow) {
        // Verify the password (assuming passwords are stored in plain text, otherwise modify accordingly)
        //echo "Fetched Password: " . htmlspecialchars($pasrow['password']) . "<br>";
        $hashPassword = password_hash($pasrow['password'], PASSWORD_DEFAULT);

        if (password_verify($inputPassword, $hashPassword)) {
            echo 'correct';
        } else {
            echo 'incorrect';
        }
    } else {
        echo 'notfound'; // User not found
    }

}
?>
