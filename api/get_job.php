<?php
require_once '../includes/db_connect.php';

if (isset($_GET['id'])) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM jobs WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        $job = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($job) {
            echo json_encode($job);
        } else {
            echo json_encode(['error' => 'Job not found']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'No job ID provided']);
}