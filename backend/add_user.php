<?php
  // decode json
  $data = json_decode(file_get_contents('php://input'), true);

  sleep(2);

  if ($data['username'] && $data['email'] && $data['password']) {
    $connection = mysqli_connect("localhost", "root", "", "myapp");
    $sql = "INSERT INTO users (username, email, password) VALUES ('{$data['username']}', '{$data['email']}', '{$data['password']}')";
    try {
      $result = mysqli_query($connection, $sql);

      if (!$result) {
        echo json_encode([
          'success' => false
        ]);
      }

      echo json_encode([
        'success' => true
      ]);
    } catch (Exception $e) {
      echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
      ]);
    }
  } else {
    echo json_encode([
      'success' => false,
      'message' => 'username, email and password are required'
    ]);
  }
?>