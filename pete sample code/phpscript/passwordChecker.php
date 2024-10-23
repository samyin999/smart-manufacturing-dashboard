<?php
    
    session_start();

    $conn = mysqli_connect('localhost', 'dbamin', '', 'productiondb');
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    if($_SERVER["REQUEST_METHOD"]=="POST"){
        
        $inputPassword = $_POST['userPasswordLogin'] ?? '';
        $stmt = $conn->prepare("SELECT password FROM employeePrivy WHERE employeeID= ?");
        $stmt->bind_param("i", $_SESSION['employeeId']);
        $stmt -> execute();

        $pasresult = $stmt->get_result();
        if($pasresult->num_rows>0){
            $pasrow = $pasresult->fetch_assoc();

            $hashPassword = password_hash($pasrow['password'], PASSWORD_DEFAULT);

            if(password_verify($inputPassword, $hashPassword)){
                echo 'correct';
            } else if(!password_verify($inputPassword, $hashPassword)){ echo 'incorrect';
            }else{echo'notfound';}
        }
        
        $stmt -> close();
    }
    $conn->close();
    ?>