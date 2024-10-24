<?php
require_once '../includes/db_connect.php'; // Ensure correct path

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if userIds were submitted
    if (isset($_POST['userIds']) && is_array($_POST['userIds'])) {
        // Retrieve user IDs from the POST request
        $userIds = $_POST['userIds'];

        // Prepare the SQL to delete the users
        $inQuery = implode(',', array_fill(0, count($userIds), '?'));
        $sql = "DELETE FROM users WHERE user_id IN ($inQuery)";

        // Prepare the statement
        $stmt = $pdo->prepare($sql);

        // Execute the statement with the user IDs
        if ($stmt->execute($userIds)) {
            // Redirect to the user list page after successful deletion
            header('Location: ../adminIndex.php?deleted=1');
            exit;
        } else {
            // Handle failure (e.g., log the error)
            echo "Error deleting users.";
        }
    } else {
        echo "No users selected for deletion.";
    }
}
?>
