<?php
require_once 'includes/db_connect.php';
session_start();

$receivedID = 1;
// for demo purposes 1=bob manager, 2=rajit operator, 3=john auditor, 4=john admin

$_SESSION['employeeId'] = $receivedID;

// Fetch manager name
$stmt = $pdo->prepare("SELECT name FROM users WHERE user_id = ?");
$stmt->execute([$receivedID]);
$result = $stmt->fetch();
$name = $result['name'] ?? 'Manager not found';

// Fetch all required data
try {
    $stmt_jobs = $pdo->query("SELECT * FROM jobs");
    $jobs = $stmt_jobs->fetchAll();

    $stmt_machines = $pdo->query("SELECT * FROM machines");
    $machines = $stmt_machines->fetchAll();

    $stmt_operators = $pdo->query("SELECT * FROM users WHERE role = 'operator'");
    $operators = $stmt_operators->fetchAll();
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Factory Manager Dashboard">
    <link rel="stylesheet" href="styles/styles.css" type="text/css">
    <title>Factory Manager Dashboard</title>
</head>

<body>
    <main>
        <!-- Login Section -->
        <!-- <section class="display-page" id="main-page" style="display:block">
            <div class="login-prompt">
                <h2 id="user-name-login">
                    < ? php echo $name; ?> remove the space
                </h2>
                <form id="passwordForm" method="POST" action="passwordChecker.php">
                    <input class="user-password-login" type="password" id="userPasswordLogin" name="userPasswordLogin" placeholder="Enter Password" required />
                    <br><br>
                    <div class="login-inline">
                        <a href="main.php"><button type="button" class="switch-user-button">Different User</button></a>
                        <button type="submit" class="login-button" id="login-button">Login</button>
                    </div>
                </form>
            </div>
        </section> -->

        <section class="display-page" id="main-page" style="display:block">
            <div class="login-prompt">
                <h2 id="user-name-login">
                    <?php echo $name; ?>
                </h2>
                <input class="user-password-login" type="password" placeholder="Enter Password" />
                <div class="login-inline">
                    <a href="main.php"><button type="button" class="switch-user-button">Different User</button></a>
                    <button type="button" class="login-button" id="login-button">Login</button>
                </div>
            </div>
        </section>

        <!-- Navigation Bar -->
        <nav class="primary-nav" id="primary-nav-container" style="display:none">
            <nav class="nav-container">
                <h1 id="nav-title">Factory Manager Dashboard</h1>
                <span>
                    <a href="main.php"><img class="nav-icon" src="images/logout.png" alt="logout-icon"></a>
                    <img class="nav-icon" src="images/user-icon.png" alt="user-icon">
                </span>
            </nav>
        </nav>

        <!-- Landing Page -->
        <section class="display-page" id="landing-page" style="display:none">
            <div class="top-subtitle">
                <h3>Company notices: </h3>
                <h4>Fire drill today at 3:00PM ACST</h4>
            </div>
            <div class="middle-container" id="manager-middle-container">
                <div><a class="operator-task-icons" id="show-performance"><img src="images/performance.png" alt="performance-icon">Monitor Factory Performance</a></div>
                <div><a class="operator-task-icons" id="show-machines-management"><img src="images/machine.png" alt="machine-icon">Manage Machines</a></div>
                <div><a class="operator-task-icons" id="show-jobs-management"><img src="images/suitcase.png" alt="jobs-icon">Manage Jobs</a></div>
                <div><a class="operator-task-icons" id="show-assignments"><img src="images/user-icon.png" alt="assignment-icon">Manage Assignments</a></div>
            </div>
        </section>

        <!-- Performance Page -->
        <section class="display-page" id="performance-page" style="display:none">
            <div><img src="images/fake-performance-stats.png" alt="performance-stats"></div>
            <br>
            <div><button class="footer-button" id="performance-page-back">Back</button></div>
        </section>

        <!-- Machines Management Page -->
        <section class="display-page" id="machines-management-page" style="display:none">
            <div class="top-subtitle">
                <h2>Machines Management</h2>
                <button class="action-button" id="add-machine-button">Add New Machine</button>
            </div>
            <div class="x-track">
                <?php if (!empty($machines)): ?>
                    <?php foreach ($machines as $machine): ?>
                        <div class="machine-item">
                            <span>Machine: <?php echo $machine['machine_name']; ?></span>
                            <div class="machine-actions">
                                <button class="edit-button" data-machine-id="<?php echo $machine['id']; ?>">Edit</button>
                                <button class="delete-button" data-machine-id="<?php echo $machine['id']; ?>">Delete</button>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php else: ?>
                    <p>No machines found</p>
                <?php endif; ?>
            </div>
            <br>
            <button class="footer-button" id="machines-management-back">Back</button>
        </section>

        <!-- Add/Edit Machine Form -->
        <section class="display-page" id="machine-form-page" style="display:none">
            <div class="form-container">
                <h2 id="machine-form-title">Add New Machine</h2>
                <form id="machineForm">
                    <input type="hidden" id="machine-id" name="machine-id">

                    <div class="form-group">
                        <label for="machine-name">Machine Name:</label>
                        <input type="text" id="machine-name" name="machine_name" required maxlength="50">
                    </div>

                    <div class="form-group">
                        <label for="temperature">Temperature:</label>
                        <input type="number" id="temperature" name="temperature" step="0.01" required>
                    </div>

                    <div class="form-group">
                        <label for="pressure">Pressure:</label>
                        <input type="number" id="pressure" name="pressure" step="0.01" required>
                    </div>

                    <div class="form-group">
                        <label for="vibration">Vibration:</label>
                        <input type="number" id="vibration" name="vibration" step="0.01" required>
                    </div>

                    <div class="form-group">
                        <label for="humidity">Humidity:</label>
                        <input type="number" id="humidity" name="humidity" step="0.01" required>
                    </div>

                    <div class="form-group">
                        <label for="power-consumption">Power Consumption:</label>
                        <input type="number" id="power-consumption" name="power_consumption" step="0.01" required>
                    </div>

                    <div class="form-group">
                        <label for="operational-status">Operational Status:</label>
                        <select id="operational-status" name="operational_status" required>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="error-code">Error Code:</label>
                        <input type="text" id="error-code" name="error_code" maxlength="20">
                    </div>

                    <div class="form-group">
                        <label for="production-count">Production Count:</label>
                        <input type="number" id="production-count" name="production_count">
                    </div>

                    <div class="form-group">
                        <label for="maintenance-log">Maintenance Log:</label>
                        <textarea id="maintenance-log" name="maintenance_log" maxlength="255"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="speed">Speed:</label>
                        <input type="number" id="speed" name="speed" step="0.01" required>
                    </div>

                    <div class="form-actions">
                        <button type="submit" class="submit-button">Save Machine</button>
                        <button type="button" class="cancel-button" id="machine-form-cancel">Cancel</button>
                    </div>
                </form>
            </div>
        </section>

        <!-- Jobs Management Page -->
        <section class="display-page" id="jobs-management-page" style="display:none">
            <div class="top-subtitle">
                <h2>Jobs Management</h2>
                <button class="action-button" id="add-job-button">Add New Job</button>
            </div>
            <div class="x-track">
                <?php if (!empty($jobs)): ?>
                    <?php foreach ($jobs as $job): ?>
                        <div class="job-item">
                            <span>Job: <?php echo $job['name']; ?> (<?php echo $job['status']; ?>)</span>
                            <div class="job-actions">
                                <button class="edit-button" data-job-id="<?php echo $job['id']; ?>">Edit</button>
                                <button class="delete-button" data-job-id="<?php echo $job['id']; ?>">Delete</button>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php else: ?>
                    <p>No jobs found</p>
                <?php endif; ?>
            </div>
            <br>
            <button class="footer-button" id="jobs-management-back">Back</button>
        </section>

        <!-- Add/Edit Job Form editC -->
        <section class="display-page" id="job-form-page" style="display:none">
            <div class="form-container">
                <h2 id="job-form-title">Add New Job</h2>
                <form id="jobForm">
                    <input type="hidden" id="job-id" name="job-id">

                    <div class="form-group">
                        <label for="job-name">Job Name:</label>
                        <input type="text" id="job-name" name="name" required maxlength="100">
                    </div>

                    <div class="form-group">
                        <label for="job-status">Status:</label>
                        <select id="job-status" name="status" required>
                            <option value="queued">Queued</option>
                            <option value="progress">In Progress</option>
                            <option value="finished">Finished</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="job-notes">Notes:</label>
                        <textarea id="job-notes" name="notes"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="job-operator">Operator:</label>
                        <select id="job-operator" name="operator" required>
                            <?php foreach ($operators as $operator): ?>
                                <option value="<?php echo $operator['user_id']; ?>">
                                    <?php echo htmlspecialchars($operator['name']); ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="job-machine">Machine:</label>
                        <select id="job-machine" name="machine" required>
                            <?php foreach ($machines as $machine): ?>
                                <option value="<?php echo $machine['id']; ?>">
                                    <?php echo htmlspecialchars($machine['machine_name']); ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>

                    <div class="form-actions">
                        <button type="submit" class="submit-button">Save Job</button>
                        <button type="button" class="cancel-button" id="job-form-cancel">Cancel</button>
                    </div>
                </form>
            </div>
        </section>

        <!-- Operator Assignment Page -->
        <section class="display-page" id="assignments-page" style="display:none">
            <div class="top-subtitle">
                <h2>Operator Assignments</h2>
            </div>
            <div class="assignments-container">
                <div class="assignment-form">
                    <h3>Assign Operator to Job</h3>
                    <form id="assignmentForm">
                        <div class="form-group">
                            <label for="operator-select">Select Operator:</label>
                            <select id="operator-select" required>
                                <?php foreach ($operators as $operator): ?>
                                    <option value="<?php echo $operator['user_id']; ?>">
                                        <?php echo $operator['name']; ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="job-select">Select Job:</label>
                            <select id="job-select" required>
                                <?php foreach ($jobs as $job): ?>
                                    <option value="<?php echo $job['id']; ?>">
                                        <?php echo $job['name']; ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <button type="submit" class="submit-button">Assign Operator</button>
                    </form>
                </div>
                <div class="current-assignments">
                    <h3>Current Assignments</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Operator</th>
                                <th>Job</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="assignments-table">
                            <!-- Assignments will be populated here -->
                        </tbody>
                    </table>
                </div>
            </div>
            <br>
            <button class="footer-button" id="assignments-page-back">Back</button>
        </section>

        <!-- Footer -->
        <footer class="bottom-container" id="footer-container" style="display: none;">
            <div>
                <img src="images/manufactoring-logo.png" alt="manufactoring-logo" class="footer-manufacture-logo">
                <button class="footer-button" id="help-button">Help</button>
            </div>
        </footer>
    </main>

    <script type="text/javascript" src="scripts/manager_scripts.js"></script>
</body>

</html>