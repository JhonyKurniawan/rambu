<?php

$conn = mysqli_connect(
    "localhost",
    "root",
    "",
    "db_rambu"
);

if(!$conn){
    die("Koneksi gagal");
}
