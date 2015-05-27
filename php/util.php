<?php
	class Util {
		/**
		 * Prints the data to the console.
		 * @param $data The data to log.
		 */
		public static function console($data) {
			?>
				<script type="text/javascript">
			   		console.log("<?php echo ('$data')?>");
			   	</script>
			<?php
		}
	}
?>