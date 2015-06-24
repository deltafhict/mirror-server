<?php $base = "resources/" ?>
<!doctype html>
<html lang="nl">
	<head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <title>(Page) | MIRROR</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

        <link rel="stylesheet" href="<?php echo $base; ?>css/normalize.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,700italic,700,300,400' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="<?php echo $base; ?>css/style.css">


        <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
        <script src="<?php echo $base; ?>js/googlecalender.js" type="text/javascript"></script>

        <script src="http://js.leapmotion.com/leap-0.6.3.min.js"></script>
        <script src="http://js.leapmotion.com/leap-plugins-0.1.8.js"></script>
        <script src="<?php echo $base; ?>js/jquery.simpleWeather.js"></script>

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
      <div id="opusOffBlack"></div>
      <video autoplay>
        <source src="resources/images/opus.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video> 

        <div class="date-time">
        	<div id="day" class="day"></div>
        	<div id="date" class="date"></div>
            <div id="time" class="time"></div>
        </div>
        
        <div class="apps-left">
        </div>
        
        <div class="apps-right">
            <div class="app-holder weather-app" id="weather-app">
                <div class="avatar">
                    <div class="temp"></div>
                    <div class="min"></div>
                </div>
            </div>
            
            <div class="app-holder agenda-app" id="agenda-app">
                <div class="events">
                    <ul id="eventlist">
                    </ul>
                </div>
            </div>
        </div>

        <?php include_once('php/footer.php'); ?>

        <!-- libraries -->
        <script src="<?php echo $base; ?>js/jquery.carouFredSel-6.2.1.js"></script>
        <script src="<?php echo $base; ?>js/functions.js"></script>
        <script src="<?php echo $base; ?>js/frontend.js"></script>
        <script src="js/leap-gestures.js"></script>
    </body>
</html>
