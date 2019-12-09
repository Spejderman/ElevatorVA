<?php
include 'cult_db_details.php';

// Get query arguments
if(isset($_GET["operation"])) $operation = htmlspecialchars($_GET["operation"]);
if(isset($_GET["value"])) $value = htmlspecialchars($_GET["value"]);

$conn = mysqli_connect($servername, $username, $password, $dbname);
if(!$conn) {
    echo mysqli_error($conn);
}

switch($operation){
    case 'read':
            $sql = "SELECT what FROM $tablename ORDER BY RAND() LIMIT 1";
            $result = mysqli_query($conn,$sql);
            $row = mysqli_fetch_array($result);
            if($row[0] == "") echo "empty";
            else echo $row[0];
        break;
    case 'write':
            $sql = "INSERT INTO $tablename (what) VALUES ('$value')";
            $result = mysqli_query($conn,$sql);
        break;
    case 'count':
            $sql = "SELECT COUNT( what ) FROM $tablename";
            $result = mysqli_query($conn,$sql);
            $row = mysqli_fetch_array($result);
            echo $row[0];
        break;
}

mysqli_close($conn);
?>