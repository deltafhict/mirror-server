<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 1);

	include_once('database.php');
	include_once('util.php');
	include_once('hybi.php');

	$person = '';

	if(isset($_POST['person'])) {
        $person = $_POST['person'];
    } else if (isset($_GET['person'])) {
    	$person = $_GET['person'];
    } else {
    	die('No person in GET.');
    }

    $con = Database::database_connection();

	$query = "SELECT weather, id FROM user WHERE surname = '$person'";
	$result = mysqli_query($con, $query);

	$app = 'weather';
	$action = 'open';
	$weatherLocation = ''; // To be set.
	$personId = null; // To be set.

	while ($row = mysqli_fetch_array($result))
	{
		$personId = intval($row['id']);
		$weatherLocation = $row['weather'];
	}

	$array = array('app' => $app, 'action' => $action, 'weatherLocation' => $weatherLocation, 'person' => $personId);
	$json = json_encode($array);

	echo $json.'<br />';

	$host = 'localhost';
	$port = 1337;
	$local = "http://localhost/";
	$data = $json;  // data to be sent

	$head = "GET / HTTP/1.1"."\r\n".
	        "Upgrade: WebSocket"."\r\n".
	        "Connection: Upgrade"."\r\n".
	        "Sec-WebSocket-Key: b3B1cw=="."\r\n".
	        "Sec-WebSocket-Version: 13"."\r\n".
	        "Origin: $local"."\r\n".
	        "Host: $host"."\r\n".
	        "Content-Length: ".strlen($data)."\r\n"."\r\n";

	// WebSocket handshake
	$hybi = new Hybi();

	$sock = fsockopen($host, $port, $errno, $errstr, 2);
	fwrite($sock, $head ) or die('error:'.$errno.':'.$errstr);
	$headers = fread($sock, 2000);

	$encodedData = $hybi->encode($data);

	fwrite($sock, $encodedData) or die('error:'.$errno.':'.$errstr);
	$wsdata = fread($sock, 2000);
	fclose($sock);

	Util::console($result);

	Database::close_connection($con);
?>