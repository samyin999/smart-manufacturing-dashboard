<?php
$conn = new mysqli('localhost', 'dbadmin', '', 'smart_manufacturing');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Capture input data
$jobStatus = isset($_POST['jobStatus']) ? $_POST['jobStatus'] : '';
$jobNotes = isset($_POST['jobNotes']) ? $_POST['jobNotes'] : '';
$jobID = isset($_POST['jobID']) ? $_POST['jobID'] : '';
$operatorID = isset($_POST['employeeID']) ? $_POST['employeeID'] : ''; // Renamed for clarity

// Update query to match the jobs table structure
$sql = "UPDATE jobs SET status=?, notes=? WHERE id=? AND operator=?";
$stmt = $conn->prepare($sql);

if ($stmt) {
    // Bind parameters
    $stmt->bind_param("ssii", $jobStatus, $jobNotes, $jobID, $operatorID);

    // Execute the statement
    if ($stmt->execute()) {
        echo "success";
    } else {
        echo "Error updating job: " . $stmt->error;
    }

    // Close the statement
    $stmt->close();
} else {
    echo "Error preparing statement: " . $conn->error;
}

// Close the connection
$conn->close();
?>
