<?php

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['selectedJob'])) {
    $selectedJob = $_POST['selectedJob']; 
    $conn = mysqli_connect('localhost', 'dbamin', '', 'productiondb');
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $pointerStmt = $conn->prepare("SELECT jobName, jobNote, jobStatus, jobID, employeeID FROM jobList WHERE jobID = ?");
    $pointerStmt -> bind_param("i", $selectedJob);
    $pointerStmt -> execute();
    $pointerResult = $pointerStmt -> get_result();

    if($pointerResult->num_rows>0){
        $pointerRow = $pointerResult->fetch_assoc();
        echo ($pointerRow['jobName'].",".$pointerRow['jobStatus'].",".$pointerRow['jobNote'].",".$pointerRow['jobID'].",".$pointerRow['employeeID']);
    }else{
        echo 'noStatus';
    }


}
?>