<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 1);

	include_once('database.php');
	include_once('util.php');

	$user = '';
	$type = '';
	$app = '';
	$action = '';

	if(isset($_POST['user'])) {
        $user = $_POST['user'];     
    } else if (isset($_GET['user'])) {
    	$user = $_GET['user'];
    } else {
    	die('No user in POST.');
    }

	if(isset($_POST['type'])) {
        $type = $_POST['type'];     
    } else if (isset($_GET['type'])) {
    	$type = $_GET['type'];
    } else {
    	die('No type in POST.');
    }

    if(isset($_POST['app'])) {
        $app = $_POST['app'];     
    } else if (isset($_GET['app'])) {
    	$app = $_GET['app'];
    } else {
    	die('No app in POST.');
    }

    if(isset($_POST['action'])) {
        $action = $_POST['action'];     
    } else if (isset($_GET['action'])) {
    	$action = $_GET['action'];
    } else {
    	die('No action in POST.');
    }

	$con = Database::database_connection();

	$query = "INSERT INTO result (user, type, app, action) VALUES('$user', '$type', '$app', '$action');";
	$result = mysqli_query($con, $query);

	Util::console($result);

	Database::close_connection($con);
?>