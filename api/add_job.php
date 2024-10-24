<?php
require_once '../includes/db_connect.php';

try {
    $sql = "INSERT INTO jobs (name, status, notes, operator, machine) 
            VALUES (?, ?, ?, ?, ?)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $_POST['name'],
        $_POST['status'],
        $_POST['notes'] ?: null,
        $_POST['operator'],
        $_POST['machine']
    ]);
    
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}