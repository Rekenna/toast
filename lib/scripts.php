<?php

/**
 * Scripts and stylesheets
 */
function toast_scripts() {
	$assets = array(
		'vendor-css'	=> '/dist/css/vendor.css',
		'css'					=> '/dist/css/styles.css',
		'vendor-js'		=> '/dist/js/vendor.js',
		'js'					=> '/dist/js/main.js'
	);
	wp_enqueue_style('toast-vendor-css', get_template_directory_uri() . $assets['vendor-css'], false, null);
	wp_enqueue_style('toast-css', get_template_directory_uri() . $assets['css'], false, null);
	wp_enqueue_script('toast-vendor-js', get_template_directory_uri() . $assets['vendor-js'], array(), null, true);
	wp_enqueue_script('toast-js', get_template_directory_uri() . $assets['js'], array(), null, true);
}
add_action('wp_enqueue_scripts', 'toast_scripts', 100);
