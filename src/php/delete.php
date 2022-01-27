<?php


// here we can see the delete functionality.
$conn = new mysqli("localhost", "root", "", "web101");

// this will be the query for deletion of selected data.
$conn->query("DELETE FROM user WHERE id='".$_GET['userid']."'");

// this  functions is we can control data sent to the client or browser by the Web server before some other output has been sent.
header("location: ../../index.html");
?>