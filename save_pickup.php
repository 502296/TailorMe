<?php

// الاتصال بقاعدة البيانات

$conn = new mysqli("localhost", "root", "", "tailorme_db");

if ($conn->connect_error) {

    die("Connection failed: " . $conn->connect_error);

}



// استقبال البيانات

$signature = $_POST['pickup_signature'];



// فك الترميز base64

$signature = str_replace('data:image/png;base64,', '', $signature);

$signature = str_replace(' ', '+', $signature);

$signatureData = base64_decode($signature);



// تجهيز SQL

$stmt = $conn->prepare("INSERT INTO signatures (pickup_signature) VALUES (?)");

$stmt->bind_param("b", $null);

$stmt->send_long_data(0, $signatureData);



// تنفيذ

if ($stmt->execute()) {

    echo "✅ Signature saved!";

} else {

    echo "❌ Error: " . $stmt->error;

}



$stmt->close();

$conn->close();

?>
