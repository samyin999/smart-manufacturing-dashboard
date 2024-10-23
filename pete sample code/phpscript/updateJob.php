<?php
$conn = new mysqli('localhost', 'dbadmin', '', 'productiondb');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$jobStatus = isset($_POST['jobStatus']) ? $_POST['jobStatus'] : '';
$jobNotes = isset($_POST['jobNotes']) ? $_POST['jobNotes'] : '';
$jobID = isset($_POST['jobID']) ? $_POST['jobID'] : '';
$employeeID = isset($_POST['employeeID']) ? $_POST['employeeID'] : '';

$sql = "UPDATE jobList SET jobStatus=?, jobNote=? WHERE jobID=? AND employeeID=?";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("ssii", $jobStatus, $jobNotes, $jobID, $employeeID);

    if ($stmt->execute()) {
        echo "success";

    } else {
        echo "Error updating job: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Error preparing statement: " . $conn->error;
}

$conn->close();
?>
