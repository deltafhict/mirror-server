<?php $base = "resources/"; ?>

<!doctype html>
<html lang="nl">
	<head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <title>(Page) | MIRROR</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,700italic,700,300,400' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="<?php echo $base; ?>css/normalize.css">
        <link rel="stylesheet" href="<?php echo $base; ?>css/style.css">

        <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
        <script src="<?php echo $base; ?>js/googlecalender.js" type="text/javascript"></script>

        <script type="text/javascript">
           jQuery(function ($) {
               $('#eventlist').gCalReader({
                 calendarId:'ispjqa0lvh5eovblhjl8omc9as@group.calendar.google.com',
                 apiKey:'AIzaSyAVhU0GdCZQidylxz7whIln82rWtZ4cIDQ',
                 sortDescending: false
                });
             });
        </script>
    </head>

    <body>