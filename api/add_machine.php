<?php
require_once '../includes/db_connect.php';

try {
    $sql = "INSERT INTO machines (
            timestamp, machine_name, temperature, pressure,
            vibration, humidity, power_consumption, operational_status,
            error_code, production_count, maintenance_log, speed
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $_POST['timestamp'],
        $_POST['machine_name'],
        $_POST['temperature'],
        $_POST['pressure'],
        $_POST['vibration'],
        $_POST['humidity'],
        $_POST['power_consumption'],
        $_POST['operational_status'],
        $_POST['error_code'] ?: null,
        $_POST['production_count'] ?: null,
        $_POST['maintenance_log'] ?: null,
        $_POST['speed']
    ]);
    
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}