<?php
/**
 * Sekai theme functions.
 *
 * @package Sekai
 */

/**
 * Loads the layout styles on the front end and in the editor.
 *
 * Versioned by the file's modification time, so browsers and caches pick
 * up every change instead of holding on to an old copy.
 */
function sekai_enqueue_styles(): void {
	wp_enqueue_style(
		'sekai-layout',
		get_theme_file_uri( 'assets/css/layout.css' ),
		array(),
		(string) filemtime( get_theme_file_path( 'assets/css/layout.css' ) )
	);
}
add_action( 'wp_enqueue_scripts', 'sekai_enqueue_styles' );

/**
 * Adds the layout styles to the editor.
 */
function sekai_editor_styles(): void {
	add_editor_style( array( 'assets/css/layout.css', 'assets/css/editor.css' ) );
}
add_action( 'after_setup_theme', 'sekai_editor_styles' );

/**
 * Keeps notes off the homepage; they live at /category/notes/ instead.
 *
 * @param WP_Query $query The query being prepared.
 */
function sekai_exclude_notes_from_home( WP_Query $query ): void {
	if ( is_admin() || ! $query->is_main_query() || ! $query->is_home() ) {
		return;
	}

	$notes = get_category_by_slug( 'notes' );
	if ( $notes ) {
		$query->set( 'category__not_in', array( $notes->term_id ) );
	}
}
add_action( 'pre_get_posts', 'sekai_exclude_notes_from_home' );

/**
 * Gives untitled posts a title made from their first few words, so they
 * don't turn into empty links in post lists.
 *
 * Core's post title block renders nothing for an empty title, so the
 * fallback is swapped in only while that block renders. The block then
 * adds its own link, classes and styles as usual.
 *
 * @param string|null $pre_render Short-circuit output, if any.
 * @param array       $block      Parsed block.
 * @return string|null
 */
function sekai_untitled_fallback_start( ?string $pre_render, array $block ): ?string {
	if ( 'core/post-title' === $block['blockName'] ) {
		add_filter( 'the_title', 'sekai_untitled_title', 10, 2 );
	}
	return $pre_render;
}
add_filter( 'pre_render_block', 'sekai_untitled_fallback_start', 10, 2 );

/**
 * Stops the fallback once the post title block has rendered.
 *
 * @param string $block_content Rendered post title.
 * @return string
 */
function sekai_untitled_fallback_stop( string $block_content ): string {
	remove_filter( 'the_title', 'sekai_untitled_title' );
	return $block_content;
}
add_filter( 'render_block_core/post-title', 'sekai_untitled_fallback_stop', 1 );

/**
 * The first few words of an untitled post.
 *
 * @param string     $title   Post title.
 * @param int|string $post_id Post ID.
 * @return string
 */
function sekai_untitled_title( $title, $post_id ): string {
	$title = (string) $title;
	if ( '' !== trim( $title ) ) {
		return $title;
	}

	// The excerpt renders the post's blocks, which may ask for titles again.
	remove_filter( 'the_title', 'sekai_untitled_title' );

	// Excerpts skip blocks like pullquotes, so fall back to the raw text.
	$text = wp_strip_all_tags( get_the_excerpt( (int) $post_id ) );
	if ( '' === trim( $text ) ) {
		$text = wp_strip_all_tags( get_post_field( 'post_content', (int) $post_id ) );
	}

	return esc_html( wp_trim_words( $text, 8, '…' ) );
}

/**
 * Marks the menu link for the page being viewed.
 *
 * The menu uses plain links so it works on any domain, which means core
 * can't tell which one is current. Compare paths instead.
 *
 * @param string $block_content Rendered navigation link.
 * @param array  $block         Parsed block.
 * @return string
 */
function sekai_mark_current_menu_link( string $block_content, array $block ): string {
	$current = sekai_current_menu_path();
	$url     = $block['attrs']['url'] ?? '';
	if ( null === $current || '' === $url ) {
		return $block_content;
	}

	$path = trailingslashit( (string) wp_parse_url( $url, PHP_URL_PATH ) );
	if ( $path !== $current ) {
		return $block_content;
	}

	$tags = new WP_HTML_Tag_Processor( $block_content );
	if ( $tags->next_tag( 'li' ) ) {
		$tags->add_class( 'current-menu-item' );
	}
	if ( $tags->next_tag( 'a' ) ) {
		$tags->set_attribute( 'aria-current', 'page' );
	}
	return $tags->get_updated_html();
}
add_filter( 'render_block_core/navigation-link', 'sekai_mark_current_menu_link', 10, 2 );

/**
 * Path of the menu destination for the current view, or null when the view
 * has no menu link (single posts, search, 404).
 *
 * @return string|null
 */
function sekai_current_menu_path(): ?string {
	if ( is_home() ) {
		$link = home_url( '/' );
	} elseif ( is_page() ) {
		$link = get_permalink();
	} elseif ( is_category() ) {
		$link = get_term_link( get_queried_object() );
	} else {
		return null;
	}

	return is_string( $link ) ? trailingslashit( (string) wp_parse_url( $link, PHP_URL_PATH ) ) : null;
}

/**
 * Adds microformats to post dates and title links, so other sites and
 * readers can tell when a post was published and where it lives.
 *
 * @param string $block_content Rendered post date or post title.
 * @return string
 */
function sekai_microformat_links( string $block_content ): string {
	$tags = new WP_HTML_Tag_Processor( $block_content );
	while ( $tags->next_tag() ) {
		if ( 'TIME' === $tags->get_tag() ) {
			$tags->add_class( 'dt-published' );
		} elseif ( 'A' === $tags->get_tag() ) {
			$tags->add_class( 'u-url' );
		}
	}
	return $tags->get_updated_html();
}
add_filter( 'render_block_core/post-date', 'sekai_microformat_links', 20 );
add_filter( 'render_block_core/post-title', 'sekai_microformat_links', 20 );

/**
 * Drops core's old-style "hentry" class. The theme marks posts up with
 * h-entry instead, and readers would otherwise see an empty entry
 * wrapped around each real one.
 *
 * @param string[] $classes Post classes.
 * @return string[]
 */
function sekai_remove_hentry( array $classes ): array {
	return array_values( array_diff( $classes, array( 'hentry' ) ) );
}
add_filter( 'post_class', 'sekai_remove_hentry' );

/**
 * Finds the post a background photo comes from.
 *
 * The bundled looks map to their posts by slug. A photo uploaded in the
 * Styles panel maps to the post it was attached to, if any.
 *
 * @param string $url Background image URL.
 * @return WP_Post|null
 */
function sekai_background_post( string $url ): ?WP_Post {
	$bundled = array(
		'hawthorn.jpg'    => 'hawthorn',
		'windmill.jpg'    => 'windmill',
		'rail-switch.jpg' => 'switch',
	);

	$file = wp_basename( (string) wp_parse_url( $url, PHP_URL_PATH ) );
	if ( isset( $bundled[ $file ] ) && str_contains( $url, '/themes/' ) ) {
		$post = get_page_by_path( $bundled[ $file ], OBJECT, 'post' );
	} else {
		$attachment = attachment_url_to_postid( $url );
		$post       = $attachment ? get_post( wp_get_post_parent_id( $attachment ) ) : null;
	}

	return $post instanceof WP_Post && 'publish' === $post->post_status ? $post : null;
}

/**
 * Starts the footer line with a caption for the background: which photo
 * is behind the page, linking to its post. Left out when the photo has
 * no post.
 *
 * @param string $block_content Rendered paragraph.
 * @param array  $block         Parsed block.
 * @return string
 */
function sekai_background_caption( string $block_content, array $block ): string {
	if ( ! str_contains( $block['attrs']['className'] ?? '', 'sekai-bg-caption' ) ) {
		return $block_content;
	}

	$url = wp_get_global_styles( array( 'background', 'backgroundImage', 'url' ) );
	if ( is_string( $url ) && str_starts_with( $url, 'file:./' ) ) {
		$url = get_theme_file_uri( substr( $url, 7 ) );
	}

	$post = is_string( $url ) ? sekai_background_post( $url ) : null;
	if ( ! $post ) {
		return $block_content;
	}

	$caption = sprintf(
		'background: <a href="%s">%s</a>',
		esc_url( get_permalink( $post ) ),
		esc_html( get_the_title( $post ) )
	);

	return preg_replace_callback(
		'/<p\b[^>]*>/',
		static fn( array $tag ): string => $tag[0] . $caption . ' · ',
		$block_content,
		1
	);
}
add_filter( 'render_block_core/paragraph', 'sekai_background_caption', 10, 2 );

/**
 * Adds a small mark for the post's kind after the date in post lists:
 * ▣ photos, ¶ blog, ✎ notes, ♪ lyrics, ※ aside. Uncategorised posts get
 * an empty slot so the titles stay lined up.
 *
 * @param string   $block_content Rendered post date.
 * @param array    $block         Parsed block.
 * @param WP_Block $instance      Block instance.
 * @return string
 */
function sekai_list_mark( string $block_content, array $block, WP_Block $instance ): string {
	if ( ! str_contains( $block['attrs']['className'] ?? '', 'sekai-date' ) ) {
		return $block_content;
	}

	// First match wins, so a post in both aside and lyrics shows ♪.
	$marks = array(
		'notes'  => array( '✎', __( 'note', 'sekai' ) ),
		'photos' => array( '▣', __( 'photo', 'sekai' ) ),
		'blog'   => array( '¶', __( 'blog post', 'sekai' ) ),
		'lyrics' => array( '♪', __( 'lyrics', 'sekai' ) ),
		'aside'  => array( '※', __( 'aside', 'sekai' ) ),
	);

	$slugs = wp_list_pluck( get_the_category( $instance->context['postId'] ?? 0 ), 'slug' );
	$inner = '';
	foreach ( $marks as $slug => $mark ) {
		if ( in_array( $slug, $slugs, true ) ) {
			$inner = sprintf(
				'<span aria-hidden="true">%s</span><span class="screen-reader-text">%s</span>',
				$mark[0],
				esc_html( $mark[1] )
			);
			break;
		}
	}

	return $block_content . '<span class="sekai-mark">' . $inner . '</span>';
}
add_filter( 'render_block_core/post-date', 'sekai_list_mark', 10, 3 );
