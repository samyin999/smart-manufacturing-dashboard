<?php

$host = 'localhost';
$dbname = 'your_database_name';  
$username = 'your_username';     
$password = 'your_password';     

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    if (isset($_GET['role'])) {
        $role = $_GET['role'];
        $roleMap = [
            'administrator' => 'Administrator',
            'factory-manager' => 'Factory Manager',
            'production-operator' => 'Production Operator',
            'auditor' => 'Auditor'
        ];

      
        if (array_key_exists($role, $roleMap)) {
           
            $stmt = $conn->prepare("SELECT name FROM workers WHERE role = :role");
            $stmt->bindParam(':role', $roleMap[$role]);
            $stmt->execute();
            $workers = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo "<h1>List of " . htmlspecialchars($roleMap[$role]) . "s</h1>";
            echo "<ul>";
            foreach ($workers as $worker) {
                echo "<li>" . htmlspecialchars($worker['name']) . "</li>";
            }
            echo "</ul>";
        } else {
            echo "Invalid role selected.";
        }
    } else {
        echo "No role selected.";
    }
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
