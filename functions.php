<?php
/**
 * GeneratePress child theme functions and definitions.
 *
 * File Name: functions.php
 * Version: 1.5.9
 *
 * This file is controlled by a GIT repository on GitHub.
 * Only edit this file if you have direct server access (to temporarily fix errors if they happen).
 *
 * ============================================
 * Table of Contents:
 * ============================================
 * 1. Theme Style Options
 * 2. Sticky Header
 * 3. Scrolling Logos
 * ============================================
 */


/* ============================================
 * 1. Theme Style Options
 * ============================================ */
/**
 * Option to Disable Child Theme `style.css`
 * Set `$disable_child_theme_styles` to `true` to dequeue the `style.css` file.
 */
$disable_child_theme_styles = false; // Default: Keep child theme CSS.

if ($disable_child_theme_styles) {
    add_action('wp_enqueue_scripts', function () {
        wp_dequeue_style('generate-child'); // Remove child theme CSS.
    }, 50);
}

/**
 * Customize the copyright text in the footer.
 */
 //add_filter( 'generate_copyright','pv_custom_copyright' );
 function pv_custom_copyright() {
    ?>
    Copyright &copy; <?php echo date( 'Y' ) . ' ' . get_bloginfo( 'name' ); ?> | All Rights Reserved | Powered by <b><u>Paul & Vener</u></b>
    <?php
}

/**
 * Allow SVG uploads for administrator users.
 * @param array $upload_mimes Allowed mime types.
 * @return mixed
 */
add_filter(
	'upload_mimes',
	function ( $upload_mimes ) {
		// By default, only administrator users are allowed to add SVGs.
		// To enable more user types edit or comment the lines below but beware of
		// the security risks if you allow any user to upload SVG files.
		if ( ! current_user_can( 'administrator' ) ) {
			return $upload_mimes;
		}

		$upload_mimes['svg']  = 'image/svg+xml';
		$upload_mimes['svgz'] = 'image/svg+xml';

		return $upload_mimes;
	}
);

/* ============================================
 * 2. Sticky Header
 * ============================================ */

// Enqueue sticky header script early (in the header)
$enable_sticky_header = false;

if ($enable_sticky_header) {
    add_action('wp_enqueue_scripts', 'my_theme_enqueue_scripts_early');
}
function my_theme_enqueue_scripts() {
    wp_enqueue_script(
        'sticky-header', 
        get_stylesheet_directory_uri() . '//assets/js/sticky-header.js', 
        array(), 
        '1.0.0', 
        true // load in footer
    );
}

/* ============================================
 * 3. Scrolling Logos
 * ============================================ */
$enable_scrolling_logos_assets = true;

if ($enable_scrolling_logos_assets) {
    add_action('wp_enqueue_scripts', function () {
       if (is_front_page()) {
            wp_enqueue_style(
                'swiper-css',
                'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
                array(),
                null
            );

            wp_enqueue_style(
                'scrolling-logos-style',
                get_stylesheet_directory_uri() . '/assets/css/scrolling-logos.css',
                array('swiper-css'),
                filemtime(get_stylesheet_directory() . '/assets/css/scrolling-logos.css')
            );

            wp_enqueue_script(
                'swiper-js',
                'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
                array(),
                null,
                true
            );

            wp_enqueue_script(
                'scrolling-logos-script',
                get_stylesheet_directory_uri() . '/assets/js/scrolling-logos.js',
                array('swiper-js'),
                filemtime(get_stylesheet_directory() . '/assets/js/scrolling-logos.js'),
                true
            );

            // Pass logo image base URL to JavaScript
            wp_localize_script('scrolling-logos-script', 'scrollingLogosData', [
                'imgBaseUrl' => get_stylesheet_directory_uri() . '/assets/img/logos/',
            ]);
        }
    });
}
