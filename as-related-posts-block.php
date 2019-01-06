<?php
/**
 * Plugin Name: AS Related Posts Block
 * Plugin URI: https://github.com/talentedaamer/as-related-posts-block
 * Description: Related Posts Gutenberg Block for WordPress
 * Text Domain: as-rpb
 * Author: Aamer Shahzad
 * Author URI: http://wpthemecraft.com
 * Version: 1.0.1
 * License: GPL-v2.0 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

/**
 * exit if file is accessed directly
 */
defined('ABSPATH') || exit;

/**
 * only proceed if gutenberg is available
 */
if ( ! function_exists( 'register_block_type' ) ) {
	return;
}

/**
 * plugin dir path and url
 */
if ( ! defined( 'AS_RPB_DIR_PATH' ) )
	define( 'AS_RPB_DIR_PATH', plugin_dir_path( __FILE__ ) );

if ( ! defined( 'AS_RPB_DIR_URI' ) )
	define( 'AS_RPB_DIR_URI', plugin_dir_url( __FILE__ ) );

/**
 * define plugin version
 */
define( 'AS_RPB_VER', '1.0.1' );

/**
 * Class AS_Related_Posts_Block
 */
class AS_Related_Posts_Block {

	/**
	 * AS_Related_Posts_Block constructor.
	 */
	public function __construct() {
		// load block assets for editor and frontend
	}
}

/**
 * initialize the plugin
 */
$as_rpb = new AS_Related_Posts_Block();