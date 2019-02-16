<?php
/**
 * Plugin Name: AS Related Posts Block
 * Plugin URI: http://wpthemecraft.com/plugins/related-posts-block-plugin-for-wordpress/
 * Description: Plugin that adds a new block "Related Posts" to Gutenberg Editor. With "Related Posts" block user can add related posts by category anywhere in the post.
 * Text Domain: as-rpb
 * Author: Aamer Shahzad
 * Author URI: http://wpthemecraft.com
 * Version: 1.0.1
 * License: GPL-v2.0 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

/**
 * exit if file is accessed directly
 *
 * @since 1.0.1
 */
defined('ABSPATH') || exit;

/**
 * only proceed if gutenberg is available
 *
 * @since 1.0.1
 */
if ( ! function_exists( 'register_block_type' ) ) {
	return;
}

/**
 * plugin dir path and url
 *
 * @since 1.0.1
 */
if ( ! defined( 'AS_RPB_DIR_PATH' ) )
	define( 'AS_RPB_DIR_PATH', plugin_dir_path( __FILE__ ) );

if ( ! defined( 'AS_RPB_DIR_URI' ) )
	define( 'AS_RPB_DIR_URI', plugin_dir_url( __FILE__ ) );

/**
 * define plugin version
 *
 * @since 1.0.1
 */
define( 'AS_RPB_VER', '1.0.1' );

if ( ! class_exists( 'AS_RPB' ) ) :
	/**
	 * Class AS_Related_Posts_Block
	 *
	 * @since 1.0.1
	 */
	class AS_RPB {

		private static $instance = null;

		/**
		 * Returns an instance of this class
		 *
		 * @since 1.0.1
		 *
		 * @return AS_Related_Posts_Block class instance
		 */
		public static function get_instance() {
			if ( null == self::$instance ) {
				self::$instance = new self;
			}

			return self::$instance;
		}

		/**
		 * AS_Related_Posts_Block constructor.
		 *
		 * @since 1.0.1
		 */
		public function __construct() {
			add_action( 'enqueue_block_editor_assets', array( $this, 'as_rpb_editor_scripts' ) );
			add_action('enqueue_block_assets', array( $this, 'as_rpb_block_scripts' ) );
		}

		/**
		 * block editor assets
		 *
		 * @since 1.0.1
		 */
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

		/**
		 * block assets
		 *
		 * @since 1.0.1
		 */
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

endif; // end if class_exists( 'AS_RPB' )

/**
 * initialize the plugin
 *
 * @since 1.0.1
 */
add_action( 'plugins_loaded', function () {
	AS_RPB::get_instance();

	include AS_RPB_DIR_PATH . 'inc/as-rpb-related-posts.php';
} );