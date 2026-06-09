<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

header("Content-Type: application/json");

include "koneksi.php";

$data = [];

$query = mysqli_query(
    $conn,
    "SELECT * FROM rambu ORDER BY id DESC"
);

while($row = mysqli_fetch_assoc($query)){
    $data[] = $row;
}

echo json_encode($data);