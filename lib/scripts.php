<?php

/**
 * Scripts and stylesheets
 */
function toast_scripts() {
	$assets = array(
		'css'					=> '/dist/css/styles.css',
		'js'					=> '/dist/js/main.js'
	);
	wp_enqueue_style('toast-css', get_template_directory_uri() . $assets['css'], false, null);
	wp_enqueue_script('toast-js', get_template_directory_uri() . $assets['js'], array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'toast_scripts', 100);
