<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "koneksi.php";

$id = $_GET['id'];

$data = mysqli_query(
    $conn,
    "SELECT * FROM rambu WHERE id='$id'"
);

$row = mysqli_fetch_assoc($data);

if($row){

    if(file_exists("uploads/".$row['foto'])){
        unlink("uploads/".$row['foto']);
    }

    mysqli_query(
        $conn,
        "DELETE FROM rambu WHERE id='$id'"
    );

    echo json_encode([
        "status"=>"success"
    ]);

}else{

    echo json_encode([
        "status"=>"gagal"
    ]);

}