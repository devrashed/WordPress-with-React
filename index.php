<?php
/**
 * Plugin Name: React wp rashed
 * Description: React wp dashboard
 * Version: 1.0
 * Author: Rashed khan
 */

 if( ! defined( 'ABSPATH' ) ) : exit(); endif; // No direct access allowed.

/**
* Define Plugins Contants
*/
define ( 'WPRK_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );
define ( 'WPRK_URL', trailingslashit( plugins_url( '/', __FILE__ ) ) );




add_action( 'admin_menu',  'create_admin_top_menu' );

function create_admin_top_menu() {
    $capability = 'manage_options';
    $slug = 'wprk-test';

    add_menu_page(
        __( 'WP React test', 'wp-react-test' ),
        __( 'WP React test', 'wp-react-test' ),
        $capability,
        $slug,
        'wp_body_page' ,
        'dashicons-buddicons-replies'
    );
    
    // Submenu - CURD
    add_submenu_page(
        $slug,
        __('CURD', 'ai-blog'), // Page Title
        __('CURD', 'ai-blog'), // Menu Title
        'manage_options', // Capability
        'ai-blog-curd', // Submenu slug
        'ai_blog_curd' // Callback function for this submenu
    );
}

function ai_blog_curd(){
    echo '<div class="wrap"><div id="curd-admin"></div></div>';
}

function wp_body_page() {
    echo '<div class="wrap"><div id="react-admin"></div></div>';
}

//require_once WPRK_PATH . 'classes/class-create-admin-top-menu.php';
require_once WPRK_PATH . 'classes/class-create-settings.php';