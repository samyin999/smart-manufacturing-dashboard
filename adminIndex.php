<?php
session_start();
$_SESSION['employeeID'] = 4;
$employeeId = $_SESSION['employeeID'];

// for demo purposes 1=bob manager, 2=rajit operator, 3=john auditor, 4=john admin

// Include database connection
require_once 'includes/db_connect.php';

// Fetch all users from the database
$stmt = $pdo->query("SELECT * FROM users");
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

$stmtp = $pdo->prepare("SELECT * FROM users WHERE user_id = :employeeid");
$stmtp->bindParam(':employeeid', $employeeId, PDO::PARAM_INT); 
$stmtp->execute();
$userp= $stmtp->fetch(PDO::FETCH_ASSOC);

$userName = $userp['name'];
// Function to safely output HTML
function h($string)
{
    return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
}

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $stmt = $pdo->query("SELECT MAX(user_id) AS max_id FROM users");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $max_id = $row['max_id'];

// Reset the AUTO_INCREMENT value
    $next_id = $max_id + 1; // Set to the next available id
    $pdo->exec("ALTER TABLE users AUTO_INCREMENT = $next_id");
    if(isset($_POST['form_type']) && $_POST['form_type'] == 'add_user'){
        $name = $_POST['name'];
    $role = $_POST['role'];
    $job = isset($_POST['job']) ? $_POST['job'] : null;
    $description = isset($_POST['description']) ? $_POST['description'] : null;
    
    // Prepare the SQL statement for inserting a new user
    $sql = "INSERT INTO users (name, role, job, description) VALUES (:name, :role, :job, :description)";
    
    try {
        // Prepare the query using the PDO connection
        $stmt = $pdo->prepare($sql);
    
        // Bind the form data to the SQL query
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':role', $role, PDO::PARAM_STR);
        $stmt->bindParam(':job', $job, PDO::PARAM_STR);
        $stmt->bindParam(':description', $description, PDO::PARAM_STR);
    
        // Execute the query
        if ($stmt->execute()) {
            
        } else {
            
        }
        header("Location: adminIndex.php?success=1");
        exit;
    } catch (PDOException $e) {
        echo "Database error: " . $e->getMessage();
    }
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Interface</title>
    <meta name="description" content="Admin index/login page">
    <link rel="stylesheet" href="styles/styles.css" type="text/css">
    <title>Admin Index page</title>
</head>

<body>

    <main>

        <!-- login -->
        <section class="display-page" id="main-page" style="display:block">

            <div class="login-prompt">
                <h2 id="user-name-login"> <!--To be linked from main.html when signing in-->
                    <?php echo $userName;?>
                </h2>
                <input class="user-password-login" type="form" id="userPasswordLogin" name="userPasswordLogin" placeholder="Enter Password" /><!--Check with database for correct entry-->
                <div class="login-inline">
                    <a href="main.php"><button class="switch-user-button">Different
                            User</button></a><!--TODO LINK TO MAIN-PAGE-->
                    <button class="login-button" id="login-button">Login</button>
                </div>
            </div>
        </section>

        <!-- nav bar -->
        <nav class="primary-nav" id="primary-nav-container" style="display:none">
            <nav class="nav-container">
                <h1 id="nav-title">Administrator : ${name}</h1>
                <span>
                    <a href="main.php"><img class="nav-icon" src="images/logout.png" alt="logout-icon"></a>
                    <!--main.html required for link-->
                    <img class="nav-icon" src="images/user-icon.png" alt="user-icon">
                    <!--What even is the use of user-icon what page would it link to-->
                </span>
            </nav>
        </nav>

        <!-- page 1: landing -->
        <section class="display-page" id="landing-page" style="display:none">
            <div class="top-subtitle">
                <h3>Company notices: </h3>
                <h4>Fire drill today at 3:00PM ACST</h4>

            </div>

            <div class="top-subtitle">
                <h2>Network Information:</h2>
            </div>

            <div>
                <ul>
                    <li>Global internet connection: Online</li>
                    <li>Local information hubs: Online</li>
                    <li>2 managers currently on shift</li>
                    <li>44 operators currently on shift</li>
                    <li>Systems operational</li>
                    <li>Temperature nominal</li>
                </ul>
            </div>

            <br><br>

            <button class="rounded-button" id="database-button">User database GUI</button>

        </section>

        <!-- page 2 database -->
        <section class="display-page" id="database-page" style="display:none">
            <h2>User Database</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>name</th>
                        <th>role</th>
                        <th>job</th>
                        <th>description</th>
                    </tr>
                </thead>
                <tbody id="userTableBody">
                    <?php foreach ($users as $user): ?>
                        <tr>
                            <td><?php echo h($user['user_id']); ?></td>
                            <td><?php echo h($user['name']); ?></td>
                            <td><?php echo h($user['role']); ?></td>
                            <td><?php echo h($user['job']); ?></td>
                            <td><?php echo h($user['description']); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            
            <button class="footer-button database-buttons" id="add-user-button">Add</button>
            <button class="footer-button database-buttons" id="delete-user-button">Delete</button>
            <button class="footer-button database-buttons" id="refresh-user-list">Refresh</button>

            <br><br>
            <div><button class="footer-button" id="database-page-back">Back</button></div>

        </section>

        <!-- add new user -->

        <section class="display-page" id="add-user-page" style="display:none">
            <div class="user-form-container">
                <h2 class="user-form-title">Add New User</h2>

                <form id="addUserForm" class="user-form" method="post">
                <input type="hidden" name="form_type" value="add_user">
                    <div class="user-form-group">
                        <label class="user-form-label">Name<span class="user-form-required">*</span></label>
                        <input type="text" name="name" class="user-form-input" required>
                    </div>

                    <div class="user-form-group">
                        <label class="user-form-label">Role<span class="user-form-required">*</span></label>
                        <select name="role" class="user-form-select" required>
                            <option value="">Select a role</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="auditor">Auditor</option>
                            <option value="operator">Operator</option>
                        </select>
                    </div>

                    <div class="user-form-group">
                        <label class="user-form-label">Job Title</label>
                        <input type="text" name="job" class="user-form-input">
                    </div>

                    <div class="user-form-group">
                        <label class="user-form-label">Description</label>
                        <textarea name="description" class="user-form-textarea"></textarea>
                    </div>

                    <button type="submit" class="user-form-submit">Add User</button>

                    <button class="user-form-submit" id="add-user-cancel">Cancel</button>
                </form>
            </div>
        </section>

        <!-- delete user -->

        <section class="display-page" id="delete-user-page" style="display:none">
            <div class="delete-user-container">
                <h2 class="delete-user-title">Delete Users</h2>
                <p class="delete-user-instruction">Select the users you want to delete:</p>

                <table class="delete-user-table">
                    <thead>
                        <tr>
                            <th class="delete-user-th delete-user-checkbox-col">
                                <input type="checkbox" id="selectAll" class="delete-user-checkbox">
                            </th>
                            <th class="delete-user-th">ID</th>
                            <th class="delete-user-th">Name</th>
                            <th class="delete-user-th">Role</th>
                            <th class="delete-user-th">Job</th>
                            <th class="delete-user-th">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($users as $user): ?>
                            <tr class="delete-user-tr">
                                <td class="delete-user-td delete-user-checkbox-col">
                                    <input type="checkbox" name="selectedUsers[]"
                                        value="<?php echo h($user['user_id']); ?>"
                                        class="delete-user-checkbox">
                                </td>
                                <td class="delete-user-td"><?php echo h($user['user_id']); ?></td>
                                <td class="delete-user-td"><?php echo h($user['name']); ?></td>
                                <td class="delete-user-td"><?php echo h($user['role']); ?></td>
                                <td class="delete-user-td"><?php echo h($user['job']); ?></td>
                                <td class="delete-user-td"><?php echo h($user['description']); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>

                <div class="delete-user-actions">
                    <button id="delete-user-confirm" class="delete-user-button delete-user-confirm">Delete Selected</button>

                    <button id="delete-user-cancel" class="delete-user-button">Cancel</button>
                </div>
            </div>
        </section>

    </main>


    <script type="text/javascript" src="scripts/scripts.js"></script>
</body>

</html>