<?php

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['selectedMachine'])) {
    $selectedMachineId = $_POST['selectedMachine']; 
    $conn = mysqli_connect('localhost', 'root', '', 'smart_manufacturing');
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    // Prepare the statement using the new database structure
    $pointerStmt = $conn->prepare("
        SELECT 
            id,
            timestamp,
            machine_name,
            temperature,
            pressure,
            vibration,
            humidity,
            power_consumption,
            operational_status,
            error_code,
            production_count,
            maintenance_log,
            speed 
        FROM machines 
        WHERE id = ?");
    
    $pointerStmt->bind_param("i", $selectedMachineId);
    $pointerStmt->execute();
    $pointerResult = $pointerStmt->get_result();

    if ($pointerResult->num_rows > 0) {
        $pointerRow = $pointerResult->fetch_assoc();
        // Echo the details in a comma-separated format
        echo implode(",", [
            $pointerRow['machine_name'],
            $pointerRow['timestamp'],
            $pointerRow['temperature'],
            $pointerRow['pressure'],
            $pointerRow['vibration'],
            $pointerRow['humidity'],
            $pointerRow['power_consumption'],
            $pointerRow['operational_status'],
            $pointerRow['error_code'] ?? 'NULL', // Provide a default if NULL
            $pointerRow['production_count'] ?? 'NULL', // Provide a default if NULL
            $pointerRow['maintenance_log'] ?? 'NULL', // Provide a default if NULL
            $pointerRow['speed']
        ]);
    } else {
        echo 'noStatus';
    }

    // Close the statement and connection
    $pointerStmt->close();
    $conn->close();
}
?>
