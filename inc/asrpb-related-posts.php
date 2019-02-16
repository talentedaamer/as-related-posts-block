<?php
/**
 * register related post block
 *
 * @since 1.0.1
 */
add_action( 'plugins_loaded', 'asrpb_register_related_posts_block' );
function asrpb_register_related_posts_block() {

	/**
	 * exit if gutenberg is not available
	 *
	 * @since 1.0.1
	 */
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	/**
	 * Register block and attributes
	 *
	 * @since 1.0.1
	 */
	register_block_type( 'as-related-posts-block/related-posts', array(
		'attributes'      => array(
			'categories'         => array(
				'type' => 'string',
			),
			'postsToShow'        => array(
				'type'    => 'number',
				'default' => 5,
			),
			'displayPostDate'    => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayPostContent' => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'postContentLength'  => array(
				'type'    => 'number',
				'default' => 100,
			),
			'order'              => array(
				'type'    => 'string',
				'default' => 'desc',
			),
			'orderBy'            => array(
				'type'    => 'string',
				'default' => 'date',
			),
		),
		'render_callback' => 'asrpb_render_related_posts_block',
	) );

}

/**
 * Render block on the frontend.
 *
 * @since 1.0.1
 * @param $attributes
 *
 * @return string
 */
function asrpb_render_related_posts_block( $attributes ) {
	global $post;

	/**
	 * related posts query args
	 */
	$args = array(
		'post_status'         => 'publish',
		'post__not_in'        => array( $post->ID ),
		'posts_per_page'      => $attributes['postsToShow'],
		'order'               => $attributes['order'],
		'orderby'             => $attributes['orderBy'],
		'ignore_sticky_posts' => true,
	);

	/**
	 * add category__in arg if category selected
	 */
	if ( isset( $attributes['categories'] ) ) {
		$args['category__in'] = $attributes['categories'];
	}

	$query = new WP_Query( $args );

	$li_output = '';
	if ( $query->have_posts() ) :
		while ( $query->have_posts() ) : $query->the_post();

			$li_output .= '<li class="asrpb-list-item">';

			// post title
			$title     = get_the_title();
			$li_output .= sprintf(
				'<a href="%1$s">%2$s</a>',
				esc_url( get_the_permalink( get_the_ID() ) ),
				esc_html( $title ? $title : __( '(Untitled)' ) )
			);

			// post date
			if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
				$li_output .= sprintf(
					'<time datetime="%1$s">%2$s</time>',
					esc_attr( get_the_date( 'c', get_the_ID() ) ),
					esc_html( get_the_date( '', get_the_ID() ) )
				);
			}

			// post content
			if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent'] ) {
				$num_char = isset( $attributes['postContentLength'] ) ? $attributes['postContentLength'] : 100;

				$li_output .= sprintf(
					'<p>%1$s</p>',
					esc_html( asrpb_trim_content_to_character( get_the_content(), $num_char, ' [...]' ) )
				);
			}

			$li_output .= "</li>\n";

		endwhile;
	endif;

	$classes = 'asrpb-list';

	if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
		$classes .= ' asrpb-has-dates';
	}

	if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent'] ) {
		$classes .= ' asrpb-has-content';
	}

	if ( isset( $attributes['categories'] ) && $attributes['categories'] ) {
		$classes .= ' asrpb-category-' . $attributes['categories'];
	}

	$list_output = sprintf(
		'<div class="asrpb-wrap"><h3 class="asrpb-title">%1$s</h3><ul class="%2$s">%3$s</ul></div>',
		esc_html( __( 'Related Posts:' ) ),
		esc_attr( $classes ),
		$li_output
	);

	return $list_output;
}

/**
 * Return trimmed text to certain character length
 *
 * @since 1.0.1
 * @param $text string to be trimmed
 * @param int $num_char number of characters
 * @param null $more more text. default is '...'
 *
 * @return string trimmed text
 */
function asrpb_trim_content_to_character( $text, $num_char = 50, $more = null ) {

	if ( null === $more ) {
		$more = __( '&hellip;' );
	}

	// remove all html characters
	$text = wp_strip_all_tags( $text );

	if ( strlen( $text ) < $num_char ) {
		$text = $text . $more;
	} else {
		$text = substr( $text, 0, strpos( $text, ' ', $num_char ) );
		$text = $text . $more;
	}
	return $text;
}