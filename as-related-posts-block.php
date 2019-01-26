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
		add_action( 'enqueue_block_editor_assets', array( $this, 'as_rpb_editor_scripts' ) );
		add_action('enqueue_block_assets', array( $this, 'as_rpb_block_scripts' ) );
	}

	function as_rpb_editor_scripts() {
		$editor_block_js_file = 'assets/js/editor.blocks.js';

		// Enqueue the bundled block JS file
		wp_enqueue_script(
			'as-rpb-block-js',
			AS_RPB_DIR_URI . $editor_block_js_file,
			[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api', 'wp-editor' ],
			filemtime( AS_RPB_DIR_PATH . $editor_block_js_file )
		);
	}

	function as_rpb_block_scripts() {
		$block_css_file = 'assets/css/styles.blocks.css';

		// Enqueue frontend and editor block styles
		wp_enqueue_style(
			'as-rpb-blocks-styles-css',
			AS_RPB_DIR_URI . $block_css_file,
			null,
			filemtime( AS_RPB_DIR_PATH . $block_css_file )
		);
	}

}

/**
 * initialize the plugin
 */
$as_rpb = new AS_Related_Posts_Block();

include AS_RPB_DIR_PATH . 'inc/related-posts.php';