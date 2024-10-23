<?php
require_once 'db_connect.php';

// Turn on error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Test database connection
echo "<h3>Testing Database Connection:</h3>";

try {
    // Simple select query
    $stmt = $pdo->query("SELECT * FROM jobs");
    $jobs = $stmt->fetchAll();
    
    echo "Connection successful!<br>";
    echo "Number of jobs found: " . count($jobs) . "<br><br>";
    
    // Display the raw data
    echo "<pre>";
    print_r($jobs);
    echo "</pre>";
    
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>