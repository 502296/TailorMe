<?php

$conn = new mysqli("localhost", "root", "", "tailorme_db");

if ($conn->connect_error) {

    die("Connection failed: " . $conn->connect_error);

}



$result = $conn->query("SELECT * FROM signatures ORDER BY created_at DESC");

?>



<!DOCTYPE html>

<html lang="en">

<head>

  <meta charset="UTF-8">

  <title>All Bookings</title>

  <style>

    body { font-family: Arial; background: #f4f4f4; padding: 20px; }

    table { width: 100%; border-collapse: collapse; background: white; }

    th, td { padding: 10px; border: 1px solid #ccc; text-align: center; }

    img { max-height: 80px; border: 1px solid #999; border-radius: 4px; }

    h1 { text-align: center; margin-bottom: 20px; }

  </style>

</head>

<body>



<h1>TailorMe - All Bookings</h1>



<table>

  <tr>

    <th>Name</th>

    <th>Phone</th>

    <th>Items</th>

    <th>Service</th>

    <th>Pickup Time</th>

    <th>Delivery Time</th>

    <th>Pickup Signature</th>

    <th>Delivery Signature</th>

    <th>Created At</th>

  </tr>



<?php while($row = $result->fetch_assoc()): ?>

  <tr>

    <td><?= htmlspecialchars($row['customer_name']) ?></td>

    <td><?= htmlspecialchars($row['phone']) ?></td>

    <td><?= $row['number_of_items'] ?></td>

    <td><?= ucfirst($row['service_type']) ?></td>

    <td><?= $row['pickup_datetime'] ?></td>

    <td><?= $row['delivery_datetime'] ?: '-' ?></td>

    <td>

      <?php if ($row['pickup_signature']): ?>

        <img src="data:image/png;base64,<?= base64_encode($row['pickup_signature']) ?>">

      <?php else: ?> - <?php endif; ?>

    </td>

    <td>

      <?php if ($row['delivery_signature']): ?>

        <img src="data:image/png;base64,<?= base64_encode($row['delivery_signature']) ?>">

      <?php else: ?> - <?php endif; ?>

    </td>

    <td><?= $row['created_at'] ?></td>

  </tr>

<?php endwhile; ?>



</table>



</body>

</html>
