<?php
header('Content-Type: application/json');
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name'], $data['email'], $data['address'], $data['units'])) {
    echo json_encode(["status" => "error", "message" => "Missing input"]);
    exit;
}

$name = $data['name'];
$email = $data['email'];
$address = $data['address'];
$units = (int)$data['units'];

// Bill calculation
$amount = 0;
$unitsLeft = $units;

if ($unitsLeft <= 50) {
    $amount = $unitsLeft * 3.5;
} else {
    $amount += 50 * 3.5;
    $unitsLeft -= 50;

    if ($unitsLeft <= 100) {
        $amount += $unitsLeft * 4.0;
    } else {
        $amount += 100 * 4.0;
        $unitsLeft -= 100;

        if ($unitsLeft <= 100) {
            $amount += $unitsLeft * 5.2;
        } else {
            $amount += 100 * 5.2;
            $unitsLeft -= 100;
            $amount += $unitsLeft * 6.5;
        }
    }
}

// Insert Consumer
$stmt = $conn->prepare("INSERT INTO Consumer (name, email, address) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $address);
if ($stmt->execute()) {
    $consumer_id = $conn->insert_id;
    $date = date("Y-m-d");

    $stmt2 = $conn->prepare("INSERT INTO Billing (consumer_id, units, amount, billing_date) VALUES (?, ?, ?, ?)");
    $stmt2->bind_param("iids", $consumer_id, $units, $amount, $date);
    if ($stmt2->execute()) {
        echo json_encode([
            "status" => "success",
            "consumer" => $name,
            "units" => $units,
            "amount" => $amount,
            "billing_date" => $date
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Billing insertion failed"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Consumer insertion failed"]);
}
?>
