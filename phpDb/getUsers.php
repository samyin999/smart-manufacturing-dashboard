<?php
require_once '../includes/db_connect.php'; // Ensure your DB connection is included

// Fetch all users from the database
$sql = "SELECT * FROM users";
$stmt = $pdo->query($sql);
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Return the user rows as HTML
foreach ($users as $user) {
    echo "<tr>";
    echo "<td>" . htmlspecialchars($user['user_id']) . "</td>";
    echo "<td>" . htmlspecialchars($user['name']) . "</td>";
    echo "<td>" . htmlspecialchars($user['role']) . "</td>";
    echo "<td>" . htmlspecialchars($user['job']) . "</td>";
    echo "<td>" . htmlspecialchars($user['description']) . "</td>";
    echo "</tr>";
}
