<?php

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['selectedJob'])) {
    $selectedJobId = $_POST['selectedJob']; 
    $conn = mysqli_connect('localhost', 'root', '', 'smart_manufacturing');
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    // Prepare the statement using the new database structure
    $pointerStmt = $conn->prepare("SELECT name, notes, status, id, operator FROM jobs WHERE id = ?");
    $pointerStmt->bind_param("i", $selectedJobId);
    $pointerStmt->execute();
    $pointerResult = $pointerStmt->get_result();

    if ($pointerResult->num_rows > 0) {
        $pointerRow = $pointerResult->fetch_assoc();
        // Echo the details in a comma-separated format
        echo implode(",", [
            $pointerRow['name'],
            $pointerRow['status'],
            $pointerRow['notes'],
            $pointerRow['id'],
            $pointerRow['operator']
        ]);
    } else {
        echo 'noStatus';
    }

    // Close the statement and connection
    $pointerStmt->close();
    $conn->close();
}
?>
