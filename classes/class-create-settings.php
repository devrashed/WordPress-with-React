<?php
/**
 * This file will create Custom Rest API End Points.
 */
if (!class_exists('WP_REST_Server')) {
    require_once ABSPATH . 'wp-includes/rest-api/class-wp-rest-server.php';
}


class WP_React_Settings_Rest_Route {

    public function __construct() {
        $this->define_constants(); // Define constants
        add_action('rest_api_init', [$this, 'create_rest_routes']);
        add_action('admin_enqueue_scripts', [$this, 'load_scripts']);
        add_action('wp_enqueue_scripts', [$this, 'load_scripts']);   
        add_shortcode('wp_react_settings', [$this,'wp_react_settings_shortcode']);     
        register_activation_hook(__FILE__, [$this, 'dbactivate']);  
    }
    
    public function define_constants() {
        //define( 'WPRK_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );
        if (!defined('WPRK_URL')) {
            define('WPRK_URL', trailingslashit(plugins_url('/', __FILE__)));
        }
    }

    public function dbactivate() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'employee_no';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            first_name varchar(200) NOT NULL, 
            last_name varchar(200) NOT NULL, 
            designation varchar(100) NOT NULL, 
            emp_no int(100) NOT NULL,
            created datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            PRIMARY KEY (id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    public function load_scripts() {
        if ( is_admin() || has_shortcode( get_post()->post_content, 'wp_react_settings' ) ) {
            wp_enqueue_script( 'wp-react-test', WPRK_URL . 'build/index.js', [ 'jquery', 'wp-element' ], '1.0.0', true );
            wp_localize_script( 'wp-react-test', 'appLocalizer', [
                'apiUrl' => home_url( '/wp-json' ),
                'nonce' => wp_create_nonce( 'wp_rest' ),
            ]);
            wp_enqueue_style('custom-css', WPRK_URL . 'src/assets/css/style.css', array(), time(), false);
            wp_enqueue_style('Bootstrap-css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css', array(), time(), false);
            wp_enqueue_script('Bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js', array('jquery'), time(), true);   

            /* wp_enqueue_script('react', 'https://unpkg.com/react@17/umd/react.production.min.js', [], '17', true);
             wp_enqueue_script('react-dom', 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js', ['react'], '17', true);
            wp_enqueue_script('react-router-dom', 'https://unpkg.com/react-router-dom/umd/react-router-dom.min.js', ['react', 'react-dom'], '5.3.0', true); */
        }
    }

    function wp_react_settings_shortcode() {
        return '<div id="wp-react-settings"></div>';
    }

    public function create_rest_routes() {
        register_rest_route( 'wprk/v1', '/settings', [
            'methods' => 'GET',
            'callback' => [$this, 'get_settings'],
            //'permission_callback' => [$this, 'get_settings_permission']
            'permission_callback' => '__return_true'
        ]);
        register_rest_route( 'wprk/v1', '/savesettings', [
            'methods' => 'POST',
            'callback' => [$this, 'save_settings'],
            //'permission_callback' => [$this, 'save_settings_permission']
            'permission_callback' => '__return_true'
        ]);

        
        /* Custom database Rest API */

        register_rest_route( 'wprk/v1', '/add_employee', [
            'methods' => 'POST',
            'callback' => [$this, 'add_employee'],
            'permission_callback' => [$this, 'add_employee_permission'],
        ]);

        register_rest_route( 'wprk/v1', '/get_employees', [
            'methods' => 'GET',
            'callback' => [$this, 'view_employees'],
            'permission_callback' => [$this, 'view_employees_permission'],
        ]);
        
        register_rest_route('wprk/v1', '/delete/(?P<id>\d+)', [
            'methods' => 'DELETE',
            'callback' => [$this, 'delete_employee'],
            'permission_callback' => function () {
                return current_user_can('manage_options'); // Adjust permissions as needed
            }
        ]);

        register_rest_route('wprk/v1', '/update/(?P<id>\d+)', array(
            'methods' => WP_REST_Server::EDITABLE , //'PUT',
            'callback' =>  [$this, 'update_employee'],
            'permission_callback' => function () {
                return current_user_can('edit_posts'); // Adjust as needed
            },
            //'permission_callback' => '__return_true',

            'args' => array(
                'id' => array(
                    'required' => true,
                    'validate_callback' => function ($param, $request, $key) {
                        return is_numeric($param);
                    }
                )
            )
        ));

        
    }

    public function add_employee($request) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'employee_no';

        $first_name  = sanitize_text_field($request['first_name']);
        $last_name   = sanitize_text_field($request['last_name']);
        $designation = sanitize_text_field($request['designation']);
        $emp_no      = intval($request['emp_no']);

        // Insert the data into the table
        $wpdb->insert(
            $table_name,
            [
                'first_name' => $first_name,
                'last_name'  => $last_name,
                'designation'=> $designation,
                'emp_no'     => $emp_no
            ],
            ['%s', '%s', '%s', '%d']
        );

        // Return a success response
        return rest_ensure_response([
            'status' => 'success',
            'message' => 'Employee added successfully'
        ]);
    }

    public function add_employee_permission() {
        return current_user_can('manage_options');
    }

    public function view_employees() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'employee_no';
        $employees = $wpdb->get_results("SELECT * FROM $table_name");
    
        return rest_ensure_response($employees);
    }
    
    public function view_employees_permission() {
        return true;
    }


    public function delete_employee($request) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'employee_no';
        $employee_id = intval($request['id']);
        $deleted = $wpdb->delete($table_name, ['id' => $employee_id]);

        if ($deleted) {
            return rest_ensure_response(['message' => 'Employee deleted successfully.']);
        } else {
            return new WP_Error('employee_not_found', 'Employee not found or could not be deleted.', ['status' => 404]);
        }
    }
    
        // Callback function to handle the employee update
       public function update_employee($request) {
            global $wpdb;
        
            $id = (int) $request['id'];

            $first_name = sanitize_text_field($request->get_param('first_name'));
            $last_name = sanitize_text_field($request->get_param('last_name'));
            $designation = sanitize_text_field($request->get_param('designation'));
            $emp_no = sanitize_text_field($request->get_param('emp_no'));
        
            $table_name = $wpdb->prefix . 'employee_no';
            
            // Verify the employee exists
            $employee_exists = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM $table_name WHERE id = %d", $id));
            if (!$employee_exists) {
                return new WP_Error('employee_not_found', 'Employee not found', array('status' => 404));
            }
        
            // Try to update the employee data
            $updated = $wpdb->update(
                $table_name,
                array(
                    'first_name' => $first_name,
                    'last_name' => $last_name,
                    'designation' => $designation,
                    'emp_no' => $emp_no,
                ),
                array('id' => $id),
                array('%s', '%s', '%s', '%d'),
                array('%d')
            );
        
            if ($updated === false) {
                return new WP_Error('employee_update_failed', 'Failed to update employee', array('status' => 500));
            }
        
            return rest_ensure_response(array(
                'status' => 'success',
                'message' => 'Employee updated successfully',
            ));
        }
        
    
      /* ===== Setting APi ======= */

    public function get_settings() {
        $firstname = get_option('wprk_settings_firstname', '');
        $lastname  = get_option('wprk_settings_lastname', '');
        $email     = get_option('wprk_settings_email', '');
        $address   = get_option('wprk_settings_address', '');

        $response = [
            'firstname' => $firstname ?: '',
            'lastname'  => $lastname ?: '',
            'email'     => $email ?: '',
            'address'   => $address ?: '',
        ];

        return rest_ensure_response($response);
    }    

    public function get_settings_permission() {
        return true;
    }

    public function save_settings($req) {
        $firstname = sanitize_text_field($req['firstname']);
        $lastname  = sanitize_text_field($req['lastname']);
        $email     = sanitize_email($req['email']);
        $address   = sanitize_text_field($req['address']);

        if (!is_email($email)) {
            return new WP_Error('invalid_email', 'Please provide a valid email', ['status' => 400]);
        }

        update_option('wprk_settings_firstname', $firstname);
        update_option('wprk_settings_lastname', $lastname);
        update_option('wprk_settings_email', $email);
        update_option('wprk_settings_address', $address);

        return rest_ensure_response('success');
    }

    public function save_settings_permission() {
        return current_user_can('manage_options');
    }
    
}
new WP_React_Settings_Rest_Route();