<?php
require_once '../includes/db_connect.php';

if (isset($_GET['id'])) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM machines WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        $machine = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($machine) {
            echo json_encode($machine);
        } else {
            echo json_encode(['error' => 'Machine not found']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'No machine ID provided']);
}