<?php
	class Database {
		/**
		 * Connects to the database.
		 * @return con The connection object.
		 */
		public static function database_connection() {
			$host = 'mysql02.totaalholding.nl';
			$database = 'basbroek_mirror';
			$user = 'basbroek_mirror';
			$password = 'Tuu-aE9-zto-2H4';

			$con = mysqli_connect($host, $user, $password, $database);
			if (!$con) {
				die('Database connection failed: ' . mysqli_error($con));
			}

			return $con;
		}

		/**
		 * Closes the connection to the database.
		 * @param $con The conection to close.
		 */
		public static function close_connection($con) {
			mysqli_close($con);
		}
	}
?>