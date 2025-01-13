<?php
/**
 * This file will create admin menu page.
 */

class Create_Admin_Page {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'create_admin_top_menu' ] );
    }

    public function create_admin_top_menu() {
        $capability = 'manage_options';
        $slug = 'wprk-test';

        add_menu_page(
            __( 'WP React test', 'wp-react-test' ),
            __( 'WP React test', 'wp-react-test' ),
            $capability,
            $slug,
            [ $this, 'wp_body_page' ],
            'dashicons-buddicons-replies'
        );
    }

    public function wp_body_page() {
        echo '<div class="wrap"><div id="react-admin"></div></div>';
    }

}
new Create_Admin_Page();