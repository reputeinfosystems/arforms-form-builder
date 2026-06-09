<?php
/**
 * ARForms Divi 5 Module.
 *
 * @package ARForms\Divi
 */

namespace ARForms\Divi;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;


class ArformsDiviModule implements DependencyInterface {

    public function __construct() {
        add_action( 'divi_visual_builder_assets_before_enqueue_scripts', [ $this, 'enqueue_visual_builder_assets' ] );
    }

	/**
	 * Render callback for the module (frontend output).
	 *
	 * @param array 
	 * @return string
	 */
	public static function render_callback($attrs, $content, $block, $elements) {

		$form_id = '0';
		if ( isset( $attrs['form_id'] ) ) {
			if ( is_array( $attrs['form_id'] ) ) {
				if ( isset( $attrs['form_id']['desktop']['value'] ) ) {
					$form_id = $attrs['form_id']['desktop']['value'];
				} else if ( isset( $attrs['form_id']['value'] ) ) {
					$form_id = $attrs['form_id']['value'];
				} else {
					$first_val = reset($attrs['form_id']);
					$form_id = is_array($first_val) && isset($first_val['value']) ? $first_val['value'] : $first_val;
				}
			} else {
				$form_id = $attrs['form_id'];
			}
		}
		
		if ( 'Not found' === $form_id || 'REALLY_NOT_SET' === $form_id || empty($form_id) ) {
			$form_id = '0';
		}

		if ( is_string($form_id) && strpos($form_id, 'form_') === 0 ) {
			$form_id = str_replace('form_', '', $form_id);
		}
		
		if ( empty( $form_id ) || '0' === $form_id ) {
			return '<p>' . esc_html__( 'Please select a form.', 'arforms-form-builder' ) . '</p>';
		}

		$shortcode = sprintf( '[ARForms id="%d"]', intval( $form_id ) );
		error_log('\n === ARForms Lite: shortcode: ' . $shortcode);
		return do_shortcode( $shortcode );
	}

	/**
	 * Registers the block type via Divi 5's ModuleRegistration API.
	 */
	public function load() {
		static $loaded = false;
		if ( $loaded ) {
			return;
		}
		$loaded = true;

		$module_json_folder_path = ARFLITE_FORMPATH . '/integrations/Divi/divi5/visual-builder';

		$register_callback = function() use ( $module_json_folder_path ) {
			if ( class_exists( 'ET\Builder\Packages\ModuleLibrary\ModuleRegistration' ) ) {
				ModuleRegistration::register_module(
					$module_json_folder_path,
					[
						'render_callback' => [ ArformsDiviModule::class, 'render_callback' ],
					]
				);
			}
		};

		if ( did_action( 'init' ) ) {
			$register_callback();
		} else {
			add_action( 'init', $register_callback );
		}
	}

	/**
	 * Enqueue the bundled JS for the Divi 5 Visual Builder.
	 */
	public function enqueue_visual_builder_assets() {
		if ( class_exists( 'ET\Builder\VisualBuilder\Assets\PackageBuildManager' ) ) {
			\ET\Builder\VisualBuilder\Assets\PackageBuildManager::register_package_build(
				[
					'name'    => 'arforms-divi5-visual-builder',
					'version' => '1.0.0',
					'script'  => [
						'src'                => plugins_url( 'integrations/Divi/divi5/visual-builder/arforms-divi5.js', ARFLITE_FORMPATH . '/arforms-form-builder.php' ),
						'deps'               => [
							'divi-module-library',
							'divi-vendor-wp-hooks',
							'react',
							'jquery-core',
							'divi-rest',
							'wp-hooks',
						],
						'enqueue_top_window' => false,
						'enqueue_app_window' => true,
					],
				]
			);
		}

		wp_enqueue_style( 'arforms-divi5-visual-builder-style', plugins_url( 'integrations/Divi/divi5/styles/style.css', ARFLITE_FORMPATH . '/arforms-form-builder.php' ), [], '1.0.0' );

		$forms_list = self::get_forms_list();

		wp_localize_script( 'jquery-core', 'arforms_divi5_data', [
			'arformsdivi_ajax_url'   => admin_url( 'admin-ajax.php' ),
			'nonce'     => wp_create_nonce( 'arflite_wp_nonce' ),
			'arforms_forms_list' => (object) $forms_list,
		] );
	}

	/**
	 * Get the list of ARForms dropdown.
	 *
	 * @return array
	 */
	public static function get_forms_list() {
		global $wpdb, $tbl_arf_forms, $arformsmain, $MdlDb;
		$forms = [];

		$where_clause = ' AND arf_is_lite_form = 1';
		$table_name = $tbl_arf_forms;

		if($arformsmain->arforms_is_pro_active() ){
			$where_clause = ' AND arf_is_lite_form = 0';
			if ( isset($MdlDb) && isset($MdlDb->forms) ) {
				$table_name = $MdlDb->forms;
			} else {
				$table_name = $wpdb->prefix . "arf_forms";
			}
		}
		
		$results = $wpdb->get_results( "SELECT * FROM {$table_name} WHERE is_template = 0 AND (status is NULL OR status = '' OR status = 'published') {$where_clause} ORDER BY id DESC" );
		
		$forms['0'] = esc_html__( 'Please select a form', 'arforms-form-builder' );

		if ( $results ) {
			foreach ( $results as $form ) {
				$forms['form_' . $form->id] = (string) $form->name . ' (id: ' . $form->id . ')';
			}
		}

		return $forms;
	}
}
