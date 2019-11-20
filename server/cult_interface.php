<?php
include 'cult_db_details.php';

//  Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

if(isset($_GET["topic"])) $topic = htmlspecialchars($_GET["topic"]);
if(isset($_GET["column"])) $column = htmlspecialchars($_GET["column"]);
if(isset($_GET["value"])) $value = htmlspecialchars($_GET["value"]);

// branch for get/set
$sql = "SELECT '$column' FROM '$tablename'";

if ($conn->query($sql) === TRUE) {
//     "New record created successfully";
} else {
//      $conn->error ";
}

$conn->close();
?>