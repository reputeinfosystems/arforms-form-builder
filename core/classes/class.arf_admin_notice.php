<?php
if( !defined( 'ABSPATH' ) ) exit;
if (!class_exists('ARF_adminnotice')) {

    class ARF_adminnotice
    {
        var $arf_db_updates = array(
            '6.0.2' => array(
                'arf_merge_setting_tables',
            ),
        );

        public function __construct() {
            
            /* add_action('init', array($this, 'arf_install_action'));
            
            add_action( 'run_arf_update_callback', array( $this, 'arf_update_callback_func')); */
        }

        function get_db_update_callbacks() {
            return $this->arf_db_updates;
        }

        function arf_update_callback_func( $update_callback ){

            update_option('check_function_inside_this_call_'.__LINE__, '75 line');

            //include_once ARFLITE_FORMPATH . '/core/classes/class.arf_callback_function.php';
        }

        function arf_update_func_call() {

            global $wpdb, $ARFLiteMdlDb;

            update_option('check_function_inside_this_call_'.__LINE__, '82 line');
            $current_db_version = get_option( 'arf_db_version' );
            $loop               = 0;
            
            foreach ( $this->get_db_update_callbacks() as $version => $update_callbacks ) {

                if ( version_compare( $current_db_version, $version, '<' ) ) {  

                    foreach( $update_callbacks as $update_callback ){

                        update_option('check_function_inside_this_call_'.__LINE__, '92 line');
                        wp_schedule_single_event( ( current_time('timestamp',true) + $loop ), 'run_arf_update_callback' );
                    }

                    /* foreach ( $update_callbacks as $update_callback ) {
                        WC()->queue()->schedule_single(                
                            time() + $loop,
                            'woocommerce_run_update_callback',
                            array(
                                'update_callback' => $update_callback,
                            ),
                            'woocommerce-db-updates'
                        );
                        $loop++;
                    } */
                }
            }

            // After the callbacks finish, update the db version to the current ARF version.
           /*  $current_wc_version = WC()->version;
            if ( version_compare( $current_db_version, $current_wc_version, '<' ) &&
                ! WC()->queue()->get_next( 'woocommerce_update_db_to_current_version' ) ) {
                WC()->queue()->schedule_single(
                    time() + $loop,
                    'woocommerce_update_db_to_current_version',
                    array(
                        'version' => $current_wc_version,
                    ),
                    'woocommerce-db-updates'
                );
            } */
        }

        function arf_install_action(){

            if ( ! empty( $_GET['do_update_arforms'] ) ) { 

                update_option('check_function_inside_this_call_'.__LINE__, '129 line');
                check_admin_referer( 'arf_db_update', 'arf_db_update_nonce' );
                $this->arf_update_func_call();
    
            }
        }

        function arf_display_update_notice(){

            $arforms_migration_flag = get_option('arforms_process_db_update');

            if( !empty( $arforms_migration_flag ) && 1 == $arforms_migration_flag ){

                $update_url = wp_nonce_url(
                    add_query_arg( 'do_update_arforms', 'true', admin_url( 'admin.php?page=ARForms-status' ) ),
                    'arf_db_update',
                    'arf_db_update_nonce'
                );

                echo '<div id="arf_update_migration_message" class="updated">';
                    echo '<p>';
                        echo '<strong>'.esc_html("ARForms database update required","arforms-form-builder" ).'</strong>';
                    echo '</p>';
                    echo '<p>';
                        esc_html_e( 'ARForms has been updated! To keep things running smoothly, we have to update your database to the newest version.', 'arforms-form-builder' );
                    echo '</p>';

                    echo '<p class="submit">';
                        echo '<a href='.esc_url( $update_url ).' class="arf-update-now button-primary" style="margin-right:20px;">';
                            echo esc_html_e( 'Update ARForms Database', 'arforms-form-builder' );
                        echo '</a>';
                    echo '</p>';
                echo '</div>';
                
            }
        }
    }
}
global $ARF_adminnotice;
$ARF_adminnotice = new ARF_adminnotice();