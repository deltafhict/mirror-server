<?php
	// include the facebook sdk
	require_once('src/facebook.php');
	 
	// connect to app
	$config = array();
	$config['appId'] = '610065959122959';
	$config['secret'] = 'e234112ea3d4d581e36e7f5cfe1ff145';
	$config['fileUpload'] = false; // optional
	 
	// instantiate
	$facebook = new Facebook($config);
	 
	// set page id
	$pageid = "1575207736042473";
	 
	// now we can access various parts of the graph, starting with the feed
	$pagefeed = $facebook->api("/" . $pageid . "/feed");
	
	echo "<pre>";
	//print_r($pagefeed);
	echo "</pre>";

	echo "<div class=\"fb-feed\">";
	 
	// set counter to 0, because we only want to display 10 posts
	$i = 0;
	foreach($pagefeed['data'] as $post) {
	 
		if ($post['type'] == 'status' || $post['type'] == 'link' || $post['type'] == 'photo') {
	 
			// open up an fb-update div
			echo "<div class='fb-item'>";
	 
				// post the time
	 
				// check if post type is a status
				if ($post['type'] == 'status') {
					if (empty($post['story']) === false) {
						echo "<div class='story'>" . $post['story'] . "</div>";
					} elseif (empty($post['message']) === false) {
						echo "<div class='post'>" . $post['message'] . "</div>";
					}
					echo "<div class='user'><a href='https://www.facebook.com/FalkorNetwork' target='_blank'><span>-</span> " . $post['from']['name'] . " <span>-</span></a></div>";
					echo "<div class='date'>- <span>D:</span> " . date("jS M, Y", (strtotime($post['created_time']))) . " -</div>";
				}
	 
				// check if post type is a link
				if ($post['type'] == 'link') {
					echo "<p><a href=\"" . $post['link'] . "\" target=\"_blank\">" . $post['link'] . "</a></p>";
					echo "<div class='user'><a href='https://www.facebook.com/FalkorNetwork' target='_blank'><span>-</span> " . $post['from']['name'] . " <span>-</span></a></div>";
					echo "<div class='date'>- <span>D:</span> " . date("jS M, Y", (strtotime($post['created_time']))) . " -</div>";
				}
	 
				// check if post type is a photo
				if ($post['type'] == 'photo') {
					if (empty($post['story']) === false) {
						echo "<div class='story'>" . $post['story'] . "</div>";
					} elseif (empty($post['message']) === false) {
						echo "<div class='post'>" . $post['message'] . "</div>";
					}
					//echo "<div class='photo'><a href=\"" . $post['link'] . "\" target=\"_blank\"><img src=" . $post['picture'] ."></a></div>";
					echo "<div class='photo-link'><a href=\"" . $post['link'] . "\" target=\"_blank\"><i class='fa fa-image'></i> View image</a></div>";
					echo "<div class='user'><a href='https://www.facebook.com/FalkorNetwork' target='_blank'><span>-</span> " . $post['from']['name'] . " <span>-</span></a></div>";
					echo "<div class='date'>- <span>D:</span> " . date("jS M, Y", (strtotime($post['created_time']))) . " -</div>";
				}
	 
			echo "</div>"; // close fb-update div
	 
			$i++; // add 1 to the counter if our condition for $post['type'] is met
		}
	 
		//  break out of the loop if counter has reached 10
		if ($i == 999) {
			break;
		}
	} // end the foreach statement
	 
	echo "</div>";
?>