<?php



$conn = new mysqli("localhost", "root", "", "tailorme_db");



if ($conn->connect_error) {

    die("Connection failed: " . $conn->connect_error);

}



// استقبال كل البيانات

$customer_name     = $_POST['customer_name'];

$phone             = $_POST['phone'];

$number_of_items   = $_POST['number_of_items'];

$service_type      = $_POST['service_type'];

$pickup_datetime   = $_POST['pickup_datetime'];

$signature         = $_POST['pickup_signature'];



// فك ترميز التوقيع

$signature = str_replace('data:image/png;base64,', '', $signature);

$signature = str_replace(' ', '+', $signature);

$signatureData = base64_decode($signature);



// تجهيز SQL

$stmt = $conn->prepare("INSERT INTO signatures (customer_name, phone, number_of_items, service_type, pickup_datetime, pickup_signature) VALUES (?, ?, ?, ?, ?, ?)");

$stmt->bind_param("ssissb", $customer_name, $phone, $number_of_items, $service_type, $pickup_datetime, $null);

$stmt->send_long_data(5, $signatureData);



// تنفيذ

if ($stmt->execute()) {

    echo "✅ Signature and data saved successfully!";

} else {

    echo "❌ Error: " . $stmt->error;

}



$stmt->close();

$conn->close();

?>
