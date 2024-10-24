<?php
require_once '../includes/db_connect.php';

try {
    $sql = "UPDATE jobs SET 
            name = ?, status = ?, notes = ?, 
            operator = ?, machine = ?
            WHERE id = ?";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $_POST['name'],
        $_POST['status'],
        $_POST['notes'] ?: null,
        $_POST['operator'],
        $_POST['machine'],
        $_POST['job-id']
    ]);
    
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}