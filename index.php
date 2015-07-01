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

        <div class="face-setup">
            <div class="title"id="part1">Stand in front of the mirror 
                if this message stays please move your head till the message disappears.</div>
            <div class="title"id="part2">Turn your head in the direction of the <span>dot</span></div>
            <div class="finish">Face callibration completed</div>
            <div class="dot"><i class="fa fa-dot-circle-o"></i></div>
        </div>

        <div class="voice-setup">
            <div class="title" id="part1">Voice calibration, say the words between the <span>quotation marks</span></div>
            <div class="title" id="part2">Say: "<span>close mail</span>"</div>
            <div class="title" id="part3">Say: "<span>tumbleweed</span>"</div>
            <div class="title" id="part4">Say: "<span>colonel</span>"</div>
            <div class="title" id="part5">Voice callibration completed</div>
            <div class="title" id="part6">Say: "<span>start calibration</span>"</div>
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
            <div class="app-holder traffic-app" id="traffic-app">
                <h2>TRAFFIC JAMS</h2> <img id="carpic" src="resources/images/carblauw.png" height="50px"/>
                    <?php  
                        $rss = new DOMDocument();
                        $rss->load('http://www.fileindex.nl/rss.php');
                        $feed = array();
                        foreach ($rss->getElementsByTagName('item') as $node) {
                            $item = array (
                                'title' => $node->getElementsByTagName('title')->item(0)->nodeValue,
                                'desc' => $node->getElementsByTagName('description')->item(0)->nodeValue,
                                //'link' => $node->getElementsByTagName('link')->item(0)->nodeValue,
                            );
                            array_push($feed, $item);
                        }
                        $limit = 10;
                        for($x=0;$x<$limit;$x++) {
                            $title = str_replace(' & ', ' &amp; ', $feed[$x]['title']);
                            //$link = $feed[$x]['link'];
                            $description = $feed[$x]['desc'];
                           // $date = date('l F d, Y', strtotime($feed[$x]['date']));
                            echo '<article class="traffic"><p>'.$title.'</p></article>';
                        }
                    ?>
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
