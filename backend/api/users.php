<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';
require_once '../model/users.php';

// Establish database connection
$database = new Database();
$db = $database->getConnection();

// Create user object
$user = new User($db);

// Get request method
$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'GET':
        // Retrieve users
        if (!isset($_GET['id'])) {
            $stmt = $user->read();
            $num = $stmt->rowCount();

            if ($num > 0) {
                $users_arr = array();

                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    $user_item = array(
                        "id" => $id,
                        "name" => $name,
                        "email" => $email,
                        "dob" => $dob,
                        "created_at" => $created_at
                    );

                    array_push($users_arr, $user_item);
                }

                http_response_code(200);
                echo json_encode($users_arr);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "No users found."));
            }
        } else {
            // Retrieve single user
            $user->id = $_GET['id'];
            $user->readOne();

            $user_arr = array(
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
                "dob" => $user->dob
            );

            http_response_code(200);
            echo json_encode($user_arr);
        }
        break;

    case 'POST':
        // Create user
        $data = json_decode(file_get_contents("php://input"));

        if (
            !empty($data->name) && !empty($data->email) &&
            !empty($data->password) && !empty($data->dob)
        ) {

            $user->name = $data->name;
            $user->email = $data->email;
            $user->password = $data->password;
            $user->dob = $data->dob;

            $new_user_id = $user->create();

            if ($new_user_id) {
                http_response_code(201);
                echo json_encode(array(
                    "message" => "User was created.",
                    "id" => $new_user_id
                ));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to create user."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to create user. Data is incomplete."));
        }
        break;

    case 'PUT':
        // Update user
        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->id) && (!empty($data->name) ||
            !empty($data->email) || !empty($data->dob))) {

            $user->id = $data->id;
            $user->name = $data->name ?? null;
            $user->email = $data->email ?? null;
            $user->password = $data->password ?? null;
            $user->dob = $data->dob ?? null;

            if ($user->update()) {
                http_response_code(200);
                echo json_encode(array("message" => "User was updated."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to update user."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to update user. Data is incomplete."));
        }
        break;

    case 'DELETE':
        // Ensure you can parse different types of input
        $delete_data = json_decode(file_get_contents('php://input'), true);

        // If JSON parsing fails, try alternative method
        if (!$delete_data) {
            parse_str(file_get_contents("php://input"), $delete_data);
        }

        // Debug: Log received data
        error_log('Received delete data: ' . print_r($delete_data, true));

        // Check for ID in different possible locations
        $user_id = null;
        if (isset($delete_data['id'])) {
            $user_id = $delete_data['id'];
        } elseif (isset($_DELETE['id'])) {
            $user_id = $_DELETE['id'];
        }

        if (!empty($user_id)) {
            $user->id = $user_id;

            if ($user->delete()) {
                http_response_code(200);
                echo json_encode(array("message" => "User was deleted.", "id" => $user_id));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to delete user."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to delete user. ID is missing.", "received_data" => $delete_data));
        }
        break;
        http_response_code(405);
        echo json_encode(array("message" => "Method Not Allowed"));
        break;
}
