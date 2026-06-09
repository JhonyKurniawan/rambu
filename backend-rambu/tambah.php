<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

include "koneksi.php";

$nama = $_POST['nama_rambu'];
$lokasi = $_POST['lokasi_daerah'];
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];

$namaFoto = "";

if(isset($_FILES['foto'])){

    $foto = $_FILES['foto']['name'];
    $tmp = $_FILES['foto']['tmp_name'];

    $namaFoto = time().'_'.$foto;

    if(
    move_uploaded_file(
        $tmp,
        "uploads/".$namaFoto
    )
){
    echo "Uploads berhasil";
}else{
    echo "Uploads gagal";
}
}

mysqli_query(
$conn,

"INSERT INTO rambu
(
nama_rambu,
lokasi_daerah,
latitude,
longitude,
foto
)

VALUES
(
'$nama',
'$lokasi',
'$latitude',
'$longitude',
'$namaFoto'
)"
);

echo json_encode([
    "status"=>"success"
]);
