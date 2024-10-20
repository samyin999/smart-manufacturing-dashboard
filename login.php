<?php
session_start();
require_once 'includes/config.php';
require_once 'includes/db_connect.php';
require_once 'includes/functions.php';

// Check if user is already logged in
if (isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit();
}

$error = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $user = getUserByUsername($username);

    if ($user && password_verify($password, $user['password'])) {
        // Login successful
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = $user['role'];
        header("Location: index.php");
        exit();
    } else {
        $error = "Invalid username or password";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Smart Manufacturing Dashboard</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
    <div class="login-container">
        <h2>Login to Smart Manufacturing Dashboard</h2>
        <?php
        if ($error) {
            echo "<p class='error'>$error</p>";
        }
        ?>
        <form action="login.php" method="post" onsubmit="return validateForm()">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div>
                <input type="submit" value="Login">
            </div>
        </form>
    </div>

    <script src="assets/js/main.js"></script>
</body>
</html>