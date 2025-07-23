<?php



// الاتصال بقاعدة البيانات

$conn = new mysqli("localhost", "root", "", "tailorme_db");



if ($conn->connect_error) {

    die("Connection failed: " . $conn->connect_error);

}



// استقبال البيانات من النموذج

$customer_name      = $_POST['customer_name'];

$phone              = $_POST['phone'];

$number_of_items    = $_POST['number_of_items'];

$service_type       = $_POST['service_type'];

$delivery_datetime  = $_POST['delivery_datetime'];

$signature          = $_POST['delivery_signature'];



// فك الترميز base64 للتوقيع

$signature = str_replace('data:image/png;base64,', '', $signature);

$signature = str_replace(' ', '+', $signature);

$signatureData = base64_decode($signature);



// تجهيز وتنفيذ استعلام الإدخال

$stmt = $conn->prepare("INSERT INTO signatures (customer_name, phone, number_of_items, service_type, delivery_datetime, delivery_signature) VALUES (?, ?, ?, ?, ?, ?)");

$stmt->bind_param("ssissb", $customer_name, $phone, $number_of_items, $service_type, $delivery_datetime, $null);

$stmt->send_long_data(5, $signatureData);



// تنفيذ الإدخال

if ($stmt->execute()) {

    echo "✅ Delivery signature saved successfully!";

} else {

    echo "❌ Error: " . $stmt->error;

}



// إغلاق الاتصال

$stmt->close();

$conn->close();



?>
