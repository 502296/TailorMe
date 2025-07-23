<?php

// الاتصال بقاعدة البيانات

$conn = new mysqli("localhost", "root", "", "tailorme_db");

if ($conn->connect_error) {

    die("Connection failed: " . $conn->connect_error);

}



// جلب جميع التواقيع

$sql = "SELECT * FROM signatures ORDER BY id DESC";

$result = $conn->query($sql);

?>



<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <title>View Bookings</title>

    <style>

        body {

            background-color: #0f0f0f;

            color: white;

            font-family: 'Arial';

            padding: 30px;

        }

        table {

            border-collapse: collapse;

            width: 100%;

            background-color: #1a1a1a;

        }

        th, td {

            border: 1px solid #444;

            padding: 10px;

            text-align: left;

        }

        th {

            background-color: #333;

            color: #f1c40f;

        }

        tr:hover {

            background-color: #222;

        }

        img {

            max-width: 200px;

        }

    </style>

</head>

<body>

    <h1>🖊️ Saved Signatures</h1>



    <table>

        <tr>

            <th>ID</th>

            <th>Customer Name</th>

            <th>Phone</th>

            <th>Number of Items</th>

            <th>Service Type</th>

            <th>Pickup Date/Time</th>

            <th>Pickup Signature</th>

        </tr>

        <?php

        if ($result->num_rows > 0):

            while($row = $result->fetch_assoc()):

        ?>

        <tr>

            <td><?= $row["id"] ?></td>

            <td><?= $row["customer_name"] ?></td>

            <td><?= $row["phone"] ?></td>

            <td><?= $row["number_of_items"] ?></td>

            <td><?= $row["service_type"] ?></td>

            <td><?= $row["pickup_datetime"] ?></td>

            <td>

                <?php if (!empty($row["pickup_signature"])): ?>

                    <img src="data:image/png;base64,<?= base64_encode($row["pickup_signature"]) ?>" alt="Signature">

                <?php else: ?>

                    No signature

                <?php endif; ?>

            </td>

        </tr>

        <?php endwhile; else: ?>

        <tr><td colspan="7">No bookings yet.</td></tr>

        <?php endif; ?>

    </table>

</body>

</html>



<?php $conn->close(); ?>
