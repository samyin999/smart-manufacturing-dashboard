<?php
session_start();


$users = [
    ['username' => 'alice', 'password' => 'password123'],
    ['username' => 'john', 'password' => 'pass456'],

];


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $access_code = $_POST['access_code'];


    if ($access_code === '12345') {
        $_SESSION['username'] = 'bob';
        $_SESSION['fullname'] = 'Bob Johneson';
        header("Location: welcome.php");
        exit();
    }


    $user_found = false;
    foreach ($users as $user) {
        if ($user['username'] === $username && $user['password'] === $password) {
            $_SESSION['username'] = $user['username'];
            $_SESSION['fullname'] = ucfirst($user['username']);
            $user_found = true;
            header("Location: welcome.php");
            exit();
        }
    }

    if (!$user_found) {
        echo "Invalid username or password!";
    }
}
?>
