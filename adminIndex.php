<?php
// Include database connection
require_once 'includes/db_connect.php';

// Fetch all users from the database
$stmt = $pdo->query("SELECT * FROM users");
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Function to safely output HTML
function h($string)
{
    return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
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
                    Johnny Admin
                </h2>
                <input class="user-password-login" type="form" name="userPasswordLogin"
                    placeholder="Enter Password" /><!--Check with database for correct entry-->
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
        <section class="display-page" id="admin-database" style="display:none">
            <h2>User Database</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Category</th>
                        <th>Role</th>
                        <th>Full Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($users as $user): ?>
                        <tr>
                            <td><?php echo h($user['id']); ?></td>
                            <td><?php echo h($user['username']); ?></td>
                            <td><?php echo h($user['category']); ?></td>
                            <td><?php echo h($user['role']); ?></td>
                            <td><?php echo h($user['full_name']); ?></td>
                            <td><?php echo h($user['description']); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </section>

    </main>


    <script type="text/javascript" src="scripts/scripts.js"></script>
</body>

</html>