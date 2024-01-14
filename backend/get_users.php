<?php
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, Authorization");

  $connection = mysqli_connect("localhost", "root", "", "myapp");
  $sql = "SELECT id, username, email, 2+2 as whatever, password FROM users";

  $result = mysqli_query($connection, $sql);
  $users = mysqli_fetch_all($result, MYSQLI_ASSOC);

  sleep(2);

  echo json_encode([
    'headers' => ['id', 'username', 'email', 'whatever', 'password'],
    'data' =>$users
  ]);
?>