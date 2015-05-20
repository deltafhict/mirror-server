<?php
	class Util {
		public static function console($data) {
			?>
				<script type="text/javascript">
			   		console.log('<?php echo ($data)?>');
			   	</script>
			<?php
		}
	}
?>