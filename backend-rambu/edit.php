<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "koneksi.php";

$id = $_POST['id'];

$nama = $_POST['nama_rambu'];
$lokasi = $_POST['lokasi_daerah'];
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];

mysqli_query(
    $conn,

    "UPDATE rambu SET

    nama_rambu='$nama',
    lokasi_daerah='$lokasi',
    latitude='$latitude',
    longitude='$longitude'

    WHERE id='$id'
    "
);

echo json_encode([
    "status"=>"success"
]);