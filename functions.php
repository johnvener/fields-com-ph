<?php
/**
 * GeneratePress child theme functions and definitions.
 *
 * Add your custom PHP in this file.
 * Only edit this file if you have direct access to it on your server (to fix errors if they happen).
 */

 /**
  * Avoid loading style.css of the child theme
  * Uncomment if no custom CSS is used
  */
/*
add_action( 'wp_enqueue_scripts', function() {
     wp_dequeue_style( 'generate-child' );
 }, 50 );
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

// Enqueue sticky header script early (in the header)
function my_theme_enqueue_scripts() {
    wp_enqueue_script(
        'sticky-header', 
        get_stylesheet_directory_uri() . '/assets/js/sticky-header.js', 
        array(), 
        '1.0.0', 
        true // load in footer
    );
}
//add_action('wp_enqueue_scripts', 'my_theme_enqueue_scripts');

