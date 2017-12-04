<?php

// Composer plugins
require 'vendor/autoload.php';

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		} );

	add_filter('template_include', function($template) {
		return get_stylesheet_directory() . '/no-timber.html';
	});

	return;
}

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

Timber::$dirname = array('dist/views');

class ToastSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		parent::__construct();
	}

	function register_post_types() {
		//this is where you can register custom post types
	}

	function register_taxonomies() {
		//this is where you can register custom taxonomies
	}

	function add_to_context( $context ) {
		$context['menu'] = new TimberMenu();
		$context['site'] = $this;
		return $context;
	}

	function add_to_twig( $twig ) {
		/* this is where you can add your own functions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		return $twig;
	}

}

new ToastSite();
