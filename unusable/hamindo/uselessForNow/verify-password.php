<?php

$users = [
    'administrator' => ['John Admin' => 'adminpass'],
    'factory-manager' => ['Tim Factoryman' => 'managerpass'],
    'production-operator' => ['Tommy Operator' => 'operatorpass'],
    'auditor' => ['John Auditorman' => 'auditorpass'],
];

$role = $_POST['role'];
$password = $_POST['password'];

if (isset($users[$role])) {
    foreach ($users[$role] as $name => $userPassword) {
        if ($password === $userPassword) {
            echo "Welcome, $name!";
            exit();
        }
    }
}

echo "Incorrect password.";
?>
