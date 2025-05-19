<?php
include 'config.php';
header('Content-Type: application/json');

$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action == 'get_students') {
    $result = $conn->query("SELECT * FROM Students");
    $students = [];
    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
    echo json_encode($students);
}

elseif ($action == 'get_marks') {
    $prn = $_GET['prn'];
    $mse = $conn->query("SELECT * FROM MSE WHERE prn = '$prn'")->fetch_assoc();
    $ese = $conn->query("SELECT * FROM ESE WHERE prn = '$prn'")->fetch_assoc();
    echo json_encode(['mse' => $mse, 'ese' => $ese]);
}

elseif ($action == 'add_student' && $_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $prn = $data['prn'];
    $name = $data['name'];
    $branch = $data['branch'];
    $mse = $data['mse'];
    $ese = $data['ese'];

    // Insert into Students
    $stmt = $conn->prepare("INSERT INTO Students (prn, name, branch) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $prn, $name, $branch);
    $stmt->execute();

    // Insert into MSE
    $stmt = $conn->prepare("INSERT INTO MSE (prn, subject1, subject2, subject3, subject4) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sdddd", $prn, $mse['subject1'], $mse['subject2'], $mse['subject3'], $mse['subject4']);
    $stmt->execute();

    // Insert into ESE
    $stmt = $conn->prepare("INSERT INTO ESE (prn, subject1, subject2, subject3, subject4) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sdddd", $prn, $ese['subject1'], $ese['subject2'], $ese['subject3'], $ese['subject4']);
    $stmt->execute();

    echo json_encode(['success' => true]);
}

$conn->close();
?>