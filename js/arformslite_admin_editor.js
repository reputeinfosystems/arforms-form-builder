"use strict";
window.is_loading             = false;
window.is_field_ok_btn_click  = false;
window.is_update_custom_color = false;
window.is_reset_base_color    = false;
var phone_with_flags          = [];

window.is_add_new_field = false;
window.added_new_fields = [];

window.is_updated_field = false;
window.updated_fields   = [];

window.is_delete_field = false;
window.deleted_fields  = [];

window.loaded_settings = [];

window.$sender = [];

window.ArfliteCodeEditor;
window.ArfliteExpandedCodeEditor;

jQuery( document ).on(
	'mousedown',
	'.arf_materialize_form .controls input',
	function(e) {
		jQuery( e.target ).unbind( 'mouseup' );
	}
);
jQuery( document ).on(
	'mouseup',
	'.arf_materialize_form .controls input',
	function(e) {
		return false;
	}
);
var __arf_jspicker_object = [];
var Base64                = {
	_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	encode: function(e) {
		var t = "";
		var n, r, i, s, o, u, a;
		var f = 0;
		e     = Base64._utf8_encode( e );
		while (f < e.length) {
			n = e.charCodeAt( f++ );
			r = e.charCodeAt( f++ );
			i = e.charCodeAt( f++ );
			s = n >> 2;
			o = (n & 3) << 4 | r >> 4;
			u = (r & 15) << 2 | i >> 6;
			a = i & 63;
			if (isNaN( r )) {
				u = a = 64
			} else if (isNaN( i )) {
				a = 64
			}
			t = t + this._keyStr.charAt( s ) + this._keyStr.charAt( o ) + this._keyStr.charAt( u ) + this._keyStr.charAt( a );
		}
		return t
	},
	decode: function(e) {
		var t = "";
		var n, r, i;
		var s, o, u, a;
		var f = 0;
		e = e.replace(/[^A-Za-z0-9+/=]/g, "" );
		while (f < e.length) {
			s = this._keyStr.indexOf( e.charAt( f++ ) );
			o = this._keyStr.indexOf( e.charAt( f++ ) );
			u = this._keyStr.indexOf( e.charAt( f++ ) );
			a = this._keyStr.indexOf( e.charAt( f++ ) );
			n = s << 2 | o >> 4;
			r = (o & 15) << 4 | u >> 2;
			i = (u & 3) << 6 | a;
			t = t + String.fromCharCode( n );
			if (u != 64) {
				t = t + String.fromCharCode( r );
			}
			if (a != 64) {
				t = t + String.fromCharCode( i );
			}
		}
		t = Base64._utf8_decode( t );
		return t
	},
	_utf8_encode: function(e) {
		e     = e.replace( /rn/g, "n" );
		var t = "";
		for (var n = 0; n < e.length; n++) {
			var r = e.charCodeAt( n );
			if (r < 128) {
				t += String.fromCharCode( r );
			} else if (r > 127 && r < 2048) {
				t += String.fromCharCode( r >> 6 | 192 );
				t += String.fromCharCode( r & 63 | 128 );
			} else {
				t += String.fromCharCode( r >> 12 | 224 );
				t += String.fromCharCode( r >> 6 & 63 | 128 );
				t += String.fromCharCode( r & 63 | 128 );
			}
		}
		return t
	},
	_utf8_decode: function(e) {
		var t  = "";
		var n  = 0;
		var r  = 0;
		var c1 = 0;
		var c2 = 0;
		while (n < e.length) {
			r = e.charCodeAt( n );
			if (r < 128) {
				t += String.fromCharCode( r );
				n++
			} else if (r > 191 && r < 224) {
				c2 = e.charCodeAt( n + 1 );
				t += String.fromCharCode( (r & 31) << 6 | c2 & 63 );
				n += 2
			} else {
				c2 = e.charCodeAt( n + 1 );
				c3 = e.charCodeAt( n + 2 );
				t += String.fromCharCode( (r & 15) << 12 | (c2 & 63) << 6 | c3 & 63 );
				n += 3
			}
		}
		return t
	}
};
(function() {
	HTMLElement.prototype.serializeJSON = function() {
		var nodeNames = ['INPUT', 'SELECT', 'TEXTAREA'];
		var this_     = this;
		var thisNode  = this_.nodeName;
		var object    = {};
		if (nodeNames.indexOf( thisNode ) > -1) {
			var thisInput = this;
			var thisName  = thisInput.getAttribute( 'name' );
			var thisValue = thisInput.value;
			if (thisName === null) {
				return {};
			}
			var thisType = thisInput.getAttribute( 'type' );
			if (thisType == 'checkbox' || thisType == 'radio') {
				thisValue = (thisInput.checked) ? thisValue : "";
				if (thisValue === "") {
					return false;
				}
			}
			if (thisNode == 'TEXTAREA') {
				if (thisName == 'options[ar_email_message]' || thisName == 'options[ar_admin_email_message]') {
					thisValue = thisInput.innerHTML;
				} else {
					thisValue = thisInput.value;
				}
			}
			keys  = thisName.split( '[' );
			nkeys = [];
			for (var k = 0; k < keys.length; k++) {
				var key = keys[k];
				key     = key.replace( /\]/g, '' );
				nkeys.push( key );
			}
			deepSetRecursive( object, nkeys, thisValue );
		} else {
			var selector    = "input,select,textarea";
			var allInputs   = this_.querySelectorAll( selector );
			var totalInputs = allInputs.length;
			for (var i = 0; i < totalInputs; i++) {
				var thisInput = allInputs[i];
				var thisName  = thisInput.getAttribute( 'name' );
				var thisValue = thisInput.value;
				var thisNode  = thisInput.nodeName;
				var thisType  = thisInput.getAttribute( 'type' );
				if (thisNode == 'TEXTAREA') {
					if (thisName == 'options[ar_email_message]' || thisName == 'options[ar_admin_email_message]') {
						thisValue = thisInput.innerHTML;
					} else {
						thisValue = thisInput.value;
					}
				}
				if (thisType == 'checkbox' || thisType == 'radio') {
					thisValue = (thisInput.checked) ? thisValue : "";
					if (thisValue === "") {
						continue;
					}
				}
				if (thisName === '' || typeof thisName == 'undefined' || thisName === null) {
					continue;
				}
				var bracketIndex = thisName.indexOf( '[' );
				if (bracketIndex < 0) {
					object[thisName] = thisValue;
					continue;
				}
				var keys  = thisName.split( '[' );
				var nkeys = [];
				for (var k = 0; k < keys.length; k++) {
					var key = keys[k];
					key     = key.replace( /\]/g, '' );
					nkeys.push( key );
				}
				deepSetRecursive( object, nkeys, thisValue );
			}
		}
		return object;
	}
	var deepSetRecursive                = function(o, keys, value) {
		var key = keys[0];
		var lastIdx;
		if (keys.length === 1) {
			if (key === '') {
				o.push( value );
			} else {
				o[key] = value;
			}
		} else {
			var nextKey = keys[1];
			if (key === '') {
				lastIdx = o.length - 1;
				lastVal = o[lastIdx];
				if (typeof lastVal == 'object' && (typeof lastVal[nextKey] == 'undefined' || keys.length > 2)) {
					key = lastIdx;
				} else {
					key = lastIdx + 1;
				}
			}
			if (nextKey == '') {
				if (typeof o[key] == 'undefined' || ! Array.isArray( o[key] )) {
					o[key] = [];
				}
			} else {
				if (typeof o[key] == 'undefined' || ! (o[key] === Object( o[key] ))) {
					o[key] = {};
				}
			}
			var tail = keys.slice( 1 );
			deepSetRecursive( o[key], tail, value );
		}
	}
}());
window.arf_is_rtl = 0;
if (jQuery( 'body' ).hasClass( 'rtl' )) {
	window.arf_is_rtl = 1;
}

jQuery( document ).on(
	'keyup',
	'.arf_autocomplete dt input',
	function() {
		jQuery( this ).parent().parent().find( 'dd ul' ).scrollTop();
		var value = jQuery( this ).val();
		value     = value.toLowerCase();
		jQuery( this ).parent().parent().find( 'dd ul' ).show();
		jQuery( this ).parent().parent().find( 'dd ul li' ).each(
			function(x) {
				var text = jQuery( this ).attr( 'data-label' ).toLowerCase();
				(text.indexOf( value ) != -1) ? jQuery( this ).show() : jQuery( this ).hide();
			}
		);
	}
);
jQuery( document ).on(
	'hover',
	'.grid_copy_icon',
	function() {
		jQuery( this ).html( __CLICKTOCOPY );
	}
);
jQuery( document ).on(
	'click',
	'.arfhelptip',
	function(e) {
		jQuery( this ).tipso( 'hide' );
	}
);
jQuery( document ).on(
	'click',
	'.grid_copy_icon',
	function() {
		var code = jQuery( this ).attr( 'data-attr' );
		arfliteCopyToClipboard( code );
		jQuery( this ).html( __COPIED );
		setTimeout(
			function() {
				jQuery( this ).html( __CLICKTOCOPY );
			},
			10
		);
	}
);
jQuery( document ).on(
	'keyup',
	'.inplace_field',
	function(e) {
		if (jQuery( 'input[name="arfmps"]:checked' ).val() == 'top') {
			var leng1 = jQuery( this ).val();
			var sanitized_leng1 = leng1.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
			jQuery( '.arf_main_label.arf_width_counter_label' ).html( sanitized_leng1 );
			var leng = jQuery( '.arf_main_label.arf_width_counter_label' ).width() + 70;
			leng     = ((leng) < 150) ? '150' : leng;
			jQuery( this ).closest( '.arf_main_label:not(.arf_width_counter_label)' ).removeAttr( 'style' );
			jQuery( this ).closest( '.arf_main_label:not(.arf_width_counter_label)' ).attr( 'style', 'width:' + leng + 'px !important;' );
		}
	}
);

jQuery( document ).on(
	'keyup',
	'#success_msg',
	function() {
		jQuery( this ).removeClass( 'arf_error_border' );
		jQuery( '#success_msg_error' ).hide();
	}
);
jQuery( document ).on(
	'focusin',
	'#success_url',
	function() {
		jQuery( this ).removeClass( 'arf_error_border' );
		jQuery( '#success_url_error' ).hide();
	}
);
jQuery( document ).on(
	'change',
	'#arf_pre_dup_field',
	function() {
		var req_val = jQuery( this ).val();
		if (req_val != '') {
			jQuery( this ).next( '.arf_selectbox' ).removeClass( 'arf_error_border' );
			jQuery( '#arf_pre_dup_field_error' ).hide();
		}
	}
);
jQuery( document ).on(
	'focusin',
	'#arf_max_entry_textbox',
	function() {
		jQuery( this ).removeClass( 'arf_error_border' );
		jQuery( '#arf_max_entry_error' ).hide();
	}
);
jQuery( document ).on(
	'focusin',
	'#arf_restrict_before_date',
	function() {
		jQuery( this ).removeClass( 'arf_error_border' );
		jQuery( '#arf_before_specific_date_error' ).hide();
	}
);
jQuery( document ).on(
	'focusin',
	'#arf_restrict_after_date',
	function() {
		jQuery( this ).removeClass( 'arf_error_border' );
		jQuery( '#arf_after_specific_date_error' ).hide();
	}
);
jQuery( document ).on(
	'focusin',
	'#arf_restrict_daterange_start_date,#arf_restrict_daterange_end_date',
	function() {
		jQuery( this ).removeClass( 'arf_error_border' );
		jQuery( '#arf_date_range_end_error' ).hide();
	}
);
jQuery( document ).on(
	'change',
	'input[name="arf_draggable"]',
	function() {
		var get_fid = jQuery( this ).attr( 'id' );
		get_fid     = get_fid.split( '_' );
		get_fid     = get_fid[3];
		if (jQuery( this ).prop( 'checked' ) == true) {
			jQuery( '#arf_dragable_label_' + get_fid ).attr( 'readonly', false );
		} else {
			jQuery( '#arf_dragable_label_' + get_fid ).attr( 'readonly', true );
		}
	}
);

function arforms_get_field_array_id( field_id, inputstyle ){

	if( 'material' == inputstyle ){
		field_id = 'arflite_convert_new_materialize_field_array_json';
	} else {
		field_id = 'arflite_convert_new_field_array_json';
	}

	return field_id;
}

jQuery( document ).ready(
	function() {

		wp.hooks.addAction( 'arforms_load_external_js_function', 'arforms-form-builder', arflite_load_external_js_function, 10 );
		wp.hooks.addAction( 'arforms_initialize_resizable', 'arforms-form-builder', arflite_initialize_resizable, 10 );
		wp.hooks.addAction( 'arforms_initialize_field_order', 'arforms-form-builder', arflite_initialize_field_order, 10 );
		wp.hooks.addAction( 'arforms_set_default_column_width', 'arforms-form-builder', arfliteSetDefaultColumnWidth, 10 );
		wp.hooks.addAction( 'arforms_load_bootstrap_js_css', 'arforms-form-builder', arflite_load_bootstrap_js_css, 10, 2 );
		wp.hooks.addAction( 'arforms_initialize_control', 'arforms-form-builder', arflite_initialize_control, 10, 3);
		wp.hooks.addAction( 'arforms_reset_single_field_ids', 'arforms-form-builder', arflite_reset_single_field_ids, 10);
		wp.hooks.addAction( 'arforms_remove_blank_element', 'arforms-form-builder', arfliteremoveBlankElm, 10 );
		wp.hooks.addAction( 'arforms_add_inner_classes', 'arforms-form-builder', arfliteaddinnerclasses, 10 );
		wp.hooks.addAction( 'arforms_initialize_tipso_on_focus', 'arforms-form-builder', arflite_initialize_on_sortable_focus_tipso, 10, 2 );
		wp.hooks.addAction( 'arforms_initialize_field_resize_width', 'arforms-form-builder', arfliteinitialize_field_resize_width, 10 );
		wp.hooks.addAction( 'arforms_adjust_div_height', 'arforms-form-builder', arfliteheightdiv, 10, 2 );
		wp.hooks.addAction( 'arforms_add_form_inner_field_from_list', 'arforms-form-builder', arforms_lite_add_form_inner_field_from_list, 10 );

		wp.hooks.addFilter( 'arforms_parse_json_data', 'arforms-form-builder', arflite_parse_json, 10 );
		wp.hooks.addFilter( 'arforms_modify_field_array_id', 'arforms-form-builder', arforms_get_field_array_id, 10, 2 );
		wp.hooks.addFilter( 'arforms_retrieve_field_data', 'arforms-form-builder', arflite_retrieve_field_data, 10, 1 );
		wp.hooks.addFilter( 'arforms_get_multicol_html', 'arforms-form-builder', arflite_multicol_html, 10 );

		window.is_loading = true;
		if (jQuery( '#new_fields' ).length > 0) {
			setTimeout(
				function() {
					setTimeout(
						function() {
							jQuery( '#arfeditor_loader' ).css( 'display', 'none' );
							arflite_load_external_js_function();
							arflitesetsubmitautowdith();
							arflitehidesetvaluefield();
							arfliteSetDefaultColumnWidth();
						},
						1000
					);
					arflite_initialize_resizable();
					if (document.getElementById( 'arfmainforminputstyle' ).value == 'material') {
						arflite_material_style_init();
					}
					document.getElementById( 'arfchange_field' ).value       = '';
					document.getElementById( 'arfchange_inner_field' ).value = '';
				},
				1000
			);
		}
		window.is_loading = false;
	}
);

function arforms_lite_add_form_inner_field_from_list( event ){
	arforms_sortable.add_form_inner_field_from_list( event );
}

jQuery( document ).on(
	"focusin",
	".arf_materialize_form .arfhelptipfocus input,.arf_materialize_form .arfhelptipfocus textarea",
	function(e) {
		var bgcolor         = document.getElementById( 'arf_tooltip_bg_color' ).value;
		var textcolor       = document.getElementById( 'arf_tooltip_font_color' ).value;
		var tooltipposition = jQuery( 'input[name="arflitetippos"]:checked' ).val();

		jQuery( this ).parent().parent().each(
			function() {
				jQuery( this ).tipso( 'destroy' );
				var dataContent = jQuery( this ).attr( 'data-title' );
				if (jQuery( this ).find( "input" ).hasClass( "arf_phone_utils" )) {
					dataContent = jQuery( this ).parent().attr( "data-title" );
				}
				if (dataContent != null || dataContent != undefined) {
					var arftooltip_editor = jQuery( this ).tipso(
						{
							position: tooltipposition,
							width: 'auto',
							useTitle: false,
							content: dataContent,
							background: bgcolor,
							color: textcolor,
						}
					);
					jQuery( this ).tipso( "show" );
					arftooltip_editor.off( "mouseover.tipso" );
					arftooltip_editor.off( "mouseout.tipso" );
				}
			}
		);
	}
);
jQuery( document ).on(
	"focusout",
	".arf_materialize_form .arfhelptipfocus input, .arf_materialize_form .arfhelptipfocus textarea",
	function(e) {
		jQuery( this ).parent().parent().each(
			function() {
				jQuery( this ).tipso( "hide" );
				jQuery( this ).tipso( "destroy" );
			}
		);
	}
);
jQuery( document ).ready(
	function() {

		if (jQuery( "#arf_form_popup_entries" ).length > 0) {
			arflite_load_popup_list_grid();
		}

		var labelpos = jQuery( 'input[name="arfmps"]:checked' ).val();
		if (labelpos == 'top') {
			jQuery( "#arfmainformwidthsetting" ).attr( 'readonly', true );
		}
		if (jQuery( '#open_new_form_div' ).val() > 0) {
			jQuery( '#new_form_model' ).parents( '.arf_modal_overlay' ).addClass( 'arfactive' );
			jQuery( '#new_form_model' ).addClass( 'arfactive' );
			jQuery('.arf_editor_header_belt').removeClass('arf_editor_header_belt_cls');
			var pageurl = arflite_removeVariableFromURL( document.URL, 'isp' );
			if (window.history.pushState) {
				window.history.pushState(
					{
						path: pageurl
					},
					'',
					pageurl
				);
			}
		}
		if ( typeof jQuery().datetimepicker == 'function' ) {
			if (jQuery( '#arfdateformate' ).length > 0) {
				var arfdate_formate = document.getElementById( 'arfdateformate' ).getAttribute( 'data-js-formate' );
				jQuery( '.arf_datetimepicker' ).datetimepicker(
					{
						format: arfdate_formate,
						keyBinds: ""
					}
				);
			}
		}
		if (typeof window.TempFields != 'undefined') {
			delete window.TempFields;
		}
		var beltTooltips = document.getElementsByClassName( 'arfbelttooltip' );
		var belt_tip_len = beltTooltips.length;
		if (belt_tip_len > 0) {
			var tip_opt = {
				useTitle: false,
				position: 'bottom',
				width: 'auto',
				background: '#FFFFFF',
				color: '#3F74E7',
				size: 'arf_belt_button_tooltip',
			};
			for (var b = 0; b < belt_tip_len; b++) {
				var current_tip  = beltTooltips[b];
				var data_content = current_tip.getAttribute( 'data-title' );
				jQuery( current_tip ).tipso( "destroy" );
				tip_opt.content = data_content;
				jQuery( current_tip ).tipso( tip_opt );
			}
		}
		var position_tip     = document.getElementsByClassName( 'arftootltip_position' );
		var position_tip_len = position_tip.length;
		if (position_tip_len > 0) {
			var bgcolor         = document.getElementById( 'arf_tooltip_bg_color' ).value;
			var textcolor       = document.getElementById( 'arf_tooltip_font_color' ).value;
			var tooltipposition = jQuery( 'input[name="arflitetippos"]:checked' ).val();
			var pos_tip_opt     = {
				position: tooltipposition,
				width: 'auto',
				useTitle: false,
				content: dataContent,
				background: bgcolor,
				color: textcolor,
			};
			for (var p = 0; p < position_tip_len; p++) {
				var current_f_tip = position_tip[p];
				var data_content  = current_f_tip.getAttribute( 'data-title' );
				jQuery( current_f_tip ).tipso( 'destroy' );
				pos_tip_opt.content = data_content;
				jQuery( current_f_tip ).tipso( pos_tip_opt );
			}
		}

		jQuery( 'input[name="arflitetippos"]' ).change(
			function(){
				var position_tip     = document.querySelectorAll( '.arftootltip_position, .arf_materialize_form .edit_field_type_radio .arfhelptipfocus, .arf_materialize_form .edit_field_type_checkbox .arfhelptipfocus, .arf_materialize_form .edit_field_type_select .arfhelptipfocus, .arf_materialize_form .edit_field_type_arfslider .arfhelptipfocus' );
				var position_tip_len = position_tip.length;
				if (position_tip_len > 0) {
					var bgcolor   = document.getElementById( 'arf_tooltip_bg_color' ).value;
					var textcolor = document.getElementById( 'arf_tooltip_font_color' ).value;

					var tooltipposition = jQuery( 'input[name="arflitetippos"]:checked' ).val();

					var pos_tip_opt = {
						position: tooltipposition,
						width: 'auto',
						useTitle: false,
						content: dataContent,
						background: bgcolor,
						color: textcolor,
					};
					for (var p = 0; p < position_tip_len; p++) {
						var current_f_tip = position_tip[p];
						var data_content  = current_f_tip.getAttribute( 'data-title' );
						jQuery( current_f_tip ).tipso( 'destroy' );
						pos_tip_opt.content = data_content;
						jQuery( current_f_tip ).tipso( pos_tip_opt );
					}
				}
			}
		);

		var helptipfocuses    = document.querySelectorAll( '.arf_materialize_form .edit_field_type_radio .arfhelptipfocus, .arf_materialize_form .edit_field_type_checkbox .arfhelptipfocus, .arf_materialize_form .edit_field_type_select .arfhelptipfocus, .arf_materialize_form .edit_field_type_arfslider .arfhelptipfocus' );
		var helptip_focus_len = helptipfocuses.length;
		if (helptip_focus_len > 0) {
			var bgcolor         = document.getElementById( 'arf_tooltip_bg_color' ).value;
			var textcolor       = document.getElementById( 'arf_tooltip_font_color' ).value;
			var tooltipposition = jQuery( 'input[name="arflitetippos"]:checked' ).val();

			var htoptions = {
				position: tooltipposition,
				width: 'auto',
				useTitle: false,
				background: bgcolor,
				color: textcolor
			};
			for (var h = 0; h < helptip_focus_len; h++) {
				var $this         = helptipfocuses[h];
				var dataContent   = $this.getAttribute( 'data-title' );
				htoptions.content = dataContent;
				jQuery( $this ).tipso( htoptions );
			}
		}
		var jscolors      = document.getElementsByClassName( 'jscolor' );
		var total_jscolor = jscolors.length;
		if (total_jscolor > 0) {
			var __JSPICKER_NEWROW = [];
			for (var j = 0; j < total_jscolor; j++) {
				var object = {};
				var el     = jscolors[j];
				var elnm   = el.getAttribute( 'name' );
				if (elnm == null) {
					elnm = el.getAttribute( 'data-fid' );
				}
				if (__arf_jspicker_object.indexOf( elnm ) > -1) {
					return;
				} else {
					__arf_jspicker_object.push( elnm );
				}
				var jscolorattr      = el.getAttribute( 'data-jscolor' );
				var object           = JSON.parse( jscolorattr );
				__JSPICKER_NEWROW[j] = new jscolor( el, object );
			}
			if (typeof __JSPICKER === 'undefined') {
				var __JSPICKER = __JSPICKER_NEWROW;
			} else {
				var __JSPICKER = __JSPICKER.concat( __JSPICKER_NEWROW );
			}
			var __JSPICKER = arflitefindUnique( __JSPICKER );
		}
		//jQuery( ".arf_form_editor_content" ).delay( 600 ).fadeIn( 500 );
		//jQuery( ".arf_form_editor_content" ).show();
		jQuery( ".arf_form_editor_content" ).removeClass('display-none-cls').addClass('display-blck-cls');
		if (jQuery( '#arfgettemplate_style' ).length > 0 && document.getElementById( 'arfgettemplate_style' ).value == 'rounded') {
			setTimeout(
				function() {
					var slider_id   = jQuery( '#arfmainbordersetting_exs' ).attr( 'data-slider-id' );
					var id          = 'arfmainbordersetting_exs';
					var ac_id       = id.replace( '_exs', '' );
					var slider_val  = 50;
					var slider_val1 = parseFloat( jQuery.trim( slider_val ) );
					jQuery( '#' + slider_id ).trigger( 'mousedown' ).trigger( 'mouseup' );
					jQuery( '#' + slider_id ).trigger( 'slideStop' );
					var border_radius = document.getElementById( 'arflite_border_field_radius' );
					border_radius.noUiSlider.set( slider_val1 );
					jQuery( '#' + ac_id ).val( slider_val1 );
					jQuery( "#" + ac_id ).trigger( 'change' );

					/* Tablet */
					var slider_id_tablet = jQuery('#arfmainbordersetting_exs_tablet').attr('data-slider-id');
					var id_tablet = 'arfmainbordersetting_exs_tablet';
					var ac_id_tablet = id_tablet.replace('_exs_tablet', '_tablet');
					var slider_val_tablet = 50;
					var slider_val1_tablet = parseFloat(jQuery.trim(slider_val_tablet));
					jQuery('#' + slider_id_tablet).trigger('mousedown').trigger('mouseup');
					var field_border_radius_slider_tablet = document.getElementById('arf_arfmainbordersetting_tablet');
					field_border_radius_slider_tablet.noUiSlider.set(slider_val1_tablet);
					jQuery('#' + ac_id_tablet).val(slider_val1_tablet);
					jQuery("#" + ac_id_tablet).trigger('change');
		
					/* Mobile */
					var slider_id_mobile = jQuery('#arfmainbordersetting_exs_mobile').attr('data-slider-id');
					var id_mobile = 'arfmainbordersetting_exs_mobile';
					var ac_id_mobile = id_mobile.replace('_exs_mobile', '_mobile');
					var slider_val_mobile = 50;
					var slider_val1_mobile = parseFloat(jQuery.trim(slider_val_mobile));
					jQuery('#' + slider_id_mobile).trigger('mousedown').trigger('mouseup');
					var field_border_radius_slider_mobile = document.getElementById('arf_arfmainbordersetting_mobile');
					field_border_radius_slider_mobile.noUiSlider.set(slider_val1_mobile);
					jQuery('#' + ac_id_mobile).val(slider_val1_mobile);
					jQuery("#" + ac_id_mobile).trigger('change');
				},
				100
			);
		}

		if (jQuery( "#arflite_browser_info" ).length > 0) {

			var browser_info = JSON.parse( jQuery( "#arflite_browser_info" ).val() );

			var border_radius_slider        = document.getElementById( 'arflite_borderradius' );
			var border_radius_inupt_slider  = document.getElementById( 'arfmainfieldsetradius_exs' );
			var default_val_border_radius   = border_radius_inupt_slider.getAttribute( 'data-slider-value' );
			var border_radius_hidden_slider = document.getElementById( 'arfmainfieldsetradius' );
			noUiSlider.create(
				border_radius_slider,
				{
					start: default_val_border_radius,
					connect: 'lower',
					tooltips: [wNumb( {decimals: 0} )],
					range: {
						min: 0,
						max: 100
					}
				}
			);
			border_radius_slider.noUiSlider.on(
				'change',
				function (values, handle){
					var data  = border_radius_inupt_slider.innerHtml = Math.round( values[handle] );
					var data1 = border_radius_hidden_slider.value = Math.round( values[handle] );
					var id    = jQuery( '#arfmainfieldsetradius_exs' ).attr( 'id' );
					id        = id.replace( '_exs','' );
					jQuery( '#' + id ).val( Math.round( data ) ).trigger( 'change' );
				}
			);

			var border_size_slider      = document.getElementById( 'arflite_bordersize' );
			var border_input_size       = document.getElementById( 'arfmainfieldset_exs' );
			var default_val_border_size = border_input_size.getAttribute( 'data-slider-value' );
			var border_hidden_size      = document.getElementById( 'arfmainfieldset' );
			noUiSlider.create(
				border_size_slider,
				{
					start: default_val_border_size,
					connect: 'lower',
					tooltips: [wNumb( {decimals:0} )],
					range:{
						min: 0,
						max: 50
					}
				}
			);
			border_size_slider.noUiSlider.on(
				'change',
				function(values, handle){
					var data  = border_input_size.innerHtml = Math.round( values[handle] );
					var data1 = border_hidden_size.value = Math.round( values[handle] );
					var id    = jQuery( '#arfmainfieldset_exs' ).attr( 'id' );
					id        = id.replace( '_exs','' );
					jQuery( '#' + id ).val( Math.round( data ) ).trigger( 'change' );
				}
			);

			var input_field_border_size              = document.getElementById( 'arflite_input_border_size' );
			var input_field_slider_input             = document.getElementById( 'arffieldborderwidthsetting_exs' );
			var input_field_slider_hidden            = document.getElementById( 'arffieldborderwidthsetting' );
			var default_val_input_field_slider_value = input_field_slider_input.getAttribute( 'data-slider-value' );
			noUiSlider.create(
				input_field_border_size,
				{
					start: default_val_input_field_slider_value,
					connect: 'lower',
					tooltips: [wNumb( {decimals: 0} )],
					range: {
						min: 0,
						max: 20,
					}
				}
			);
			input_field_border_size.noUiSlider.on(
				'change',
				function(values, handle){
					var data  = input_field_slider_input.innerHtml = Math.round( values[handle] );
					var data1 = input_field_slider_hidden.value = Math.round( values[handle] );
					var id    = jQuery( '#arffieldborderwidthsetting_exs' ).attr( 'id' );
					id        = id.replace( '_exs','' );
					jQuery( '#' + id ).val( Math.round( data ) ).trigger( 'change' );
				}
			);

			var btn_xoffset_slider              = document.getElementById( 'arflite_btn_xoffset_slider' );
			var btn_xoffset_input_slider        = document.getElementById( 'arfsubmitbuttonxoffsetsetting_exs' );
			var btn_xoffset_input_slider_hidden = document.getElementById( 'arfsubmitbuttonxoffsetsetting' );
			var default_val_btnxoffset          = btn_xoffset_input_slider.getAttribute( 'data-slider-value' );
			noUiSlider.create(
				btn_xoffset_slider,
				{
					start: default_val_btnxoffset,
					connect: 'lower',
					tooltips: [wNumb( {decimals:0} )],
					range:{
						min:-50,
						max: 50
					}
				}
			);
			btn_xoffset_slider.noUiSlider.on(
				'change',
				function(values, handle){
					var data  = btn_xoffset_input_slider.innerHtml = Math.round( values[handle] );
					var data1 = btn_xoffset_input_slider_hidden.value = Math.round( values[handle] );
					var id    = jQuery( '#arfsubmitbuttonxoffsetsetting_exs' ).attr( 'id' );
					id        = id.replace( '_exs', '' );
					jQuery( '#' + id ).val( Math.round( data ) ).trigger( 'change' );

				}
			);

			var buttonStyle = jQuery( '#arfsubmitbuttonstyle' ).val();
			if (buttonStyle == 'border' || buttonStyle == 'reverse border') {
				jQuery( '#arflite_btn_xoffset_slider' ).attr( 'disabled', true );
				jQuery( '#arflite_btn_yoffset_slider' ).attr( 'disabled', true );;
				jQuery( '#arflite_btn_blur_slider' ).attr( 'disabled', true );
				jQuery( '#arflite_spread_slider' ).attr( 'disabled', true );
			}

			if (jQuery( '#arfmainforminputstyle' ).val() == 'material') {
				var vertical_slider               = document.getElementById( 'arflite_vertical_slider' );
				var vertical_slider_input         = document.getElementById( 'arffieldinnermarginssetting_1_exs' );
				var vertical_slider_hidden_slider = document.getElementById( 'arffieldinnermarginsetting_1' );
				noUiSlider.create(
					vertical_slider,
					{
						start: 1,
						connect: 'lower',
						tooltips: [wNumb( {decimals:0} )],
						range: {
							min: 0,
							max: 25
						}
					}
				);
				vertical_slider.noUiSlider.on(
					'change',
					function(values, handle) {
						var data  = vertical_slider_input.innerHtml = Math.round( values[handle] );
						var data1 = vertical_slider_hidden_slider.value = Math.round( values[handle] );
						var id    = jQuery( '#arffieldinnermarginssetting_1_exs' ).attr( 'id' );
						id        = id.replace( '_exs', '' );
						if ( typeof arflite_change_field_spacing != 'function' ) {
							return;
						}
						arflite_change_field_spacing();
						jQuery( '#arffieldinnermarginsetting_1' ).val( 0 );
					}
				);
				jQuery( '#arflite_vertical_slider' ).attr( 'disabled', true );
			} else {
				var vertical_slider        = document.getElementById( 'arflite_vertical_slider' );
				var vertical_slider_input  = document.getElementById( 'arffieldinnermarginssetting_1_exs' );
				var default_vertical_value = vertical_slider_input.getAttribute( 'data-slider-value' );
				var vertical_slider_hidden = document.getElementById( 'arffieldinnermarginsetting_1' );
				noUiSlider.create(
					vertical_slider,
					{
						start: default_vertical_value,
						connect: 'lower',
						tooltips: [wNumb( {decimals:0} )],
						range:{
							min: 0,
							max: 25
						}
					}
				);
				vertical_slider.noUiSlider.on(
					'change',
					function(values, handle){
						var data  = vertical_slider_input.innerHtml = Math.round( values[handle] );
						var data1 = vertical_slider_hidden.value = Math.round( values[handle] );
						var id    = jQuery( '#arffieldinnermarginssetting_1_exs' ).attr( 'id' );
						id        = id.replace( '_exs', '' );
						if ( typeof arflite_change_field_spacing != 'function' ) {
							return;
						}
						arflite_change_field_spacing();
						jQuery( '#arffieldinnermarginsetting_1' ).val( Math.round( data ) );
					}
				);
			}

			var horizontal_slider        = document.getElementById( 'arflite_horizontal_slider' );
			var horizontal_slider_input  = document.getElementById( 'arffieldinnermarginssetting_2_exs' );
			var horizontal_slider_hidden = document.getElementById( 'arffieldinnermarginsetting_2' );
			var default_horizontal_val   = horizontal_slider_input.getAttribute( 'data-slider-value' );
			noUiSlider.create(
				horizontal_slider,
				{
					start: default_horizontal_val,
					connect: 'lower',
					tooltips: [wNumb( {decimals:0} )],
					range:{
						min: 0,
						max: 25
					}
				}
			);
			horizontal_slider.noUiSlider.on(
				'change',
				function(values, handle){
					var data  = horizontal_slider_input.innerHtml = Math.round( values[handle] );
					var data1 = horizontal_slider_hidden.value = Math.round( values[handle] );
					var id    = jQuery( '#arffieldinnermarginssetting_2_exs' ).attr( 'id' );
					id        = id.replace( '_exs', '' );
					if ( typeof arflite_change_field_spacing != 'function' ) {
						return;
					}
					arflite_change_field_spacing();
					jQuery( '#arffieldinnermarginsetting_2' ).val( Math.round( data ) ).trigger( 'change' );
				}
			);

			var input_field_slider       = document.getElementById( 'arflite_mainfieldcommonsize' );
			var input_field_input_slider = document.getElementById( 'arfmainfieldcommonsize_exs' );
			var input_field_default_val  = input_field_input_slider.getAttribute( 'data-slider-value' );

			var input_field_hidden_slider = document.getElementById( 'arfmainfieldcommonsize' );
			noUiSlider.create(
				input_field_slider,
				{
					start: input_field_default_val,
					connect: 'lower',
					tooltips: [wNumb( { decimals:0 } )],
					range: {
						min: 1,
						max: 10
					}
				}
			)

			input_field_slider.noUiSlider.on(
				'change',
				function (values, handle) {
					var data  = input_field_input_slider.innerHtml = Math.round( values[handle] );
					var data1 = input_field_hidden_slider.value = Math.round( values[handle] );
					var id    = jQuery( '#arfmainfieldcommonsize_exs' ).attr( 'id' );
					id        = id.replace( '_exs','' );
					jQuery( '#' + id ).val( data ).trigger( 'change' );

					if (jQuery( '#arfmainforminputstyle' ).val() == 'material') {
						var font_size = arflite_parse_json( Base64.decode( jQuery( "#arflite_convert_font_size_array_json_for_material" ).val() ) );
					} else {
						var font_size = arflite_parse_json( Base64.decode( jQuery( "#arflite_convert_font_size_array_json" ).val() ) );
					}

					var font_size_val = font_size[Math.round( data )];
					jQuery.each(
						font_size_val,
						function(index, el) {
							if (index == 'arfdescfontsizesetting') {
								jQuery( '#arf_form_styling_tools' ).find( '#' + index ).val( el ).trigger( 'change' );
								jQuery( '#arf_form_styling_tools' ).find( '#' + index ).next( 'dl' ).find( 'span' ).text( el );
								jQuery( '#arf_form_styling_tools' ).find( '#' + index ).next( 'dl' ).find( 'input' ).val( el );
							} else {
								jQuery( '.arf_custom_font_popup' ).find( '#' + index ).val( el ).trigger( 'change' );
								jQuery( '.arf_custom_font_popup' ).find( '#' + index ).next( 'dl' ).find( 'span' ).text( el );
								jQuery( '.arf_custom_font_popup' ).find( '#' + index ).next( 'dl' ).find( 'input' ).val( el );
							}
						}
					);
					jQuery( '.arf_custom_font_options' ).each(
						function(index, el) {
							var value = jQuery( this ).val();
							jQuery( this ).attr( 'data-default-font', value );
						}
					);
				}
			);

			var window_opacity_slider         = document.getElementById( 'arflite_window_opacity' );
			var window_opacity_input_slider   = document.getElementById( 'arfmainform_opacity_exs' );
			var default_window_opacity_slider = window_opacity_input_slider.getAttribute( 'data-slider-value' );
			var window_opacity_hidden_slider  = document.getElementById( 'arfmainform_opacity' );
			noUiSlider.create(
				window_opacity_slider,
				{
					start: default_window_opacity_slider,
					connect: 'lower',
					tooltips: [wNumb( {decimals:1} )],
					range:{
						min: 0,
						max: 1,
					}
				}
			);
			window_opacity_slider.noUiSlider.on(
				'change',
				function(values, handle) {
					var data  = window_opacity_slider.innerHtml = values[handle];
					var data1 = window_opacity_hidden_slider.value = values[handle];
					var id    = jQuery( '#arfmainform_opacity_exs' ).attr( 'id' );
					id        = id.replace( '_exs','' );
					jQuery( '#' + id ).val( data ).trigger( 'change' );
				}
			);

			var place_holder_opacity_slider      = document.getElementById( 'arflite_placeholder_opacity_slider' );
			var placeholder_opacity_input_slider = document.getElementById( 'arfplaceholder_opacity_exs' );
			var default_placeholder_opacity      = placeholder_opacity_input_slider.getAttribute( 'data-slider-value' );
			var placeholder_opacity_hidden_value = document.getElementById( 'arfplaceholder_opacity' );
			if ( default_placeholder_opacity > 1 ) {
				default_placeholder_opacity = default_placeholder_opacity / 10;
			}
			noUiSlider.create(
				place_holder_opacity_slider,
				{
					start: default_placeholder_opacity,
					connect: 'lower',
					tooltips: [wNumb( {decimals:1} )],
					range:{
						min: 0,
						max: 1
					}
				}
			);
			place_holder_opacity_slider.noUiSlider.on(
				'change',
				function(values, handle){
					var data  = placeholder_opacity_input_slider.innerHtml = values[handle];
					var data1 = placeholder_opacity_hidden_value.value = values[handle];
					var id    = jQuery( '#arfplaceholder_opacity_exs' ).attr( 'id' );
					id        = id.replace( '_exs','' );
					jQuery( '#' + id ).val( data ).trigger( 'change' );
				}
			);

			var arflite_field_border_radius = document.getElementById( 'arflite_border_field_radius' );
			var field_border_radius_input   = document.getElementById( 'arfmainbordersetting_exs' );
			var field_border_radius_hidden  = document.getElementById( 'arfmainbordersetting' );
			var default_val_border_radius   = field_border_radius_input.getAttribute( 'data-slider-value' );
			noUiSlider.create(
				arflite_field_border_radius,
				{
					start: default_val_border_radius,
					connect: 'lower',
					tooltips: [wNumb( {decimals:0} )],
					range:{
						min: 0,
						max: 50
					}
				}
			);
			arflite_field_border_radius.noUiSlider.on(
				'change',
				function(values,handle){
					var data  = field_border_radius_input.innerHtml = Math.round( values[handle] );
					var data1 = field_border_radius_hidden.value = Math.round( values[handle] );
					var id    = jQuery( '#arfmainbordersetting_exs' ).attr( 'id' );
					id        = id.replace( '_exs','' );
					jQuery( '#' + id ).val( Math.round( data ) ).trigger( 'change' );
				}
			);
			if (jQuery( '#arfmainforminputstyle' ).val() == 'material' || jQuery( '#arfmainforminputstyle' ).val() == 'rounded') {
				jQuery( '#arflite_border_field_radius' ).attr( 'disabled', true );
			}

			/* for field border radius tablet */
            var field_border_radius_slider_tablet = document.getElementById('arf_arfmainbordersetting_tablet');
            var field_border_radius_value_tablet = document.getElementById('arfmainbordersetting_exs_tablet');
            var field_border_radius_defaultval_tablet = field_border_radius_value_tablet.getAttribute('data-slider-value');
            var field_border_radius_hidden_tablet = document.getElementById('arfmainbordersetting_tablet');
            noUiSlider.create(field_border_radius_slider_tablet,{
                start: field_border_radius_defaultval_tablet,
                connect:'lower',
                tooltips: [wNumb({ decimals:0 })],
                range: {
                    min: 0,
                    max: 50
                }
            });
            field_border_radius_slider_tablet.noUiSlider.on('change',function(value, handle){
                var data = field_border_radius_value_tablet.innerHTML = Math.round(value[handle]);
                var data1 = field_border_radius_hidden_tablet.value = Math.round(value[handle]);
                var id = jQuery('#arfmainbordersetting_exs_tablet').attr('id');
                id = id.replace('_exs','');
                jQuery('#' + id).val(Math.round(data)).trigger('change');
            });
            if(jQuery('#arfmainforminputstyle').val() == 'material' || jQuery('#arfmainforminputstyle').val() == 'rounded'){
                jQuery('#arf_arfmainbordersetting_tablet').attr('disabled', true);
            }

            /* for field mobile radius  */
            var field_border_radius_slider_mobile = document.getElementById('arf_arfmainbordersetting_mobile');
            var field_border_radius_value_mobile = document.getElementById('arfmainbordersetting_exs_mobile');
            var field_border_radius_defaultval_mobile = field_border_radius_value_mobile.getAttribute('data-slider-value');
            var field_border_radius_hidden_mobile = document.getElementById('arfmainbordersetting_mobile');
            noUiSlider.create(field_border_radius_slider_mobile,{
                start: field_border_radius_defaultval_mobile,
                connect:'lower',
                tooltips: [wNumb({ decimals:0 })],
                range: {
                    min: 0,
                    max: 50
                }
            });
            field_border_radius_slider_mobile.noUiSlider.on('change',function(value, handle){
                var data = field_border_radius_value_mobile.innerHTML = Math.round(value[handle]);
                var data1 = field_border_radius_hidden_mobile.value = Math.round(value[handle]);
                var id = jQuery('#arfmainbordersetting_exs_mobile').attr('id');
                id = id.replace('_exs','');
                jQuery('#' + id).val(Math.round(data)).trigger('change');
            });
            if(jQuery('#arfmainforminputstyle').val() == 'material' || jQuery('#arfmainforminputstyle').val() == 'rounded'){
                jQuery('#arf_arfmainbordersetting_mobile').attr('disabled', true);
            }

			var button_border_radius          = document.getElementById( 'arflite_btn_border_radius' );
			var button_border_radius_input    = document.getElementById( 'arfsubmitbuttonborderradiussetting_exs' );
			var button_border_radius_hidden   = document.getElementById( 'arfsubmitbuttonborderradiussetting' );
			var default_val_border_btn_radius = button_border_radius_input.getAttribute( 'data-slider-value' );
			noUiSlider.create(
				button_border_radius,
				{
					start: default_val_border_btn_radius,
					connect: 'lower',
					tooltips: [wNumb( {decimals: 0} )],
					range: {
						min: 0,
						max: 50
					}
				}
			);
			button_border_radius.noUiSlider.on(
				'change',
				function(values, handle){
					var data  = button_border_radius_input.innerHtml = Math.round( values[handle] );
					var data1 = button_border_radius_hidden.value = Math.round( values[handle] );
					var id    = jQuery( '#arfsubmitbuttonborderradiussetting_exs' ).attr( 'id' );
					id        = id.replace( '_exs', '' );
					jQuery( '#' + id ).val( Math.round( data ) ).trigger( 'change' );
				}
			);

			var button_border_width        = document.getElementById( 'arflite_btn_border_size' );
			var button_border_width_input  = document.getElementById( 'arfsubmitbuttonborderwidhtsetting_exs' );
			var button_border_width_hidden = document.getElementById( 'arfsubmitbuttonborderwidhtsetting' );
			var default_val_button_border  = button_border_width_input.getAttribute( 'data-slider-value' );
			noUiSlider.create(
				button_border_width,
				{
					start: default_val_button_border,
					connect: 'lower',
					tooltips: [wNumb( {decimals:0} )],
					range: {
						min: 0,
						max: 50
					}
				}
			);
			button_border_width.noUiSlider.on(
				'change',
				function(values, handle){
					var data  = button_border_width_input.innerHtml = Math.round( values[handle] );
					var data1 = button_border_width_hidden.value = Math.round( values[handle] );
					var id    = jQuery( '#arfsubmitbuttonborderwidhtsetting_exs' ).attr( 'id' );
					id        = id.replace( '_exs', '' );
					jQuery( '#' + id ).val( Math.round( data ) ).trigger( 'change' );
				}
			);

			var btnspread_slider        = document.getElementById( 'arflite_spread_slider' );
			var btnspread_slider_input  = document.getElementById( 'arfsubmitbuttonshadowsetting_exs' );
			var btnspread_slider_hidden = document.getElementById( 'arfsubmitbuttonshadowsetting' );
			var default_val_btnspread   = btnspread_slider_input.getAttribute( 'data-slider-value' );
			noUiSlider.create(
				btnspread_slider,
				{
					start: default_val_btnspread,
					connect: 'lower',
					tooltips: [wNumb( {decimals:0} )],
					range:{
						min: 0,
						max: 50,

					}
				}
			);
			btnspread_slider.noUiSlider.on(
				'change',
				function(values, handle){
					var data  = btnspread_slider_input.innerHtml = Math.round( values[handle] );
					var data1 = btnspread_slider_hidden.value = Math.round( values[handle] );
					var id    = jQuery( '#arfsubmitbuttonshadowsetting_exs' ).attr( 'id' );
					id        = id.replace( '_exs', '' );
					jQuery( '#' + id ).val( Math.round( data ) ).trigger( 'change' );
				}
			);

			var blur_btn_slider         = document.getElementById( 'arflite_btn_blur_slider' );
			var blur_btn_slider_input   = document.getElementById( 'arfsubmitbuttonblursetting_exs' );
			var default_val_blur_slider = blur_btn_slider_input.getAttribute( 'data-slider-value' );
			var blur_btn_slider_hidden  = document.getElementById( 'arfsubmitbuttonblursetting' );
			noUiSlider.create(
				blur_btn_slider,
				{
					start: default_val_blur_slider,
					connect: 'lower',
					tooltips: [wNumb( {decimals:0} )],
					range:{
						min: 0,
						max: 50
					}
				}
			);
			blur_btn_slider.noUiSlider.on(
				'change',
				function(values, handle){
					var data  = blur_btn_slider_input.innerHtml = Math.round( values[handle] );
					var data1 = blur_btn_slider_hidden.value = Math.round( values[handle] );
					var id    = jQuery( '#arfsubmitbuttonblursetting_exs' ).attr( 'id' );
					id        = id.replace( '_exs', '' );
					jQuery( '#' + id ).val( Math.round( data ) ).trigger( 'change' );

				}
			);

			var yoffsetslider         = document.getElementById( 'arflite_btn_yoffset_slider' );
			var yoffsetslider_input   = document.getElementById( 'arfsubmitbuttonyoffsetsetting_exs' );
			var yoffsetslider_hidden  = document.getElementById( 'arfsubmitbuttonyoffsetsetting' );
			var default_yoffsetslider = yoffsetslider_input.getAttribute( 'data-slider-value' );
			noUiSlider.create(
				yoffsetslider,
				{
					start: default_yoffsetslider,
					connect: 'lower',
					tooltips: [wNumb( {decimals:0} )],
					range: {
						min: -50,
						max: 50
					}
				}
			);
			yoffsetslider.noUiSlider.on(
				'change',
				function(values, handle){
					var data  = yoffsetslider_input.innerHtml = Math.round( values[handle] );
					var data1 = yoffsetslider_hidden.value = Math.round( values[handle] );
					var id    = jQuery( '#arfsubmitbuttonyoffsetsetting_exs' ).attr( 'id' );
					id        = id.replace( '_exs', '' );
					jQuery( '#' + id ).val( Math.round( data ) ).trigger( 'change' );
				}
			);

			jQuery( '.widget .widget-inside' ).not( '.current_widget .widget-inside' ).hide();
			jQuery( '#preview-form-styling-setting' ).css( 'height', '' );
			jQuery( '#preview-form-styling-setting' ).removeAttr( 'style' );
		}

		if (jQuery( "#form_name_new" ).length > 0) {
			jQuery( '#form_name_new' ).focus();
		}

		if (jQuery( "#success_message[data-id='arflite_shared_error_success_message']" ).length > 0) {
			setTimeout(
				function() {
					arflite_success_msg();
				},
				10
			);
		}

		if (jQuery( "#error_message[data-id='arflite_shared_error_err_message']" ).length > 0) {
			setTimeout(
				function() {
					arflite_error_msg();
				},
				10
			);
		}
		if ( jQuery( '#frm_date_format' ).length > 0 ) {
			var selected_format = jQuery( "dl[data-id='frm_date_format']" ).find( 'dt span' ).text();
			var db_value        = jQuery( "#frm_date_format" ).val();

			var opt_value = jQuery( "ul[data-id='frm_date_format']" ).find( 'li[data-label="' + selected_format + '"]' ).attr( 'data-value' );

			if ( 'undefined' != typeof opt_value && opt_value != db_value ) {
				jQuery( '#frm_date_format' ).val( opt_value );
			}
		}


		if( 'undefined' != typeof arforms_sortable_obj ){
			arforms_sortable_obj.arforms_adjust_height();
		}
	}
);
jQuery( document ).on(
	'blur',
	'#arf_editor_form_width',
	function() {
		var val = jQuery( this ).val();
		jQuery( '#arf_form_width' ).val( val ).trigger( 'change' );
	}
);
jQuery( document ).on(
	'change',
	'#arf_editor_form_width_unit',
	function() {
		var value = jQuery( this ).val();
		jQuery( '#arffu' ).val( value ).trigger( 'change' );
		jQuery( '#arffu' ).next( 'dl' ).find( 'span' ).text( value );
		jQuery( '#arffu' ).next( 'dl' ).find( 'input' ).val( value );
	}
);

function arfliteCopyToClipboard(text) {
	var textArea              = document.createElement( "textarea" );
	textArea.style.position   = 'fixed';
	textArea.style.top        = 0;
	textArea.style.left       = 0;
	textArea.style.width      = '2em';
	textArea.style.height     = '2em';
	textArea.style.padding    = 0;
	textArea.style.border     = 'none';
	textArea.style.outline    = 'none';
	textArea.style.boxShadow  = 'none';
	textArea.style.background = 'transparent';
	textArea.value            = text;
	document.body.appendChild( textArea );
	textArea.select();
	try {
		var successful = document.execCommand( 'copy' );
		var msg        = successful ? 'successful' : 'unsuccessful';
	} catch (err) {
		console.log( 'Oops, unable to copy' );
	}
	document.body.removeChild( textArea );
}

function arflite_initialize_field_order() {
	var field_order    = {};
	var index          = 1;
	var innerFields    = document.querySelectorAll( 'div.sortable_inner_wrapper,div.unsortable_inner_wrapper' );
	var innerFieldsLen = innerFields.length;
	if (innerFieldsLen > 0) {
		for (var o = 0; o < innerFieldsLen; o++) {
			var obj = innerFields[o];

			var formfield = obj.getElementsByClassName( 'arfformfield' );

			var fflength = formfield.length;
			
			if (fflength == 1) {
				var field_id = obj.id.replace( 'arfmainfieldid_', '' );
				if (field_id.indexOf( '_confirm' ) > -1) {
					if ( ! arflitehasClass( obj, 'arf_confirm_field' )) {
						arfliteaddClass( obj, 'arf_confirm_field' );
					}
				}
				field_order[field_id] = index;
				index++;
			} else if (arflitehasClass( obj, 'arf_confirm_field' )) {
				if (obj.id != null && obj.id != '') {
					var field_id          = obj.id.replace( 'arfmainfieldid_', '' );
					field_order[field_id] = index;
					index++;
				} else {
					arfliteremoveClass( obj, 'arf_confirm_field' );
					var get_inner_class = obj.getAttribute( 'inner_class' );
					if (get_inner_class != null && 'null' != get_inner_class) {
						field_order[get_inner_class + '|' + index] = index;
						index++;
					}
				}
			} else {
				var get_inner_class = obj.getAttribute( 'inner_class' );
				if (get_inner_class != null && 'null' != get_inner_class) {
					field_order[get_inner_class + '|' + index] = index;
					index++;
				}
			}

		}
	}
	field_order                                        = JSON.stringify( field_order );
	document.getElementById( 'arf_field_order' ).value = field_order;
}

function arfliteinitialize_field_resize_width() {
	var field_resize_width = {};
	var elms               = document.querySelectorAll( 'div.sortable_inner_wrapper,div.unsortable_inner_wrapper' );
	var elmslen            = elms.length;
	if (elmslen > 0) {
		var i = 0;
		var o = 0;
		for (var e = 0; e < elmslen; e++) {
			var elm        = elms[e];
			var data_width = elm.getAttribute( 'data-width' );
			if (data_width > 100 || data_width == null || typeof data_width == 'undefined') {
				data_width = 100;
			}

			field_resize_width[(o + 1)] = data_width;
			o++;
		}
	}

	field_resize_width = JSON.stringify( field_resize_width );
	jQuery( 'input#arf_field_resize_width' ).val( field_resize_width );

}

jQuery( document ).on(
	'click',
	'.arf_other_css_expanded_add_element_btn',
	function() {
		if ( ! jQuery( '.arf_other_css_expanded_add_element_btn' ).hasClass( 'arfactive' )) {
			jQuery( '.arf_other_css_expanded_add_element_btn' ).addClass( 'arfactive' );
		} else {
			jQuery( '.arf_other_css_expanded_add_element_btn' ).removeClass( 'arfactive' );
		}
	}
)
jQuery( document ).on(
	'click',
	'.arfnewmodalclose',
	function(e) {
		jQuery( this ).parents( '.arf_popup_container' ).removeClass( 'arfactive' );
		jQuery( this ).parents( '.arf_modal_overlay' ).removeClass( 'arfactive' );
		jQuery('.arf_editor_header_belt').addClass('arf_editor_header_belt_cls');
	}
);
jQuery( document ).on(
	'click',
	'#arf_expand_css_code',
	function() {
		jQuery( '#arf_other_css_expanded_model' ).parent().addClass( 'arfactive' );
		jQuery( '#arf_other_css_expanded_model' ).addClass( 'arfactive' );
		jQuery('.arf_editor_header_belt').removeClass('arf_editor_header_belt_cls');
	}
);
jQuery( document ).on(
	'click',
	'.arf_form_style_tab_item',
	function(e) {
		var wrapper_id = jQuery( this ).attr( 'data-id' );
		jQuery( '.arf_form_style_tab_item,.arf_form_style_tab_container' ).removeClass( 'active' );
		jQuery( this ).addClass( 'active' );
		jQuery( '.arf_form_style_tab_container#' + wrapper_id ).addClass( 'active' );
		jQuery( '.arf_form_reset_button' ).show();
		if (wrapper_id == 'arf_form_custom_css') {
			load_arflite_custom_css();
		}
	}
);

jQuery( document ).on(
	'click',
	'.arf_custom_css_cloud_list_item',
	function() {
		var isExtended     = (typeof jQuery( this ).attr( 'data-target' ) != 'undefined') ? true : false;
		var jsonData       = arflite_parse_json( Base64.decode( jQuery( "#arflite_skin_json" ).val() ) );
		var elementData    = jsonData.arf_element_css;
		var elmId          = jQuery( this ).attr( 'id' );
		var selectorLength = elementData[elmId].selector.length;
		var cssComment     = elementData[elmId].comment;
		var cssClasses     = "";
		if (selectorLength > 1) {
			cssClasses = elementData[elmId].selector.join( ',' );
		} else {
			cssClasses = elementData[elmId].selector[0];
		}
		var formId    = jQuery( '#id' ).val();
		cssClasses    = cssClasses.replace( /({arf_form_id})/gi, formId );
		var cssSyntax = cssClasses + '{\r\n' + '\t/*' + cssComment + '*/\r\n' + '}';
		if ( ! isExtended) {
			var Syntax   = jQuery( "#arf_form_other_css" ).val();
			var instance = window.ArfliteCodeEditor.codemirror;
		} else {
			var Syntax   = jQuery( "#arf_other_css_expanded_textarea" ).val();
			var instance = window.ArfliteExpandedCodeEditor.codemirror;
		}

		var CmText      = instance.getValue();
		var pregPattern = new RegExp( '^' + cssClasses + '{$', 'im' );
		if (pregPattern.test( CmText )) {
			jQuery( '.arf_custom_css_cloud_wrapper' ).removeClass( 'arfactive' );
			return false;
		}
		if (CmText != '') {
			cssSyntax = CmText + '\r\n' + cssSyntax;
		}
		instance.setValue( cssSyntax );
		setTimeout(
			function() {
				jQuery( '.arf_custom_css_cloud_wrapper' ).removeClass( 'arfactive' );
			},
			300
		);
	}
);

jQuery( document ).on(
	'click',
	'.arf_custom_css_cloud_wrapper',
	function() {
		if ( ! jQuery( '.arf_custom_css_cloud_wrapper' ).hasClass( 'arfactive' )) {
			jQuery( '.arf_custom_css_cloud_wrapper' ).addClass( 'arfactive' );
		} else {
			jQuery( '.arf_custom_css_cloud_wrapper' ).removeClass( 'arfactive' );
		}
	}
);

function load_arflite_custom_css() {
	if (typeof wp != 'undefined' && typeof wp.codeEditor != 'undefined') {
		var editorSettings        = wp.codeEditor.defaultSettings ? _.clone( wp.codeEditor.defaultSettings ) : {};
		editorSettings.codemirror = _.extend(
			{},
			editorSettings.codemirror,
			{
				mode: 'css',
				lint: true
			}
		);
		if (typeof window.ArfliteCodeEditor == 'undefined') {
			if (jQuery( '#arf_form_other_css' ).parent().hasClass( 'arf_form_other_css_wrapper' )) {
				window.ArfliteCodeEditor = wp.codeEditor.initialize( jQuery( '#arf_form_other_css' ), editorSettings );

				var arflite_custom_css = window.ArfliteCodeEditor.codemirror.getValue();

				jQuery( "#arf_other_css_expanded_textarea" ).val( arflite_custom_css );

				window.ArfliteExpandedCodeEditor = wp.codeEditor.initialize( jQuery( "#arf_other_css_expanded_textarea" ), editorSettings );

				window.ArfliteCodeEditor.codemirror.on(
					'change',
					function(e) {
						window.ArfliteExpandedCodeEditor.codemirror.setValue( e.getValue() );
						jQuery( ".arf_form_other_css_wrapper" ).find( '#arf_form_other_css' ).val( e.getValue() );
					}
				);
			}
		} else {
			var arflite_custom_css = window.ArfliteCodeEditor.codemirror.getValue();

			jQuery( "#arf_other_css_expanded_textarea" ).val( arflite_custom_css );

			window.ArfliteExpandedCodeEditor = wp.codeEditor.initialize( jQuery( "#arf_other_css_expanded_textarea" ), editorSettings );
		}
	}
}

jQuery( document ).on(
	'click',
	'.arf_form_element_type_tab_item',
	function(e) {
		var wrapper_id = jQuery( this ).attr( 'data-id' );
		jQuery( '.arf_form_element_type_tab_item,.arf_form_elements_container' ).removeClass( 'active' );
		jQuery( this ).addClass( 'active' );
		jQuery( '.arf_form_elements_container#' + wrapper_id ).addClass( 'active' );
	}
);

jQuery( document ).on(
	'click',
	'.arf_form_custom_css_tab_item',
	function(e) {
		var wrapper_id = jQuery( this ).attr( 'data-id' );
		jQuery( '.arf_form_custom_css_tab_item,.arf_form_custom_css_tab_container' ).removeClass( 'active' );
		jQuery( this ).addClass( 'active' );
		jQuery( '.arf_form_custom_css_tab_container#' + wrapper_id ).addClass( 'active' );
	}
);
jQuery( document ).on(
	'click',
	'.arf_form_accordion_tabs dl dd a',
	function(e) {
		var checkaccordian_active_class = jQuery( this ).parents( 'dl' ).hasClass( 'active' );
		if (checkaccordian_active_class == false) {
			jQuery( ".arf_form_style_tab_container.active" ).find( ".arf_accordion_container.active" ).css( "height", 0 );
			jQuery( '.arf_accordion_container' ).removeClass( 'active' );
			jQuery( '.arf_accordion_container' ).parents( 'dl' ).removeClass( 'active' );
			var href = jQuery( this ).attr( 'data-target' );
			jQuery( this ).parents( 'dl' ).addClass( 'active' );
			jQuery( '.arf_form_accordion_tabs dl.' + href + ' .arf_accordion_container' ).addClass( 'active' );
			var arf_active_styling_tab_height     = jQuery( "#arf_styling_height" ).val();
			var arf_active_styling_content_height = jQuery( "#arf_styling_content_height" ).val();
			arf_active_styling_content_height     = arf_active_styling_content_height - 50;
			jQuery( ".arf_form_style_tab_container.active" ).find( ".arf_accordion_container.active" ).css( "height", arf_active_styling_content_height + "px" );
		}
	}
);
jQuery( document ).on(
	'click',
	'.arf_skin_container',
	function() {
		jQuery( ".arf_color_scheme_loader_div" ).addClass( "active" );
		jQuery( "#arf_color_scheme_loader" ).addClass( "active" );

		var _this_ele = jQuery( this );
		setTimeout(
			function() {
				jQuery( '.arf_skin_container' ).removeClass( 'active_skin' );
				_this_ele.addClass( 'active_skin' );
				jQuery( '#arf_color_skin' ).val( _this_ele.attr( 'data-skin' ) ).trigger( 'change' );
				arflite_change_skin_colors( _this_ele.attr( 'data-skin' ) );
				jQuery( ".arf_color_scheme_loader_div" ).removeClass( "active" );
				jQuery( "#arf_color_scheme_loader" ).removeClass( "active" );
			},
			100
		);
	}
);

function arflite_delete_close_popup() {
	jQuery( '#delete_field_message' ).hide();
	jQuery( '#delete_field_message' ).parent( '.arf_modal_overlay' ).removeClass( 'arfactive' );
	jQuery( '#delete_field_message.arf_popup_container' ).removeClass( 'arfactive' );
}

function arflite_delete_close_popup_field(class_name, id) {
	jQuery( '.delete_field_message_' + id ).show();
	if (jQuery( '#arfmainfieldid_' + id ).find( '.delete_field_message_' + id ).length > 0) {
		jQuery( '#arfmainfieldid_' + id ).find( '.delete_field_message_' + id ).remove();
	}
}

function arflite_delete_close_popup_form(id) {
	jQuery( '.delete_form_message_' + id ).hide();
	if (jQuery( '.arfdeleteform_div_' + id ).next( '.delete_form_message_' + id ).length > 0) {
		jQuery( '.delete_form_message_' + id ).remove();
	}
}

function arflite_delete_close_popup_entry(id) {
	jQuery( '.delete_entry_message_' + id ).hide();
	if (jQuery( '.arfentry_delete_div_' + id ).next( '.delete_entry_message_' + id ).length > 0) {
		jQuery( '.delete_entry_message_' + id ).remove();
	}
}

function arflite_change_skin_colors(skin) {
	var skinColors = arflite_parse_json( Base64.decode( jQuery( "#arflite_skin_json" ).val() ) );
	var skinObject = skinColors.skins[skin];
	if (skin == 'custom') {
		skinObject = arflite_parse_json( jQuery( "#arf_db_json_object" ).attr( 'value' ) );
	}
	var arf_validation_bg_color = '';
	var popup_picker            = document.querySelectorAll( '.arf_custom_color_popup_picker:not(.arf_restricted_control)' );
	var all_popup_picker        = popup_picker.length;
	var arfest                  = document.querySelector( 'input[name="arfest"]:checked' ).value;
	var inputStyle              = document.getElementById( 'arfmainforminputstyle' ).value;
	var update_custom_color     = false;
	if (window.is_update_custom_color == true) {
		update_custom_color           = true;
		window.is_update_custom_color = false;
	}
	var custom_json = skinObject;
	for (var p = 0; p < all_popup_picker; p++) {
		var current_picker = popup_picker[p];
		var skinO          = current_picker.getAttribute( 'data-skin' );
		var check_theme    = current_picker.getAttribute( 'data-checkskin' ) || false;
		if (typeof skinO == 'undefined') {
			continue;
		}
		var splited = skinO.split( '.' );
		var control = splited[0].trim();
		if (check_theme && inputStyle == 'material') {
			control = control + '_' + inputStyle;
		}
		var property = splited[1].trim();
		var color    = skinObject[control][property];

		if (update_custom_color) {
			var n_color = jQuery( '.arf_custom_color_popup_picker[data-skin="' + control + '.' + property + '"]' ).next( 'input' ).val();
			if (typeof n_color == 'undefined') {
				var tmp_control = control.replace( '_material', '' );
				var n_color     = jQuery( '.arf_custom_color_popup_picker[data-skin="' + tmp_control + '.' + property + '"]' ).next( 'input' ).val();
				if (typeof n_color == 'undefined') {
					n_color = color;
				}
			}
			if (typeof custom_json[control] == 'undefined') {
				custom_json[control] = {};
			}
			custom_json[control][property] = n_color;
		}
		color   = color.replace( '#', '' );
		var fid = current_picker.getAttribute( 'data-fid' );

		current_picker.style.backgroundColor = '#' + color;
		jQuery( current_picker ).next( 'input[type="hidden"]' ).val( '#' + color );
		current_picker.setAttribute( 'data-default-color', '#' + color );
		jQuery( current_picker ).parent().find( 'input[type="hidden"]' ).trigger( 'change' );
	}
	if (window.is_reset_base_color == true) {
		window.is_reset_base_color = false;
		jQuery( '.arf_skin_container[data-skin="custom"]' ).css( 'background', jQuery( "#arfmainbasecolor" ).val() );
	}
	document.getElementById( 'arf_color_skin' ).setAttribute( 'data-default-skin', skin );
}
jQuery( document ).on(
	'change',
	'input[name="arfest"]',
	function() {
		var value = jQuery( this ).val();
		if (value == 'normal') {
			jQuery( '#arf_validation_message_style_position' ).css( 'display', 'none' );
			jQuery( '#arf_standard_validation_message_style_position' ).css( 'display', 'flex' );
			jQuery( "#arf_validation_background_color" ).find( 'input + span' ).html( 'Color' );
			jQuery( "#arf_validation_text_color" ).hide();
		} else {
			jQuery( '#arf_standard_validation_message_style_position' ).css( 'display', 'none' );
			jQuery( '#arf_validation_message_style_position' ).css( 'display', 'flex' );
			jQuery( "#arf_validation_background_color" ).find( 'input + span' ).html( 'Background' );
			jQuery( "#arf_validation_text_color" ).show();
		}
	}
);
jQuery( document ).on(
	'click',
	'.arf_custom_color',
	function() {
		jQuery( '.arf_custom_color_popup' ).addClass( 'arf_active' );
		var arf_active_styling_tab_height     = jQuery( "#arf_styling_height" ).val();
		var arf_active_styling_content_height = jQuery( "#arf_styling_content_height" ).val();
		jQuery( '.arf_custom_color_popup' ).css(
			{
				'min-height': arf_active_styling_tab_height + 'px',
				'max-height': arf_active_styling_tab_height + 'px'
			}
		);
		arf_active_styling_tab_height = arf_active_styling_tab_height - 100;
		jQuery( '.arf_custom_color_popup_container' ).css(
			{
				'height': arf_active_styling_tab_height + 'px'
			}
		);
	}
);
jQuery( document ).on(
	'click',
	'.arf_custom_font',
	function() {
		var data_id = jQuery( this ).attr( 'data-id' );
		jQuery( '.arf_custom_font_popup' ).addClass( 'arf_active' );
		var arf_active_styling_tab_height     = jQuery( "#arf_styling_height" ).val();
		var arf_active_styling_content_height = jQuery( "#arf_styling_content_height" ).val();
		jQuery( '.arf_custom_font_popup' ).css(
			{
				'min-height': arf_active_styling_tab_height + 'px',
				'max-height': arf_active_styling_tab_height + 'px'
			}
		);
		arf_active_styling_tab_height = arf_active_styling_tab_height - 100;
		jQuery( '.arf_custom_font_popup_container' ).css(
			{
				'height': arf_active_styling_tab_height + 'px'
			}
		);
		jQuery( '.arf_custom_font_popup_container' ).scrollTop( 0 );
		if (typeof data_id != 'undefined') {
			if (data_id == 'arf_input_font_settings') {
				jQuery( '.arf_custom_font_popup_container' ).scrollTop( jQuery( '#arf_input_font_settings_container' ).position().top - 40 );
			} else if (data_id == 'arf_submit_font_settings') {
				jQuery( '.arf_custom_font_popup_container' ).scrollTop( jQuery( '#arf_submit_font_settings_container' ).position().top - 40 );
			}
		}
	}
);
jQuery( document ).on(
	'click',
	'.arf_custom_font_save_close',
	function() {
		jQuery( '.arf_custom_font_options' ).each(
			function(index, el) {
				var value = jQuery( this ).val();
				jQuery( this ).attr( 'data-default-font', value );
			}
		);
		jQuery( '.arf_custom_font_popup' ).removeClass( 'arf_active' );
	}
);
jQuery( document ).on(
	'change',
	".toggle-btn input[type=radio]",
	function() {
		if (jQuery( this ).attr( "name" )) {
			jQuery( this ).parent().addClass( "success" ).siblings().removeClass( "success" );
		} else {
			jQuery( this ).parent().toggleClass( "success" );
		}
	}
);
jQuery( document ).on(
	'click',
	'.arf_font_style_button',
	function() {
		jQuery( this ).toggleClass( 'active' );
		var data_id    = jQuery( this ).attr( 'data-id' );
		var data_style = jQuery( this ).attr( 'data-style' );
		if (data_style == 'underline') {
			jQuery( '.arf_font_style_button[data-id="' + data_id + '"][data-style="strikethrough"]' ).removeClass( 'active' );
		} else if (data_style == 'strikethrough') {
			jQuery( '.arf_font_style_button[data-id="' + data_id + '"][data-style="underline"]' ).removeClass( 'active' );
		}
		var finalStyles    = '';
		var selectedStyles = jQuery( '.arf_font_style_button[data-id="' + data_id + '"].active' );
		selectedStyles.each(
			function() {
				finalStyles += jQuery( this ).attr( 'data-style' ) + ',';
			}
		);
		finalStyles = finalStyles.replace( /,+$/, '' );
		jQuery( '#' + data_id ).val( finalStyles );
		jQuery( '#' + data_id ).change();
	}
);
jQuery( document ).on(
	'click',
	'.arf_optin_tab_item',
	function() {
		jQuery( '.arf_optin_tab_item,.arf_optin_tab_inner_container' ).removeClass( 'arfactive' );
		jQuery( this ).addClass( 'arfactive' );
		var container_id = jQuery( this ).attr( 'data-id' );
		jQuery( '.arf_optin_tab_inner_container#' + container_id ).addClass( 'arfactive' );
	}
);
jQuery( document ).on(
	'click',
	'#email_marketers',
	function() {
		jQuery( '.arf_modal_overlay' ).removeClass( 'arfactive' );
		jQuery( '.arf_popup_container#arf_optin_model' ).parents( '.arf_modal_overlay' ).addClass( 'arfactive' );
		jQuery( '.arf_popup_container#arf_optin_model' ).addClass( 'arfactive' );
		jQuery('.arf_editor_header_belt').removeClass('arf_editor_header_belt_cls');
		if (-1 == window.loaded_settings.indexOf( 'email_marketers' ) && (true == window.is_add_new_field || true == window.is_updated_field || true == window.is_delete_field)) {
			jQuery( '.arf_popup_container#arf_optin_model' ).find( '.arf_optins_container' ).css( 'overflow', 'hidden' );
			jQuery( '.arf_popup_container#arf_optin_model' ).find( '.arf_popup_container_loader' ).addClass( 'arfactive' );
			setTimeout(
				function() {
					arflite_update_dropdown( '#arf_optin_model .arf_optins_container', 'email_marketers' );
				},
				500
			);
		}
	}
);
jQuery( document ).on(
	'click',
	'.arf_popup_close_button:not(#arf_list_popup_button)',
	function() {
		if (jQuery( this ).attr( 'id' ) == 'arf_css_expanded_model_btn') {

			var arflite_expanded_custom_css = window.ArfliteExpandedCodeEditor.codemirror.getValue();

			window.ArfliteCodeEditor.codemirror.setValue( arflite_expanded_custom_css );

		}
		if (arflite_validate_popup_data(jQuery(this).attr('data-id'))) {
			jQuery('.arf_modal_overlay,.arf_popup_container').removeClass('arfactive');
			jQuery('html').removeClass('arf_hide_body_overflow');
		}
	}
);
jQuery( document ).on(
	'click',
	'#conditional_law',
	function() {
		jQuery( '.arf_modal_overlay' ).removeClass( 'arfactive' );
		jQuery( '.arf_popup_container#arf_conditional_logic_model' ).parents( '.arf_modal_overlay' ).addClass( 'arfactive' );
		jQuery( '.arf_popup_container#arf_conditional_logic_model' ).addClass( 'arfactive' );
		jQuery('.arf_editor_header_belt').removeClass('arf_editor_header_belt_cls');
		if (-1 == window.loaded_settings.indexOf( 'conditional_law' ) && (true == window.is_add_new_field || true == window.is_updated_field || true == window.is_delete_field)) {
			jQuery( '.arf_popup_container#arf_conditional_logic_model' ).find( '.arf_submit_popup_container' ).css( 'overflow', 'hidden' );
			jQuery( '.arf_popup_container#arf_conditional_logic_model' ).find( '.arf_popup_container_loader' ).addClass( 'arfactive' );
			setTimeout(
				function() {
					arflite_update_dropdown( '#arf_conditional_logic_model .arf_submit_popup_container', 'conditional_law' );
				},
				500
			);
		}
	}
);
jQuery( document ).on(
	'click',
	'.arf_check_radio_container_wrapper',
	function() {
		jQuery( '#arf_fontawesome_model' ).parents( '.arf_modal_overlay' ).addClass( 'arfactive' );
		jQuery( '#arf_fontawesome_model' ).addClass( 'arfactive' );
	}
);
jQuery( document ).on(
	'click',
	'.arf_prefix_suffix_container_wrapper',
	function() {
		if (jQuery( this ).hasClass( 'arf_disabled_container' )) {
			return false;
		}
		var data_field = jQuery( this ).attr( 'data-field' );
		var field_id   = jQuery( this ).attr( 'field-id' );
		if (jQuery( this ).hasClass( 'arf_disabled_container' )) {
			return false;
		}
		jQuery( '#arf_fontawesome_model' ).parents( '.arf_modal_overlay' ).addClass( 'arfactive' );
		jQuery( '#arf_fontawesome_model' ).addClass( 'arfactive' );
		jQuery( "#arf_fontawesome_model" ).find( '.arf_fainsideimge' ).attr( 'data-field', data_field );
		jQuery( "#arf_fontawesome_model" ).find( '.arf_fainsideimge' ).attr( 'data-id', field_id );
		jQuery( '.arf_fainsideimge' ).removeClass( 'selected_fontawsome' );
		jQuery( '.arf_fainsideimge' ).children( 'i' ).removeClass( 'selected_fontawesom_icon' );
	}
);

function arflitegetformpreview() {
	var frameSrc          = jQuery( '.arf_top_menu_preview_button' ).attr( 'data-url' );
	var modalheight       = jQuery( window ).height();
	var modalwidth        = jQuery( window ).width();
	var getModalWidth     = Number( modalwidth ) * 0.80;
	var getModalLeftWidth = (Number( modalwidth ) * 0.20) / 2;
	var getModalHeight    = Number( modalheight ) - 100;
	var modalbodyheight   = getModalHeight - 144 + 82;
	var loaderheight      = (modalbodyheight / 2) - 50;
	var loaderleft        = (getModalWidth / 2) - 50;
	jQuery( '#form_previewmodal .iframe_loader' ).attr( "style", 'display:block;' );
	jQuery( '#form_previewmodal' ).removeClass( 'arf_popup_container_tablet' );
	jQuery( '#form_previewmodal' ).removeClass( 'arf_popup_container_mobile' );
	jQuery( '#form_previewmodal' ).attr( 'style', 'width:' + getModalWidth + 'px; height:' + getModalHeight + 'px;overflow:hidden;' );
	jQuery( '#form_previewmodal' ).attr( 'data-modalwidth', getModalWidth );
	jQuery( '#form_previewmodal' ).attr( 'data-modalleft', getModalLeftWidth );
	jQuery( '#form_previewmodal iframe' ).attr( "style", "height:" + (parseInt( getModalHeight ) - 63) + "px;display:block" );
	jQuery('.arf_editor_header_belt').removeClass('arf_editor_header_belt_cls');
	jQuery( '#form_previewmodal' ).find( '.arfhelptip' ).each(
		function() {
			jQuery( this ).tipso( 'destroy' );
			var dataContent = jQuery( this ).attr( 'title' );
			jQuery( this ).tipso(
				{
					position: 'bottom',
					width: 'auto',
					useTitle: false,
					content: dataContent,
					background: '#444444',
					color: '#ffffff',
					tooltipHover: true
				}
			);
		}
	);
	var form_id      = jQuery( "#id" ).val();
	var form         = jQuery( "#frm_main_form" ).serialize();
	var objarray     = [];
	var allfields    = document.querySelectorAll( "#frm_main_form,.arf_custom_color_popup_container,.arf_custom_font_popup" );
	var field_length = allfields.length;
	for (var x = 0; x < field_length; x++) {
		var obj  = allfields[x];
		var json = obj.serializeJSON();
		objarray.push( json );
	}
	var fields        = objarray.reduce(
		function(result, currentObject) {
			for (var key in currentObject) {
				if (currentObject.hasOwnProperty( key )) {
					result[key] = currentObject[key];
				}
			}
			return result;
		},
		{}
	);
	fields['form_id'] = form_id;
	fields['action']  = 'arfliteformsavealloptionsforpreview';
	var jsondata      = jQuery.toJSON( fields );
	jQuery( "#arf_posted_data_for_preview" ).val( jsondata );
	var preview_token = jQuery( "#arflite_validation_nonce" ).val();

	jQuery.ajax(
		{
			url: ajaxurl,
			type: 'POST',
			data: 'action=arflitesavepreviewdata' + '&arfaction=preview&_wpnonce_arflite=' + preview_token + '&filtered_form=' + encodeURIComponent( jsondata ),
			beforeSend:function(){
				jQuery( '#arfsaveformloader' ).show();
			},
			statusCode:{
				400:function(){
					jQuery( document ).trigger( 'heartbeat-tick.wp-auth-check', [ {'wp-auth-check': false} ] );
					setTimeout(
						function(){
							if ( jQuery( 'iframe#wp-auth-check-frame' ).length < 1 ) {
								var src = jQuery( 'div#wp-auth-check-form' ).attr( 'data-src' );
								var win = window.open( src, '', 'width=400,height=500' );
								win.focus();
							}
						},
						100
					);
					jQuery( '#arfsaveformloader' ).hide();
				}
			},
			error:function(){
				jQuery( '#arfsaveformloader' ).hide();
			},
			success: function(response) {

				if ( 'reauth' == response ) {
					jQuery( document ).trigger( 'heartbeat-tick.wp-auth-check', [ {'wp-auth-check': false} ] );
					setTimeout(
						function(){
							if ( jQuery( 'iframe#wp-auth-check-frame' ).length < 1 ) {
								var src = jQuery( 'div#wp-auth-check-form' ).attr( 'data-src' );
								var win = window.open( src, '', 'width=400,height=500' );
								win.focus();
							}
						},
						100
					);
					jQuery( '#arfsaveformloader' ).hide();
					return false;
				} else if ( response.indexOf( '^|^' ) > -1 ) {
					var error_messages = response.split( '^|^' );
					var error_message  = JSON.parse( error_messages );
					jQuery( "#error_message" ).find( '.message_descripiton > div' ).first().html( error_message[0] );
					jQuery( '#arfsaveformloader' ).hide();
					jQuery( '#error_message' ).delay( 500 ).animate( {width: 'toggle'}, 'slow' );
					jQuery( window.opera ? 'html, .arfmodal-body' : 'html, body, .arfmodal-body' ).animate( {scrollTop : jQuery( '#error_message' ).offset().top - 250}, 'slow' );
					jQuery( '#error_message' ).delay( 4000 ).fadeOut( 'slow' );
					jQuery( '.arf_top_menu_save_button' ).attr( 'disabled', false );
				}

				jQuery( '#arfsaveformloader' ).hide();
				jQuery( '#form_previewmodal' ).parent( '.arf_modal_overlay' ).addClass( 'arfactive' );
				jQuery( "#form_previewmodal" ).find( '.arfmodal-body' ).height( getModalHeight );
				jQuery( '.arf_popup_container#form_previewmodal' ).addClass( 'arfactive' );
				jQuery( '#arfcomputer' ).addClass( 'arfactive' );
				jQuery( '#arftablet , #arfmobile' ).removeClass( 'arfactive' );
				var frame_src = frameSrc + '&arf_opt_id=' + response;
				jQuery( '#form_previewmodal iframe' ).attr( "src", frame_src );
				jQuery( '#form_previewmodal iframe' ).on(
					'load',
					function() {
						jQuery( '#form_previewmodal .iframe_loader' ).attr( "style", 'display:none' );

					}
				);
			}
		}
	);
}

jQuery( document ).on(
	'click',
	'.openpreview',
	function() {
		var url               = jQuery( this ).attr( 'data-url' );
		var modalheight       = jQuery( window ).height();
		var modalwidth        = jQuery( window ).width();
		var getModalWidth     = Number( modalwidth ) * 0.80;
		var getModalLeftWidth = (Number( modalwidth ) * 0.20) / 2;
		var getModalHeight    = Number( modalheight ) - 100;
		var modalbodyheight   = getModalHeight - 144 + 82;
		var loaderheight      = (modalbodyheight / 2) - 50;
		var loaderleft        = (getModalWidth / 2) - 50;
		jQuery( '#form_previewmodal .iframe_loader' ).attr( "style", 'display:block;' );
		jQuery( '#form_previewmodal' ).removeClass( 'arf_popup_container_tablet' );
		jQuery( '#form_previewmodal' ).removeClass( 'arf_popup_container_mobile' );
		jQuery( '#form_previewmodal' ).attr( 'style', 'width:' + getModalWidth + 'px; height:' + getModalHeight + 'px;overflow:hidden;' );
		jQuery( '#form_previewmodal' ).attr( 'data-modalwidth', getModalWidth );
		jQuery( '#form_previewmodal' ).attr( 'data-modalleft', getModalLeftWidth );
		jQuery( '#form_previewmodal' ).parent( '.arf_modal_overlay' ).addClass( 'arfactive' );
		jQuery( "#form_previewmodal" ).find( '.arfmodal-body' ).height( getModalHeight );
		jQuery( '.arf_popup_container#form_previewmodal' ).addClass( 'arfactive' );
		jQuery( '#arfcomputer' ).addClass( 'arfactive' );
		jQuery( '#arftablet , #arfmobile' ).removeClass( 'arfactive' );
		jQuery( '#form_previewmodal' ).find( '.arfhelptip' ).each(
			function() {
				jQuery( this ).tipso( 'destroy' );
				var dataContent = jQuery( this ).attr( 'title' );
				jQuery( this ).tipso(
					{
						position: 'bottom',
						width: 'auto',
						useTitle: false,
						content: dataContent,
						background: '#444444',
						color: '#ffffff',
						tooltipHover: true
					}
				);
			}
		);
		jQuery( '#form_previewmodal iframe' ).attr( "style", "height:" + (parseInt( getModalHeight ) - 63) + "px;display:block" );
		var frame_src = url + "&arf_is_home=true";
		jQuery( '#form_previewmodal iframe' ).attr( "src", frame_src );
		jQuery( '#form_previewmodal iframe' ).on(
			'load',
			function() {
				jQuery( '#form_previewmodal .iframe_loader' ).attr( "style", 'display:none' );
			}
		);
	}
);


jQuery( document ).on(
	'click',
	'.arf_popup_header_close_button',
	function(e) {
		jQuery( '.arf_modal_overlay,.arf_popup_container' ).removeClass( 'arfactive' );
		jQuery('.arf_editor_header_belt').addClass('arf_editor_header_belt_cls');
		if ( jQuery( this ).hasClass( 'arf_popup_header_close_button' ) ) {
			var preview_link = jQuery( '#form_previewmodal' ).find( 'iframe' ).attr( 'src' );
			var pattern      = /(.*?)\&arf_opt_id\=(.*)/;
			var opt_id       = preview_link.replace( pattern,'$2' );
			var arflite_wp_nonce = jQuery('#arflite_validation_nonce').val();
			jQuery.ajax(
				{
					url:ajaxurl,
					method:'POST',
					data:'action=arflite_remove_preview_opt&opt_id=' + opt_id + '&_wpnonce_arflite=' + arflite_wp_nonce,
					dataType:'json',
					success:function( response ){

						if(response.security) {
                            jQuery("#error_message").find(".message_descripiton > div").first().html(e.message),
                            jQuery("#error_message").delay(500).animate({ width: "toggle" }, "slow"),
                            jQuery(window.opera ? "html, .arfmodal-body" : "html, body, .arfmodal-body").animate({ scrollTop: jQuery("#error_message").offset().top - 250 }, "slow"),
                            jQuery("#error_message").delay(4e3).fadeOut("slow"),
                            !1
                        } else
                        {
                            jQuery(".arfmodal-body").html("")
                        }
					}
				}
			);
		}
	}
);
jQuery( document ).on(
	'click',
	'.arfmodalclosebutton',
	function(e) {
		var popup_id = jQuery( this ).attr( 'data-id' );
		if (popup_id != undefined && popup_id != null && popup_id != '') {
			if ('arf_popup_list_button' == popup_id) {
				jQuery( '.arf_modal_overlay,.arf_popup_container' ).removeClass( 'arfactive' );
				jQuery('.arf_editor_header_belt').addClass('arf_editor_header_belt_cls');
			} else {
				if (arflite_validate_popup_data( popup_id )) {
					jQuery( '.arf_modal_overlay,.arf_popup_container' ).removeClass( 'arfactive' );
					jQuery('.arf_editor_header_belt').addClass('arf_editor_header_belt_cls');
				}
			}

		}
	}
);

var initial_field_added = 0;

function arflite_submit_action_initial_field_add() {
	if (initial_field_added == 0) {
		if (jQuery( ".sortable_inner_wrapper" ).length > 0) {
			var arf_set_url_fields_arr = [];
			if (jQuery( ".arf_set_url_fields" ).length > 0) {
				jQuery( ".arf_set_url_fields" ).each(
					function() {
						var url_fields_input = jQuery( this ).find( "input[type='text']" ).attr( 'id' );
						if ('' != url_fields_input && undefined != url_fields_input) {
							var url_field_id = url_fields_input.replace( "arf_field_key_name_", "" );
							arf_set_url_fields_arr.push( url_field_id );
						}
					}
				);
			}
			var exclude_arr = ['captcha', 'html', 'confirm_email'];
			jQuery( ".arfformfield" ).each(
				function() {
					var json_data = jQuery( this ).find( ".arf_field_data_hidden" ).val();
					var field_id  = jQuery( this ).find( ".arf_field_data_hidden" ).attr( "id" );

					if (undefined != field_id && field_id.indexOf( "arf_field_data_" ) >= 0) {
						field_id       = field_id.replace( "arf_field_data_", "" );
						json_data      = JSON.parse( json_data );
						var field_name = json_data.name;
						var field_type = json_data.type;

						if (arf_set_url_fields_arr.indexOf( field_id ) < 0 && exclude_arr.indexOf( field_type ) < 0) {
							if (jQuery( '#arf_field_key_nm_' + field_id ).length > 0) {
								jQuery( '#redirect_field_list_' + field_id ).text( field_name );
								jQuery( '#arf_field_key_nm_' + field_id ).val( 'item_meta_' + field_id );
							} else {
								jQuery( '.arf_field_list_name' ).append( '<div class="arf_set_url_fields"><div class="arf_url_field_list"><label id="redirect_field_list_' + field_id + '" class="arf_selectbox_option">' + field_name + '</label></div><div class="arf_url_field_list" ><input type="text" name="options[arf_data_with_url_data][' + field_id + ']" id="arf_field_key_name_' + field_id + '" value="item_meta_' + field_id + '"></div></div>' );
							}
						}
					}
				}
			);
			initial_field_added = 1;
		}
	}
}

jQuery( document ).on(
	'click',
	'#submit_action',
	function() {

		arflite_submit_action_initial_field_add();
		jQuery( '.arf_modal_overlay' ).removeClass( 'arfactive' );
		jQuery( '.arf_popup_container#arf_submit_action_model' ).parents( '.arf_modal_overlay' ).addClass( 'arfactive' );
		jQuery( '.arf_popup_container#arf_submit_action_model' ).addClass( 'arfactive' );
		jQuery('.arf_editor_header_belt').removeClass('arf_editor_header_belt_cls');
		if (-1 == window.loaded_settings.indexOf( 'submit_action' ) && (true == window.is_add_new_field || true == window.is_updated_field || true == window.is_delete_field)) {
			jQuery( '.arf_popup_container#arf_submit_action_model' ).find( '.arf_submit_action_container' ).css( 'overflow', 'hidden' );
			jQuery( '.arf_popup_container#arf_submit_action_model' ).find( '.arf_popup_container_loader' ).addClass( 'arfactive' );
			setTimeout(
				function() {
					arflite_update_dropdown( '#arf_submit_action_model .arf_submit_action_container', 'submit_action' );
				},
				500
			);
		}
	}
);
jQuery( document ).on(
	'click',
	'#mail_notification',
	function() {
		jQuery( '.arf_modal_overlay' ).removeClass( 'arfactive' );
		jQuery( '.arf_popup_container#arf_mail_notification_model' ).parents( '.arf_modal_overlay' ).addClass( 'arfactive' );
		jQuery( '.arf_popup_container#arf_mail_notification_model' ).addClass( 'arfactive' );
		jQuery('.arf_editor_header_belt').removeClass('arf_editor_header_belt_cls');

		if (-1 == window.loaded_settings.indexOf( 'mail_notification' ) && (true == window.is_add_new_field || true == window.is_updated_field || true == window.is_delete_field)) {
			jQuery( '.arf_popup_container#arf_mail_notification_model' ).find( '.arf_mail_notification_container' ).css( 'overflow', 'hidden' );
			jQuery( '.arf_popup_container#arf_mail_notification_model' ).find( '.arf_popup_container_loader' ).addClass( 'arfactive' );
			setTimeout(
				function() {
					arflite_update_dropdown( '#arf_mail_notification_model .arf_mail_notification_container', 'mail_notification' );
				},
				500
			);
		}
	}
);

function arflite_update_dropdown(section, id) {
	if ('' == id) {
		return true;
	}

	if (window.added_new_fields.length > 0) {
		var added_new_fields   = window.added_new_fields;
		var total_added_fields = added_new_fields.length;
		for (var i = 0; i < total_added_fields; i++) {
			var current_field_data = added_new_fields[i];
			var field_id           = current_field_data.field_id;
			var field_obj          = jQuery( "#arf_field_" + field_id );

			if (field_obj.length > 0) {
				var field_type = current_field_data.field_type;
				var field_name = current_field_data.field_name;
				window.loaded_settings.push( id );
				arflite_update_name_dropdown_section( section, 'add', field_id, field_type, field_name, id );
			}
		}
	}
	if (window.updated_fields.length > 0) {
		var updated_fields       = window.updated_fields;
		var total_updated_fields = updated_fields.length;
		for (var u = 0; u < total_updated_fields; u++) {
			var current_field_data = updated_fields[u];
			var field_id           = current_field_data.field_id;
			var field_obj          = jQuery( "#arf_field_" + field_id );

			if (field_obj.length > 0) {
				var field_type = current_field_data.field_type;
				var field_name = current_field_data.field_name;
				window.loaded_settings.push( id );
				arflite_update_name_dropdown_section( section, 'update', field_id, field_type, field_name, id );
			}
		}
	}

	if (window.deleted_fields.length > 0) {
		var deleted_fields       = window.deleted_fields;
		var total_deleted_fields = deleted_fields.length;
		for (var d = 0; d < total_deleted_fields; d++) {
			var current_field_data = deleted_fields[d];
			var field_id           = current_field_data.field_id;
			var field_type         = current_field_data.field_type;
			var field_name         = current_field_data.field_name;
			window.loaded_settings.push( id );
			arflite_update_name_dropdown_section( section, 'delete', field_id, field_type, field_name, id );
		}
	}

}

jQuery( document ).on(
	'focusout',
	'.arfeditorfieldopt_label .arf_edit_in_place_input',
	function() {
		setTimeout(
			function() {
				arflite_update_dropdown( '#arf_mail_notification_model .arf_mail_notification_container', 'mail_notification' );
				arflite_update_dropdown( '#arf_submit_action_model .arf_submit_action_container', 'submit_action' );
				arflite_update_dropdown( '#arf_optin_model .arf_optins_container', 'email_marketers' );
			},
			500
		);
	}
);

function arfliteshowfieldoptions(field_id, field_type) {
	var db_field_order = document.getElementById( 'arf_field_order' ).getAttribute( 'data-db-field-order' );

	var is_field_saved = false;

	arf_open_respective_style_option('',field_type);

	if (db_field_order != '' && db_field_order != null) {
		db_field_order      = JSON.parse( db_field_order );
		var db_saved_fields = Object.keys( db_field_order );
		var string_field_id = String( field_id );

		if (db_saved_fields.indexOf( string_field_id ) > -1) {
			is_field_saved = true;
		}
	}

	if ( 'date' == field_type ) {
		var value       = jQuery( '#frm_date_format' ).val();
		var prev_format = jQuery( "input#frm_date_format" ).attr( 'data-prev-value' );
		if (value == '' || typeof value == 'undefined') {
			value = 'MM/DD/YYYY';
		}
		var setdefdate = moment().format( value );
		jQuery( '.arf_field_option_model_container' ).find( '#arf_date_field_set_def_date' ).text( 'Set Date e.g. ' + setdefdate );
	}

	jQuery( '#arfmainfieldid_' + field_id ).find( '.inplace_field' ).blur();
	var field_options = arflite_retrieve_field_data( field_id, 'field_options' );

	var inputStyle        = jQuery( "#arfmainforminputstyle" ).val();
	var field_default_val = arflite_retrieve_field_data( field_id );

	var opt_cloned = jQuery( 'div#arfmainfieldid_' + field_id ).find( '.arf_field_option_model_cloned' );
	jQuery( 'div#arfmainfieldid_' + field_id ).parent().css( 'z-index', '99991' );

	var field_labels     = JSON.parse( __ARF_FIELD_TYPE_LABELS );
	var curr_field_label = field_labels[field_type];

	opt_cloned.addClass( 'arfactive' );
	if (is_field_saved) {
		var header_text = opt_cloned.find( '.arf_pre_populated_field_id' ).text();
		header_text     = header_text.replace( '[arf_field_id]', field_id );
		opt_cloned.find( '.arf_pre_populated_field_id' ).text( header_text );
		opt_cloned.find( '.arf_pre_populated_field_id' ).addClass( 'active' );

		var header_id_text = opt_cloned.find( '.arf_pre_populated_field_type' ).text();
		header_id_text     = header_id_text.replace( '[arf_field_type]', curr_field_label );
		opt_cloned.find( '.arf_pre_populated_field_type' ).text( header_id_text );
		opt_cloned.find( '.arf_pre_populated_field_type' ).addClass( 'active' );
	} else {
		opt_cloned.find( '.arf_pre_populated_field_type' ).remove();
		var header_id_text = '&nbsp;<span class="arf_pre_populated_field_type active">[Field Type: ' + curr_field_label + ']</span>';
		opt_cloned.find( '.arf_field_option_model_header' ).append( header_id_text );
	}

	var actual_model = jQuery( '#arf_field_option_model_skeleton' );
	var newOptions   = [];
	var n            = 0;
	var keys         = Object.keys( field_options );
	var it           = keys.length;
	while (it) {
		newOptions[n] = keys[it - 1];
		n++;
		--it;
	}
	arflite_initialize_field_option( actual_model, newOptions, opt_cloned, field_id, field_default_val );

	opt_cloned.find( '.arf_popup_tooltip_main' ).tipso( 'destroy' );
	var regex_title = opt_cloned.find( '.arf_popup_tooltip_main' ).attr( 'data-title' );
	opt_cloned.find( '.arf_popup_tooltip_main' ).tipso(
		{
			position: 'top',
			width: 'auto',
			useTitle: true,
			content: regex_title,
			background: '#000000',
			color: '#ffffff',
			tooltipHover: true
		}
	);
	if (field_type == 'html') {
		var fields_list_addtotal = '';
		jQuery( 'div.sortable_inner_wrapper,div.arf_hidden_field_input_container' ).each(
			function(j) {
				var hidden = false;
				if (jQuery( this ).hasClass( 'arf_hidden_field_input_container' )) {
					hidden = true;
				}
				if ((jQuery( this ).is( ':visible' ) && jQuery( this ).find( '.arfformfield:not(.arf_confirm_field)' ).length == 1) || hidden == true) {
					if (hidden) {
						var id = jQuery( this ).find( '.arf_hidden_field_label_input' ).attr( 'data-field-id' );
					} else {
						var id = jQuery( this ).attr( 'id' );
						id     = id.replace( 'arfmainfieldid_', '' );
					}
					var f_id     = id;
					var new_name = arflite_retrieve_field_data( id );
					var name     = new_name.name;

					var type = new_name.type;
					if (name === '' || name === null || name === undefined) {
						name = jQuery( '#field_' + id ).text();
						setTimeout(
							function() {
								name = jQuery( '#field_' + id ).text();
							},
							1000
						);
					}

					name = arflite_strip_tags( name );
					name = name.trim();
					if ('' == name) {
						name = '[Field Id:' + id + ']';
					}
					if (type != 'captcha' && type != 'html') {
						if (type == "checkbox") {
							var options      = new_name.options;
							var separate_val = new_name.separate_value;
							if ('' == name) {
								name = '[Field Id:' + field_id + ']';
							}
							fields_list_addtotal += '<div class="modal_field_val_bold" id="arfmodalfieldval_' + id + '" onclick="return false">' + name.substring( 0, 40 ) + '</div>';
							if (separate_val == 'true' || separate_val == '1') {
								jQuery.each(
									options,
									function(index, el) {
										var label           = el.label;
										var lable_sbustring = (label != '') ? label.substring( 0, 40 ) : '';
										if ('' == label) {
											label = '[Field Id:' + id + '_' + index + ']';
										}
										fields_list_addtotal += '<div class="modal_field_val" id="arfmodalfieldval_' + id + '_' + index + '" onclick="arfliteaddtotalfield(this,\'' + id + '\',\'' + index + '\')">&nbsp;&nbsp;&nbsp;&nbsp;' + lable_sbustring + '</div>';
									}
								);
							} else {
								jQuery.each(
									options,
									function(index, el) {
										var key             = index;
										var label           = el.label || el;
										var lable_sbustring = (label != '') ? label.substring( 0, 40 ) : '';
										if ('' == lable_sbustring) {
											lable_sbustring = '[Field Id:' + id + '_' + index + ']';
										}
										fields_list_addtotal += '<div class="modal_field_val" id="arfmodalfieldval_' + id + '_' + key + '" onclick="arfliteaddtotalfield(this,\'' + id + '\',\'' + key + '\')">&nbsp;&nbsp;&nbsp;&nbsp;' + lable_sbustring + '</div>';
									}
								);
							}
						} else {
							if (type == 'arfslider') {
								var slider_custom_class = '';
								var arf_range_selector  = new_name.arf_range_selector;
								if (arf_range_selector == 1) {
									slider_custom_class = ' arf_slider_li arf_hidden_slider_li';
								} else {
									slider_custom_class = ' arf_slider_li arf_show_slider_li';
								}
								fields_list_addtotal += '<div class="modal_field_val ' + slider_custom_class + '" id="arfmodalfieldval_' + f_id + '" onclick="arfliteaddtotalfield(this,\'' + f_id + '\',\'\')">' + name.substring( 0, 40 ) + '</div>';
							} else {
								fields_list_addtotal += '<div class="modal_field_val" id="arfmodalfieldval_' + f_id + '" onclick="arfliteaddtotalfield(this,\'' + f_id + '\',\'\')">' + name.substring( 0, 40 ) + '</div>';
							}
						}
					}
				}
			}
		);
		jQuery( "#add_field_total_" + field_id ).find( ".arfmodal-body_p" ).html( fields_list_addtotal );
	} else if (field_type == 'arfslider') {
		var arf_range_selector = field_default_val.arf_range_selector;
		if (arf_range_selector == 1) {
			jQuery( ".arf_field_option_model_cloned[data-field_id='" + field_id + "']" ).find( '#slider_value_' + field_id ).attr( 'disabled', 'disabled' );
			jQuery( ".arf_field_option_model_cloned[data-field_id='" + field_id + "']" ).find( '#arf_range_minnum_' + field_id ).removeAttr( 'disabled' );
			jQuery( ".arf_field_option_model_cloned[data-field_id='" + field_id + "']" ).find( '#arf_range_maxnum_' + field_id ).removeAttr( 'disabled' );
		} else {
			jQuery( ".arf_field_option_model_cloned[data-field_id='" + field_id + "']" ).find( '#slider_value_' + field_id ).removeAttr( 'disabled' );
			jQuery( ".arf_field_option_model_cloned[data-field_id='" + field_id + "']" ).find( '#arf_range_minnum_' + field_id ).attr( 'disabled', 'disabled' );
			jQuery( ".arf_field_option_model_cloned[data-field_id='" + field_id + "']" ).find( '#arf_range_maxnum_' + field_id ).attr( 'disabled', 'disabled' );
		}
	}
}

function arflite_initialize_field_option(actual_model, newOptions, opt_cloned, field_id, field_default_val) {
	var i              = 1;
	var sorted_options = '';
	opt_cloned.attr( 'data-field_id', field_id );
	actual_model.find( '.arf_field_option_content_cell' ).attr( 'data-sort', '-1' );
	var upload_url = jQuery( '#arfuploadurl' ).val();
	var it         = newOptions.length;
	while (it) {
		if (actual_model.find( '.arf_field_option_content_cell#' + newOptions[it - 1] ).length > 0) {
			actual_model.find( '.arf_field_option_content_cell#' + newOptions[it - 1] ).attr( 'data-sort', i );
			i++;
		}
		--it;
	}
	sorted_options = actual_model.find( '.arf_field_option_content_cell[data-sort!="-1"]' ).sort(
		function(a, b) {
			var l = jQuery( a ).attr( 'data-sort' );
			var r = jQuery( b ).attr( 'data-sort' );
			l     = parseInt( l );
			r     = parseInt( r );
			return (l < r) ? -1 : (l > r) ? 1 : 0;
		}
	);

	var string_tags = '';
	jQuery( sorted_options ).each(
		function() {
			string_tags += jQuery( this ).prop( 'outerHTML' );
		}
	);
	var field_type      = field_default_val.type;
	string_tags         = string_tags.replace( /\{arf_field_id\}/gi, field_id );
	string_tags         = string_tags.replace( /(-10000)/gi, field_id );
	string_tags         = string_tags.replace( /\{arf_field_type\}/gi, field_type );
	var item_meta_input = jQuery( "div#arfmainfieldid_" + field_id ).find( 'input[name="item_meta[' + field_id + ']"]' );
	if (item_meta_input.length > 0) {
		var item_meta_id = item_meta_input.attr( 'id' );
		var field_key    = item_meta_id.replace( /field_(.*)/gi, '$1' );
		string_tags      = string_tags.replace( /\{arf_field_key\}/gi, field_key );
	}

	jQuery( '.arf_field_option_content_loader' ).remove();
	opt_cloned.find( '.arf_field_option_content_row' ).html( string_tags );
	var input_length  = opt_cloned[0].getElementsByTagName( 'input' ).length;
	var exclude_names = ["enable_arf_prefix", "enable_arf_suffix"];
	for (var i = 0; i < input_length; i++) {
		var $this          = opt_cloned[0].getElementsByTagName( 'input' )[i];
		var $name          = $this.getAttribute( 'name' );
		var $thisid        = $this.getAttribute( 'id' );
		var $this_name     = field_default_val[$this.getAttribute( 'name' )];
		var field_type_ext = $this.getAttribute( 'type' );

		if (field_type_ext == 'text') {
			if (document.getElementById( 'arf_slider_' + field_id ) != null) {
				if ($name == 'minimum') {
					$this_name = document.getElementById( 'arf_slider_' + field_id ).getAttribute( 'data-slider-min' );
				} else if ($name == 'maximum') {
					$this_name = document.getElementById( 'arf_slider_' + field_id ).getAttribute( 'data-slider-max' );
				} else if ($name == 'slider_step') {
					$this_name = document.getElementById( 'arf_slider_' + field_id ).getAttribute( 'data-slider-step' );
				}
			}

			if ($name == 'search_no_results_text' && typeof $this_name === 'undefined') {
				$this_name = 'No results found';
			}

			if ($name == 'single_custom_validation') {
				var container = opt_cloned[0].querySelector( 'dl[data-name="' + $name + '"]' );
				if (container == null) {
					continue;
				}
				if (typeof $this_name != 'undefined' && $this_name != '' && container.querySelector( 'li[data-value="' + $this_name + '"]' ) != null) {
					var $input     = container.previousSibling;
					var $this_name = container.querySelector( 'li[data-value="' + $this_name + '"]' ).getAttribute( 'data-value' );
					var $label     = container.querySelector( 'li[data-value="' + $this_name + '"]' ).getAttribute( 'data-label' );
				} else {
					var $input     = container.previousSibling;
					var $this_name = container.getElementsByTagName( 'li' )[0].getAttribute( 'data-value' );
					var $label     = container.getElementsByTagName( 'li' )[0].getAttribute( 'data-label' );
				}

				container.getElementsByTagName( 'span' )[0].innerHTML = $label;
				if ($input.getAttribute( 'onchange' ) != null) {
					arfliteShowvalidationmessage( field_id );
				}
			}

			if ( jQuery( $this ).hasClass( 'arf-selectpicker-input-control' ) ) {
				jQuery( '.arf_field_option_model.arfactive dl[data-name="' + $name + '"]' ).addClass( 'open' );
				jQuery( '.arf_field_option_model.arfactive dl[data-name="' + $name + '"]' ).find( 'ul li[data-value="' + $this_name + '"]' ).trigger( 'click' );
			}

			$this.setAttribute( 'value', $this_name );
			jQuery($this).val($this_name);
			arflitefireEvent( $this, 'change' );
		} else if (field_type_ext == 'hidden') {
			$this.setAttribute( 'value', $this_name );
			if ($name == 'enable_arf_prefix') {
				$this.setAttribute( 'value', $this_name );
				arflitefireEvent( $this, 'change' );
			} else if ($name == 'enable_arf_suffix') {
				$this.setAttribute( 'value', $this_name );
				arflitefireEvent( $this, 'change' );
			} else if ($name == 'arf_prefix_icon') {
				if (document.getElementById( 'enable_arf_prefix_' + field_id ).getAttribute( 'value' ) == 1) {
					document.getElementById( 'arf_select_prefix_' + field_id ).innerHTML = "<i class='" + $this_name + "'></i>";
				}
			} else if ($name == 'arf_suffix_icon') {
				if (document.getElementById( 'enable_arf_suffix_' + field_id ).getAttribute( 'value' ) == 1) {
					document.getElementById( 'arf_select_suffix_' + field_id ).innerHTML = "<i class='" + $this_name + "'></i>";
				}
			} else if ($name == 'off_days') {
				var off_days = $this_name.split( ',' );
				for (var od = 0; od < off_days.length; od++) {
					arfliteaddClass( opt_cloned[0].querySelector( '.arf_date_days_btn[day_val="' + off_days[od] + '"]' ), 'arf_select' );
				}
			} else if ($name == 'currentdefaultdate') {
				if ($this.getAttribute( 'value' ) == 1) {
					arfliteaddClass( document.getElementsByClassName( 'select_current_default_date_' + field_id )[0], 'arf_select' );
					document.getElementById( 'set_current_date_field_' + field_id ).setAttribute( 'readonly', 'readonly' );
				} else {
					arfliteremoveClass( document.getElementsByClassName( 'select_current_default_date_' + field_id )[0], 'arf_select' );
					document.getElementById( 'set_current_date_field_' + field_id ).removeAttribute( 'readonly' );
				}
			} else {
				var container = opt_cloned[0].querySelector( 'dl[data-name="' + $name + '"]' );
				if (container == null) {
					continue;
				}
				if (typeof $this_name != 'undefined' && $this_name != '' && container.querySelector( 'li[data-value="' + $this_name + '"]' ) != null) {
					var $input = container.previousSibling;
					var $value = container.querySelector( 'li[data-value="' + $this_name + '"]' ).getAttribute( 'data-value' );
					var $label = container.querySelector( 'li[data-value="' + $this_name + '"]' ).getAttribute( 'data-label' );
				} else {
					var $input = container.previousSibling;
					var $value = container.getElementsByTagName( 'li' )[0].getAttribute( 'data-value' );
					var $label = container.getElementsByTagName( 'li' )[0].getAttribute( 'data-label' );
				}
				$input.previousSibling.setAttribute( 'value', $value );
				container.getElementsByTagName( 'span' )[0].innerHTML = $label;
				if ($input.previousSibling.getAttribute( 'onchange' ) != null && $name == 'single_custom_validation') {
					arfliteShowvalidationmessage( field_id );
				}
			}
		} else if (field_type_ext == 'radio') {
			if ($this.getAttribute( 'value' ) == $this_name) {
				$this.setAttribute( 'checked', 'checked' );
			} else {
				$this.removeAttribute( 'checked' );
			}
			if ($name == 'restrict') {
				if ($this_name == 1) {
					document.getElementById( 'restrict_box_' + field_id ).style.display = 'block';
				} else {
					document.getElementById( 'restrict_box_' + field_id ).style.display = 'none';
				}
			}
			arflitefireEvent( $this, 'change' );
		} else if (field_type_ext == 'checkbox') {

			if ($name == 'ishidetitle') {
				var $field_id  = $thisid.replace( "ishidetitle_", "" );
				var field_json = jQuery( "#arf_field_data_" + $field_id ).val();
				var field_opt  = JSON.parse( field_json );

				if (field_opt.ishidetitle == 0 || field_opt.ishidetitle == "") {
					jQuery( "#ishidetitle_" + $field_id ).prop( "checked",false );
					jQuery( "#ishidetitle_" + $field_id ).val( "0" );
				} else {
					jQuery( "#ishidetitle_" + $field_id ).prop( "checked", true );
					jQuery( "#ishidetitle_" + $field_id ).val( "1" );
				}
			} else if ($name == 'country_validation') {
				var $field_id  = $thisid.replace( "country_validation_", "" );
				var field_json = jQuery( "#arf_field_data_" + $field_id ).val();
				var field_opt  = JSON.parse( field_json );
				if (field_opt.country_validation == 0 || field_opt.country_validation == "") {
					jQuery( "#country_validation_" + $field_id ).prop( "checked",false );
				} else {
					jQuery( "#country_validation_" + $field_id ).prop( "checked", true );
				}
			} else if ($name == 'phonetype') {
				var $field_id  = $thisid.replace( "phonetype_", "" );
				var field_json = jQuery( "#arf_field_data_" + $field_id ).val();
				var field_opt  = JSON.parse( field_json );
				if (field_opt.phonetype == 0) {
					jQuery( '#phoneformate_box_' + $field_id ).css( 'display', 'none' );
					jQuery( '.phoneformate_box_' + $field_id ).css( 'display', 'none' );
					jQuery( "#phonetype_" + $field_id ).prop( "checked",false );
					jQuery( '#country_validation_' + $field_id ).prop( 'checked',false );
					jQuery( '.arf_field_option_content_cell#country_validation' ).hide();
				} else {
					jQuery( "#phone_validation" ).css( "display", "none" );
					jQuery( '#phoneformate_box_' + $field_id ).css( 'display', 'block' );
					jQuery( '.phoneformate_box_' + $field_id ).css( 'display', 'block' );
					jQuery( "#phonetype_" + $field_id ).prop( "checked", true );
					jQuery( '#country_validation_' + $field_id ).prop( 'checked', true );
					jQuery( '.arf_field_option_content_cell#country_validation' ).show();
					var phtype_len = field_opt.phtypes.length;
					jQuery.each(
						field_opt.phtypes,
						function(key, value) {
							if (value == 0) {
								jQuery( '.' + key + $field_id ).prop( "checked",false );
							} else {
								jQuery( '.' + key + $field_id ).prop( "checked",true );
							}
						}
					);
				}
			} else if ($name == 'required') {
				if ($this_name == 1) {
					document.getElementById( 'frm_req_field_' + field_id ).setAttribute( 'checked', 'checked' );
				} else {
					document.getElementById( 'frm_req_field_' + field_id ).removeAttribute( 'checked' );
				}
			} else if ($name == 'enable_total') {
				if ($this_name == $this.getAttribute( 'value' )) {
					document.getElementById( 'arfenable_total_' + field_id ).setAttribute( 'checked', 'checked' );
					document.getElementsByClassName( 'arf_field_list_total_' + field_id )[0].style.display = 'block';
					document.getElementsByClassName( 'arf_field_list_total_' + field_id )[1].style.display = 'block';
					document.getElementsByClassName( 'arf_field_list_total_' + field_id )[2].style.display = 'block';
				}
			} else if ($name == 'round_total') {
				if ($this_name == $this.getAttribute( 'value' )) {
					document.getElementById( 'arfround_total_' + field_id ).setAttribute( 'checked', 'checked' );
				}
			} else if ($name == 'arf_enable_readonly') {
				if ($this_name == $this.getAttribute( 'value' )) {
					if ($this_name == 1) {
						document.getElementById( 'arf_enable_readonly_' + field_id ).setAttribute( 'checked', 'checked' );
					} else {
						document.getElementById( 'arf_enable_readonly_' + field_id ).removeAttribute( 'checked' );
					}
				}

			} else {
				if ($this_name == $this.getAttribute( 'value' )) {
					if (arflitehasClass( $this, 'js-switch' )) {
						document.getElementsByClassName( $name + '_' + field_id )[0].setAttribute( 'checked', 'checked' );
						if ($name == 'arf_show_max_current_date') {
							arflitemaxcurrentdatefieldfunction( field_id, 0, 2 );
						} else if ($name == 'arf_show_min_current_date') {
							arflitemincurrentdatefieldfunction( field_id, 0, 2 );
						} else if ($name == 'show_time_calendar') {
							if ($this_name == 1) {
								document.getElementById( 'clocksetting' ).style.display = 'block';
							} else {
								document.getElementById( 'clocksetting' ).style.display = 'none';
							}
						} else if ($name == 'enable_search') {
							jQuery('.arf_field_option_content_cell#search_no_results_text').show();
						}
					}
				} else {
					if (arflitehasClass( $this, 'js-switch' )) {
						document.getElementsByClassName( $name + '_' + field_id )[0].removeAttribute( 'checked' );
						if ($name == 'arf_show_max_current_date') {
							arflitemaxcurrentdatefieldfunction( field_id, '', 2 );
						} else if ($name == 'arf_show_min_current_date') {
							arflitemincurrentdatefieldfunction( field_id, '', 2 );
						} else if ($name == 'show_time_calendar') {
							if ($this_name == 1) {
								document.getElementById( 'clocksetting' ).style.display = 'block';
							} else {
								document.getElementById( 'clocksetting' ).style.display = 'none';
							}
						} else if ($name == 'confirm_email') {
							document.getElementById('confirm_email_label_' + field_id).setAttribute('disabled', 'disabled');
							document.getElementById('invalid_confirm_email_' + field_id).setAttribute('disabled', 'disabled');
							document.getElementById('confirm_email_placeholder_' + field_id).setAttribute('disabled', 'disabled');
						} else if ($name == 'enable_search') {
							jQuery('.arf_field_option_content_cell#search_no_results_text').hide();
						}
					} else if (arflitehasClass( $this, 'phone_type_checkbox' )) {
						if (field_default_val['phtypes'][$name] != 0) {
							opt_cloned[0].querySelector( 'input[name ="' + $name + '"]' ).setAttribute( 'checked', 'checked' );
						} else {
							opt_cloned[0].querySelector( 'input[name ="' + $name + '"]' ).removeAttribute( 'checked' );
						}
					}
				}
			}
		}
	}
	var textarea_length = opt_cloned[0].getElementsByTagName( 'textarea' ).length;
	for (var i = 0; i < textarea_length; i++) {
		var $this   = opt_cloned[0].getElementsByTagName( 'textarea' )[i];
		var $thisid = $this.getAttribute( 'id' );
		if (typeof $thisid != 'undefined') {
			var $name      = $this.getAttribute( 'name' );
			var $this_name = field_default_val[$this.getAttribute( 'name' )];
			if (typeof $name != 'undefined') {
				$this.value = $this_name;
			}
		}
	}
}

jQuery(document).on('change', 'input[name="enable_search"]', function () {
	var $noResultsField = jQuery('.arf_field_option_model.arfactive .arf_field_option_content_cell#search_no_results_text');
	if (jQuery(this).is(':checked')) {
		$noResultsField.show();
	} else {
		$noResultsField.hide();
	}
});

function arflite_initialize_colorpicker(el) {
	var object        = {};
	var jscolorattr   = el.getAttribute( 'data-jscolor' );
	var object        = JSON.parse( jscolorattr );
	__JSPICKER_NEWROW = new jscolor( el, object );
	if (typeof __JSPICKER === 'undefined') {
		__JSPICKER = __JSPICKER_NEWROW;
	} else {
		__JSPICKER = __JSPICKER.concat( __JSPICKER_NEWROW );
	}
}

jQuery( document ).on(
	'click',
	'.arf_field_option_submit_button',
	function() {
		var model      = document.querySelector( '.arf_field_option_model_cloned.arfactive' );
		var field_id   = this.getAttribute( 'data-field_id' );
		var classes    = document.getElementById( 'arfmainfieldid_' + field_id ).className;
		var field_data = arflite_retrieve_field_data( field_id );

		var this_field_req        = field_data.required;
		var object                = document.getElementById( 'arfrequiredfieldtext' + field_id );
		var arfmainforminputstyle = document.getElementById( 'arfmainforminputstyle' );
		if (object == null) {
			var blnk_msg = '';
		} else {
			var blnk_msg = object.value;
		}
		var validation_msg    = __ARF_BLANKMSG;
		var validationchk_msg = __ARF_BLANKMSG_CHK;
		if (object != null && this_field_req == '1' && blnk_msg.trim() == '') {
			var inputstyle = object.getAttribute( 'style' );
			if (inputstyle == undefined) {
				object.setAttribute( 'style', 'border-color:#fd4343 !important;' );
			} else {
				object.setAttribute( 'style', inputstyle + ';border-color: #fd4343 !important;' );
			}
			object.focus();
			var next = arfliteNextClosest( object, 'div.field_opt_msg' );
			if (next != null) {
				next.parentNode.removeChild( next );
			}
			var d         = document.createElement( 'div' );
			d.className   = "field_opt_msg";
			d.style.clear = "both";
			d.style.color = "#fd4343";
			var i         = document.createElement( 'i' );
			i.appendChild( document.createTextNode( validation_msg ) );
			d.appendChild( i );
			arfliteInsertAfter( d, object );
			jQuery( 'body' ).on(
				'keypress',
				'#arfrequiredfieldtext' + field_id,
				function() {
					var inputstyle = jQuery( '#arfrequiredfieldtext' + field_id ).attr( 'style' );
					inputstyle     = inputstyle.replace( /(border-color\:(.*?)\;)/gi, '' );
					jQuery( '#arfrequiredfieldtext' + field_id ).attr( 'style', inputstyle );
					jQuery( '#arfrequiredfieldtext' + field_id ).next( 'div' ).remove();
				}
			);
			return false;
		}
		var field_type = field_data.type;

		if (field_type == 'number') {
			var num_min_fild_val = document.getElementById( 'arf_minnum_' + field_id ).value;
			var num_max_fild_val = document.getElementById( 'arf_maxnum_' + field_id ).value;
			if (parseInt( num_min_fild_val ) >= parseInt( num_max_fild_val ) ) {
				document.getElementById( "arflite_number_field_option_error_note" ).innerHTML = 'Minimum option should not be greater than Maximum Option';
				var arf_field_option_error_note = document.getElementById( "arflite_number_field_option_error_note" );
				arf_field_option_error_note.classList.add( 'arflite-field-err-active' );
				return false;
			}
		}

		if (field_type == 'text' || field_type == 'textarea' || field_type == 'number') {
			var invalid_length_msg = document.getElementById( 'arf_min_length_message_' + field_id );

			var min_fild_val = document.getElementById( 'arf_input_min_width_' + field_id ).value;
			var max_fild_val = document.getElementById( 'arf_input_max_width_' + field_id ).value;

			if (parseInt( min_fild_val ) >= parseInt( max_fild_val ) ) {
				document.getElementById( "arflite_field_option_error_note" ).innerHTML = 'Minimum option should not be greater than Maximum Option';
				var arflite_field_option_error_note                                    = document.getElementById( "arflite_field_option_error_note" );
				arflite_field_option_error_note.classList.add( 'arflite-field-err-active' );
				return false;
			}

			if (invalid_length_msg == null) {
				var invalid_length_msg_txt = '';
			} else {
				var invalid_length_msg_txt = invalid_length_msg.value;
			}
			if (invalid_length_msg != null && min_fild_val != '' && invalid_length_msg_txt.trim() == '') {
				var inputstyle = invalid_length_msg.getAttribute( 'style' );
				if (inputstyle == undefined) {
					invalid_length_msg.setAttribute( 'style', 'border-color:#fd4343 !important;' );
				} else {
					invalid_length_msg.setAttribute( 'style', inputstyle + ';border-color: #fd4343 !important;' );
				}
				invalid_length_msg.focus();
				var next = arfliteNextClosest( invalid_length_msg, 'div.field_opt_msg' );
				if (next != null) {
					next.parentNode.removeChild( next );
				}
				var d         = document.createElement( 'div' );
				d.className   = "field_opt_msg";
				d.style.clear = "both";
				d.style.color = "#fd4343";
				var i         = document.createElement( 'i' );
				i.appendChild( document.createTextNode( validation_msg ) );
				d.appendChild( i );
				arfliteInsertAfter( d, invalid_length_msg );
				jQuery( 'body' ).on(
					'keypress',
					'#arf_min_length_message_' + field_id,
					function() {
						var inputstyle = jQuery( '#arf_min_length_message_' + field_id ).attr( 'style' );
						inputstyle     = inputstyle.replace( /(border-color\:(.*?)\;)/gi, '' );
						jQuery( '#arf_min_length_message_' + field_id ).attr( 'style', inputstyle );
						jQuery( '#arf_min_length_message_' + field_id ).next( 'div' ).remove();
					}
				);
				return false;
			}
		}
		if ( field_type == 'phone' ) {
			var min_fild_val = document.getElementById( 'arf_input_min_width_' + field_id ).value;
			var max_fild_val = document.getElementById( 'arf_input_max_width_' + field_id ).value;

			if (parseInt( min_fild_val ) >= parseInt( max_fild_val )) {
				document.getElementById( "arflite_field_option_error_note" ).innerHTML = 'Minimum option should not be greater than Maximum Option';
				var arflite_field_option_error_note                                    = document.getElementById( "arflite_field_option_error_note" );
				arflite_field_option_error_note.classList.add( 'arflite-field-err-active' );
				return false;
			}
		}
		if (field_type == 'number' || field_type == 'phone' || field_type == 'email' || field_type == 'url') {
			var invalid_msg = document.getElementById( 'invalid_message_' + field_id );

			if (invalid_msg == null) {
				var invalid_msg_txt = '';
			} else {
				var invalid_msg_txt = invalid_msg.value;
			}
			if (invalid_msg != null && invalid_msg_txt.trim() == '') {
				var inputstyle = invalid_msg.getAttribute( 'style' );
				if (inputstyle == undefined) {
					invalid_msg.setAttribute( 'style', 'border-color:#fd4343 !important;' );
				} else {
					invalid_msg.setAttribute( 'style', inputstyle + ';border-color: #fd4343 !important;' );
				}
				invalid_msg.focus();
				var next = arfliteNextClosest( invalid_msg, 'div.field_opt_msg' );
				if (next != null) {
					next.parentNode.removeChild( next );
				}
				var d         = document.createElement( 'div' );
				d.className   = "field_opt_msg";
				d.style.clear = "both";
				d.style.color = "#fd4343";
				var i         = document.createElement( 'i' );
				i.appendChild( document.createTextNode( validation_msg ) );
				d.appendChild( i );
				arfliteInsertAfter( d, invalid_msg );
				jQuery( 'body' ).on(
					'keypress',
					'#invalid_message_' + field_id,
					function() {
						var inputstyle = jQuery( '#invalid_message_' + field_id ).attr( 'style' );
						inputstyle     = inputstyle.replace( /(border-color\:(.*?)\;)/gi, '' );
						jQuery( '#invalid_message_' + field_id ).attr( 'style', inputstyle );
						jQuery( '#invalid_message_' + field_id ).next( 'div' ).remove();
					}
				);
				return false;
			}
		}
		if (jQuery( '#invalid_confirm_email_' + field_id ) != undefined ) {
			if (jQuery( '#invalid_confirm_email_' + field_id ) != undefined && field_type == 'email') {
				var invalid_confirm_field = document.getElementById( 'invalid_confirm_email_' + field_id );
				var invald_confirm_txt    = invalid_confirm_field.value;
				var confirm_id            = 'invalid_confirm_email_';
			}
			if (invalid_confirm_field != null && invald_confirm_txt.trim() == '') {
				var inputstyle = invalid_confirm_field.getAttribute( 'style' );
				if (inputstyle == undefined) {
					invalid_confirm_field.setAttribute( 'style', 'border-color:#fd4343 !important;' );
				} else {
					invalid_confirm_field.setAttribute( 'style', inputstyle + ';border-color: #fd4343 !important;' );
				}
				invalid_confirm_field.focus();
				var next = arfliteNextClosest( invalid_confirm_field, 'div.field_opt_msg' );
				if (next != null) {
					next.parentNode.removeChild( next );
				}
				var d         = document.createElement( 'div' );
				d.className   = "field_opt_msg";
				d.style.clear = "both";
				d.style.color = "#fd4343";
				var i         = document.createElement( 'i' );
				i.appendChild( document.createTextNode( validation_msg ) );
				d.appendChild( i );
				arfliteInsertAfter( d, invalid_confirm_field );
				jQuery( 'body' ).on(
					'keypress',
					'#' + confirm_id + field_id,
					function() {
						var inputstyle = jQuery( '#' + confirm_id + field_id ).attr( 'style' );
						inputstyle     = inputstyle.replace( /(border-color\:(.*?)\;)/gi, '' );
						jQuery( '#' + confirm_id + field_id ).attr( 'style', inputstyle );
						jQuery( '#' + confirm_id + field_id ).next( 'div' ).remove();
					}
				);
				return false;
			}
		}
		if (field_type == 'text') {
			var arf_custom_validation = document.getElementById( "single_custom_validation_" + field_id ).value;
			var regex_msg             = '';
			if (arf_custom_validation != 'custom_validation_none') {
				regex_msg = document.getElementById( 'arf_regular_expression_msg_' + field_id );
			}
			if (regex_msg == null) {
				var regex_validation_msg = '';
			} else {
				var regex_validation_msg = regex_msg.value;
			}
			if (regex_msg != null && arf_custom_validation != 'custom_validation_none' && regex_validation_msg.trim() == '') {
				var inputstyle = regex_msg.getAttribute( 'style' );
				if (inputstyle == undefined) {
					regex_msg.setAttribute( 'style', 'border-color:#fd4343 !important;' );
				} else {
					regex_msg.setAttribute( 'style', inputstyle + ';border-color: #fd4343 !important;' );
				}
				regex_msg.focus();
				var next = arfliteNextClosest( regex_msg, 'div.field_opt_msg' );
				if (next != null) {
					next.parentNode.removeChild( next );
				}
				var d         = document.createElement( 'div' );
				d.className   = "field_opt_msg";
				d.style.clear = "both";
				d.style.color = "#fd4343";
				var i         = document.createElement( 'i' );
				i.appendChild( document.createTextNode( validation_msg ) );
				d.appendChild( i );
				arfliteInsertAfter( d, regex_msg );
				jQuery( 'body' ).on(
					'keypress',
					'#arf_regular_expression_msg_' + field_id,
					function() {
						var inputstyle = jQuery( '#arf_regular_expression_msg_' + field_id ).attr( 'style' );
						inputstyle     = inputstyle.replace( /(border-color\:(.*?)\;)/gi, '' );
						jQuery( '#arf_regular_expression_msg_' + field_id ).attr( 'style', inputstyle );
						jQuery( '#arf_regular_expression_msg_' + field_id ).next( 'div' ).remove();
					}
				);
				return false;
			}
		}

		if (field_type == 'checkbox') {
			var maxoptsel    = document.getElementById( 'maxoptsel' ).value;
			var maxoptselmsg = document.getElementById( 'maxoptselmsg' );
			if (maxoptselmsg == null) {
				var maxoptselmsg_txt = '';
			} else {
				var maxoptselmsg_txt = maxoptselmsg.value;
			}
			if (maxoptselmsg != null && maxoptsel != '' && maxoptselmsg_txt.trim() == '') {
				var inputstyle = maxoptselmsg.getAttribute( 'style' );
				if (inputstyle == undefined) {
					maxoptselmsg.setAttribute( 'style', 'border-color:#fd4343 !important;' );
				} else {
					maxoptselmsg.setAttribute( 'style', inputstyle + ';border-color: #fd4343 !important;' );
				}
				maxoptselmsg.focus();
				var next = arfliteNextClosest( maxoptselmsg, 'div.field_opt_msg' );
				if (next != null) {
					next.parentNode.removeChild( next );
				}
				var d         = document.createElement( 'div' );
				d.className   = "field_opt_msg";
				d.style.clear = "both";
				d.style.color = "#fd4343";
				var i         = document.createElement( 'i' );
				i.appendChild( document.createTextNode( validation_msg ) );
				d.appendChild( i );
				arfliteInsertAfter( d, maxoptselmsg );
				jQuery( 'body' ).on(
					'keypress',
					'#maxoptselmsg',
					function() {
						var inputstyle = jQuery( '#maxoptselmsg' ).attr( 'style' );
						inputstyle     = inputstyle.replace( /(border-color\:(.*?)\;)/gi, '' );
						jQuery( '#maxoptselmsg' ).attr( 'style', inputstyle );
						jQuery( '#maxoptselmsg' ).next( 'div' ).remove();
					}
				);
				return false;
			}
			var minoptsel     = document.getElementById( 'minoptsel' ).value;
			var minoptsel_div = document.getElementById( 'minoptsel' );
			var minoptselmsg  = document.getElementById( 'minoptselmsg' );
			if (minoptselmsg == null) {
				var minoptselmsg_txt = '';
			} else {
				var minoptselmsg_txt = minoptselmsg.value;
			}
			if (minoptselmsg != null && minoptsel != '' && minoptselmsg_txt.trim() == '') {
				var inputstyle = minoptselmsg.getAttribute( 'style' );
				if (inputstyle == undefined) {
					minoptselmsg.setAttribute( 'style', 'border-color:#fd4343 !important;' );
				} else {
					minoptselmsg.setAttribute( 'style', inputstyle + ';border-color: #fd4343 !important;' );
				}
				minoptselmsg.focus();
				var next = arfliteNextClosest( minoptselmsg, 'div.field_opt_msg' );
				if (next != null) {
					next.parentNode.removeChild( next );
				}
				var d         = document.createElement( 'div' );
				d.className   = "field_opt_msg";
				d.style.clear = "both";
				d.style.color = "#fd4343";
				var i         = document.createElement( 'i' );
				i.appendChild( document.createTextNode( validation_msg ) );
				d.appendChild( i );
				arfliteInsertAfter( d, minoptselmsg );
				jQuery( 'body' ).on(
					'keypress',
					'#minoptselmsg',
					function() {
						var inputstyle = jQuery( '#minoptselmsg' ).attr( 'style' );
						inputstyle     = inputstyle.replace( /(border-color\:(.*?)\;)/gi, '' );
						jQuery( '#minoptselmsg' ).attr( 'style', inputstyle );
						jQuery( '#minoptselmsg' ).next( 'div' ).remove();
					}
				);
				return false;
			}
			if (parseInt( minoptsel ) > parseInt( maxoptsel )) {
				var inputstyle = minoptsel_div.getAttribute( 'style' );
				if (inputstyle == undefined) {
					minoptsel_div.setAttribute( 'style', 'border-color:#fd4343 !important;' );
				} else {
					minoptsel_div.setAttribute( 'style', inputstyle + ';border-color: #fd4343 !important;' );
				}
				minoptsel_div.focus();
				var next = arfliteNextClosest( minoptsel_div, 'div.field_opt_msg' );
				if (next != null) {
					next.parentNode.removeChild( next );
				}
				var d         = document.createElement( 'div' );
				d.className   = "field_opt_msg";
				d.style.clear = "both";
				d.style.color = "#fd4343";
				var i         = document.createElement( 'i' );
				i.appendChild( document.createTextNode( 'Number should not be greater than Maximum Option' ) );
				d.appendChild( i );
				arfliteInsertAfter( d, minoptsel_div );
				jQuery( 'body' ).on(
					'keypress',
					'#minoptsel_div',
					function() {
						var inputstyle = jQuery( '#minoptsel_div' ).attr( 'style' );
						inputstyle     = inputstyle.replace( /(border-color\:(.*?)\;)/gi, '' );
						jQuery( '#minoptsel_div' ).attr( 'style', inputstyle );
						jQuery( '#minoptsel_div' ).next( 'div' ).remove();
					}
				);
				return false;
			}

		}

		var new_fields         = {};
		var new_fields_keys    = [];
		var prefix_suffix_icon = false;
		var inputFields        = model.querySelectorAll( '.arf_field_option_content_row input' );
		var totalInputs        = inputFields.length;
		var prefix_suffix_icon = false;
		if (totalInputs > 0) {
			for (var f = 0; f < totalInputs; f++) {
				var control    = inputFields[f];
				var ctype      = control.type;
				var value_text = control.value;
				var field_name = control.name;

				if (ctype == 'radio' || ctype == 'checkbox') {
					continue;
				}
				if (field_name == 'enable_arf_prefix' || field_name == 'enable_arf_suffix') {
					var prefix_value       = document.getElementById( 'enable_arf_prefix_' + field_id ).value;
					var suffix_value       = document.getElementById( 'enable_arf_suffix_' + field_id ).value;
					prefix_value           = parseInt( prefix_value );
					suffix_value           = parseInt( suffix_value );
					var is_phone_with_flag = false;
					if (field_data.type == 'phone' && field_data.phonetype == 1) {
						is_phone_with_flag = true;
					}
					if ((is_phone_with_flag == false && prefix_value == 1) || suffix_value == 1) {
						prefix_suffix_icon = true;
					}
				} else if (field_name == 'tooltip_text') {
					if (value_text != '') {
						if (arfmainforminputstyle.value != "material") {
							var tt       = document.createElement( 'div' );
							tt.className = "arftootltip_position arfhelptip tipso_style";
							tt.id        = "tooltip_field_" + field_id;
							tt.setAttribute( 'data-title', value_text );
							var ttexts = document.createElement( 'span' );
							var xmlns  = "http://www.w3.org/2000/svg";
							var svg    = document.createElementNS( xmlns, 'svg' );
							svg.setAttributeNS( null, 'width', '30px' );
							svg.setAttributeNS( null, 'height', '30px' );
							svg.setAttributeNS( null, 'viewBox', '0 0 30 30' );
							var spath = document.createElementNS( xmlns, 'path' );
							spath.setAttributeNS( null, 'fill', '#BEC5D5' );
							spath.setAttributeNS( null, 'd', 'M9.609,0.33c-4.714,0-8.5,3.786-8.5,8.5s3.786,8.5,8.5,8.5s8.5-3.786,8.5-8.5S14.323,0.33,9.609,0.33z M10.381,13.467c0,0.23-0.154,0.387-0.387,0.387H9.222c-0.231,0-0.387-0.156-0.387-0.387v-0.772c0-0.231,0.155-0.388,0.387-0.388h0.772c0.232,0,0.387,0.156,0.387,0.388V13.467z M11.425,10.028c-0.541,0.463-0.929,0.772-1.044,1.197c-0.039,0.193-0.193,0.309-0.387,0.309H9.222c-0.231,0-0.426-0.193-0.387-0.425c0.155-1.12,0.966-1.738,1.623-2.279c0.697-0.541,1.082-0.889,1.082-1.546c0-1.082-0.85-1.932-1.932-1.932s-1.933,0.85-1.933,1.932c0,0.078,0,0.154,0,0.232c0.04,0.192-0.077,0.386-0.27,0.425L6.672,8.173C6.44,8.25,6.208,8.096,6.169,7.864C6.131,7.67,6.131,7.478,6.131,7.284c0-1.932,1.545-3.478,3.478-3.478c1.932,0,3.477,1.546,3.477,3.478C13.085,8.714,12.16,9.448,11.425,10.028L11.425,10.028z' );
							svg.appendChild( spath );
							ttexts.appendChild( svg );
							tt.appendChild( ttexts );
							if (jQuery( '#tooltip_field_' + field_id ).length > 0) {
								jQuery( '#tooltip_field_' + field_id ).remove();
							}
							var description = document.getElementById( 'field_description_' + field_id );
							description.parentNode.insertBefore( tt, description );
							if ( typeof jQuery().tipso == 'function' ) {
								var tooltip_field = document.getElementById( 'tooltip_field_' + field_id ).getElementsByClassName( 'arfhelptip' );
								var tflen         = tooltip_field.length;
								if (tflen > 0) {
									for (var t = 0; t < tflen; t++) {
										var this_ = tooltip_field[t];
										var title = this_.getAttribute( 'data-title' );
										jQury( this_ ).tipso(
											{
												position: 'top',
												width: 'auto',
												useTitle: false,
												content: title,
												background: '#444444',
												color: '#ffffff',
												tooltipHover: true
											}
										);
									}
								}
								jQuery( '#arf_field_' + field_id ).find( '#tooltip_field_' + field_id + '.arfhelptip' ).each(
									function() {
										jQuery( this ).tipso( 'destroy' );
										var title           = jQuery( this ).attr( 'data-title' );
										var bgcolor         = document.getElementById( 'arf_tooltip_bg_color' ).value;
										var textcolor       = document.getElementById( 'arf_tooltip_font_color' ).value;
										var tooltipposition = jQuery( 'input[name="arflitetippos"]:checked' ).val();

										jQuery( this ).tipso(
											{
												position: tooltipposition,
												width: 'auto',
												useTitle: false,
												content: title,
												background: bgcolor,
												color: textcolor,
												tooltipHover: true
											}
										);
									}
								);
							}
						} else {
							jQuery( '#arf_field_' + field_id ).find( '.controls' ).each(
								function() {
									jQuery( this ).addClass( 'arfhelptipfocus' ).attr( 'data-title', value_text );
								}
							);
							jQuery( ".arf_materialize_form .edit_field_type_radio #arf_field_" + field_id + ", .arf_materialize_form .edit_field_type_checkbox #arf_field_" + field_id + ", .arf_materialize_form .edit_field_type_select #arf_field_" + field_id + ", .arf_materialize_form .edit_field_type_arfslider #arf_field_" + field_id ).find( ".arfhelptipfocus" ).each(
								function() {
									jQuery( this ).tipso( "destroy" );
									var bgcolor         = document.getElementById( 'arf_tooltip_bg_color' ).value;
									var textcolor       = document.getElementById( 'arf_tooltip_font_color' ).value;
									var dataContent     = jQuery( this ).attr( 'data-title' );
									var tooltipposition = jQuery( 'input[name="arflitetippos"]:checked' ).val();
									jQuery( this ).tipso(
										{
											position: tooltipposition,
											width: 'auto',
											useTitle: false,
											content: dataContent,
											background: bgcolor,
											color: textcolor
										}
									);
								}
							);

						}
					} else {
						if (arfmainforminputstyle.value != "material") {
							var tobj = document.getElementById( 'tooltip_field_' + field_id );
							if (tobj != null) {
								tobj.parentNode.removeChild( tobj );
							}
						} else {
							jQuery( '#arf_field_' + field_id ).find( '.controls.arfhelptipfocus' ).each(
								function() {
									jQuery( this ).tipso( "destroy" );
									jQuery( this ).removeClass( 'arfhelptipfocus' ).removeAttr( 'data-title' );
								}
							);
						}
					}
				} else if (field_name == 'max_rows') {
					var object = document.getElementById( 'itemmeta_' + field_id );
					object.setAttribute( 'rows', value_text );
				} else if (field_name == 'description') {
					var obj = document.getElementById( 'arf_field_' + field_id ).getElementsByClassName( 'arf_field_description' )[0];
					if (obj != null) {
						obj.innerHTML = value_text;
					}
				} else if (field_name == 'leftlable') {
					var obj = document.getElementById( 'arf_js_field_switch_left_label' + field_id );
					if (obj != null) {
						obj.innerHTML = value_text;
					}
				} else if (field_name == 'rightlable') {
					var obj = document.getElementById( 'arf_js_field_switch_right_label' + field_id );
					if (obj != null) {
						obj.innerHTML = value_text;
					}
				} else if (field_name == 'leftvalue') {
					var obj = document.getElementById( 'field_' + field_id + '-0' );
					if (obj != null) {
						jQuery( '#switch_field_' + field_id + '-0' ).attr( 'data-leftval', value_text );
						if (jQuery( '#switch_field_' + field_id + '-0' ).is( ":checked" ) == false) {
							jQuery( '#switch_field_' + field_id + '-0' ).val( value_text );
							jQuery( '#field_' + field_id + '-0' ).val( value_text );
						}
					}
				} else if (field_name == 'rightvalue') {
					var obj = document.getElementById( 'field_' + field_id + '-0' );
					if (obj != null) {
						jQuery( '#switch_field_' + field_id + '-0' ).attr( 'data-rightval', value_text );
						if (jQuery( '#switch_field_' + field_id + '-0' ).is( ":checked" ) == true) {
							jQuery( '#switch_field_' + field_id + '-0' ).val( value_text );
							jQuery( '#field_' + field_id + '-0' ).val( value_text );
						}
					}
				} else if (field_name == 'placeholdertext') { 

					// edited
					if( field_type == 'select' ){   
						let selectpicker = jQuery( 'dl.arf-selectpicker-control[data-name="item_meta[' + field_id + ']"]' );  
						
							if(	(field_data.options[0] == null) || (field_data.options[0] == '') || (field_data.options[0] == undefined) || (field_data.options[0]['label'] == "") ){ 
								var li = selectpicker.find( 'dd ul li' );
								var data_label = li.attr( "data-label", value_text ); 
								
								selectpicker.find( 'dt span' ).html( value_text );
								if(jQuery( '#arfmainforminputstyle' ).val() != "material_outlined"){
									selectpicker.find( 'dd ul li[data-value=""]' ).html( value_text ); 	
								}
							} 
					}

					if (jQuery( '#arfmainforminputstyle' ).val() == 'material') {
						if (control.value != '') {
							if (field_type == 'textarea') {
								document.querySelector( "textarea[name='item_meta[" + field_id + "]']" ).placeholder = value_text;
							} else {
								document.querySelector( "input[name='item_meta[" + field_id + "]']" ).placeholder = value_text;
							}
							arfliteaddClass( document.querySelectorAll( ".arf_main_label#field_" + field_id )[0], 'active' );
						} else {
							if (field_type == 'textarea') {
								document.querySelector( "textarea[name='item_meta[" + field_id + "]']" ).removeAttribute( 'placeholder' );
							} else {
								document.querySelector( "input[name='item_meta[" + field_id + "]']" ).removeAttribute( 'placeholder' );
							}
							arfliteremoveClass( document.querySelectorAll( ".arf_main_label#field_" + field_id )[0], 'active' );
						}
					} else {
						if (field_type == 'textarea') {
							document.querySelector( "textarea[name='item_meta[" + field_id + "]']" ).placeholder = value_text;
						} else {
							document.querySelector( "input[name='item_meta[" + field_id + "]']" ).placeholder = value_text;
						}
					}
				} else if (field_name == 'default_value') {
					if (control.value != '') {
						if (field_type == 'textarea') {
							document.querySelector( "textarea[name='item_meta[" + field_id + "]']" ).value = value_text;
						} else {
							document.querySelector( "input[name='item_meta[" + field_id + "]']" ).value = value_text;
						}
					} else {
						if (field_type == 'textarea') {
							document.querySelector( "textarea[name='item_meta[" + field_id + "]']" ).value = '';
						} else {
							document.querySelector( "input[name='item_meta[" + field_id + "]']" ).value = '';
						}
					}
					if (document.getElementById( 'arfmainforminputstyle' ).value == 'material') {
						arflite_material_style_init();
					}
				} else if (field_name == 'field_width' && typeof value_text != 'undefined') {
					if (field_type == 'textarea') {
						var cur_style = jQuery( "#arf_field_" + field_id ).find( '.controls' ).attr( 'style' );
						cur_style     = (cur_style != undefined && cur_style != '') ? cur_style : '';
						if (/width/i.test( cur_style )) {
							cur_style = cur_style.replace( /(width\:(.*?)\;)/ig, '' );
						}
						if (value_text != '') {
							jQuery( "#arf_field_" + field_id ).find( '.controls' ).attr( 'style', cur_style + 'width:' + value_text + 'px !important;' )
						} else {
							jQuery( "#arf_field_" + field_id ).find( '.controls' ).attr( 'style', cur_style );
						}
					} else if (field_type == 'select') {
						var cur_style = jQuery( "#arf_field_" + field_id ).find( '.controls' ).attr( 'style' );
						cur_style     = (cur_style != undefined && cur_style != '') ? cur_style : '';
						if (/width/i.test( cur_style )) {
							cur_style = cur_style.replace( /(width\:(.*?)\;)/ig, '' );
						}
						if (value_text != '') {
							jQuery( "#arf_field_" + field_id ).find( '.controls' ).attr( 'style', cur_style + 'width:' + value_text + 'px !important;' );
						} else {
							jQuery( "#arf_field_" + field_id ).find( '.controls' ).attr( 'style', cur_style );
						}
					} else {
						var cur_style = jQuery( "#arf_field_" + field_id ).find( '.controls' ).attr( 'style' );
						cur_style     = (cur_style != undefined && cur_style != '') ? cur_style : '';
						if (/width/i.test( cur_style )) {
							cur_style = cur_style.replace( /(width\:(.*?)\;)/ig, '' );
						}
						if (value_text != '') {
							jQuery( "#arf_field_" + field_id ).find( '.controls' ).attr( 'style', cur_style + 'width:' + value_text + 'px !important;' );
						} else {
							jQuery( "#arf_field_" + field_id ).find( '.controls' ).attr( 'style', cur_style );
						}
						setTimeout(
							function() {
								if ((field_type == 'email' )) {
									if (jQuery( "#arf_field_" + field_id + "_confirm" ).length > 0) {
										var confirm_style = jQuery( "#arf_field_" + field_id + "_confirm" ).find( 'controls' ).attr( 'style' );
										confirm_style     = (confirm_style != undefined && confirm_style != '') ? confirm_style : '';
										if (/width/i.test( confirm_style )) {
											confirm_style = confirm_style.replace( /(width\:(.*?)\;)/ig, '' );
										}
										if (value_text != '') {
											jQuery( "#arf_field_" + field_id + "_confirm" ).find( '.controls' ).attr( 'style', confirm_style + 'width:' + value_text + 'px !important;' );
										} else {
											jQuery( "#arf_field_" + field_id + "_confirm" ).find( '.controls' ).attr( 'style', confirm_style );
										}
									}
								}
							},
							100
						);
					}
				}
				if (typeof field_name != 'undefined' && field_name != 'undefined' && field_name != '') {
					new_fields[field_name] = control.value;
					new_fields_keys.push( field_name );
				}
			}
		}
		var inputRadios = model.querySelectorAll( '.arf_field_option_content_row input[type="radio"]' );
		var totalRadios = inputRadios.length;
		if (totalRadios > 0) {
			for (var r = 0; r < totalRadios; r++) {
				var control      = inputRadios[r];
				var control_name = control.name;
				if (control.checked == true) {
					new_fields[control_name] = control.value;
				}
				new_fields_keys.push( control_name );
			}
		}
		var inputCheckbox = model.querySelectorAll( '.arf_field_option_content_row input[type="checkbox"]' );
		var totalCheckbox = inputCheckbox.length;
		if (totalCheckbox > 0) {
			for (var c = 0; c < totalCheckbox; c++) {
				var control = inputCheckbox[c];
				var cname   = control.name;
				var cvalue  = control.value;
				var checked = control.checked;
				if (field_type != 'phone') {
					if (checked == true) {
						new_fields[cname] = cvalue;
					} else {
						new_fields[cname] = '0';
					}
					new_fields_keys.push( cname );
				} else {
					if (arflitehasClass( control, 'js-switch' )) {
						if (checked == true) {
							new_fields[cname] = cvalue;
						} else {
							new_fields[cname] = '0';
						}
						new_fields_keys.push( cname );
					}
				}
			}
		}
		var textAreaFields = model.querySelectorAll( '.arf_field_option_content_row textarea' );
		var totalTextArea  = textAreaFields.length;
		if (totalTextArea > 0) {
			for (var tx = 0; tx < totalTextArea; tx++) {
				var control      = textAreaFields[tx];
				var name         = control.name;
				var value        = control.value;
				new_fields[name] = value;
				new_fields_keys.push( name );
			}
		}
		var oldFieldData = arflite_retrieve_field_data( field_id );
		new_fields.type  = oldFieldData.type;
		var keys         = Object.keys( oldFieldData );
		var tkey         = keys.length;
		for (var u = 0; u < tkey; u++) {
			var ki = keys[u];
			if (new_fields_keys.indexOf( ki ) < 0) {
				new_fields[ki] = oldFieldData[ki];
			}
		}
		var reInitPhoneField = false;
		if (field_type == 'phone') {
			if (new_fields.phonetype == 1) {
				reInitPhoneField = true;
			}
			var field_types       = {};
			var i                 = 0;
			var inpchk            = model.querySelectorAll( '.arf_custom_checkbox_div input[type="checkbox"]' );
			var inpchklen         = inpchk.length;
			var checked_flag      = jQuery( '.arf_custom_checkbox_div input[type="checkbox"]:checked' ).length;
			var flagchk_container = document.getElementById( 'main_allowed_types' );
			if (checked_flag < 1) {
				var inputstyle = flagchk_container.getAttribute( 'style' );
				if (inputstyle == undefined) {
					flagchk_container.setAttribute( 'style', 'border-color:#fd4343 !important;' );
				} else {
					flagchk_container.setAttribute( 'style', inputstyle + ';border-color: #fd4343 !important;' );
				}
				flagchk_container.focus();
				var next = arfliteNextClosest( flagchk_container, 'div.field_opt_msg' );
				if (next != null) {
					next.parentNode.removeChild( next );
				}
				var d         = document.createElement( 'div' );
				d.className   = "field_opt_msg";
				d.style.float = "right";
				d.style.clear = "both";
				d.style.color = "#fd4343";
				var i         = document.createElement( 'i' );
				i.appendChild( document.createTextNode( validationchk_msg ) );
				d.appendChild( i );
				arfliteInsertAfter( d, flagchk_container );

				jQuery( document ).on(
					'focusin',
					'#main_allowed_types input[type="checkbox"]',
					function() {
						var inputstyle = jQuery( '.phonetype_box_' + field_id + ' #main_allowed_types' ).attr( 'style' );

						inputstyle = inputstyle.replace( /(border-color\:(.*?)\;)/gi, '' );
						jQuery( '.phonetype_box_' + field_id + ' #main_allowed_types' ).attr( 'style', inputstyle );
						jQuery( '.phonetype_box_' + field_id + ' #main_allowed_types' ).next( 'div' ).remove();
					}
				);
				return false;
			}
			if (inpchklen > 0) {
				for (var ic = 0; ic < inpchklen; ic++) {
					var ico  = inpchk[ic];
					var name = ico.name;
					if (ico.checked == true) {
						field_types[name] = ico.value;
					} else {
						field_types[name] = 0;
					}
				}
			}
			new_fields.phtypes = field_types;
		} else if (field_type == 'email') {
			var confirm_email = new_fields.confirm_email;

			if (confirm_email == 0) {
				new_fields.confirm_email_classes       = 'arf_1';
				new_fields.confirm_email_inner_classes = 'arf_1col';
				jQuery( '#arf_field_' + field_id + '_confirm' ).remove();
			}
		}

		var newFieldData = JSON.stringify( new_fields );
		var new_lab      = new_fields;

		jQuery( "#arf_field_data_" + field_id ).val( newFieldData ).trigger( 'change' );
		if (prefix_suffix_icon == true && jQuery( '#arfmainforminputstyle' ).val() != 'material') {
			arflite_add_prefix_suffix_icon_to_control( field_id );
		} else if (prefix_suffix_icon == true && jQuery( '#arfmainforminputstyle' ).val() == 'material') {
			arflite_add_prefix_suffix_icon_to_material_theme_control( field_id );
		} else {
			var enable_prefix     = document.getElementById( 'enable_arf_prefix_' + field_id );
			var enable_suffix     = document.getElementById( 'enable_arf_suffix_' + field_id );
			var prefix_suffix_obj = document.getElementById( 'arf_editor_prefix_suffix_container_' + field_id );
			if (enable_prefix != null || enable_suffix != null) {
				if (enable_prefix.value == 0 && enable_suffix.value == 0) {
					if (prefix_suffix_obj != null) {
						var prefix_inner = prefix_suffix_obj.getElementsByClassName( 'arf_editor_prefix_icon' )[0];
						var suffix_inner = prefix_suffix_obj.getElementsByClassName( 'arf_editor_suffix_icon' )[0];
						if (prefix_inner != null) {
							prefix_inner.parentNode.removeChild( prefix_inner );
						}
						if (suffix_inner != null) {
							suffix_inner.parentNode.removeChild( suffix_inner );
						}
						arfliteremoveClass( prefix_suffix_obj, 'arf_both_pre_suffix' );
						arfliteremoveClass( prefix_suffix_obj, 'arf_suffix_only' );
						arfliteremoveClass( prefix_suffix_obj, 'arf_prefix_only' );
					}
				} else {
					if (enable_prefix.value == 0) {
						if (prefix_suffix_obj != null) {
							var prefix_inner = prefix_suffix_obj.getElementsByClassName( 'arf_editor_prefix_icon' )[0];
							if (prefix_inner != null) {
								prefix_inner.parentNode.removeChild( prefix_inner );
								arfliteremoveClass( prefix_suffix_obj, 'arf_prefix_only' );
							}
						}
					}
					if (enable_suffix.value == 0) {
						if (prefix_suffix_obj != null) {
							var suffix_inner = prefix_suffix_obj.getElementsByClassName( 'arf_editor_suffix_icon' )[0];
							if (suffix_inner != null) {
								suffix_inner.parentNode.removeChild( suffix_inner );
								arfliteremoveClass( prefix_suffix_obj, 'arf_suffix_only' );
							}
						}
					}
				}
			}
		}
		if (document.getElementById( 'arfname_' + field_id ) != null) {
			var field_label = new_fields['name'] || document.getElementById( 'arfname_' + field_id ).value;
			if (null != document.getElementById( 'new_fields' ).querySelector( '.arf_edit_in_place_input[data-field-id="' + field_id + '"]' )) {
				document.getElementById( 'new_fields' ).querySelector( '.arf_edit_in_place_input[data-field-id="' + field_id + '"]' ).setAttribute( 'value', field_label );
				document.getElementById( 'new_fields' ).querySelector( '.arf_edit_in_place_input[data-field-id="' + field_id + '"]' ).value = field_label;
			}
		}
		var nfalign = new_fields.align;
		if (typeof nfalign != 'undefined') {
			var el = document.getElementById( 'arfmainfieldid_' + field_id ).getElementsByClassName( 'controls' )[0];
			arfliteremoveClass( el, 'arf_single_row' );
			arfliteremoveClass( el, 'arf_multiple_row' );
			arfliteremoveClass( el, 'arf_col_chk_radio_two' );
			arfliteremoveClass( el, 'arf_col_chk_radio_three' );
			arfliteremoveClass( el, 'arf_col_chk_radio_four' );
			if (nfalign == 'inline') {
				arfliteaddClass( el, 'arf_single_row' );
			} else if (nfalign == 'block') {
				arfliteaddClass( el, 'arf_multiple_row' );
			} else if (nfalign == 'arf_col_2') {
				arfliteaddClass( el, 'arf_col_chk_radio_two' );
			} else if (nfalign == 'arf_col_3') {
				arfliteaddClass( el, 'arf_col_chk_radio_three' );
			} else if (nfalign == 'arf_col_4') {
				arfliteaddClass( el, 'arf_col_chk_radio_four' );
			}
		}
		if (field_type == 'date') {
			arflite_initialize_control( field_id, true );
		}
		if (field_type == 'time') {
			arflite_initialize_control( field_id, true );
		}
		if (field_type == 'phone' && reInitPhoneField) {
			var flag_key = 'field_' + field_id;
			if (typeof phone_with_flags[flag_key] != 'undefined') {
				phone_with_flags[flag_key].destroy();
				delete phone_with_flags[flag_key];
			}
		}
		if (arfmainforminputstyle.value == 'material' && field_type == 'select') {
			jQuery( "#arf_field_" + field_id ).find( '.select-wrapper' ).find( 'span' ).remove();
			jQuery( "#arf_field_" + field_id ).find( '.select-wrapper' ).find( '.arf-select-dropdown' ).remove();
		}
		window.is_field_ok_btn_click = true;

		arflite_initialize_control( field_id );
		window.is_field_ok_btn_click = false;
		arfliteheightdiv( 'individual', field_id );
		if (field_type == 'html') {
			var field_wrapper      = document.getElementById( 'arf_field_' + field_id );
			var field_icon_wrapper = field_wrapper.getElementsByClassName( 'arf_fieldiconbox' )[0];
			arfliteremoveClass( field_icon_wrapper, 'arf_fieldiconbox_with_edit_option' );
			if (new_fields.enable_total == 1) {
				arfliteaddClass( field_icon_wrapper, 'arf_fieldiconbox_with_edit_option' );
			}
		}
		arflite_update_name_dropdown( field_id, field_type, new_fields.name );

		var totalHtmlFields = jQuery( '#new_fields' ).find( '.edit_field_type_html' ).length;
		if (totalHtmlFields > 0) {
			for (var thf = 0; thf < totalHtmlFields; thf++) {
				var new_description = "";
				var html_field_id   = jQuery( jQuery( '#new_fields' ).find( '.edit_field_type_html' )[thf] ).attr( 'id' );
				html_field_id       = html_field_id.replace( 'arfmainfieldid_', '' );
				var html_field_data = arflite_retrieve_field_data( html_field_id );
				if (typeof html_field_data.enable_total != 'undefined' && html_field_data.enable_total) {
					var description = html_field_data.description;
					var pattern     = /(\<arftotal\>)(.*?)(\<\/arftotal\>)/gmi;
					if (pattern.test( description )) {
						var np                      = new RegExp( "\\[(" + field_data.name + ")\\:(" + field_id + ")\\]", 'g' );
						description                 = description.replace( np, "[" + new_fields.name + ":" + field_id + "]" );
						html_field_data.description = description;
						var nhtml_field_data        = JSON.stringify( html_field_data );
						jQuery( "#arf_field_data_" + html_field_id ).val( nhtml_field_data ).trigger( 'change' );
					}
				}
			}
		}
		jQuery( 'div#arfmainfieldid_' + field_id ).parent().css( 'z-index', '' );
		arflite_close_field_option_popup( field_id );
		arfliteremoveBlankElm();
		arflite_initialize_field_order();
		arfliteinitialize_field_resize_width();
	}
);

function arflite_close_field_option_popup(field_id) {
	arfliteremoveClass( document.querySelector( '.arf_field_option_model_cloned.arfactive' ), 'arfactive' );
	var rowHtml         = '<div class="arf_field_option_content_loader"><svg version="1.1" id="arf_field_option_loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 26.349 26.35" style="enable-background:new 0 0 26.349 26.35;" fill="#3f74e7" xml:space="preserve" ><g><g><circle cx="13.792" cy="3.082" r="3.082" /><circle cx="13.792" cy="24.501" r="1.849"/><circle cx="6.219" cy="6.218" r="2.774"/><circle cx="21.365" cy="21.363" r="1.541"/><circle cx="3.082" cy="13.792" r="2.465"/><circle cx="24.501" cy="13.791" r="1.232"/><path d="M4.694,19.84c-0.843,0.843-0.843,2.207,0,3.05c0.842,0.843,2.208,0.843,3.05,0c0.843-0.843,0.843-2.207,0-3.05 C6.902,18.996,5.537,18.988,4.694,19.84z"/><circle cx="21.364" cy="6.218" r="0.924"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></div>';
	var container       = document.querySelector( '.arf_field_option_model_cloned .arf_field_option_content_row' );
	container.innerHTML = rowHtml;
	jQuery( '#arf_field_' + field_id + ' .arf_field_option_content_row' ).html( "" );

	jQuery( 'div#arfmainfieldid_' + field_id ).parent().css( 'z-index', '' );
}
jQuery( document ).on(
	'click',
	'.arf_selectbox',
	function(e) {
		var $this = jQuery( this );
		jQuery( this ).find( 'dd ul' ).toggle();
		var col_id = jQuery( this ).find( 'dd ul' ).attr( 'data-column' );
		if (jQuery( this ).find( 'dd ul' ).is( ":visible" )) {
			var id    = jQuery( this ).find( 'dd ul' ).attr( 'data-id' );
			var value = jQuery( '#main_' + col_id ).find( "input#" + id ).val();
			if (value != '' && id != '') {
				if ( id == 'frm_date_format' ) {
					jQuery( 'input#' + id ).attr( 'data-prev-value',value );
				}
				jQuery( this ).find( 'dd ul li' ).each(
					function() {
						if (jQuery( this ).attr( 'data-value' ) == value) {
							var target          = jQuery( this );
							var target_position = target.position().top;
							if (Math.floor( target_position ) > jQuery( this ).parent().height()) {
								jQuery( this ).parent().animate(
									{
										scrollTop: target.position().top
									},
									0
								);
							}
						}
					}
				);
			}
		}
	}
);
jQuery( document ).on(
	'focus',
	'.arf_selectbox dt input.arf_autocomplete',
	function(e) {
		var str        = this.value;
		var parentNode = arfliteClosest( this, '.arf_selectbox' );
		var li_items   = parentNode.getElementsByTagName( 'li' );
		var li_length  = li_items.length;
		if (li_length > 0) {
			for (var li = 0; li < li_length; li++) {
				var liNode  = li_items[li];
				var liStyle = liNode.getAttribute( 'style' );
				if (liStyle != null) {
					var pattern = /(display\:(\s+)none\;)/gi;
					if (pattern.test( liStyle )) {
						liNode.style.display = "";
					}
				}
			}
		}
	}
);
jQuery( document ).on(
	'click',
	'.arf_selectbox dt',
	function(e) {
		if (jQuery( this ).hasClass( 'arf_disable_selectbox' )) {
			return false;
		}
		if (jQuery( this ).find( '.arf_autocomplete' ).length > 0) {
			this.getElementsByTagName( 'input' )[0].value         = '';
			this.getElementsByTagName( 'span' )[0].style.display  = 'none';
			this.getElementsByTagName( 'input' )[0].style.display = '';
			this.getElementsByTagName( 'input' )[0].focus();
		}
		var this_parent = jQuery( this ).parent();
		if (jQuery( this ).hasClass( 'arf_disabled_container' )) {
			return false;
		}
		if (jQuery( this ).parent().find( 'dd ul' ).is( ":visible" ) == false) {
			var ul_h      = this_parent.find( 'dd ul' ).height();
			var dd_h      = this_parent.height();
			var win_h     = jQuery( window );
			var offsetTop = this_parent.offset().top - win_h.scrollTop();
			if (this_parent.parents( '.arf_submit_action_container' ).length > 0) {
				win_h             = jQuery( '.arf_submit_action_container' );
				var offset_height = win_h.offset().top - win_h.scrollTop();
				if ((win_h.height() - offset_height - dd_h) < ul_h) {
					this_parent.find( 'dd ul' ).addClass( 'arfdropdownoptiontop' );
				} else {
					this_parent.find( 'dd ul' ).removeClass( 'arfdropdownoptiontop' );
				}
			} else if (this_parent.attr( 'data-id' ) == 'templete_style') {
				var checked_value = jQuery( '.arf_form_type:checked' ).val();
				if ('blank_form' == checked_value) {
					this_parent.find( 'dd ul' ).addClass( 'arfdropdownoptiontop' );
				} else {
					this_parent.find( 'dd ul' ).removeClass( 'arfdropdownoptiontop' );
				}
			} else {
				if (win_h.height() - offsetTop - dd_h < ul_h) {
					this_parent.find( 'dd ul' ).addClass( 'arfdropdownoptiontop' );
				} else {
					this_parent.find( 'dd ul' ).removeClass( 'arfdropdownoptiontop' );
				}
			}
			var chk_field_enabled = this_parent.find( 'dd ul' ).attr( "data-id" );
			var isDisabled        = jQuery( "#" + chk_field_enabled ).prop( 'disabled' );
			var isReadonly        = jQuery( "#" + chk_field_enabled ).prop( 'readonly' );
			if (isDisabled || isReadonly) {
				if (isDisabled) {
					this_parent.find( 'dd ul' ).hide();
					this_parent.find( 'dt' ).addClass( "arf_disable_selectbox" );
				} else if (isReadonly) {
					this_parent.find( 'dd ul' ).hide();
				}
				return false;
			} else {
				this_parent.find( 'dt' ).removeClass( "arf_disable_selectbox" );
			}
		} else {
			var chk_field_enabled = this_parent.find( 'dd ul' ).attr( "data-id" );
			var isDisabled        = jQuery( "#" + chk_field_enabled ).prop( 'disabled' );
			if (isDisabled) {
				this_parent.find( 'dd ul' ).hide();
				return false;
			} else {
				this_parent.find( 'dd ul' ).show();
			}
		}
	}
);
jQuery( document ).on(
	'keyup',
	'.arf_selectbox dt input',
	function() {
		jQuery( this ).parent().parent().find( 'dd ul' ).scrollTop();
		var value = jQuery( this ).val();
		value     = value.toLowerCase();
		jQuery( this ).parent().parent().find( 'dd ul' ).show();
		jQuery( this ).parent().parent().find( 'dd ul li' ).each(
			function(x) {
				var text = jQuery( this ).attr( 'data-label' ).toLowerCase();
				(text.indexOf( value ) != -1) ? jQuery( this ).show() : jQuery( this ).hide();
			}
		);
	}
);
jQuery( document ).on(
	'click',
	".arf_selectbox dd ul li",
	function(e) {
		jQuery( document ).find( '.arf_selectbox:active dd ul' ).hide();
		if ( jQuery( this ).hasClass( 'arf_restricted_control' ) ) {
			return false;
		}
		var text = jQuery( this ).html();
		jQuery( this ).parent().parent().parent().find( 'dt span' ).html( jQuery( this ).attr( 'data-label' ) );
		jQuery( this ).parent().parent().parent().find( 'dt span' ).show();
		jQuery( this ).parent().parent().parent().find( 'dt input' ).val( jQuery( this ).data( 'label' ) );
		jQuery( this ).parent().parent().parent().find( 'dt input' ).hide();
		var id        = jQuery( this ).parent().attr( 'data-id' );
		var value     = jQuery( this ).attr( 'data-value' );
		var column_id = jQuery( this ).parent().attr( 'data-column' );
		if (typeof(column_id) !== 'undefined') {
			jQuery( '#main_' + column_id ).find( 'input#' + id ).val( value );
			jQuery( '#main_' + column_id ).find( 'input#' + id ).trigger( 'change' );
		} else {
			jQuery( 'input#' + id ).val( value );
			jQuery( 'input#' + id ).trigger( 'change' );
		}
		jQuery( this ).parent().find( 'li' ).show()
		wp.hooks.doAction( 'arflite_set_field_type_for_outside_options', id, jQuery( this ).attr( 'data-type' ) );
	}
);
jQuery( document ).on(
	'click',
	function(e) {
		var $clicked = jQuery( e.target );
		if ( ! $clicked.parents().hasClass( "arf_selectbox" ) && jQuery( '.arf_selectbox dd ul:visible' ).length > 0) {
			jQuery( ".arf_selectbox dd ul" ).hide();
			jQuery( '.arf_selectbox dt span' ).show();
			jQuery( '.arf_selectbox dt input' ).hide();
			jQuery( '.arf_autocomplete' ).each(
				function() {
					if (jQuery( this ).val() == '') {
						jQuery( this ).val( jQuery( this ).parent().find( 'span' ).html() );
					}
				}
			);
		}
		jQuery( '.arf_selectbox' ).removeClass( 'active' );
	}
);
jQuery( document ).on(
	'click',
	'#general_options',
	function() {
		jQuery( '.arf_modal_overlay' ).removeClass( 'arfactive' );
		jQuery( '.arf_popup_container#arf_other_options_model' ).parents( '.arf_modal_overlay' ).addClass( 'arfactive' );
		jQuery( '.arf_popup_container#arf_other_options_model' ).addClass( 'arfactive' );
		jQuery('.arf_editor_header_belt').removeClass('arf_editor_header_belt_cls');
	}
);
jQuery( document ).on(
	'click',
	'#arf_hidden_fields_options',
	function() {
		jQuery( '.arf_modal_overlay' ).removeClass( 'arfactive' );
		jQuery( '.arf_popup_container#arf_hidden_fields_options_model' ).parents( '.arf_modal_overlay' ).addClass( 'arfactive' );
		jQuery( '.arf_popup_container#arf_hidden_fields_options_model' ).addClass( 'arfactive' );
		jQuery('.arf_editor_header_belt').removeClass('arf_editor_header_belt_cls');
	}
);
jQuery( document ).on(
	'click',
	'#arf_tracking_code',
	function() {
		jQuery( '.arf_modal_overlay' ).removeClass( 'arfactive' );
		jQuery( '.arf_popup_container#arf_tracking_code_options_model' ).parents( '.arf_modal_overlay' ).addClass( 'arfactive' );
		jQuery( '.arf_popup_container#arf_tracking_code_options_model' ).addClass( 'arfactive' );
		jQuery('.arf_editor_header_belt').removeClass('arf_editor_header_belt_cls');
	}
);

jQuery( document ).on(
	'click',
	'#arflite_export_current_form_link',
	function() {
		if (jQuery( this ).hasClass( 'arf_export_form_editor_note' )) {
		} else {
			jQuery( '#arflite_current_form_export' ).submit();
		}
	}
);

jQuery( document ).on(
	'click',
	'#delete_pop',
	function() {
		var id             = jQuery( this ).attr( 'data-id' );
		var delete_content = 'delete';
		if (id == null || id == 'undefined') {
			return;
		}

		if ('undefined' != typeof jQuery( this ).attr( 'data-delete_content' ) && '' != jQuery( this ).attr( 'data-delete_content' )) {
			delete_content = 'delete_popup_list';
		}
		if (jQuery('.delete_form_message_' + id).length === 0) {
			var delete_popup_html = '';
			delete_popup_html    += '<div class="delete_popup delete_form_popup arfactive delete_form_message_' + id + '" id="delete_form_message">';
			delete_popup_html    += '<input type="hidden" value="' + id + '" id="delete_id"/>';
			delete_popup_html    += '<div class="delete_column_arrow"></div>';
			delete_popup_html    += '<div class="delete_title"><div class="delete_confirm_message">' + __ARF_DEL_FORM_MSG + '</div>';
			delete_popup_html    += '<div class="delete_popup_footer">';
			delete_popup_html    += '<button type="button" class="rounded_button add_button arf_delete_modal_left arfdelete_color_red" onclick="arfliteaction_func(\'' + delete_content + '\', ' + id + ');">' + __ARF_DELETE_TEXT + '</button>';
			delete_popup_html    += '<button type="button" class="rounded_button delete_button arfdelete_color_gray" onclick="arflite_delete_close_popup_form(' + id + ');">' + __ARF_CANCEL_TEXT + '</button>';
			delete_popup_html    += '</div>';
			delete_popup_html    += '</div>';
			delete_popup_html    += '</div>';
			var select_content    = jQuery( this ).parent( '.arfformicondiv' );
			jQuery( delete_popup_html ).insertAfter( select_content );
		}

		jQuery( '.delete_form_message_' + id ).show();
	}
);

function arfliteRgbToHex(rgb) {
	rgb = rgb.match( /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i );
	return (rgb && rgb.length == 4) ? "#" + ("0" + parseInt( rgb[1], 10 ).toString( 16 )).slice( -2 ) + ("0" + parseInt( rgb[2], 10 ).toString( 16 )).slice( -2 ) + ("0" + parseInt( rgb[3], 10 ).toString( 16 )).slice( -2 ) : '';
}

function arflite_material_style_init(){
	var input_selector = jQuery( '.arf_materialize_form' ).find( '.arf_material_theme_container > input[type=text], .arf_material_theme_container > input[type=email], .arf_material_theme_container > input[type=url], .arf_material_theme_container > input[type=tel], .arf_material_theme_container > input[type=number], .arf_material_theme_container > input[type=date], .arf_material_theme_container > input[type=time], .arf_material_theme_container > textarea, .arf_material_theme_container .iti input' );

	jQuery( input_selector ).each(
		function(index,element){
			let $this = jQuery( this );

			let $siblings = $this.parents( '.arf_material_theme_container' ).find( 'label.arf_main_label' );
			if ( 'undefined' == typeof $siblings ) {
				$siblings = $this.siblings( 'label.arf_main_label' );
			}

			if ($this.parents( 'div.arfformfield.arfmainformfield' ).hasClass( 'arf_field_type_arf_multiselect' ) ) {
				$siblings = $this.parents( '.controls' ).find( 'label.arf_main_label' );
			}

			if ( element.value.length > 0 || jQuery( element ).is( ':focus' ) || element.autofocus || ( $this.attr( 'placeholder' ) !== null && typeof $this.attr( 'placeholder' ) !== 'undefined' ) ) {
				$siblings.addClass( 'active' );
			} else {
				$siblings.removeClass( 'active' );
			}

			setTimeout(
				function(){
					if ($this.hasClass( 'arf_phone_utils' )) {
						$siblings = $this.parents( '.controls' ).find( 'label.arf_main_label' );

						if ( element.value.length > 0 || jQuery( element ).is( ':focus' ) || element.autofocus || ( $this.attr( 'placeholder' ) !== null && typeof $this.attr( 'placeholder' ) !== 'undefined' ) ) {
							$siblings.addClass( 'active' );
						} else {
							$siblings.removeClass( 'active' );
						}
					}
				},
				200
			);
		}
	);
}

jQuery( document ).on(
	'keyup',
	'.controls input[type="text"]',
	function() {
		var field_name         = jQuery( this ).attr( 'name' );
		var field_name_pattern = /(item_meta\[(\d+)\])/gi;
		if (field_name_pattern.test( field_name )) {
			var field_val            = jQuery( this ).val();
			var field_id             = field_name.replace( 'item_meta[', '' );
			field_id                 = field_id.replace( ']', '' );
			var field_data           = arflite_retrieve_field_data( field_id );
			var field_key            = field_data.key;
			field_data.default_value = field_val;

			if (typeof field_data.confirm_email != undefined && field_data.confirm_email != '' && field_data.confirm_email != 0) {
				jQuery( "#arf_field_" + field_id + "_confirm input[type='text'][name='confirm_email']" ).val( field_data.default_value );
			}
			field_data = JSON.stringify( field_data );
			jQuery( "#arf_field_data_" + field_id ).val( field_data ).trigger( 'change' );
		}
	}
);
jQuery( document ).on(
	'click',
	'.arf_model_close_btn',
	function() {
		var model_id  = jQuery( this ).attr( 'data-model_id' );
		var field_id  = jQuery( this ).attr( 'data-field_id' );
		var css_model = jQuery( '.arf_field_css_model' );
		css_model.removeClass( 'arfactive' );
		css_model.find( 'arf_field_css_model_cloud_input_wrapper' ).html( '' );
		css_model.find( '.arf_field_css_model_cloud_container' ).html( '<svg version="1.1" id="arf_field_css_option_loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 26.349 26.35" style="enable-background:new 0 0 26.349 26.35;" fill="#3f74e7" xml:space="preserve" ><g><g><circle cx="13.792" cy="3.082" r="3.082" /><circle cx="13.792" cy="24.501" r="1.849"/><circle cx="6.219" cy="6.218" r="2.774"/><circle cx="21.365" cy="21.363" r="1.541"/><circle cx="3.082" cy="13.792" r="2.465"/><circle cx="24.501" cy="13.791" r="1.232"/><path d="M4.694,19.84c-0.843,0.843-0.843,2.207,0,3.05c0.842,0.843,2.208,0.843,3.05,0c0.843-0.843,0.843-2.207,0-3.05 C6.902,18.996,5.537,18.988,4.694,19.84z"/><circle cx="21.364" cy="6.218" r="0.924"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>' );
	}
);
jQuery( document ).on(
	'click',
	'.arf_field_css_model_cloud_item',
	function() {
		if (jQuery( this ).hasClass( 'arfactive' )) {
			return false;
		}
		jQuery( this ).addClass( 'arfactive' );
	}
);
jQuery( document ).on(
	'click',
	'.arf_field_model_css_submit_button',
	function() {
		var field_id        = jQuery( this ).attr( 'data-field_id' );
		var field_css_style = "<style type='text/css' id='arf_field_label_css_" + field_id + "'>";
		jQuery( '.arf_field_css_model_cloud_container li' ).each(
			function(index, el) {
				var field_name   = jQuery( this ).attr( 'id' );
				var field_data   = arflite_retrieve_field_data( field_id );
				var values_label = jQuery( '.arf_field_custom_css[data-name="' + field_name + '"][data-field_id="' + field_id + '"]' ).val();
				if (values_label == undefined) {
					field_data[field_name] = '';
				} else {
					field_data[field_name] = values_label;
				}
				field_data = JSON.stringify( field_data );
				switch (field_name) {
					case 'css_outer_wrapper':
						if (values_label != '') {
							field_css_style += "#arfmainfieldid_" + field_id + " #arf_field_" + field_id + "{";
							field_css_style += values_label;
							field_css_style += "}";
						}
						break;
					case 'css_label':
						if (values_label != '') {
							field_css_style += "#arfmainfieldid_" + field_id + " #arf_field_" + field_id + " .arfeditorfieldopt_label,";
							field_css_style += "#arfmainfieldid_" + field_id + " #arf_field_" + field_id + " .arfeditorfieldopt_label input{";
							field_css_style += values_label;
							field_css_style += "}";
						}
						break;
					case 'css_input_element':
						if (values_label != '') {
							field_css_style += "#arfmainfieldid_" + field_id + " #arf_field_" + field_id + " .controls input{";
							field_css_style += values_label;
							field_css_style += "}";
						}
						break;
					case 'css_description':
						if (values_label != '') {
							field_css_style += "#arfmainfieldid_" + field_id + " #arf_field_" + field_id + " .arf_field_description{";
							field_css_style += values_label;
							field_css_style += "}";
						}
						break;
					case 'css_add_icon':
						if (values_label != '') {
							field_css_style += "#arfmainfieldid_" + field_id + " #arf_field_" + field_id + " .arf_editor_prefix_icon,";
							field_css_style += "#arfmainfieldid_" + field_id + " #arf_field_" + field_id + " .arf_editor_suffix_icon{";
							field_css_style += values_label;
							field_css_style += "}";
						}
						break;
				}
				jQuery( "#arf_field_data_" + field_id ).val( field_data );
			}
		);
		field_css_style += "</style>";
		jQuery( "#arf_field_label_css_" + field_id ).remove();
		jQuery( "#arfmainfieldid_" + field_id ).append( field_css_style );
		arflite_field_css_model_close();
	}
);

function arflite_field_css_model_close(field_id) {
	var css_model = jQuery( '.arf_field_css_model' );
	css_model.removeClass( 'arfactive' );
	css_model.find( '.arf_field_css_model_cloud_container' ).html( '' );
}
jQuery( document ).on(
	'focus',
	'.arf_edit_in_place_input.inplace_field',
	function(e) {
		var value    = jQuery( this ).val();
		var field_id = jQuery( this ).attr( "data-field-id" );
		jQuery( this ).attr( 'data-arf-value', value );
		jQuery( "#arf_control_labels" ).attr( 'data-field-id', field_id );
		jQuery( "#arf_control_labels" ).val( JSON.stringify( value ) );
		jQuery( this ).select();
	}
);
jQuery( document ).on(
	'keyup',
	'.arf_edit_in_place_input',
	function(e) {
		var value      = jQuery( this ).val();
		var textlength = value.length;
		if (e.keyCode == 13 || e.keyCode == 27) {
			jQuery( this ).trigger( 'blur' );
		} else {
			if (jQuery( this ).parent().hasClass( 'arfeditorformname' ) || jQuery( this ).parent().hasClass( 'arfeditorformdescription' ) || jQuery( this ).parent().hasClass( 'arfsubmitbtn' ) || jQuery( this ).parent().hasClass( 'arffullwidth' )) {
				return;
			}
		}
	}
);
jQuery( document ).on(
	'blur',
	'.arf_edit_in_place_input:not(.arf_edit_options_value)',
	function() {
		var $this       = jQuery( this );
		var field_val   = $this.val();
		var arf_value   = $this.attr( 'data-arf-value' );
		var arf_action  = $this.attr( 'data-action' );
		var arf_data_id = $this.attr( 'data-id' );
		if (typeof arf_data_id != "undefined" && arf_data_id == 'arf_form_submit_button') {
			jQuery( '#arfsubmitbuttontext' ).val( field_val );
			jQuery( $this ).attr( 'value', field_val );
			return false;
		}
		if (typeof arf_value == 'undefined') {
			return false;
		} else if (arf_value != '' && arf_value.trim() == field_val.trim()) {
			return false;
		}
		if (typeof(__ARFDEFAULTDESCRIPTION) != 'undefined') {
			var def_desc = __ARFDEFAULTDESCRIPTION;
		}
		if (typeof(__ARFDEFAULTTITLE) != 'undefined') {
			var def_title = __ARFDEFAULTTITLE;
		}
		var form_id = jQuery( '#id' ).val();
		if (arf_action != 'arfupdateformdescription' && arf_action != 'arfupdateformname') {
			var field_id       = $this.attr( 'data-field-id' );
			var field_data     = arflite_retrieve_field_data( field_id );
			var field_all_data = field_data;
			if (typeof $this.attr( 'data-field-opt-change' ) != 'undefined' && $this.attr( 'data-field-opt-change' ) == 'true') {
				field_data[$this.attr( 'data-field-opt-key' )] = field_val;
				field_data                                     = JSON.stringify( field_data );
				jQuery( '#arf_field_data_' + field_id ).val( field_data ).trigger( 'change' );
				jQuery( $this ).attr( 'value', field_val );
			}
			if (typeof $this.attr( 'data-id' ) != 'undefined' && $this.attr( 'data-id' ) == 'arf_form_submit_button') {
				jQuery( '#arfsubmitbuttontext' ).val( field_val );
			}
			var submit_width = document.getElementById( 'arfsubmitbuttonwidthsetting' ).value;
			if (submit_width == '') {
				arflitesetsubmitautowdith();
			}
			var field_data_obj      = {
				'field_id': parseInt( field_id ),
				'field_name': field_all_data.name,
				'field_type': field_all_data.type
			};
			window.is_updated_field = true;
			window.updated_fields.push( field_data_obj );
			setTimeout(
				function() {
					arflitehidesetvaluefield();
				},
				100
			);
			var totalHtmlFields = jQuery( '#new_fields' ).find( '.edit_field_type_html' ).length;
			if (totalHtmlFields > 0) {
				for (var thf = 0; thf < totalHtmlFields; thf++) {
					var new_description = "";
					var html_field_id   = jQuery( jQuery( '#new_fields' ).find( '.edit_field_type_html' )[thf] ).attr( 'id' );
					html_field_id       = html_field_id.replace( 'arfmainfieldid_', '' );
					var html_field_data = arflite_retrieve_field_data( html_field_id );
					if (typeof html_field_data.enable_total != 'undefined' && html_field_data.enable_total) {
						var description = html_field_data.description;
						var pattern     = /(\<arftotal\>)(.*?)(\<\/arftotal\>)/gmi;
						if (pattern.test( description )) {
							var labels                  = jQuery( "#arf_control_labels" ).val();
							var field_id                = jQuery( "#arf_control_labels" ).attr( 'data-field-id' );
							var old_labels              = arflite_parse_json( labels );
							var np                      = new RegExp( "\\[(" + old_labels + ")\\:(" + field_id + ")\\]", 'g' );
							description                 = description.replace( np, "[" + field_val + ":" + field_id + "]" );
							html_field_data.description = description;
							var nhtml_field_data        = JSON.stringify( html_field_data );
							jQuery( "#arf_field_data_" + html_field_id ).val( nhtml_field_data ).trigger( 'change' );
						}
					}
				}
			}
		}
	}
);
jQuery( document ).on(
	'change',
	'#arfsubmitbuttontext',
	function() {
		var $this     = jQuery( this );
		var field_val = $this.val();
		jQuery( '.arf_edit_in_place_input[data-id="arf_form_submit_button"]' ).val( field_val );
		var submit_width = document.getElementById( 'arfsubmitbuttonwidthsetting' ).value;
		if (submit_width == '') {
			(function($this) {
				setTimeout(
					function() {
						var submit_outer = jQuery( '#arfsubmitbuttontext2' ).outerWidth();
						submit_outer     = (submit_outer + 20);
						jQuery( '#arfsubmitautowidth' ).val( submit_outer );
						$this.width( submit_outer );
					},
					10
				);
			}(jQuery( '.greensavebtn.arf_submit_btn' )));
			arflitesetsubmitautowdith();
		}
	}
);
jQuery( document ).on(
	'click',
	'#arf_custom_color_save_btn',
	function() {
		jQuery( "#arf_custom_color_loader" ).css( "display", "inline-block" );
		setTimeout(
			function() {
				var color_popups   = document.querySelectorAll( '.arf_custom_color_popup_picker:not(.arf_restricted_control)' );
				var total_c_popups = color_popups.length;
				var skinObject     = arflite_parse_json( jQuery( '#arf_db_json_object' ).attr( 'value' ) );
				var inputStyle     = jQuery( "#arfmainforminputstyle" ).val();
				var custom_json    = {};
				for (var c = 0; c < total_c_popups; c++) {
					var current_popup = color_popups[c];
					var skinO         = current_popup.getAttribute( 'data-skin' );
					var check_theme   = current_popup.getAttribute( 'data-checkskin' ) || false;
					var data_skin     = current_popup.getAttribute( 'data-skin' );
					if (typeof skinO == 'undefined') {
						continue;
					}
					var splited = skinO.split( '.' );
					var control = splited[0].trim();
					if (check_theme && inputStyle == 'material') {
						control = control + '_' + inputStyle;
					}
					var property = splited[1].trim();
					var color    = skinObject[control][property];
					var n_color  = jQuery( '.arf_custom_color_popup_picker[data-skin="' + control + '.' + property + '"]' ).next( 'input' ).val();
					if (typeof n_color == 'undefined') {
						var tmp_control = control.replace( '_material', '' );
						var n_color     = jQuery( '.arf_custom_color_popup_picker[data-skin="' + tmp_control + '.' + property + '"]' ).next( 'input' ).val();
						if (typeof n_color == 'undefined') {
							n_color = color;
						}
					}
					if (typeof custom_json[control] == 'undefined') {
						custom_json[control] = {};
					}
					custom_json[control][property] = n_color;
				}
				var skinobjkey     = Object.keys( skinObject );
				var customjson_key = Object.keys( custom_json );

				if (skinobjkey.length != customjson_key.length) {
					for (var i = 0; i < skinobjkey.length; i++) {
						var diff = jQuery.inArray( skinobjkey[i], customjson_key );
						if (diff == -1) {
							custom_json[skinobjkey[i]] = skinObject[skinobjkey[i]];
						}
					}
				}
				jQuery( "#arf_db_json_object" ).attr( 'value', JSON.stringify( custom_json ) );
				var base_color = jQuery( '#arfmainbasecolor' ).val();
				jQuery( ".arf_skin_container[data-skin='custom']" ).css( 'background', base_color );
				jQuery( '#arf_color_skin' ).attr( 'data-default-skin', jQuery( "#arf_color_skin" ).val() );
				jQuery( '.arf_custom_color_popup' ).removeClass( 'arf_active' );
				window.is_update_custom_color = true;
				jQuery( "#arf_color_skin" ).val( 'custom' );
				jQuery( '.arf_skin_container' ).removeClass( 'active_skin' );
				jQuery( '.arf_skin_container[data-skin="custom"]' ).addClass( 'active_skin' );
				arflite_change_skin_colors( 'custom' );
				jQuery( "#arf_custom_color_loader" ).css( "display", "none" );
			},
			100
		);
	}
);
jQuery( document ).on(
	'click',
	'#arf_custom_color_cancel_btn',
	function() {
		jQuery( '.arf_custom_color_popup' ).removeClass( 'arf_active' );
		jQuery( 'body' ).find( "link.frm-custom-theme" ).remove();
		var colorpickers       = document.querySelectorAll( '.arf_custom_color_popup_picker[data-default-color^="#"]' );
		var total_colorpickers = colorpickers.length;
		for (var c = 0; c < total_colorpickers; c++) {
			var ccp                      = colorpickers[c];
			var skinO                    = ccp.getAttribute( 'data-default-color' );
			ccp.style.background         = skinO;
			ccp.nextElementSibling.value = skinO;
			jQuery( ccp.nextElementSibling ).trigger( 'change' );
		}
		var skin = document.getElementById( 'arf_color_skin' ).getAttribute( 'data-default-skin' );
		jQuery( '.arf_skin_container' ).removeClass( 'active_skin' );
		var skinBtn = document.querySelector( '.arf_skin_container[data-skin="' + skin + '"]' );
		arfliteaddClass( skinBtn, 'active_skin' );
		document.getElementById( 'arf_color_skin' ).value = skin;
		jQuery( document.getElementById( 'arf_color_skin' ) ).trigger( 'change' );
	}
);
jQuery( document ).on(
	'click',
	'#arf_custom_font_cancel_btn',
	function() {
		jQuery( '.arf_custom_font_popup' ).removeClass( 'arf_active' );
		var custom_font_options = document.getElementsByClassName( 'arf_custom_font_options' );
		var total_font_options  = custom_font_options.length;
		for (var cf = 0; cf < total_font_options; cf++) {
			var cfo         = custom_font_options[cf];
			var default_val = cfo.getAttribute( 'data-default-font' );
			var current_val = cfo.value;
			if (current_val != default_val) {
				if (arflitehasClass( cfo, 'arf_custom_font_style' )) {
					var attr_id = cfo.getAttribute( 'id' );
					cfo.value   = default_val;
					jQuery( cfo ).trigger( 'change' );
					if (default_val == 'normal') {
						jQuery( "#" + attr_id ).nextAll( ".arf_font_style_button" ).removeClass( 'active' );
					} else {
						var array = default_val.split( ',' );
						if (array.length > 0) {
							jQuery( "#" + attr_id ).nextAll( ".arf_font_style_button" ).removeClass( 'active' );
							for (var a = 0; a < array.length; a++) {
								var el = array[a];
								jQuery( "#" + attr_id ).nextAll( ".arf_font_style_button[data-style ='" + el + "']" ).addClass( 'active' );
							}
						}
					}
				} else {
					cfo.value = default_val;
					jQuery( cfo ).trigger( 'change' );
					var data_label = jQuery( cfo ).next( 'dl' ).find( "li.arf_selectbox_option[data-value ='" + default_val + "']" ).attr( 'data-label' );
					jQuery( cfo ).next( 'dl' ).find( 'span' ).text( data_label );
					jQuery( cfo ).next( 'dl' ).find( 'input' ).val( data_label );
				}
			}
		}
	}
);
jQuery( document ).on(
	'click',
	'#arf_edit_value_option_button',
	function() {
		var field_id   = this.getAttribute( 'data-field-id' );
		var field_data = arflite_retrieve_field_data( field_id );
		arfliteaddClass( document.getElementById( 'arf_field_values_model_skeleton_' + field_id ), 'arfactive' );
		document.getElementById( 'arf_field_values_model_skeleton_' + field_id ).setAttribute( 'data-type', field_data.type );
		var actual_model = document.getElementById( 'arf_field_values_model_skeleton' );
		arflite_initialize_field_values( actual_model, field_id );
		jQuery( 'div#arfmainfieldid_' + field_id ).parent().css( 'z-index', '99991' );
	}
);

function arflite_initialize_field_values(actual_model, field_id) {
	var string_tags = '';
	var field_data  = arflite_retrieve_field_data( field_id );
	var keys        = Object.keys( field_data );
	var it          = keys.length;
	var n           = 0;
	while (n < it) {
		if (actual_model.querySelector( '.arf_field_values_content_cell#' + keys[n] ) != null) {
			string_tags += actual_model.querySelector( '.arf_field_values_content_cell#' + keys[n] ).outerHTML;
		}
		n++;
	}
	var field_options      = field_data.options;
	var field_type         = field_data.type;
	var use_image          = field_data.use_image;
	var image_width        = field_data.image_width;
	var arflite_check_icon = field_data.arflite_check_icon || '';
	var separate_value     = field_data.separate_value;
	var default_options    = field_data.default_value;
	var checkbox_labels    = [];
	var separate_value_cls = (separate_value == 1) ? 'arfactive' : '';
	var k                  = Object.keys( field_options );
	var n                  = k.length;
	var x                  = k.length;
	var action_icon_class  = (x > 0) ? 'arf_show_action_icon' : '';
	var a                  = 0;
	var c                  = document.createDocumentFragment();
	while (a < k.length) {
		var opt               = k[a];
		var field_label       = (typeof field_options[opt].label != "undefined") ? field_options[opt].label : field_options[opt];
		var field_value       = (typeof field_options[opt].value != "undefined") ? field_options[opt].value : field_label;
		var field_label_image = (typeof field_options[opt].label_image != 'undefined' && field_options[opt].label_image != '') ? field_options[opt].label_image : '';
		if (field_type == 'checkbox') {
			checkbox_labels.push( field_label );
		}
		var outer_wrapper       = document.createElement( "div" );
		outer_wrapper.className = "arf_field_value_grid_row";
		outer_wrapper.id        = "arfoptionorder_" + field_id + "-" + a;
		var inner_wrapper       = document.createElement( 'div' );
		inner_wrapper.className = "arf_field_value_grid_row_cell_input";
		var grid_input_wrapper  = document.createElement( "span" );
		var input_wrapper       = document.createElement( "input" );
		var xmlns               = "http://www.w3.org/2000/svg";
		var checkbox_svg        = document.createElementNS( xmlns, "svg" );
		checkbox_svg.setAttributeNS( null, 'width', '18px' );
		checkbox_svg.setAttributeNS( null, 'height', '18px' );
		if (field_type == "checkbox") {
			grid_input_wrapper.className = "arf_custom_checkbox_wrapper arf_center_aligned";
			input_wrapper.type           = "checkbox";
			input_wrapper.className      = "arf_custom_checkbox";
			input_wrapper.id             = "fieldcheck_" + field_id + "-" + a;
			input_wrapper.name           = "arf_opt_item_meta[" + field_id + "][]";
			input_wrapper.onChange       = "arflitechangesubcheckradio(\"" + field_id + "-" + a + ",\"" + field_type + "\"\")";
			if (typeof default_options != 'undefined' && default_options.indexOf( field_value ) > -1) {
				input_wrapper.checked = true;
			}
			input_wrapper.value = field_value;
			var check_path      = document.createElementNS( xmlns, "path" );
			var uncheck_path    = document.createElementNS( xmlns, "path" );
			uncheck_path.id     = "arfcheckbox_unchecked";
			check_path.id       = "arfcheckbox_checked";
			uncheck_path.setAttributeNS( null, 'd', 'M15.205,16.852H3.774c-1.262,0-2.285-1.023-2.285-2.286V3.136  c0-1.263,1.023-2.286,2.285-2.286h11.431c1.263,0,2.286,1.023,2.286,2.286v11.43C17.491,15.829,16.467,16.852,15.205,16.852z M15.49,2.851h-12v12h12V2.851z' );
			check_path.setAttributeNS( null, 'd', 'M15.205,16.852H3.774c-1.262,0-2.285-1.023-2.285-2.286V3.136  c0-1.263,1.023-2.286,2.285-2.286h11.431c1.263,0,2.286,1.023,2.286,2.286v11.43C17.491,15.829,16.467,16.852,15.205,16.852z   M15.49,2.851h-12v12h12V2.851z M5.93,6.997l2.557,2.558l4.843-4.843l1.617,1.616l-4.844,4.843l0.007,0.007l-1.616,1.616  l-0.007-0.007l-0.006,0.007l-1.617-1.616l0.007-0.007L4.314,8.614L5.93,6.997z' );
		} else if (field_type == "radio" || field_type == "select" ) {
			grid_input_wrapper.className = "arf_custom_radio_wrapper arf_center_aligned";
			input_wrapper.type           = "radio";
			input_wrapper.className      = "arf_custom_radio";
			input_wrapper.id             = "fieldcheck_" + field_id + "-" + a;
			input_wrapper.name           = "arf_opt_item_meta[" + field_id + "]";
			input_wrapper.onChange       = "arflitechangesubcheckradio(\"" + field_id + "-" + a + ",\"" + field_type + "\"\")";
			if (typeof default_options != 'undefined' && default_options.indexOf( field_value ) > -1) {
				input_wrapper.checked = true;
			}
			input_wrapper.value = field_value;
			var check_path      = document.createElementNS( xmlns, "path" );
			var uncheck_path    = document.createElementNS( xmlns, "path" );
			uncheck_path.id     = "arfradio";
			check_path.id       = "arfradio_checked";
			uncheck_path.setAttributeNS( null, 'd', 'M8.03,14.442c-3.864,0-6.997-3.134-6.997-6.998  S4.166,0.446,8.03,0.446s6.997,3.134,6.997,6.998S11.895,14.442,8.03,14.442z M8.029,2.372c-2.801,0-5.071,2.271-5.071,5.072  s2.271,5.072,5.071,5.072c2.802,0,5.073-2.271,5.073-5.072S10.831,2.372,8.029,2.372z' );
			check_path.setAttributeNS( null, 'd', 'M8.03,14.442c-3.864,0-6.997-3.134-6.997-6.998  S4.166,0.446,8.03,0.446s6.997,3.134,6.997,6.998S11.895,14.442,8.03,14.442z M8.029,2.372c-2.801,0-5.071,2.271-5.071,5.072  s2.271,5.072,5.071,5.072c2.802,0,5.073-2.271,5.073-5.072S10.831,2.372,8.029,2.372z M8.03,10.444c-1.657,0-3-1.344-3-3  c0-1.657,1.343-3,3-3c1.656,0,3,1.343,3,3C11.03,9.1,9.687,10.444,8.03,10.444z' );
		}
		grid_input_wrapper.appendChild( input_wrapper );
		checkbox_svg.appendChild( uncheck_path );
		checkbox_svg.appendChild( check_path );
		grid_input_wrapper.appendChild( checkbox_svg );
		inner_wrapper.appendChild( grid_input_wrapper );
		outer_wrapper.appendChild( inner_wrapper );
		var inner_wrapper2            = document.createElement( "div" );
		inner_wrapper2.className      = "arf_field_value_grid_row_cell_label";
		inner_wrapper2.style.position = 'relative';
		var editinplaceSpan           = document.createElement( "span" );
		editinplaceSpan.className     = "arf_edit_in_place arffullwidth";
		var editinplaceInput          = document.createElement( "input" );
		editinplaceInput.type         = "text";
		editinplaceInput.name         = "arf_op_label[" + field_id + "][]";
		editinplaceInput.value        = field_label;
		editinplaceInput.className    = "arf_edit_in_place_input inplace_field arf_edit_options_value";
		editinplaceSpan.appendChild( editinplaceInput );
		inner_wrapper2.appendChild( editinplaceSpan );
		if (field_type == 'checkbox' || field_type == 'radio') {
			var image_span       = document.createElement( 'span' );
			image_span.className = "arf_field_value_grid_label_image";
			image_span.id        = "arf_radio_label_image_" + field_id + "-" + a;
			if (field_label_image != "") {
				var label_image          = document.createElement( "img" );
				label_image.src          = field_label_image;
				label_image.style.float  = "left";
				label_image.style.margin = "0 10px 0 0";
				label_image.style.height = "20px";
				label_image.style.width  = "20px";
				label_image.style.border = "1px solid #d5e3ff";
				image_span.appendChild( label_image );
			}
			var image_input   = document.createElement( 'input' );
			image_input.type  = "hidden";
			image_input.value = field_label_image;
			image_input.id    = "ar_image_op_image_" + field_id + "-" + a;
			image_input.name  = "arf_op_label_image_" + field_id + "[]";
			inner_wrapper2.appendChild( image_span );
			inner_wrapper2.appendChild( image_input );
		}
		var inputimageButton       = document.createElement( 'span' );
		inputimageButton.className = "arf_radio_image_edit";
		inputimageButton.id        = "add_img_id_" + field_id + "-" + a;
		inputimageButton.setAttribute( 'onClick', 'arflite_add_checkbox_img(jQuery(this));' );
		var inputimageButtonSvg = document.createElementNS( xmlns, "svg" );
		inputimageButtonSvg.setAttributeNS( null, 'width', '20px' );
		inputimageButtonSvg.setAttributeNS( null, 'height', '20px' );
		var inputimageButtonSvgPath = document.createElementNS( xmlns, 'path' );
		inputimageButtonSvgPath.setAttributeNS( null, "fill-rule", "evenodd" );
		inputimageButtonSvgPath.setAttributeNS( null, "clip-rule", "evenodd" );
		inputimageButtonSvgPath.setAttributeNS( null, "fill", "#3f74e7" );
		inputimageButtonSvgPath.setAttributeNS( null, "d", "M17.469,7.115v10.484c0,1.25-1.014,2.264-2.264,2.264H3.75c-1.25,0-2.262-1.014-2.262-2.264V5.082  c0-1.25,1.012-2.264,2.262-2.264h9.518l-2.264,2.001H3.489v13.042h11.979V9.379L17.469,7.115z M15.532,2.451l-0.801,0.8l2.4,2.401  l0.801-0.8L15.532,2.451z M17.131,0.85l-0.799,0.801l2.4,2.4l0.801-0.801L17.131,0.85z M6.731,11.254l2.4,2.4l7.201-7.202  l-2.4-2.401L6.731,11.254z M5.952,14.431h2.264l-2.264-2.264V14.431z" );
		inputimageButtonSvg.appendChild( inputimageButtonSvgPath );
		inputimageButton.appendChild( inputimageButtonSvg );
		inner_wrapper2.appendChild( inputimageButton );
		var inputimageFile       = document.createElement( "input" );
		inputimageFile.type      = "file";
		inputimageFile.className = "original";
		inputimageFile.setAttribute( 'data-val', 'arf_add_radio_radio_label_image_' + field_id + '-' + a );
		inputimageFile.id            = "arf_radio_add_image_" + field_id + "-" + a;
		inputimageFile.name          = "arf_radio_img_" + field_id + "-" + a;
		inputimageFile.style.display = "none";
		inner_wrapper2.appendChild( inputimageFile );
		var inputimageButton = document.createElement( 'span' );
		var inputimagedelete = 'arf_radio_image_delete';

		if (field_label_image == '') {
			inputimageButton.className = inputimagedelete + ' arflite_hide_delete_box';
		} else {
			inputimageButton.className = inputimagedelete;
		}
		inputimageButton.id     = 'del_img_id_' + field_id + '-' + a;
		var inputimageButtonSvg = document.createElementNS( xmlns, "svg" );
		inputimageButtonSvg.setAttributeNS( null, 'width', '20px' );
		inputimageButtonSvg.setAttributeNS( null, 'height', '20px' );
		var inputimageButtonSvgPath = document.createElementNS( xmlns, 'path' );
		inputimageButtonSvgPath.setAttributeNS( null, "fill-rule", "evenodd" );
		inputimageButtonSvgPath.setAttributeNS( null, "clip-rule", "evenodd" );
		inputimageButtonSvgPath.setAttributeNS( null, "fill", "#3f74e7" );
		inputimageButtonSvgPath.setAttributeNS( null, "d", "M18.435,4.857L18.413,19.87L3.398,19.88L3.394,4.857H1.489V2.929  h1.601h3.394V0.85h8.921v2.079h3.336h1.601l0,0v1.928H18.435z M15.231,4.857H6.597H5.425l0.012,13.018h10.945l0.005-13.018H15.231z   M11.4,6.845h2.029v9.065H11.4V6.845z M8.399,6.845h2.03v9.065h-2.03V6.845z" );
		inputimageButtonSvg.appendChild( inputimageButtonSvgPath );
		inputimageButton.appendChild( inputimageButtonSvg );
		inner_wrapper2.appendChild( inputimageButton );
		var deleteImagePopup                    = document.createElement( "div" );
		deleteImagePopup.className              = "delete_popup";
		var delete_image_popup_arrow            = document.createElement( "div" );
		delete_image_popup_arrow.className      = "delete_column_arrow";
		delete_image_popup_arrow.style.position = "absolute";
		deleteImagePopup.appendChild( delete_image_popup_arrow );
		var delete_title       = document.createElement( 'div' );
		delete_title.className = "delete_title";
		delete_title.innerHTML = _ARFRADIOCHKIMGMSG;
		delete_title.setAttribute( 'style', 'margin-top:2%' );
		var delete_popup_footer       = document.createElement( 'div' );
		delete_popup_footer.className = "delete_popup_footer";
		var dbtn1                     = document.createElement( "button" );
		dbtn1.type                    = "button";
		dbtn1.className               = "rounded_button delete_button";
		dbtn1.style.background        = "#ce3635";
		dbtn1.id                      = "del_btn_id_" + field_id + '-' + a;
		dbtn1.setAttribute( 'onclick', 'arflite_delete_checkbox_img(jQuery(this));' );
		dbtn1.appendChild( document.createTextNode( __ARF_YES_TEXT ) );
		var dbtn2       = document.createElement( "button" );
		dbtn2.type      = "button";
		dbtn2.className = "rounded_button arfdelete_color_gray";
		dbtn2.setAttribute( 'onclick', 'jQuery(".delete_popup").removeClass("arfactive");' );
		dbtn2.appendChild( document.createTextNode( __ARF_CANCEL_TEXT ) );
		delete_popup_footer.appendChild( dbtn1 );
		delete_popup_footer.appendChild( document.createTextNode( "\u00A0\u00A0" ) );
		delete_popup_footer.appendChild( dbtn2 );
		delete_title.appendChild( delete_popup_footer );
		deleteImagePopup.appendChild( delete_title );
		inner_wrapper2.appendChild( deleteImagePopup );
		outer_wrapper.appendChild( inner_wrapper2 );
		var inner_wrapper3          = document.createElement( "div" );
		var inner_wrapper3_class    = (separate_value == 1) ? "arf_field_value_grid_row_cell_value arfactive" : "arf_field_value_grid_row_cell_value";
		inner_wrapper3.className    = inner_wrapper3_class;
		var editinplaceSpan2        = document.createElement( "span" );
		editinplaceSpan2.className  = "arf_edit_in_place arffullwidth";
		var editinplaceInput2       = document.createElement( "input" );
		editinplaceInput2.type      = "text";
		editinplaceInput2.name      = "arf_op_value[" + field_id + "][]";
		editinplaceInput2.value     = field_value
		editinplaceInput2.className = "arf_edit_in_place_input inplace_field arf_edit_options_value";
		editinplaceSpan2.appendChild( editinplaceInput2 );
		inner_wrapper3.appendChild( editinplaceSpan2 );
		outer_wrapper.appendChild( inner_wrapper3 );
		var action_wrapper       = document.createElement( "div" );
		action_wrapper.className = "arf_field_value_grid_header_cell_action";
		var bulk_add_span        = document.createElement( "span" );
		bulk_add_span.className  = "arf_field_opt_grid_action_bulk_add";
		bulk_add_span.setAttribute( "onclick", "arfliteaddnewfieldoption(\"" + field_id + "\",\"" + field_type + "\")" );
		var bulk_add_svg = document.createElementNS( xmlns, "svg" );
		bulk_add_svg.setAttributeNS( null, "width", "22px" );
		bulk_add_svg.setAttributeNS( null, "height", "22px" );
		var bulk_add_path = document.createElementNS( xmlns, "path" );
		bulk_add_path.setAttributeNS( null, "d", "M11.134,20.362c-5.521,0-9.996-4.476-9.996-9.996c0-5.521,4.476-9.997,9.996-9.997s9.996,4.476,9.996,9.997C21.13,15.887,16.654,20.362,11.134,20.362z M11.133,2.314c-4.446,0-8.051,3.604-8.051,8.051c0,4.447,3.604,8.052,8.051,8.052s8.052-3.604,8.052-8.052 C19.185,5.919,15.579,2.314,11.133,2.314z M12.146,14.341h-2v-3h-3v-2h3V6.372h2v2.969h3v2h-3V14.341z" );
		bulk_add_svg.appendChild( bulk_add_path );
		bulk_add_span.appendChild( bulk_add_svg );
		action_wrapper.appendChild( bulk_add_span );
		var bulk_remove_span       = document.createElement( "span" );
		bulk_remove_span.className = "arf_field_opt_grid_action_bulk_remove " + action_icon_class;
		bulk_remove_span.setAttribute( "onclick", "arflitefielddelete_option(\"" + field_id + "\",\"" + field_type + "\",\"" + a + "\")" );
		var bulk_remove_svg = document.createElementNS( xmlns, "svg" );
		bulk_remove_svg.setAttributeNS( null, "width", "22px" );
		bulk_remove_svg.setAttributeNS( null, "height", "22px" );
		var bulk_remove_path = document.createElementNS( xmlns, "path" );
		bulk_remove_path.setAttributeNS( null, "d", "M11.12,20.389c-5.521,0-9.996-4.476-9.996-9.996c0-5.521,4.476-9.997,9.996-9.997s9.996,4.476,9.996,9.997C21.116,15.913,16.64,20.389,11.12,20.389z M11.119,2.341c-4.446,0-8.051,3.604-8.051,8.051c0,4.447,3.604,8.052,8.051,8.052s8.052-3.604,8.052-8.052C19.17,5.945,15.565,2.341,11.119,2.341z M12.131,11.367h3v-2h-3h-2h-3v2h3H12.131z" );
		bulk_remove_svg.appendChild( bulk_remove_path );
		bulk_remove_span.appendChild( bulk_remove_svg );
		action_wrapper.appendChild( bulk_remove_span );
		var bulk_move_span       = document.createElement( "span" );
		bulk_move_span.className = "arf_field_opt_grid_action_bulk_move " + action_icon_class;
		var bulk_move_svg        = document.createElementNS( xmlns, "svg" );
		bulk_move_svg.setAttributeNS( null, "width", "20px" );
		bulk_move_svg.setAttributeNS( null, "height", "20px" );
		var bulk_move_path = document.createElementNS( xmlns, "path" );
		bulk_move_path.setAttributeNS( null, "d", "M18.401,9.574l-3.092,3.092  c-0.06,0.061-0.139,0.091-0.218,0.091s-0.159-0.03-0.219-0.091c-0.121-0.121-0.121-0.316,0-0.438l2.563-2.564H11.69  c-0.171,0-0.309-0.139-0.309-0.31c0-0.17,0.138-0.309,0.309-0.309h5.746l-2.563-2.564c-0.121-0.121-0.121-0.316,0-0.438  c0.12-0.121,0.316-0.121,0.437,0l3.092,3.092c0.028,0.029,0.051,0.063,0.066,0.101c0.031,0.076,0.031,0.161,0,0.236  C18.452,9.51,18.429,9.544,18.401,9.574z M13.081,4.56c-0.079,0-0.158-0.03-0.218-0.091l-2.563-2.564v5.748  c0,0.171-0.139,0.31-0.31,0.31s-0.31-0.139-0.31-0.31V1.905L7.117,4.469C7.057,4.53,6.978,4.56,6.899,4.56S6.741,4.53,6.68,4.469  c-0.121-0.12-0.121-0.316,0-0.437L9.771,0.94c0.028-0.028,0.063-0.051,0.101-0.066c0.075-0.031,0.161-0.031,0.236,0  c0.038,0.016,0.072,0.038,0.101,0.066l3.091,3.093c0.121,0.12,0.121,0.316,0,0.437C13.239,4.53,13.161,4.56,13.081,4.56z   M2.543,9.045H8.29c0.171,0,0.309,0.139,0.309,0.309c0,0.171-0.138,0.31-0.309,0.31H2.543l2.563,2.564  c0.121,0.121,0.121,0.316,0,0.438c-0.06,0.061-0.139,0.091-0.218,0.091c-0.08,0-0.158-0.03-0.219-0.091L1.58,9.574  C1.55,9.544,1.528,9.51,1.512,9.472c-0.031-0.075-0.031-0.16,0-0.236C1.528,9.198,1.55,9.164,1.58,9.135L4.67,6.043  c0.12-0.121,0.316-0.121,0.437,0c0.121,0.121,0.121,0.316,0,0.438L2.543,9.045z M7.117,14.239l2.563,2.564v-5.747  c0-0.171,0.139-0.31,0.31-0.31s0.31,0.139,0.31,0.31v5.747l2.563-2.564c0.121-0.12,0.315-0.12,0.437,0  c0.121,0.121,0.121,0.316,0,0.438l-3.091,3.092c-0.028,0.029-0.063,0.052-0.101,0.067S10.03,17.86,9.99,17.86  s-0.08-0.009-0.118-0.024s-0.072-0.038-0.101-0.067L6.68,14.676c-0.121-0.121-0.121-0.316,0-0.438  C6.801,14.119,6.997,14.119,7.117,14.239z" );
		bulk_move_svg.appendChild( bulk_move_path );
		bulk_move_span.appendChild( bulk_move_svg );
		action_wrapper.appendChild( bulk_move_span );
		outer_wrapper.appendChild( action_wrapper );
		a++;
		c.appendChild( outer_wrapper );
	}
	document.getElementById( 'arf_control_labels' ).value = JSON.stringify( checkbox_labels );
	document.getElementById( 'arf_control_labels' ).setAttribute( 'data-field-id', field_id );
	string_tags = string_tags.replace( /\{arf_field_id\}/gi, field_id );
	string_tags = string_tags.replace( /(-10000)/gi, field_id );
	string_tags = string_tags.replace( /\{arf_field_type\}/gi, field_type );
	document.querySelector( '#arf_field_values_model_skeleton_' + field_id + ' .arf_field_values_content_row' ).innerHTML = string_tags;
	document.getElementById( 'arf_field_value_grid_data_wrapper_' + field_id ).appendChild( c );
	document.getElementById( "arf_field_value_grid_data_wrapper_" + field_id ).setAttribute( 'data-option-counter', (parseInt( k.length ) - 1) );
	if (use_image == 1) {
		document.querySelector( '#arf_field_values_model_skeleton_' + field_id + ' input[name="use_image"]' ).setAttribute( 'checked', 'checked' );
		jQuery( "#arf_field_values_model_skeleton_" + field_id ).find( '.arf_field_value_grid_container' ).addClass( 'arf_grid_with_image' );
		document.querySelector( '#arf_field_values_model_skeleton_' + field_id + ' input[name="separate_value"]' ).setAttribute( 'disabled', 'disabled' );
		jQuery( '#arf_field_values_model_skeleton_' + field_id + ' input[name="separate_value"]' ).addClass( 'arfcursornotallow' );
		jQuery( '#arflite_check_icon' ).show();
	} else {
		jQuery( '#arflite_check_icon' ).hide();
	}
	 jQuery( '#imagewidth_fixed' ).parents( 'label' ).addClass( 'arf_success' );
		jQuery( '#image_width_popup' ).show();
		jQuery( '#imagewidth_fixed' ).prop( 'checked',true );
		jQuery( '#image_width' ).val( image_width );

	if (image_width == "") {
		jQuery( '#image_width' ).val( 120 );
	} else {
		jQuery( '#image_width' ).val( image_width );
	}
	if ( field_type == 'checkbox' || field_type == 'radio' ) {
		if (arflite_check_icon == "") {
			jQuery( '#arflite_check_icon' ).find( 'input[name="arf_prefix_icon"]' ).val();
			document.getElementById( 'arf_select_prefix_' + field_id ).innerHTML = "<i class='fas fa-check'></i>";
		} else {
			jQuery( '#arflite_check_icon' ).find( 'input[name="arf_prefix_icon"]' ).val( arflite_check_icon );
			document.getElementById( 'arf_select_prefix_' + field_id ).innerHTML = "<i class='" + arflite_check_icon + "'></i>";
		}
	}
	if (separate_value == 1) {
		document.querySelector( '#arf_field_values_model_skeleton_' + field_id + ' input[name="separate_value"]' ).setAttribute( 'checked', 'checked' );
		jQuery( "#arf_field_values_model_skeleton_" + field_id ).find( '.arf_field_value_grid_container' ).addClass( 'arf_full_width' );
		jQuery( '#arf_field_values_model_skeleton_' + field_id ).find( '.arf_field_value_grid_header_cell_value' ).addClass( 'arfactive' );
	}

	let sortableList = document.querySelector( '.arf_field_value_grid_data_wrapper' );
    if( null != sortableList ){
        let field_opt_data = Sortable.create(
            sortableList,{
                ghostClass: 'arf_field_value_grid_row_placeholder',
                animation: 250,
                swapThreshold: 0.7,	
                handle: '.arf_field_opt_grid_action_bulk_move',
                sort:true
            }
        );
    }
	
	var current_obj = document.getElementById( 'arf_field_values_model_skeleton_' + field_id );
	jQuery( current_obj ).find( '.arf_field_radio_reset_wrapper' ).hide();
	if (field_type == 'radio') {
		jQuery( current_obj ).find( '.arf_field_radio_reset_wrapper' ).show();
		jQuery( current_obj ).find( '.arf_field_radio_reset_wrapper' ).each(
			function() {
				var content = jQuery( this ).attr( 'data-content' );
				jQuery( this ).find( 'i' ).tipso(
					{
						content: content,
						useTitle: false,
						width: 'auto',
						background: '#444444',
						color: "#FFFFFF"
					}
				);
			}
		);
	}
	if ( typeof jQuery().tipso == 'function' ) {
		var len       = document.getElementById( 'arf_field_values_model_skeleton_' + field_id ).getElementsByClassName( 'arfhelptip' ).length;
		var tipso_opt = {
			position: 'top',
			width: 'auto',
			useTitle: false,
			background: '#444444',
			color: '#ffffff',
			tooltipHover: true
		};
		if (len > 0) {
			for (var t = 0; t < len; t++) {
				var obj           = jQuery( document.getElementById( 'arf_field_values_model_skeleton_' + field_id ).getElementsByClassName( 'arfhelptip' )[t] );
				var title         = obj.attr( 'data-title' );
				tipso_opt.content = title;
				obj.tipso( tipso_opt );
			}
		}
	}
	jQuery( "#arf_field_values_model_skeleton_" + field_id ).find( '.arf_js_switch_wrapper' ).removeClass( 'arf_no_transition' );
}
jQuery( document ).on(
	'click',
	'.arf_field_values_close_button',
	function() {
		var rowHtml = '<div class="arf_field_option_content_loader"><svg version="1.1" id="arf_field_option_loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 26.349 26.35" style="enable-background:new 0 0 26.349 26.35;" fill="#3f74e7" xml:space="preserve" ><g><g><circle cx="13.792" cy="3.082" r="3.082" /><circle cx="13.792" cy="24.501" r="1.849"/><circle cx="6.219" cy="6.218" r="2.774"/><circle cx="21.365" cy="21.363" r="1.541"/><circle cx="3.082" cy="13.792" r="2.465"/><circle cx="24.501" cy="13.791" r="1.232"/><path d="M4.694,19.84c-0.843,0.843-0.843,2.207,0,3.05c0.842,0.843,2.208,0.843,3.05,0c0.843-0.843,0.843-2.207,0-3.05 C6.902,18.996,5.537,18.988,4.694,19.84z"/><circle cx="21.364" cy="6.218" r="0.924"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></div>';
		jQuery( '.arf_field_values_model:not(#arf_field_values_model_skeleton) .arf_field_values_content_row' ).html( rowHtml );
		var field_id = jQuery( this ).parents( '.arf_field_values_model' ).attr( 'id' ).replace( 'arf_field_values_model_skeleton_', '' );
		jQuery( 'div#arfmainfieldid_' + field_id ).parent().css( 'z-index', '' );
		jQuery( ".arf_field_values_model:not(#arf_field_values_model_skeleton)" ).removeClass( "arfactive" );
	}
);
jQuery( document ).on(
	'click',
	'.arf_field_values_submit_button',
	function() {
		var rowHtml               = '<div class="arf_field_option_content_loader"><svg version="1.1" id="arf_field_option_loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 26.349 26.35" style="enable-background:new 0 0 26.349 26.35;" fill="#3f74e7" xml:space="preserve" ><g><g><circle cx="13.792" cy="3.082" r="3.082" /><circle cx="13.792" cy="24.501" r="1.849"/><circle cx="6.219" cy="6.218" r="2.774"/><circle cx="21.365" cy="21.363" r="1.541"/><circle cx="3.082" cy="13.792" r="2.465"/><circle cx="24.501" cy="13.791" r="1.232"/><path d="M4.694,19.84c-0.843,0.843-0.843,2.207,0,3.05c0.842,0.843,2.208,0.843,3.05,0c0.843-0.843,0.843-2.207,0-3.05 C6.902,18.996,5.537,18.988,4.694,19.84z"/><circle cx="21.364" cy="6.218" r="0.924"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></div>';
		var field_id              = jQuery( this ).attr( 'data-field-id' );
		var modelObj              = jQuery( "#arf_field_values_model_skeleton_" + field_id );
		var use_image             = modelObj.find( 'input[name="use_image"]' ).is( ':checked' ) ? '1' : '0';
		 var image_width          = jQuery( '#image_width' ).val();
		var arflite_check_icon    = modelObj.find( 'input[name="arf_prefix_icon"]' ).val();
		var separate_value        = modelObj.find( 'input[name="separate_value"]' ).is( ':checked' ) ? '1' : '0';
		var field_data            = arflite_retrieve_field_data( field_id );
		var field_type            = field_data.type;
		field_data.separate_value = separate_value;
		if (field_type == 'checkbox' || field_type == 'radio') {
			 field_data.use_image         = use_image;
			field_data.image_width        = image_width;
			field_data.arflite_check_icon = arflite_check_icon;
			if (field_data.use_image == 1) {
				field_data.separate_value = 1;
			}
		}

		var rStyle = '<style type="text/css">:root{ --checkbox_image_size_arf_field_' + field_id + ' :' + image_width + 'px;}.arf_field_' + field_id + ' .rect-cutoff{ transform: translateX( calc( var(--checkbox_image_size_arf_field_' + field_id + ') - 25px ) ) translateY(-6.5px); }</style>';
		jQuery( "body" ).append( rStyle );

		if (separate_value == 1) {
			var field_options     = {};
			var i                 = 0;
			var field_label       = [];
			var field_value       = [];
			var field_label_image = [];
			jQuery( '.arf_edit_in_place_input[name="arf_op_label[' + field_id + '][]"]' ).each(
				function() {
					field_label.push( jQuery( this ).val() );
					i++;
				}
			);
			jQuery( '.arf_edit_in_place_input[name="arf_op_value[' + field_id + '][]"]' ).each(
				function() {
					field_value.push( jQuery( this ).val() );
				}
			);
			jQuery( 'input[name="arf_op_label_image_' + field_id + '[]"]' ).each(
				function() {
					field_label_image.push( jQuery( this ).val() );
				}
			);
			for (var x = 0; x < i; x++) {
				if (typeof field_options[x] == 'undefined') {
					field_options[x] = {};
				}
				field_options[x].value       = field_value[x];
				field_options[x].label       = field_label[x];
				field_options[x].label_image = (typeof field_label_image[x] != 'undefined') ? field_label_image[x] : '';
			}
			field_data.options = field_options;
		} else {
			var field_options = [];

			jQuery( '.arf_edit_in_place_input[name="arf_op_label[' + field_id + '][]"]' ).each(
				function() {
					field_options.push( jQuery( this ).val() );
				}
			);
			field_data.options = field_options;
		}
		var inputStyle = jQuery( "#arfmainforminputstyle" ).val();
		switch (field_type) {
			case 'checkbox':
			case 'radio':
				var default_values    = [];
				var total_options     = 0;
				var field_description = jQuery( "#field_description_" + field_id )[0];
				var help_block        = jQuery( "#arf_field_" + field_id ).find( '.controls' ).find( '.help-block' )[0];
				jQuery( "#arf_field_" + field_id ).find( '.controls' ).html( '' );
				jQuery.each(
					field_options,
					function(i) {
						total_options++;
					}
				);
				var field_labels = [];
				for (var chk = 0; chk < total_options; chk++) {
					if (chk < 5) {
						if (typeof field_options[chk] != 'undefined') {
							var field_label = (separate_value == 1) ? field_options[chk].label : field_options[chk];
							var field_value = (separate_value == 1) ? field_options[chk].value : field_label;
							field_labels.push( field_label );
							var field_wrapper_cls = (field_type == 'radio') ? 'arf_radiobutton' : 'arf_checkbox_style';
							var image_label_class = (field_data.use_image == 1 && typeof field_options[chk].label_image != 'undefined' && field_options[chk].label_image != '') ? 'arf_enable_' + field_type + '_image_editor' : '';
							var field_name        = (field_type == 'checkbox') ? "item_meta[" + field_id + "][]" : "item_meta[" + field_id + "]";
							var is_checked        = jQuery( "#fieldcheck_" + field_id + "-" + chk ).is( ':checked' ) ? "checked='checked'" : "";
							var field_html        = document.createElement( 'div' );
							field_html.setAttribute( 'class', field_wrapper_cls + ' ' + image_label_class );
							field_html.setAttribute( 'id', 'frm_checkbox_' + field_id + '-' + chk );
							var field_html1 = document.createElement( 'div' );
							field_html1.setAttribute( 'class', 'arf_' + field_type + '_input_wrapper' );
							var input_html   = document.createElement( 'input' );
							input_html.type  = field_type;
							input_html.name  = field_name;
							input_html.id    = "field_" + field_id + "-" + chk;
							input_html.value = field_value;
							if (jQuery( "#fieldcheck_" + field_id + "-" + chk ).is( ":checked" )) {
								input_html.setAttribute( "checked", "checked" );
							}
							var span_html = document.createElement( 'span' );
							if (document.getElementById( 'frm_check_radio_style' ).value == 'custom') {
								if (field_type == 'checkbox') {
									var icon_val = document.getElementById( 'arf_checkbox_icon' ).value;
									var i_html   = document.createElement( 'i' );
									i_html.setAttribute( 'class', icon_val );
									span_html.appendChild( i_html );
								} else if (field_type == 'radio') {
									var icon_val = document.getElementById( 'arf_radio_icon' ).value;
									var i_html   = document.createElement( 'i' );
									i_html.setAttribute( 'class', icon_val );
									span_html.appendChild( i_html );
								}
							}
							field_html1.appendChild( input_html );
							field_html1.appendChild( span_html );
							field_html.appendChild( field_html1 );
							var label_html                = document.createElement( 'label' );
							var image_label_checked_class = (is_checked != '') ? 'checked' : '';
							label_html.setAttribute( 'for', 'field_' + field_id + '-' + chk );
							label_html.setAttribute( 'class', image_label_class );
							if (field_data.use_image == 1 && typeof field_options[chk].label_image != 'undefined' && field_options[chk].label_image != '') {
								var label_span          = document.createElement( 'span' );
								var image_span          = document.createElement( 'img' );
								var label_span_material = document.createElement( 'label' );
								var xmlns               = "http://www.w3.org/2000/svg";
								var svg_span            = document.createElementNS( xmlns,'svg' );
								var mask_span           = document.createElementNS( xmlns,'mask' );
								var g_span              = document.createElementNS( xmlns,'g' );
								var rect_span_1         = document.createElementNS( xmlns,'rect' );
								var rect_span_2         = document.createElementNS( xmlns,'rect' );
								var rect_span_3         = document.createElementNS( xmlns,'rect' );
								var img_span            = document.createElementNS( xmlns,'image' );

								if (inputStyle == 'material') {
									label_span_material.setAttribute( 'for','field_' + field_id + '-' + chk );
									label_span_material.setAttribute( 'class', 'arf_' + field_type + '_label_image_editor ' + image_label_checked_class + ' ' + arflite_check_icon );
									svg_span.setAttribute( 'role','none' );
									   svg_span.setAttribute( 'style','max-width:100%; width:' + image_width + 'px; height:' + image_width + 'px;' );
									   mask_span.setAttribute( 'id','clip-cutoff_field_' + field_id + '-' + chk );
										   rect_span_1.setAttribute( 'fill', 'white' );
										   rect_span_1.setAttribute( 'x', '0' );
										   rect_span_1.setAttribute( 'y', '0' );
										   rect_span_1.setAttribute( 'rx', '8' );
										   rect_span_1.setAttribute( 'ry', '8' );
										   rect_span_1.setAttribute( 'width',image_width );
										   rect_span_1.setAttribute( 'height',image_width );
									   mask_span.appendChild( rect_span_1 );
										   rect_span_2.setAttribute( 'class','rect-cutoff' );
										   rect_span_2.setAttribute( 'fill','black' );
										   rect_span_2.setAttribute( 'rx','4' );
										   rect_span_2.setAttribute( 'ry','4' );
										   rect_span_2.setAttribute( 'width','27' );
										   rect_span_2.setAttribute( 'height','27' );

									   mask_span.appendChild( rect_span_2 );

									   svg_span.appendChild( mask_span );
									   g_span.setAttribute( 'mask','url(#clip-cutoff_field_' + field_id + '-' + chk + ')' );
										   img_span.setAttribute( 'style','height:' + image_width + 'px;width:' + image_width + 'px' );
										   img_span.setAttribute( 'preserveAspectRatio','xMidYMid slice','width','100%' );
										   img_span.setAttribute( 'href',field_options[chk].label_image );
									   g_span.appendChild( img_span );
										   rect_span_3.setAttribute( 'fill','none' );
										   rect_span_3.setAttribute( 'style','x:0;y:0;rx:8;width:' + image_width + 'px;height:' + image_width + 'px' );
										   rect_span_3.setAttribute( 'stroke-width','5px !important' );
										   rect_span_3.setAttribute( 'class','img_stroke' );
										   g_span.appendChild( rect_span_3 );
									   svg_span.appendChild( g_span );
									label_html.appendChild( label_span_material );
									label_span_material.appendChild( svg_span );
								} else {
									label_span.setAttribute( 'class', 'arf_' + field_type + '_label_image_editor ' + image_label_checked_class + ' ' + arflite_check_icon );
									image_span.src = field_options[chk].label_image;
									image_span.setAttribute( 'class','arf_checkbox_radio_img' );
									image_span.style = 'max-width:100%; width:' + image_width + 'px; height:' + image_width + 'px';
									label_html.appendChild( label_span );
									label_span.appendChild( image_span );
								}
							}
							if (/<[a-z][\s\S]*>/i.test( field_label )) {
								jQuery( label_html ).html( field_label );
							} else {
								var field_label_text = document.createTextNode( field_label );
								label_html.appendChild( field_label_text );
							}
							field_html.appendChild( label_html );
						}
						jQuery( "#arf_field_" + field_id ).find( '.controls' )[0].appendChild( field_html );
					}
					if (jQuery( "#fieldcheck_" + field_id + "-" + chk ).is( ':checked' )) {
						var field_label = (separate_value == 1) ? field_options[chk].label : field_options[chk];
						var field_value = (separate_value == 1) ? field_options[chk].value : field_label;
						default_values.push( field_value );
					}
				}
				if (field_type == 'radio') {
					field_data.default_value = default_values[0];
				} else {
					field_data.default_value = default_values;
				}
				jQuery( "#arf_field_" + field_id ).find( '.controls' )[0].appendChild( field_description );
				jQuery( '#arf_field_' + field_id ).find( '.controls' )[0].appendChild( help_block );
				var totalHtmlFields = jQuery( '#new_fields' ).find( '.edit_field_type_html' ).length;
				if (totalHtmlFields > 0) {
					for (var thf = 0; thf < totalHtmlFields; thf++) {
						var new_description = "";
						var html_field_id   = jQuery( jQuery( '#new_fields' ).find( '.edit_field_type_html' )[thf] ).attr( 'id' );
						html_field_id       = html_field_id.replace( 'arfmainfieldid_', '' );
						var html_field_data = arflite_retrieve_field_data( html_field_id );
						if (typeof html_field_data.enable_total != 'undefined' && html_field_data.enable_total) {
							var description = html_field_data.description;
							var pattern     = /(\<arftotal\>)(.*?)(\<\/arftotal\>)/gmi;
							if (pattern.test( description )) {
								var labels     = jQuery( "#arf_control_labels" ).val();
								var field_id   = jQuery( "#arf_control_labels" ).attr( 'data-field-id' );
								var old_labels = arflite_parse_json( labels );
								for (var fl = 0; fl < old_labels.length; fl++) {
									var np      = new RegExp( "\\[(" + old_labels[fl] + ")\\:(" + field_id + "." + fl + ")\\]", 'g' );
									description = description.replace( np, "[" + field_labels[fl] + ":" + field_id + "." + fl + "]" );
								}
								html_field_data.description = description;
								var nhtml_field_data        = JSON.stringify( html_field_data );
								jQuery( "#arf_field_data_" + html_field_id ).val( nhtml_field_data ).trigger( 'change' );
							}
						}
					}
				}
				break;
			case 'select':
				var arf_parent_select_field_id = jQuery( '#arf_dynamic_option_parent_selectdata_' + field_id ).val();
				if ( arf_parent_select_field_id != '' && arf_parent_select_field_id != undefined ) {
					jQuery( '#arf_field_' + field_id ).attr( 'parent_select_id', arf_parent_select_field_id );
				}

				var default_values = "";
				var field_li_html  = '';
				var first_value    = '';
				for (var slt in field_options) {
					var field_label = (separate_value == 1) ? field_options[slt].label : field_options[slt];
					var field_value = (separate_value == 1) ? field_options[slt].value : field_label; 
					var first_label = (separate_value == 1 && field_options[slt].label != "")  ? field_options[slt].label : field_data.placeholdertext;
					
					// if( separate_value == 1 && slt == 0 ){
					//  	field_data.placeholdertext = field_label; 
					// }

					if (slt == 0 && field_value == '') { 
						jQuery( 'dl.arf-selectpicker-control[data-name="item_meta[' + field_id + ']"]' ).find( 'dd ul li[data-pos="0"] ' ).html( first_label );
						field_label = first_label;
					} else if ( slt == 0 && field_value != '' ) {
						first_value = field_value;
					}
					var is_selected = jQuery( "#fieldcheck_" + field_id + "-" + slt ).is( ':checked' ) ? "selected='selected'" : "";
					field_li_html  += "<li data-value='" + field_value + "' data-label='" + field_label + "'>" + field_label + "</li>";
					if (jQuery( "#fieldcheck_" + field_id + "-" + slt ).is( ':checked' )) {
						default_values = field_value;
					}
				}
				var update_opt = false;
				if ( '' == default_values && '' != first_value ) {
					default_values = first_value;
					update_opt     = true;
				}
				jQuery( 'dl.arf-selectpicker-control[data-name="item_meta[' + field_id + ']"]' ).find( 'dd ul' ).html( field_li_html );
				jQuery( 'input.arf-selectpicker-input-control[name="item_meta[' + field_id + ']"]' ).val( default_values );
				let selected_label = jQuery( 'dl.arf-selectpicker-control[data-name="item_meta[' + field_id + ']"]' ).find( 'dd ul li[data-value="' + default_values + '"]' ).attr( 'data-label' );
				if ( 'material_outlined' != inputStyle || update_opt ) {
					jQuery( 'dl.arf-selectpicker-control[data-name="item_meta[' + field_id + ']"]' ).find( 'dt span' ).html( selected_label );
				}
				field_data.default_value = default_values;
			break;
		}
		field_data = JSON.stringify( field_data );
		jQuery( "#arf_field_data_" + field_id ).val( field_data ).trigger( 'change' );
		arfliteheightdiv( 'individual', field_id );
		jQuery( '.arf_field_values_model:not(#arf_field_values_model_skeleton) .arf_field_values_content_row' ).html( rowHtml );
		jQuery( 'div#arfmainfieldid_' + field_id ).parent().css( 'z-index', '' );
		jQuery( '.arf_field_values_model:not(#arf_field_values_model_skeleton)' ).removeClass( 'arfactive' );
	}
);
jQuery( document ).on(
	'change',
	'#arf_field_separate_value',
	function() {
		var field_id = jQuery( this ).attr( 'data-field-id' );
		if (jQuery( "#arf_field_use_image[data-field-id='" + field_id + "']" ).is( ":checked" )) {
			return false;
		}
		arflite_initialize_field_opt_grid( field_id, jQuery( this ) );
	}
);

function arflite_initialize_field_opt_grid(field_id, object) {
	if (object.is( ':checked' )) {
		jQuery( "#arf_field_values_model_skeleton_" + field_id ).find( '.arf_field_value_grid_container' ).addClass( 'arf_full_width' );
		jQuery( '#arf_field_values_model_skeleton_' + field_id ).find( '.arf_field_value_grid_header_cell_value' ).addClass( 'arfactive' );
		jQuery( '#arf_field_values_model_skeleton_' + field_id ).find( '.arf_field_value_grid_row_cell_value' ).addClass( 'arfactive' );
	} else {
		jQuery( "#arf_field_values_model_skeleton_" + field_id ).find( '.arf_field_value_grid_container' ).removeClass( 'arf_full_width' );
		jQuery( '#arf_field_values_model_skeleton_' + field_id ).find( '.arf_field_value_grid_header_cell_value' ).removeClass( 'arfactive' );
		jQuery( '#arf_field_values_model_skeleton_' + field_id ).find( '.arf_field_value_grid_row_cell_value' ).removeClass( 'arfactive' );
	}
}
jQuery( document ).on(
	'change',
	'#arf_field_use_image',
	function() {
		var field_id = jQuery( this ).attr( 'data-field-id' );
		arflite_initialize_field_opt_using_image( field_id, jQuery( this ) );
	}
);

function arflite_initialize_field_opt_using_image(field_id, object) {
	if (object.is( ':checked' )) {
		jQuery( "#arf_field_values_model_skeleton_" + field_id ).find( '.arf_field_value_grid_container' ).addClass( 'arf_grid_with_image' );
		jQuery( '#arf_field_separate_value[data-field-id="' + field_id + '"]' ).prop( 'checked', true );
		jQuery( '#arf_field_separate_value[data-field-id="' + field_id + '"]' ).addClass( 'arfcursornotallow' );
		jQuery( '#arf_field_separate_value[data-field-id="' + field_id + '"]' ).attr( 'disabled', 'disabled' );
		jQuery( '#arflite_check_icon' ).show();
		arflite_initialize_field_opt_grid( field_id, jQuery( '#arf_field_separate_value[data-field-id="' + field_id + '"]' ) );
	} else {
		jQuery( '#arf_field_separate_value[data-field-id="' + field_id + '"]' ).removeClass( 'arfcursornotallow' );
		jQuery( '#arf_field_separate_value[data-field-id="' + field_id + '"]' ).removeAttr( 'disabled' );
		jQuery( "#arf_field_values_model_skeleton_" + field_id ).find( '.arf_field_value_grid_container' ).removeClass( 'arf_grid_with_image' );
		jQuery( '#arflite_check_icon' ).hide();
	}
}
jQuery( document ).on(
	'click',
	'.arf_preset_apply_button',
	function() {
		var $this      = jQuery( this );
		var field_id   = $this.attr( 'data-field-id' );
		var field_type = $this.attr( 'data-field-type' );

		var field_data_dynamic = jQuery( "#frm_bulk_options-select-" + field_id ).parents( '.arf_selectpicker_wrapper' ).find( 'li.arflite_field_data_dynamic' );
		var dynamic_field_key  = '';

		field_data_dynamic.each(
			function(){
				if ( jQuery( this ).attr( 'data-value' ) == jQuery( "#frm_bulk_options-select-" + field_id ).val()) {
					dynamic_field_key = jQuery( "#frm_bulk_options-select-" + field_id ).val();
				}
			}
		);

		if ( field_data_dynamic.length > 0 && '' != dynamic_field_key ) {
			arflite_retrieve_dynamic_field_data( field_id, dynamic_field_key );
			return false;
		}

		var field_data = jQuery( "#frm_bulk_options-select-" + field_id ).val();

		if (field_data != '') {
			field_data = arflite_parse_json( field_data );
			jQuery( "#arf_preset_apply_field_loader_" + field_id ).show();
		}
		var show_action_icon = (field_data.length > 0) ? "arf_show_action_icon" : "";
		var separate_value   = jQuery( 'input[name="separate_value"][data-field-id="' + field_id + '"]' ).is( ":checked" );
		var separate_class   = (separate_value) ? "arfactive" : "";
		switch (field_type) {
			case 'checkbox':
				var field_html = "";
				var c          = document.createDocumentFragment();
				if (field_data.length > 0) {
					for (var counter = 0; counter < field_data.length; counter++) {
						var arf_field_data = field_data[counter].split( '|' );
						var field_value    = "";
						var field_label    = "";
						if (arf_field_data.length > 1) {
							field_value = arf_field_data[1];
							field_label = arf_field_data[0];
						} else {
							field_value = field_label = arf_field_data[0];
						}
						var outer_wrapper       = document.createElement( "div" );
						outer_wrapper.className = "arf_field_value_grid_row";
						outer_wrapper.id        = "arfoptionorder_" + field_id + "-" + counter;
						var inner_wrapper       = document.createElement( 'div' );
						inner_wrapper.className = "arf_field_value_grid_row_cell_input";
						var grid_input_wrapper  = document.createElement( "span" );
						var input_wrapper       = document.createElement( "input" );
						var xmlns               = "http://www.w3.org/2000/svg";
						var checkbox_svg        = document.createElementNS( xmlns, "svg" );
						checkbox_svg.setAttributeNS( null, 'width', '18px' );
						checkbox_svg.setAttributeNS( null, 'height', '18px' );
						grid_input_wrapper.className = "arf_custom_checkbox_wrapper arf_center_aligned";
						input_wrapper.type           = "checkbox";
						input_wrapper.className      = "arf_custom_checkbox";
						input_wrapper.id             = "fieldcheck_" + field_id + "-" + counter;
						input_wrapper.name           = "arf_opt_item_meta[" + field_id + "][]";
						input_wrapper.onChange       = "arflitechangesubcheckradio(\"" + field_id + "-" + counter + ",\"" + field_type + "\"\")";
						if (typeof default_options != 'undefined' && default_options.indexOf( field_value ) > -1) {
							input_wrapper.checked = true;
						}
						input_wrapper.value = field_value;
						var check_path      = document.createElementNS( xmlns, "path" );
						var uncheck_path    = document.createElementNS( xmlns, "path" );
						uncheck_path.id     = "arfcheckbox_unchecked";
						check_path.id       = "arfcheckbox_checked";
						uncheck_path.setAttributeNS( null, 'd', 'M15.205,16.852H3.774c-1.262,0-2.285-1.023-2.285-2.286V3.136  c0-1.263,1.023-2.286,2.285-2.286h11.431c1.263,0,2.286,1.023,2.286,2.286v11.43C17.491,15.829,16.467,16.852,15.205,16.852z M15.49,2.851h-12v12h12V2.851z' );
						check_path.setAttributeNS( null, 'd', 'M15.205,16.852H3.774c-1.262,0-2.285-1.023-2.285-2.286V3.136  c0-1.263,1.023-2.286,2.285-2.286h11.431c1.263,0,2.286,1.023,2.286,2.286v11.43C17.491,15.829,16.467,16.852,15.205,16.852z   M15.49,2.851h-12v12h12V2.851z M5.93,6.997l2.557,2.558l4.843-4.843l1.617,1.616l-4.844,4.843l0.007,0.007l-1.616,1.616  l-0.007-0.007l-0.006,0.007l-1.617-1.616l0.007-0.007L4.314,8.614L5.93,6.997z' );
						grid_input_wrapper.appendChild( input_wrapper );
						checkbox_svg.appendChild( uncheck_path );
						checkbox_svg.appendChild( check_path );
						grid_input_wrapper.appendChild( checkbox_svg );
						inner_wrapper.appendChild( grid_input_wrapper );
						outer_wrapper.appendChild( inner_wrapper );
						var inner_wrapper2            = document.createElement( "div" );
						inner_wrapper2.className      = "arf_field_value_grid_row_cell_label";
						inner_wrapper2.style.position = 'relative';
						var editinplaceSpan           = document.createElement( "span" );
						editinplaceSpan.className     = "arf_edit_in_place arffullwidth";
						var editinplaceInput          = document.createElement( "input" );
						editinplaceInput.type         = "text";
						editinplaceInput.name         = "arf_op_label[" + field_id + "][]";
						editinplaceInput.value        = field_label;
						editinplaceInput.className    = "arf_edit_in_place_input inplace_field arf_edit_options_value";
						editinplaceSpan.appendChild( editinplaceInput );
						inner_wrapper2.appendChild( editinplaceSpan );
						if (field_type == 'checkbox' || field_type == 'radio') {
							var image_span       = document.createElement( 'span' );
							image_span.className = "arf_field_value_grid_label_image";
							image_span.id        = "arf_radio_label_image_" + field_id + "-" + counter;
							var image_input      = document.createElement( 'input' );
							image_input.type     = "hidden";
							image_input.id       = "ar_image_op_image_" + field_id + "-" + counter;
							image_input.name     = "arf_op_label_image_" + field_id + "[]";
							inner_wrapper2.appendChild( image_span );
							inner_wrapper2.appendChild( image_input );
						}
						var inputimageButton       = document.createElement( 'span' );
						inputimageButton.className = "arf_radio_image_edit";
						inputimageButton.id        = "add_img_id_" + field_id + "-" + counter;
						inputimageButton.setAttribute( 'onClick', 'arflite_add_checkbox_img(jQuery(this));' );
						var inputimageButtonSvg = document.createElementNS( xmlns, "svg" );
						inputimageButtonSvg.setAttributeNS( null, 'width', '20px' );
						inputimageButtonSvg.setAttributeNS( null, 'height', '20px' );
						var inputimageButtonSvgPath = document.createElementNS( xmlns, 'path' );
						inputimageButtonSvgPath.setAttributeNS( null, "fill-rule", "evenodd" );
						inputimageButtonSvgPath.setAttributeNS( null, "clip-rule", "evenodd" );
						inputimageButtonSvgPath.setAttributeNS( null, "fill", "#3f74e7" );
						inputimageButtonSvgPath.setAttributeNS( null, "d", "M17.469,7.115v10.484c0,1.25-1.014,2.264-2.264,2.264H3.75c-1.25,0-2.262-1.014-2.262-2.264V5.082  c0-1.25,1.012-2.264,2.262-2.264h9.518l-2.264,2.001H3.489v13.042h11.979V9.379L17.469,7.115z M15.532,2.451l-0.801,0.8l2.4,2.401  l0.801-0.8L15.532,2.451z M17.131,0.85l-0.799,0.801l2.4,2.4l0.801-0.801L17.131,0.85z M6.731,11.254l2.4,2.4l7.201-7.202  l-2.4-2.401L6.731,11.254z M5.952,14.431h2.264l-2.264-2.264V14.431z" );
						inputimageButtonSvg.appendChild( inputimageButtonSvgPath );
						inputimageButton.appendChild( inputimageButtonSvg );
						inner_wrapper2.appendChild( inputimageButton );
						var inputimageFile       = document.createElement( "input" );
						inputimageFile.type      = "file";
						inputimageFile.className = "original";
						inputimageFile.setAttribute( 'data-val', 'arf_add_radio_radio_label_image_' + field_id + '-' + counter );
						inputimageFile.id            = "arf_radio_add_image_" + field_id + "-" + counter;
						inputimageFile.name          = "arf_radio_img_" + field_id + "-" + counter;
						inputimageFile.style.display = "none";
						inner_wrapper2.appendChild( inputimageFile );
						var inputimageButton       = document.createElement( 'span' );
						inputimageButton.className = "arf_radio_image_delete arflite_hide_delete_box";
						inputimageButton.id        = 'del_img_id_' + field_id + '-' + counter;

						var inputimageButtonSvg = document.createElementNS( xmlns, "svg" );
						inputimageButtonSvg.setAttributeNS( null, 'width', '20px' );
						inputimageButtonSvg.setAttributeNS( null, 'height', '20px' );
						var inputimageButtonSvgPath = document.createElementNS( xmlns, 'path' );
						inputimageButtonSvgPath.setAttributeNS( null, "fill-rule", "evenodd" );
						inputimageButtonSvgPath.setAttributeNS( null, "clip-rule", "evenodd" );
						inputimageButtonSvgPath.setAttributeNS( null, "fill", "#3f74e7" );
						inputimageButtonSvgPath.setAttributeNS( null, "d", "M18.435,4.857L18.413,19.87L3.398,19.88L3.394,4.857H1.489V2.929  h1.601h3.394V0.85h8.921v2.079h3.336h1.601l0,0v1.928H18.435z M15.231,4.857H6.597H5.425l0.012,13.018h10.945l0.005-13.018H15.231z   M11.4,6.845h2.029v9.065H11.4V6.845z M8.399,6.845h2.03v9.065h-2.03V6.845z" );
						inputimageButtonSvg.appendChild( inputimageButtonSvgPath );
						inputimageButton.appendChild( inputimageButtonSvg );
						inner_wrapper2.appendChild( inputimageButton );
						var deleteImagePopup                    = document.createElement( "div" );
						deleteImagePopup.className              = "delete_popup";
						var delete_image_popup_arrow            = document.createElement( "div" );
						delete_image_popup_arrow.className      = "delete_column_arrow";
						delete_image_popup_arrow.style.position = "absolute";
						deleteImagePopup.appendChild( delete_image_popup_arrow );
						var delete_title       = document.createElement( 'div' );
						delete_title.className = "delete_title";
						delete_title.innerHTML = _ARFRADIOCHKIMGMSG;
						delete_title.setAttribute( 'style', 'margin-top:2%' );
						var delete_popup_footer       = document.createElement( 'div' );
						delete_popup_footer.className = "delete_popup_footer";
						var dbtn2                     = document.createElement( "button" );
						dbtn2.type                    = "button";
						dbtn2.className               = "rounded_button delete_button";
						dbtn2.style.background        = "#ce3635";
						dbtn2.id                      = "del_btn_id_" + field_id + '-' + counter;
						dbtn2.setAttribute( 'onclick', 'arflite_delete_checkbox_img(jQuery(this));' );
						dbtn2.appendChild( document.createTextNode( __ARF_YES_TEXT ) );
						var dbtn1       = document.createElement( "button" );
						dbtn1.type      = "button";
						dbtn1.className = "rounded_button arfdelete_color_gray";
						dbtn1.setAttribute( 'onclick', 'jQuery(".delete_popup").removeClass("arfactive");' );
						dbtn1.appendChild( document.createTextNode( __ARF_CANCEL_TEXT ) );
						delete_popup_footer.appendChild( dbtn2 );
						delete_popup_footer.appendChild( document.createTextNode( "\u00A0\u00A0" ) );
						delete_popup_footer.appendChild( dbtn1 );
						delete_title.appendChild( delete_popup_footer );
						deleteImagePopup.appendChild( delete_title );
						inner_wrapper2.appendChild( deleteImagePopup );
						outer_wrapper.appendChild( inner_wrapper2 );
						var inner_wrapper3          = document.createElement( "div" );
						inner_wrapper3_class        = (separate_value == 1) ? "arf_field_value_grid_row_cell_value arfactive" : "arf_field_value_grid_row_cell_value";
						inner_wrapper3.className    = inner_wrapper3_class;
						var editinplaceSpan2        = document.createElement( "span" );
						editinplaceSpan2.className  = "arf_edit_in_place arffullwidth";
						var editinplaceInput2       = document.createElement( "input" );
						editinplaceInput2.type      = "text";
						editinplaceInput2.name      = "arf_op_value[" + field_id + "][]";
						editinplaceInput2.value     = field_value
						editinplaceInput2.className = "arf_edit_in_place_input inplace_field arf_edit_options_value";
						editinplaceSpan2.appendChild( editinplaceInput2 );
						inner_wrapper3.appendChild( editinplaceSpan2 );
						outer_wrapper.appendChild( inner_wrapper3 );
						var action_wrapper       = document.createElement( "div" );
						action_wrapper.className = "arf_field_value_grid_header_cell_action";
						var bulk_add_span        = document.createElement( "span" );
						bulk_add_span.className  = "arf_field_opt_grid_action_bulk_add";
						bulk_add_span.setAttribute( "onclick", "arfliteaddnewfieldoption(\"" + field_id + "\",\"" + field_type + "\")" );
						var bulk_add_svg = document.createElementNS( xmlns, "svg" );
						bulk_add_svg.setAttributeNS( null, "width", "22px" );
						bulk_add_svg.setAttributeNS( null, "height", "22px" );
						bulk_add_path = document.createElementNS( xmlns, "path" );
						bulk_add_path.setAttributeNS( null, "d", "M11.134,20.362c-5.521,0-9.996-4.476-9.996-9.996c0-5.521,4.476-9.997,9.996-9.997s9.996,4.476,9.996,9.997C21.13,15.887,16.654,20.362,11.134,20.362z M11.133,2.314c-4.446,0-8.051,3.604-8.051,8.051c0,4.447,3.604,8.052,8.051,8.052s8.052-3.604,8.052-8.052 C19.185,5.919,15.579,2.314,11.133,2.314z M12.146,14.341h-2v-3h-3v-2h3V6.372h2v2.969h3v2h-3V14.341z" );
						bulk_add_svg.appendChild( bulk_add_path );
						bulk_add_span.appendChild( bulk_add_svg );
						action_wrapper.appendChild( bulk_add_span );
						var bulk_remove_span       = document.createElement( "span" );
						bulk_remove_span.className = "arf_field_opt_grid_action_bulk_remove " + show_action_icon;
						bulk_remove_span.setAttribute( "onclick", "arflitefielddelete_option(\"" + field_id + "\",\"" + field_type + "\",\"" + counter + "\")" );
						var bulk_remove_svg = document.createElementNS( xmlns, "svg" );
						bulk_remove_svg.setAttributeNS( null, "width", "22px" );
						bulk_remove_svg.setAttributeNS( null, "height", "22px" );
						var bulk_remove_path = document.createElementNS( xmlns, "path" );
						bulk_remove_path.setAttributeNS( null, "d", "M11.12,20.389c-5.521,0-9.996-4.476-9.996-9.996c0-5.521,4.476-9.997,9.996-9.997s9.996,4.476,9.996,9.997C21.116,15.913,16.64,20.389,11.12,20.389z M11.119,2.341c-4.446,0-8.051,3.604-8.051,8.051c0,4.447,3.604,8.052,8.051,8.052s8.052-3.604,8.052-8.052C19.17,5.945,15.565,2.341,11.119,2.341z M12.131,11.367h3v-2h-3h-2h-3v2h3H12.131z" );
						bulk_remove_svg.appendChild( bulk_remove_path );
						bulk_remove_span.appendChild( bulk_remove_svg );
						action_wrapper.appendChild( bulk_remove_span );
						var bulk_move_span       = document.createElement( "span" );
						bulk_move_span.className = "arf_field_opt_grid_action_bulk_move " + show_action_icon;
						var bulk_move_svg        = document.createElementNS( xmlns, "svg" );
						bulk_move_svg.setAttributeNS( null, "width", "20px" );
						bulk_move_svg.setAttributeNS( null, "height", "20px" );
						var bulk_move_path = document.createElementNS( xmlns, "path" );
						bulk_move_path.setAttributeNS( null, "d", "M18.401,9.574l-3.092,3.092  c-0.06,0.061-0.139,0.091-0.218,0.091s-0.159-0.03-0.219-0.091c-0.121-0.121-0.121-0.316,0-0.438l2.563-2.564H11.69  c-0.171,0-0.309-0.139-0.309-0.31c0-0.17,0.138-0.309,0.309-0.309h5.746l-2.563-2.564c-0.121-0.121-0.121-0.316,0-0.438  c0.12-0.121,0.316-0.121,0.437,0l3.092,3.092c0.028,0.029,0.051,0.063,0.066,0.101c0.031,0.076,0.031,0.161,0,0.236  C18.452,9.51,18.429,9.544,18.401,9.574z M13.081,4.56c-0.079,0-0.158-0.03-0.218-0.091l-2.563-2.564v5.748  c0,0.171-0.139,0.31-0.31,0.31s-0.31-0.139-0.31-0.31V1.905L7.117,4.469C7.057,4.53,6.978,4.56,6.899,4.56S6.741,4.53,6.68,4.469  c-0.121-0.12-0.121-0.316,0-0.437L9.771,0.94c0.028-0.028,0.063-0.051,0.101-0.066c0.075-0.031,0.161-0.031,0.236,0  c0.038,0.016,0.072,0.038,0.101,0.066l3.091,3.093c0.121,0.12,0.121,0.316,0,0.437C13.239,4.53,13.161,4.56,13.081,4.56z   M2.543,9.045H8.29c0.171,0,0.309,0.139,0.309,0.309c0,0.171-0.138,0.31-0.309,0.31H2.543l2.563,2.564  c0.121,0.121,0.121,0.316,0,0.438c-0.06,0.061-0.139,0.091-0.218,0.091c-0.08,0-0.158-0.03-0.219-0.091L1.58,9.574  C1.55,9.544,1.528,9.51,1.512,9.472c-0.031-0.075-0.031-0.16,0-0.236C1.528,9.198,1.55,9.164,1.58,9.135L4.67,6.043  c0.12-0.121,0.316-0.121,0.437,0c0.121,0.121,0.121,0.316,0,0.438L2.543,9.045z M7.117,14.239l2.563,2.564v-5.747  c0-0.171,0.139-0.31,0.31-0.31s0.31,0.139,0.31,0.31v5.747l2.563-2.564c0.121-0.12,0.315-0.12,0.437,0  c0.121,0.121,0.121,0.316,0,0.438l-3.091,3.092c-0.028,0.029-0.063,0.052-0.101,0.067S10.03,17.86,9.99,17.86  s-0.08-0.009-0.118-0.024s-0.072-0.038-0.101-0.067L6.68,14.676c-0.121-0.121-0.121-0.316,0-0.438  C6.801,14.119,6.997,14.119,7.117,14.239z" );
						bulk_move_svg.appendChild( bulk_move_path );
						bulk_move_span.appendChild( bulk_move_svg );
						action_wrapper.appendChild( bulk_move_span );
						outer_wrapper.appendChild( action_wrapper );
						c.appendChild( outer_wrapper );
					}
					document.getElementById( "arf_field_value_grid_data_wrapper_" + field_id ).innerHTML = '';
					document.getElementById( "arf_field_value_grid_data_wrapper_" + field_id ).appendChild( c );
					document.getElementById( "arf_field_value_grid_data_wrapper_" + field_id ).setAttribute( 'data-option-counter', (parseInt( field_data.length ) - 1) );
					jQuery( "#arf_preset_apply_field_loader_" + field_id ).hide();
				}
				break;
			case 'radio':
				var field_html = "";
				var c          = document.createDocumentFragment();
				if (field_data.length > 0) {
					for (var counter = 0; counter < field_data.length; counter++) {
						var arf_field_data = field_data[counter].split( '|' );
						var field_value    = "";
						var field_label    = "";
						if (arf_field_data.length > 1) {
							field_value = arf_field_data[1];
							field_label = arf_field_data[0];
						} else {
							field_value = field_label = arf_field_data[0];
						}
						var outer_wrapper       = document.createElement( "div" );
						outer_wrapper.className = "arf_field_value_grid_row";
						outer_wrapper.id        = "arfoptionorder_" + field_id + "-" + counter;
						var inner_wrapper       = document.createElement( 'div' );
						inner_wrapper.className = "arf_field_value_grid_row_cell_input";
						var grid_input_wrapper  = document.createElement( "span" );
						var input_wrapper       = document.createElement( "input" );
						var xmlns               = "http://www.w3.org/2000/svg";
						var checkbox_svg        = document.createElementNS( xmlns, "svg" );
						checkbox_svg.setAttributeNS( null, 'width', '18px' );
						checkbox_svg.setAttributeNS( null, 'height', '18px' );
						grid_input_wrapper.className = "arf_custom_radio_wrapper arf_center_aligned";
						input_wrapper.type           = "radio";
						input_wrapper.className      = "arf_custom_radio";
						input_wrapper.id             = "fieldcheck_" + field_id + "-" + counter;
						input_wrapper.name           = "arf_opt_item_meta[" + field_id + "]";
						input_wrapper.onChange       = "arflitechangesubcheckradio(\"" + field_id + "-" + counter + ",\"" + field_type + "\"\")";
						if (typeof default_options != 'undefined' && default_options.indexOf( field_value ) > -1) {
							input_wrapper.checked = true;
						}
						input_wrapper.value = field_value;
						var check_path      = document.createElementNS( xmlns, "path" );
						var uncheck_path    = document.createElementNS( xmlns, "path" );
						uncheck_path.id     = "arfradio";
						check_path.id       = "arfradio_checked";
						uncheck_path.setAttributeNS( null, 'd', 'M8.03,14.442c-3.864,0-6.997-3.134-6.997-6.998  S4.166,0.446,8.03,0.446s6.997,3.134,6.997,6.998S11.895,14.442,8.03,14.442z M8.029,2.372c-2.801,0-5.071,2.271-5.071,5.072  s2.271,5.072,5.071,5.072c2.802,0,5.073-2.271,5.073-5.072S10.831,2.372,8.029,2.372z' );
						check_path.setAttributeNS( null, 'd', 'M8.03,14.442c-3.864,0-6.997-3.134-6.997-6.998  S4.166,0.446,8.03,0.446s6.997,3.134,6.997,6.998S11.895,14.442,8.03,14.442z M8.029,2.372c-2.801,0-5.071,2.271-5.071,5.072  s2.271,5.072,5.071,5.072c2.802,0,5.073-2.271,5.073-5.072S10.831,2.372,8.029,2.372z M8.03,10.444c-1.657,0-3-1.344-3-3  c0-1.657,1.343-3,3-3c1.656,0,3,1.343,3,3C11.03,9.1,9.687,10.444,8.03,10.444z' );
						grid_input_wrapper.appendChild( input_wrapper );
						checkbox_svg.appendChild( uncheck_path );
						checkbox_svg.appendChild( check_path );
						grid_input_wrapper.appendChild( checkbox_svg );
						inner_wrapper.appendChild( grid_input_wrapper );
						outer_wrapper.appendChild( inner_wrapper );
						var inner_wrapper2            = document.createElement( "div" );
						inner_wrapper2.className      = "arf_field_value_grid_row_cell_label";
						inner_wrapper2.style.position = 'relative';
						var editinplaceSpan           = document.createElement( "span" );
						editinplaceSpan.className     = "arf_edit_in_place arffullwidth";
						var editinplaceInput          = document.createElement( "input" );
						editinplaceInput.type         = "text";
						editinplaceInput.name         = "arf_op_label[" + field_id + "][]";
						editinplaceInput.value        = field_label;
						editinplaceInput.className    = "arf_edit_in_place_input inplace_field arf_edit_options_value";
						editinplaceSpan.appendChild( editinplaceInput );
						inner_wrapper2.appendChild( editinplaceSpan );
						if (field_type == 'checkbox' || field_type == 'radio') {
							var image_span       = document.createElement( 'span' );
							image_span.className = "arf_field_value_grid_label_image";
							image_span.id        = "arf_radio_label_image_" + field_id + "-" + counter;
							var image_input      = document.createElement( 'input' );
							image_input.type     = "hidden";
							image_input.id       = "ar_image_op_image_" + field_id + "-" + counter;
							image_input.name     = "arf_op_label_image_" + field_id + "[]";
							inner_wrapper2.appendChild( image_span );
							inner_wrapper2.appendChild( image_input );
						}
						var inputimageButton       = document.createElement( 'span' );
						inputimageButton.className = "arf_radio_image_edit";
						inputimageButton.id        = "add_img_id_" + field_id + "-" + counter;
						inputimageButton.setAttribute( 'onClick', 'arflite_add_checkbox_img(jQuery(this));' );
						var inputimageButtonSvg = document.createElementNS( xmlns, "svg" );
						inputimageButtonSvg.setAttributeNS( null, 'width', '20px' );
						inputimageButtonSvg.setAttributeNS( null, 'height', '20px' );
						var inputimageButtonSvgPath = document.createElementNS( xmlns, 'path' );
						inputimageButtonSvgPath.setAttributeNS( null, "fill-rule", "evenodd" );
						inputimageButtonSvgPath.setAttributeNS( null, "clip-rule", "evenodd" );
						inputimageButtonSvgPath.setAttributeNS( null, "fill", "#3f74e7" );
						inputimageButtonSvgPath.setAttributeNS( null, "d", "M17.469,7.115v10.484c0,1.25-1.014,2.264-2.264,2.264H3.75c-1.25,0-2.262-1.014-2.262-2.264V5.082  c0-1.25,1.012-2.264,2.262-2.264h9.518l-2.264,2.001H3.489v13.042h11.979V9.379L17.469,7.115z M15.532,2.451l-0.801,0.8l2.4,2.401  l0.801-0.8L15.532,2.451z M17.131,0.85l-0.799,0.801l2.4,2.4l0.801-0.801L17.131,0.85z M6.731,11.254l2.4,2.4l7.201-7.202  l-2.4-2.401L6.731,11.254z M5.952,14.431h2.264l-2.264-2.264V14.431z" );
						inputimageButtonSvg.appendChild( inputimageButtonSvgPath );
						inputimageButton.appendChild( inputimageButtonSvg );
						inner_wrapper2.appendChild( inputimageButton );
						var inputimageFile       = document.createElement( "input" );
						inputimageFile.type      = "file";
						inputimageFile.className = "original";
						inputimageFile.setAttribute( 'data-val', 'arf_add_radio_radio_label_image_' + field_id + '-' + counter );
						inputimageFile.id            = "arf_radio_add_image_" + field_id + "-" + counter;
						inputimageFile.name          = "arf_radio_img_" + field_id + "-" + counter;
						inputimageFile.style.display = "none";
						inner_wrapper2.appendChild( inputimageFile );
						var inputimageButton       = document.createElement( 'span' );
						inputimageButton.className = "arf_radio_image_delete arflite_hide_delete_box";
						inputimageButton.id        = 'del_img_id_' + field_id + '-' + counter;

						var inputimageButtonSvg = document.createElementNS( xmlns, "svg" );
						inputimageButtonSvg.setAttributeNS( null, 'width', '20px' );
						inputimageButtonSvg.setAttributeNS( null, 'height', '20px' );
						var inputimageButtonSvgPath = document.createElementNS( xmlns, 'path' );
						inputimageButtonSvgPath.setAttributeNS( null, "fill-rule", "evenodd" );
						inputimageButtonSvgPath.setAttributeNS( null, "clip-rule", "evenodd" );
						inputimageButtonSvgPath.setAttributeNS( null, "fill", "#3f74e7" );
						inputimageButtonSvgPath.setAttributeNS( null, "d", "M18.435,4.857L18.413,19.87L3.398,19.88L3.394,4.857H1.489V2.929  h1.601h3.394V0.85h8.921v2.079h3.336h1.601l0,0v1.928H18.435z M15.231,4.857H6.597H5.425l0.012,13.018h10.945l0.005-13.018H15.231z   M11.4,6.845h2.029v9.065H11.4V6.845z M8.399,6.845h2.03v9.065h-2.03V6.845z" );
						inputimageButtonSvg.appendChild( inputimageButtonSvgPath );
						inputimageButton.appendChild( inputimageButtonSvg );
						inner_wrapper2.appendChild( inputimageButton );
						var deleteImagePopup                    = document.createElement( "div" );
						deleteImagePopup.className              = "delete_popup";
						var delete_image_popup_arrow            = document.createElement( "div" );
						delete_image_popup_arrow.className      = "delete_column_arrow";
						delete_image_popup_arrow.style.position = "absolute";
						deleteImagePopup.appendChild( delete_image_popup_arrow );
						var delete_title       = document.createElement( 'div' );
						delete_title.className = "delete_title";
						delete_title.innerHTML = _ARFRADIOCHKIMGMSG;
						delete_title.setAttribute( 'style', 'margin-top:2%' );
						var delete_popup_footer       = document.createElement( 'div' );
						delete_popup_footer.className = "delete_popup_footer";
						var dbtn2                     = document.createElement( "button" );
						dbtn2.type                    = "button";
						dbtn2.className               = "rounded_button delete_button";
						dbtn2.style.background        = "#ce3635";
						dbtn2.id                      = "del_btn_id_" + field_id + '-' + counter;
						dbtn2.setAttribute( 'onclick', 'arflite_delete_checkbox_img(jQuery(this));' );
						dbtn2.appendChild( document.createTextNode( __ARF_YES_TEXT ) );
						var dbtn1       = document.createElement( "button" );
						dbtn1.type      = "button";
						dbtn1.className = "rounded_button arfdelete_color_gray";
						dbtn1.setAttribute( 'onclick', 'jQuery(".delete_popup").removeClass("arfactive");' );
						dbtn1.appendChild( document.createTextNode( __ARF_CANCEL_TEXT ) );
						delete_popup_footer.appendChild( dbtn2 );
						delete_popup_footer.appendChild( document.createTextNode( "\u00A0\u00A0" ) );
						delete_popup_footer.appendChild( dbtn1 );
						delete_title.appendChild( delete_popup_footer );
						deleteImagePopup.appendChild( delete_title );
						inner_wrapper2.appendChild( deleteImagePopup );
						outer_wrapper.appendChild( inner_wrapper2 );
						var inner_wrapper3          = document.createElement( "div" );
						inner_wrapper3_class        = (separate_value == 1) ? "arf_field_value_grid_row_cell_value arfactive" : "arf_field_value_grid_row_cell_value";
						inner_wrapper3.className    = inner_wrapper3_class;
						var editinplaceSpan2        = document.createElement( "span" );
						editinplaceSpan2.className  = "arf_edit_in_place arffullwidth";
						var editinplaceInput2       = document.createElement( "input" );
						editinplaceInput2.type      = "text";
						editinplaceInput2.name      = "arf_op_value[" + field_id + "][]";
						editinplaceInput2.value     = field_value
						editinplaceInput2.className = "arf_edit_in_place_input inplace_field arf_edit_options_value";
						editinplaceSpan2.appendChild( editinplaceInput2 );
						inner_wrapper3.appendChild( editinplaceSpan2 );
						outer_wrapper.appendChild( inner_wrapper3 );
						var action_wrapper       = document.createElement( "div" );
						action_wrapper.className = "arf_field_value_grid_header_cell_action";
						var bulk_add_span        = document.createElement( "span" );
						bulk_add_span.className  = "arf_field_opt_grid_action_bulk_add";
						bulk_add_span.setAttribute( "onclick", "arfliteaddnewfieldoption(\"" + field_id + "\",\"" + field_type + "\")" );
						var bulk_add_svg = document.createElementNS( xmlns, "svg" );
						bulk_add_svg.setAttributeNS( null, "width", "22px" );
						bulk_add_svg.setAttributeNS( null, "height", "22px" );
						bulk_add_path = document.createElementNS( xmlns, "path" );
						bulk_add_path.setAttributeNS( null, "d", "M11.134,20.362c-5.521,0-9.996-4.476-9.996-9.996c0-5.521,4.476-9.997,9.996-9.997s9.996,4.476,9.996,9.997C21.13,15.887,16.654,20.362,11.134,20.362z M11.133,2.314c-4.446,0-8.051,3.604-8.051,8.051c0,4.447,3.604,8.052,8.051,8.052s8.052-3.604,8.052-8.052 C19.185,5.919,15.579,2.314,11.133,2.314z M12.146,14.341h-2v-3h-3v-2h3V6.372h2v2.969h3v2h-3V14.341z" );
						bulk_add_svg.appendChild( bulk_add_path );
						bulk_add_span.appendChild( bulk_add_svg );
						action_wrapper.appendChild( bulk_add_span );
						var bulk_remove_span       = document.createElement( "span" );
						bulk_remove_span.className = "arf_field_opt_grid_action_bulk_remove " + show_action_icon;
						bulk_remove_span.setAttribute( "onclick", "arflitefielddelete_option(\"" + field_id + "\",\"" + field_type + "\",\"" + counter + "\")" );
						var bulk_remove_svg = document.createElementNS( xmlns, "svg" );
						bulk_remove_svg.setAttributeNS( null, "width", "22px" );
						bulk_remove_svg.setAttributeNS( null, "height", "22px" );
						var bulk_remove_path = document.createElementNS( xmlns, "path" );
						bulk_remove_path.setAttributeNS( null, "d", "M11.12,20.389c-5.521,0-9.996-4.476-9.996-9.996c0-5.521,4.476-9.997,9.996-9.997s9.996,4.476,9.996,9.997C21.116,15.913,16.64,20.389,11.12,20.389z M11.119,2.341c-4.446,0-8.051,3.604-8.051,8.051c0,4.447,3.604,8.052,8.051,8.052s8.052-3.604,8.052-8.052C19.17,5.945,15.565,2.341,11.119,2.341z M12.131,11.367h3v-2h-3h-2h-3v2h3H12.131z" );
						bulk_remove_svg.appendChild( bulk_remove_path );
						bulk_remove_span.appendChild( bulk_remove_svg );
						action_wrapper.appendChild( bulk_remove_span );
						var bulk_move_span       = document.createElement( "span" );
						bulk_move_span.className = "arf_field_opt_grid_action_bulk_move " + show_action_icon;
						var bulk_move_svg        = document.createElementNS( xmlns, "svg" );
						bulk_move_svg.setAttributeNS( null, "width", "20px" );
						bulk_move_svg.setAttributeNS( null, "height", "20px" );
						var bulk_move_path = document.createElementNS( xmlns, "path" );
						bulk_move_path.setAttributeNS( null, "d", "M18.401,9.574l-3.092,3.092  c-0.06,0.061-0.139,0.091-0.218,0.091s-0.159-0.03-0.219-0.091c-0.121-0.121-0.121-0.316,0-0.438l2.563-2.564H11.69  c-0.171,0-0.309-0.139-0.309-0.31c0-0.17,0.138-0.309,0.309-0.309h5.746l-2.563-2.564c-0.121-0.121-0.121-0.316,0-0.438  c0.12-0.121,0.316-0.121,0.437,0l3.092,3.092c0.028,0.029,0.051,0.063,0.066,0.101c0.031,0.076,0.031,0.161,0,0.236  C18.452,9.51,18.429,9.544,18.401,9.574z M13.081,4.56c-0.079,0-0.158-0.03-0.218-0.091l-2.563-2.564v5.748  c0,0.171-0.139,0.31-0.31,0.31s-0.31-0.139-0.31-0.31V1.905L7.117,4.469C7.057,4.53,6.978,4.56,6.899,4.56S6.741,4.53,6.68,4.469  c-0.121-0.12-0.121-0.316,0-0.437L9.771,0.94c0.028-0.028,0.063-0.051,0.101-0.066c0.075-0.031,0.161-0.031,0.236,0  c0.038,0.016,0.072,0.038,0.101,0.066l3.091,3.093c0.121,0.12,0.121,0.316,0,0.437C13.239,4.53,13.161,4.56,13.081,4.56z   M2.543,9.045H8.29c0.171,0,0.309,0.139,0.309,0.309c0,0.171-0.138,0.31-0.309,0.31H2.543l2.563,2.564  c0.121,0.121,0.121,0.316,0,0.438c-0.06,0.061-0.139,0.091-0.218,0.091c-0.08,0-0.158-0.03-0.219-0.091L1.58,9.574  C1.55,9.544,1.528,9.51,1.512,9.472c-0.031-0.075-0.031-0.16,0-0.236C1.528,9.198,1.55,9.164,1.58,9.135L4.67,6.043  c0.12-0.121,0.316-0.121,0.437,0c0.121,0.121,0.121,0.316,0,0.438L2.543,9.045z M7.117,14.239l2.563,2.564v-5.747  c0-0.171,0.139-0.31,0.31-0.31s0.31,0.139,0.31,0.31v5.747l2.563-2.564c0.121-0.12,0.315-0.12,0.437,0  c0.121,0.121,0.121,0.316,0,0.438l-3.091,3.092c-0.028,0.029-0.063,0.052-0.101,0.067S10.03,17.86,9.99,17.86  s-0.08-0.009-0.118-0.024s-0.072-0.038-0.101-0.067L6.68,14.676c-0.121-0.121-0.121-0.316,0-0.438  C6.801,14.119,6.997,14.119,7.117,14.239z" );
						bulk_move_svg.appendChild( bulk_move_path );
						bulk_move_span.appendChild( bulk_move_svg );
						action_wrapper.appendChild( bulk_move_span );
						outer_wrapper.appendChild( action_wrapper );
						c.appendChild( outer_wrapper );
					}
					document.getElementById( "arf_field_value_grid_data_wrapper_" + field_id ).innerHTML = '';
					document.getElementById( "arf_field_value_grid_data_wrapper_" + field_id ).appendChild( c );
					document.getElementById( "arf_field_value_grid_data_wrapper_" + field_id ).setAttribute( 'data-option-counter', (parseInt( field_data.length ) - 1) );
					jQuery( "#arf_preset_apply_field_loader_" + field_id ).hide();
				}
				break;
			case 'select':
				var field_html = "";
				var c          = document.createDocumentFragment();
				if (field_data.length > 0) {
					for (var counter = 0; counter < field_data.length; counter++) {
						var arf_field_data = field_data[counter].split( '|' );
						var field_value    = "";
						var field_label    = "";
						if (arf_field_data.length > 1) {
							field_value = arf_field_data[1];
							field_label = arf_field_data[0];
						} else {
							field_value = field_label = arf_field_data[0];
						}
						var outer_wrapper       = document.createElement( "div" );
						outer_wrapper.className = "arf_field_value_grid_row";
						outer_wrapper.id        = "arfoptionorder_" + field_id + "-" + counter;
						var inner_wrapper       = document.createElement( 'div' );
						inner_wrapper.className = "arf_field_value_grid_row_cell_input";
						var grid_input_wrapper  = document.createElement( "span" );
						var input_wrapper       = document.createElement( "input" );
						var xmlns               = "http://www.w3.org/2000/svg";
						var checkbox_svg        = document.createElementNS( xmlns, "svg" );
						checkbox_svg.setAttributeNS( null, 'width', '18px' );
						checkbox_svg.setAttributeNS( null, 'height', '18px' );
						grid_input_wrapper.className = "arf_custom_radio_wrapper arf_center_aligned";
						input_wrapper.type           = "radio";
						input_wrapper.className      = "arf_custom_radio";
						input_wrapper.id             = "fieldcheck_" + field_id + "-" + counter;
						input_wrapper.name           = "arf_opt_item_meta[" + field_id + "]";
						input_wrapper.onChange       = "arflitechangesubcheckradio(\"" + field_id + "-" + counter + ",\"" + field_type + "\"\")";
						if (typeof default_options != 'undefined' && default_options.indexOf( field_value ) > -1) {
							input_wrapper.checked = true;
						}
						input_wrapper.value = field_value;
						var check_path      = document.createElementNS( xmlns, "path" );
						var uncheck_path    = document.createElementNS( xmlns, "path" );
						uncheck_path.id     = "arfradio";
						check_path.id       = "arfradio_checked";
						uncheck_path.setAttributeNS( null, 'd', 'M8.03,14.442c-3.864,0-6.997-3.134-6.997-6.998  S4.166,0.446,8.03,0.446s6.997,3.134,6.997,6.998S11.895,14.442,8.03,14.442z M8.029,2.372c-2.801,0-5.071,2.271-5.071,5.072  s2.271,5.072,5.071,5.072c2.802,0,5.073-2.271,5.073-5.072S10.831,2.372,8.029,2.372z' );
						check_path.setAttributeNS( null, 'd', 'M8.03,14.442c-3.864,0-6.997-3.134-6.997-6.998  S4.166,0.446,8.03,0.446s6.997,3.134,6.997,6.998S11.895,14.442,8.03,14.442z M8.029,2.372c-2.801,0-5.071,2.271-5.071,5.072  s2.271,5.072,5.071,5.072c2.802,0,5.073-2.271,5.073-5.072S10.831,2.372,8.029,2.372z M8.03,10.444c-1.657,0-3-1.344-3-3  c0-1.657,1.343-3,3-3c1.656,0,3,1.343,3,3C11.03,9.1,9.687,10.444,8.03,10.444z' );
						grid_input_wrapper.appendChild( input_wrapper );
						checkbox_svg.appendChild( uncheck_path );
						checkbox_svg.appendChild( check_path );
						grid_input_wrapper.appendChild( checkbox_svg );
						inner_wrapper.appendChild( grid_input_wrapper );
						outer_wrapper.appendChild( inner_wrapper );
						var inner_wrapper2            = document.createElement( "div" );
						inner_wrapper2.className      = "arf_field_value_grid_row_cell_label";
						inner_wrapper2.style.position = 'relative';
						var editinplaceSpan           = document.createElement( "span" );
						editinplaceSpan.className     = "arf_edit_in_place arffullwidth";
						var editinplaceInput          = document.createElement( "input" );
						editinplaceInput.type         = "text";
						editinplaceInput.name         = "arf_op_label[" + field_id + "][]";
						editinplaceInput.value        = field_label;
						editinplaceInput.className    = "arf_edit_in_place_input inplace_field arf_edit_options_value";
						editinplaceSpan.appendChild( editinplaceInput );
						inner_wrapper2.appendChild( editinplaceSpan );
						var inputimageButton       = document.createElement( 'span' );
						inputimageButton.className = "arf_field_label_image_button_wrapper";
						inputimageButton.id        = "arflite_delete_checkbox_img";
						var inputimageButtonSvg    = document.createElementNS( xmlns, "svg" );
						inputimageButtonSvg.setAttributeNS( null, 'width', '20px' );
						inputimageButtonSvg.setAttributeNS( null, 'height', '20px' );
						var inputimageButtonSvgPath = document.createElementNS( xmlns, 'path' );
						inputimageButtonSvgPath.setAttributeNS( null, "fill-rule", "evenodd" );
						inputimageButtonSvgPath.setAttributeNS( null, "clip-rule", "evenodd" );
						inputimageButtonSvgPath.setAttributeNS( null, "fill", "#3f74e7" );
						inputimageButtonSvgPath.setAttributeNS( null, "d", "M19.028,13.823v3.097c0,0.769-0.623,1.392-1.392,1.392H2.434c-0.769,0-1.392-0.623-1.392-1.392V1.684c0-0.769,0.623-1.392,1.392-1.392h15.202c0.769,0,1.392,0.623,1.392,1.392v12.032l0.041,0.045L19.028,13.823z M17.028,2.286H3.03v13.973h1.099l8.778-9.271l0.829,0.945l3.292,4.021V2.286z M17.028,14.735l-4.352-5.023l-5.955,6.547h10.307V14.735z M6.47,9.159c-1.152,0-2.086-0.934-2.086-2.086c0-1.151,0.934-2.085,2.086-2.085c1.151,0,2.086,0.934,2.086,2.085C8.556,8.226,7.622,9.159,6.47,9.159z" );
						inputimageButtonSvg.appendChild( inputimageButtonSvgPath );
						inputimageButton.appendChild( inputimageButtonSvg );
						var inputimageFile       = document.createElement( "input" );
						inputimageFile.type      = "file";
						inputimageFile.className = "original";
						inputimageFile.setAttribute( 'data-val', 'arf_add_radio_radio_label_image_' + field_id + '-' + counter );
						inputimageFile.id            = "arf_radio_add_image_" + field_id + "-" + counter;
						inputimageFile.name          = "arf_radio_img_" + field_id + "-" + counter;
						inputimageFile.style.display = "none";
						inputimageButton.appendChild( inputimageFile );
						inner_wrapper2.appendChild( inputimageButton );
						var deleteImagePopup                    = document.createElement( "div" );
						deleteImagePopup.className              = "delete_popup";
						var delete_image_popup_arrow            = document.createElement( "div" );
						delete_image_popup_arrow.className      = "delete_column_arrow";
						delete_image_popup_arrow.style.position = "absolute";
						deleteImagePopup.appendChild( delete_image_popup_arrow );
						var delete_title       = document.createElement( 'div' );
						delete_title.className = "delete_title";
						delete_title.innerHTML = __ARF_DELETE_IMAGE_TEXT;
						delete_title.setAttribute( 'style', 'margin-top:2%' );
						var delete_popup_footer       = document.createElement( 'div' );
						delete_popup_footer.className = "delete_popup_footer";
						var dbtn1                     = document.createElement( "button" );
						dbtn1.type                    = "button";
						dbtn1.className               = "rounded_button arf_btn_dark_blue add_button";
						dbtn1.setAttribute( 'onclick', 'arflite_add_checkbox_img(jQuery(this).parent().parent().parent());' );
						dbtn1.appendChild( document.createTextNode( __ARF_ADD_TEXT ) );
						var dbtn2              = document.createElement( "button" );
						dbtn2.type             = "button";
						dbtn2.className        = "rounded_button delete_button";
						dbtn2.style.background = "#ce3635";
						dbtn2.setAttribute( 'onclick', 'arflite_delete_checkbox_img(jQuery(this).parent().parent().parent());' );
						dbtn2.appendChild( document.createTextNode( __ARF_DELETE_TEXT ) );
						delete_popup_footer.appendChild( dbtn1 );
						delete_popup_footer.appendChild( document.createTextNode( "\u00A0\u00A0" ) );
						delete_popup_footer.appendChild( dbtn2 );
						delete_title.appendChild( delete_popup_footer );
						deleteImagePopup.appendChild( delete_title );
						inner_wrapper2.appendChild( deleteImagePopup );
						outer_wrapper.appendChild( inner_wrapper2 );
						var inner_wrapper3          = document.createElement( "div" );
						var inner_wrapper3_class    = (separate_value == 1) ? "arf_field_value_grid_row_cell_value arfactive" : "arf_field_value_grid_row_cell_value";
						inner_wrapper3.className    = inner_wrapper3_class;
						var editinplaceSpan2        = document.createElement( "span" );
						editinplaceSpan2.className  = "arf_edit_in_place arffullwidth";
						var editinplaceInput2       = document.createElement( "input" );
						editinplaceInput2.type      = "text";
						editinplaceInput2.name      = "arf_op_value[" + field_id + "][]";
						editinplaceInput2.value     = field_value
						editinplaceInput2.className = "arf_edit_in_place_input inplace_field arf_edit_options_value";
						editinplaceSpan2.appendChild( editinplaceInput2 );
						inner_wrapper3.appendChild( editinplaceSpan2 );
						outer_wrapper.appendChild( inner_wrapper3 );
						var action_wrapper       = document.createElement( "div" );
						action_wrapper.className = "arf_field_value_grid_header_cell_action";
						var bulk_add_span        = document.createElement( "span" );
						bulk_add_span.className  = "arf_field_opt_grid_action_bulk_add";
						bulk_add_span.setAttribute( "onclick", "arfliteaddnewfieldoption(\"" + field_id + "\",\"" + field_type + "\")" );
						var bulk_add_svg = document.createElementNS( xmlns, "svg" );
						bulk_add_svg.setAttributeNS( null, "width", "22px" );
						bulk_add_svg.setAttributeNS( null, "height", "22px" );
						var bulk_add_path = document.createElementNS( xmlns, "path" );
						bulk_add_path.setAttributeNS( null, "d", "M11.134,20.362c-5.521,0-9.996-4.476-9.996-9.996c0-5.521,4.476-9.997,9.996-9.997s9.996,4.476,9.996,9.997C21.13,15.887,16.654,20.362,11.134,20.362z M11.133,2.314c-4.446,0-8.051,3.604-8.051,8.051c0,4.447,3.604,8.052,8.051,8.052s8.052-3.604,8.052-8.052 C19.185,5.919,15.579,2.314,11.133,2.314z M12.146,14.341h-2v-3h-3v-2h3V6.372h2v2.969h3v2h-3V14.341z" );
						bulk_add_svg.appendChild( bulk_add_path );
						bulk_add_span.appendChild( bulk_add_svg );
						action_wrapper.appendChild( bulk_add_span );
						var bulk_remove_span       = document.createElement( "span" );
						bulk_remove_span.className = "arf_field_opt_grid_action_bulk_remove " + show_action_icon;
						bulk_remove_span.setAttribute( "onclick", "arflitefielddelete_option(\"" + field_id + "\",\"" + field_type + "\",\"" + counter + "\")" );
						var bulk_remove_svg = document.createElementNS( xmlns, "svg" );
						bulk_remove_svg.setAttributeNS( null, "width", "22px" );
						bulk_remove_svg.setAttributeNS( null, "height", "22px" );
						var bulk_remove_path = document.createElementNS( xmlns, "path" );
						bulk_remove_path.setAttributeNS( null, "d", "M11.12,20.389c-5.521,0-9.996-4.476-9.996-9.996c0-5.521,4.476-9.997,9.996-9.997s9.996,4.476,9.996,9.997C21.116,15.913,16.64,20.389,11.12,20.389z M11.119,2.341c-4.446,0-8.051,3.604-8.051,8.051c0,4.447,3.604,8.052,8.051,8.052s8.052-3.604,8.052-8.052C19.17,5.945,15.565,2.341,11.119,2.341z M12.131,11.367h3v-2h-3h-2h-3v2h3H12.131z" );
						bulk_remove_svg.appendChild( bulk_remove_path );
						bulk_remove_span.appendChild( bulk_remove_svg );
						action_wrapper.appendChild( bulk_remove_span );
						var bulk_move_span       = document.createElement( "span" );
						bulk_move_span.className = "arf_field_opt_grid_action_bulk_move " + show_action_icon;
						var bulk_move_svg        = document.createElementNS( xmlns, "svg" );
						bulk_move_svg.setAttributeNS( null, "width", "20px" );
						bulk_move_svg.setAttributeNS( null, "height", "20px" );
						var bulk_move_path = document.createElementNS( xmlns, "path" );
						bulk_move_path.setAttributeNS( null, "d", "M18.401,9.574l-3.092,3.092  c-0.06,0.061-0.139,0.091-0.218,0.091s-0.159-0.03-0.219-0.091c-0.121-0.121-0.121-0.316,0-0.438l2.563-2.564H11.69  c-0.171,0-0.309-0.139-0.309-0.31c0-0.17,0.138-0.309,0.309-0.309h5.746l-2.563-2.564c-0.121-0.121-0.121-0.316,0-0.438  c0.12-0.121,0.316-0.121,0.437,0l3.092,3.092c0.028,0.029,0.051,0.063,0.066,0.101c0.031,0.076,0.031,0.161,0,0.236  C18.452,9.51,18.429,9.544,18.401,9.574z M13.081,4.56c-0.079,0-0.158-0.03-0.218-0.091l-2.563-2.564v5.748  c0,0.171-0.139,0.31-0.31,0.31s-0.31-0.139-0.31-0.31V1.905L7.117,4.469C7.057,4.53,6.978,4.56,6.899,4.56S6.741,4.53,6.68,4.469  c-0.121-0.12-0.121-0.316,0-0.437L9.771,0.94c0.028-0.028,0.063-0.051,0.101-0.066c0.075-0.031,0.161-0.031,0.236,0  c0.038,0.016,0.072,0.038,0.101,0.066l3.091,3.093c0.121,0.12,0.121,0.316,0,0.437C13.239,4.53,13.161,4.56,13.081,4.56z   M2.543,9.045H8.29c0.171,0,0.309,0.139,0.309,0.309c0,0.171-0.138,0.31-0.309,0.31H2.543l2.563,2.564  c0.121,0.121,0.121,0.316,0,0.438c-0.06,0.061-0.139,0.091-0.218,0.091c-0.08,0-0.158-0.03-0.219-0.091L1.58,9.574  C1.55,9.544,1.528,9.51,1.512,9.472c-0.031-0.075-0.031-0.16,0-0.236C1.528,9.198,1.55,9.164,1.58,9.135L4.67,6.043  c0.12-0.121,0.316-0.121,0.437,0c0.121,0.121,0.121,0.316,0,0.438L2.543,9.045z M7.117,14.239l2.563,2.564v-5.747  c0-0.171,0.139-0.31,0.31-0.31s0.31,0.139,0.31,0.31v5.747l2.563-2.564c0.121-0.12,0.315-0.12,0.437,0  c0.121,0.121,0.121,0.316,0,0.438l-3.091,3.092c-0.028,0.029-0.063,0.052-0.101,0.067S10.03,17.86,9.99,17.86  s-0.08-0.009-0.118-0.024s-0.072-0.038-0.101-0.067L6.68,14.676c-0.121-0.121-0.121-0.316,0-0.438  C6.801,14.119,6.997,14.119,7.117,14.239z" );
						bulk_move_svg.appendChild( bulk_move_path );
						bulk_move_span.appendChild( bulk_move_svg );
						action_wrapper.appendChild( bulk_move_span );
						outer_wrapper.appendChild( action_wrapper );
						c.appendChild( outer_wrapper );
					}
					document.getElementById( "arf_field_value_grid_data_wrapper_" + field_id ).innerHTML = '';
					document.getElementById( "arf_field_value_grid_data_wrapper_" + field_id ).appendChild( c );
					document.getElementById( "arf_field_value_grid_data_wrapper_" + field_id ).setAttribute( 'data-option-counter', (parseInt( field_data.length ) - 1) );
					jQuery( "#arf_preset_apply_field_loader_" + field_id ).hide();
				}
				break;
			default:
				if ('function' == typeof window.arflite_fill_preset_field_from_outside) {
					arflite_fill_preset_field_from_outside( field_id, field_type, field_data );
				}
				break;
		}
		jQuery( '.arf_field_values_model_loader' ).remove();
	}
);

function arflite_retrieve_dynamic_field_data(field_id, field_key, dynamic_field_data_page){
	if ( typeof dynamic_field_data_page == 'undefined' || null == dynamic_field_data_page ) {
		dynamic_field_data_page = 1;
	}

	var arflite_wp_nonce = jQuery('#arflite_validation_nonce').val();

	jQuery.ajax(
		{
			type: "POST",
			url: ajaxurl,
			data: "action=arflite_get_field_data_dynamic&field_key=" + field_key + "&arf_page=" + dynamic_field_data_page + '&_wpnonce_arflite=' + arflite_wp_nonce,
			beforeSend: function(){
				if ( jQuery( '.arfactive#arf_field_values_model_skeleton_' + field_id ).find( '.arf_field_values_model_loader' ).length < 1 ) {
					jQuery( '.arfactive#arf_field_values_model_skeleton_' + field_id ).prepend( '<div class="arf_field_values_model_loader"><div class="arf_loader_icon_box"><div class="arf-spinner arf-skeleton arf-grid-loader"></div></div></div>' );
				}
			},
			success: function(response) {
				if (response != '') {
					var obj                = JSON.parse( response );
					var field_data_arr     = JSON.stringify( obj.field_data_dynamic_arr );
					var field_dat_obj      = JSON.parse( field_data_arr );
					var total_data_records = obj.total_records;
					var isRepeat           = obj.continue;

					if ( isRepeat ) {

						var tempdata = ( 1 == dynamic_field_data_page ) ? [] : JSON.parse( jQuery( "#frm_bulk_options-select-" + field_id ).val() );

						field_dat_obj.forEach( element => ( tempdata.push( element ) ) );
						arflite_retrieve_dynamic_field_data( field_id, field_key, ++dynamic_field_data_page );

						jQuery( "#frm_bulk_options-select-" + field_id ).val( JSON.stringify( tempdata ) );
					} else {

						var tempdata = ( 1 == dynamic_field_data_page ) ? [] : JSON.parse( jQuery( "#frm_bulk_options-select-" + field_id ).val() );

						field_dat_obj.forEach( element => ( tempdata.push( element ) ) );
						jQuery( "#frm_bulk_options-select-" + field_id ).val( JSON.stringify( tempdata ) );
						jQuery( '.arfactive#arf_field_values_model_skeleton_' + field_id ).find( '.arf_field_values_model_loader' ).hide();
						jQuery( '.arf_preset_apply_button[data-field-id="' + field_id + '"]' ).trigger( 'click' );

						dynamic_field_data_page = 0;
						jQuery( "#frm_bulk_options-select-" + field_id ).val( field_key );
					}
				} else {
				}
			}
		}
	);
	return false;
}

jQuery( document ).on(
	'click',
	'.arf_enable_new_preset_field_save',
	function() {
		var field_id = jQuery( this ).attr( 'data-field-id' );
		if (jQuery( this ).is( ":checked" )) {
			jQuery( 'input#arf_preset_field_title_' + field_id ).show();
		} else {
			jQuery( 'input#arf_preset_field_title_' + field_id ).hide();
		}
	}
);
jQuery( document ).on(
	'click',
	'.arf_new_preset_apply_button',
	function(e) {
		var $this                 = jQuery( this );
		var field_id              = jQuery( this ).attr( 'data-field-id' );
		var field_type            = jQuery( this ).attr( 'data-field-type' );
		var arf_preset_data       = jQuery( "#arf_preset_data_" + field_id ).val();
		var preset_field_title    = jQuery( "#arf_preset_field_title_" + field_id ).val();
		var file_name             = jQuery( "#arf_preset_data_" + field_id ).attr( 'db_file_name' );
		var file_ext              = arf_preset_data.lastIndexOf( '.' );
		file_ext                  = arf_preset_data.substring( file_ext + 1 );
		var arf_preset_for_future = jQuery( "#arf_preset_future_use_" + field_id ).is( ':checked' ) ? true : false;
		if (arf_preset_data == '' || file_ext.toLowerCase() != 'csv') {
			alert( __ARF_CSV_MSG );
			return false;
		} else if (arf_preset_for_future === true && preset_field_title == '') {
			alert( __ARF_PRESET_FILE_MSG );
			return false;
		} else if (file_name == '' || file_name == 'undefined') {
			return false;
		}
		var arflite_wp_nonce = jQuery( '#arflite_validation_nonce' ).val();
		jQuery.ajax(
			{
				type: "POST",
				url: ajaxurl,
				beforeSend: function(){
					if ( jQuery( '#arf_field_values_model_skeleton_' + field_id ).find( '.arf_field_values_model_loader' ).length < 1 ) {
						jQuery( '#arf_field_values_model_skeleton_' + field_id ).prepend( '<div class="arf_field_values_model_loader"><div class="arf_loader_icon_box"><div class="arf-spinner arf-skeleton arf-grid-loader"></div></div></div>' );
					}
				},
				data: "action=arflite_save_new_preset_field&file_name=" + file_name + "&arf_save_preset_for_future=" + arf_preset_for_future + "&arf_preset_title=" + preset_field_title + "&_wpnonce_arflite=" + arflite_wp_nonce,
				success: function(response) {
					if (response != 'error') {
						jQuery( '#arfshowfieldbulkoptions-' + field_id ).find( '.arf-selectpicker-control dd ul[data-id="frm_bulk_options-select-' + field_id + '"]' ).append( response );
						jQuery( "#arfshowfieldbulkoptions-" + field_id ).find( '.arf-selectpicker-control dd ul li' ).last().trigger( 'click' );
						jQuery( '.arf_preset_apply_button[data-field-id="' + field_id + '"]' ).trigger( 'click' );
					} else {
					}
				}
			}
		);
	}
);
jQuery( document ).on(
	'click',
	'.arf_fainsideimge_ok_button',
	function() {
		var icon         = jQuery( '#icon_icon' ).val();
		var field_id     = jQuery( '#icon_field_id' ).val();
		var type         = jQuery( '#icon_field_type' ).val();
		var no_icon_text = jQuery( '#icon_no_icon' ).val();
		if ((icon == '' || typeof icon == 'undefined') && (typeof no_icon_text != 'undefined')) {
			icon = 'no_icon';
		}
		switch (icon) {
			case 'no_icon':
				arflite_remove_prefix_suffix_icon( field_id, type, no_icon_text );
				break;
			default:
				if (type == 'checkbox') {
					jQuery( '.setting_checkbox' ).find( '.arf_checkbox_input_wrapper' ).find( 'span' ).find( 'i' ).remove();
					setTimeout(
						function() {
							jQuery( '.setting_checkbox' ).find( '.arf_checkbox_input_wrapper' ).find( 'span' ).append( '<i class="' + icon + '"></i>' );
						},
						10
					);
				} else if (type == 'radio') {
					jQuery( '.setting_radio' ).find( '.arf_radio_input_wrapper' ).find( 'span' ).find( 'i' ).remove();
					setTimeout(
						function() {
							jQuery( '.setting_radio' ).find( '.arf_radio_input_wrapper' ).find( 'span' ).append( '<i class="' + icon + '"></i>' );
						},
						10
					);
				}
				arflite_add_prefix_suffix_icon( field_id, type, icon );
				break;
		}
	}
);
jQuery( document ).on(
	'click',
	'.arf_fainsideimge',
	function() {
		jQuery( '.arf_fainsideimge' ).children( 'i' ).removeClass( 'selected_fontawesom_icon' );
		jQuery( '.arf_fainsideimge' ).removeClass( 'selected_fontawsome' );
		jQuery( this ).addClass( 'selected_fontawsome' );
		jQuery( this ).children( 'i' ).addClass( 'selected_fontawesom_icon' );
		var $this        = jQuery( this );
		var icon         = jQuery( this ).attr( 'id' );
		var icon_key     = jQuery( this ).attr( 'data-key' );
		var icon_id      = icon_key + " " + icon;
		var field_id     = jQuery( this ).attr( 'data-id' );
		var type         = jQuery( this ).attr( 'data-field' );
		var no_icon_text = jQuery( this ).attr( 'no_icon_text' );
		if ((icon == '' || typeof icon == 'undefined') && (typeof no_icon_text != 'undefined')) {
			icon = 'no_icon';
		}

		switch (icon) {
			case 'no_icon':
				jQuery( this ).parents( '#arf_fontawesome_model' ).children( '.arf_popup_container_footer' ).children( '#icon_no_icon' ).val( no_icon_text );
				jQuery( this ).parents( '#arf_fontawesome_model' ).children( '.arf_popup_container_footer' ).children( '#icon_field_id' ).val( field_id );
				jQuery( this ).parents( '#arf_fontawesome_model' ).children( '.arf_popup_container_footer' ).children( '#icon_field_type' ).val( type );
				jQuery( this ).parents( '#arf_fontawesome_model' ).children( '.arf_popup_container_footer' ).children( '#icon_icon' ).val( '' );
				break;
			default:
				jQuery( this ).parents( '#arf_fontawesome_model' ).children( '.arf_popup_container_footer' ).children( '#icon_icon' ).val( icon_id );
				jQuery( this ).parents( '#arf_fontawesome_model' ).children( '.arf_popup_container_footer' ).children( '#icon_field_id' ).val( field_id );
				jQuery( this ).parents( '#arf_fontawesome_model' ).children( '.arf_popup_container_footer' ).children( '#icon_field_type' ).val( type );
				break;
		}
	}
);
jQuery( document ).on(
	'click',
	'.arf_cancel_fontawesome',
	function() {
		jQuery( '#icon_icon' ).val( '' );
		jQuery( '#icon_field_id' ).val( '' );
		jQuery( '#icon_field_type' ).val( '' );
		jQuery( '#icon_no_icon' ).val( '' );
		jQuery( '#old_icon' ).val( '' );
	}
);

function arflite_remove_prefix_suffix_icon(field_id, type, no_icon_text) {
	if (type == 'checkbox') {
		jQuery( '#enable_arf_checkbox' ).val( 1 );
		jQuery( '#arf_checkbox_icon' ).val( '' );
		jQuery( '#arf_select_checkbox' ).html( no_icon_text );
		jQuery( '#arf_remove_checkbox' ).show();
	} else if (type == 'radio') {
		jQuery( '#arf_select_radio' ).html( no_icon_text );
		jQuery( '#arf_remove_radio' ).show();
		jQuery( '#enable_arf_radio' ).val( 1 );
		jQuery( '#arf_radio_icon' ).val( '' );
	} else if (type == 'image' || type == 'icon') {
		jQuery( '#arfimage_url_' + field_id ).val( '' );
	} else {
		jQuery( '#arf_select_' + type + '_' + field_id ).html( no_icon_text );
		jQuery( '#enable_arf_' + type + '_' + field_id ).val( 0 );
		jQuery( '#arf_' + type + '_icon_' + field_id ).val( '' );
	}
}

function arflite_add_prefix_suffix_icon(field_id, type, icon) {
	var icon_html = "<i class='" + icon + "'></i>";
	if (type == 'checkbox') {
		jQuery( '#enable_arf_checkbox' ).val( 1 );
		jQuery( '#arf_checkbox_icon' ).val( icon );
		jQuery( '#arf_select_checkbox' ).html( icon_html );
		jQuery( '#arf_remove_checkbox' ).show();
	} else if (type == 'radio') {
		jQuery( '#enable_arf_radio' ).val( 1 );
		jQuery( '#arf_radio_icon' ).val( icon );
		jQuery( '#arf_select_radio' ).html( icon_html );
		jQuery( '#arf_remove_radio' ).show();
	} else if (type == 'image' || type == 'icon') {
		jQuery( '#arfimage_url_' + field_id ).val( icon );
	} else {
		jQuery( '#arf_select_' + type + '_' + field_id ).html( icon_html );
		jQuery( '#enable_arf_' + type + '_' + field_id ).val( 1 );
		jQuery( '#arf_' + type + '_icon_' + field_id ).val( icon );
	}
}

function arflite_add_prefix_suffix_icon_to_control(field_id) {
	var control           = jQuery( "input[name='item_meta[" + field_id + "]']" );
	var field_data        = arflite_retrieve_field_data( field_id );
	var control_id        = control.attr( 'id' );
	var control_wrapper   = control.parents( '.controls' );
	var field_description = control_wrapper.find( '.arf_field_description' );

	var default_value               = field_data.default_value;
	var field_tooltip               = control_wrapper.find( '#tooltip_field_' + field_id );
	var help_block                  = control_wrapper.find( '.help-block' );
	var form_id                     = jQuery( "#arfmainformid" ).val();
	var html                        = "";
	var has_prefix                  = false;
	var has_suffix                  = false;
	var prefix_suffix_style         = "";
	var prefix_icon_html            = "";
	var suffix_icon_html            = "";
	var prefix_suffix_wrapper_start = "";
	var prefix_suffix_wrapper_end   = "";
	var has_prefix_suffix           = false;
	var prefix_suffix_class         = "";
	if (control.hasClass( 'arf_phone_utils' )) {
		var flag_key = 'field_' + field_id;
		if (typeof phone_with_flags[flag_key] != 'undefined') {
			phone_with_flags[flag_key].destroy();
			delete phone_with_flags[flag_key];
		}
	}
	var is_phone_with_flag = false;
	if (field_data.type == 'phone' && field_data.phonetype == 1) {
		is_phone_with_flag = true;
	}
	if (typeof field_data.enable_arf_prefix != 'undefined' && field_data.enable_arf_prefix == 1 && is_phone_with_flag == false) {
		has_prefix        = true;
		has_prefix_suffix = true;
		var prefix_icon   = field_data.arf_prefix_icon;
		prefix_icon_html  = "<span class='arf_editor_prefix_icon'><i class='" + prefix_icon + "'></i></span>";
	}
	if (typeof field_data.enable_arf_suffix != 'undefined' && field_data.enable_arf_suffix == 1) {
		has_suffix        = true;
		has_prefix_suffix = true;
		var suffix_icon   = field_data.arf_suffix_icon;
		suffix_icon_html  = "<span class='arf_editor_suffix_icon'><i class='" + suffix_icon + "'></i></span>";
	}
	if (has_prefix == true && has_suffix == false) {
		prefix_suffix_class = " arf_prefix_only ";
	} else if (has_prefix == false && has_suffix == true) {
		prefix_suffix_class = " arf_suffix_only ";
	} else if (has_prefix == true && has_suffix == true) {
		prefix_suffix_class = " arf_both_pre_suffix ";
	}
	if (has_prefix_suffix) {
		prefix_suffix_wrapper_start = "<div id='arf_editor_prefix_suffix_container_" + field_id + "' class='arf_editor_prefix_suffix_wrapper " + prefix_suffix_class.trim() + "'>";
		prefix_suffix_wrapper_end   = "</div>";
	}

	if (typeof default_value != 'undefined') {
		control = jQuery( control ).attr( 'value', default_value );
	}
	html += prefix_suffix_wrapper_start + prefix_icon_html + control.prop( 'outerHTML' ) + suffix_icon_html + prefix_suffix_wrapper_end;
	if (typeof field_tooltip.prop( 'outerHTML' ) != 'undefined' && field_tooltip.prop( 'outerHTML' ) != null && field_tooltip.prop( 'outerHTML' ) != '') {
		html += field_tooltip.prop( 'outerHTML' );
	}
	if (typeof field_description != 'undefined' && field_description != null && field_description != '') {
		html += field_description.prop( 'outerHTML' );
	}
	if (jQuery( "#arf_editor_prefix_suffix_container_" + field_id ).length > 0) {
		jQuery( "#arf_editor_prefix_suffix_container_" + field_id ).remove();
	} else {
		jQuery( "#" + control_id ).remove();
	}
	jQuery( "#arf_field_prefix_suffix_style_" + field_id ).html( prefix_suffix_style );
	jQuery( "#arf_field_" + field_id ).find( '.arf_field_description' ).remove();
	help_block.before( html );
	if (typeof field_tooltip.prop( 'outerHTML' ) != 'undefined' && field_tooltip.prop( 'outerHTML' ) != null && field_tooltip.prop( 'outerHTML' ) != '') {
		jQuery( '#arf_field_' + field_id ).find( '#tooltip_field_' + field_id + '.arfhelptip' ).each(
			function() {
				jQuery( this ).tipso( 'destroy' );
				var title           = jQuery( this ).attr( 'data-title' );
				var bgcolor         = document.getElementById( 'arf_tooltip_bg_color' ).value;
				var textcolor       = document.getElementById( 'arf_tooltip_font_color' ).value;
				var tooltipposition = jQuery( 'input[name="arflitetippos"]:checked' ).val();
				jQuery( this ).tipso(
					{
						position: tooltipposition,
						width: 'auto',
						useTitle: false,
						content: title,
						background: bgcolor,
						color: textcolor,
						tooltipHover: true
					}
				);
			}
		);
	}
}

function arflite_add_prefix_suffix_icon_to_material_theme_control( field_id ){
	var control    = jQuery( "input[name='item_meta[" + field_id + "]']" );
	var field_data = arflite_retrieve_field_data( field_id );
	var control_id = control.attr( 'id' );

	var parent_el = control.parents( '.arf_material_theme_container' );
	parent_el.find( '.arf_leading_icon' ).remove();
	parent_el.find( '.arf_trailing_icon' ).remove();
	if ( ( typeof field_data.enable_arf_prefix != 'undefined' && field_data.enable_arf_prefix == 1 ) || ( typeof field_data.enable_arf_suffix != 'undefined' && field_data.enable_arf_suffix == 1 ) ) {
		var prefix_icon = field_data.arf_prefix_icon;
		var suffix_icon = field_data.arf_suffix_icon;
		parent_el.removeClass( 'arf_only_leading_icon' );
		parent_el.removeClass( 'arf_only_trailing_icon' );
		parent_el.removeClass( 'arf_both_icons' );
		parent_el.addClass( 'arf_material_theme_container_with_icons' );
		var is_phone_with_flag = false;
		if (field_data.type == 'phone' && field_data.phonetype == 1) {
			is_phone_with_flag = true;
			parent_el.addClass( 'arf_phone_with_flag' );
		} else {
			parent_el.removeClass( 'arf_phone_with_flag' );
		}
		var prefix_icon_html = '';
		var suffix_icon_html = '';

		if ( prefix_icon != '' && is_phone_with_flag == false) {
			prefix_icon_html = '<i class="arf_leading_icon ' + prefix_icon + '"></i>';
		}

		if ( suffix_icon != '' ) {
			suffix_icon_html = '<i class="arf_trailing_icon ' + suffix_icon + '"></i>';
		}

		if ( prefix_icon_html != '' ) {
			parent_el.prepend( prefix_icon_html );
		}

		if ( suffix_icon_html != '' ) {
			parent_el.prepend( suffix_icon_html );
		}

		if ( prefix_icon_html == '' && suffix_icon_html != '' ) {
			parent_el.addClass( 'arf_only_trailing_icon' );
		}

		if ( prefix_icon_html != '' && suffix_icon_html == '' ) {
			parent_el.addClass( 'arf_only_leading_icon' );
		}
		if ( prefix_icon_html != '' && suffix_icon_html != '' ) {
			parent_el.addClass( 'arf_both_icons' );
		}
	}

}

jQuery( document ).on(
	'click',
	'.arf_form_element_item:not(.arflite_pro_form_field)',
	function() {
		var field_id   = jQuery( this ).attr( 'data-field-id' );
		var field_type = jQuery( this ).attr( 'data-type' );
		arfliteaddnewfrmfield( field_id, field_type );

	}
);

jQuery( document ).on(
	'click',
	'.arflite_pro_form_field',
	function() {
		return false;
	}
);

function arflite_load_bootstrap_js_css(field_type, field_id) {
	if (typeof window.TempFields == 'undefined') {
		window.TempFields = [];
	}
	if (window.TempFields.indexOf( field_id ) < 0) {
		window.TempFields.push( field_id );
	}
	if (field_type != '') {
		var arf_main_url = jQuery( "[data-id='arfmainformurl']" ).val();
		var arf_version  = jQuery( "#arfmainformversion" ).val();
		var inputStyle   = jQuery( "#arfmainforminputstyle" ).val();
		var field_data   = arflite_retrieve_field_data( field_id );

		switch (field_type) {
			case 'date':
			case 'time':
				if ( typeof jQuery().datetimepicker == 'function' ) {
					var options = {};
					var classe  = '';
					if (field_type == 'date') {
						var default_data_formate = jQuery( "#frm_date_format" ).val();
						classe                   = 'arf_editor_datetimepicker';
						var dateLocale           = (field_data.locale != '') ? field_data.locale : 'en-US';
						var start_date           = field_data.start_date;
						var end_date             = field_data.end_date;
						var show_min_date        = field_data.arf_show_min_current_date;
						var show_max_date        = field_data.arf_show_max_current_date;
						var date_format          = (default_data_formate != "" && default_data_formate != null) ? default_data_formate : 'MM/DD/YYYY';
						var show_timepicker      = (field_data.show_time_calendar == 1) ? true : false;
						var clock                = field_data.clock;
						var step                 = field_data.step;
						var currentDate          = new Date();
						var dd                   = currentDate.getDate();
						var mm                   = currentDate.getMonth() + 1;
						var yyyy                 = currentDate.getFullYear();
						if (dd < 10) {
							dd = '0' + dd;
						}
						if (mm < 10) {
							mm = '0' + mm;
						}
						var new_currentDate  = dd + '/' + mm + '/' + yyyy;
						var default_date     = field_data.selectdefaultdate;
						var current_date     = field_data.currentdefaultdate;
						var new_default_date = "";
						if (default_date != '') {
							new_default_date = moment( default_date, "DD/MM/YYYY" ).format( date_format );
							if (current_date == 1) {
								new_default_date = moment( new_currentDate, "DD/MM/YYYY" ).format( date_format );
							}
						}
						if (show_timepicker == true) {
							date_format += ' h:mm';
							if (clock == 12) {
								date_format += ' A';
							}
						}
						var options = {
							useCurrent: false,
							keyBinds: "",
							format: date_format,
							locale: dateLocale
						};
						if (start_date != '') {
							options.minDate = moment( start_date + " 00:00 AM", "DD/MM/YYYY h:mm A" ).format( date_format );
						}
						if (end_date != '') {
							options.maxDate = moment( end_date + " 11:59 PM", "DD/MM/YYYY h:mm A" ).format( date_format );
						}
						if (show_min_date != '' && show_min_date == 1) {
							options.minDate = moment( new_currentDate + " 00:00 AM", "DD/MM/YYYY h:mm A" ).format( date_format );
						}
						if (show_max_date != '' && show_max_date == 1) {
							options.maxDate = moment( new_currentDate + " 11:59 PM", "DD/MM/YYYY h:mm A" ).format( date_format );
						}
						if (show_timepicker) {
							options.stepping = step;
						}
						if (field_data.off_days != '') {
							var off_days               = field_data.off_days.split( ',' );
							options.daysOfWeekDisabled = off_days;
						}
						jQuery( 'input[name="item_meta[' + field_id + ']"]' ).val( new_default_date ).trigger( 'change' );
						jQuery( 'input[name="item_meta[' + field_id + ']"]' ).datetimepicker( options );
					}
					if (field_type == 'time') {
						classe     = 'arf_timepicker';
						var clock  = field_data.clock;
						var steps  = field_data.step;
						var timepickerlocalization  = field_data.timepickerlocalization;
						if (typeof timepickerlocalization == "undefined" || timepickerlocalization == "") {
							timepickerlocalization = "en";
						}
						var format = (clock == 12) ? "h:mm A" : "H:mm";
						options    = {
							locale: timepickerlocalization,
							format: format,
							stepping: steps,
						};
						jQuery( 'input[name="item_meta[' + field_id + ']"]' ).datetimepicker( options );
						
						if (typeof field_data.default_hour !== "undefined" && typeof field_data.default_minutes !== "undefined" && field_data.default_hour !== "" && field_data.default_minutes !== "") {
							var d = new Date();
							d.setHours(field_data.default_hour);
							d.setMinutes(field_data.default_minutes);
							var formatted_time = moment(d).locale(timepickerlocalization).format(format);
							jQuery( 'input[name="item_meta[' + field_id + ']"]' ).val( formatted_time );
						}

						jQuery( "input[name='item_meta[" + field_id + "]']" ).on(
							'dp.change',
							function(e) {
								var date                   = new Date( e.date );
								var hour                   = date.getHours();
								var minute                 = date.getMinutes();
								field_data.default_hour    = hour;
								field_data.default_minutes = minute;
								field_data.default_value   = jQuery( 'input[name="item_meta[' + field_id + ']"]' ).val();
								var field_data_update      = JSON.stringify( field_data );
								jQuery( "#arf_field_data_" + field_id ).val( field_data_update );
							}
						);
					}
				}
				break;
			case 'checkbox':
				var total_checkbox = jQuery( '.edit_field_type_checkbox:not(#arfmainfieldid_' + field_id + ')' ).length;
				var checkboxStyle  = jQuery( "#frm_check_radio_style" ).val();
				if (inputStyle == 'material') {
					var chk_class = 'arf_material_checkbox';
					if (checkboxStyle == 'material') {
						chk_class += ' arf_default_material ';
					} else if (checkboxStyle == 'material_tick') {
						chk_class += ' arf_advanced_material ';
					}
					jQuery( "#arfmainfieldid_" + field_id ).find( '.setting_checkbox' ).addClass( chk_class );
				} else if (inputStyle == 'rounded') {
					jQuery( "#arfmainfieldid_" + field_id ).find( '.setting_checkbox' ).addClass( 'arf_rounded_checkbox' );
				} else {
					jQuery( "#arfmainfieldid_" + field_id ).find( '.setting_checkbox' ).addClass( 'arf_standard_checkbox' );
				}
				jQuery( "#editor_checked_checkbox_icon_color" ).trigger( 'change' );
				jQuery( "#frm_check_radio_style" ).trigger( 'change' );
				break;
			case 'radio':
				var total_radio   = jQuery( '.edit_field_type_radio:not(#arfmainfieldid_' + field_id + ')' ).length;
				var checkboxStyle = jQuery( "#frm_check_radio_style" ).val();
				if (inputStyle == 'material') {
					var chk_class = 'arf_material_radio';
					if (checkboxStyle == 'material') {
						chk_class += ' arf_default_material ';
					} else if (checkboxStyle == 'material_tick') {
						chk_class += ' arf_advanced_material ';
					}
					jQuery( "#arfmainfieldid_" + field_id ).find( '.setting_radio' ).addClass( chk_class );
				} else if (inputStyle == 'rounded') {
					jQuery( "#arfmainfieldid_" + field_id ).find( '.setting_radio' ).addClass( 'arf_rounded_radio' );
				} else {
					jQuery( "#arfmainfieldid_" + field_id ).find( '.setting_radio' ).addClass( 'arf_standard_radio' );
				}
				if (jQuery( "#frm_check_radio_style" ).val() == 'custom') {
					jQuery( "#frm_check_radio_style" ).trigger( 'change' );
				}
				jQuery( "#editor_checked_radio_icon_color" ).trigger( 'change' );
				jQuery( "#frm_check_radio_style" ).trigger( 'change' );
				break;
			case 'phone':
				arflite_initialize_control( field_id );
				break;
			default:
				wp.hooks.doAction( 'arflite_load_bootstrap_js_css_from_outside', field_type, field_id, arf_main_url );
				break;
		}

		jQuery( '#arf_field_' + field_id ).find( '.arf_field_icon_tooltip' ).tipso( 'destroy' );
		jQuery( '#arf_field_' + field_id ).find( '.arf_field_icon_tooltip' ).tipso(
			{
				position: 'top',
				maxWidth: '400',
				useTitle: true,
				background: '#444444',
				color: '#ffffff',
				width: 'auto',
				tooltipHover: true,
			}
		);

		jQuery( '#isrequired_' + field_id ).tipso( 'destroy' );
		jQuery( '#isrequired_' + field_id ).attr( 'title', 'Click to mark as compulsory field.' );
		jQuery( '#isrequired_' + field_id ).tipso(
			{
				position: 'top',
				maxWidth: 400,
				useTitle: true,
				background: '#444444',
				color: '#ffffff',
				width: 'auto'
			}
		);

		jQuery( '.tipso_bubble' ).remove();
		setTimeout(
			function (){
				if (jQuery( '.tipso_bubble' ).length > 0) {
					jQuery( '.tipso_bubble' ).remove();
				}
			},
			500
		);

		wp.hooks.doAction( 'arf_add_new_fields_outside', field_type );

	}
}

function arflite_create_script_node(doc, tag, id, url) {
	var js, fjs = doc.getElementsByTagName( tag )[0];
	if (id == '' || doc.getElementById( id )) {
		return;
	}
	js      = doc.createElement( tag );
	js.id   = id;
	js.type = 'text/javascript';
	js.src  = url;
	fjs.parentNode.insertBefore( js, fjs );
}

function arflite_create_style_node(doc, tag, id, url) {
	var css, css_ = doc.getElementsByTagName( tag )[0];
	if (id == '' || doc.getElementById( id )) {
		return;
	}
	css      = doc.createElement( tag );
	css.id   = id;
	css.href = url;
	css.rel  = 'stylesheet';
	css_.parentNode.insertBefore( css, css_ );
}

function arflite_load_external_js_function() {
	let newFieldLength    = (null != document.getElementById( 'new_fields' ) && undefined !== document.getElementById( 'new_fields' ).length) ? document.getElementById( 'new_fields' ).length : jQuery( '#new_fields' ).length;
	window.arf_after_save = false;
	if (typeof arguments != 'undefined' && arguments.length > 0) {
		window.arf_after_save = true;
	}
	if (newFieldLength < 1) {
		return false;
	}
	let innerWrappers = document.getElementById( 'new_fields' ).querySelectorAll( '.sortable_inner_wrapper:not(.arf_confirm_field)' );
	let siwlength     = innerWrappers.length;
	if (newFieldLength > 0 && siwlength > 0) {
		for (let f = 0; f < siwlength; f++) {
			let $this = innerWrappers[f];
			if (arflitehasClass( $this, 'arf_confirm_field' )) {
				return true;
			}
			if ($this.getElementsByClassName( 'arfformfield' ).length == 1) {
				let classes  = $this.getAttribute( 'class' );
				let field_id = $this.getAttribute( 'id' ).replace( 'arfmainfieldid_', '' );
				if ( typeof jQuery().tipso == 'function' ) {
					if (document.getElementById( 'arf_field_' + field_id ) != null) {
						let htipf = document.getElementById( 'arf_field_' + field_id ).querySelector( '#tooltip_field_' + field_id + '.arfhelptip' );
						if (htipf != null) {
							let htipfl = htipf.length;
							for (var hf = 0; hf < htipfl; hf++) {
								let hfield = jQuery( htipf[hf] );
								hfield.tipso( 'destroy' );
								let title      = htipf[hf].getAttribute( 'data-title' );
								let hfield_opt = {
									position: 'top',
									width: 'auto',
									useTitle: false,
									content: title,
									background: '#444444',
									color: '#ffffff',
									tooltipHover: true
								};
								hfield.tipso( hfield_opt );
							}
						}
					}
				}

				let pattern_cls      = /(.*?)(\s+)(edit_field_type_(.*?))(\s+)(.*?)/;
				let match_cls        = classes.match( pattern_cls );
				let allowed_init_cls = [ 'edit_field_type_date', 'edit_field_type_time', 'edit_field_type_phone' ];
				if ( 'undefined' != typeof match_cls && null != match_cls && 'undefined' != match_cls[3] ) {
					let field_class = match_cls[3].trim();
					if ( allowed_init_cls.indexOf( field_class ) > -1 ) {
						arflite_initialize_control( field_id );
					}
				}
			}
		}
	}
}

function arflite_invert_color(rgb) {
	var colors         = rgb.match( /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/ );
	var brightness     = 1;
	var r              = colors[1];
	var g              = colors[2];
	var b              = colors[3];
	var ir             = Math.floor( (255 - r) * brightness );
	var ig             = Math.floor( (255 - g) * brightness );
	var ib             = Math.floor( (255 - b) * brightness );
	var inverted_color = [ir, ig, ib];
	return inverted_color;
}

function arflite_retrieve_field_data(field_id, data_type) {
	var field_data;
	if (typeof data_type == 'undefined') {
		field_data = jQuery( "#arf_field_data_" + field_id ).val();
	} else if (data_type == 'field_options') {
		field_data = jQuery( '#arf_field_data_' + field_id ).attr( 'data-field_options' );
	}
	field_data = arflite_parse_json( field_data );
	return field_data;
}
jQuery( document ).on(
	'click',
	'.arf_date_days_btn',
	function() {
		var offDays    = jQuery( this ).parent().find( 'input[name="off_days"]' ).val();
		var total_days = [];
		if (offDays != '') {
			total_days = offDays.split( ',' );
		}
		if (jQuery( this ).hasClass( 'arf_select' )) {
			jQuery( this ).removeClass( 'arf_select' );
			if (jQuery.inArray( jQuery( this ).attr( 'day_val' ), total_days ) >= 0) {
				total_days.splice( jQuery.inArray( jQuery( this ).attr( 'day_val' ), total_days ), 1 );
			}
		} else {
			jQuery( this ).addClass( 'arf_select' );
			if (jQuery.inArray( jQuery( this ).attr( 'day_val' ), total_days ) < 0) {
				total_days.push( jQuery( this ).attr( 'day_val' ) );
			}
		}
		jQuery( this ).parent().find( 'input[name="off_days"]' ).val( total_days.sort().toString() );
	}
);
jQuery( document ).on(
	'change',
	'.arf_set_current_date',
	function() {
		var object   = jQuery( this );
		var attr_id  = object.attr( 'id' );
		var field_id = attr_id.replace( 'currentdefaultdate_', '' );
		if (jQuery( "#currentdefaultdatestatus_" + field_id ).val() == 1) {
			jQuery( "#currentdefaultdatestatus_" + field_id ).val( 0 );
			jQuery( "#set_current_date_field_" + field_id ).removeAttr( 'readonly' );
		} else {
			jQuery( "#currentdefaultdatestatus_" + field_id ).val( 1 );
			jQuery( "#set_current_date_field_" + field_id ).attr( 'readonly', 'readonly' );
		}
	}
);
jQuery( document ).on(
	'change',
	"#new_fields .controls input[type='checkbox']:not(.arf_switch_input)",
	function() {
		var control     = jQuery( this );
		var control_id  = control.attr( 'id' );
		var pattern     = /((.*?)\_(\d+)\-(\d+))/gi;
		var field_id    = control_id.replace( pattern, '$3' );
		var field_value = control.val();
		var field_data  = arflite_retrieve_field_data( field_id );
		if (field_data == null) {
			return false;
		}
		var default_value  = (typeof field_data.default_value != 'undefined' && field_data.default_value != '') ? field_data.default_value : [];
		var new_field_data = [];
		if (control.is( ':checked' )) {
			if (default_value == null || default_value.length < 1) {
				default_value.push( field_value );
			} else if (default_value != null && default_value.indexOf( field_value ) < 0) {
				default_value.push( field_value );
			}
			document.getElementById( control_id ).setAttribute( 'checked', 'checked' );
		} else {
			var val_index = default_value.indexOf( field_value );
			if (val_index > -1) {
				default_value.splice( val_index, 1 );
			}
			document.getElementById( control_id ).removeAttribute( 'checked' );
		}
		field_data.default_value = default_value;
		new_field_data           = JSON.stringify( field_data );
		jQuery( "#arf_field_data_" + field_id ).val( new_field_data ).trigger( 'change' );
	}
);
jQuery( document ).on(
	'change',
	'#new_fields .controls input[type="radio"]',
	function() {
		var control    = jQuery( this );
		var control_id = control.attr( 'id' );

		var pattern     = /((.*?)\_(\d+)\-(\d+))/gi;
		var field_id    = control_id.replace( pattern, '$3' );
		var field_data  = arflite_retrieve_field_data( field_id );
		var field_name  = jQuery( this ).attr( 'name' );
		var checked_val = jQuery( 'input[type="radio"][name="' + field_name + '"]:checked' ).val();
		var checked_id  = jQuery( 'input[type="radio"][name="' + field_name + '"]:checked' ).attr( 'id' );
		jQuery( 'input[type="radio"][name="' + field_name + '"]' ).prop( 'checked',false );
		jQuery( '#' + checked_id ).prop( 'checked', true );
		field_data.default_value = checked_val;
		var new_field_data       = JSON.stringify( field_data );
		jQuery( "#arf_field_data_" + field_id ).val( new_field_data ).trigger( 'change' );
	}
);
jQuery( document ).on(
	'change',
	'#new_fields .controls select',
	function() {
		var control              = jQuery( this );
		var control_id           = control.attr( 'id' );
		var control_name         = control.attr( 'name' );
		var pattern              = /item_meta\[(\d+)\]/gi;
		var field_id             = control_name.replace( pattern, '$1' );
		var field_data           = arflite_retrieve_field_data( field_id );
		field_data.default_value = jQuery( this ).val();
		jQuery( "#" + control_id + " option" ).removeAttr( "selected" );
		jQuery( "#" + control_id + " option[value='" + field_data.default_value + "']" ).attr( 'selected', 'selected' );
		var new_field_data = JSON.stringify( field_data );
		jQuery( "#arf_field_data_" + field_id ).val( new_field_data ).trigger( 'change' );
	}
);

jQuery( document ).on(
	'click',
	'.arf_radio_image_delete',
	function(e) {
		jQuery( '.delete_popup' ).removeClass( 'arfactive' );
		jQuery( this ).siblings( '.delete_popup' ).children( '.delete_title' ).children( '.delete_popup_footer' ).children( '.add_button' ).html( '' );
		jQuery( this ).siblings( '.delete_popup' ).children( '.delete_title' ).children( '.delete_popup_footer' ).children( '.delete_button' ).show();
		jQuery( this ).siblings( '.delete_popup' ).addClass( 'arfactive' );
	}
);

function arflite_add_checkbox_img(fieldid) {
	var checkbox_img_id = fieldid.attr( 'id' ).split( '_' );
	checkbox_img_id     = checkbox_img_id[3];
	jQuery( '#arf_radio_add_image_' + checkbox_img_id ).trigger( 'click' );
	jQuery( '#arf_radio_add_image_' + checkbox_img_id ).change(
		function() {
			if (jQuery( this ).val() != '') {
				jQuery( '#del_img_id_' + checkbox_img_id ).removeClass( 'arflite_hide_delete_box' );
			}
		}
	);
}

function arflite_delete_checkbox_img(fieldid) {
	var checkbox_img_id = fieldid.attr( 'id' ).split( '_' );
	checkbox_img_id     = checkbox_img_id[3];
	jQuery( '#arf_radio_label_image_' + checkbox_img_id ).html( '' );
	jQuery( '#ar_image_op_image_' + checkbox_img_id ).val( '' );
	jQuery( '#arf_radio_add_image_' + checkbox_img_id ).val( '' );
	jQuery( '.delete_popup' ).removeClass( 'arfactive' );
	jQuery( '#arf_radio_image_name' ).val( '' );
	jQuery( '#del_img_id_' + checkbox_img_id ).addClass( 'arflite_hide_delete_box' );
}

jQuery( document ).on(
	'click',
	'.arf_bulk_delete_close_btn',
	function() {
		var model_id = jQuery( this ).attr( 'data-dismiss' );
		jQuery( "#delete_bulk_form_message" ).removeClass( 'arfactive' );
		jQuery( "#delete_bulk_form_message" ).parents( '.arf_modal_overlay' ).removeClass( 'arfactive' );
	}
);

function arflite_delete_form_function(form_id) {

	var nonce = jQuery( "#arflite_wp_nonce" ).val();

	jQuery.ajax(
		{
			url: ajaxurl,
			type: 'POST',
			dataType: 'json',
			data: 'action=arflite_delete_form&form_id=' + form_id + '&_wpnonce_arflite=' + nonce,
			beforeSend: function() {
				jQuery( ".arf_loader_icon_wrapper" ).show();
			},
			success: function(response) {
				if (response.error == false) {
					jQuery( "#form_suc_message_des" ).html( response.message );
					arflite_success_msg();
					jQuery( "#delete_form_message" ).parents( '.arf_popup_container' ).removeClass( 'arfactive' );
					jQuery( '#frm_errors' ).delay( 5000 ).fadeOut( 'slow' );
					jQuery( '#delete_form_message' ).removeClass( 'arfactive' );
					jQuery( '#delete_form_message' ).parents( '.arf_modal_overlay' ).removeClass( 'arfactive' );
					var oTable = jQuery( ".arf_manage_grid_tbl" ).DataTable();
					var row    = jQuery( "tr[data-form-id='" + form_id + "']" )[0];
					oTable.row( row ).remove().draw(); 
				} else {
					jQuery( "#form_error_message_des" ).html( response.message );
					arflite_error_msg();
					jQuery( "#delete_form_message" ).parents( '.arf_popup_container' ).removeClass( 'arfactive' );
					jQuery( '#frm_errors' ).delay( 5000 ).fadeOut( 'slow' );
					jQuery( '#delete_form_message' ).removeClass( 'arfactive' );
					jQuery( '#delete_form_message' ).parents( '.arf_modal_overlay' ).removeClass( 'arfactive' );

				}
				jQuery( ".arf_loader_icon_wrapper" ).hide();
			}
		}
	);
}

function arflite_csv_form_function(form_id) {
	var nonce = jQuery( "#arflite_wp_nonce" ).val();
	jQuery.ajax(
		{
			url: ajaxurl,
			type: 'POST',
			dataType: 'json',
			data: 'action=arflite_csv_form&form_id=' + form_id + '&_wpnonce_arflite=' + nonce,
			success: function(response) {
				window.location = response.url_data;
				if (response.error == false) {
					jQuery( "#form_suc_message_des" ).html( response.message );
					arflite_success_msg();
					jQuery( "#delete_form_message" ).parents( '.arf_popup_container' ).removeClass( 'arfactive' );
					jQuery( '#frm_errors' ).delay( 5000 ).fadeOut( 'slow' );
					jQuery( '#delete_form_message' ).removeClass( 'arfactive' );
					jQuery( '#delete_form_message' ).parents( '.arf_modal_overlay' ).removeClass( 'arfactive' );
				}
			}
		}
	);
}
String.prototype.stripSlashes = function() {
	return this.replace( /\\(.)/mg, "$1" );
}

jQuery( document ).on(
	'change',
	'#arfmainforminputstyle',
	function() {
		var inputType  = jQuery( this ).val();
		var checkStyle = jQuery( "#frm_check_radio_style" ).val();
		if (inputType == 'material') {
			jQuery( '.arf_label_position' ).removeClass( 'arf_success' );
			jQuery( '.arf_label_position' ).removeClass( 'arf_disabled_toggle_button' );
			jQuery( '.arf_label_position.arf_right_position,.arf_label_position.arf_left_position' ).addClass( 'arf_disabled_toggle_button' );
			jQuery( '.arf_label_position.arf_top_position' ).addClass( 'arf_success' );
			jQuery( 'input[name="arfmps"]' ).prop( 'checked',false );
			jQuery( 'input[name="arfmps"][value="top"]' ).prop( 'checked', true );
			jQuery( 'input[name="arfmps"][value="right"]' ).attr( 'disabled', 'disabled' );
			jQuery( 'input[name="arfmps"][value="left"]' ).attr( 'disabled', 'disabled' );
			jQuery( '#arfmainfield_opacity' ).prop( 'checked', true ).trigger( 'change' );
			jQuery( '#arfmainfield_opacity' ).attr( 'disabled', true );
			jQuery( '#arfmainfield_opacity' ).addClass( 'arfcursornotallow' );
			jQuery( '#frm_bg_color' ).parents( '.arf_custom_color_popup_right_item' ).addClass( 'arfdisablediv' );
			jQuery( '#frm_bg_color' ).parents( '.arf_custom_color_popup_right_item' ).find( '.arf_custom_color_popup_picker' ).addClass( 'arfdisablediv' );
			jQuery( '#arfbgcoloractivesetting' ).parents( '.arf_custom_color_popup_right_item' ).addClass( 'arfdisablediv' );
			jQuery( '#arfbgcoloractivesetting' ).parents( '.arf_custom_color_popup_right_item' ).find( '.arf_custom_color_popup_picker' ).addClass( 'arfdisablediv' );
			jQuery( '#arfbgerrorcolorsetting' ).parents( '.arf_custom_color_popup_right_item' ).addClass( 'arfdisablediv' );
			jQuery( '#arfbgerrorcolorsetting' ).parents( '.arf_custom_color_popup_right_item' ).find( '.arf_custom_color_popup_picker' ).addClass( 'arfdisablediv' );
			jQuery( '#prefix_suffix_bg_color' ).parents( '.arf_custom_color_popup_right_item' ).addClass( 'arfdisablediv' );
			jQuery( '#prefix_suffix_bg_color' ).parents( '.arf_custom_color_popup_right_item' ).find( '.arf_custom_color_popup_picker' ).addClass( 'arfdisablediv' );
			jQuery( 'ul[data-id="frm_check_radio_style"]' ).find( 'li[data-value="default"]' ).addClass( 'arfhidden' );
			jQuery( 'ul[data-id="frm_check_radio_style"]' ).find( 'li[data-value="default"]' ).removeClass( 'arfvisible' );
			jQuery( 'ul[data-id="frm_check_radio_style"]' ).find( 'li[data-value="material"]' ).addClass( 'arfvisible' );
			jQuery( 'ul[data-id="frm_check_radio_style"]' ).find( 'li[data-value="material"]' ).removeClass( 'arfhidden' );
			jQuery( 'ul[data-id="frm_check_radio_style"]' ).find( 'li[data-value="material_tick"]' ).addClass( 'arfvisible' );
			jQuery( 'ul[data-id="frm_check_radio_style"]' ).find( 'li[data-value="material_tick"]' ).removeClass( 'arfhidden' );
			if (checkStyle == 'default') {
				var label = jQuery( 'ul[data-id="frm_check_radio_style"]' ).find( 'li[data-value="material"]' ).attr( 'data-label' );
				jQuery( 'dl[data-id="frm_check_radio_style"]' ).find( 'dt' ).find( 'span' ).html( label );
				jQuery( 'dl[data-id="frm_check_radio_style"]' ).find( 'dt' ).find( 'input.arf_autocomplete' ).val( 'material' );
				jQuery( "#frm_check_radio_style" ).val( 'material' );
			}
		} else {
			jQuery( '.arf_label_position' ).removeClass( 'arf_disabled_toggle_button' );
			jQuery( 'input[name="arfmps"]' ).removeAttr( 'disabled' );
			jQuery( '#frm_bg_color' ).parents( '.arf_custom_color_popup_right_item' ).removeClass( 'arfdisablediv' );
			jQuery( '#frm_bg_color' ).parents( '.arf_custom_color_popup_right_item' ).find( '.arf_custom_color_popup_picker' ).removeClass( 'arfdisablediv' );
			jQuery( '#arfbgcoloractivesetting' ).parents( '.arf_custom_color_popup_right_item' ).removeClass( 'arfdisablediv' );
			jQuery( '#arfbgcoloractivesetting' ).parents( '.arf_custom_color_popup_right_item' ).find( '.arf_custom_color_popup_picker' ).removeClass( 'arfdisablediv' );
			jQuery( '#arfbgerrorcolorsetting' ).parents( '.arf_custom_color_popup_right_item' ).removeClass( 'arfdisablediv' );
			jQuery( '#arfbgerrorcolorsetting' ).parents( '.arf_custom_color_popup_right_item' ).find( '.arf_custom_color_popup_picker' ).removeClass( 'arfdisablediv' );
			if (inputType == 'rounded') {
				jQuery( '#prefix_suffix_bg_color' ).parents( '.arf_custom_color_popup_right_item' ).addClass( 'arfdisablediv' );
				jQuery( '#prefix_suffix_bg_color' ).parents( '.arf_custom_color_popup_right_item' ).find( '.arf_custom_color_popup_picker' ).addClass( 'arfdisablediv' );
				jQuery( '#prefix_suffix_icon_color' ).parents( '.arf_custom_color_popup_right_item' ).removeClass( 'arfdisablediv' );
				jQuery( '#prefix_suffix_icon_color' ).parents( '.arf_custom_color_popup_right_item' ).find( '.arf_custom_color_popup_picker' ).removeClass( 'arfdisablediv' );
			} else {
				jQuery( '#prefix_suffix_bg_color' ).parents( '.arf_custom_color_popup_right_item' ).removeClass( 'arfdisablediv' );
				jQuery( '#prefix_suffix_bg_color' ).parents( '.arf_custom_color_popup_right_item' ).find( '.arf_custom_color_popup_picker' ).removeClass( 'arfdisablediv' );
				jQuery( '#prefix_suffix_icon_color' ).parents( '.arf_custom_color_popup_right_item' ).removeClass( 'arfdisablediv' );
				jQuery( '#prefix_suffix_icon_color' ).parents( '.arf_custom_color_popup_right_item' ).find( '.arf_custom_color_popup_picker' ).removeClass( 'arfdisablediv' );
			}
			jQuery( '#arfmainfield_opacity' ).prop( 'checked', false ).trigger( 'change' );
			jQuery( '#arfmainfield_opacity' ).attr( 'disabled', false );
			jQuery( '#arfmainfield_opacity' ).removeClass( 'arfcursornotallow' );
			jQuery( 'ul[data-id="frm_check_radio_style"]' ).find( 'li[data-value="default"]' ).addClass( 'arfvisible' );
			jQuery( 'ul[data-id="frm_check_radio_style"]' ).find( 'li[data-value="default"]' ).removeClass( 'arfhidden' );
			jQuery( 'ul[data-id="frm_check_radio_style"]' ).find( 'li[data-value="material"]' ).addClass( 'arfhidden' );
			jQuery( 'ul[data-id="frm_check_radio_style"]' ).find( 'li[data-value="material"]' ).removeClass( 'arfvisible' );
			jQuery( 'ul[data-id="frm_check_radio_style"]' ).find( 'li[data-value="material_tick"]' ).addClass( 'arfhidden' );
			jQuery( 'ul[data-id="frm_check_radio_style"]' ).find( 'li[data-value="material_tick"]' ).removeClass( 'arfvisible' );
			if (checkStyle != 'custom' && checkStyle != 'default') {
				var label = jQuery( 'ul[data-id="frm_check_radio_style"]' ).find( 'li[data-value="default"]' ).attr( 'data-label' );
				jQuery( 'dl[data-id="frm_check_radio_style"]' ).find( 'dt' ).find( 'span' ).html( label );
				jQuery( 'dl[data-id="frm_check_radio_style"]' ).find( 'dt' ).find( 'input.arf_autocomplete' ).val( 'default' );
				jQuery( "#frm_check_radio_style" ).val( 'default' );
			}
		}
		if (jQuery( 'input[name="arfmps"]:checked' ).val() == 'top') {
			jQuery( '#arfmainformwidthsetting' ).attr( 'readonly', true );
		}
		jQuery( "#editor_checked_checkbox_icon_color" ).trigger( 'change' );
		jQuery( "#editor_checked_radio_icon_color" ).trigger( 'change' );
	}
);

function arflite_rounded_style(input_style) {
	
	var old_slider_value = jQuery('#arf_input_radius').val();
    var old_slider_value_tablet = jQuery('#arf_input_radius_tablet').val();
    var old_slider_value_mobile = jQuery('#arf_input_radius_mobile').val();
	var checkbox_style   = jQuery( '#frm_check_radio_style' ).val();
	var form_id          = jQuery( "#id" ).val();
	if (input_style == 'rounded') {

		jQuery( '#arflite_border_field_radius' ).attr( 'disabled',true );
		var slider_id           = jQuery( '#arfmainbordersetting_exs' ).attr( 'data-slider-id' );
		var id                  = 'arfmainbordersetting_exs';
		var ac_id               = id.replace( '_exs', '' );
		var slider_val          = 50;
		var slider_val1         = parseFloat( jQuery.trim( slider_val ) );

		jQuery('#arf_arfmainbordersetting_tablet').attr('disabled',true);
        var slider_id_tablet = jQuery('#arfmainbordersetting_exs_tablet').attr('data-slider-id');
        var id_tablet = 'arfmainbordersetting_exs_tablet';
        var ac_id_tablet = id_tablet.replace('_exs_tablet', '_tablet');
        var slider_val_tablet = 50;
        var slider_val_tablet_1 = parseFloat(jQuery.trim(slider_val_tablet));

        jQuery('#arf_arfmainbordersetting_mobile').attr('disabled',true);
        var slider_id_mobile = jQuery('#arfmainbordersetting_exs_mobile').attr('data-slider-id');
        var id_mobile = 'arfmainbordersetting_exs_mobile';
        var ac_id_mobile = id_mobile.replace('_exs_mobile', '_mobile');
        var slider_val_mobile = 50;
        var slider_val_mobile_1 = parseFloat(jQuery.trim(slider_val_mobile));


		var button_border_value = 2;
		jQuery( "#arfsubmitbuttonborderwidhtsetting" ).val( button_border_value ).trigger( 'change' );
		jQuery( "#arfest2" ).trigger( 'click' );
		jQuery( '[name="arfdas"][value="right"]' ).trigger( 'click' );

		jQuery( '#' + slider_id ).trigger( 'mousedown' ).trigger( 'mouseup' );
		jQuery( '#' + slider_id ).trigger( 'slideStop' );
		var border_field_radius = document.getElementById( 'arflite_border_field_radius' );
		border_field_radius.noUiSlider.set( slider_val1 );
		jQuery( '#' + ac_id ).val( slider_val1 );
		var field_border_radius_slider_tablet = document.getElementById('arf_arfmainbordersetting_tablet');
        field_border_radius_slider_tablet.noUiSlider.set(slider_val_tablet_1);
        jQuery('#' + ac_id_tablet).val(slider_val_tablet_1);

        var field_border_radius_slider_mobile = document.getElementById('arf_arfmainbordersetting_mobile');
        field_border_radius_slider_mobile.noUiSlider.set(slider_val_mobile_1);
        jQuery('#' + ac_id_mobile).val(slider_val_mobile_1);

		jQuery( '.arf_fieldset' ).removeClass( 'arf_materialize_form' );
		jQuery( '.arf_fieldset' ).removeClass( 'arf_standard_form' );
		jQuery( '.arf_fieldset' ).addClass( 'arf_rounded_form' );
		jQuery( '.setting_checkbox' ).removeClass( 'arf_standard_checkbox' );
		jQuery( '.setting_checkbox' ).addClass( 'arf_rounded_flat_checkbox' );
		jQuery( '.setting_radio' ).removeClass( 'arf_standard_radio' );
		if (checkbox_style == 'custom') {
			jQuery( '.setting_radio' ).addClass( 'arf_custom_radio' );
		} else {
			jQuery( '.setting_radio' ).addClass( 'arf_rounded_flat_radio' );
		}
		jQuery( '#arflite_vertical_slider' ).attr( 'disabled',false );
		jQuery( "#" + ac_id ).trigger( 'change' );
	} else if (input_style == 'material') {

		var slider_id   = jQuery( '#arfmainbordersetting_exs' ).attr( 'data-slider-id' );
		var id          = 'arfmainbordersetting_exs';
		var ac_id       = id.replace( '_exs', '' );
		var slider_val  = 0;
		var slider_val1 = parseFloat( jQuery.trim( slider_val ) );
		var slider_id_tablet = jQuery('#arfmainbordersetting_exs_tablet').attr('data-slider-id');
        var id_tablet = 'arfmainbordersetting_exs_tablet';
        var ac_id_tablet = id_tablet.replace('_exs_tablet', '_tablet');
        var slider_val_tablet = 0;
        
        var slider_id_mobile = jQuery('#arfmainbordersetting_exs_mobile').attr('data-slider-id');
        var id_mobile = 'arfmainbordersetting_exs_mobile';
        var ac_id_mobile = id_mobile.replace('_exs_mobile', '_mobile');
		jQuery( "#arfest1" ).trigger( 'click' );
		var button_border_value = 2;
		jQuery( "#arfsubmitbuttonborderwidhtsetting" ).val( button_border_value ).trigger( 'change' );
		jQuery( '[name="arfdas"][value="left"]' ).trigger( 'click' );
		jQuery( '#' + slider_id ).trigger( 'mousedown' ).trigger( 'mouseup' );
		jQuery( '#' + slider_id ).trigger( 'slideStop' );
		var field_border_radius = document.getElementById( 'arflite_border_field_radius' );
		field_border_radius.noUiSlider.set( slider_val1 );
		jQuery( '#' + ac_id ).val( slider_val1 );

		var field_border_radius_slider_tablet = document.getElementById('arf_arfmainbordersetting_tablet');
        field_border_radius_slider_tablet.noUiSlider.set(slider_val1_tablet);
        jQuery('#' + ac_id_tablet).val(slider_val1_tablet);

        var field_border_radius_slider_mobile = document.getElementById('arf_arfmainbordersetting_mobile');
        field_border_radius_slider_mobile.noUiSlider.set(slider_val1_mobile);
        jQuery('#' + ac_id_mobile).val(slider_val1_mobile);

		if (jQuery( "#arf_" + form_id + "_input_border_radius" ).length > 0) {
			jQuery( "#arf_" + form_id + "_input_border_radius" ).remove();
		}
		jQuery( "#" + ac_id ).trigger( 'change' );
		jQuery( '.arf_fieldset' ).removeClass( 'arf_standard_form' );
		jQuery( '.arf_fieldset' ).removeClass( 'arf_rounded_form' );
		jQuery( '.arf_fieldset' ).addClass( 'arf_materialize_form' );
		if (jQuery( "#arf_" + form_id + "_field_padding" ).length > 0) {
			jQuery( "#arf_" + form_id + "_field_padding" ).remove();
		}
		setTimeout(
			function() {
				jQuery( "#" + hac_id ).trigger( 'change' );
				arflite_change_field_spacing();
				var hslider_id   = "arffieldinnermarginssetting_2_exsSlider";
				var hid          = "arffieldinnermarginssetting_2_exs";
				var hac_id       = id.replace( '_exs', '' );
				var hslider_val  = 0;
				var hslider_val1 = parseFloat( jQuery.trim( hslider_val ) );
				jQuery( "#" + hslider_id ).trigger( 'mousedown' ).trigger( 'mouseup' );
				jQuery( "#" + hslider_id ).trigger( 'slideStop' );
				var horizontal_slider = document.getElementById( 'arflite_horizontal_slider' );
				horizontal_slider.noUiSlider.set( hslider_val1 );
				jQuery( "#" + hac_id ).val( hslider_val1 );
				var vslider_id   = "arffieldinnermarginssetting_1_exsSlider";
				var vid          = "arffieldinnermarginssetting_1_exs";
				var vac_id       = id.replace( '_exs', '' );
				var vslider_val  = 0;
				var vslider_val1 = parseFloat( jQuery.trim( vslider_val ) );
				jQuery( "#" + vslider_id ).trigger( 'mousedown' ).trigger( 'mouseup' );
				jQuery( "#" + vslider_id ).trigger( 'slideStop' );
				var vertical_slider = document.getElementById( 'arflite_vertical_slider' );
				vertical_slider.noUiSlider.set( vslider_val1 );
				jQuery( "#" + vac_id ).val( vslider_val1 );
			},
			100
		);
		jQuery( '#arflite_border_field_radius' ).attr( 'disabled',true );
		jQuery( '#arf_arfmainbordersetting_tablet' ).attr( 'disabled',true );
		jQuery( '#arf_arfmainbordersetting_mobile' ).attr( 'disabled',true );
		
		jQuery( '#arflite_vertical_slider' ).attr( 'disabled',true );
		if ( 'material' == input_style) {
			arflite_material_style_init();
		}
	} else {
		jQuery( '#arflite_border_field_radius' ).attr( 'disabled',false );
		jQuery( '#arf_arfmainbordersetting_tablet' ).attr( 'disabled',false );
		jQuery( '#arf_arfmainbordersetting_mobile' ).attr( 'disabled',false);
		jQuery( '#arflite_vertical_slider' ).attr( 'disabled',false );
		if (old_slider_value == 0) {
			old_slider_value = 3;
		} else if (old_slider_value == 50 && input_style == 'standard') {
			old_slider_value = 3;
		}
		var button_border_value = 2;
		jQuery( "#arfsubmitbuttonborderwidhtsetting" ).val( button_border_value ).trigger( 'change' );
		jQuery( "#arfest2" ).trigger( 'click' );
		jQuery( '[name="arfdas"][value="right"]' ).trigger( 'click' );
		var slider_id   = jQuery( '#arfmainbordersetting_exs' ).attr( 'data-slider-id' );
		var id          = 'arfmainbordersetting_exs';
		var ac_id       = id.replace( '_exs', '' );
		var slider_val  = old_slider_value;
		var slider_val1 = parseFloat( jQuery.trim( slider_val ) );
		jQuery( '#' + slider_id ).trigger( 'mousedown' ).trigger( 'mouseup' );
		jQuery( '#' + slider_id ).trigger( 'slideStop' );
		var border_field_radius = document.getElementById( 'arflite_border_field_radius' );
		border_field_radius.noUiSlider.set( slider_val1 );
		jQuery( '#' + ac_id ).val( slider_val1 );
		/* tablet */
        var slider_id_tablet = jQuery('#arfmainbordersetting_exs_tablet').attr('data-slider-id');
        var id_tablet = 'arfmainbordersetting_exs_tablet';
        var ac_id_tablet = id_tablet.replace('_exs_tablet', '_tablet');
        var slider_val_tablet = old_slider_value_tablet;
        var slider_val1_tablet = parseFloat(jQuery.trim(slider_val_tablet));
        jQuery('#' + slider_id_tablet).trigger('mousedown').trigger('mouseup');
        jQuery('#' + slider_id_tablet).trigger('slideStop');
        var field_border_radius_slider_tablet = document.getElementById('arf_arfmainbordersetting_tablet');
        field_border_radius_slider_tablet.noUiSlider.set(slider_val1_tablet);
        jQuery('#' + ac_id_tablet).val(slider_val1_tablet);
        /* mobile */
        var slider_id_mobile = jQuery('#arfmainbordersetting_exs_mobile').attr('data-slider-id');
        var id_mobile = 'arfmainbordersetting_exs_mobile';
        var ac_id_mobile = id_mobile.replace('_exs_mobile', '_mobile');
        var slider_val_mobile = old_slider_value_mobile;
        var slider_val1_mobile = parseFloat(jQuery.trim(slider_val_mobile));
        jQuery('#' + slider_id_mobile).trigger('mousedown').trigger('mouseup');
        jQuery('#' + slider_id_mobile).trigger('slideStop');
        var field_border_radius_slider_mobile = document.getElementById('arf_arfmainbordersetting_mobile');
        field_border_radius_slider_mobile.noUiSlider.set(slider_val1_mobile);
        jQuery('#' + ac_id_mobile).val(slider_val1_mobile);
		jQuery( '.arf_fieldset' ).removeClass( 'arf_rounded_form' );
		jQuery( '.arf_fieldset' ).removeClass( 'arf_materialize_form' );
		jQuery( '.arf_fieldset' ).addClass( 'arf_standard_form' );
		jQuery( '.setting_checkbox' ).removeClass( 'arf_rounded_flat_checkbox' );
		jQuery( '.setting_checkbox' ).addClass( 'arf_standard_checkbox' );
		jQuery( '.setting_radio' ).removeClass( 'arf_rounded_flat_radio' );
		jQuery( '.setting_radio' ).addClass( 'arf_standard_radio' );
		jQuery( "#" + ac_id ).trigger( 'change' );
	}
}
jQuery( document ).on(
	'change',
	'#arfsubmitbuttonstyle',
	function(e) {
		var buttonStyle = jQuery( this ).val();
		if (buttonStyle == 'border' || buttonStyle == 'reverse border') {
			jQuery( '#arflite_btn_xoffset_slider' ).attr( 'disabled', true );
			jQuery( '#arflite_btn_yoffset_slider' ).attr( 'disabled', true );
			jQuery( '#arflite_btn_blur_slider' ).attr( 'disabled', true );
			jQuery( '#arflite_spread_slider' ).attr( 'disabled', true );
		} else {
			jQuery( '#arflite_btn_xoffset_slider' ).attr( 'disabled', false );
			jQuery( '#arflite_btn_yoffset_slider' ).attr( 'disabled', false );
			jQuery( '#arflite_btn_blur_slider' ).attr( 'disabled', false );
			jQuery( '#arflite_spread_slider' ).attr( 'disabled', false );
		}
	}
);
jQuery( document ).on(
	'change',
	'#arfmainforminputstyle',
	function(e) {
		var inputStyle = jQuery( this ).val();
		jQuery(".arf_field_border_radius").addClass('arf_disabled');
		var upload_url = jQuery( "#arfuploadurl" ).val();
		var main_url   = jQuery( "[data-id='arfmainformurl']" ).val();
		var css_url    = upload_url + 'maincss';
		var form_id    = jQuery( "#id" ).val();
		var version    = jQuery( "#arfmainformversion" ).val();

		var field_order       = jQuery( "#arf_field_order" ).val();
		var db_field_order    = jQuery( "#arf_field_order" ).attr( 'data-db-field-order' );
		var field_order_saved = arflite_parse_json( field_order );
		var db_f_order        = arflite_parse_json( db_field_order );

		if (db_f_order != null) {
			var difference = arflite_array_diff_key( field_order_saved, db_f_order );
		} else {
			var difference = field_order_saved;
		}

		arfliteaddinnerclasses();

		var field_resize_width = jQuery( "#arf_field_resize_width" ).val();

		var old_date_picker_color = jQuery( '#arfdatepickertextcolorsetting' ).val();
		if (inputStyle != 'material') {
			if( inputStyle == 'standard'){
				jQuery(".arf_field_border_radius").removeClass('arf_disabled');
			}
			var old_verticalslider_value = jQuery( '#arffieldinnermarginsetting_1' ).val();
			if (old_verticalslider_value == 0) {
				old_verticalslider_value = 10;
			}
			var slider_id   = jQuery( '#arffieldinnermarginssetting_1_exs' ).attr( 'data-slider-id' );
			var id          = 'arffieldinnermarginssetting_1_exs';
			var ac_id       = id.replace( '_exs', '' );
			var slider_val  = old_verticalslider_value;
			var slider_val1 = parseFloat( jQuery.trim( slider_val ) );
			jQuery( '#' + slider_id ).trigger( 'mousedown' ).trigger( 'mouseup' );
			jQuery( '#' + slider_id ).trigger( 'slideStop' );
			var vertical_slider_value = document.getElementById( 'arflite_vertical_slider' );
			vertical_slider_value.noUiSlider.set( slider_val1 );
			jQuery( '#arffieldinnermarginsetting_1' ).val( slider_val1 ).trigger( 'change' );
			var vertical              = jQuery( '#arffieldinnermarginsetting_1' ).val();
			var slider_horizonatal_id = jQuery( '#arffieldinnermarginssetting_2_exs' ).attr( 'data-slider-id' );
			var horizantal_id         = 'arffieldinnermarginssetting_2_exs';
			var hc_id                 = horizantal_id.replace( '_exs', '' );
			var hslider_val           = 10;
			var hslider_val1          = parseFloat( jQuery.trim( hslider_val ) );
			jQuery( '#' + slider_horizonatal_id ).trigger( 'mousedown' ).trigger( 'mouseup' );
			jQuery( '#' + slider_horizonatal_id ).trigger( 'slideStop' );
			var horizontal_slider = document.getElementById( 'arflite_horizontal_slider' );
			horizontal_slider.noUiSlider.set( hslider_val1 );
			jQuery( '#arffieldinnermarginsetting_2' ).val( hslider_val1 ).trigger( 'change' );
			var vertical   = jQuery( '#arffieldinnermarginsetting_1' ).val();
			var horizontal = 10;
			var final_val  = vertical + 'px ' + horizontal + 'px ' + vertical + 'px ' + horizontal + 'px';
			jQuery( '#arffieldinnermarginsetting' ).val( final_val ).trigger( 'change' );
			if (old_date_picker_color == '#ffffff' || old_date_picker_color == '#FFFFFF') {
				var date_time_picker_color = '#000000';
				jQuery( '#arfdatepickertextcolorsetting' ).val( date_time_picker_color ).trigger( 'change' );
				jQuery( '#arfdatepickertextcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', date_time_picker_color ).trigger( 'change' );
				jQuery( '#arfdatepickertextcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + date_time_picker_color );
			}
		} else {
			if (old_date_picker_color == '#000000') {
				var date_time_picker_color = '#000000';
				jQuery( '#arfdatepickertextcolorsetting' ).val( date_time_picker_color ).trigger( 'change' );
				jQuery( '#arfdatepickertextcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', date_time_picker_color ).trigger( 'change' );
				jQuery( '#arfdatepickertextcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + date_time_picker_color );
			}
		}
		var arfsack          = new sack( ajaxurl );
		var changed_fields   = jQuery( '#arfchange_field' ).val();
		var arflite_wp_nonce = jQuery( '#arflite_validation_nonce' ).val();
		arfsack.execute      = 0;
		arfsack.method       = 'POST';
		arfsack.setVar( "action", "arflitechangestyle" );
		arfsack.setVar( "style", inputStyle );
		arfsack.setVar( "form_id", form_id );

		arfsack.setVar( "_wpnonce_arflite", arflite_wp_nonce );

		arfsack.setVar( "field_order", field_order );
		arfsack.setVar( "field_resize_width", field_resize_width );

		var field_data = {};

		if (db_f_order != null || field_order_saved != null) {
			var difference_length = Object.keys( difference ).length;
			if (difference_length > 0) {
				for (var x in difference) {
					var tfid = difference[x];
					if (db_f_order == null) {
						var tfid = parseInt( x );
					}
					field_data[tfid] = jQuery( "#arf_field_data_" + tfid ).val();
				}
			}
		}

		if (changed_fields != '') {
			var json_data = arflite_parse_json( changed_fields );
			for (var key in json_data) {
				field_data[json_data[key]] = jQuery( "#arf_field_data_" + json_data[key] ).val();
			}
		}

		if (Object.keys( field_data ).length > 0) {
			field_data = JSON.stringify( field_data );
			arfsack.setVar( "extra_fields", field_data );
		}

		if (jQuery( ".arf_fieldset" ).hasClass( 'arf_materialize_form' ) && inputStyle == 'material') {
			return false;
		}
		if ( ! jQuery( ".arf_fieldset" ).hasClass( 'arf_materialize_form' ) && inputStyle != 'material') {
			jQuery( ".arf_input_style_loader_div" ).removeClass( "active" );
			jQuery( "#arf_input_style_loader" ).removeClass( "active" );
			arflite_rounded_style( inputStyle );
			return false;
		}
		jQuery( ".arf_input_style_loader_div" ).addClass( "active" );
		jQuery( "#arf_input_style_loader" ).addClass( "active" );
		var styling_opts = jQuery( "#arf_form_styling_tools :input,.arf_custom_color_popup_container :input,  .arf_custom_font_popup :input" ).FilterFormData();
		var jsondata     = jQuery.toJSON( styling_opts );
		arfsack.setVar( "styling_opts", jsondata );
		arfsack.onError      = function() {};
		arfsack.onCompletion = arflite_loaded_style;
		arfsack.runAJAX();

		function arflite_loaded_style() {
			jQuery( ".arf_editor_live_css" ).remove();
			var response = arfsack.response;
			response     = arflite_parse_json( response );
			if (response.error == false) {
				jQuery( "#new_fields" ).html( response.content );
				if (inputStyle == 'material') {
					jQuery( '.arf_fieldset' ).removeClass( 'arf_standard_form' );
					jQuery( '.arf_fieldset' ).addClass( 'arf_materialize_form' );
					var css              = css_url + '/maincss_' + form_id + '.css?ver=' + version;
					var material_css     = css_url + '/maincss_materialize_' + form_id + '.css';
					var arf_er_txt_color = "#f71f4f";
					var arf_er_brd_color = "#d7d8d8";
					var arf_er_bck_color = "#ffffff";
					document.getElementById( 'arfformerrorbgcolorsetting' ).value                               = arf_er_bck_color;
					document.querySelector( 'div[data-fid="arfformerrorbgcolorsetting"]' ).style.background     = arf_er_bck_color;
					document.getElementById( 'arfformerrorbordercolorsetting' ).value                           = arf_er_brd_color;
					document.querySelector( 'div[data-fid="arfformerrorbordercolorsetting"]' ).style.background = arf_er_brd_color;
					document.getElementById( 'arfformerrortextcolorsetting' ).value                             = arf_er_txt_color;
					document.querySelector( 'div[data-fid="arfformerrortextcolorsetting"]' ).style.background   = arf_er_txt_color;
					var arf_suc_txt_color = "#24DC67";
					var arf_suc_brd_color = "#D7D8D8";
					var arf_suc_bck_color = "#FFFFFF";
					document.getElementById( 'arfmainsucessbgcolorsetting' ).value                               = arf_suc_bck_color;
					document.querySelector( 'div[data-fid="arfmainsucessbgcolorsetting"]' ).style.background     = arf_suc_bck_color;
					document.getElementById( 'arfmainsucessbordercolorsetting' ).value                           = arf_suc_brd_color;
					document.querySelector( 'div[data-fid="arfmainsucessbordercolorsetting"]' ).style.background = arf_suc_brd_color;
					document.getElementById( 'arfmainsucesstextcolorsetting' ).value                             = arf_suc_txt_color;
					document.querySelector( 'div[data-fid="arfmainsucesstextcolorsetting"]' ).style.background   = arf_suc_txt_color;
					arflite_material_style_init();
				} else {
					jQuery( '.arf_fieldset' ).removeClass( 'arf_materialize_form' );
					jQuery( '.arf_fieldset' ).addClass( 'arf_standard_form' );
					var material_css     = css_url + '/maincss_materialize_' + form_id + '.css';
					var arf_er_txt_color = "#ed4040";
					var arf_er_brd_color = "#f9cfd1";
					var arf_er_bck_color = "#FDECED";
					document.getElementById( 'arfformerrorbgcolorsetting' ).value                               = arf_er_bck_color;
					document.querySelector( 'div[data-fid="arfformerrorbgcolorsetting"]' ).style.background     = arf_er_bck_color;
					document.getElementById( 'arfformerrorbordercolorsetting' ).value                           = arf_er_brd_color;
					document.querySelector( 'div[data-fid="arfformerrorbordercolorsetting"]' ).style.background = arf_er_brd_color;
					document.getElementById( 'arfformerrortextcolorsetting' ).value                             = arf_er_txt_color;
					document.querySelector( 'div[data-fid="arfformerrortextcolorsetting"]' ).style.background   = arf_er_txt_color;
					var arf_suc_txt_color = "#4C4D4E";
					var arf_suc_brd_color = "#BFE0C1";
					var arf_suc_bck_color = "#E0FDE2";
					document.getElementById( 'arfmainsucessbgcolorsetting' ).value                               = arf_suc_bck_color;
					document.querySelector( 'div[data-fid="arfmainsucessbgcolorsetting"]' ).style.background     = arf_suc_bck_color;
					document.getElementById( 'arfmainsucessbordercolorsetting' ).value                           = arf_suc_brd_color;
					document.querySelector( 'div[data-fid="arfmainsucessbordercolorsetting"]' ).style.background = arf_suc_brd_color;
					document.getElementById( 'arfmainsucesstextcolorsetting' ).value                             = arf_suc_txt_color;
					document.querySelector( 'div[data-fid="arfmainsucesstextcolorsetting"]' ).style.background   = arf_suc_txt_color;
				}
				if (jQuery( ".added_new_style_css" ).length > 0) {
					jQuery( ".added_new_style_css" ).html( response.css );
				} else {
					var style = "<style type='text/css' class='added_new_style_css'>";
					style    += response.css;
					style    += "</style>";
					jQuery( "body" ).append( style );
				}
				arflite_rounded_style( inputStyle );
				__arf_jspicker_object = [];
				arflite_load_external_js_function( true );
				jQuery( "#frm_check_radio_style" ).trigger( 'change' );
				arfliteheightdiv( 'all' );
				jQuery( ".arf_input_style_loader_div" ).removeClass( "active" );
				jQuery( "#arf_input_style_loader" ).removeClass( "active" );
				arfliteSetDefaultColumnWidth();
				arflite_initialize_resizable();
			}

			jQuery( ".arf_input_style_loader_div" ).removeClass( "active" );
			jQuery( "#arf_input_style_loader" ).removeClass( "active" );

			jQuery( ".arf_materialize_form .edit_field_type_radio, .arf_materialize_form .edit_field_type_checkbox, .arf_materialize_form .edit_field_type_select,  .arf_materialize_form .edit_field_type_arfslider" ).find( ".arfhelptipfocus" ).each(
				function() {
					jQuery( this ).tipso( "destroy" );
					var dataContent = jQuery( this ).attr( 'data-title' );
					if (dataContent != null || dataContent != undefined) {
						var bgcolor         = document.getElementById( 'arf_tooltip_bg_color' ).value;
						var textcolor       = document.getElementById( 'arf_tooltip_font_color' ).value;
						var tooltipposition = jQuery( 'input[name="arflitetippos"]:checked' ).val();
						jQuery( this ).tipso(
							{
								position: tooltipposition,
								width: 'auto',
								useTitle: false,
								content: dataContent,
								background: bgcolor,
								color: textcolor
							}
						);
					}
				}
			);
			jQuery( '.arftootltip_position' ).each(
				function() {
					jQuery( this ).tipso( 'destroy' );
					var bgcolor         = document.getElementById( 'arf_tooltip_bg_color' ).value;
					var textcolor       = document.getElementById( 'arf_tooltip_font_color' ).value;
					var tooltipposition = jQuery( 'input[name="arflitetippos"]:checked' ).val();
					var dataContent     = jQuery( this ).attr( 'data-title' );
					jQuery( this ).tipso(
						{
							position: tooltipposition,
							width: 'auto',
							useTitle: false,
							content: dataContent,
							background: bgcolor,
							color: textcolor,
						}
					);
				}
			);
			jQuery( ".arf_materialize_form .arfhelptipfocus input,.arf_materialize_form .arfhelptipfocus textarea" ).on(
				"focus",
				function(e) {
					var bgcolor   = document.getElementById( 'arf_tooltip_bg_color' ).value;
					var textcolor = document.getElementById( 'arf_tooltip_font_color' ).value;
					jQuery( this ).parent().parent().each(
						function() {
							jQuery( this ).tipso( 'destroy' );
							var dataContent = jQuery( this ).attr( 'data-title' );
							if (dataContent != null || dataContent != undefined) {
								var tooltipposition   = jQuery( 'input[name="arflitetippos"]:checked' ).val();
								var arftooltip_editor = jQuery( this ).tipso(
									{
										position: tooltipposition,
										width: 'auto',
										useTitle: false,
										content: dataContent,
										background: bgcolor,
										color: textcolor,
									}
								);
								jQuery( this ).tipso( "show" );
								arftooltip_editor.off( "mouseover.tipso" );
								arftooltip_editor.off( "mouseout.tipso" );
							}
						}
					);
				}
			);
			jQuery( ".arf_materialize_form .arfhelptipfocus input,.arf_materialize_form .arfhelptipfocus textarea" ).on(
				"focusout",
				function(e) {
					jQuery( this ).parent().parent().each(
						function() {
							jQuery( this ).tipso( "hide" );
							jQuery( this ).tipso( "destroy" );
						}
					);
				}
			);
		}
	}
);
jQuery( document ).on(
	"change",
	"#frm_check_radio_style",
	function(e) {
		var checkbox_style = jQuery( this ).val();
		var inputStyle     = jQuery( "#arfmainforminputstyle" ).val();
		if (checkbox_style == 'custom') {
			jQuery( '.setting_checkbox' ).removeClass( 'arf_advanced_material' );
			jQuery( '.setting_checkbox' ).removeClass( 'arf_default_material' );
			jQuery( '.setting_radio' ).removeClass( 'arf_advanced_material' );
			jQuery( '.setting_radio' ).removeClass( 'arf_default_material' );
			jQuery( '.setting_checkbox' ).removeClass( 'arf_standard_checkbox' );
			jQuery( '.setting_radio' ).removeClass( 'arf_standard_radio' );
			jQuery( '.setting_checkbox' ).addClass( 'arf_custom_checkbox' );
			jQuery( '.setting_radio' ).removeClass( 'arf_rounded_flat_radio' );
			jQuery( '.setting_radio' ).addClass( 'arf_custom_radio' );
			var checkbox_icon   = jQuery( "#arf_checkbox_icon" ).val();
			var radio_icon      = jQuery( "#arf_radio_icon" ).val();
			var custom_checkbox = "<i class='" + checkbox_icon + "'></i>";
			var custom_radio    = "<i class='" + radio_icon + "'></i>";
			jQuery( ".arf_checkbox_input_wrapper" ).find( 'span' ).find( 'i' ).remove();
			jQuery( ".arf_radio_input_wrapper" ).find( 'span' ).find( 'i' ).remove();
			jQuery( ".arf_checkbox_input_wrapper" ).find( 'span' ).append( custom_checkbox );
			jQuery( ".arf_radio_input_wrapper" ).find( 'span' ).append( custom_radio );
			jQuery( "#editor_checked_checkbox_icon_color" ).trigger( 'change' );
			jQuery( "#editor_checked_radio_icon_color" ).trigger( 'change' );
		} else {
			if (inputStyle == 'material') {
				if (checkbox_style == 'material') {
					jQuery( '.arf_material_checkbox' ).removeClass( 'arf_advanced_material' );
					jQuery( '.arf_material_checkbox' ).addClass( 'arf_default_material' );
					jQuery( '.arf_material_radio' ).removeClass( 'arf_advanced_material' );
					jQuery( '.arf_material_radio' ).addClass( 'arf_default_material' );
					jQuery( '.setting_checkbox' ).removeClass( 'arf_custom_checkbox' );
					jQuery( '.setting_radio' ).removeClass( 'arf_custom_radio' );
					jQuery( '.arf_checkbox_input_wrapper' ).find( 'span' ).find( 'i' ).remove();
					jQuery( '.arf_radio_input_wrapper' ).find( 'span' ).find( 'i' ).remove();
				} else if (checkbox_style == 'material_tick') {
					jQuery( '.arf_material_checkbox' ).removeClass( 'arf_default_material' );
					jQuery( '.arf_material_checkbox' ).addClass( 'arf_advanced_material' );
					jQuery( '.arf_material_radio' ).removeClass( 'arf_default_material' );
					jQuery( '.arf_material_radio' ).addClass( 'arf_advanced_material' );
					jQuery( '.setting_checkbox' ).removeClass( 'arf_custom_checkbox' );
					jQuery( '.setting_radio' ).removeClass( 'arf_custom_radio' );
					jQuery( '.arf_checkbox_input_wrapper' ).find( 'span' ).find( 'i' ).remove();
					jQuery( '.arf_radio_input_wrapper' ).find( 'span' ).find( 'i' ).remove();
				}
			} else if (inputStyle == 'rounded') {
				jQuery( '.setting_checkbox' ).removeClass( 'arf_custom_checkbox' );
				jQuery( '.setting_checkbox' ).removeClass( 'arf_standard_checkbox' );
				jQuery( '.setting_checkbox' ).addClass( 'arf_rounded_flat_checkbox' );
				jQuery( '.arf_checkbox_input_wrapper' ).find( 'span' ).find( 'i' ).remove();
				jQuery( '.setting_radio' ).removeClass( 'arf_custom_radio' );
				jQuery( '.setting_radio' ).removeClass( 'arf_standard_radio' );
				jQuery( '.setting_radio' ).addClass( 'arf_rounded_flat_radio' );
				jQuery( '.arf_radio_input_wrapper' ).find( 'span' ).find( 'i' ).remove();
			} else {
				jQuery( '.setting_checkbox' ).removeClass( 'arf_custom_checkbox' );
				jQuery( '.setting_checkbox' ).removeClass( 'arf_rounded_flat_checkbox' );
				jQuery( '.setting_checkbox' ).addClass( 'arf_standard_checkbox' );
				jQuery( '.arf_checkbox_input_wrapper' ).find( 'span' ).find( 'i' ).remove();
				jQuery( '.setting_radio' ).removeClass( 'arf_custom_radio' );
				jQuery( '.setting_radio' ).removeClass( 'arf_rounded_flat_radio' );
				jQuery( '.setting_radio' ).addClass( 'arf_standard_radio' );
				jQuery( '.arf_radio_input_wrapper' ).find( 'span' ).find( 'i' ).remove();
			}
			jQuery( "#editor_checked_checkbox_icon_color" ).trigger( 'change' );
			jQuery( "#editor_checked_radio_icon_color" ).trigger( 'change' );
		}
	}
);

function arflite_array_diff_key(array1, array2) {
	var difference = [];
	for (var key in array1) {
		if (typeof array2[key] == 'undefined') {
			difference.push( parseInt( key ) );
		}
	}
	return difference;
}
jQuery( document ).on(
	'change',
	'#arffontsizesetting',
	function(e) {
		var this_val  = jQuery( '#arffontsizesetting' ).val();
		var this_val1 = this_val;
		if (this_val <= 20) {
			this_val1 = 20;
		}
		var $form_id             = jQuery( '#id' ).val();
		var checkbox_radio_style = '<style type="text/css" class="arf_editor_checkbox_radio_size" id="arf_editor_checkbox_radio_size">';
		if (this_val > 20) {
			checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_fieldset .arf_horizontal_radio .setting_radio .arf_radio_input_wrapper + label:not(.arf_enable_radio_image) {';
			checkbox_radio_style += 'line-height: 1;';
			checkbox_radio_style += '}';
		}
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_checkbox.arf_custom_checkbox .arf_checkbox_input_wrapper,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_checkbox.arf_custom_checkbox .arf_checkbox_input_wrapper input[type="checkbox"],';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_checkbox.arf_custom_checkbox .arf_checkbox_input_wrapper input[type="checkbox"] + span,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_radio.arf_custom_radio .arf_radio_input_wrapper,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_radio.arf_custom_radio .arf_radio_input_wrapper input[type="radio"],';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_radio.arf_custom_radio .arf_radio_input_wrapper input[type="radio"] + span,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .arfformfield .setting_checkbox.arf_material_checkbox.arf_default_material .arf_checkbox_input_wrapper input[type="checkbox"] + span::after,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_checkbox.arf_material_checkbox.arf_default_material .arf_checkbox_input_wrapper input[type="checkbox"],';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .arfformfield .setting_checkbox.arf_material_checkbox.arf_default_material .arf_checkbox_input_wrapper input[type="checkbox"]:checked + span::after,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_radio.arf_material_radio.arf_default_material .arf_radio_input_wrapper input[type="radio"] + span::before,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_radio.arf_material_radio.arf_default_material .arf_radio_input_wrapper input[type="radio"] + span::after,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_checkbox.arf_material_checkbox.arf_default_material .arf_checkbox_input_wrapper,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_radio.arf_material_radio.arf_default_material .arf_radio_input_wrapper,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_checkbox.arf_material_checkbox.arf_advanced_material .arf_checkbox_input_wrapper input[type="checkbox"],';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_checkbox.arf_material_checkbox.arf_advanced_material .arf_checkbox_input_wrapper input[type="checkbox"]:not(:checked) + span::before,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_checkbox.arf_material_checkbox.arf_advanced_material .arf_checkbox_input_wrapper,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_radio.arf_material_radio.arf_advanced_material .arf_radio_input_wrapper input[type="radio"],';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_radio.arf_material_radio.arf_advanced_material .arf_radio_input_wrapper input[type="radio"] + span::before,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_radio.arf_material_radio.arf_advanced_material .arf_radio_input_wrapper input[type="radio"] + span::after,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_radio.arf_material_radio.arf_advanced_material .arf_radio_input_wrapper,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_checkbox.arf_custom_checkbox .arf_checkbox_input_wrapper,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_checkbox.arf_custom_checkbox .arf_checkbox_input_wrapper input[type="checkbox"],';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_radio.arf_custom_radio .arf_radio_input_wrapper,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_radio.arf_custom_radio .arf_radio_input_wrapper input[type="radio"],';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_checkbox.arf_rounded_flat_checkbox .arf_checkbox_input_wrapper,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_checkbox.arf_rounded_flat_checkbox .arf_checkbox_input_wrapper input[type="checkbox"],';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_radio.arf_rounded_flat_radio .arf_radio_input_wrapper,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_radio.arf_rounded_flat_radio .arf_radio_input_wrapper input[type="radio"],';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_checkbox.arf_standard_checkbox .arf_checkbox_input_wrapper,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_checkbox.arf_standard_checkbox .arf_checkbox_input_wrapper input[type="checkbox"],';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_radio.arf_standard_radio .arf_radio_input_wrapper,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_radio.arf_standard_radio .arf_radio_input_wrapper input[type="radio"],';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_checkbox.arf_custom_checkbox .arf_checkbox_input_wrapper input[type="checkbox"] + span,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_radio.arf_custom_radio .arf_radio_input_wrapper input[type="radio"] + span,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_radio.arf_standard_radio .arf_radio_input_wrapper input[type="radio"] + span,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_radio.arf_rounded_flat_radio .arf_radio_input_wrapper input[type="radio"] + span::before,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_radio.arf_rounded_flat_radio .arf_radio_input_wrapper input[type="radio"] + span::after,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_checkbox.arf_rounded_flat_checkbox .arf_checkbox_input_wrapper input[type="checkbox"] + span,';
		checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_checkbox.arf_standard_checkbox .arf_checkbox_input_wrapper input[type="checkbox"] + span {';
		checkbox_radio_style += 'width:' + this_val1 + 'px !important;';
		checkbox_radio_style += 'height:' + this_val1 + 'px !important;';
		checkbox_radio_style += '}';
		if ((this_val - 14) > 16) {
			checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_radio.arf_custom_radio .arf_radio_input_wrapper input[type="radio"] + span i,';
			checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_checkbox.arf_custom_checkbox .arf_checkbox_input_wrapper input[type="checkbox"] + span i,';
			checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_radio.arf_custom_radio .arf_radio_input_wrapper input[type="radio"] + span i,';
			checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_checkbox.arf_custom_checkbox .arf_checkbox_input_wrapper input[type="checkbox"] + span i{';
			checkbox_radio_style += 'font-size:' + (this_val - 14) + 'px !important;';
			checkbox_radio_style += '}';
		} else {
			checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_radio.arf_custom_radio .arf_radio_input_wrapper input[type="radio"] + span i,';
			checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .setting_checkbox.arf_custom_checkbox .arf_checkbox_input_wrapper input[type="checkbox"] + span i,';
			checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_radio.arf_custom_radio .arf_radio_input_wrapper input[type="radio"] + span i,';
			checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .setting_checkbox.arf_custom_checkbox .arf_checkbox_input_wrapper input[type="checkbox"] + span i{';
			checkbox_radio_style += 'font-size:14px !important;';
			checkbox_radio_style += '}';
		}
		if (document.getElementById( 'arfmainforminputstyle' ).value == 'material') {
			checkbox_radio_style += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .controls .arf_main_label.active{';
			if (this_val >= 38) {
				checkbox_radio_style += 'font-size:' + parseInt( parseInt( this_val ) - 20 ) + 'px !important;';
			} else if (this_val >= 36) {
				checkbox_radio_style += 'font-size:' + parseInt( parseInt( this_val ) - 18 ) + 'px !important;';
			} else if (this_val >= 32) {
				checkbox_radio_style += 'font-size:' + parseInt( parseInt( this_val ) - 16 ) + 'px !important;';
			} else if (this_val >= 30) {
				checkbox_radio_style += 'font-size:' + parseInt( parseInt( this_val ) - 14 ) + 'px !important;';
			} else if (this_val >= 26) {
				checkbox_radio_style += 'font-size:' + parseInt( parseInt( this_val ) - 12 ) + 'px !important;';
			} else if (this_val >= 22) {
				checkbox_radio_style += 'font-size:' + parseInt( parseInt( this_val ) - 10 ) + 'px !important;';
			} else if (this_val >= 20) {
				checkbox_radio_style += 'font-size:' + parseInt( parseInt( this_val ) - 8 ) + 'px !important;';
			} else if (this_val >= 16) {
				checkbox_radio_style += 'font-size:12px !important;';
			} else if (this_val >= 8) {
				checkbox_radio_style += 'font-size:' + parseInt( parseInt( this_val ) - 2 ) + 'px !important;';
			} else {
				checkbox_radio_style += 'font-size:' + parseInt( parseInt( this_val ) - 1 ) + 'px !important;';
			}
			checkbox_radio_style += '}';
		}
		checkbox_radio_style += '</style>';
		if (jQuery( '#arf_editor_checkbox_radio_size' ).length > 0) {
			jQuery( '#arf_editor_checkbox_radio_size' ).remove();
		}
		jQuery( 'body' ).append( checkbox_radio_style );
	}
);
jQuery( document ).on(
	'change',
	'input[data-arfstyle="true"]',
	function(e) {
		var is_reset_styling = jQuery( "#arf_reset_styling" ).val();
		if (true == is_reset_styling || 'true' == is_reset_styling) {
			return false;
		}
		e.preventDefault();
		var $this       = jQuery( this );
		var $form_id    = jQuery( '#id' ).val();
		var $data       = arflite_parse_json( $this.attr( 'data-arfstyledata' ) );
		var $value      = $this.val();
		var inputStyle  = jQuery( "#arfmainforminputstyle" ).val();
		var $dataAppend = $this.attr( 'data-arfstyleappend' );
		var is_append   = false;
		if (typeof $dataAppend != 'undefined' && $dataAppend == 'true') {
			var $data_append_id = $this.attr( 'data-arfstyleappendid' );
			$data_append_id     = $data_append_id.replace( /{arf_form_id}/ig, $form_id );
			var aStyle          = jQuery( '#' + $data_append_id );
			is_append           = true;
		}
		var rStyle = inputStyle;
		if (inputStyle == 'rounded') {
			inputStyle = 'standard';
		}
		var $dt = $data[inputStyle].split( '||' );

		if ($dataAppend) {
			if (jQuery( '#' + $data_append_id ).length > 0) {
				var hStyle = jQuery( "#" + $data_append_id ).text();
				if ($data_append_id == 'arf_' + $form_id + '_form_main_style') {
					$rgb                = arflitehextorgbcolor( $value );
					$rgbCol             = "rgb(" + $rgb.r + "," + $rgb.g + "," + $rgb.b + ")";
					var selectedDateImg = arflite_get_datepicker_select_image( $rgbCol );
					hStyle             += '.arflite_main_div_' + $form_id + ' .controls .datepicker .day.active:hover,';
					hStyle             += '.arflite_main_div_' + $form_id + ' .controls .datepicker .day.active{';
					hStyle             += 'background-image:url(data:image/svg+xml;base64,' + selectedDateImg + ') !important';
					hStyle             += '}';
				}
				if ($data_append_id == 'arf_' + $form_id + '_label_color') {
					$rgb                    = arflitehextorgbcolor( $value );
					$rgbCol                 = "rgb(" + $rgb.r + "," + $rgb.g + "," + $rgb.b + ")";
					var selectedRequiredImg = arflite_get_required_icon_image( $rgbCol );
					if (inputStyle == 'material') {
						hStyle += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .arfaction_icon{';
					} else {
						hStyle += '.arflite_main_div_' + $form_id + ' .arfaction_icon{';
					}
					hStyle += 'background-image:url(data:image/svg+xml;base64,' + selectedRequiredImg + ') !important';
					hStyle += '}';
				}
				if ($data_append_id == 'arf_' + $form_id + '_form_submit_button_position') {
					jQuery( "#" + $data_append_id ).text( '' );
					if ($value == 'left') {
						hStyle  = '.arflite_main_div_' + $form_id + ' .arf_submit_div{';
						hStyle += "clear:both !important;text-align:left !important;";
						hStyle += "}";
					} else if ($value == 'center') {
						hStyle  = '.arflite_main_div_' + $form_id + ' .arf_submit_div{';
						hStyle += "clear:both !important;text-align:center !important;";
						hStyle += "}";
					} else if ($value == 'right') {
						hStyle  = '.arflite_main_div_' + $form_id + ' .arf_submit_div{';
						hStyle += "clear:both !important;text-align:right !important;";
						hStyle += "}";
					}
				}
				if ($data_append_id == 'arf_' + $form_id + '_form_submit_button_margin') {
					jQuery( "#" + $data_append_id ).text( '' );
					var arfsubmitbuttonmarginsetting_1 = jQuery( "#arfsubmitbuttonmarginsetting_1" ).val();
					if (arfsubmitbuttonmarginsetting_1 >= 0) {
						arfsubmitbuttonmarginsetting_1 = 0;
					}
					var submitbuton_material = "";
					if (inputStyle != "standard") {
						submitbuton_material = ".arf_materialize_form";
					}
					hStyle  = '.arflite_main_div_' + $form_id + ' ' + submitbuton_material + ' .arfsubmitbutton  .arf_greensave_button_wrapper{';
					hStyle += "top:" + arfsubmitbuttonmarginsetting_1 + 'px; ';
					hStyle += '}';
					hStyle += '.arflite_main_div_' + $form_id + ' ' + submitbuton_material + ' .arf_submit_div{';
					hStyle += "margin:" + $value;
					hStyle += '}';
				}
				for (var $n = 0; $n < $dt.length; $n++) {
					$innerData = $dt[$n].split( '~|~' );

					$data                        = arflite_extract_property_class_from_string( $innerData, $form_id, $value, $this );
					$data                        = $data.split( '~~' );
					$class                       = $data[0];
					$property                    = $data[1];
					$value                       = $data[2];
					var $fspacing                = jQuery( '#arffieldinnermarginsetting' ).val();
					var $fpadding                = $fspacing.split( ' ' );
					var $padingleft              = parseInt( $fpadding[1], 10 );
					var $font_size_while_spacing = jQuery( '#arffieldfontsizesetting' ).val();
					if (inputStyle == 'material') {
						if (/(.arf_phone_with_flag)/ig.test( $class )) {
							var $arf_phone_spacing = (52 + $padingleft) + 'px';
							hStyle                += ".arflite_main_div_" + $form_id + "  #new_fields .iti.iti--allow-dropdown input.arf_phone_utils:not(.inplace_field):not(.arf_field_option_input_text):not(.arf_autocomplete):not(.arfslider), .arflite_main_div_" + $form_id + " .iti.iti--allow-dropdown input.arf_phone_utils:not(.inplace_field):not(.arf_field_option_input_text):not(.arf_autocomplete):not(.arfslider), .arflite_main_div_" + $form_id + " .arf_form_outer_wrapper .allfields .arf_materialize_form input.arf_phone_utils[type=text]:not(.inplace_field):not(.arf_field_option_input_text):not(.arf-select-dropdown):not(.arfslider):not(.arf_colorpicker):not(.arfhiddencolor){";
							hStyle                += 'padding-left:' + $arf_phone_spacing + ' !important;';
							hStyle                += "}";
						}
						if (/(.arf_leading_icon)/ig.test( $class ) || /(.arf_trailing_icon)/ig.test( $class ) || /(.arf_material_theme_container_with_icons)/ig.test( $class )) {
							var $arf_prefix_width = '';
							var spacin_val        = parseInt( $value );
							if (spacin_val < 10) {
								$arf_prefix_width = '28px';
							} else if (spacin_val >= 10 && spacin_val < 12) {
								$arf_prefix_width = '30px';
							} else if (spacin_val >= 12 && spacin_val < 14) {
								$arf_prefix_width = '32px';
							} else if (spacin_val >= 14 && spacin_val < 16) {
								$arf_prefix_width = '34px';
							} else if (spacin_val >= 16 && spacin_val < 18) {
								$arf_prefix_width = '36px';
							} else if (spacin_val >= 18 && spacin_val < 20) {
								$arf_prefix_width = '38px';
							} else if (spacin_val >= 20 && spacin_val < 22) {
								$arf_prefix_width = '40px';
							} else if (spacin_val == 22) {
								$arf_prefix_width = '42px';
							} else if (spacin_val == 24) {
								$arf_prefix_width = '46px';
							} else if (spacin_val == 26) {
								$arf_prefix_width = '48px';
							} else if (spacin_val == 28) {
								$arf_prefix_width = '50px';
							} else if (spacin_val == 32) {
								$arf_prefix_width = '52px';
							} else if (spacin_val == 34) {
								$arf_prefix_width = '54px';
							} else if (spacin_val == 36) {
								$arf_prefix_width = '56px';
							} else if (spacin_val == 38) {
								$arf_prefix_width = '58px';
							} else if (spacin_val == 40) {
								$arf_prefix_width = '60px';
							}

							var $arf_field_spacing = (parseInt( $arf_prefix_width, 10 ) + $padingleft) + 'px';
							if ($padingleft <= 0) {
								$padingleft = 0;
							}

							if (/(.arf_main_label)/ig.test( $class ) && /(.arf_material_theme_container_with_icons)/ig.test( $class )) {

								var align_label = 'left';
								if (jQuery( "input[name='arffrma']" ).is( ":checked" )) {
									align_label = jQuery( "input[name='arffrma']:checked" ).val();
								}

								hStyle += ".arflite_main_div_" + $form_id + "  .arf_materialize_form .arf_material_theme_container.arf_material_theme_container_with_icons .arf_main_label, .arflite_main_div_" + $form_id + " .arf_materialize_form .arf_material_theme_container.arf_material_theme_container_with_icons:not(.arf_only_trailing_icon) .arf_material_standard .arf_material_theme_notch label.arf_main_label:not(.arf_smiley_btn):not(.arf_star_rating_label):not(.arf_dislike_btn):not(.arf_like_btn):not(.arf_like_btn):not(.arf_field_option_content_cell_label):not(.arf_js_switch_label), .arflite_main_div_" + $form_id + " .arf_materialize_form .arf_material_theme_container.arf_material_theme_container_with_icons label.arf_main_label:not(.arf_smiley_btn):not(.arf_star_rating_label):not(.arf_dislike_btn):not(.arf_like_btn):not(.arf_like_btn):not(.arf_field_option_content_cell_label):not(.arf_js_switch_label){";
								if (align_label == 'left') {
									hStyle += 'left:' + $arf_prefix_width + ' !important;';
									hStyle += 'right: inherit !important;';
									hStyle += 'text-align: left !important;';
									hStyle += 'width: calc(100% - 35px);'; 
								} else {
									hStyle += 'right:' + $arf_prefix_width + ' !important;';
									hStyle += 'left: inherit !important;';
									hStyle += 'text-align: right !important';
								}
								hStyle += "}";
								hStyle += ".arflite_main_div_" + $form_id + " .arf_materialize_form .arf_material_theme_container.arf_material_theme_container_with_icons.arf_only_leading_icon label.arf_main_label:not(.arf_smiley_btn):not(.arf_star_rating_label):not(.arf_dislike_btn):not(.arf_like_btn):not(.arf_like_btn):not(.arf_field_option_content_cell_label):not(.arf_js_switch_label){"
								if (align_label == 'left') {
									hStyle += 'left:' + $arf_prefix_width + ' !important;';
									hStyle += 'right: inherit !important;';
								} else {
									hStyle += 'right:0 !important;';
									hStyle += 'left: inherit !important;';
								}
								hStyle += "}"

								hStyle += ".arflite_main_div_" + $form_id + " .arf_materialize_form .arf_material_theme_container.arf_material_theme_container_with_icons.arf_only_trailing_icon label.arf_main_label:not(.arf_smiley_btn):not(.arf_star_rating_label):not(.arf_dislike_btn):not(.arf_like_btn):not(.arf_like_btn):not(.arf_field_option_content_cell_label):not(.arf_js_switch_label){"
								if (align_label == 'left') {
									hStyle += 'left:0px !important;';
									hStyle += 'right: inherit !important;';
								} else {
									hStyle += 'right:' + $arf_prefix_width + ' !important;';
									hStyle += 'left: inherit !important;';
								}
								hStyle += "}"

								hStyle += ".arflite_main_div_" + $form_id + " .arf_materialize_form .controls .arf_material_theme_container.arf_material_theme_container_with_icons.arf_phone_with_flag label.arf_main_label:not(.arf_smiley_btn):not(.arf_star_rating_label):not(.arf_dislike_btn):not(.arf_like_btn):not(.arf_like_btn):not(.arf_field_option_content_cell_label):not(.arf_js_switch_label), .arflite_main_div_" + $form_id + " .arf_materialize_form .controls .arf_material_theme_container.arf_phone_with_flag label.arf_main_label:not(.arf_smiley_btn):not(.arf_star_rating_label):not(.arf_dislike_btn):not(.arf_like_btn):not(.arf_like_btn):not(.arf_field_option_content_cell_label):not(.arf_js_switch_label){"
								if (align_label == 'left') {
									hStyle += 'left:52px !important;';
									hStyle += 'right: inherit !important;';
								} else {
									hStyle += 'right:' + $arf_prefix_width + ' !important;';
									hStyle += 'left: inherit !important;';
								}
								hStyle += "}"
								hStyle += ".arf_materialize_form label.arf_main_label:not(.arf_smiley_btn):not(.arf_star_rating_label):not(.arf_dislike_btn):not(.arf_like_btn):not(.arf_like_btn):not(.arf_field_option_content_cell_label):not(.arf_js_switch_label){"
								if (align_label == 'left') {
									hStyle += 'left:0px !important;';
									hStyle += 'right: inherit !important;';
									hStyle += 'float: left !important;';
								} else {
									hStyle += 'right:0px !important;';
									hStyle += 'left: inherit !important;';
									hStyle += 'float: right !important;';
								}
								hStyle += "}";

							}

							hStyle += ".arflite_main_div_" + $form_id + "  .arf_materialize_form .controls .arf_material_theme_container.arf_material_theme_container_with_icons input[type=text]:not(.inplace_field):not(.arf_field_option_input_text):not(.arfslider):not(.arf_colorpicker):not(.arfhiddencolor):not(.arf_autocomplete):not(.arf-selectpicker-input-control), .arflite_main_div_" + $form_id + "  .arf_materialize_form .controls .arf_material_theme_container.arf_material_theme_container_with_icons input[type=number]:not(.inplace_field):not(.arf_field_option_input_text):not(.arfslider):not(.arf_colorpicker):not(.arfhiddencolor):not(.arf_autocomplete):not(.arf-selectpicker-input-control),.arflite_main_div_" + $form_id + "  .arf_materialize_form .controls .arf_material_theme_container.arf_material_theme_container_with_icons input[type=password]:not(.inplace_field):not(.arf_field_option_input_text):not(.arfslider):not(.arf_colorpicker):not(.arfhiddencolor):not(.arf_autocomplete):not(.arf-selectpicker-input-control) {";
							hStyle += 'padding-left:' + $arf_field_spacing + ' !important;';
							hStyle += 'padding-right:' + $arf_field_spacing + ' !important;';
							hStyle += "}";

							hStyle += ".arflite_main_div_" + $form_id + "  .arf_materialize_form .controls .arf_material_theme_container.arf_material_theme_container_with_icons.arf_only_trailing_icon input[type=text]:not(.inplace_field):not(.arf_field_option_input_text):not(.arfslider):not(.arf_colorpicker):not(.arfhiddencolor):not(.arf_autocomplete):not(.arf-selectpicker-input-control), .arflite_main_div_" + $form_id + "  .arf_materialize_form .controls .arf_material_theme_container.arf_material_theme_container_with_icons.arf_only_trailing_icon input[type=number]:not(.inplace_field):not(.arf_field_option_input_text):not(.arfslider):not(.arf_colorpicker):not(.arfhiddencolor):not(.arf_autocomplete):not(.arf-selectpicker-input-control),.arflite_main_div_" + $form_id + "  .arf_materialize_form .controls .arf_material_theme_container.arf_material_theme_container_with_icons.arf_only_trailing_icon input[type=password]:not(.inplace_field):not(.arf_field_option_input_text):not(.arfslider):not(.arf_colorpicker):not(.arfhiddencolor):not(.arf_autocomplete):not(.arf-selectpicker-input-control) {";
							hStyle += 'padding-left:' + $padingleft + 'px !important;';
							hStyle += "}";

							hStyle += ".arflite_main_div_" + $form_id + "  .arf_materialize_form .controls .arf_material_theme_container.arf_material_theme_container_with_icons.arf_only_leading_icon input[type=text]:not(.inplace_field):not(.arf_field_option_input_text):not(.arfslider):not(.arf_colorpicker):not(.arfhiddencolor):not(.arf_autocomplete):not(.arf-selectpicker-input-control), .arflite_main_div_" + $form_id + "  .arf_materialize_form .controls .arf_material_theme_container.arf_material_theme_container_with_icons.arf_only_leading_icon input[type=number]:not(.inplace_field):not(.arf_field_option_input_text):not(.arfslider):not(.arf_colorpicker):not(.arfhiddencolor):not(.arf_autocomplete):not(.arf-selectpicker-input-control),.arflite_main_div_" + $form_id + "  .arf_materialize_form .controls .arf_material_theme_container.arf_material_theme_container_with_icons.arf_only_leading_icon input[type=password]:not(.inplace_field):not(.arf_field_option_input_text):not(.arfslider):not(.arf_colorpicker):not(.arfhiddencolor):not(.arf_autocomplete):not(.arf-selectpicker-input-control) {";
							hStyle += 'padding-right:' + $padingleft + 'px !important;';
							hStyle += "}";

						}
					}

					if (/(.top_container.arf_submit_div)/g.test( $class )) {
						if (jQuery( "input[name='arfmsas']:checked" ).val() == 'auto') {
							continue;
						}
					}
					if ($class == '.arflite_main_div_' + $form_id + ' .arf_submit_div' && jQuery( "#arf_" + $form_id + "_form_align" ).length > 0) {
						var style_ = jQuery( "#arf_" + $form_id + "_form_align" ).text();
						jQuery( "#arf_" + $form_id + "_form_align" ).text( style_ );
					}
					if ($property == 'font-style') {
						var fwRegExp = new RegExp( '(' + $class + '{font-weight\:(.*?)\;})', 'g' );
						var fsRegExp = new RegExp( '(' + $class + '{font-style\:(.*?)\;})', 'g' );
						var tdRegExp = new RegExp( '(' + $class + '{text-decoration\:(.*?)\;})', 'g' )
						$nValue      = $value.split( ',' );
						if (fwRegExp.test( hStyle )) {
							hStyle = hStyle.replace( fwRegExp, '' );
						}
						if (fsRegExp.test( hStyle )) {
							hStyle = hStyle.replace( fsRegExp, '' );
						}
						if (tdRegExp.test( hStyle )) {
							hStyle = hStyle.replace( tdRegExp, '' );
						}
						$fsStyle  = "";
						$fsStyle += "font-weight:normal !important;font-style:normal !important;text-decoration:none !important;";
						for (var f = 0; f < $nValue.length; f++) {
							switch ($nValue[f]) {
								case 'bold':
									$fsStyle += "font-weight:bold !important;";
									break;
								case 'italic':
									$fsStyle += "font-style:italic !important;";
									break;
								case 'underline':
									$fsStyle += "text-decoration:underline !important;";
									break;
								case 'strikethrough':
									$fsStyle += "text-decoration:line-through !important;";
									break;
							}
						}
						hStyle += $class + "{";
						hStyle += $fsStyle;
						hStyle += "}";
					} else {
						var $regClass = $class.replace( /\[/g, '\\[' );
						$regClass     = $regClass.replace( /\]/g, '\\]' );
						$regClass     = $regClass.replace( /\(/g, '\\(' );
						$regClass     = $regClass.replace( /\)/g, '\\)' );
						if ($regClass != '') {
							var common_regex = new RegExp( '(' + $regClass + '{' + $property + '\:(.*?)\;})', 'g' );
							if (common_regex.test( hStyle )) {
								hStyle = hStyle.replace( common_regex, '' );
							}
						}
						if ($property != 'button_auto') {
							hStyle += $class + "{";
							hStyle += $property + ":" + $value + " !important;";
							hStyle += "}";
						}
					}
				}
				jQuery( '#' + $data_append_id ).html( hStyle );
			} else {
				var hStyle = "<style type='text/css' class='arf_editor_live_css' id='" + $data_append_id + "'>";
				if ($data_append_id == 'arf_' + $form_id + '_form_main_style') {
					var $rgb            = arflitehextorgbcolor( $value );
					var $rgbCol         = "rgb(" + $rgb.r + "," + $rgb.g + "," + $rgb.b + ")";
					var selectedDateImg = arflite_get_datepicker_select_image( $rgbCol );
					hStyle             += '.arflite_main_div_' + $form_id + ' .controls .datepicker .day.active:hover,';
					hStyle             += '.arflite_main_div_' + $form_id + ' .controls .datepicker .day.active{';
					hStyle             += 'background-image:url(data:image/svg+xml;base64,' + selectedDateImg + ') !important';
					hStyle             += '}';
				}
				if ($data_append_id == 'arf_' + $form_id + '_label_color') {
					$rgb                    = arflitehextorgbcolor( $value );
					$rgbCol                 = "rgb(" + $rgb.r + "," + $rgb.g + "," + $rgb.b + ")";
					var selectedRequiredImg = arflite_get_required_icon_image( $rgbCol );
					if (inputStyle == 'material') {
						hStyle += '.arflite_main_div_' + $form_id + ' .arf_materialize_form .arfaction_icon{';
					} else {
						hStyle += '.arflite_main_div_' + $form_id + ' .arfaction_icon{';
					}
					hStyle += 'background-image:url(data:image/svg+xml;base64,' + selectedRequiredImg + ') !important';
					hStyle += '}';
				}
				if ($data_append_id == 'arf_' + $form_id + '_form_submit_button_position') {
					if ($value == 'left') {
						hStyle += '.arflite_main_div_' + $form_id + ' .arf_submit_div{';
						hStyle += "clear:both !important;text-align:left !important;";
						hStyle += "}";
					} else if ($value == 'center') {
						hStyle += '.arflite_main_div_' + $form_id + ' .arf_submit_div{';
						hStyle += "text-align:center !important;clear:both !important;";
						hStyle += '}';
					} else if ($value == 'right') {
						hStyle += '.arflite_main_div_' + $form_id + ' .arf_submit_div{';
						hStyle += "text-align:right !important;clear:both !important;";
						hStyle += '}';
					}
				}
				if ($data_append_id == 'arf_' + $form_id + '_form_submit_button_margin') {
					jQuery( "#" + $data_append_id ).text( '' );
					var arfsubmitbuttonmarginsetting_1 = jQuery( "#arfsubmitbuttonmarginsetting_1" ).val();
					if (arfsubmitbuttonmarginsetting_1 >= 0) {
						arfsubmitbuttonmarginsetting_1 = 0;
					}
					var submitbuton_material = "";
					if (inputStyle != "standard") {
						submitbuton_material = ".arf_materialize_form";
					}
					hStyle += '.arflite_main_div_' + $form_id + ' ' + submitbuton_material + ' .arfsubmitbutton  .arf_greensave_button_wrapper{';
					hStyle += "top:" + arfsubmitbuttonmarginsetting_1 + 'px; ';
					hStyle += '}';
					hStyle += '.arflite_main_div_' + $form_id + ' ' + submitbuton_material + ' .arf_submit_div{';
					hStyle += "margin:" + $value;
					hStyle += '}';
				}
				for (var $n = 0; $n < $dt.length; $n++) {
					var $innerData               = $dt[$n].split( '~|~' );
					$data                        = arflite_extract_property_class_from_string( $innerData, $form_id, $value, $this );
					$data                        = $data.split( '~~' );
					var $class                   = $data[0];
					var $property                = $data[1];
					var $value                   = $data[2];
					var $fspacing                = jQuery( '#arffieldinnermarginsetting' ).val();
					var $fpadding                = $fspacing.split( ' ' );
					var $padingleft              = parseInt( $fpadding[1], 10 );
					var $font_size_while_spacing = jQuery( '#arffieldfontsizesetting' ).val();
					if (inputStyle == 'material') {
						if (/(.arf_phone_with_flag)/ig.test( $class )) {
							var $arf_phone_spacing = (52 + $padingleft) + 'px';
							hStyle                += ".arflite_main_div_" + $form_id + "  #new_fields .iti.iti--allow-dropdown input.arf_phone_utils:not(.inplace_field):not(.arf_field_option_input_text):not(.arf_autocomplete):not(.arfslider), .arflite_main_div_" + $form_id + " .iti.iti--allow-dropdown input.arf_phone_utils:not(.inplace_field):not(.arf_field_option_input_text):not(.arf_autocomplete):not(.arfslider), .arflite_main_div_" + $form_id + " .arf_form_outer_wrapper .allfields .arf_materialize_form input.arf_phone_utils[type=text]:not(.inplace_field):not(.arf_field_option_input_text):not(.arf-select-dropdown):not(.arfslider):not(.arf_colorpicker):not(.arfhiddencolor){";
							hStyle                += 'padding-left:' + $arf_phone_spacing + ' !important;';
							hStyle                += "}";
						}
						if (/(.arf_leading_icon)/ig.test( $class ) || /(.arf_trailing_icon)/ig.test( $class ) || /(.arf_material_theme_container_with_icons)/ig.test( $class ) ) {
							var $arf_prefix_width = '';
							var spacin_val        = parseInt( $value );
							if (spacin_val <= 1) {
								spacin_val = $font_size_while_spacing;
							}
							if (spacin_val < 10) {
								$arf_prefix_width = '28px';
							} else if (spacin_val >= 10 && spacin_val < 12) {
								$arf_prefix_width = '30px';
							} else if (spacin_val >= 12 && spacin_val < 14) {
								$arf_prefix_width = '32px';
							} else if (spacin_val >= 14 && spacin_val < 16) {
								$arf_prefix_width = '34px';
							} else if (spacin_val >= 16 && spacin_val < 18) {
								$arf_prefix_width = '36px';
							} else if (spacin_val >= 18 && spacin_val < 20) {
								$arf_prefix_width = '38px';
							} else if (spacin_val >= 20 && spacin_val < 22) {
								$arf_prefix_width = '40px';
							} else if (spacin_val == 22) {
								$arf_prefix_width = '42px';
							} else if (spacin_val == 24) {
								$arf_prefix_width = '46px';
							} else if (spacin_val == 26) {
								$arf_prefix_width = '48px';
							} else if (spacin_val == 28) {
								$arf_prefix_width = '50px';
							} else if (spacin_val == 32) {
								$arf_prefix_width = '52px';
							} else if (spacin_val == 34) {
								$arf_prefix_width = '54px';
							} else if (spacin_val == 36) {
								$arf_prefix_width = '56px';
							} else if (spacin_val == 38) {
								$arf_prefix_width = '58px';
							} else if (spacin_val == 40) {
								$arf_prefix_width = '60px';
							}

							$arf_field_spacing = (parseInt( $arf_prefix_width, 10 ) + $padingleft) + 'px';

							if (/(.arf_main_label)/ig.test( $class ) && /(.arf_material_theme_container_with_icons)/ig.test( $class )) {
								var align_label = 'left';
								if (jQuery( "input[name='arffrma']" ).is( ":checked" )) {
									align_label = jQuery( "input[name='arffrma']:checked" ).val();
								}
								hStyle += ".arflite_main_div_" + $form_id + "  .arf_materialize_form .arf_material_theme_container.arf_material_theme_container_with_icons .arf_main_label, .arflite_main_div_" + $form_id + " .arf_materialize_form .arf_material_theme_container.arf_material_theme_container_with_icons:not(.arf_only_trailing_icon) .arf_material_standard .arf_material_theme_notch label.arf_main_label:not(.arf_smiley_btn):not(.arf_star_rating_label):not(.arf_dislike_btn):not(.arf_like_btn):not(.arf_like_btn):not(.arf_field_option_content_cell_label):not(.arf_js_switch_label), .arflite_main_div_" + $form_id + " .arf_materialize_form .arf_material_theme_container.arf_material_theme_container_with_icons label.arf_main_label:not(.arf_smiley_btn):not(.arf_star_rating_label):not(.arf_dislike_btn):not(.arf_like_btn):not(.arf_like_btn):not(.arf_field_option_content_cell_label):not(.arf_js_switch_label){";
								if (align_label == 'left') {
									hStyle += 'left:' + $arf_prefix_width + ' !important;';
									hStyle += 'right: inherit !important;';
									hStyle += 'text-align: left !important;';
									hStyle += 'width: calc(100% - 35px);'; 
								} else {
									hStyle += 'right:' + $arf_prefix_width + ' !important;';
									hStyle += 'left: inherit !important;';
									hStyle += 'text-align: right !important';	
								}
								hStyle += "}";
								hStyle += ".arflite_main_div_" + $form_id + " .arf_materialize_form .arf_material_theme_container.arf_material_theme_container_with_icons.arf_only_leading_icon label.arf_main_label:not(.arf_smiley_btn):not(.arf_star_rating_label):not(.arf_dislike_btn):not(.arf_like_btn):not(.arf_like_btn):not(.arf_field_option_content_cell_label):not(.arf_js_switch_label){"
								if (align_label == 'left') {
									hStyle += 'left:' + $arf_prefix_width + ' !important;';
									hStyle += 'right: inherit !important;';
								} else {
									hStyle += 'right:0 !important;';
									hStyle += 'left: inherit !important;';
								}
								hStyle += "}"

								hStyle += ".arflite_main_div_" + $form_id + " .arf_materialize_form .arf_material_theme_container.arf_material_theme_container_with_icons.arf_only_trailing_icon label.arf_main_label:not(.arf_smiley_btn):not(.arf_star_rating_label):not(.arf_dislike_btn):not(.arf_like_btn):not(.arf_like_btn):not(.arf_field_option_content_cell_label):not(.arf_js_switch_label){"
								if (align_label == 'left') {
									hStyle += 'left:0px !important;';
									hStyle += 'right: inherit !important;';
								} else {
									hStyle += 'right:' + $arf_prefix_width + ' !important;';
									hStyle += 'left: inherit !important;';
								}
								hStyle += "}"

								hStyle += ".arflite_main_div_" + $form_id + " .arf_materialize_form .controls .arf_material_theme_container.arf_material_theme_container_with_icons.arf_phone_with_flag label.arf_main_label:not(.arf_smiley_btn):not(.arf_star_rating_label):not(.arf_dislike_btn):not(.arf_like_btn):not(.arf_like_btn):not(.arf_field_option_content_cell_label):not(.arf_js_switch_label), .arflite_main_div_" + $form_id + " .arf_materialize_form .controls .arf_material_theme_container.arf_phone_with_flag label.arf_main_label:not(.arf_smiley_btn):not(.arf_star_rating_label):not(.arf_dislike_btn):not(.arf_like_btn):not(.arf_like_btn):not(.arf_field_option_content_cell_label):not(.arf_js_switch_label){"
								if (align_label == 'left') {
									hStyle += 'left:52px !important;';
									hStyle += 'right: inherit !important;';
								} else {
									hStyle += 'right:' + $arf_prefix_width + ' !important;';
									hStyle += 'left: inherit !important;';
								}
								hStyle += "}"

								hStyle += ".arf_materialize_form label.arf_main_label:not(.arf_smiley_btn):not(.arf_star_rating_label):not(.arf_dislike_btn):not(.arf_like_btn):not(.arf_like_btn):not(.arf_field_option_content_cell_label):not(.arf_js_switch_label){"
								if (align_label == 'left') {
									hStyle += 'left:0px !important;';
									hStyle += 'right: inherit !important;';
									hStyle += 'float: left !important;';
								} else {
									hStyle += 'right:0px !important;';
									hStyle += 'left: inherit !important;';
									hStyle += 'float: right !important;';
								}
								hStyle += "}";

							}

							hStyle += ".arflite_main_div_" + $form_id + "  .arf_materialize_form .controls .arf_material_theme_container.arf_material_theme_container_with_icons input[type=text]:not(.inplace_field):not(.arf_field_option_input_text):not(.arfslider):not(.arf_colorpicker):not(.arfhiddencolor):not(.arf_autocomplete):not(.arf-selectpicker-input-control), .arflite_main_div_" + $form_id + "  .arf_materialize_form .controls .arf_material_theme_container.arf_material_theme_container_with_icons input[type=number]:not(.inplace_field):not(.arf_field_option_input_text):not(.arfslider):not(.arf_colorpicker):not(.arfhiddencolor):not(.arf_autocomplete):not(.arf-selectpicker-input-control),.arflite_main_div_" + $form_id + "  .arf_materialize_form .controls .arf_material_theme_container.arf_material_theme_container_with_icons input[type=password]:not(.inplace_field):not(.arf_field_option_input_text):not(.arfslider):not(.arf_colorpicker):not(.arfhiddencolor):not(.arf_autocomplete):not(.arf-selectpicker-input-control) {";
							hStyle += 'padding-left:' + $arf_field_spacing + ' !important;';
							hStyle += 'padding-right:' + $arf_field_spacing + ' !important;';
							hStyle += "}";

							hStyle += ".arflite_main_div_" + $form_id + "  .arf_materialize_form .controls .arf_material_theme_container.arf_material_theme_container_with_icons.arf_only_trailing_icon input[type=text]:not(.inplace_field):not(.arf_field_option_input_text):not(.arfslider):not(.arf_colorpicker):not(.arfhiddencolor):not(.arf_autocomplete):not(.arf-selectpicker-input-control), .arflite_main_div_" + $form_id + "  .arf_materialize_form .controls .arf_material_theme_container.arf_material_theme_container_with_icons.arf_only_trailing_icon input[type=number]:not(.inplace_field):not(.arf_field_option_input_text):not(.arfslider):not(.arf_colorpicker):not(.arfhiddencolor):not(.arf_autocomplete):not(.arf-selectpicker-input-control),.arflite_main_div_" + $form_id + "  .arf_materialize_form .controls .arf_material_theme_container.arf_material_theme_container_with_icons.arf_only_trailing_icon input[type=password]:not(.inplace_field):not(.arf_field_option_input_text):not(.arfslider):not(.arf_colorpicker):not(.arfhiddencolor):not(.arf_autocomplete):not(.arf-selectpicker-input-control) {";
							hStyle += 'padding-left:0px !important;';
							hStyle += "}";

							hStyle += ".arflite_main_div_" + $form_id + "  .arf_materialize_form .controls .arf_material_theme_container.arf_material_theme_container_with_icons.arf_only_leading_icon input[type=text]:not(.inplace_field):not(.arf_field_option_input_text):not(.arfslider):not(.arf_colorpicker):not(.arfhiddencolor):not(.arf_autocomplete):not(.arf-selectpicker-input-control), .arflite_main_div_" + $form_id + "  .arf_materialize_form .controls .arf_material_theme_container.arf_material_theme_container_with_icons.arf_only_leading_icon input[type=number]:not(.inplace_field):not(.arf_field_option_input_text):not(.arfslider):not(.arf_colorpicker):not(.arfhiddencolor):not(.arf_autocomplete):not(.arf-selectpicker-input-control),.arflite_main_div_" + $form_id + "  .arf_materialize_form .controls .arf_material_theme_container.arf_material_theme_container_with_icons.arf_only_leading_icon input[type=password]:not(.inplace_field):not(.arf_field_option_input_text):not(.arfslider):not(.arf_colorpicker):not(.arfhiddencolor):not(.arf_autocomplete):not(.arf-selectpicker-input-control) {";
							hStyle += 'padding-right:0px !important;';
							hStyle += "}";

						}
					}

					if (/(.top_container.arf_submit_div)/g.test( $class )) {
						if (jQuery( "input[name='arfmsas']:checked" ).val() == 'auto') {
							continue;
						}
					}
					if ($class == '.arflite_main_div_' + $form_id + ' .arf_submit_div' && jQuery( "#arf_" + $form_id + "_form_align" ).length > 0) {
						var style_ = jQuery( "#arf_" + $form_id + "_form_align" ).text();
						jQuery( "#arf_" + $form_id + "_form_align" ).text( style_ );
					}
					if ($property == 'font-style') {
						var fwRegExp = new RegExp( '(' + $class + '{font-weight\:(.*?)\;})', 'g' );
						var fsRegExp = new RegExp( '(' + $class + '{font-style\:(.*?)\;})', 'g' );
						var tdRegExp = new RegExp( '(' + $class + '{text-decoration\:(.*?)\;})', 'g' )
						var $nValue  = $value.split( ',' );
						if (fwRegExp.test( hStyle )) {
							hStyle = hStyle.replace( fwRegExp, '' );
						}
						if (fsRegExp.test( hStyle )) {
							hStyle = hStyle.replace( fsRegExp, '' );
						}
						if (tdRegExp.test( hStyle )) {
							hStyle = hStyle.replace( tdRegExp, '' );
						}
						var $fsStyle = "";
						$fsStyle    += "font-weight:normal !important;font-style:normal !important;text-decoration:none !important;";
						for (var f = 0; f < $nValue.length; f++) {
							switch ($nValue[f]) {
								case 'bold':
									$fsStyle += "font-weight:bold !important;";
									break;
								case 'italic':
									$fsStyle += "font-style:italic !important;";
									break;
								case 'underline':
									$fsStyle += "text-decoration:underline !important;";
									break;
								case 'strikethrough':
									$fsStyle += "text-decoration:line-through !important;";
									break;
							}
						}
						hStyle += $class + "{";
						hStyle += $fsStyle;
						hStyle += "}";
					} else {
						if ($property != 'button_auto') {
							hStyle += $class + "{";
							hStyle += $property + ":" + $value + " !important;";
							hStyle += "}";
						}
					}
				}
				hStyle += "</style>";
				jQuery( 'body' ).append( hStyle );
			}
		} else {
			for (var $n = 0; $n < $dt.length; $n++) {
				$innerData       = $dt[$n].split( '~|~' );
				$data            = arflite_extract_property_class_from_string( $innerData, $form_id, $value, $this );
				$data            = $data.split( '~~' );
				$class           = $data[0];
				$property        = $data[1];
				$value           = $data[2];
				var pseudo_regex = new RegExp( '(:checked)', 'ig' );
				if (pseudo_regex.test( $class )) {
					var checkedRegex = new RegExp( '(:checked)', 'ig' );
					if (checkedRegex.test( $class )) {
						if (rStyle == 'standard') {
							var cStyle   = jQuery( "#arf_checkbox_style" );
							var rdStyle  = jQuery( "#arf_radio_style" );
							var inpStyle = jQuery( "#frm_check_radio_style" ).val();
							if (/(.setting_checkbox)/ig.test( $class )) {
								if (inpStyle != 'custom') {
									if (cStyle.length > 0) {
										var ciStyle = "";
										ciStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_checkbox.arf_standard_checkbox .arf_checkbox_input_wrapper input[type='checkbox']:checked + span{";
										ciStyle    += 'background:' + $value + ' !important;';
										ciStyle    += "border-color:" + $value + ' !important;';
										ciStyle    += "}";
										ciStyle    += ".arflite_main_div_" + $form_id + " .arf_enable_checkbox_image span.arf_checkbox_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_checkbox_image_editor span.arf_checkbox_label_image_editor.checked::after{";
										ciStyle    += 'background:' + $value + ' !important;';
										ciStyle    += "}";
										jQuery( "#arf_checkbox_style" ).html( ciStyle );
									} else {
										var ciStyle = "<style type='text/css' class='arf_editor_live_css' id='arf_checkbox_style'>";
										ciStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_checkbox.arf_standard_checkbox .arf_checkbox_input_wrapper input[type='checkbox']:checked + span{";
										ciStyle    += 'background:' + $value + ' !important;';
										ciStyle    += "border-color:" + $value + ' !important;';
										ciStyle    += "}";
										ciStyle    += ".arflite_main_div_" + $form_id + " .arf_enable_checkbox_image span.arf_checkbox_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_checkbox_image_editor span.arf_checkbox_label_image_editor.checked::after{";
										ciStyle    += 'background:' + $value + ' !important;';
										ciStyle    += "}";
										ciStyle    += "</style>";
										jQuery( "body" ).append( ciStyle );
									}
								} else {
									if (cStyle.length > 0) {
										var ciStyle = "";
										ciStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_checkbox.arf_custom_checkbox .arf_checkbox_input_wrapper input[type='checkbox']:checked + span{";
										ciStyle    += "border-color:" + $value + ' !important;';
										ciStyle    += "}";
										ciStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_checkbox.arf_custom_checkbox .arf_checkbox_input_wrapper input[type='checkbox']:checked + span i{";
										ciStyle    += "color:" + $value + ' !important;';
										ciStyle    += "}";
										ciStyle    += ".arflite_main_div_" + $form_id + " .arf_enable_checkbox_image span.arf_checkbox_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_checkbox_image_editor span.arf_checkbox_label_image_editor.checked::after{";
										ciStyle    += 'background:' + $value + ' !important;';
										ciStyle    += "}";
										jQuery( "#arf_checkbox_style" ).html( ciStyle );
									} else {
										var ciStyle = "<style type='text/css' id='arf_checkbox_style'>";
										ciStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_checkbox.arf_custom_checkbox .arf_checkbox_input_wrapper input[type='checkbox']:checked + span{";
										ciStyle    += "border-color:" + $value + ' !important;';
										ciStyle    += "}";
										ciStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_checkbox.arf_custom_checkbox .arf_checkbox_input_wrapper input[type='checkbox']:checked + span i{";
										ciStyle    += "color:" + $value + ' !important;';
										ciStyle    += "}";
										ciStyle    += ".arflite_main_div_" + $form_id + " .arf_enable_checkbox_image span.arf_checkbox_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_checkbox_image_editor span.arf_checkbox_label_image_editor.checked::after{";
										ciStyle    += 'background:' + $value + ' !important;';
										ciStyle    += "}";
										ciStyle    += "</style>";
										jQuery( "body" ).append( ciStyle );
									}
								}
							} else if (/(.setting_radio)/ig.test( $class )) {
								if (inpStyle != 'custom') {
									if (rdStyle.length > 0) {
										var riStyle = "";
										riStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_radio.arf_standard_radio .arf_radio_input_wrapper input[type='radio']:checked + span{";
										riStyle    += 'background:' + $value + ' !important;';
										riStyle    += "border-color:" + $value + ' !important;';
										riStyle    += "}";
										riStyle    += ".arflite_main_div_" + $form_id + " .arf_enable_radio_image span.arf_radio_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_radio_image_editor span.arf_radio_label_image_editor.checked::after{";
										riStyle    += 'background:' + $value + ' !important;';
										riStyle    += "}";
										jQuery( "#arf_radio_style" ).html( riStyle );
									} else {
										var riStyle = "<style type='text/css' class='arf_editor_live_css' id='arf_radio_style'>";
										riStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_radio.arf_standard_radio .arf_radio_input_wrapper input[type='radio']:checked + span{";
										riStyle    += 'background:' + $value + ' !important;';
										riStyle    += "border-color:" + $value + ' !important;';
										riStyle    += "}";
										riStyle    += ".arflite_main_div_" + $form_id + " .arf_enable_radio_image span.arf_radio_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_radio_image_editor span.arf_radio_label_image_editor.checked::after{";
										riStyle    += 'background:' + $value + ' !important;';
										riStyle    += "}";
										riStyle    += "</style>";
										jQuery( "body" ).append( riStyle );
									}
								} else {
									if (rdStyle.length > 0) {
										var riStyle = "";
										riStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_radio.arf_custom_radio .arf_radio_input_wrapper input[type='radio']:checked + span{";
										riStyle    += "border-color:" + $value + ' !important;';
										riStyle    += "}";
										riStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_radio.arf_custom_radio .arf_radio_input_wrapper input[type='radio']:checked + span i{";
										riStyle    += "color:" + $value + ' !important;';
										riStyle    += "}";
										riStyle    += ".arflite_main_div_" + $form_id + " .arf_enable_radio_image span.arf_radio_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_radio_image_editor span.arf_radio_label_image_editor.checked::after{";
										riStyle    += 'background:' + $value + ' !important;';
										riStyle    += "}";
										jQuery( "#arf_radio_style" ).html( riStyle );
									} else {
										var riStyle = "<style type='text/css' class='arf_editor_live_css' id='arf_radio_style'>";
										riStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_radio.arf_custom_radio .arf_radio_input_wrapper input[type='radio']:checked + span{";
										riStyle    += "border-color:" + $value + ' !important;';
										riStyle    += "}";
										riStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_radio.arf_custom_radio .arf_radio_input_wrapper input[type='radio']:checked + span i{";
										riStyle    += "color:" + $value + ' !important;';
										riStyle    += "}";
										riStyle    += ".arflite_main_div_" + $form_id + " .arf_enable_radio_image span.arf_radio_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_radio_image_editor span.arf_radio_label_image_editor.checked::after{";
										riStyle    += 'background:' + $value + ' !important;';
										riStyle    += "}";
										jQuery( "body" ).append( riStyle );
									}
								}
							}
						} else if (rStyle == 'rounded') {
							var cStyle   = jQuery( "#arf_checkbox_rounded_style" );
							var rdStyle  = jQuery( "#arf_radio_rounded_style" );
							var inpStyle = jQuery( "#frm_check_radio_style" ).val();
							if (/(.setting_checkbox)/ig.test( $class )) {
								if (cStyle.length > 0) {
									var ciStyle = "";
									ciStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_checkbox.arf_rounded_flat_checkbox .arf_checkbox_input_wrapper input[type='checkbox']:checked + span{";
									if (inpStyle != 'custom') {
										ciStyle += "background-color" + ':' + $value + ' !important;';
									} else {
										ciStyle += "background: transparent !important;";
									}
									ciStyle += "border-color:" + $value + ' !important;';
									ciStyle += "}";
									if (inpStyle == 'custom') {
										ciStyle += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_checkbox.arf_rounded_flat_checkbox .arf_checkbox_input_wrapper input[type='checkbox']:checked + span i{";
										ciStyle += "color" + ':' + $value + ' !important;';
										ciStyle += "}";
									}
									ciStyle += ".arflite_main_div_" + $form_id + " .arf_enable_checkbox_image span.arf_checkbox_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_checkbox_image_editor span.arf_checkbox_label_image_editor.checked::after{";
									ciStyle += 'background:' + $value + ' !important;';
									ciStyle += "}";
									jQuery( "#arf_checkbox_rounded_style" ).html( ciStyle );
								} else {
									var ciStyle = "<style type='text/css' class='arf_editor_live_css' id='arf_checkbox_rounded_style'>";
									ciStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_checkbox.arf_rounded_flat_checkbox .arf_checkbox_input_wrapper input[type='checkbox']:checked + span{";
									if (inpStyle != 'custom') {
										ciStyle += "background-color" + ':' + $value + ' !important;';
									} else {
										ciStyle += "background: transparent !important;";
									}
									ciStyle += "border-color:" + $value + ' !important;';
									ciStyle += "}";
									if (inpStyle == 'custom') {
										ciStyle += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_checkbox.arf_rounded_flat_checkbox .arf_checkbox_input_wrapper input[type='checkbox']:checked + span i{";
										ciStyle += "color" + ':' + $value + ' !important;';
										ciStyle += "}";
									}
									ciStyle += ".arflite_main_div_" + $form_id + " .arf_enable_checkbox_image span.arf_checkbox_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_checkbox_image_editor span.arf_checkbox_label_image_editor.checked::after{";
									ciStyle += 'background:' + $value + ' !important;';
									ciStyle += "}";
									ciStyle += "</style>";
									jQuery( "body" ).append( ciStyle );
								}
							} else if (/(.setting_radio)/ig.test( $class )) {
								if (rdStyle.length > 0) {
									var riStyle = "";
									riStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_radio.arf_rounded_flat_radio input[type='radio']:checked + span::before{";
									if (inpStyle != 'custom') {
										riStyle += "border:4px solid " + $value + ' !important;';
									} else {
										riStyle += "border:0px solid " + $value + ' !important;';
									}
									riStyle += "}";
									riStyle += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_radio.arf_rounded_flat_radio input[type='radio']:checked + span{";
									riStyle += "border-color: " + $value + ' !important;';
									riStyle += "}";
									riStyle += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_radio.arf_rounded_flat_radio input[type='radio']:checked + span i {";
									riStyle += "color: " + $value + ' !important;';
									riStyle += "}";
									if (inpStyle != 'custom') {
										riStyle += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_radio.arf_rounded_flat_radio input[type='radio']:checked + span::after{";
										riStyle += 'background-color:' + $value + ' !important;';
										riStyle += "border:2px solid " + $value + ' !important;';
										riStyle += "}";
										riStyle += ".arflite_main_div_" + $form_id + " .arf_enable_radio_image span.arf_radio_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_radio_image_editor span.arf_radio_label_image_editor.checked::after{";
										riStyle += 'background:' + $value + ' !important;';
										riStyle += "}";
									}
									jQuery( "#arf_radio_rounded_style" ).html( riStyle );
								} else {
									var riStyle = "<style type='text/css' class='arf_editor_live_css' id='arf_radio_rounded_style'>";
									riStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_radio.arf_rounded_flat_radio input[type='radio']:checked + span::before{";
									if (inpStyle != 'custom') {
										riStyle += "border:4px solid " + $value + ' !important;';
									} else {
										riStyle += "border:0px solid " + $value + ' !important;';
									}
									riStyle += "}";
									riStyle += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_radio.arf_rounded_flat_radio input[type='radio']:checked + span{";
									riStyle += "border-color: " + $value + ' !important;';
									riStyle += "}";
									riStyle += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_radio.arf_rounded_flat_radio input[type='radio']:checked + span i {";
									riStyle += "color: " + $value + ' !important;';
									riStyle += "}";
									riStyle += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_radio.arf_rounded_flat_radio input[type='radio']:checked + span::after{";
									riStyle += 'background-color:' + $value + ' !important;';
									riStyle += "border:2px solid " + $value + ' !important;';
									riStyle += "}";
									riStyle += ".arflite_main_div_" + $form_id + " .arf_enable_radio_image span.arf_radio_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_radio_image_editor span.arf_radio_label_image_editor.checked::after{";
									riStyle += 'background:' + $value + ' !important;';
									riStyle += "}";
									riStyle += "</style>";
									jQuery( "body" ).append( riStyle );
								}
							}
						} else if (rStyle == 'material') {
							var rcStyle = jQuery( "#frm_check_radio_style" ).val();
							var cStyle  = jQuery( "#arf_checkbox_material_style" );
							var rdStyle = jQuery( "#arf_radio_material_style" );
							if (rcStyle == 'material') {
								if (/(.setting_checkbox)/ig.test( $class )) {
									if (cStyle.length > 0) {
										var ciStyle = "";
										ciStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_checkbox.arf_material_checkbox.arf_default_material .arf_checkbox_input_wrapper input[type='checkbox']:checked + span:after{";
										ciStyle    += 'background:' + $value + ' !important;';
										ciStyle    += "border-color:" + $value + ' !important;';
										ciStyle    += "}";
										ciStyle    += ".arflite_main_div_" + $form_id + "  .arf_materialize_form .arf_enable_checkbox_image span.arf_checkbox_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_checkbox_image_editor span.arf_checkbox_label_image_editor.checked::after{";
										ciStyle    += 'background:' + $value + ' !important;';
										ciStyle    += "}";
										jQuery( "#arf_checkbox_material_style" ).html( ciStyle );
									} else {
										var ciStyle = "<style type='text/css' class='arf_editor_live_css' id='arf_checkbox_material_style'>";
										ciStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_checkbox.arf_material_checkbox.arf_default_material .arf_checkbox_input_wrapper input[type='checkbox']:checked + span:after{";
										ciStyle    += 'background:' + $value + ' !important;';
										ciStyle    += "border-color:" + $value + ' !important;';
										ciStyle    += "}";
										ciStyle    += ".arflite_main_div_" + $form_id + "  .arf_materialize_form .arf_enable_checkbox_image span.arf_checkbox_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_checkbox_image_editor span.arf_checkbox_label_image_editor.checked::after{";
										ciStyle    += 'background:' + $value + ' !important;';
										ciStyle    += "}";
										ciStyle    += "</style>";
										jQuery( "body" ).append( ciStyle );
									}
								} else if (/(.setting_radio)/ig.test( $class )) {
									if (rdStyle.length > 0) {
										var riStyle = "";
										riStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_radio.arf_material_radio.arf_default_material input[type='radio']:checked + span::after{";
										riStyle    += 'background:' + $value + ' !important;';
										riStyle    += "border-color:" + $value + ' !important;';
										riStyle    += "}";
										riStyle    += ".arflite_main_div_" + $form_id + "  .arf_materialize_form .arf_enable_radio_image span.arf_radio_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_radio_image_editor span.arf_radio_label_image_editor.checked::after{";
										riStyle    += 'background:' + $value + ' !important;';
										riStyle    += "}";
										jQuery( "#arf_radio_material_style" ).html( riStyle );
									} else {
										var riStyle = "<style type='text/css' class='arf_editor_live_css' id='arf_radio_material_style'>";
										riStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_radio.arf_material_radio.arf_default_material input[type='radio']:checked + span::after{";
										riStyle    += 'background:' + $value + ' !important;';
										riStyle    += "border-color:" + $value + ' !important;';
										riStyle    += "}";
										riStyle    += ".arflite_main_div_" + $form_id + "  .arf_materialize_form .arf_enable_radio_image span.arf_radio_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_radio_image_editor span.arf_radio_label_image_editor.checked::after{";
										riStyle    += 'background:' + $value + ' !important;';
										riStyle    += "}";
										riStyle    += "</style>";
										jQuery( "body" ).append( riStyle );
									}
								}
							} else if (rcStyle == 'material_tick') {
								if (/(.setting_checkbox)/ig.test( $class )) {
									if (cStyle.length > 0) {
										var ciStyle = "";
										ciStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_checkbox.arf_material_checkbox.arf_advanced_material .arf_checkbox_input_wrapper input[type='checkbox']:checked + span::before{";
										ciStyle    += 'top: 50%;';
										ciStyle    += 'left: 50%;';
										ciStyle    += 'width: 50% !important;';
										ciStyle    += 'height:100% !important;';
										ciStyle    += 'border-top: 2px solid transparent;';
										ciStyle    += 'border-left: 2px solid transparent;';
										ciStyle    += 'border-right: 2px solid ' + $value + ';';
										ciStyle    += 'border-bottom: 2px solid ' + $value + ';';
										ciStyle    += '-webkit-transform: rotate(40deg) translate(-50%,-50%);';
										ciStyle    += 'transform: rotate(40deg) translate(-50%,-50%);';
										ciStyle    += '-o-transform: rotate(40deg) translate(-50%,-50%);';
										ciStyle    += '-moz-transform: rotate(40deg) translate(-50%,-50%);';
										ciStyle    += '-ms-transform: rotate(40deg) translate(-50%,-50%);';
										ciStyle    += '-webkit-backface-visibility: hidden;';
										ciStyle    += '-moz-backface-visibility: hidden;';
										ciStyle    += '-o-backface-visibility: hidden;';
										ciStyle    += 'backface-visibility: hidden;';
										ciStyle    += '-webkit-transform-origin: 45% -10%;';
										ciStyle    += 'transform-origin: 45% -10%;';
										ciStyle    += '-o-transform-origin: 45% -10%;';
										ciStyle    += '-moz-transform-origin: 45% -10%;';
										ciStyle    += "border-right-color:" + $value + ' !important;';
										ciStyle    += "border-bottom-color:" + $value + ' !important;';
										ciStyle    += "}";
										ciStyle    += ".arflite_main_div_" + $form_id + "  .arf_materialize_form .arf_enable_checkbox_image span.arf_checkbox_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_checkbox_image_editor span.arf_checkbox_label_image_editor.checked::after{";
										ciStyle    += 'background:' + $value + ' !important;';
										ciStyle    += "}";
										jQuery( "#arf_checkbox_material_style" ).html( ciStyle );
									} else {
										var ciStyle = "<style type='text/css' class='arf_editor_live_css' id='arf_checkbox_material_style'>";
										ciStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_checkbox.arf_material_checkbox.arf_advanced_material .arf_checkbox_input_wrapper input[type='checkbox']:checked + span::before{";
										ciStyle    += 'top: 50%;';
										ciStyle    += 'left: 50%;';
										ciStyle    += 'width: 50% !important;';
										ciStyle    += 'height:100% !important;';
										ciStyle    += 'border-top: 2px solid transparent;';
										ciStyle    += 'border-left: 2px solid transparent;';
										ciStyle    += 'border-right: 2px solid ' + $value + ';';
										ciStyle    += 'border-bottom: 2px solid ' + $value + ';';
										ciStyle    += '-webkit-transform: rotate(40deg) translate(-50%,-50%);';
										ciStyle    += 'transform: rotate(40deg) translate(-50%,-50%);';
										ciStyle    += '-o-transform: rotate(40deg) translate(-50%,-50%);';
										ciStyle    += '-moz-transform: rotate(40deg) translate(-50%,-50%);';
										ciStyle    += '-ms-transform: rotate(40deg) translate(-50%,-50%);';
										ciStyle    += '-webkit-backface-visibility: hidden;';
										ciStyle    += '-moz-backface-visibility: hidden;';
										ciStyle    += '-o-backface-visibility: hidden;';
										ciStyle    += 'backface-visibility: hidden;';
										ciStyle    += '-webkit-transform-origin: 45% -10%;';
										ciStyle    += 'transform-origin: 45% -10%;';
										ciStyle    += '-o-transform-origin: 45% -10%;';
										ciStyle    += '-moz-transform-origin: 45% -10%;';
										ciStyle    += "border-right-color:" + $value + ' !important;';
										ciStyle    += "border-bottom-color:" + $value + ' !important;';
										ciStyle    += "}";
										ciStyle    += ".arflite_main_div_" + $form_id + "  .arf_materialize_form .arf_enable_checkbox_image span.arf_checkbox_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_checkbox_image_editor span.arf_checkbox_label_image_editor.checked::after{";
										ciStyle    += 'background:' + $value + ' !important;';
										ciStyle    += "}";
										ciStyle    += "</style>";
										jQuery( "body" ).append( ciStyle );
									}
								} else if (/(.setting_radio)/ig.test( $class )) {
									if (rdStyle.length > 0) {
										var riStyle = "";
										riStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_radio.arf_material_radio.arf_advanced_material input[type='radio']:checked + span::before{";
										riStyle    += "border-color:" + $value + ' !important;';
										riStyle    += "}";
										riStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_radio.arf_material_radio.arf_advanced_material input[type='radio']:checked + span::after,.arflite_main_div_" + $form_id + " .arf_materialize_form .arfformfield .setting_radio.arf_material_radio.arf_advanced_material .arf_radio_input_wrapper input[type='radio']:checked + span::after{";
										riStyle    += "-webkit-transform: scale(0.5);";
										riStyle    += "-o-transform: scale(0.5);";
										riStyle    += "-moz-transform: scale(0.5);";
										riStyle    += "transform: scale(0.5);";
										riStyle    += "-ms-transform: scale(0.5);";
										riStyle    += "background: " + $value + ";";
										riStyle    += "border: 2px solid " + $value + ";";
										riStyle    += $property + ':' + $value + ' !important;';
										riStyle    += "border-color:" + $value + ' !important;';
										riStyle    += "}";
										riStyle    += ".arflite_main_div_" + $form_id + "  .arf_materialize_form .arf_enable_radio_image span.arf_radio_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_radio_image_editor span.arf_radio_label_image_editor.checked::after{";
										riStyle    += 'background:' + $value + ' !important;';
										riStyle    += "}";
										jQuery( "#arf_radio_material_style" ).html( riStyle );
									} else {
										var riStyle = "<style type='text/css' class='arf_editor_live_css' id='arf_radio_material_style'>";
										riStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_radio.arf_material_radio.arf_advanced_material input[type='radio']:checked + span::before{";
										riStyle    += "border-color:" + $value + ' !important;';
										riStyle    += "}";
										riStyle    += ".arflite_main_div_" + $form_id + " .arf_fieldset .setting_radio.arf_material_radio.arf_advanced_material input[type='radio']:checked + span::after,.arflite_main_div_" + $form_id + " .arf_materialize_form .arfformfield .setting_radio.arf_material_radio.arf_advanced_material .arf_radio_input_wrapper input[type='radio']:checked + span::after{";
										riStyle    += "-webkit-transform: scale(0.5);";
										riStyle    += "-o-transform: scale(0.5);";
										riStyle    += "-moz-transform: scale(0.5);";
										riStyle    += "transform: scale(0.5);";
										riStyle    += "-ms-transform: scale(0.5);";
										riStyle    += "background: " + $value + ";";
										riStyle    += "border: 2px solid " + $value + ";";
										riStyle    += $property + ':' + $value + ' !important;';
										riStyle    += "border-color:" + $value + ' !important;';
										riStyle    += "}";
										riStyle    += ".arflite_main_div_" + $form_id + "  .arf_materialize_form .arf_enable_radio_image span.arf_radio_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_radio_image_editor span.arf_radio_label_image_editor.checked::after{";
										riStyle    += 'background:' + $value + ' !important;';
										riStyle    += "}";
										riStyle    += "</style>";
										jQuery( "body" ).append( riStyle );
									}
								}
							} else {
								if (/(.setting_checkbox)/ig.test( $class )) {
									if (cStyle.length > 0) {
										var ciStyle = "";
										ciStyle    += ".arfformfield .setting_checkbox.arf_custom_checkbox .arf_checkbox_input_wrapper input[type='checkbox']:checked + span{";
										ciStyle    += "border-color:" + $value + ' !important;';
										ciStyle    += "}";
										ciStyle    += ".arfformfield .setting_checkbox.arf_custom_checkbox .arf_checkbox_input_wrapper input[type='checkbox']:checked + span i{";
										ciStyle    += "color:" + $value + ' !important;';
										ciStyle    += "}";
										ciStyle    += ".arflite_main_div_" + $form_id + "  .arf_materialize_form .arf_enable_checkbox_image span.arf_checkbox_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_checkbox_image_editor span.arf_checkbox_label_image_editor.checked::after{";
										ciStyle    += 'background:' + $value + ' !important;';
										ciStyle    += "}";
										jQuery( "#arf_checkbox_material_style" ).html( ciStyle );
									} else {
										var ciStyle = "<style type='text/css' class='arf_editor_live_css' id='arf_checkbox_material_style'>";
										ciStyle    += ".arfformfield .setting_checkbox.arf_custom_checkbox .arf_checkbox_input_wrapper input[type='checkbox']:checked + span{";
										ciStyle    += "border-color:" + $value + ' !important;';
										ciStyle    += "}";
										ciStyle    += ".arfformfield .setting_checkbox.arf_custom_checkbox .arf_checkbox_input_wrapper input[type='checkbox']:checked + span i{";
										ciStyle    += "color:" + $value + ' !important;';
										ciStyle    += "}";
										ciStyle    += ".arflite_main_div_" + $form_id + "  .arf_materialize_form .arf_enable_checkbox_image span.arf_checkbox_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_checkbox_image_editor span.arf_checkbox_label_image_editor.checked::after{";
										ciStyle    += 'background:' + $value + ' !important;';
										ciStyle    += "}";
										ciStyle    += "</style>";
										jQuery( "body" ).append( ciStyle );
									}
								} else if (/(.setting_radio)/ig.test( $class )) {
									if (rdStyle.length > 0) {
										var riStyle = "";
										riStyle    += ".arfformfield .setting_radio.arf_custom_radio .arf_radio_input_wrapper input[type='radio']:checked + span{";
										riStyle    += "border-color:" + $value + ' !important;';
										riStyle    += "}";
										riStyle    += ".arfformfield .setting_radio.arf_custom_radio .arf_radio_input_wrapper input[type='radio']:checked + span i{";
										riStyle    += "color:" + $value + ' !important;';
										riStyle    += "}";
										riStyle    += ".arflite_main_div_" + $form_id + "  .arf_materialize_form .arf_enable_radio_image span.arf_radio_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_radio_image_editor span.arf_radio_label_image_editor.checked::after{";
										riStyle    += 'background:' + $value + ' !important;';
										riStyle    += "}";
										jQuery( "#arf_radio_material_style" ).html( riStyle );
									} else {
										var riStyle = "<style type='text/css' class='arf_editor_live_css' id='arf_radio_material_style'>";
										riStyle    += ".arfformfield .setting_radio.arf_custom_radio .arf_radio_input_wrapper input[type='radio']:checked + span{";
										riStyle    += "border-color:" + $value + ' !important;';
										riStyle    += "}";
										riStyle    += ".arfformfield .setting_radio.arf_custom_radio .arf_radio_input_wrapper input[type='radio']:checked + span i{";
										riStyle    += "color:" + $value + ' !important;';
										riStyle    += "}";
										riStyle    += ".arflite_main_div_" + $form_id + "  .arf_materialize_form .arf_enable_radio_image span.arf_radio_label_image.checked::after,#arf_fieldset_" + $form_id + " .arf_enable_radio_image_editor span.arf_radio_label_image_editor.checked::after{";
										riStyle    += 'background:' + $value + ' !important;';
										riStyle    += "}";
										riStyle    += "</style>";
										jQuery( "body" ).append( riStyle );
									}
								}
							}
						}
					}
				} else {
					var iStyle = jQuery( $class ).attr( 'style' );
					if (typeof iStyle != 'undefined') {
						var property_regex = new RegExp( '(' + $property + '\:(.*?)\;)', 'g' );
						iStyle             = iStyle.replace( property_regex, '' );
						iStyle             = iStyle + $property + ':' + $value + ' !important;';
					} else {
						iStyle = $property + ':' + $value + ' !important;';
					}
				}
				if ($property == 'button_auto') {
					if ($value == 'fixed') {
						$_style     = "margin-left:10px !important;clear:both !important;text-align:left !important;";
						var atStyle = jQuery( $class ).attr( 'style' );
						if (/(margin-left\:(.*?)\;)/g.test( atStyle )) {
							atStyle = atStyle.replace( /(margin-left\:(.*?)\;)/g, '' );
						}
						if (/(clear\:(.*?)\;)/g.test( atStyle )) {
							atStyle = atStyle.replace( /(clear\:(.*?)\;)/g, '' );
						}
						if (/(text-align\:(.*?)\;)/g.test( atStyle )) {
							atStyle = atStyle.replace( /(text-align\:(.*?)\;)/g, '' );
						}
						if (typeof atStyle == 'undefined') {
							iStyle = $_style;
						} else {
							iStyle = atStyle + $_style;
						}
					} else if ($value == 'auto') {
						$_style     = "text-align:center !important;clear:both !important;";
						var atStyle = jQuery( $class ).attr( 'style' );
						if (/(margin-left\:(.*?)\;)/g.test( atStyle )) {
							atStyle = atStyle.replace( /(margin-left\:(.*?)\;)/g, '' );
						}
						if (/(margin-right\:(.*?)\;)/g.test( atStyle )) {
							atStyle = atStyle.replace( /(margin-right\:(.*?)\;)/g, '' );
						}
						if (/(clear\:(.*?)\;)/g.test( atStyle )) {
							atStyle = atStyle.replace( /(clear\:(.*?)\;)/g, '' );
						}
						if (/(text-align\:(.*?)\;)/g.test( atStyle )) {
							atStyle = atStyle.replace( /(text-align\:(.*?)\;)/g, '' );
						}
						if (typeof atStyle == 'undefined') {
							iStyle = $_style;
						} else {
							iStyle = atStyle + $_style;
						}
					}
				}
				jQuery( $class ).attr( 'style', iStyle );
			}
		}
		arflite_initialize_resizable();
	}
);
jQuery( document ).on(
	'change',
	'#arfcommonfontfamily',
	function() {
		var selectors = ['#arftitlefontsetting', '#arfmainfontsetting', '#arfcheckboxfontsetting', '#arfsubmitfontfamily', '#arfmainerrorfontsetting'];
		var value     = jQuery( this ).val();
		var label     = jQuery( this ).next( 'dl' ).find( 'li[data-value="' + value + '"]' ).attr( 'data-label' );
		for (var ff = 0; ff < selectors.length; ff++) {
			jQuery( selectors[ff] ).val( value ).trigger( 'change' );
			jQuery( selectors[ff] ).val( value ).next( 'dl' ).find( 'span' ).text( label );
			jQuery( selectors[ff] ).val( value ).next( 'dl' ).find( 'input' ).val( value );
		}
	}
);
jQuery( document ).on(
	'change',
	'#arfdatepickerbgcolorsetting',
	function(e) {
		var color_val   = jQuery( this ).val();
		var text_color  = arfliteisColorDark( color_val );
		var form_id     = jQuery( '#id' ).val();
		var dStyle      = '';
		var darker_tone = arflite_generate_darker_tone( color_val, -0.3 );
		if (jQuery( '#arfmainforminputstyle' ).val() == 'material') {
			var timepick_footer_header_icon = '.arflite_main_div_' + form_id + ' .arf_materialize_form .arf-glyphicon-time:before,.arflite_main_div_' + form_id + ' .arf_materialize_form .arf-glyphicon-calendar:before{color:' + ((text_color == true) ? '#FFFFFF' : '#1A1A1A') + ' !important;}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( timepick_footer_header_icon );
			if (text_color == true) {
				jQuery( '#arfdatepickertextcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', '#ffffff' ).trigger( 'change' );
				jQuery( '#arfdatepickertextcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none #ffffff' );
				jQuery( "#arfdatepickertextcolorsetting" ).val( '#ffffff' ).trigger( 'change' );
				var style_1 = '.arflite_main_div_' + form_id + ' .controls .bootstrap-datetimepicker-widget .datetopcol p,p.yearonly{color:#ffffff !important}';
				jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( style_1 );
				var style_active_cal = '.arflite_main_div_' + form_id + ' .arf_materialize_form .bootstrap-datetimepicker-widget table td.active{ background-color:' + color_val + ' !important;color:#ffffff !important;}';
				style_active_cal    += '.arflite_main_div_' + form_id + ' .arf_materialize_form .bootstrap-datetimepicker-widget table td.active:hover{ background-color:' + color_val + ' !important;color:#000000 !important;}';
				jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( style_active_cal );
				var style_month_act = '.arflite_main_div_' + form_id + ' .arf_materialize_form .month.active,.arflite_main_div_' + form_id + ' .arf_materialize_form .year.active,.arflite_main_div_' + form_id + ' .arf_materialize_form .decade.active{ background-color:' + color_val + ' !important;color:#ffffff !important;}';
				jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( style_month_act );
			} else {
				var invert_color = arflite_define_text_color( color_val );
				var style_1      = '.arflite_main_div_' + form_id + ' .controls .bootstrap-datetimepicker-widget .datetopcol p,p.yearonly{color:#1A1A1A !important}';
				jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( style_1 );
				var style_active = '.arflite_main_div_' + form_id + ' .arf_materialize_form .bootstrap-datetimepicker-widget table td.active{ background-color:' + color_val + ' !important;color:#1A1A1A !important;}';
				style_active    += '.arflite_main_div_' + form_id + ' .arf_materialize_form .bootstrap-datetimepicker-widget table td.active:hover{ background-color:' + color_val + ' !important;color:#000000 !important;}';
				jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( style_active );
				var style_month_act = '.arflite_main_div_' + form_id + ' .arf_materialize_form .month.active,.arflite_main_div_' + form_id + ' .arf_materialize_form .year.active,.arflite_main_div_' + form_id + ' .arf_materialize_form .decade.active{ background-color:' + color_val + ' !important;color:#1A1A1A !important;}';
				jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( style_month_act );
				jQuery( '#arfdatepickertextcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', invert_color ).trigger( 'change' );
				jQuery( '#arfdatepickertextcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + invert_color );
				jQuery( "#arfdatepickertextcolorsetting" ).val( invert_color ).trigger( 'change' );
			}
			var arf_cal_header_bg = '.arflite_main_div_' + form_id + ' .arf_materialize_form .controls .arf_cal_header,.arflite_main_div_' + form_id + ' .arf_materialize_form .controls .arf_cal_header th,.arflite_main_div_' + form_id + ' .arf_materialize_form .controls .arf_cal_header th .arf-glyphicon { background-color: transparent !important; color: #1A1A1A !important;font-weight: bold;}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( arf_cal_header_bg );
			var datepick_footer_header = '.arflite_main_div_' + form_id + ' .arf_materialize_form .picker-switch td span.arf-glyphicon-time,.arflite_main_div_' + form_id + ' .arf_materialize_form .picker-switch td span.arf-glyphicon-calendar{background-color:' + color_val + ' !important;}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( datepick_footer_header );
			var style_month_hover = '.arflite_main_div_' + form_id + ' .arf_materialize_form .month:hover:not(.active),.arflite_main_div_' + form_id + ' .arf_materialize_form .year:hover:not(.active),.arflite_main_div_' + form_id + ' .arf_materialize_form .decade:hover:not(.active){ background-color:#eeeeee !important;}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( style_month_hover );
			var timepick_footer_header = '.arflite_main_div_' + form_id + ' .arf_materialize_form .picker-switch td span.arf-glyphicon-time,.arflite_main_div_' + form_id + ' .arf_materialize_form .picker-switch td span.arf-glyphicon-calendar{background-color:' + color_val + '}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( timepick_footer_header );
			var timepick_footer_header_hover_effect = '.arflite_main_div_' + form_id + ' .arf_materialize_form .picker-switch td span.arf-glyphicon-time:hover,.arflite_main_div_' + form_id + ' .arf_materialize_form .picker-switch td span.arf-glyphicon-calendar:hover{border-width:0px !important;}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( timepick_footer_header_hover_effect );
			var time_picker_td_color = '.arflite_main_div_' + form_id + ' .arf_materialize_form .timepicker .arf_cal_minute,.arflite_main_div_' + form_id + ' .arf_materialize_form .timepicker .arf_cal_hour{color:#1A1A1A !important}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( time_picker_td_color );
			var time_picker_td = '.arflite_main_div_' + form_id + ' .arf_materialize_form .timepicker .arf-glyphicon-chevron-down::before,.arflite_main_div_' + form_id + ' .arf_materialize_form .timepicker .arf-glyphicon-chevron-up::before,.arflite_main_div_' + form_id + ' .arf_materialize_form .timepicker-picker .timepicker-minute,.arflite_main_div_' + form_id + ' .arf_materialize_form .timepicker-picker .timepicker-hour{color:#1A1A1A !important}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( time_picker_td );
			var time_picker_td_hover = '.arflite_main_div_' + form_id + ' .arf_materialize_form .timepicker .arf-glyphicon-chevron-down:hover,.arflite_main_div_' + form_id + ' .arf_materialize_form .timepicker .arf-glyphicon-chevron-up:hover,.arflite_main_div_' + form_id + ' .arf_materialize_form .timepicker-picker .timepicker-minute:hover,.arflite_main_div_' + form_id + ' .arf_materialize_form .timepicker-picker .timepicker-hour:hover,.arflite_main_div_' + form_id + ' .arf_materialize_form .timepicker-hours .arf_cal_hour:hover,.arflite_main_div_' + form_id + ' .arf_materialize_form .timepicker-minutes .arf_cal_minute:hover{border-color:transparent !important;background-color:#eeeeee;}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( time_picker_td_hover );
			var time_picker_hour_radius = '.arflite_main_div_' + form_id + ' .arf_materialize_form .timepicker .arf_cal_hour{border-radius:50px !important; -webkit-border-radius:50px !important; -moz-border-radius:50px !important; -o-border-radius:50px !important;}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( time_picker_hour_radius );
			var cur_date_dot = '.arflite_main_div_' + form_id + ' .arf_materialize_form  table td.today:before{border-color:' + color_val + ' !important}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( cur_date_dot );
			dStyle = '.arflite_main_div_' + form_id + ' .controls .bootstrap-datetimepicker-widget table td.day:not(.active):hover{background-color:#eeeeee !important;}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( dStyle );
		} else {
			if (text_color == true) {
				var fontcolor = '#FFFFFF';
			} else {
				var fontcolor = '#1A1A1A';
			}
			var timepick_footer_header_icon = '.arflite_main_div_' + form_id + ' .arf-glyphicon-time:before,.arflite_main_div_' + form_id + ' .arf-glyphicon-calendar:before{color:' + fontcolor + ' important;}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( timepick_footer_header_icon );
			var timepick_footer_header = '.arflite_main_div_' + form_id + ' .arf_cal_header th, .arflite_main_div_' + form_id + ' .arf_cal_month th{ color : ' + fontcolor + ' !important;}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( timepick_footer_header );
			var picker_switch = '.arflite_main_div_' + form_id + ' .picker-switch td span:hover{ background-color : ' + color_val + ' !important;}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( picker_switch );
			var timepick_footer_header = '.arflite_main_div_' + form_id + ' .picker-switch td span.arf-glyphicon-time,.arflite_main_div_' + form_id + ' .picker-switch td span.arf-glyphicon-calendar{background-color:' + color_val + '}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( timepick_footer_header );
			var timepick_footer_header_icon = '.arflite_main_div_' + form_id + ' .arf-glyphicon-time:before,.arflite_main_div_' + form_id + ' .arf-glyphicon-calendar:before{color:' + fontcolor + '}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( timepick_footer_header_icon );
			var style_active = '.arflite_main_div_' + form_id + ' .bootstrap-datetimepicker-widget table td span.active, .arflite_main_div_' + form_id + ' .bootstrap-datetimepicker-widget table td span.active:hover{ background-color:' + color_val + ' !important;color:' + fontcolor + '}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( style_active );
			var style_hover = '.arflite_main_div_' + form_id + ' .bootstrap-datetimepicker-widget table td span:hover{border-color:' + color_val + ' !important}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( style_hover );
			var selected_date_col = '.arflite_main_div_' + form_id + ' .bootstrap-datetimepicker-widget table td.active, .arflite_main_div_' + form_id + ' .bootstrap-datetimepicker-widget table td.active:hover{color : ' + color_val + ' !important}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( selected_date_col );
			dStyle = '.arflite_main_div_' + form_id + ' .controls .bootstrap-datetimepicker-widget table td.day:not(.active):hover{background-color:#F5F5F5 !important;}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( dStyle );
		}
	}
);
jQuery( document ).on(
	'change',
	'#arfdatepickertextcolorsetting',
	function(e) {
		var color_val = jQuery( this ).val();

		var form_id = jQuery( '#id' ).val();
		if (jQuery( '#arfmainforminputstyle' ).val() != 'material') {
			var stand_cal_font_col = '.arflite_main_div_' + form_id + ' .bootstrap-datetimepicker-widget table td.day{ color : ' + color_val + '}';
			jQuery( "#arf_" + form_id + "_datepicker_bgcolor" ).append( stand_cal_font_col );
		}
	}
);
jQuery( document ).on(
	'change',
	'.arf_toggle_btn input',
	function(e) {
		jQuery( this ).parents( '.arf_toggle_button_group' ).find( '.arf_toggle_btn' ).removeClass( 'arf_success' );
		if (jQuery( this ).is( ':checked' )) {
			jQuery( this ).parent().addClass( 'arf_success' );
		}
	}
);
jQuery( document ).on(
	'change',
	'.arf_form_margin_box',
	function(e) {
		var arfformtitlepaddingsetting_1 = jQuery( '#arfformtitlepaddingsetting_1' ).val();
		var arfformtitlepaddingsetting_2 = jQuery( '#arfformtitlepaddingsetting_2' ).val();
		var arfformtitlepaddingsetting_3 = jQuery( '#arfformtitlepaddingsetting_3' ).val();
		var arfformtitlepaddingsetting_4 = jQuery( '#arfformtitlepaddingsetting_4' ).val();
		var arfformtitlepaddingsetting   = arfformtitlepaddingsetting_1 + 'px ' + arfformtitlepaddingsetting_2 + 'px ' + arfformtitlepaddingsetting_3 + 'px ' + arfformtitlepaddingsetting_4 + 'px ';
		jQuery( "#arfformtitlepaddingsetting" ).val( arfformtitlepaddingsetting );
	}
);
jQuery( document ).on(
	'change',
	'.arf_form_padding_box',
	function(e) {
		var arfmainfieldsetpadding_1 = jQuery( '#arfmainfieldsetpadding_1' ).val();
		var arfmainfieldsetpadding_2 = jQuery( '#arfmainfieldsetpadding_2' ).val();
		var arfmainfieldsetpadding_3 = jQuery( '#arfmainfieldsetpadding_3' ).val();
		var arfmainfieldsetpadding_4 = jQuery( '#arfmainfieldsetpadding_4' ).val();
		var arfmainfieldsetpadding   = arfmainfieldsetpadding_1 + 'px ' + arfmainfieldsetpadding_2 + 'px ' + arfmainfieldsetpadding_3 + 'px ' + arfmainfieldsetpadding_4 + 'px ';
		jQuery( "#arfmainfieldsetpadding" ).val( arfmainfieldsetpadding );
	}
);
jQuery( document ).on(
	'change',
	'.arf_form_padding_box_tablet',
	function(e) {
		var arfmainfieldsetpadding_1_tablet = jQuery( '#arfmainfieldsetpadding_1_tablet' ).val();
		var arfmainfieldsetpadding_2_tablet = jQuery( '#arfmainfieldsetpadding_2_tablet' ).val();
		var arfmainfieldsetpadding_3_tablet = jQuery( '#arfmainfieldsetpadding_3_tablet' ).val();
		var arfmainfieldsetpadding_4_tablet = jQuery( '#arfmainfieldsetpadding_4_tablet' ).val();
		var arfmainfieldsetpadding_tablet   = arfmainfieldsetpadding_1_tablet + 'px ' + arfmainfieldsetpadding_2_tablet + 'px ' + arfmainfieldsetpadding_3_tablet + 'px ' + arfmainfieldsetpadding_4_tablet + 'px ';
		jQuery( "#arfmainfieldsetpadding_tablet" ).val( arfmainfieldsetpadding_tablet );
	}
);
jQuery( document ).on(
	'change',
	'.arf_form_padding_box_mobile',
	function(e) {
		var arfmainfieldsetpadding_1_mobile = jQuery( '#arfmainfieldsetpadding_1_mobile' ).val();
		var arfmainfieldsetpadding_2_mobile = jQuery( '#arfmainfieldsetpadding_2_mobile' ).val();
		var arfmainfieldsetpadding_3_mobile = jQuery( '#arfmainfieldsetpadding_3_mobile' ).val();
		var arfmainfieldsetpadding_4_mobile = jQuery( '#arfmainfieldsetpadding_4_mobile' ).val();
		var arfmainfieldsetpadding_mobile   = arfmainfieldsetpadding_1_mobile + 'px ' + arfmainfieldsetpadding_2_mobile + 'px ' + arfmainfieldsetpadding_3_mobile + 'px ' + arfmainfieldsetpadding_4_mobile + 'px ';
		jQuery( "#arfmainfieldsetpadding_mobile" ).val( arfmainfieldsetpadding_mobile );
	}
);
jQuery.loadScript = function(url) {
	jQuery.ajax(
		{
			url: url,
			dataType: 'script',
			success: function(resp) {
				arflite_create_script_node( document, 'script', 'arfbootstrap-autcomplete-js', url );
			},
			async: true
		}
	);
}

function arflite_get_datepicker_select_image($rgbCol) {
	var $return = "<svg xmlns='http://www.w3.org/2000/svg' width='35px' height='29px'><path fill='" + $rgbCol + "' d='M15.732,27.748c0,0-14.495,0.2-14.71-11.834c0,0,0.087-7.377,7.161-11.82 c0,0,0.733-0.993-1.294-0.259c0,0-1.855,0.431-3.538,2.2c0,0-1.078,0.216-0.388-1.381c0,0,2.416-3.019,8.585-2.76 c0,0,2.372-2.458,7.419-1.293c0,0,0.819,0.517-0.518,0.819c0,0-5.361,0.514-3.753,1.122c0,0,14.021,3.073,14.322,13.943 C29.019,16.484,29.573,27.32,15.732,27.748z M26.991,16.182C26.24,7.404,14.389,3.543,14.389,3.543 c-2.693-0.747-4.285,0.683-4.285,0.683C8.767,4.969,6.583,7.804,6.583,7.804C2.216,13.627,3.612,18.47,3.612,18.47 c2.168,7.635,12.505,7.097,12.505,7.097C27.376,25.418,26.991,16.182,26.991,16.182z'/></svg>";
	return Base64.encode( $return );
}

function arflite_get_required_icon_image($rgbCol) {
	var $return = "<svg xmlns='http://www.w3.org/2000/svg' width='16px' height='17px'><path fill='" + $rgbCol + "' d='M16.975,7.696l-0.732-2.717l-6.167,1.865l0.312-6.276H7.562l0.31,6.276L1.666,4.979L0.975,7.696L7.1,8.939l-3.69,5.574 l2.327,1.555l3.218-5.734l3.259,5.734l2.286-1.555L10.85,8.939L16.975,7.696z'/></svg>";
	return Base64.encode( $return );
}

function arflitehextorgbcolor(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
	return result ? {
		r: parseInt( result[1], 16 ),
		g: parseInt( result[2], 16 ),
		b: parseInt( result[3], 16 )
	} : null;
}

function arflitehtml2text(html) {
	var tag       = document.createElement( 'div' );
	tag.innerHTML = html;
	return tag.innerText;
}

function arflite_update_color(jscolor, id, is_element) {
	if (is_element == '' || is_element == null || is_element == 'undefined') {
		is_element = 0;
	}
	jQuery( '.arf_js_colorpicker' ).find( 'input#arf_color_picker_input' ).val( jscolor );
	if (is_element == 1) {
		jQuery( '#' + id ).val( '#' + jscolor ).trigger( 'change' );
	} else {
		if ( ! jQuery( '#' + id ).hasClass( 'jscolor' )) {
			jQuery( '#' + id ).val( '#' + jscolor ).trigger( 'change' );
		} else {
			jQuery( '#' + id ).next( 'input[type="hidden"]' ).trigger( 'change' );
		}
	}
	jQuery( "#arf_color_picker_input" ).val( jscolor );
	if (jQuery( '#' + id ).hasClass( 'arf_editor_colorpicker' )) {
		var inputstyle = jQuery( '#' + id ).attr( 'style' );
		inputstyle     = inputstyle.replace( /(background\-color\:(.*?)\;)/ig, '' );
		jQuery( '#' + id ).attr( 'style', inputstyle + 'background-color:#' + jscolor + ' !important' );
		var bgcol     = jQuery( '#' + id ).css( 'background-color' );
		var textColor = arflite_invert_color( bgcol );
		textColor     = 'rgb(' + textColor + ')';
		inputstyle    = inputstyle.replace( /(background\-color\:(.*?)\;)/ig, '' );
		inputstyle    = inputstyle.replace( /(color\:(.*?)\;)/ig, '' );
		jQuery( '#' + id ).attr( 'style', inputstyle + 'color:' + textColor + ' !important;background-color:#' + jscolor + ' !important;' );
	}
}
jQuery( document ).on(
	'dp.change',
	'.arf_editor_datetimepicker',
	function(e) {
		var $this   = jQuery( this );
		var attr_id = $this.parents( '.arfmainformfield' ).attr( 'id' );
		var id      = attr_id.replace( 'arf_field_', '' );
		setTimeout(
			function() {
				var field_val  = $this.val();
				var field_data = arflite_retrieve_field_data( id );

				var default_data_formate = document.getElementById( 'frm_date_format' ).value;
				var date_locale          = field_data.locale;
				var date_format          = (default_data_formate != "" && default_data_formate != null) ? default_data_formate : 'MM/DD/YYYY';
				var show_timepicker      = (field_data.show_time_calendar == 1) ? true : false;
				var clock                = field_data.clock;
				if (show_timepicker) {
					if (clock == 12) {
						date_format += ' h:mm';
						date_format += ' A';
					} else {
						date_format += ' H:mm';
					}
				}

				if (field_val != '') {
					var momentobj = moment( field_val, date_format, date_locale );
					field_val     = momentobj.locale( 'en' ).format( date_format );
				}

				field_data.selectdefaultdate = field_val;

				field_data = JSON.stringify( field_data );
				jQuery( "#arf_field_data_" + id ).val( field_data ).trigger( 'change' );
			},
			100
		);
	}
);
jQuery( document ).on(
	'click',
	'#arf_add_favorite_color_btn',
	function(e) {
		var $this  = jQuery( this );
		var $id    = $this.attr( 'data-value' );
		var $color = jQuery( '#' + $id ).val();
		if ($color === undefined) {
			return;
		}
		var colors = arflite_get_favourite_color();
		if (jQuery.inArray( $color, colors ) > -1) {
			return;
		}
		if (jQuery.inArray( $color, colors ) && $color != '') {
			colors.splice( 0, 0, $color );
		}
		if (colors.length > 7) {
			colors = colors.slice( 0, 7 );
		}
		if (colors.length) {
			var current = new Date();
			current.setMonth( current.getMonth() + 1 );
			document.cookie = 'arf_fav_color[colors]=' + colors.join( ',' ) + '; expires=' + current.toGMTString();
		}
		var favorite_colors = arflitegetCookie( 'arf_fav_color[colors]' );
		var object          = jQuery( '.arf_js_colorpicker' ).find( '.arf_favorite_color_buttons' );
		object.html( '' );
		if (favorite_colors !== undefined && favorite_colors !== '') {
			var fav_cols = favorite_colors.split( ',' );
			for (var n in fav_cols) {
				var color = fav_cols[n];
				var div   = document.createElement( 'div' );
				div.setAttribute( 'class', 'select_from_fav_color' );
				div.setAttribute( 'value', color );
				div.setAttribute( 'style', 'background:' + color );
				if (n < 7) {
					object.append( div );
				}
			}
		}
	}
);
jQuery( document ).on(
	'change',
	'#arfmainbordersetting',
	function(e) {
		var rStyle   = '';
		var $form_id = jQuery( '#id' ).val();
		rStyle       = '<style type="text/css" id="arf_' + $form_id + '_input_border_radius_prefix">.arflite_main_div_' + $form_id + ' .controls .arf_editor_prefix_suffix_wrapper.arf_both_pre_suffix input[type=text]:not(.inplace_field):not(.arf_field_option_input_text) {border-radius: 0px !important; -webkit-border-radius: 0px !important; -o-border-radius: 0px !important; -moz-border-radius: 0px !important;}body:not(.rtl) .arflite_main_div_' + $form_id + ' .controls .arf_editor_prefix_suffix_wrapper.arf_prefix_only input[type=text]:not(.inplace_field):not(.arf_field_option_input_text) {border-top-left-radius: 0px !important;border-bottom-left-radius: 0px !important;}body.rtl .arflite_main_div_' + $form_id + ' .controls .arf_editor_prefix_suffix_wrapper.arf_prefix_only input[type=text]:not(.inplace_field):not(.arf_field_option_input_text) {border-top-right-radius: 0px !important;border-bottom-right-radius: 0px !important;}body:not(.rtl) .arflite_main_div_' + $form_id + ' .controls .arf_editor_prefix_suffix_wrapper.arf_suffix_only input[type=text]:not(.inplace_field):not(.arf_field_option_input_text) {border-top-right-radius: 0px !important;border-bottom-right-radius: 0px !important;}body.rtl .arflite_main_div_' + $form_id + ' .controls .arf_editor_prefix_suffix_wrapper.arf_suffix_only input[type=text]:not(.inplace_field):not(.arf_field_option_input_text){border-top-left-radius: 0px !important;border-bottom-left-radius: 0px !important;}</style>';
		if (jQuery( "#arf_" + $form_id + "_input_border_radius_prefix" ).length > 0) {
			jQuery( "#arf_" + $form_id + "_input_border_radius_prefix" ).remove();
		}
		jQuery( "body" ).append( rStyle );
	}
);
jQuery( document ).on(
	'change',
	'#arf_input_border_style_dashed,#arf_input_border_style_dotted,#arf_input_border_style_solid',
	function(e) {
		var rStyle   = '';
		var $form_id = jQuery( '#id' ).val();
		rStyle       = '<style type="text/css" id="arf_' + $form_id + '_input_border_style_prefix">.arflite_main_div_' + $form_id + ' .controls .arf_editor_prefix_suffix_wrapper.arf_both_pre_suffix input[type=text]:not(.inplace_field):not(.arf_field_option_input_text){border-radius:0px !important; -webkit-border-radius:0px !important; -moz-border-radius:0px !important; -o-border-radius:0px !important; border-left-style:none !important;border-right-style:none !important;}</style>';
		if (jQuery( "#arf_" + $form_id + "_input_border_style_prefix" ).length > 0) {
			jQuery( "#arf_" + $form_id + "_input_border_style_prefix" ).remove();
		}
		jQuery( "body" ).append( rStyle );
	}
);
jQuery( document ).on(
	'change',
	'#arffieldfontsizesetting,#arfmainfieldwidthsetting,#arffieldunit',
	function(e) {
		var fStyle              = '';
		var $form_id            = jQuery( '#id' ).val();
		var $arf_prefix_width   = '';
		var $arf_prefix_padding = '0 10px';
		var $field_font_size    = jQuery( '#arffieldfontsizesetting' ).val();
		if ($field_font_size < 10) {
			$arf_prefix_width = '32px;';
		} else if ($field_font_size >= 10 && $field_font_size < 12) {
			$arf_prefix_width = '34px;';
		} else if ($field_font_size >= 12 && $field_font_size < 14) {
			$arf_prefix_width = '36px;';
		} else if ($field_font_size >= 14 && $field_font_size < 16) {
			$arf_prefix_width = '38px;';
		} else if ($field_font_size >= 16 && $field_font_size < 18) {
			$arf_prefix_width = '40px;';
		} else if ($field_font_size >= 18 && $field_font_size < 20) {
			$arf_prefix_width = '42px;';
		} else if ($field_font_size >= 20 && $field_font_size < 22) {
			$arf_prefix_width = '44px;';
		} else if ($field_font_size == 22) {
			$arf_prefix_width = '46px;';
		} else if ($field_font_size == 24) {
			$arf_prefix_width = '51px;';
		} else if ($field_font_size == 26) {
			$arf_prefix_width = '53px;';
		} else if ($field_font_size == 28) {
			$arf_prefix_width = '55px;';
		} else if ($field_font_size == 32) {
			$arf_prefix_width = '60px;';
		} else if ($field_font_size == 34) {
			$arf_prefix_width = '62px;';
		} else if ($field_font_size == 36) {
			$arf_prefix_width = '64px;';
		} else if ($field_font_size == 38) {
			$arf_prefix_width = '67px;';
		} else if ($field_font_size == 40) {
			$arf_prefix_width = '70px;';
		}
		fStyle = '<style type="text/css" id="arf_' + $form_id + '_input_font_size_prefix">.arflite_main_div_' + $form_id + ' .arf_editor_prefix_suffix_wrapper .arf_editor_prefix_icon, .arflite_main_div_' + $form_id + ' .arf_editor_prefix_suffix_wrapper .arf_editor_suffix_icon{width:' + $arf_prefix_width + ';}</style>';
		if (jQuery( "#arf_" + $form_id + "_input_font_size_prefix" ).length > 0) {
			jQuery( "#arf_" + $form_id + "_input_font_size_prefix" ).remove();
		}
		jQuery( "body" ).append( fStyle );
		jQuery( "#arfmainbordersetting" ).trigger( 'change' );
	}
);
jQuery( document ).on(
	'click',
	'.select_from_fav_color',
	function(e) {
		var $this = jQuery( this );
		var color = $this.attr( 'value' );
		jQuery( "#arf_color_picker_input" ).val( color.replace( '#', '' ) );
		var id = $this.parents().find( '.arf_add_favorite_color_btn' ).attr( 'data-value' );
		jQuery( ".arf_custom_color_popup_picker[data-fid='" + id + "']" ).css( 'background-color', color );
		jQuery( "#" + id ).val( color ).trigger( 'change' );
		if (/(itemmeta_(\d+))/gi.test( id )) {
			var elm = jQuery( "#" + id )[0];
		} else if (jQuery( "#" + id ).hasClass( 'arf_js_colorpicker' )) {
			var elm = jQuery( "#" + id )[0];
		} else if (/(upload_btn_color_[\d+]|upload_font_color_[\d+]|slider_bg_color_[\d+]|slider_bg_color2_[\d+]|slider_handle_color_[\d+])/.test( id )) {
			var elm = jQuery( "#" + id ).prev().find( '.arf_coloroption' )[0];
		} else {
			var elm = jQuery( "#" + id ).prev()[0];
		}

		if ( typeof elm.jscolor != 'undefined' ) {
			let new_color = color.replace( '#', '' );
			elm.jscolor.fromString( new_color );
		}

	}
);

function arflite_extract_property_class_from_string($innerData, $form_id, $value, $this) {
	var $class    = $innerData[0];
	var $property = $innerData[1];
	$class        = $class.replace( /{arf_form_id}/g, $form_id );
	if ($property == 'font-size' || /padding/g.test( $property ) || $property == 'border-bottom-width' || $property == 'border-left-width' || $property == 'border-top-width' || $property == 'border-left-width' || $property == 'border-width' || $property == 'border-radius' || /margin/g.test( $property ) || $property == 'width' || $property == 'height') {
		if ( ! /px/g.test( $value )) {
			$value = $value + 'px';
		}
	}
	if (/{arf_form_width_unit}/g.test( $property )) {
		var $width_unit = $property.replace( /(.*?){arf_form_width_unit}/g, jQuery( "#arffu" ).val() );
		$property       = $property.replace( /{arf_form_width_unit}/g, '' );
		$value          = $value + $width_unit;
	}
	var inner_padding_pattern = /(\.dropdown\-toggle \.filter\-option)/gi;
	var temp_value            = $value;
	if (inner_padding_pattern.test( $class ) && ($property == 'right' || $property == 'left')) {
		temp_value = $value;
		if ($property == 'right') {
			temp_value = (parseInt( temp_value.replace( 'px', '' ) )) + 13;
			$value     = temp_value + 'px';
		} else {
			$value = temp_value + 'px';
		}
	} else {
		$value = temp_value;
	}
	if ($this.attr( 'id' ) == 'arffieldinnermarginsetting_2' && $value.indexOf( 'NaN' ) > -1) {
		$value = "0px";
	}

	var border_top_radius_value = $value;
	if ($property == "border-top-left-radius-custom" || $property == "border-top-right-radius-custom") {
		$value = jQuery( "#arfmainbordersetting" ).val() + 'px';
		if ($property == "border-top-left-radius-custom") {
			$property = "border-top-left-radius";
		} else {
			$property = "border-top-right-radius";
		}
		var $newvalue = $value.replace( 'px', '' ).trim();
		if ($newvalue > 19) {
			var arffieldfontsizesetting_chk_for_radius = jQuery( '#arffieldfontsizesetting' ).val();
			if ($newvalue > arffieldfontsizesetting_chk_for_radius) {
				if (arffieldfontsizesetting_chk_for_radius >= 40) {
					$value = '36px';
				} else if (arffieldfontsizesetting_chk_for_radius >= 36) {
					$value = '34px';
				} else if (arffieldfontsizesetting_chk_for_radius > 20) {
					$value = arffieldfontsizesetting_chk_for_radius + 'px';
				} else {
					$value = '20px';
				}
			} else if ($newvalue > 36 && arffieldfontsizesetting_chk_for_radius == 40) {
				$value = '36px';
			} else if (arffieldfontsizesetting_chk_for_radius > 14) {
				$value = border_top_radius_value;
			} else {
				$value = '20px';
			}
		} else {
			$value = border_top_radius_value;
		}
	} else {
		$value = border_top_radius_value;
	}
	if ($property == 'field-margin-bottom') {
		$property       = 'margin-bottom';
		var $temp_value = (parseInt( $value ) - 19);
		$value          = $temp_value + 'px';
	}
	var inputStyle              = jQuery( "#arfmainforminputstyle" ).val();
	var $checkbox_radio_pattern = /(\.arf_fieldset\s\.(arf_checkbox_style))/g;
	if ($checkbox_radio_pattern.test( $class ) && $property == 'padding-left') {
		var $check_radio_width = parseInt( $value );
		if (inputStyle == 'material') {
			var $final_check_radio_width = (($check_radio_width) + 12);
			if ($final_check_radio_width < 42) {
				$final_check_radio_width = 30;
			}
			$value = $final_check_radio_width + "px !important;";
		} else {
			var $final_check_radio_width = (($check_radio_width));
			if ($final_check_radio_width < 32) {
				$final_check_radio_width = 30;
			}
			$value = $final_check_radio_width + "px !important;";
		}

	}
	var $checkbox_radio_pattern = /(\.arf_fieldset\s\.(arf_radiobutton))/g;
	if ($checkbox_radio_pattern.test( $class ) && $property == 'padding-left') {
		var $check_radio_width = parseInt( $value );
		if (inputStyle == 'material') {
			var $final_check_radio_width = (($check_radio_width));
			if ($final_check_radio_width < 30) {
				$final_check_radio_width = 30;
			}
			$value = $final_check_radio_width + "px !important;";
		} else {
			var $final_check_radio_width = (($check_radio_width) + 6);
			if ($final_check_radio_width < 32) {
				$final_check_radio_width = 30;
			}
			$value = $final_check_radio_width + "px !important;";
		}
	}
	var $chk_rad_pattern = /(\.arf_fieldset\s\.(arf_checkbox_style\:not\(\.arf_enable_checkbox_image_editor\)\:not\(\.arf_enable_checkbox_image\)|arf_radiobutton\:not\(\.arf_enable_radio_image_editor\)\:not\(\.arf_enable_radio_image\))\s\.(arf_radio_input_wrapper|arf_checkbox_input_wrapper))/g;
	if ($chk_rad_pattern.test( $class ) && $property == 'margin-left') {
		var $chk_rad_width       = parseInt( $value );
		var $final_chk_rad_width = (($check_radio_width - 5) + 12);
		if ($final_chk_rad_width < 30) {
			$final_chk_rad_width = 30;
		}
		if ($final_chk_rad_width == '') {
			$final_chk_rad_width = 0;
		}
		$value = "-" + $final_chk_rad_width + "px !important;";
	}
	if ($property == 'arf_form_width_unit') {
		var width = jQuery( "input[name='arffw']" ).val();
		var unit  = $value;
		$value    = width + unit;
		$property = 'max-width';
		var unit  = jQuery( "input[name='arffu']" ).val();
		jQuery( '#arf_editor_form_width_unit' ).val( unit );
		jQuery( '#arf_editor_form_width_unit' ).next( 'dl' ).find( 'span' ).text( unit );
		jQuery( '#arf_editor_form_width_unit' ).next( 'dl' ).find( 'input' ).val( unit );
	}
	if ($property == 'max-width') {
		var width = jQuery( "input[name='arffw']" ).val();
		jQuery( "#arf_editor_form_width" ).val( width );
	}
	if (/{arf_field_width_unit}/g.test( $property )) {
		var $width_unit = $property.replace( /(.*?){arf_field_width_unit}/g, jQuery( "#arffieldunit" ).val() );
		$property       = $property.replace( /{arf_field_width_unit}/g, '' );
		if ($value == jQuery( "#arffieldunit" ).val()) {
			$value = jQuery( "#arfmainfieldwidthsetting" ).val();
		}
		$value = $value + $width_unit;
	}
	if ($property == 'arf_field_width_unit') {
		var width = jQuery( "input[name='arfmfiws']" ).val();
		var unit  = $value;
		$value    = width + unit;
		$property = 'width';
	}
	if ($property == 'direction') {
		if ($value == '1' || $value == 'ltr' || $value == 'left') {
			$value = 'ltr';
		} else {
			$value = 'rtl';
		}
	}
	if ($property == 'text-align') {
		if ($value == '1' || $value == 'left' || $value == 'ltr') {
			$value = 'left';
		} else if ($value == '0' || $value == 'right' || $value == 'rtl') {
			$value = 'right';
		}
	}
	if ($property == 'check_field_transparency') {
		var arf_arfmainfield_opacity = jQuery( '#arfmainfield_opacity' ).is( ':checked' );
		if (arf_arfmainfield_opacity) {
			$property = "background";
			$value    = "transparent";
		} else {
			$property = "background-color";
			$value    = jQuery( "#frm_bg_color" ).val();
		}
	}
	if ($property == 'req_indicator') {
		var arf_hide_req_indicator = jQuery( '#arfreq_inc' ).is( ':checked' );
		if (arf_hide_req_indicator) {
			$property = 'display';
			$value    = "none";
		} else {
			$property = 'display';
			$value    = 'inline-block';
		}
	}
	if ($property == 'check_field_focus_transparency') {
		var arf_arfmainfield_opacity = jQuery( '#arfmainfield_opacity' ).is( ':checked' );
		if (arf_arfmainfield_opacity) {
			$property = "background";
			$value    = "transparent";
		} else {
			$property = "background-color";
			$value    = jQuery( "#arfbgcoloractivesetting" ).val();
		}
	}
	if (($property == 'field_transparency' || $property == 'field_transparency_focus') && $this.is( ':checked' )) {
		$property = "background";
		$value    = "transparent";
		jQuery( "#frm_bg_color" ).trigger( 'change' );
		jQuery( "#arfbgcoloractivesetting" ).trigger( 'change' );
	} else if ($property == 'field_transparency' && ! $this.is( ':checked' )) {
		$property = "background-color";
		$value    = jQuery( "#frm_bg_color" ).val();
		jQuery( "#frm_bg_color" ).trigger( 'change' );
		jQuery( "#arfbgcoloractivesetting" ).trigger( 'change' );
	} else if ($property == 'field_transparency_focus' && ! $this.is( ':checked' )) {
		$property = "background-color";
		$value    = jQuery( "#arfbgcoloractivesetting" ).val();
		jQuery( "#frm_bg_color" ).trigger( 'change' );
		jQuery( "#arfbgcoloractivesetting" ).trigger( 'change' );
	}
	if ($property == 'arf_set_left_position') {
		$property = "left";
		$value    = "0px";
	}
	if ($property == 'arf_set_right_position') {
		$property = "right";
		$value    = "0px";
	}
	if ($property == 'arf_set_right_position_inherit') {
		$property = "left";
		$value    = "inherit";
	}
	if ($property == 'arf_set_left_position_inherit') {
		$property = "right";
		$value    = "inherit";
	}
	if ($property == 'box-shadow') {
		$property        = "box-shadow";
		var $arf_xoffset = jQuery( "#arfsubmitbuttonxoffsetsetting" ).val() + 'px';
		var $arf_yoffset = jQuery( "#arfsubmitbuttonyoffsetsetting" ).val() + 'px';
		var $arf_blur    = jQuery( "#arfsubmitbuttonblursetting" ).val() + 'px';
		var $arf_spread  = jQuery( "#arfsubmitbuttonshadowsetting" ).val() + 'px';

		if ( $class == ".arflite_main_div_" + $form_id + " .arfsubmitbutton .arf_submit_btn" || $class == ".arflite_main_div_" + $form_id + " .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn.arf_submit_btn_flat" ) {
			let box_shadow_color = jQuery( "#arfsubmitbuttonshadowcolorsetting" ).val();
			$value               = $arf_xoffset + "  " + $arf_yoffset + " " + $arf_blur + " " + $arf_spread + " " + box_shadow_color;
		} else {
			if ($value != 'shadow') {
				if (jQuery( 'input:radio[name=arffbs]:checked' ).val() == 'shadow') {
					$value = "0 0 7px 2px  " + $value;
				}
			} else {
				if ($class == ".arflite_main_div_" + $form_id + " .arf_fieldset") {
					var shadow_color = jQuery( '#arfformbordershadowsetting' ).val();
					$value           = "0 0 7px 2px " + shadow_color;
				} else {
					$value = "0 0 7px 2px ";
				}
			}
		}
	} else if ($property == 'box-shadow-none') {
		$property = "box-shadow";
		$value    = "none";
	}
	var newRegex = new RegExp( '^.arflite_main_div_' + $form_id + ' .arf_fieldset+$', 'g' );
	if (newRegex.test( $class )) {
		var form_opacity = jQuery( "#arfmainform_opacity" ).val();
		if (form_opacity < 1 && form_opacity > 0) {
			var rgb = arflitehextorgbcolor( $value );
			if (rgb != null) {
				var r  = rgb.r;
				var g  = rgb.g;
				var b  = rgb.b;
				$value = "rgba(" + r + "," + g + "," + b + "," + form_opacity + ") !important;";
			}
		} else if (form_opacity == 0) {
			$value = 'rgba(0,0,0,0) !important;';
		}
	}
	return $class + '~~' + $property + '~~' + $value;
}
jQuery( document ).on(
	'keyup',
	'.controls input[type="text"]',
	function() {
		var field_name         = jQuery( this ).attr( 'name' );
		var field_name_pattern = /(item_meta\[(\d+)\])/gi;
		if (field_name_pattern.test( field_name )) {
			var field_val            = jQuery( this ).val();
			var field_id             = field_name.replace( 'item_meta[', '' );
			field_id                 = field_id.replace( ']', '' );
			var field_data           = arflite_retrieve_field_data( field_id );
			field_data.default_value = field_val;

			if (typeof field_data.confirm_email != undefined && field_data.confirm_email != '' && field_data.confirm_email != 0) {
				jQuery( "#arf_field_" + field_id + "_confirm input[type='text'][name='confirm_email']" ).val( field_data.default_value );
			}
			field_data = JSON.stringify( field_data );
			jQuery( "#arf_field_data_" + field_id ).val( field_data ).trigger( 'change' );
		}
	}
);

function arflite_reset_style_functionality() {
	var delete_popup_html = '';
	var style             = '';

	delete_popup_html += '<div class="delete_popup delete_form_popup arfactive" id="arfreset_style_popup">';
	delete_popup_html += '<div class="delete_column_arrow"></div>';
	delete_popup_html += '<div class="delete_title"><div class="delete_confirm_message">' + __ARF_RESET_STYLE_MSG + '</div>';
	delete_popup_html += '<div class="delete_popup_footer">';
	delete_popup_html += '<button type="button" class="rounded_button add_button arf_delete_modal_left arfdelete_color_red" onclick="arflite_do_reset_style();">' + __ARF_RESET_TEXT + '</button>';
	delete_popup_html += '<button type="button" class="rounded_button delete_button arfdelete_color_gray" onclick="arflite_resetdelete_close_popup_form();">' + __ARF_CANCEL_TEXT + '</button>';
	delete_popup_html += '</div>';
	delete_popup_html += '</div>';
	delete_popup_html += '</div>';
	var select_content = jQuery( '.arf_top_menu_cancel_button' );
	jQuery( delete_popup_html ).insertAfter( select_content );
	jQuery( '#arfreset_style_popup' ).show();
}

function arflite_resetdelete_close_popup_form() {
	jQuery( '#arfreset_style_popup' ).hide();
	if (jQuery( '#arfreset_style_popup' ).length > 0) {
		jQuery( '#arfreset_style_popup' ).remove();
	}
}

function arflite_do_reset_style() {
	jQuery( "#arf_reset_styling" ).val( true );
	arflite_resetdelete_close_popup_form();
	jQuery( '.arf_editor_live_css' ).remove();
	jQuery( '#arfsaveformloader' ).show();
	var change_style = jQuery( "#changed_style_attr" ).val();
	if (change_style == '') {
		jQuery( "#arf_reset_styling" ).val( false );
		jQuery( '#arfsaveformloader' ).hide();
		return false;
	}
	var json_data  = arflite_parse_json( change_style );
	var value_data = arflite_parse_json( jQuery( "#default_style_attr" ).val() );
	var totalData  = json_data.length;
	var xx         = 0;
	var value;
	var SleepCounter       = 0;
	var start_loading_time = new Date().getTime();
	for (var i = 0; i < totalData; i++) {
		var key         = json_data[i];
		var default_val = jQuery( "input[name='" + key + "']" ).val();
		if (key == 'arffbcs') {
			var value1 = value_data.arfmainformbgcolorsetting;
			if (default_val != value1) {
				jQuery( '#arfformbgcolorsetting' ).val( value1 );
				jQuery( '#arfformbgcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value1 );
				jQuery( '#arfformbgcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value1 );
			}
		} else if (key == 'arfftc') {
			var value2 = value_data.arfmainformtitlecolorsetting;
			if (default_val != value2) {
				jQuery( '#arfformtitlecolor' ).val( value2 );
				jQuery( '#arfformtitlecolor' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value2 );
				jQuery( '#arfformtitlecolor' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value2 );
			}
		} else if (key == 'arfmfsc') {
			var value3 = value_data.arfmainfieldsetcolor;
			if (default_val != value3) {
				jQuery( '#arfmainfieldsetcolor' ).val( value3 );
				jQuery( '#arfmainfieldsetcolor' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value3 );
				jQuery( '#arfmainfieldsetcolor' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value3 );
			}
		} else if (key == 'arffboss') {
			var value4 = value_data.arfmainformbordershadowcolorsetting;
			if (default_val != value4) {
				jQuery( '#arfformbordershadowsetting' ).val( value4 );
				jQuery( '#arfformbordershadowsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value4 );
				jQuery( '#arfformbordershadowsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value4 );
			}
		} else if (key == 'arffboss') {
			var value5 = value_data.arfmainformbordershadowcolorsetting;
			if (default_val != value5) {
				jQuery( '#arfformbordershadowsetting' ).val( value5 );
				jQuery( '#arfformbordershadowsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value5 );
				jQuery( '#arfformbordershadowsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value5 );
			}
		} else if (key == 'arf_tooltip_bg_color') {
			var value6 = value_data.arf_tooltip_bg_color;
			if (default_val != value6) {
				jQuery( '#arf_tooltip_bg_color' ).val( value6 );
				jQuery( '#arf_tooltip_bg_color' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value6 );
				jQuery( '#arf_tooltip_bg_color' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value6 );
			}
		} else if (key == 'arf_tooltip_font_color') {
			var value7 = value_data.arf_tooltip_font_color;
			if (default_val != value7) {
				jQuery( '#arf_tooltip_font_color' ).val( value7 );
				jQuery( '#arf_tooltip_font_color' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value7 );
				jQuery( '#arf_tooltip_font_color' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value7 );
			}
		} else if (key == 'arflcs') {
			var value14 = value_data.label_color;
			if (default_val != value14) {
				jQuery( '#arflabelcolorsetting' ).val( value14 );
				jQuery( '#arflabelcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value14 );
				jQuery( '#arflabelcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value14 );
			}
		} else if (key == 'arftcs') {
			var value15 = value_data.text_color;
			if (default_val != value15) {
				jQuery( '#arftextcolorsetting' ).val( value15 );
				jQuery( '#arftextcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value15 );
				jQuery( '#arftextcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value15 );
			}
		} else if (key == 'pfsfsbg') {
			var value16 = value_data.prefix_suffix_bg_color;
			if (default_val != value16) {
				jQuery( '#prefix_suffix_bg_color' ).val( value16 );
				jQuery( '#prefix_suffix_bg_color' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value16 );
				jQuery( '#prefix_suffix_bg_color' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value16 );
			}
		} else if (key == 'pfsfscol') {
			var value17 = value_data.prefix_suffix_icon_color;
			if (default_val != value17) {
				jQuery( '#prefix_suffix_icon_color' ).val( value17 );
				jQuery( '#prefix_suffix_icon_color' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value17 );
				jQuery( '#prefix_suffix_icon_color' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value17 );
			}
		} else if (key == 'arffmbc') {
			var value18 = value_data.bg_color;
			if (default_val != value18) {
				jQuery( '#frm_bg_color' ).val( value18 );
				jQuery( '#frm_bg_color' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value18 );
				jQuery( '#frm_bg_color' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value18 );
			}
		} else if (key == 'arfbcas') {
			var value19 = value_data.arfbgactivecolorsetting;
			if (default_val != value19) {
				jQuery( '#arfbgcoloractivesetting' ).val( value19 );
				jQuery( '#arfbgcoloractivesetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value19 );
				jQuery( '#arfbgcoloractivesetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value19 );
			}
		} else if (key == 'arfbecs') {
			var value20 = value_data.arferrorbgcolorsetting;
			if (default_val != value20) {
				jQuery( '#arfbgerrorcolorsetting' ).val( value20 );
				jQuery( '#arfbgerrorcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value20 );
				jQuery( '#arfbgerrorcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value20 );
			}
		} else if (key == 'arffmboc') {
			var value21 = value_data.border_color;
			if (default_val != value21) {
				jQuery( '#frm_border_color' ).val( value21 );
				jQuery( '#frm_border_color' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value21 );
				jQuery( '#frm_border_color' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value21 );
			}
		} else if (key == 'arfbacs') {
			var value22 = value_data.arfborderactivecolorsetting;
			if (default_val != value22) {
				jQuery( '#arfborderactivecolorsetting' ).val( value22 );
				jQuery( '#arfborderactivecolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value22 );
				jQuery( '#arfborderactivecolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value22 );
			}
		} else if (key == 'arfboecs') {
			var value23 = value_data.arferrorbordercolorsetting;
			if (default_val != value23) {
				jQuery( '#arfbordererrorcolorsetting' ).val( value23 );
				jQuery( '#arfbordererrorcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value23 );
				jQuery( '#arfbordererrorcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value23 );
			}
		} else if (key == 'cbscol') {
			var value24 = value_data.checked_checkbox_icon_color;
			if (default_val != value24) {
				jQuery( '#editor_checked_checkbox_icon_color' );
				jQuery( '#editor_checked_checkbox_icon_color' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value24 );
				jQuery( '#editor_checked_checkbox_icon_color' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value24 );
			}
		} else if (key == 'rbscol') {
			var value25 = value_data.checked_radio_icon_color;
			if (default_val != value25) {
				jQuery( '#editor_checked_radio_icon_color' ).val( value25 );
				jQuery( '#editor_checked_radio_icon_color' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value25 );
				jQuery( '#editor_checked_radio_icon_color' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value25 );
			}
		} else if (key == 'arfdbcs') {
			var value26 = value_data.arfdatepickerbgcolorsetting;
			if (default_val != value26) {
				jQuery( '#arfdatepickerbgcolorsetting' ).val( value26 );
				jQuery( '#arfdatepickerbgcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value26 );
				jQuery( '#arfdatepickerbgcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value26 );
			}
		} else if (key == 'arfdtcs') {
			var value27 = value_data.arfdatepickertextcolorsetting;
			if (default_val != value27) {
				jQuery( '#arfdatepickertextcolorsetting' ).val( value27 );
				jQuery( '#arfdatepickertextcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value27 );
				jQuery( '#arfdatepickertextcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value27 );
			}
		} else if (key == 'arfsbtcs') {
			var value28 = value_data.arfsubmittextcolorsetting;
			if (default_val != value28) {
				jQuery( '#arfsubmitbuttontextcolorsetting' ).val( value28 );
				jQuery( '#arfsubmitbuttontextcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value28 );
				jQuery( '#arfsubmitbuttontextcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value28 );
			}
		} else if (key == 'arfsbbcs') {
			var value29 = value_data.submit_bg_color;
			if (default_val != value29) {
				jQuery( '#arfsubmitbuttonbgcolorsetting' ).val( value29 );
				jQuery( '#arfsubmitbuttonbgcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value29 );
				jQuery( '#arfsubmitbuttonbgcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value29 );
			}
		} else if (key == 'arfsbchs') {
			var value30 = value_data.arfsubmitbuttonbgcolorhoversetting;
			if (default_val != value30) {
				jQuery( '#arfsubmitbuttoncolorhoversetting' ).val( value30 );
				jQuery( '#arfsubmitbuttoncolorhoversetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value30 );
				jQuery( '#arfsubmitbuttoncolorhoversetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value30 );
			}
		} else if (key == 'arfsbobcs') {
			var value31 = value_data.arfsubmitbordercolorsetting;
			if (default_val != value31) {
				jQuery( '#arfsubmitbuttonbordercolorsetting' ).val( value31 );
				jQuery( '#arfsubmitbuttonbordercolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value31 );
				jQuery( '#arfsubmitbuttonbordercolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value31 );
			}
		} else if (key == 'arfsbscs') {
			var value32 = value_data.arfsubmitshadowcolorsetting;
			if (default_val != value32) {
				jQuery( '#arfsubmitbuttonshadowcolorsetting' ).val( value32 );
				jQuery( '#arfsubmitbuttonshadowcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value32 );
				jQuery( '#arfsubmitbuttonshadowcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value32 );
			}
		} else if (key == 'arfmsbcs') {
			var value33 = value_data.arfsucessbgcolorsetting;
			if (default_val != value33) {
				jQuery( '#arfmainsucessbgcolorsetting' ).val( value33 );
				jQuery( '#arfmainsucessbgcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value33 );
				jQuery( '#arfmainsucessbgcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value33 );
			}
		} else if (key == 'arfmsbocs') {
			var value34 = value_data.arfsucessbordercolorsetting;
			if (default_val != value34) {
				jQuery( '#arfmainsucessbordercolorsetting' ).val( value34 );
				jQuery( '#arfmainsucessbordercolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value34 );
				jQuery( '#arfmainsucessbordercolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value34 );
			}
		} else if (key == 'arfmstcs') {
			var value35 = value_data.arfsucesstextcolorsetting;
			if (default_val != value35) {
				jQuery( '#arfmainsucesstextcolorsetting' ).val( value35 );
				jQuery( '#arfmainsucesstextcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value35 );
				jQuery( '#arfmainsucesstextcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value35 );
			}
		} else if (key == 'arfmvbcs') {
			var value36 = value_data.arfvalidationbgcolorsetting;
			if (default_val != value36) {
				jQuery( '#arfmainvalidationbgcolorsetting' ).val( value36 );
				jQuery( '#arfmainvalidationbgcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value36 );
				jQuery( '#arfmainvalidationbgcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value36 );
			}
		} else if (key == 'arfmvtcs') {
			var value37 = value_data.arfvalidationtextcolorsetting;
			if (default_val != value37) {
				jQuery( '#arfmainvalidationtextcolorsetting' ).val( value37 );
				jQuery( '#arfmainvalidationtextcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value37 );
				jQuery( '#arfmainvalidationtextcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value37 );
			}
		} else if (key == 'arftff') {
			var value38 = value_data.arftitlefontfamily;
			if (default_val != value38) {
				jQuery( '#arftitlefontsetting' ).val( value38 );
				var data_label = jQuery( 'dl[data-id="arftitlefontsetting"]' ).find( 'li[data-value="' + value38 + '"]' ).attr( 'data-label' );
				jQuery( '#arftitlefontsetting' ).next( 'dl' ).find( 'span' ).text( data_label );
				jQuery( '#arftitlefontsetting' ).next( 'dl' ).find( 'input' ).val( data_label );
			}
		} else if (key == 'arfftfss') {
			var value39 = value_data.form_title_font_size;
			if (default_val != value39) {
				jQuery( '#arfformtitlefontsizesetting' ).val( value39 );
				var data_label = jQuery( 'dl[data-id="arfformtitlefontsizesetting"] ul li[data-value="' + value39 + '"]' ).attr( 'data-label' );
				jQuery( '#arfformtitlefontsizesetting' ).next( 'dl' ).find( 'span' ).text( data_label );
				jQuery( '#arfformtitlefontsizesetting' ).next( 'dl' ).find( 'input' ).val( data_label );
			}
		} else if (key == 'arfftws') {
			var value40 = value_data.check_weight_form_title;
			if (default_val != value40) {
				jQuery( '#arfformtitleweightsetting' ).val( value40 );
				var data_label = jQuery( "li.arf_selectbox_option[data-value ='" + value40 + "']" ).attr( 'data-label' );
				jQuery( '#arfformtitleweightsetting' ).next( 'dl' ).find( 'span' ).text( data_label );
				jQuery( '#arfformtitleweightsetting' ).next( 'dl' ).find( 'input' ).val( data_label );
				jQuery( '[data-id="arfformtitleweightsetting"]' ).removeClass( 'active' );
				if (value40 != '') {
					var getarfftws_split = value40.split( ',' );
					for (var cd = 0; cd < getarfftws_split.length; cd++) {
						jQuery( '[data-style="' + getarfftws_split[cd] + '"][data-id="arfformtitleweightsetting"]' ).addClass( 'active' );
					}
				}
			}
		} else if (key == 'arfmfs') {
			var value41 = value_data.font;
			if (default_val != value41) {
				jQuery( '#arfmainfontsetting' ).val( value41 );
				var data_label = jQuery( 'dl[data-id="arfmainfontsetting"]' ).find( 'li[data-value="' + value41 + '"]' ).attr( 'data-label' );
				jQuery( '#arfmainfontsetting' ).next( 'dl' ).find( 'span' ).text( data_label );
				jQuery( '#arfmainfontsetting' ).next( 'dl' ).find( 'input' ).val( data_label );
			}
		} else if (key == 'arffss') {
			var value42 = value_data.font_size;
			if (default_val != value42) {
				jQuery( '#arffontsizesetting' ).val( value42 ).trigger( 'change' );
				var data_label = jQuery( 'dl[data-id="arffontsizesetting"]' ).find( 'li[data-value="' + value42 + '"]' ).attr( 'data-label' );
				jQuery( '#arffontsizesetting' ).next( 'dl' ).find( 'span' ).text( data_label );
				jQuery( '#arffontsizesetting' ).next( 'dl' ).find( 'input' ).val( data_label );
			}
		} else if (key == 'arfmfws') {
			var value43 = value_data.weight;
			if (default_val != value43) {
				jQuery( '#arfmainfontweightsetting' ).val( value43 );
				var data_label = jQuery( "li.arf_selectbox_option[data-value ='" + value43 + "']" ).attr( 'data-label' );
				jQuery( '#arfmainfontweightsetting' ).next( 'dl' ).find( 'span' ).text( data_label );
				jQuery( '#arfmainfontweightsetting' ).next( 'dl' ).find( 'input' ).val( data_label );
				jQuery( '[data-id="arfmainfontweightsetting"]' ).removeClass( 'active' );
				if (value43 != '') {
					var getarfftws_split = value43.split( ',' );
					for (var cd = 0; cd < getarfftws_split.length; cd++) {
						jQuery( '[data-style="' + getarfftws_split[cd] + '"][data-id="arfmainfontweightsetting"]' ).addClass( 'active' );
					}
				}
			}
		} else if (key == 'arfcbfs') {
			var value44 = value_data.check_font;
			if (default_val != value44) {
				jQuery( '#arfcheckboxfontsetting' ).val( value44 );
				var data_label = jQuery( 'dl[data-id="arfcheckboxfontsetting"]' ).find( 'li[data-value="' + value44 + '"]' ).attr( 'data-label' );
				jQuery( '#arfcheckboxfontsetting' ).next( 'dl' ).find( 'span' ).text( data_label );
				jQuery( '#arfcheckboxfontsetting' ).next( 'dl' ).find( 'input' ).val( data_label );
			}
		} else if (key == 'arfffss') {
			var value45 = value_data.field_font_size;
			if (default_val != value45) {
				jQuery( '#arffieldfontsizesetting' ).val( value45 );
				var data_label = jQuery( 'dl[data-id="arffieldfontsizesetting"] ' ).find( 'li[data-value="' + value45 + '"]' ).attr( 'data-label' );
				jQuery( '#arffieldfontsizesetting' ).next( 'dl' ).find( 'span' ).text( data_label );
				jQuery( '#arffieldfontsizesetting' ).next( 'dl' ).find( 'input' ).val( data_label );
			}
		} else if (key == 'arfcbws') {
			var value46 = value_data.check_weight;
			if (default_val != value46) {
				jQuery( '#arfcheckboxweightsetting' ).val( value46 );
				var data_label = jQuery( "li.arf_selectbox_option[data-value='" + value46 + "']" ).attr( 'data-label' );
				jQuery( '#arfcheckboxweightsetting' ).next( 'dl' ).find( 'span' ).text( data_label );
				jQuery( '#arfcheckboxweightsetting' ).next( 'dl' ).find( 'input' ).val( data_label );
				jQuery( '[data-id="arfcheckboxweightsetting"]' ).removeClass( 'active' );
				if (value46 != '') {
					var getarfftws_split = value46.split( ',' );
					for (var cd = 0; cd < getarfftws_split.length; cd++) {
						jQuery( '[data-style="' + getarfftws_split[cd] + '"][data-id="arfcheckboxweightsetting"]' ).addClass( 'active' );
					}
				}
			}
		} else if (key == 'arfsff') {
			var value47 = value_data.arfsubmitfontfamily;
			if (default_val != value47) {
				jQuery( '#arfsubmitfontfamily' ).val( value47 );
				var data_label = jQuery( 'dl[data-id="arfsubmitfontfamily"]' ).find( 'li[data-value="' + value47 + '"]' ).attr( 'data-label' );
				jQuery( '#arfsubmitfontfamily' ).next( 'dl' ).find( 'span' ).text( data_label );
				jQuery( '#arfsubmitfontfamily' ).next( 'dl' ).find( 'input' ).val( data_label );
			}
		} else if (key == 'arfsbfss') {
			var value48 = value_data.arfsubmitbuttonfontsizesetting;
			if (default_val != value48) {
				jQuery( '#arfsubmitbuttonfontsizesetting' ).val( value48 );
				var data_label = jQuery( 'dl[data-id="arfsubmitbuttonfontsizesetting"]' ).find( 'li[data-value="' + value48 + '"]' ).attr( 'data-label' );
				jQuery( '#arfsubmitbuttonfontsizesetting' ).next( 'dl' ).find( 'span' ).text( data_label );
				jQuery( '#arfsubmitbuttonfontsizesetting' ).next( 'dl' ).find( 'input' ).val( data_label );
			}
		} else if (key == 'arfsbwes') {
			var value49 = value_data.arfsubmitweightsetting;
			if (default_val != value49) {
				jQuery( '#arfsubmitbuttonweightsetting' ).val( value49 );
				var data_label = jQuery( "li.arf_selectbox_option[data-value='" + value49 + "']" ).attr( 'data-label' );
				jQuery( '#arfsubmitbuttonweightsetting' ).next( 'dl' ).find( 'span' ).text( data_label );
				jQuery( '#arfsubmitbuttonweightsetting' ).next( 'dl' ).find( 'input' ).val( data_label );
				jQuery( '[data-id="arfsubmitbuttonweightsetting"]' ).removeClass( 'active' );
				if (value49 != '') {
					var getarfftws_split = value49.split( ',' );
					for (var cd = 0; cd < getarfftws_split.length; cd++) {
						jQuery( '[data-style="' + getarfftws_split[cd] + '"][data-id="arfsubmitbuttonweightsetting"]' ).addClass( 'active' );
					}
				}
			}
		} else if (key == 'arfmefs') {
			var value50 = value_data.error_font;
			if (default_val != value50) {
				jQuery( '#arfmainerrorfontsetting' ).val( value50 );
				var data_label = jQuery( 'dl[data-id="arfmainerrorfontsetting"]' ).find( 'li[data-value="' + value50 + '"]' ).attr( 'data-label' );
				jQuery( '#arfmainerrorfontsetting' ).next( 'dl' ).find( 'span' ).text( data_label );
				jQuery( '#arfmainerrorfontsetting' ).next( 'dl' ).find( 'input' ).val( data_label );
			}
		} else if (key == 'arfmefss') {
			var value51 = value_data.arffontsizesetting;
			if (default_val != value51) {
				jQuery( '#arfmainerrorfontsizesetting' ).val( value51 );
				var data_label = jQuery( 'dl[data-id="arfmainerrorfontsizesetting"]' ).find( 'li[data-value="' + value51 + '"]' ).attr( 'data-label' );
				jQuery( '#arfmainerrorfontsizesetting' ).next( 'dl' ).find( 'span' ).text( data_label );
				jQuery( '#arfmainerrorfontsizesetting' ).next( 'dl' ).find( 'input' ).val( data_label );
			}
		} else if (key == 'arfinpst') {
			var value52 = value_data.arfinputstyle;
			if (default_val != value52) {
				jQuery( '#arfmainforminputstyle' ).val( value52 );
				var data_label = jQuery( 'dl[data-id="arfmainforminputstyle"] ' ).find( 'li[data-value="' + value52 + '"]' ).attr( 'data-label' );
				jQuery( '#arfmainforminputstyle' ).next( 'dl' ).find( 'span' ).text( data_label );
				jQuery( '#arfmainforminputstyle' ).next( 'dl' ).find( 'input' ).val( data_label );
			}
		} else if (key == 'arfcommonfont') {
			var value53 = value_data.arfcommonfont;
			if (default_val != value53) {
				jQuery( '#arfcommonfontfamily' ).val( value53 );
				var data_label = jQuery( 'dl[data-id="arfcommonfontfamily"]' ).find( 'li[data-value="' + value53 + '"]' ).attr( 'data-label' );
				jQuery( '#arfcommonfontfamily' ).next( 'dl' ).find( 'span' ).text( data_label );
				jQuery( '#arfcommonfontfamily' ).next( 'dl' ).find( 'input' ).val( data_label );
			}
		} else if (key == 'arfmcs') {
			var value54 = value_data.arfmainform_color_skin;
			value54     = value54.replace( '#', '' );
			if (value54 == 'custom') {
				window.is_reset_base_color = true;
			}
			if (default_val != value54) {
				jQuery( '.arf_skin_container' ).removeClass( 'active_skin' );
				jQuery( "#arf_skin_" + value54 ).addClass( 'active_skin' );
				jQuery( '#arf_color_skin' ).val( value54 );
				arflite_change_skin_colors( value54 );
			}
		} else if (key == 'arfmainfieldcommonsize') {
			var value55 = value_data.arfmainfieldcommonsize;
			if (default_val != value55) {
				var slider_id          = jQuery( '#arfmainfieldcommonsize_exs' ).attr( 'data-slider-id' );
				var id                 = 'arfmainfieldcommonsize_exs';
				var ac_id              = id.replace( '_exs', '' );
				var slider_val         = value55;
				var slider_val1        = parseFloat( jQuery.trim( slider_val ) );
				var input_field_slider = document.getElementById( 'arflite_mainfieldcommonsize' );
				input_field_slider.noUiSlider.set( slider_val1 );
				jQuery( '#' + ac_id ).val( slider_val1 );
				if (jQuery( '#arfmainforminputstyle' ).val() == 'material') {
					var font_size = arflite_parse_json( Base64.decode( jQuery( "#arflite_convert_font_size_array_json_for_material" ).val() ) );
				} else {
					var font_size = arflite_parse_json( Base64.decode( jQuery( "#arflite_convert_font_size_array_json" ).val() ) );
				}
				var font_size_val = font_size[slider_val];
				jQuery.each(
					font_size_val,
					function(index, el) {
						if (index == 'arfdescfontsizesetting') {
							jQuery( '#arf_form_styling_tools' ).find( '#' + index ).val( el );
							jQuery( '#arf_form_styling_tools' ).find( '#' + index ).next( 'dl' ).find( 'span' ).text( el );
							jQuery( '#arf_form_styling_tools' ).find( '#' + index ).next( 'dl' ).find( 'input' ).val( el );
						} else {
							jQuery( '.arf_custom_font_popup' ).find( '#' + index ).val( el );
							jQuery( '.arf_custom_font_popup' ).find( '#' + index ).next( 'dl' ).find( 'span' ).text( el );
							jQuery( '.arf_custom_font_popup' ).find( '#' + index ).next( 'dl' ).find( 'input' ).val( el );
						}
					}
				);
			}
		} else if (key == 'arffw') {
			var value56 = value_data.arfmainformwidth;
			if (default_val != value56) {
				jQuery( '#arf_form_width' ).val( value56 );
				jQuery( '#arf_editor_form_width' ).val( value56 );
			}
		} else if (key == 'arffu') {
			var value57 = value_data.form_width_unit;
			if (default_val != value57) {
				jQuery( '#arffu' ).val( value57 );
				jQuery( '#arffu' ).next( 'dl' ).find( 'span' ).text( value57 );
				jQuery( '#arffu' ).next( 'dl' ).find( 'input' ).val( value57 );
				jQuery( '#arf_editor_form_width_unit' ).val( value57 );
				jQuery( '#arf_editor_form_width_unit' ).next( 'dl' ).find( 'span' ).text( value57 );
				jQuery( '#arf_editor_form_width_unit' ).next( 'dl' ).find( 'input' ).val( value57 );
			}
		} else if (key == 'arfest') {
			var value58 = value_data.arferrorstyle;
			jQuery( "input:radio[name='arfest'][value ='" + value58 + "']" ).parent( '.arf_toggle_btn' ).trigger( 'click' );
		} else if (key == 'arfestbc') {
			var value59 = value_data.arferrorstyleposition;
			jQuery( "input:radio[name='arfestbc'][value ='" + value59 + "']" ).parent( '.arf_toggle_btn' ).trigger( 'click' );
		} else if (key == 'arffa') {
			var value60 = value_data.form_align;
			jQuery( "input:radio[name='arffa'][value ='" + value60 + "']" ).parent( '.arf_toggle_btn' ).trigger( 'click' );
		} else if (key == 'form_bg_img') {
			var value61 = value_data.arfmainform_bg_img;
			arflite_remove_image( "delete_form_bg_img" )
		} else if (key == 'arfmainfieldsetpadding_1') {
			var value62 = value_data.arfmainfieldsetpadding_1;
			if (default_val != value62) {
				jQuery( '#arfmainfieldsetpadding_1' ).val( value62 );
			}
		} else if (key == 'arfmainfieldsetpadding_2') {
			var value63 = value_data.arfmainfieldsetpadding_2;
			if (default_val != value63) {
				jQuery( '#arfmainfieldsetpadding_2' ).val( value63 );
			}
		} else if (key == 'arfmainfieldsetpadding_3') {
			var value64 = value_data.arfmainfieldsetpadding_3;
			if (default_val != value64) {
				jQuery( '#arfmainfieldsetpadding_3' ).val( value64 );
			}
		} else if (key == 'arfmainfieldsetpadding_4') {
			var value65 = value_data.arfmainfieldsetpadding_4;
			if (default_val != value65) {
				jQuery( '#arfmainfieldsetpadding_4' ).val( value65 );
			}
		} else if (key == 'arffbs') {
			var value70 = value_data.form_border_shadow;
			jQuery( "input:radio[name='arffbs'][value='" + value70 + "']" ).parent( '.arf_toggle_btn' ).trigger( 'click' );
		} else if (key == 'arfmfis') {
			var value71 = value_data.fieldset;
			if (default_val != value71) {
				var slider_id         = jQuery( '#arfmainfieldset_exs' ).attr( 'data-slider-id' );
				var id                = 'arfmainfieldset_exs';
				var ac_id             = id.replace( '_exs', '' );
				var slider_val        = value71;
				var slider_val1       = parseFloat( jQuery.trim( slider_val ) );
				var field_border_size = document.getElementById( 'arflite_bordersize' );
				field_border_size.noUiSlider.set( slider_val1 );
				jQuery( '#' + ac_id ).val( slider_val1 );
			}
		} else if (key == 'arfmfsr') {
			var value72 = value_data.arfmainfieldsetradius;
			if (default_val != value72) {
				var slider_id           = jQuery( '#arfmainfieldsetradius_exs' ).attr( 'data-slider-id' );
				var id                  = 'arfmainfieldsetradius_exs';
				var ac_id               = id.replace( '_exs', '' );
				var slider_val          = value72;
				var slider_val1         = parseFloat( jQuery.trim( slider_val ) );
				var field_border_radius = document.getElementById( 'arflite_borderradius' );
				field_border_radius.noUiSlider.set( slider_val1 );
				jQuery( '#' + ac_id ).val( slider_val1 );
			}
		} else if (key == 'options[display_title_form]') {
			var value73 = value_data.display_title_form;
			if (value73 == 1) {
				jQuery( '#display_title_form' ).prop( 'checked', true );
			} else {
				jQuery( '#display_title_form' ).prop( 'checked', false );
			}
			jQuery( '#display_title_form' ).trigger( 'change' );
		} else if (key == 'arffta') {
			var value74 = value_data.arfformtitlealign;
			jQuery( "input:radio[name='arffta'][value='" + value74 + "']" ).parent( '.arf_toggle_btn' ).trigger( 'click' );
		} else if (key == 'arfformtitlepaddingsetting_1') {
			var value75 = value_data.arfmainformtitlepaddingsetting_1;
			if (default_val != value75) {
				jQuery( '#arfformtitlepaddingsetting_1' ).val( value75 );
			}
		} else if (key == 'arfformtitlepaddingsetting_2') {
			var value76 = value_data.arfmainformtitlepaddingsetting_2;
			if (default_val != value76) {
				jQuery( '#arfformtitlepaddingsetting_2' ).val( value76 );
			}
		} else if (key == 'arfformtitlepaddingsetting_3') {
			var value77 = value_data.arfmainformtitlepaddingsetting_3;
			if (default_val != value77) {
				jQuery( '#arfformtitlepaddingsetting_3' ).val( value77 );
			}
		} else if (key == 'arfformtitlepaddingsetting_4') {
			var value78 = value_data.arfmainformtitlepaddingsetting_4;
			if (default_val != value78) {
				jQuery( '#arfformtitlepaddingsetting_4' ).val( value78 );
			}
		} else if (key == 'arfmainform_opacity') {
			var id                    = 'arfmainform_opacity_exs';
			var ac_id                 = id.replace( '_exs', '' );
			var slider_val            = ((jQuery.trim( value_data.arfmainform_opacity )) * 10);
			var window_opacity_slider = document.getElementById( 'arflite_window_opacity' );
			window_opacity_slider.noUiSlider.set( slider_val );
			jQuery( '#' + ac_id ).val( slider_val );
		} else if (key == 'arfplaceholder_opacity') {
			var id                   = 'arfplaceholder_opacity_exs';
			var ac_id                = id.replace( '_exs', '' );
			var slider_val           = ((jQuery.trim( value_data.arfplaceholder_opacity )));
			var place_holder_opacity = document.getElementById( 'arflite_placeholder_opacity_slider' );
			place_holder_opacity.noUiSlider.set( slider_val );
			jQuery( '#' + ac_id ).val( slider_val );
		} else if (key == 'arfmps') {
			var value80 = value_data.position;
			jQuery( "input:radio[name='arfmps'][value='" + value80 + "']" ).parent( '.arf_toggle_btn' ).trigger( 'click' );
		} else if (key == 'arffrma') {
			var value81 = value_data.align;
			jQuery( "input:radio[name='arffrma'][value='" + value81 + "']" ).parent( '.arf_toggle_btn' ).trigger( 'click' );
		} else if (key == 'arfmws') {
			var value82 = value_data.width;
			if (default_val != value82) {
				jQuery( '#arfmainformwidthsetting' ).val( value82 );
			}
		} else if (key == 'arfhl') {
			var value83 = value_data.hide_labels;
			if (value83 == 1) {
				jQuery( '#arfhidelabels' ).prop( 'checked', true );
			} else {
				jQuery( '#arfhidelabels' ).prop( 'checked', false );
			}
			jQuery( '#arfhidelabels' ).trigger( 'change' );
		} else if (key == 'arfdfss') {
			var value84 = value_data.arfdescfontsizesetting;
			if (default_val != value84) {
				jQuery( '#arfdescfontsizesetting' ).val( value84 );
				jQuery( '#arfdescfontsizesetting' ).next( 'dl' ).find( 'span' ).text( value84 );
				jQuery( '#arfdescfontsizesetting' ).next( 'dl' ).find( 'input' ).val( value84 );
			}
		} else if (key == 'arfdas') {
			var value85 = value_data.arfdescalighsetting;
			jQuery( "input:radio[name='arfdas'][value='" + value85 + "']" ).parent( '.toggle-btn' ).trigger( 'click' );
		} else if (key == 'arfmfiws') {
			var value86 = value_data.field_width;
			if (default_val != value86) {
				jQuery( '#arfmainfieldwidthsetting' ).val( value86 );
			}
		} else if (key == 'arffiu') {
			var value87 = value_data.field_width_unit;
			if (default_val != value87) {
				jQuery( '#arffieldunit' ).val( value87 );
				jQuery( '#arffieldunit' ).next( 'dl' ).find( 'span' ).text( value87 );
				jQuery( '#arffieldunit' ).next( 'dl' ).find( 'input' ).val( value87 );
			}
		} else if (key == 'arftds') {
			var value88 = value_data.text_direction;
			jQuery( "input:radio[name='arftds'][value='" + value88 + "']" ).parent( '.toggle-btn' ).trigger( 'click' );
		} else if (key == 'arfmfo') {
			var value89 = value_data.arfmainfield_opacity;
			if (value89 == 1) {
				jQuery( '#arfmainfield_opacity' ).prop( 'checked', true );
			} else {
				jQuery( '#arfmainfield_opacity' ).prop( 'checked', false );
			}
		} else if (key == 'arffms') {
			var value90 = value_data.arffieldmarginssetting;
			if (default_val != value90) {
				jQuery( '#arffieldmarginsetting' ).val( value90 );
			}
		} else if (key == 'arffims') {
			var value91 = value_data.arffieldinnermarginssetting_1;
			if (default_val != value91) {
				var slider_id       = jQuery( '#arffieldinnermarginssetting_1_exs' ).attr( 'data-slider-id' );
				var id              = 'arffieldinnermarginssetting_1_exs';
				var ac_id           = 'arffieldinnermarginsetting_1';
				var slider_val      = value91;
				var slider_val1     = parseFloat( jQuery.trim( slider_val ) );
				var vertical_slider = document.getElementById( 'arflite_vertical_slider' );
				vertical_slider.noUiSlider.set( slider_val1 );
				jQuery( '#' + ac_id ).val( slider_val1 );
			}
			var value92 = value_data.arffieldinnermarginssetting_2;
			if (default_val != value92) {
				var slider_id         = jQuery( '#arffieldinnermarginssetting_2_exs' ).attr( 'data-slider-id' );
				var id                = 'arffieldinnermarginssetting_2_exs';
				var ac_id             = 'arffieldinnermarginssetting_2';
				var slider_val        = value92;
				var slider_val1       = parseFloat( jQuery.trim( slider_val ) );
				var horizontal_slider = document.getElementById( 'arflite_horizontal_slider' );
				horizontal_slider.noUiSlider.set( slider_val1 );
				jQuery( '#' + ac_id ).val( slider_val1 );
			}
		} else if (key == 'arffbws') {
			var value93 = value_data.arffieldborderwidthsetting;
			if (default_val != value93) {
				var slider_id         = jQuery( '#arffieldborderwidthsetting_exs' ).attr( 'data-slider-id' );
				var id                = 'arffieldborderwidthsetting_exs';
				var ac_id             = id.replace( '_exs', '' );
				var slider_val        = value93;
				var slider_val1       = parseFloat( jQuery.trim( slider_val ) );
				var field_border_size = document.getElementById( 'arflite_input_border_size' );
				field_border_size.noUiSlider.set( slider_val1 );
				jQuery( '#' + ac_id ).val( slider_val1 );
			}
		} else if (key == 'arfmbs') {
			var value94 = value_data.border_radius;
			if (default_val != value94) {
				var slider_id           = jQuery( '#arfmainbordersetting_exs' ).attr( 'data-slider-id' );
				var id                  = 'arfmainbordersetting_exs';
				var ac_id               = id.replace( '_exs', '' );
				var slider_val          = value94;
				var slider_val1         = parseFloat( jQuery.trim( slider_val ) );
				var field_border_radius = document.getElementById( 'arflite_border_field_radius' );
				field_border_radius.noUiSlider.set( slider_val1 );
				jQuery( '#' + ac_id ).val( slider_val1 );
			}
		} else if (key == 'arffbss') {
			var value95 = value_data.arffieldborderstylesetting;

			jQuery( "input:radio[name='arffbss'][value='" + value95 + "']" ).parent( '.arf_toggle_btn' ).trigger( 'click' );
		} else if (key == 'arffdaf') {
			var value96 = value_data.date_format;

			if (default_val != value96) {
				jQuery( '#frm_date_format' ).val( value96 ).trigger( 'change' );
				var data_label = jQuery( 'dl[data-id="frm_date_format"]' ).find( 'li[data-value="' + value96 + '"]' ).attr( 'data-label' );
				jQuery( '#frm_date_format' ).next( 'dl' ).find( 'span' ).text( data_label );
			}
		} else if (key == 'arfmsas') {
			var value98 = value_data.arfsubmitalignsetting;
			jQuery( "input:radio[name='arfmsas'][value='" + value98 + "']" ).parent( '.arf_toggle_btn' ).trigger( 'click' );
		} else if (key == 'arfsbws') {
			var value99 = value_data.arfsubmitbuttonwidthsetting
			if (default_val != value99) {
				jQuery( '#arfsubmitbuttonwidthsetting' ).val( value99 );
				jQuery( '#arfsubmitbuttonwidthsetting' ).trigger( 'change' );
			}
		} else if (key == 'arfsbhs') {
			var value100 = value_data.arfsubmitbuttonheightsetting;
			if (default_val != value100) {
				jQuery( '#arfsubmitbuttonheightsetting' ).val( value100 );
			}
		} else if (key == 'arfsubmitbuttontext') {
			var value101 = value_data.arfsubmitbuttontext;
			if (default_val != value101) {
				jQuery( '#arfsubmitbuttontext' ).val( value101 ).trigger( 'change' );
			}
		} else if (key == 'submit_btn_img') {
			arflite_remove_image( "delete_submit_bg_img" );
		} else if (key == 'submit_hover_btn_img') {
			arflite_remove_image( "delete_submit_hover_bg_img" );
		} else if (key == 'arfsbbws') {
			var value102 = value_data.arfsubmitborderwidthsetting;
			if (default_val != value102) {
				var slider_id            = jQuery( '#arfsubmitbuttonborderwidhtsetting_exs' ).attr( 'data-slider-id' );
				var id                   = 'arfsubmitbuttonborderwidhtsetting_exs';
				var ac_id                = id.replace( '_exs', '' );
				var slider_val           = value102;
				var slider_val1          = parseFloat( jQuery.trim( slider_val ) );
				var submitbtnborderwidth = document.getElementById( 'arflite_btn_border_size' );
				submitbtnborderwidth.noUiSlider.set( slider_val1 );
				jQuery( '#' + ac_id ).val( slider_val1 );
			}
		} else if (key == 'arfsbbrs') {
			var value103 = value_data.arfsubmitborderradiussetting;
			if (default_val != value103) {
				var slider_id             = jQuery( '#arfsubmitbuttonborderradiussetting_exs' ).attr( 'data-slider-id' );
				var id                    = 'arfsubmitbuttonborderradiussetting_exs';
				var ac_id                 = id.replace( '_exs', '' );
				var slider_val            = value103;
				var slider_val1           = parseFloat( jQuery.trim( slider_val ) );
				var submitbtnborderradius = document.getElementById( 'arflite_btn_border_radius' );
				submitbtnborderradius.noUiSlider.set( slider_val1 );
				jQuery( '#' + ac_id ).val( slider_val1 );
			}
		} else if (key == 'arfsubmitbuttonmarginsetting_1') {
			var value104 = value_data.arfsubmitbuttonmarginsetting_1;
			if (default_val != value104) {
				jQuery( '#arfsubmitbuttonmarginsetting_1' ).val( value104 );
			}
		} else if (key == 'arfsubmitbuttonmarginsetting_2') {
			var value105 = value_data.arfsubmitbuttonmarginsetting_2;
			if (default_val != value105) {
				jQuery( '#arfsubmitbuttonmarginsetting_2' ).val( value105 );
			}
		} else if (key == 'arfsubmitbuttonmarginsetting_3') {
			var value106 = value_data.arfsubmitbuttonmarginsetting_3;
			if (default_val != value106) {
				jQuery( '#arfsubmitbuttonmarginsetting_3' ).val( value106 );
			}
		} else if (key == 'arfsubmitbuttonmarginsetting_4') {
			var value107 = value_data.arfsubmitbuttonmarginsetting_4;
			if (default_val != value107) {
				jQuery( '#arfsubmitbuttonmarginsetting_4' ).val( value107 );
			}
		} else if (key == 'arfcksn') {
			var value111 = value_data.arfcheckradiostyle;
			if (default_val != value111) {
				jQuery( "#frm_check_radio_style" ).val( value111 );
				var data_label = jQuery( 'dl[data-id="frm_check_radio_style"] ' ).find( 'li[data-value="' + value111 + '"]' ).attr( 'data-label' );
				jQuery( '#frm_check_radio_style' ).next( 'dl' ).find( 'span' ).text( data_label );
				jQuery( '#frm_check_radio_style' ).next( 'dl' ).find( 'input' ).val( data_label );
				jQuery( "#frm_check_radio_style" ).trigger( 'change' );
			}
		} else if (key == 'arfsubmitbuttonstyle') {
			var value112 = value_data.arfsubmitbuttonstyle;
			if (default_val != value112) {
				jQuery( '#arfsubmitbuttonstyle' ).val( value112 ).trigger( 'change' );
				var data_label = jQuery( 'dl[data-id="arfsubmitbuttonstyle"] ' ).find( 'li[data-value="' + value112 + '"]' ).attr( 'data-label' );
				jQuery( '#arfsubmitbuttonstyle' ).next( 'dl' ).find( 'span' ).text( data_label );
				jQuery( '#arfsubmitbuttonstyle' ).next( 'dl' ).find( 'input' ).val( data_label );
			}
		} else if (key == 'arfrinc') {
			var value113 = value_data.arf_req_indicator;
			if (value113 == default_val) {
				jQuery( '#arfreq_inc' ).prop( 'checked', true );
				jQuery( '.arf_main_label span.arf_edit_in_place+span' ).css( 'display', 'none' );
			} else {
				jQuery( '#arfreq_inc' ).prop( 'checked', false );
				jQuery( '.arf_main_label span.arf_edit_in_place+span' ).css( 'display', 'inline-block' );
			}
		} else if (key == 'arfupbg') {
			var value114 = value_data.arfuploadbtnbgcolorsetting;
			if (default_val != value114) {
				jQuery( '#arfuploadbtnbgsetting' ).val( value114 );
				jQuery( '#arfuploadbtnbgsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value114 );
				jQuery( '#arfuploadbtnbgsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value114 );
			}
		} else if (key == 'arfuptxt') {
			var value115 = value_data.arfuploadbtntxtcolorsetting;
			if (default_val != value115) {
				jQuery( '#arfuploadbtntextsetting' ).val( value115 );
				jQuery( '#arfuploadbtntextsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value115 );
				jQuery( '#arfuploadbtntextsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value115 );
			}
		} else if (key == 'arfmbsc') {
			var value116 = value_data.arfmainbasecolor;
			if (default_val != value116) {
				jQuery( '#arfmainbasecolor' ).val( value116 );
				jQuery( '#arfmainbasecolor' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value116 );
				jQuery( '#arfmainbasecolor' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value116 );
				jQuery( ".arf_skin_container[data-skin='custom']" ).css( 'background', value116 );
			}
		} else if (key == 'arfsbxos') {
			var value117 = value_data.arfsubmitboxxoffsetsetting;
			if (default_val != value117) {
				var slider_id          = jQuery( '#arfsubmitbuttonxoffsetsetting_exs' ).attr( 'data-slider-id' );
				var id                 = 'arfsubmitbuttonxoffsetsetting_exs';
				var ac_id              = id.replace( '_exs', '' );
				var slider_val         = value117;
				var slider_val1        = parseFloat( jQuery.trim( slider_val ) );
				var btn_xoffset_slider = document.getElementById( 'arflite_btn_xoffset_slider' );
				btn_xoffset_slider.noUiSlider.set( slider_val1 );
				jQuery( '#' + ac_id ).val( slider_val1 );
			}
		} else if (key == 'arfsbyos') {
			var value118 = value_data.arfsubmitboxyoffsetsetting;
			if (default_val != value118) {
				var slider_id        = jQuery( '#arfsubmitbuttonyoffsetsetting_exs' ).attr( 'data-slider-id' );
				var id               = 'arfsubmitbuttonyoffsetsetting_exs';
				var ac_id            = id.replace( '_exs', '' );
				var slider_val       = value118;
				var slider_val1      = parseFloat( jQuery.trim( slider_val ) );
				var submityoffsetval = document.getElementById( 'arflite_btn_yoffset_slider' );
				submityoffsetval.noUiSlider.set( slider_val1 );
				jQuery( '#' + ac_id ).val( slider_val1 );
			}
		} else if (key == 'arfsbbs') {
			var value119 = value_data.arfsubmitboxblursetting;
			if (default_val != value119) {
				var slider_id     = jQuery( '#arfsubmitbuttonblursetting_exs' ).attr( 'data-slider-id' );
				var id            = 'arfsubmitbuttonblursetting_exs';
				var ac_id         = id.replace( '_exs', '' );
				var slider_val    = value119;
				var slider_val1   = parseFloat( jQuery.trim( slider_val ) );
				var submitbtnblur = document.getElementById( 'arflite_btn_blur_slider' );
				submitbtnblur.noUiSlider.set( slider_val1 );
				jQuery( '#' + ac_id ).val( slider_val1 );
			}
		} else if (key == 'arffebgc') {
			var value120 = value_data.arfformerrorbgcolorsettings;
			if (default_val != value120) {
				jQuery( '#arfformerrorbgcolorsetting' ).val( value120 );
				jQuery( '#arfformerrorbgcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value120 );
				jQuery( '#arfformerrorbgcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value120 );
			}
		} else if (key == 'arffebrdc') {
			var value121 = value_data.arfformerrorbordercolorsettings;
			if (default_val != value121) {
				jQuery( '#arfformerrorbordercolorsetting' ).val( value121 );
				jQuery( '#arfformerrorbordercolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value121 );
				jQuery( '#arfformerrorbordercolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value121 );
			}
		} else if (key == 'arffetxtc') {
			var value122 = value_data.arfformerrortextcolorsettings;
			if (default_val != value122) {
				jQuery( '#arfformerrortextcolorsetting' ).val( value122 );
				jQuery( '#arfformerrortextcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).attr( 'data-default-color', value122 );
				jQuery( '#arfformerrortextcolorsetting' ).parent().find( '.arf_custom_color_popup_picker' ).css( 'background', 'none' + value122 );
			}
		} else if (key == 'arfsbsps') {
			var value200 = value_data.arfsubmitboxshadowsetting;
			if (default_val != value200) {
				var slider_id        = jQuery( '#arfsubmitbuttonshadowsetting_exs' ).attr( 'data-slider-id' );
				var id               = 'arfsubmitbuttonshadowsetting_exs';
				var ac_id            = id.replace( '_exs', '' );
				var slider_val       = value200;
				var slider_val1      = parseFloat( jQuery.trim( slider_val ) );
				var btnspread_slider = document.getElementById( 'arflite_spread_slider' );
				btnspread_slider.noUiSlider.set( slider_val1 );
				jQuery( '#' + ac_id ).val( slider_val1 );
			}
		} else if (key == 'arf_bg_position_x') {
			var value201 = value_data.arf_bg_position_x;
			if (default_val != value201) {
				jQuery( '#arf_bg_position_x' ).val( value201 ).trigger( 'change' );
				var data_label = jQuery( 'dl[data-id="arf_bg_position_x"] ' ).find( 'li[data-value="' + value201 + '"]' ).attr( 'data-label' );
				jQuery( '#arf_bg_position_x' ).next( 'dl' ).find( 'span' ).text( data_label );
				jQuery( '#arf_bg_position_x' ).next( 'dl' ).find( 'input' ).val( data_label );
			}
		} else if (key == 'arf_bg_position_y') {
			var value202 = value_data.arf_bg_position_y;
			if (default_val != value202) {
				jQuery( "#arf_bg_position_y" ).val( value202 );
				var data_label = jQuery( 'dl[data-id="arf_bg_position_y"]' ).find( 'li[data-value="' + value202 + '"]' ).attr( 'data-label' );
				jQuery( '#arf_bg_position_y' ).next( 'dl' ).find( 'span' ).text( data_label );
				jQuery( '#arf_bg_position_y' ).next( 'dl' ).find( 'input' ).val( data_label );
				jQuery( "#arf_bg_position_y" ).trigger( 'change' );
			}
		} else if (key == 'arfsuccessmsgposition') {
			var value203 = value_data.arfsuccessmsgposition;
			if (default_val != value203) {
				jQuery( "input:radio[name='arfsuccessmsgposition'][value='" + value203 + "']" ).parent( '.arf_toggle_btn' ).trigger( 'click' );
			}
		}else if (key == 'arffu_tablet') {
           var value204 = value_data.form_width_unit_tablet;
            if (default_val != value204) {
                jQuery('#arffu_tablet').val(value204);
                jQuery('#arffu_tablet').next('dl').find('span').text(value204);
                jQuery('#arffu_tablet').next('dl').find('input').val(value204);
            }
        }else if (key == 'arffu_mobile') {
            var value205 = value_data.form_width_unit_mobile;
            if (default_val != value205) {
                jQuery('#arffu_mobile').val(value205);
                jQuery('#arffu_mobile').next('dl').find('span').text(value205);
                jQuery('#arffu_mobile').next('dl').find('input').val(value205);
            }
        } else if (key == 'arffw_tablet') {
            var value206 = value_data.arfmainformwidth_tablet;
            if (default_val != value206) {
                jQuery('#arf_form_width_tablet').val(value206);
            }
        } else if (key == 'arffw_mobile') {
            var value207 = value_data.arfmainformwidth_mobile;
            if (default_val != value207) {
                jQuery('#arf_form_width_mobile').val(value207);
            }
        }  else if (key == 'arfmainfieldsetpadding_1_tablet') {
            var value208 = value_data.arfmainfieldsetpadding_1_tablet;
            if (default_val != value208) {
                jQuery('#arfmainfieldsetpadding_1_tablet').val(value208);
            }
        } else if (key == 'arfmainfieldsetpadding_2_tablet') {
            var value209 = value_data.arfmainfieldsetpadding_2_tablet;
            if (default_val != value209) {
                jQuery('#arfmainfieldsetpadding_2_tablet').val(value209);
            }
        } else if (key == 'arfmainfieldsetpadding_3_tablet') {
            var value210 = value_data.arfmainfieldsetpadding_3_tablet;
            if (default_val != value210) {
                jQuery('#arfmainfieldsetpadding_3_tablet').val(value210);
            }
        } else if (key == 'arfmainfieldsetpadding_4_tablet') {
            var value211 = value_data.arfmainfieldsetpadding_4_tablet;
            if (default_val != value211) {
                jQuery('#arfmainfieldsetpadding_4_tablet').val(value211);
            }
        }  else if (key == 'arfmainfieldsetpadding_1_mobile') {
            var value222 = value_data.arfmainfieldsetpadding_1_mobile;
            if (default_val != value222) {
                jQuery('#arfmainfieldsetpadding_1_mobile').val(value222);
            }
        } else if (key == 'arfmainfieldsetpadding_2_mobile') {
            var value223 = value_data.arfmainfieldsetpadding_2_mobile;
            if (default_val != value223) {
                jQuery('#arfmainfieldsetpadding_2_mobile').val(value223);
            }
        } else if (key == 'arfmainfieldsetpadding_3_mobile') {
            var value224 = value_data.arfmainfieldsetpadding_3_mobile;
            if (default_val != value224) {
                jQuery('#arfmainfieldsetpadding_3_mobile').val(value224);
            }
        } else if (key == 'arfmainfieldsetpadding_4_mobile') {
            var value225 = value_data.arfmainfieldsetpadding_4_mobile;
            if (default_val != value225) {
                jQuery('#arfmainfieldsetpadding_4_mobile').val(value225);
            }
        } else if (key == 'arffiu_tablet') {
            var value226 = value_data.field_width_unit_tablet;
            if (default_val != value226) {
                jQuery('#arffieldunit_tablet').val(value226);
                jQuery('#arffieldunit_tablet').next('dl').find('span').text(value226);
                jQuery('#arffieldunit_tablet').next('dl').find('input').val(value226);
            }
        } else if (key == 'arffiu_mobile') {
            var value227 = value_data.field_width_unit_mobile;
            if (default_val != value227) {
                jQuery('#arffieldunit_mobile').val(value227);
                jQuery('#arffieldunit_mobile').next('dl').find('span').text(value227);
                jQuery('#arffieldunit_mobile').next('dl').find('input').val(value227);
            }
        } else if (key == 'arfmfiws_tablet') {
            var value228 = value_data.field_width_tablet;
            if (default_val != value228) {
                jQuery('#arfmainfieldwidthsetting_tablet').val(value228);
            }
        } else if (key == 'arfmfiws_mobile') {
            var value229 = value_data.field_width_mobile;
            if (default_val != value229) {
                jQuery('#arfmainfieldwidthsetting_mobile').val(value229);
            }
        } else if (key == 'arfsbws_tablet') {
            var value230 = value_data.arfsubmitbuttonwidthsetting_tablet
            if (default_val != value230) {
                jQuery('#arfsubmitbuttonwidthsetting_tablet').val(value230);
                jQuery('#arfsubmitbuttonwidthsetting_tablet').trigger('change');
            }
        } else if (key == 'arfsbws_mobile') {
            var value231 = value_data.arfsubmitbuttonwidthsetting_mobile
            if (default_val != value231) {
                jQuery('#arfsubmitbuttonwidthsetting_mobile').val(value231);
                jQuery('#arfsubmitbuttonwidthsetting_mobile').trigger('change');
            }
        }
		xx++;
	}
	jQuery( '#arfmainforminputstyle' ).trigger( 'change' );
	if (xx == totalData) {
		setTimeout(
			function() {
				jQuery( '#arfsaveformloader' ).hide();
				setTimeout(
					function() {
						jQuery( "#changed_style_attr" ).val( '' );
					},
					500
				);
				jQuery( "#arf_reset_styling" ).val( false );
				arflite_initialize_resizable();
			},
			500
		);
	}
	jQuery( '[data-default-font]' ).attr( 'data-default-font', '' );
	jQuery( '[data-default-color]' ).attr( 'data-default-color', '' );
	jQuery( '[data-default-skin]' ).attr( 'data-default-skin', '' );
}

function arflite_define_text_color(rgb) {
	var colors     = arflitehextorgbcolor( rgb );
	var brightness = 1;
	var r          = colors.r;
	var g          = colors.g;
	var b          = colors.b;
	var ir         = Math.floor( (255 - r) * brightness );
	var ig         = Math.floor( (255 - g) * brightness );
	var ib         = Math.floor( (255 - b) * brightness );
	return "#" + arflitecomponentToHex( ir ) + arflitecomponentToHex( ig ) + arflitecomponentToHex( ib );
}

function arflitecomponentToHex(c) {
	var hex = c.toString( 16 );
	return hex.length == 1 ? "0" + hex : hex;
}

function arflite_generate_darker_tone(hex, lum) {
	hex = String( hex ).replace( /[^0-9a-f]/gi, '' );
	if (hex.length < 6) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	lum     = lum || 0;
	var rgb = "#",
		c, i;
	for (i = 0; i < 3; i++) {
		c    = parseInt( hex.substr( i * 2, 2 ), 16 );
		c    = Math.round( Math.min( Math.max( 0, c + (c * lum) ), 255 ) ).toString( 16 );
		rgb += ("00" + c).substr( c.length );
	}
	return rgb;
}

function arfliteisColorDark(color) {
	var colors   = arflitehextorgbcolor( color );
	var r        = colors.r;
	var g        = colors.g;
	var b        = colors.b;
	var darkness = (1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255).toFixed( 2 );
	if (darkness < 0.5) {
		return false;
	} else {
		return true;
	}
}
jQuery( document ).on(
	'change',
	'#arf_form_styling_tools :input, .arf_custom_color_popup_container :input, .arf_custom_font_popup :input',
	function() {
		var $this = jQuery( this );
		setTimeout(
			function() {
				var attr_id      = $this.attr( 'name' );
				var array        = [];
				var change_style = jQuery( "#changed_style_attr" ).val();
				if (change_style != '') {
					var json_data = arflite_parse_json( change_style );
					array         = json_data;
					array.push( attr_id );
				} else {
					array.push( attr_id );
				}
				var unique     = arflitefindUnique( array );
				var jsonstring = JSON.stringify( unique );
				jQuery( "#changed_style_attr" ).val( jsonstring );
				arfliteheightdiv();
			},
			500
		);
	}
);

function arflitefindUnique(arr) {
	var result = [];
	arr.forEach(
		function(d) {
			if (result.indexOf( d ) === -1) {
				result.push( d );
			}
		}
	);
	return result;
}
jQuery( document ).on(
	'click',
	'.arf_form .controls input[type="checkbox"]',
	function(e) {
		var $this = jQuery( this );
		if ($this.is( ':checked' )) {
			$this.parents( '.arf_checkbox_style' ).find( '.arf_checkbox_label_image_editor' ).addClass( 'checked' );
		} else {
			$this.parents( '.arf_checkbox_style' ).find( '.arf_checkbox_label_image_editor' ).removeClass( 'checked' );
		}
	}
);
jQuery( document ).on(
	'click',
	'.arf_form .controls input[type="radio"]',
	function(e) {
		var $this = jQuery( this );
		$this.parents( '.setting_radio' ).find( '.arf_radio_label_image_editor' ).removeClass( 'checked' );
		$this.parents( '.arf_radiobutton ' ).find( '.arf_radio_label_image_editor' ).addClass( 'checked' );
	}
);

function arflite_multicol_html() {
	var multicol_html_div = '';
	var index_id          = jQuery( '#arf_editor_total_rows' ).val();
	index_id              = parseInt( index_id ) + 1;
	if (index_id != '' || index_id != null || index_id != 'undefined') {
		multicol_html_div += '<div class="arf_multiiconbox">';
		multicol_html_div += '<div class="arf_field_option_multicolumn" id="arf_multicolumn_wrapper">';
		multicol_html_div += '<input type="hidden" name="multicolumn" />';
		multicol_html_div += '<div class="arf_multicolumn_opt" id="single_column" data-value="arf_1" >';
		multicol_html_div += '<input type="radio" class="rdostandard multicolfield display-none-cls" name="classes" onclick="arflitemakeNewSortable(1,this);" data-id="' + index_id + '" id="classes_' + index_id + '_1" value="arf_1" checked="checked" /><label for="classes_' + index_id + '_1"><span class="lblsubtitle_span_column"></span><svg id="multicolumn_one" height="24" width="18"><path fill-rule="evenodd" fill="#ffffff" clip-rule="evenodd" d="M1.059,14.666v-2h17v2H1.059z M1.059,6.666h17v2h-17V6.666z M1.059,0.666h17v2h-17V0.666z"/></svg></label>';
		multicol_html_div += '</div>';
		multicol_html_div += '<div class="arf_multicolumn_opt" id="two_column" data-value="arf_2">';
		multicol_html_div += '<input type="radio" class="rdostandard multicolfield display-none-cls" name="classes" onclick="arflitemakeNewSortable(2,this);" data-id="' + index_id + '" id="classes_' + index_id + '_2" value="arf_2" /><label for="classes_' + index_id + '_2"><span class="lblsubtitle_span_column"></span><svg id="multicolumn_two" height="24" width="24"><path fill-rule="evenodd" fill="#ffffff" clip-rule="evenodd" d="M15.047,14.714v-2H27.03v2H15.047z M15.047,6.714H27.03v2H15.047V6.714z M15.047,0.714H27.03v2H15.047V0.714z M1.031,12.714h12.015v2H1.031V12.714z M1.03,6.714h12.015v2H1.03V6.714z M1.03,0.714h12.015v2 H1.03V0.714z"/></svg></label>';
		multicol_html_div += '</div>';
		multicol_html_div += '<div class="arf_multicolumn_opt" id="three_column" data-value="arf_3">';
		multicol_html_div += '<input type="radio" class="rdostandard multicolfield display-none-cls" name="classes" onclick="arflitemakeNewSortable(3,this);" data-id="' + index_id + '" id="classes_' + index_id + '_3" value="arf_3" /><label for="classes_' + index_id + '_3"><span class="lblsubtitle_span_column"></span><svg id="multicolumn_three" height="24" width="35"><path fill-rule="evenodd" fill="#ffffff" clip-rule="evenodd" d="M18.07,14.615v-2h6.853v2H18.07z M18.069,6.615h6.853v2h-6.853V6.615zM18.069,0.615h6.853v2h-6.853V0.615z M9.497,12.615h6.853v2H9.497V12.615z M9.496,6.615h6.853v2H9.496V6.615z M9.496,0.615h6.853v2H9.496V0.615z M0.923,12.615h6.853v2H0.923V12.615z M0.922,6.615h6.853v2H0.922V6.615z M0.922,0.615h6.853v2H0.922V0.615z"/></svg></label>';
		multicol_html_div += '</div>';
		multicol_html_div += '<div class="arf_multicolumn_opt" id="four_column" data-value="arf_4">';
		multicol_html_div += '<input type="radio" class="rdostandard multicolfield display-none-cls" name="classes" onClick="arflitemakeNewSortable(4,this);" data-id="' + index_id + '" id="classes_' + index_id + '_4" value="arf_4" /><label for="classes_' + index_id + '_4"><span class="lblsubtitle_span_column"></span><svg id="multicolumn_four" height="24" width="35"><path fill-rule="evenodd" fill="#ffffff" clip-rule="evenodd" d="M27.928,14.646v-2h6.995v2H27.928z M27.927,6.646h6.995v2h-6.995V6.646z M27.927,0.646h6.995v2h-6.995V0.646z M18.927,12.646h6.995v2h-6.995V12.646z M18.926,6.646h6.995v2h-6.995V6.646z M18.926,0.646 h6.995v2h-6.995V0.646z M9.925,12.646h6.995v2H9.925V12.646z M9.924,6.646h6.995v2H9.924V6.646z M9.924,0.646h6.995v2H9.924V0.646z   M0.924,12.646h6.996v2H0.924V12.646z M0.923,6.646h6.996v2H0.923V6.646z M0.923,0.646h6.996v2H0.923V0.646z"/></svg></label>';
		multicol_html_div += '</div>';
		multicol_html_div += '<div class="arf_multicolumn_opt" id="five_column" data-value="arf_5">';
		multicol_html_div += '<input type="radio" class="rdostandard multicolfield display-none-cls" name="classes" onClick="arflitemakeNewSortable(5,this);" data-id="' + index_id + '" id="classes_' + index_id + '_5" value="arf_5" /><label for="classes_' + index_id + '_5"><span class="lblsubtitle_span_column"></span><svg id="multicolumn_five" height="24" width="45"><path fill-rule="evenodd" fill="#ffffff" clip-rule="evenodd" d="M34.931,14.599v-2h6.056v2H34.931z M34.93,6.599h6.056v2H34.93V6.599z M34.93,0.599h6.056v2H34.93V0.599z M26.445,12.599h6.057v2h-6.057V12.599z M26.444,6.599H32.5v2h-6.056V6.599z M26.444,0.599H32.5 v2h-6.056V0.599z M17.959,12.599h6.057v2h-6.057V12.599z M17.958,6.599h6.056v2h-6.056V6.599z M17.958,0.599h6.056v2h-6.056V0.599z   M9.474,12.599h6.057v2H9.474V12.599z M9.473,6.599h6.056v2H9.473V6.599z M9.473,0.599h6.056v2H9.473V0.599z M0.988,12.599h6.057v2 H0.988V12.599z M0.987,6.599h6.057v2H0.987V6.599z M0.987,0.599h6.057v2H0.987V0.599z"/></svg></label>';
		multicol_html_div += '</div>';
		multicol_html_div += '<div class="arf_multicolumn_opt" id="six_column" data-value="arf_6">';
		multicol_html_div += '<input type="radio" class="rdostandard multicolfield display-none-cls" name="classes" onClick="arflitemakeNewSortable(6,this);" data-id="' + index_id + '" id="classes_' + index_id + '_6" value="arf_6" /><label for="classes_' + index_id + '_6"><span class="lblsubtitle_span_column"></span><svg id="multicolumn_six" height="24" width="50"><path fill-rule="evenodd" fill="#ffffff" clip-rule="evenodd" d="M36.022,14.568v-2h4.996v2H36.022z M36.021,6.568h4.996v2h-4.996V6.568z M36.021,0.568h4.996v2h-4.996V0.568z M29.021,12.568h4.996v2h-4.996V12.568z M29.021,6.568h4.996v2h-4.996V6.568z M29.021,0.568 h4.996v2h-4.996V0.568z M22.021,12.568h4.996v2h-4.996V12.568z M22.02,6.568h4.996v2H22.02V6.568z M22.02,0.568h4.996v2H22.02V0.568 z M15.021,12.568h4.996v2h-4.996V12.568z M15.02,6.568h4.996v2H15.02V6.568z M15.02,0.568h4.996v2H15.02V0.568z M8.02,12.568h4.996 v2H8.02V12.568z M8.019,6.568h4.996v2H8.019V6.568z M8.019,0.568h4.996v2H8.019V0.568z M1.019,12.568h4.997v2H1.019V12.568z M1.018,6.568h4.997v2H1.018V6.568z M1.018,0.568h4.997v2H1.018V0.568z"/></svg></label>';
		multicol_html_div += '</div>';
		multicol_html_div += '</div>';
		multicol_html_div += '<div class="arf_multi_column_expand_icon">';
		multicol_html_div += '<svg width="11px" height="20px">';
		multicol_html_div += '<g>';
		multicol_html_div += '<path xmlns="http://www.w3.org/2000/svg" fill="#ffffff" d="M8.88,8.166c0-0.269-0.096-0.538-0.287-0.742L2.549,0.977c-0.383-0.41-1.007-0.41-1.392,0   c-0.382,0.411-0.382,1.075,0,1.485l5.348,5.704L1.16,13.87c-0.385,0.409-0.385,1.075,0,1.485c0.383,0.411,1.007,0.411,1.39,0   l6.043-6.447C8.784,8.704,8.88,8.435,8.88,8.166z"/>';
		multicol_html_div += '</g>';
		multicol_html_div += '</svg>';
		multicol_html_div += '</div>';
		multicol_html_div += '</div>';
	}
	jQuery( '#arf_editor_total_rows' ).val( index_id );
	return multicol_html_div;
}

function arflitemakeNewSortable(col, obj) {
	var select_field_id                = '';
	var set_height_elment_column_two   = '';
	var set_height_elment_column_three = '';
	var set_height_elment_column_four  = '';
	var set_height_elment_column_five  = '';
	var set_height_elment_column_six   = '';
	var arf_field_elem_attr_id         = '';
	var arfinputstyle                  = jQuery( "#arfmainforminputstyle" ).val();
	if (col == 1) {
		arflite_make_inner_sortable_into_1_part( obj );
	} else if (col == 2) {
		arflite_make_inner_sortable_into_2_part( obj );
	} else if (col == 3) {
		arflite_make_inner_sortable_into_3_part( obj );
	} else if (col == 4) {
		arflite_make_inner_sortable_into_4_part( obj );
	} else if (col == 5) {
		arflite_make_inner_sortable_into_5_part( obj );
	} else if (col == 6) {
		arflite_make_inner_sortable_into_6_part( obj );
	}

	arfliteaddinnerclasses();
	
	var innerHTML = jQuery( obj ).parents( '.arf_inner_wrapper_sortable' );

	jQuery( innerHTML ).find( '.sortable_inner_wrapper' ).each(
		function(index, el) {
			if (jQuery( this ).find( '.arfformfield' ).length == 1) {
				var arf_class  = "arf_" + col;
				var attr_id    = jQuery( this ).attr( 'id' );
				var field_id   = attr_id.replace( 'arfmainfieldid_', '' );
				var field_data = '';
				if (jQuery( this ).find( '.arf_confirm_field' ).length == 1) {
					var field_id_confirm = field_id.replace( '_confirm', '' );
					var field_data       = arflite_retrieve_field_data( field_id_confirm );
					if (field_data != null) {
						if (field_data.type == 'email') {
							field_data.confirm_email_classes = arf_class;
						}
						new_field_data = JSON.stringify( field_data );
						jQuery( "#arf_field_data_" + field_id_confirm ).val( new_field_data ).trigger( 'change' );
					}
				} else {
					var field_data = arflite_retrieve_field_data( field_id );
					if (field_data != null) {
						field_data.classes = arf_class;
						var new_field_data = JSON.stringify( field_data );
						jQuery( "#arf_field_data_" + field_id ).val( new_field_data ).trigger( 'change' );

						var field_placeholder_text = field_data.placeholdertext;
						if (field_placeholder_text !== undefined && field_placeholder_text != '') {
							jQuery( '[name="item_meta[' + field_id + ']"]' ).attr( 'placeholder', field_placeholder_text );
						}
					}
				}
			}
		}
	);
	
	arflite_initialize_resizable( jQuery( obj ).parents( '.arf_inner_wrapper_sortable' ) );
	arfliteremoveBlankElm();
	arflite_initialize_field_order();
	arfliteSetDefaultColumnWidth( obj );
	arfliteheightdiv( 'outerWrapper', obj );
	jQuery( obj ).parents( '.arfmainformfield' ).find( '.arftootltip_position' ).each(
		function() {
			jQuery( this ).tipso( 'destroy' );
			var bgcolor     = document.getElementById( 'arf_tooltip_bg_color' ).value;
			var textcolor   = document.getElementById( 'arf_tooltip_font_color' ).value;
			var dataContent = jQuery( this ).attr( 'data-title' );
			jQuery( this ).tipso(
				{
					position: 'top',
					width: 'auto',
					useTitle: false,
					content: dataContent,
					background: bgcolor,
					color: textcolor,
				}
			);
		}
	);
	jQuery( ".arf_materialize_form .edit_field_type_radio, .arf_materialize_form .edit_field_type_checkbox, .arf_materialize_form .edit_field_type_select, .arf_materialize_form .edit_field_type_arfslider" ).find( ".arfhelptipfocus" ).each(
		function() {
			jQuery( this ).tipso( "destroy" );
			var dataContent = jQuery( this ).attr( 'data-title' );
			if (dataContent != null || dataContent != undefined) {
				var bgcolor         = document.getElementById( 'arf_tooltip_bg_color' ).value;
				var textcolor       = document.getElementById( 'arf_tooltip_font_color' ).value;
				var tooltipposition = jQuery( 'input[name="arflitetippos"]:checked' ).val();
				jQuery( this ).tipso(
					{
						position: tooltipposition,
						width: 'auto',
						useTitle: false,
						content: dataContent,
						background: bgcolor,
						color: textcolor
					}
				);
			}
		}
	);
	if (set_height_elment_column_two != '') {
		arfliteheightdiv( 'individual', set_height_elment_column_two );
	}
	if (set_height_elment_column_three != '') {
		arfliteheightdiv( 'individual', set_height_elment_column_three );
	}
	if (set_height_elment_column_four != '') {
		arfliteheightdiv( 'individual', set_height_elment_column_four );
	}
	if (set_height_elment_column_five != '') {
		arfliteheightdiv( 'individual', set_height_elment_column_five );
	}
	if (set_height_elment_column_six != '') {
		arfliteheightdiv( 'individual', set_height_elment_column_six );
	}
	if (jQuery( '.tipso_bubble' ).length > 0) {
		jQuery( '.tipso_bubble' ).remove();
	}
	jQuery( innerHTML ).find( '.arf_field_option_hidden' ).removeClass( 'arfactive' );

	if( null != arforms_sortable_obj ){
		setTimeout(function(){
			arforms_sortable_obj.arforms_init_sortable();
		},10);
	}
}

function arflite_replace_common_html(replace_html) {
	var arf_common_html = '';
	if (replace_html != '' || replace_html != null || replace_html != 'undefined') {
		var multicol_html_data = arflite_multicol_html();
		var arf_row_index      = jQuery( '#arf_editor_total_rows' ).val();
		arf_common_html        = '<div class="arf_inner_wrapper_sortable arfmainformfield edit_form_item arffieldbox ui-state-default 1  single_column_wrapper ui-sortable-handle" data-id="arf_editor_main_row_' + arf_row_index + '">' + multicol_html_data + replace_html + '</div>';
	}
	return arf_common_html;
}

function arflite_make_inner_sortable_into_1_part(obj) {
	var innerHtml   = arfliteClosest( obj, '.arf_inner_wrapper_sortable' );
	var jqInnerHtml = jQuery( innerHtml );
	if (arflitehasClass( innerHtml, 'single_column_wrapper' )) {
		return false;
	}
	
	var siw  = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' );
	var siwl = siw.length;
	for (var a = 0; a < siwl; a++) {
		var siwobj = siw[a];
		if (arflitehasClass( siwobj, 'sortable_inner_wrapper' )) {
			try{
				jQuery( siwobj ).resizable( 'destroy' );
			} catch(e){
				//
			}
		}
		var id = siwobj.getAttribute( 'id' );
		if (id != null) {
			var field_id = id.replace( 'arfmainfieldid_', '' );
			arflite_initialize_control( field_id, true );
		}
	}
	var set_height_elment_column_six   = '';
	var set_height_elment_column_five  = '';
	var set_height_elment_column_four  = '';
	var set_height_elment_column_three = '';
	var set_height_elment_column_two   = '';
	var second_elm_html                = '';
	var third_elm_html                 = '';
	var fourth_elm_html                = '';
	var fifth_elm_html                 = '';
	var last_elm_html                  = '';
	var is_last_element_blank          = false;
	var two_columns                    = false;
	var three_columns                  = false;
	var four_columns                   = false;
	var removeAllElms                  = false;
	var fifth_columns                  = false;
	var sixth_columns                  = false;
	if (arflitehasClass( innerHtml, 'two_column_wrapper' )) {
		two_columns = true;
	} else if (arflitehasClass( innerHtml, 'three_column_wrapper' )) {
		three_columns = true;
	} else if (arflitehasClass( innerHtml, 'four_column_wrapper' )) {
		four_columns = true;
	} else if (arflitehasClass( innerHtml, 'five_column_wrapper' )) {
		fifth_columns = true;
	} else if (arflitehasClass( innerHtml, 'six_column_wrapper' )) {
		sixth_columns = true;
	}
	if (two_columns) {
		last_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 1 );
	}
	if (three_columns) {
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 1 );
		last_elm_html   = arflitegetcolumnhtmlfunction( jqInnerHtml, 4, 1 );
	}
	if (four_columns) {
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 1 );
		third_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 4, 1 );
		last_elm_html   = arflitegetcolumnhtmlfunction( jqInnerHtml, 5, 1 );
	}
	if (fifth_columns) {
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 1 );
		third_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 4, 1 );
		fourth_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 5, 1 );
		last_elm_html   = arflitegetcolumnhtmlfunction( jqInnerHtml, 6, 1 );
	}
	if (sixth_columns) {
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 1 );
		third_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 4, 1 );
		fourth_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 5, 1 );
		fifth_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 6, 1 );
		last_elm_html   = arflitegetcolumnhtmlfunction( jqInnerHtml, 7, 1 );
	}
	var html_obj = arflitegetSingleHtml( obj, jqInnerHtml, is_last_element_blank, removeAllElms );
	jqInnerHtml.find( '.sortable_inner_wrapper' ).each(
		function(index, el) {
			jQuery( this ).remove();
		}
	);
	jqInnerHtml.append( html_obj.single );
	if (last_elm_html != '') {
		var arf_field_elem_attr_id       = arflitegetnewrowfunction( last_elm_html, jqInnerHtml );
		var set_height_elment_column_six = arf_field_elem_attr_id;
	}
	if (fifth_elm_html != '') {
		var arf_field_elem_attr_id        = arflitegetnewrowfunction( fifth_elm_html, jqInnerHtml );
		var set_height_elment_column_five = arf_field_elem_attr_id;
	}
	if (fourth_elm_html != '') {
		var arf_field_elem_attr_id        = arflitegetnewrowfunction( fourth_elm_html, jqInnerHtml );
		var set_height_elment_column_four = arf_field_elem_attr_id;
	}
	if (third_elm_html != '') {
		var arf_field_elem_attr_id         = arflitegetnewrowfunction( third_elm_html, jqInnerHtml );
		var set_height_elment_column_three = arf_field_elem_attr_id;
	}
	if (second_elm_html != '') {
		var arf_field_elem_attr_id       = arflitegetnewrowfunction( second_elm_html, jqInnerHtml );
		var set_height_elment_column_two = arf_field_elem_attr_id;
	}
	if (three_columns) {
		arfliteremoveClass( innerHtml, 'three_column_wrapper' );
		arfliteaddClass( innerHtml, 'single_column_wrapper' );
	}
	if (four_columns) {
		arfliteremoveClass( innerHtml, 'four_column_wrapper' );
		arfliteaddClass( innerHtml, 'single_column_wrapper' );
	}
	if (fifth_columns) {
		arfliteremoveClass( innerHtml, 'five_column_wrapper' );
		arfliteaddClass( innerHtml, 'single_column_wrapper' );
	}
	if (sixth_columns) {
		arfliteremoveClass( innerHtml, 'six_column_wrapper' );
		arfliteaddClass( innerHtml, 'single_column_wrapper' );
	}
	if (two_columns) {
		arfliteremoveClass( innerHtml, 'two_column_wrapper' );
		arfliteaddClass( innerHtml, 'single_column_wrapper' );
	}
	var firstChildHtml = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' )[0];
	arfliteaddClass( firstChildHtml, 'arf_1col' );
	firstChildHtml.setAttribute( 'inner_class', 'arf_1col' );
	var field_id = firstChildHtml.getAttribute( 'id' );
	if (field_id != null) {
		field_id = field_id.replace( 'arfmainfieldid_', '' );
		arflite_initialize_control( field_id );
	}
	jqInnerHtml.find( '.sortable_inner_wrapper' ).each(
		function(index, el) {
			if (jQuery( this ).find( '.arfformfield' ).length == 1) {
				jQuery( this ).find( '.arfformfield' ).removeAttr( 'style' );
			}
		}
	);
}

function arflitegetSingleHtml(obj, parent, removeLastElm, removeAllElms) {
	var thtml = "";
	var ihtml = "";
	if (parent.hasClass( 'two_column_wrapper' )) {
		thtml = parent.find( '.sortable_inner_wrapper' ).first().prop( 'outerHTML' );
	} else if (parent.hasClass( 'three_column_wrapper' )) {
		thtml = parent.find( '.sortable_inner_wrapper' ).first().prop( 'outerHTML' );
	} else if (parent.hasClass( 'four_column_wrapper' )) {
		thtml = parent.find( '.sortable_inner_wrapper' ).first().prop( 'outerHTML' );
	} else if (parent.hasClass( 'five_column_wrapper' )) {
		thtml = parent.find( '.sortable_inner_wrapper' ).first().prop( 'outerHTML' );
	} else if (parent.hasClass( 'six_column_wrapper' )) {
		thtml = parent.find( '.sortable_inner_wrapper' ).first().prop( 'outerHTML' );
	}
	var obje = {
		single: thtml,
		others: ihtml
	};
	return obje;
}

function arflitegetThreeHtml(obj, innerHtml) {
	var append_html = "";
	var drag_items  = "";
	if (jQuery( innerHtml ).hasClass( 'single_column_wrapper' )) {
		drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else if (jQuery( innerHtml ).hasClass( 'two_column_wrapper' )) {
		drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else if (jQuery( innerHtml ).hasClass( 'four_column_wrapper' )) {
		drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else if (jQuery( innerHtml ).hasClass( 'five_column_wrapper' )) {
		drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else if (jQuery( innerHtml ).hasClass( 'six_column_wrapper' )) {
		drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else {
		drag_items = "<div class='sortable_inner_wrapper arf_sortable_receiver'></div>";
	}
	var thtml = drag_items + "<div class='sortable_inner_wrapper arf_sortable_receiver'></div><div class='sortable_inner_wrapper arf_sortable_receiver'></div>";
	return thtml;
}

function arflitegetFourHtml(obj, innerHtml) {
	var append_html = "";
	var drag_items  = "";
	if (jQuery( innerHtml ).hasClass( 'single_column_wrapper' )) {
		drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else if (jQuery( innerHtml ).hasClass( 'two_column_wrapper' )) {
		drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else if (jQuery( innerHtml ).hasClass( 'three_column_wrapper' )) {
		drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else if (jQuery( innerHtml ).hasClass( 'five_column_wrapper' )) {
		drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else if (jQuery( innerHtml ).hasClass( 'six_column_wrapper' )) {
		drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else {
		drag_items = "<div class='sortable_inner_wrapper arf_sortable_receiver'></div>";
	}
	var thtml = drag_items + "<div class='sortable_inner_wrapper arf_sortable_receiver'></div><div class='sortable_inner_wrapper arf_sortable_receiver'></div><div class='sortable_inner_wrapper arf_sortable_receiver'></div>";
	return thtml;
}

function arflitegetFiveHtml(obj, innerHtml) {
	var append_html = "";
	var drag_items  = "";
	if (jQuery( innerHtml ).hasClass( 'single_column_wrapper' )) {
		drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else if (jQuery( innerHtml ).hasClass( 'two_column_wrapper' )) {
		drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else if (jQuery( innerHtml ).hasClass( 'three_column_wrapper' )) {
		drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else if (jQuery( innerHtml ).hasClass( 'four_column_wrapper' )) {
		drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else if (jQuery( innerHtml ).hasClass( 'six_column_wrapper' )) {
		drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else {
		drag_items = "<div class='sortable_inner_wrapper arf_sortable_receiver'></div>";
	}
	var thtml = drag_items + "<div class='sortable_inner_wrapper arf_sortable_receiver'></div><div class='sortable_inner_wrapper arf_sortable_receiver'></div><div class='sortable_inner_wrapper arf_sortable_receiver'></div><div class='sortable_inner_wrapper arf_sortable_receiver'></div>";
	return thtml;
}

function arflitegetSixHtml(obj, innerHtml) {
	var append_html = "";
	var drag_items  = "";
	if (jQuery( innerHtml ).hasClass( 'single_column_wrapper' )) {
		drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else if (jQuery( innerHtml ).hasClass( 'two_column_wrapper' )) {
		drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else if (jQuery( innerHtml ).hasClass( 'three_column_wrapper' )) {
		drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else if (jQuery( innerHtml ).hasClass( 'four_column_wrapper' )) {
		drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else if (jQuery( innerHtml ).hasClass( 'five_column_wrapper' )) {
		drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else {
		drag_items = "<div class='sortable_inner_wrapper arf_sortable_receiver'></div>";
	}
	var thtml = drag_items + "<div class='sortable_inner_wrapper arf_sortable_receiver'></div><div class='sortable_inner_wrapper arf_sortable_receiver'></div><div class='sortable_inner_wrapper arf_sortable_receiver'></div><div class='sortable_inner_wrapper arf_sortable_receiver'></div><div class='sortable_inner_wrapper arf_sortable_receiver'></div>";
	return thtml;
}

function arflite_make_inner_sortable_into_4_part(obj) {
	var innerHtml   = arfliteClosest( obj, '.arf_inner_wrapper_sortable' );
	var jqInnerHtml = jQuery( innerHtml );
	if (arflitehasClass( innerHtml, 'four_column_wrapper' )) {
		return false;
	}
	
	var siw  = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' );
	var siwl = siw.length;
	for (var b = 0; b < siwl; b++) {
		var siwo = siw[b];
		if (arflitehasClass( siwo, 'ui-resizable' )) {
			jQuery( siwo ).resizable( 'destroy' );
		}
		var id = siwo.getAttribute( 'id' );
		if (id != null) {
			var fid = id.replace( 'arfmainfieldid_', '' );
			arflite_initialize_control( fid, true );
		}
	}
	var html            = arflitegetFourHtml( obj, jqInnerHtml );
	var second_elm_html = '';
	var third_elm_html  = '';
	var fourth_elm_html = '';
	var fifth_elm_html  = '';
	var last_elm_html   = '';
	if (arflitehasClass( innerHtml, 'two_column_wrapper' )) {
		arfliteremoveClass( innerHtml, 'two_column_wrapper' );
		arfliteaddClass( innerHtml, 'four_column_wrapper' );
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 0 );
	} else if (arflitehasClass( innerHtml, 'three_column_wrapper' )) {
		arfliteremoveClass( innerHtml, 'three_column_wrapper' );
		arfliteaddClass( innerHtml, 'four_column_wrapper' );
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 0 );
		third_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 4, 0 );
	} else if (arflitehasClass( innerHtml, 'five_column_wrapper' )) {
		arfliteremoveClass( innerHtml, 'five_column_wrapper' );
		arfliteaddClass( innerHtml, 'four_column_wrapper' );
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 0 );
		third_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 4, 0 );
		fourth_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 5, 0 );
		fifth_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 6, 1 );
	} else if (arflitehasClass( innerHtml, 'six_column_wrapper' )) {
		arfliteremoveClass( innerHtml, 'six_column_wrapper' );
		arfliteaddClass( innerHtml, 'four_column_wrapper' );
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 0 );
		third_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 4, 0 );
		fourth_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 5, 0 );
		fifth_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 6, 1 );
		last_elm_html   = arflitegetcolumnhtmlfunction( jqInnerHtml, 7, 1 );
	} else if (arflitehasClass( innerHtml, 'single_column_wrapper' )) {
		arfliteremoveClass( innerHtml, 'single_column_wrapper' );
		arfliteaddClass( innerHtml, 'four_column_wrapper' );
	}
	jqInnerHtml.find( '.sortable_inner_wrapper' ).each(
		function(index, el) {
			jQuery( this ).remove();
		}
	);
	jqInnerHtml.append( html );
	if (second_elm_html != '') {
		jqInnerHtml.find( '.sortable_inner_wrapper' ).first().next().replaceWith( second_elm_html );
	}
	if (third_elm_html != '') {
		jqInnerHtml.find( '.sortable_inner_wrapper' ).first().next().next().replaceWith( third_elm_html );
	}
	if (fourth_elm_html != '') {
		jqInnerHtml.find( '.sortable_inner_wrapper' ).last().replaceWith( fourth_elm_html );
	}
	if (last_elm_html != '') {
		var arf_field_elem_attr_id   = arflitegetnewrowfunction( last_elm_html, jqInnerHtml );
		set_height_elment_column_six = arf_field_elem_attr_id;
	}
	if (fifth_elm_html != '') {
		var arf_field_elem_attr_id    = arflitegetnewrowfunction( fifth_elm_html, jqInnerHtml );
		set_height_elment_column_five = arf_field_elem_attr_id;
	}
	var fhtml = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' )[0];
	var shtml = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' )[1];
	var thtml = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' )[2];
	var lhtml = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' )[3];
	arfliteaddClass( fhtml, 'arf41colclass' );
	fhtml.setAttribute( 'inner_class', 'arf41colclass' );
	arfliteaddClass( shtml, 'arf42colclass' );
	shtml.setAttribute( 'inner_class', 'arf42colclass' );
	arfliteaddClass( thtml, 'arf43colclass' );
	thtml.setAttribute( 'inner_class', 'arf43colclass' );
	arfliteaddClass( lhtml, 'arf_4col' );
	lhtml.setAttribute( 'inner_class', 'arf_4col' );
	jqInnerHtml.find( '.sortable_inner_wrapper' ).each(
		function(index, el) {
			if (jQuery( this ).find( '.arfformfield' ).length == 1) {
				jQuery( this ).find( '.arfformfield' ).removeAttr( 'style' );
				var fid = jQuery( this ).attr( 'id' ).replace( 'arfmainfieldid_', '' );
				arflite_initialize_control( fid );
			}
		}
	);
	document.getElementById( 'arf_single_column_field_ids' ).value = "";
	window.arf_sender_id       = '';
	window.arf_sender_parent   = {};
	window.arf_sender_previous = {};
}

function arflite_make_inner_sortable_into_6_part(obj) {

	var innerHtml   = arfliteClosest( obj, '.arf_inner_wrapper_sortable' );
	var jqInnerHtml = jQuery( innerHtml );
	if (arflitehasClass( innerHtml, 'six_column_wrapper' )) {
		return false;
	}
	
	var siw  = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' );
	var siwl = siw.length;
	for (var d = 0; d < siwl; d++) {
		var siwo = siw[d];
		if (arflitehasClass( siwo, 'ui-resizable' )) {
			jQuery( siwo ).resizable( 'destroy' );
		}
		var id = siwo.getAttribute( 'id' );
		if (id != null) {
			id = id.replace( 'arfmainfieldid_', '' );
			arflite_initialize_control( id, true );
		}
	}
	var html            = arflitegetSixHtml( obj, jqInnerHtml );
	var second_elm_html = '';
	var third_elm_html  = '';
	var fourth_elm_html = '';
	var fifth_elm_html  = '';
	var last_elm_html   = '';
	if (arflitehasClass( innerHtml, 'two_column_wrapper' )) {
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 0 );
		arfliteremoveClass( innerHtml, 'two_column_wrapper' );
		arfliteaddClass( innerHtml, 'six_column_wrapper' );
	} else if (arflitehasClass( innerHtml, 'three_column_wrapper' )) {
		arfliteremoveClass( innerHtml, 'three_column_wrapper' );
		arfliteaddClass( innerHtml, 'six_column_wrapper' );
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 0 );
		third_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 4, 0 );
	} else if (arflitehasClass( innerHtml, 'four_column_wrapper' )) {
		arfliteremoveClass( innerHtml, 'four_column_wrapper' );
		arfliteaddClass( innerHtml, 'six_column_wrapper' );
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 0 );
		third_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 4, 0 );
		fourth_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 5, 0 );
	} else if (arflitehasClass( innerHtml, 'five_column_wrapper' )) {
		arfliteremoveClass( innerHtml, 'five_column_wrapper' );
		arfliteaddClass( innerHtml, 'six_column_wrapper' );
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 0 );
		third_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 4, 0 );
		fourth_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 5, 0 );
		fifth_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 6, 0 );
	} else if (arflitehasClass( innerHtml, 'single_column_wrapper' )) {
		arfliteremoveClass( innerHtml, 'single_column_wrapper' );
		arfliteaddClass( innerHtml, 'six_column_wrapper' );
	}
	jqInnerHtml.find( '.sortable_inner_wrapper' ).each(
		function(index, el) {
			jQuery( this ).remove();
		}
	);
	jqInnerHtml.append( html );
	if (second_elm_html != '') {
		jqInnerHtml.find( '.sortable_inner_wrapper' ).first().next().replaceWith( second_elm_html );
	}
	if (third_elm_html != '') {
		jqInnerHtml.find( '.sortable_inner_wrapper' ).first().next().next().replaceWith( third_elm_html );
	}
	if (fourth_elm_html != '') {
		jqInnerHtml.find( '.sortable_inner_wrapper' ).first().next().next().next().replaceWith( fourth_elm_html );
	}
	if (fifth_elm_html != '') {
		jqInnerHtml.find( '.sortable_inner_wrapper' ).first().next().next().next().next().replaceWith( fifth_elm_html );
	}
	var firstHtml  = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' )[0];
	var secondHtml = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' )[1];
	var thirdHtml  = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' )[2];
	var fourthHtml = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' )[3];
	var fifthHtml  = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' )[4];
	var sixthHtml  = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' )[5];
	arfliteaddClass( firstHtml, 'arf61colclass' );
	firstHtml.setAttribute( 'inner_class', 'arf61colclass' );
	arfliteaddClass( secondHtml, 'arf62colclass' );
	secondHtml.setAttribute( 'inner_class', 'arf62colclass' );
	arfliteaddClass( thirdHtml, 'arf63colclass' );
	thirdHtml.setAttribute( 'inner_class', 'arf63colclass' );
	arfliteaddClass( fourthHtml, 'arf64colclass' );
	fourthHtml.setAttribute( 'inner_class', 'arf64colclass' );
	arfliteaddClass( fifthHtml, 'arf65colclass' );
	fifthHtml.setAttribute( 'inner_class', 'arf65colclass' );
	arfliteaddClass( sixthHtml, 'arf_6col' );
	sixthHtml.setAttribute( 'inner_class', 'arf_6col' );
	jqInnerHtml.find( '.sortable_inner_wrapper' ).each(
		function(index, el) {
			if (jQuery( this ).find( '.arfformfield' ).length == 1) {
				jQuery( this ).find( '.arfformfield' ).removeAttr( 'style' );
				var fid = jQuery( this ).attr( 'id' ).replace( 'arfmainfieldid_', '' );
				arflite_initialize_control( fid );
			}
		}
	);
	document.getElementById( 'arf_single_column_field_ids' ).value = "";
	window.arf_sender_id       = '';
	window.arf_sender_parent   = {};
	window.arf_sender_previous = {};
}

function arflite_make_inner_sortable_into_5_part(obj) {
	var innerHtml   = arfliteClosest( obj, '.arf_inner_wrapper_sortable' );
	var jqInnerHtml = jQuery( innerHtml );
	if (arflitehasClass( innerHtml, 'five_column_wrapper' )) {
		return false;
	}

	var swi  = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' );
	var swil = swi.length;
	for (var c = 0; c < swil; c++) {
		var swiobj = swi[c];
		if (arflitehasClass( swiobj, 'ui-resizable' )) {
			jQuery( swiobj ).resizable( 'destroy' );
		}
		var id = swiobj.getAttribute( 'id' );
		if (id != null) {
			var fid = id.replace( 'arfmainfieldid_', '' );
			arflite_initialize_control( fid, true );
		}
	}
	var html            = arflitegetFiveHtml( obj, jqInnerHtml );
	var second_elm_html = '';
	var third_elm_html  = '';
	var fourth_elm_html = '';
	var fifth_elm_html  = '';
	var last_elm_html   = '';
	if (arflitehasClass( innerHtml, 'two_column_wrapper' )) {
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 0 );
		arfliteremoveClass( innerHtml, 'two_column_wrapper' );
		arfliteaddClass( innerHtml, 'five_column_wrapper' );
	} else if (arflitehasClass( innerHtml, 'three_column_wrapper' )) {
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 0 );
		third_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 4, 0 );
		arfliteremoveClass( innerHtml, 'three_column_wrapper' );
		arfliteaddClass( innerHtml, 'five_column_wrapper' );
	} else if (arflitehasClass( innerHtml, 'four_column_wrapper' )) {
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 0 );
		third_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 4, 0 );
		fourth_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 5, 0 );
		arfliteremoveClass( innerHtml, 'four_column_wrapper' );
		arfliteaddClass( innerHtml, 'five_column_wrapper' );
	} else if (arflitehasClass( innerHtml, 'six_column_wrapper' )) {
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 0 );
		third_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 4, 0 );
		fourth_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 5, 0 );
		fifth_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 6, 0 );
		last_elm_html   = arflitegetcolumnhtmlfunction( jqInnerHtml, 7, 1 );
		arfliteremoveClass( innerHtml, 'six_column_wrapper' );
		arfliteaddClass( innerHtml, 'five_column_wrapper' );
	} else if (arflitehasClass( innerHtml, 'single_column_wrapper' )) {
		arfliteremoveClass( innerHtml, 'single_column_wrapper' );
		arfliteaddClass( innerHtml, 'five_column_wrapper' );
	}
	jqInnerHtml.find( '.sortable_inner_wrapper' ).each(
		function(index, el) {
			jQuery( this ).remove();
		}
	);
	jqInnerHtml.append( html );
	if (second_elm_html != '') {
		jqInnerHtml.find( '.sortable_inner_wrapper' ).first().next().replaceWith( second_elm_html );
	}
	if (third_elm_html != '') {
		jqInnerHtml.find( '.sortable_inner_wrapper' ).first().next().next().replaceWith( third_elm_html );
	}
	if (fourth_elm_html != '') {
		jqInnerHtml.find( '.sortable_inner_wrapper' ).first().next().next().next().replaceWith( fourth_elm_html );
	}
	if (fifth_elm_html != '') {
		jqInnerHtml.find( '.sortable_inner_wrapper' ).last().replaceWith( fifth_elm_html );
	}
	if (last_elm_html != '') {
		var arf_field_elem_attr_id   = arflitegetnewrowfunction( last_elm_html, jqInnerHtml );
		set_height_elment_column_six = arf_field_elem_attr_id;
	}
	var fshtml = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' )[0];
	var snhtml = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' )[1];
	var tdhtml = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' )[2];
	var fthtml = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' )[3];
	var ffhtml = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' )[4];
	arfliteaddClass( fshtml, 'arf51colclass' );
	fshtml.setAttribute( 'inner_class', 'arf51colclass' );
	arfliteaddClass( snhtml, 'arf52colclass' );
	snhtml.setAttribute( 'inner_class', 'arf52colclass' );
	arfliteaddClass( tdhtml, 'arf53colclass' );
	tdhtml.setAttribute( 'inner_class', 'arf53colclass' );
	arfliteaddClass( fthtml, 'arf54colclass' );
	fthtml.setAttribute( 'inner_class', 'arf54colclass' );
	arfliteaddClass( ffhtml, 'arf_5col' );
	ffhtml.setAttribute( 'inner_class', 'arf_5col' );
	jqInnerHtml.find( '.sortable_inner_wrapper' ).each(
		function(index, el) {
			if (jQuery( this ).find( '.arfformfield' ).length == 1) {
				jQuery( this ).find( '.arfformfield' ).removeAttr( 'style' );
				var fid = jQuery( this ).attr( 'id' ).replace( 'arfmainfieldid_', '' );
				arflite_initialize_control( fid );
			}
		}
	);
	document.getElementById( 'arf_single_column_field_ids' ).value = "";
	window.arf_sender_id       = '';
	window.arf_sender_parent   = {};
	window.arf_sender_previous = {};
}

function arflite_make_inner_sortable_into_3_part(obj) {
	var innerHtml   = arfliteClosest( obj, '.arf_inner_wrapper_sortable' );
	var jqInnerHtml = jQuery( innerHtml );
	if (arflitehasClass( innerHtml, 'three_column_wrapper' )) {
		return false;
	}

	var siw  = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' );
	var siwl = siw.length;
	for (var a = 0; a < siwl; a++) {
		var siwobj = siw[a];
		if (arflitehasClass( siwobj, 'ui-resizable' )) {
			jQuery( siwobj ).resizable( 'destroy' );
		}
		var id = siwobj.getAttribute( 'id' );
		if (id != null) {
			var field_id = id.replace( 'arfmainfieldid_', '' );
			arflite_initialize_control( field_id, true );
		}
	}
	var html            = arflitegetThreeHtml( obj, jqInnerHtml );
	var second_elm_html = '';
	var third_elm_html  = '';
	var fourth_elm_html = '';
	var fifth_elm_html  = '';
	var last_elm_html   = '';
	if (arflitehasClass( innerHtml, 'two_column_wrapper' )) {
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 0 );
		arfliteremoveClass( innerHtml, 'two_column_wrapper' );
		arfliteaddClass( innerHtml, 'three_column_wrapper' );
	} else if (arflitehasClass( innerHtml, 'four_column_wrapper' )) {
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 0 );
		third_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 4, 0 );
		fourth_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 5, 1 );
		arfliteremoveClass( innerHtml, 'four_column_wrapper' );
		arfliteaddClass( innerHtml, 'three_column_wrapper' );
	} else if (arflitehasClass( innerHtml, 'five_column_wrapper' )) {
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 0 );
		third_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 4, 0 );
		fourth_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 5, 1 );
		fifth_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 6, 1 );
		arfliteremoveClass( innerHtml, 'five_column_wrapper' );
		arfliteaddClass( innerHtml, 'three_column_wrapper' );
	} else if (arflitehasClass( innerHtml, 'six_column_wrapper' )) {
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 0 );
		third_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 4, 0 );
		fourth_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 5, 1 );
		fifth_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 6, 1 );
		last_elm_html   = arflitegetcolumnhtmlfunction( jqInnerHtml, 7, 1 );
		arfliteremoveClass( innerHtml, 'six_column_wrapper' );
		arfliteaddClass( innerHtml, 'three_column_wrapper' );
	} else if (arflitehasClass( innerHtml, 'single_column_wrapper' )) {
		arfliteremoveClass( innerHtml, 'single_column_wrapper' );
		arfliteaddClass( innerHtml, 'three_column_wrapper' );
	}
	jqInnerHtml.find( '.sortable_inner_wrapper' ).each(
		function(index, el) {
			jQuery( this ).remove();
		}
	);
	jqInnerHtml.append( html );
	if (second_elm_html != '') {
		jqInnerHtml.find( '.sortable_inner_wrapper' ).first().next().replaceWith( second_elm_html );
	}
	if (third_elm_html != '') {
		jqInnerHtml.find( '.sortable_inner_wrapper' ).last().replaceWith( third_elm_html );
	}
	if (last_elm_html != '') {
		var arf_field_elem_attr_id   = arflitegetnewrowfunction( last_elm_html, jqInnerHtml );
		set_height_elment_column_six = arf_field_elem_attr_id;
	}
	if (fifth_elm_html != '') {
		var arf_field_elem_attr_id    = arflitegetnewrowfunction( fifth_elm_html, jqInnerHtml );
		set_height_elment_column_five = arf_field_elem_attr_id;
	}
	if (fourth_elm_html != '') {
		var arf_field_elem_attr_id    = arflitegetnewrowfunction( fourth_elm_html, jqInnerHtml );
		set_height_elment_column_four = arf_field_elem_attr_id;
	}
	var firstChildHtml  = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' )[0];
	var secondChildHtml = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' )[1];
	var lastChildHtml   = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' )[2];
	arfliteaddClass( firstChildHtml, 'arf31colclass' );
	firstChildHtml.setAttribute( 'inner_class', 'arf31colclass' );
	arfliteaddClass( secondChildHtml, 'arf_23col' );
	secondChildHtml.setAttribute( 'inner_class', 'arf_23col' );
	arfliteaddClass( lastChildHtml, 'arf_3col' );
	lastChildHtml.setAttribute( 'inner_class', 'arf_3col' );
	jqInnerHtml.find( '.sortable_inner_wrapper' ).each(
		function(index, el) {
			if (jQuery( this ).find( '.arfformfield' ).length == 1) {
				jQuery( this ).find( '.arfformfield' ).removeAttr( 'style' );
				var fid = jQuery( this ).attr( 'id' ).replace( 'arfmainfieldid_', '' );
				arflite_initialize_control( fid );
			}
		}
	);
	document.getElementById( 'arf_single_column_field_ids' ).value = "";
	window.arf_sender_id       = '';
	window.arf_sender_parent   = {};
	window.arf_sender_previous = {};
}

function arfliteremoveBlankElm() {

	jQuery( '#new_fields' ).find( '.sortable_inner_wrapper' ).each(
		function() {

			if (jQuery( this ).find( '.arfformfield' ).length == 0 && jQuery( this ).find( '.arfformfield' ).length == 0) {
				var inner_class = jQuery( this ).attr( 'inner_class' );
				jQuery( this ).removeAttr( 'id' );
				jQuery( this ).addClass( 'sortable_inner_wrapper' );
				jQuery( this ).addClass( 'ui-droppable' );
				jQuery( this ).addClass( 'ui-sortable' );
				jQuery( this ).addClass( inner_class );
				jQuery( this ).attr( 'inner_class', inner_class );
				var blank_field_classes     = jQuery( this ).attr( 'class' );
				var edit_field_type_pattern = /(.*?)(edit_field_type_[a-zA-Z]+)(.*?)/g;
				var new_blank_classes       = blank_field_classes.replace( edit_field_type_pattern, '$1' );
				jQuery( this ).attr( 'class', new_blank_classes );
			} else {
				jQuery( this ).find( '.arfformfield' ).attr( 'style' );
				var attr_id = jQuery( this ).find( '.arfformfield' ).attr( 'id' );
				var id      = attr_id.replace( 'arf_field_', '' );
				jQuery( this ).attr( 'id', 'arfmainfieldid_' + id );
				var fields_data = arflite_retrieve_field_data( id );
				if (fields_data != null) {
					var field_type = fields_data.type;
					jQuery( this ).addClass( 'edit_field_type_' + field_type );
				}
			}
		}
	);
	var removeallelement    = true;
	var checkedinside_inner = false;
	jQuery( '.arf_inner_wrapper_sortable' ).each(
		function() {
			removeallelement    = true;
			checkedinside_inner = false;
			jQuery( this ).find( '.sortable_inner_wrapper' ).not( '.unsortable_inner_wrapper' ).each(
				function() {
					checkedinside_inner = true;
					var attr_id         = jQuery( this ).attr( 'id' );
					if (attr_id != null && removeallelement == true) {
						removeallelement = false;
					}
				}
			);
			if (false == checkedinside_inner && 0 == jQuery( this ).find( '.sortable_inner_wrapper' ).length && 0 == jQuery( this ).find( '.unsortable_inner_wrapper' ).length) {
				checkedinside_inner = true;
			}

			if (removeallelement && checkedinside_inner == true) {
				jQuery( this ).remove();
			}
		}
	);
	arflite_initialize_resizable();
}

function arflite_make_inner_sortable_into_2_part(obj) {
	var innerHtml   = arfliteClosest( obj, '.arf_inner_wrapper_sortable' );
	var jqInnerHtml = jQuery( innerHtml );
	if (arflitehasClass( innerHtml, 'two_column_wrapper' )) {
		return false;
	}
	var drop_instance = jqInnerHtml.find( '.sortable_inner_wrapper' ).droppable( 'instance' );
	var sort_instance = jqInnerHtml.find( '.sortable_inner_wrapper' ).sortable( 'instance' );
	/* if (typeof drop_instance != 'undefined' && typeof sort_instance != 'undefined') {
		jqInnerHtml.find( '.sortable_inner_wrapper' ).droppable( 'destroy' ).sortable( 'destroy' );
	} */
	var siw    = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' );
	var siwlen = siw.length;
	for (var sw = 0; sw < siwlen; sw++) {
		var swo = siw[sw];
		if (arflitehasClass( swo, 'ui-resizable' )) {
			jQuery( swo ).resizable( 'destroy' );
		}
		var id = swo.getAttribute( 'id' );
		if (id != null) {
			var field_id = id.replace( 'arfmainfieldid_', '' );
			arflite_initialize_control( field_id, true );
		}
	}
	var html            = arflitegetTwoHtml( obj, innerHtml );
	var second_elm_html = '';
	var third_elm_html  = '';
	var fourth_elm_html = '';
	var fifth_elm_html  = '';
	var last_elm_html   = '';
	if (arflitehasClass( innerHtml, 'three_column_wrapper' )) {
		arfliteremoveClass( innerHtml, 'three_column_wrapper' );
		arfliteaddClass( innerHtml, 'two_column_wrapper' );
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 0 );
		last_elm_html   = arflitegetcolumnhtmlfunction( jqInnerHtml, 4, 1 );
	} else if (arflitehasClass( innerHtml, 'four_column_wrapper' )) {
		arfliteremoveClass( innerHtml, 'four_column_wrapper' );
		arfliteaddClass( innerHtml, 'two_column_wrapper' );
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 0 );
		third_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 4, 1 );
		last_elm_html   = arflitegetcolumnhtmlfunction( jqInnerHtml, 5, 1 );
	} else if (arflitehasClass( innerHtml, 'five_column_wrapper' )) {
		arfliteremoveClass( innerHtml, 'five_column_wrapper' );
		arfliteaddClass( innerHtml, 'two_column_wrapper' );
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 0 );
		third_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 4, 1 );
		fourth_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 5, 1 );
		last_elm_html   = arflitegetcolumnhtmlfunction( jqInnerHtml, 6, 1 );
	} else if (arflitehasClass( innerHtml, 'six_column_wrapper' )) {
		arfliteremoveClass( innerHtml, 'six_column_wrapper' );
		arfliteaddClass( innerHtml, 'two_column_wrapper' );
		second_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 3, 0 );
		third_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 4, 1 );
		fourth_elm_html = arflitegetcolumnhtmlfunction( jqInnerHtml, 5, 1 );
		fifth_elm_html  = arflitegetcolumnhtmlfunction( jqInnerHtml, 6, 1 );
		last_elm_html   = arflitegetcolumnhtmlfunction( jqInnerHtml, 7, 1 );
	} else if (arflitehasClass( innerHtml, 'single_column_wrapper' )) {
		arfliteremoveClass( innerHtml, 'single_column_wrapper' );
		arfliteaddClass( innerHtml, 'two_column_wrapper' );
	}
	jqInnerHtml.find( '.sortable_inner_wrapper' ).each(
		function(index, el) {
			jQuery( this ).remove();
		}
	);
	jqInnerHtml.append( html );
	if (second_elm_html != "") {
		jqInnerHtml.find( '.sortable_inner_wrapper:nth-child(3)' ).replaceWith( second_elm_html );
	}
	if (last_elm_html != '') {
		var arf_field_elem_attr_id       = arflitegetnewrowfunction( last_elm_html, innerHtml );
		var set_height_elment_column_six = arf_field_elem_attr_id;
	}
	if (fifth_elm_html != '') {
		var arf_field_elem_attr_id        = arflitegetnewrowfunction( fifth_elm_html, innerHtml );
		var set_height_elment_column_five = arf_field_elem_attr_id;
	}
	if (fourth_elm_html != '') {
		var arf_field_elem_attr_id        = arflitegetnewrowfunction( fourth_elm_html, innerHtml );
		var set_height_elment_column_four = arf_field_elem_attr_id;
	}
	if (third_elm_html != '') {
		var arf_field_elem_attr_id         = arflitegetnewrowfunction( third_elm_html, innerHtml );
		var set_height_elment_column_three = arf_field_elem_attr_id;
	}
	
	let firstChildHtml = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' )[0];
	let lastChildHtml  = innerHtml.querySelector( '.sortable_inner_wrapper:last-child' );
	
	arfliteaddClass( firstChildHtml, 'arf21colclass' );
	firstChildHtml.setAttribute( 'inner_class', 'arf21colclass' );
	
	arfliteaddClass( lastChildHtml, 'arf_2col' );
	lastChildHtml.setAttribute( 'inner_class', 'arf_2col' );
	
	var siwl   = innerHtml.getElementsByClassName( 'sortable_inner_wrapper' );
	var siwlen = siwl.length;
	for (var a = 0; a < siwlen; a++) {
		var b = siwl[a];
		if (b.getElementsByClassName( 'arfformfield' ).length == 1) {
			b.getElementsByClassName( 'arfformfield' )[0].removeAttribute( 'style' );
		}
		var id = b.getAttribute( 'id' );
		if (id != null) {
			var field_id = id.replace( 'arfmainfieldid_', '' );
			arflite_initialize_control( field_id );
		}
	}
	document.getElementById( 'arf_single_column_field_ids' ).value = "";
	window.arf_sender_id       = '';
	window.arf_sender_parent   = {};
	window.arf_sender_previous = {};
}

function arflitegetTwoHtml(obj, innerHtml) {
	if (jQuery( innerHtml ).hasClass( 'single_column_wrapper' )) {
		var drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else if (jQuery( innerHtml ).hasClass( 'three_column_wrapper' )) {
		var drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else if (jQuery( innerHtml ).hasClass( 'four_column_wrapper' )) {
		var drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else if (jQuery( innerHtml ).hasClass( 'five_column_wrapper' )) {
		var drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else if (jQuery( innerHtml ).hasClass( 'six_column_wrapper' )) {
		var drag_items = jQuery( innerHtml ).find( '.sortable_inner_wrapper' ).prop( 'outerHTML' );
	} else {
		var drag_items = "<div class='sortable_inner_wrapper arf_sortable_receiver'></div>";
	}
	var thtml = drag_items + "<div class='sortable_inner_wrapper arf_sortable_receiver'></div>";
	return thtml;
}
window.sender_attr_id                      = '';
window.receiver_attr_id                    = '';
window.obj_html                            = '';
window.get_sender_arf_row                  = '';
window.get_sender_arf_inner_sortable_class = '';
window.sender_attr_id_id                   = '';
window.restrict_replacing_between_row      = '';
window.sender_attr_id_id_row               = '';
window.arf_sender_id                       = '';
window.arf_sender_parent                   = {};
window.arf_sender_previous                 = {};
window.arf_start_width_item                = 0;
window.arf_cc_fields_ids                   = [];
window.prevent_setting_class               = false;


function arflite_initialize_on_sortable_focus_tipso(field_id_obj, flag) {
	if (flag == '0') {
		setTimeout(
			function() {
				jQuery( ".arf_materialize_form #arf_field_" + field_id_obj + " .arfhelptipfocus" ).tipso( "destroy" );
				jQuery( ".arf_materialize_form .edit_field_type_radio #arf_field_" + field_id_obj + ", .arf_materialize_form .edit_field_type_checkbox #arf_field_" + field_id_obj + ", .arf_materialize_form .edit_field_type_select #arf_field_" + field_id_obj + ", .arf_materialize_form .edit_field_type_arfslider #arf_field_" + field_id_obj ).find( ".arfhelptipfocus" ).each(
					function() {
						jQuery( this ).tipso( "destroy" );
						var dataContent = jQuery( this ).attr( 'data-title' );
						if (dataContent != null || dataContent != undefined) {
							var bgcolor         = document.getElementById( 'arf_tooltip_bg_color' ).value;
							var textcolor       = document.getElementById( 'arf_tooltip_font_color' ).value;
							var tooltipposition = jQuery( 'input[name="arflitetippos"]:checked' ).val();

							jQuery( this ).tipso(
								{
									position: tooltipposition,
									width: 'auto',
									useTitle: false,
									content: dataContent,
									background: bgcolor,
									color: textcolor
								}
							);
						}
					}
				);
				jQuery( ".arf_materialize_form #arf_field_" + field_id_obj + " .arfhelptipfocus input,.arf_materialize_form #arf_field_" + field_id_obj + " .arfhelptipfocus textarea" ).on(
					"focus",
					function(e) {
						var bgcolor   = document.getElementById( 'arf_tooltip_bg_color' ).value;
						var textcolor = document.getElementById( 'arf_tooltip_font_color' ).value;
						jQuery( this ).parent().parent().each(
							function() {
								jQuery( this ).tipso( 'destroy' );
								var dataContent = jQuery( this ).attr( 'data-title' );
								if (jQuery( this ).find( "input" ).hasClass( "arf_phone_utils" )) {
									dataContent = jQuery( this ).parent().attr( "data-title" );
								}
								if (dataContent != null || dataContent != undefined) {
									var arftooltip_editor = jQuery( this ).tipso(
										{
											position: 'top',
											width: 'auto',
											useTitle: false,
											content: dataContent,
											background: bgcolor,
											color: textcolor,
										}
									);
									jQuery( this ).tipso( "show" );
									arftooltip_editor.off( "mouseover.tipso" );
									arftooltip_editor.off( "mouseout.tipso" );
								}
							}
						);
					}
				);
				jQuery( document ).on(
					"focusout",
					".arf_materialize_form #arf_field_" + field_id_obj + " .arfhelptipfocus input,.arf_materialize_form #arf_field_" + field_id_obj + " .arfhelptipfocus textarea",
					function(e) {
						jQuery( this ).parent().parent().each(
							function() {
								jQuery( this ).tipso( "hide" );
								jQuery( this ).tipso( "destroy" );
							}
						);
					}
				);
			},
			300
		);
	} else {
		setTimeout(
			function() {
				jQuery( ".arf_materialize_form [data-id='" + field_id_obj + "'] .arfhelptipfocus" ).tipso( "destroy" );
				jQuery( ".arf_materialize_form [data-id='" + field_id_obj + "'] .edit_field_type_radio, .arf_materialize_form [data-id='" + field_id_obj + "'] .edit_field_type_checkbox, .arf_materialize_form [data-id='" + field_id_obj + "'] .edit_field_type_select, .arf_materialize_form [data-id='" + field_id_obj + "'] .edit_field_type_arfslider" ).find( ".arfhelptipfocus" ).each(
					function() {
						jQuery( this ).tipso( "destroy" );
						var dataContent = jQuery( this ).attr( 'data-title' );
						if (dataContent != null || dataContent != undefined) {
							var bgcolor         = document.getElementById( 'arf_tooltip_bg_color' ).value;
							var textcolor       = document.getElementById( 'arf_tooltip_font_color' ).value;
							var tooltipposition = jQuery( 'input[name="arflitetippos"]:checked' ).val();

							jQuery( this ).tipso(
								{
									position: tooltipposition,
									width: 'auto',
									useTitle: false,
									content: dataContent,
									background: bgcolor,
									color: textcolor
								}
							);
						}
					}
				);
				jQuery( ".arf_materialize_form [data-id='" + field_id_obj + "'] .arfhelptipfocus input,.arf_materialize_form [data-id='" + field_id_obj + "'] .arfhelptipfocus textarea" ).on(
					"focus",
					function(e) {
						var bgcolor   = document.getElementById( 'arf_tooltip_bg_color' ).value;
						var textcolor = document.getElementById( 'arf_tooltip_font_color' ).value;
						jQuery( this ).parent().parent().each(
							function() {
								jQuery( this ).tipso( 'destroy' );
								var dataContent = jQuery( this ).attr( 'data-title' );
								if (jQuery( this ).find( "input" ).hasClass( "arf_phone_utils" )) {
									dataContent = jQuery( this ).parent().attr( "data-title" );
								}
								if (dataContent != null || dataContent != undefined) {
									var arftooltip_editor = jQuery( this ).tipso(
										{
											position: 'top',
											width: 'auto',
											useTitle: false,
											content: dataContent,
											background: bgcolor,
											color: textcolor,
										}
									);
									jQuery( this ).tipso( "show" );
									arftooltip_editor.off( "mouseover.tipso" );
									arftooltip_editor.off( "mouseout.tipso" );
								}
							}
						);
					}
				);
				jQuery( document ).on(
					"focusout",
					".arf_materialize_form [data-id='" + field_id_obj + "'] .arfhelptipfocus input,.arf_materialize_form [data-id='" + field_id_obj + "'] .arfhelptipfocus textarea" ,
					function(e) {
						jQuery( this ).parent().parent().each(
							function() {
								jQuery( this ).tipso( "hide" );
								jQuery( this ).tipso( "destroy" );
							}
						);
					}
				);
			},
			300
		);
	}
}

function arflite_sortable_inner(sender_attr_id, receiver_attr_id, obj_html) {
	if ((sender_attr_id != '' && obj_html != '') && (sender_attr_id != undefined && obj_html != undefined)) {
		var data_current_flag = '1';
		var data_receive_flag = '1';
		if ( ! jQuery( '.sortable_inner_wrapper.receiver_sortable_class' ).length) {
			return;
		}
		jQuery( '.sortable_inner_wrapper.current_sortable_class, .sortable_inner_wrapper.receiver_sortable_class' ).each(
			function(index, el) {
				if (jQuery( this ).hasClass( 'current_sortable_class' ) && data_current_flag == '1') {
					jQuery( this ).append( obj_html );
					jQuery( this ).attr( 'id', sender_attr_id );
					var inner_class = jQuery( this ).attr( 'inner_class' );
					var id          = sender_attr_id.replace( 'arfmainfieldid_', '' );
					jQuery( this ).addClass( 'sortable_inner_wrapper' );
					jQuery( this ).addClass( inner_class );
					var fields_data = arflite_retrieve_field_data( id );
					if (fields_data != null) {
						var field_type = fields_data.type;
					}
					if (receiver_attr_id != '') {
						var receiver_id_full     = receiver_attr_id.replace( 'arf_field_', '' );
						var receiver_id          = receiver_id_full.replace( '_confirm', '' );
						var receiver_fields_data = arflite_retrieve_field_data( receiver_id );
						var receiver_field_type  = "";
						if (receiver_fields_data != null) {
							receiver_field_type = receiver_fields_data.type;
							setTimeout(
								function() {
									jQuery( '#arfmainfieldid_' + receiver_id ).removeClass( 'edit_field_type_' + field_type );
									jQuery( '#arfmainfieldid_' + receiver_id ).removeClass( 'edit_field_type_' + receiver_field_type );
									jQuery( '#arfmainfieldid_' + receiver_id ).addClass( 'edit_field_type_' + receiver_field_type );
									if (receiver_field_type == 'email') {
										jQuery( '#arfmainfieldid_' + receiver_id ).removeClass( 'arf_confirm_field' );
									}
								},
								200
							);
						}
						if (jQuery( '#arfmainfieldid_' + id ).hasClass( 'arf_confirm_field' )) {
							setTimeout(
								function() {
									if (field_type != null) {
										jQuery( '#arfmainfieldid_' + receiver_id ).removeClass( 'edit_field_type_' + field_type );
										jQuery( '#arfmainfieldid_' + id ).removeClass( 'edit_field_type_' + receiver_field_type );
										jQuery( '#arfmainfieldid_' + id ).addClass( 'edit_field_type_' + field_type );
									}
									jQuery( '#arfmainfieldid_' + id ).removeClass( 'arf_confirm_field' );
								},
								10
							);
						} else {
							setTimeout(
								function() {
									if (field_type != null) {
										jQuery( '#arfmainfieldid_' + receiver_id ).removeClass( 'edit_field_type_' + field_type );
										jQuery( '#arfmainfieldid_' + id ).removeClass( 'edit_field_type_' + receiver_field_type );
										jQuery( '#arfmainfieldid_' + id ).addClass( 'edit_field_type_' + field_type );
									}
								},
								10
							);
						}
					}
					jQuery( this ).addClass( 'ui-resizable' );
					data_current_flag = '0';
					jQuery( this ).removeClass( 'current_sortable_class' );
				} else if (jQuery( this ).hasClass( 'receiver_sortable_class' ) && data_receive_flag == '1') {
					var sender_id   = sender_attr_id.replace( 'arfmainfieldid_', '' );
					var receiver_id = receiver_attr_id.replace( 'arf_field_', '' );
					jQuery( this ).find( '#arf_field_' + sender_id ).remove();

					jQuery( this ).attr( 'id', 'arfmainfieldid_' + receiver_id );

					jQuery( this ).removeClass( 'receiver_sortable_class' );
					data_receive_flag = '0';
					jQuery( this ).removeClass( 'receiver_sortable_class' );
				}
				if (data_current_flag == '0' && data_receive_flag == '0') {
					return false;
				}
			}
		);
	}
}

function arfliteremovePlaceholder(obj, event, ui) {
	var attr_id = jQuery( obj ).attr( 'id' );
	jQuery( ui.placeholder ).css(
		{
			'position': 'relative',
			'width': 'inherit',
			'height': 'inherit',
			'border': 'inherit'
		}
	);

	if (attr_id == undefined || attr_id == '' || attr_id == null) {
		jQuery( ui.placeholder ).css(
			{
				'position': 'absolute',
				'width': jQuery( ui.placeholder ).parent().width() - Number( 0 ),
				'height': (jQuery( ui.placeholder ).parent().height()) - Number( 0 )
			}
		);
	} else {
		var existing_id = jQuery( ui.sender ).find( '.arfformfield' ).attr( 'id' );
		var item_id     = jQuery( ui.item ).attr( 'id' );
		jQuery( ui.placeholder ).css(
			{
				'position': 'absolute',
				'width': jQuery( ui.placeholder ).parent().width() - Number( 0 ),
				'height': (jQuery( ui.placeholder ).parent().height()) - Number( 0 )
			}
		);

		if (existing_id != item_id) {
			jQuery( ui.placeholder ).css(
				{
					'border': '0px solid'
				}
			);
		}
	}
}

window.restricted_inner_field_id = '';
window.restricted_prev_field_id  = '';
window.restricted_parent_field   = '';
window.restricted_field_type     = '';

function ArfliteSortObjByValue(list) {
	var sortable  = [];
	var sortedObj = {};
	for (var key in list) {
		sortable.push( [key, list[key]] );
	}
	sortable.sort(
		function(a, b) {
			return a[1] - b[1];
		}
	);
	sortable.forEach(
		function(item) {
			sortedObj[item[0]] = item[1]
		}
	)
	return sortedObj;
}

function arflite_recieve_on_inner_sortable_func(obj, event, ui) {

	var attr_id    = jQuery( obj ).attr( 'id' );
	var inputStyle = document.getElementById( 'arfmainforminputstyle' ).value;

	if (attr_id != undefined && jQuery( ui.helper ).hasClass( 'arf_form_element_item' )) {
		jQuery( ui.helper ).replaceWith( '' );
	} else if (window.restrict_replacing_between_row == '1') {
		if (jQuery( ui.helper ).hasClass( 'arfformfield' )) {
			if (obj.find( '.arfformfield' ).length > 0) {
				var total_inside_fields = obj.find( '.arfformfield' ).length;
				if (total_inside_fields > 1) {
					var fid           = jQuery( ui.helper ).attr( 'id' ).replace( 'arf_field_', '' );
					var isSingleField = document.getElementById( 'arf_single_column_field_ids' ).value;
					var isSingle      = false;
					if (typeof isSingleField != 'undefined' && isSingleField != '') {
						var singleFields = arflite_parse_json( isSingleField );
						if (singleFields.indexOf( fid ) > -1) {
							isSingle = true;
						}
					}
					if (isSingle && window.arf_sender_id != "" && typeof window.arf_sender_id != "undefined" && window.arf_sender_id == fid) {
						var old_elm    = obj.find( '.arfformfield' )[1];
						var old_elm_id = old_elm.getAttribute( 'id' ).replace( 'arf_field_', '' );
						if (typeof old_elm == 'undefined' || (typeof old_elm != 'undefined' && old_elm_id == window.arf_sender_id)) {
							var old_elm = obj.find( '.arfformfield' )[0];
						}
						jQuery( ui.helper ).replaceWith( '' );
						var ui_id   = old_elm.getAttribute( 'id' ).replace( 'arf_field_', '' );
						var uiElmId = 'arfmainfieldid_' + ui_id;
						(function(olm, elm_id) {
							setTimeout(
								function() {
									if (jQuery( olm ).parent().length == 0) {
										var attrid = jQuery( olm ).parent().context.getAttribute( 'id' );
										if (jQuery( "#" + attrid ).length > 0) {
											jQuery( "#" + attrid ).parent().attr( 'id', elm_id );
										}
									} else {
										jQuery( olm ).parent().attr( 'id', elm_id );
									}
									arflite_initialize_field_order();
									arfliteinitialize_field_resize_width();
								},
								10
							);
						})( old_elm, uiElmId );
						var previousElm = window.arf_sender_previous[window.arf_sender_id];
						var new_elm     = window.arf_sender_parent[window.arf_sender_id];
						if (jQuery( new_elm ).find( '.arfformfield' ).hasClass( 'arf_confirm_field' )) {
							setTimeout(
								function() {
									jQuery( old_elm ).parent().removeClass( 'arf_confirm_field' );
								},
								20
							);
						}
						if (typeof previousElm == 'undefined' || previousElm == null) {
							jQuery( '#new_fields' ).prepend( new_elm );
						} else {
							jQuery( new_elm ).insertAfter( previousElm );
						}
						var field_data = arflite_retrieve_field_data( window.arf_sender_id );
						var field_type = field_data.type;
						if (field_type == 'select') {
							jQuery( '#arf_field_' + window.arf_sender_id ).find( '.bootstrap-select' ).remove();
						}
						arflite_initialize_control( window.arf_sender_id );
					} else {
						jQuery( ui.helper ).removeAttr( 'style' );
						var id          = jQuery( ui.helper ).find( '.arf_fieldiconbox' ).attr( 'data-field_id' );
						var fields_data = arflite_retrieve_field_data( id );
						if (fields_data != null) {
							var field_type = fields_data.type;
							if ((field_type == 'email') && jQuery( ui.helper ).hasClass( 'arf_confirm_field' )) {
								jQuery( ui.helper ).parent( '.sortable_inner_wrapper' ).addClass( 'arf_confirm_field' );
							} else {
								jQuery( ui.helper ).parent( '.sortable_inner_wrapper' ).removeClass( 'arf_confirm_field' );
							}
							var ui_helper_html = jQuery( ui.helper ).prop( 'outerHTML' );
							jQuery( ui.helper ).replaceWith( ui_helper_html );
							if (window.arf_sender_id != '') {
								var field_data = arflite_retrieve_field_data( window.arf_sender_id );
								var field_type = field_data.type;
								if (field_type == 'select') {
									if (inputStyle != 'material') {
										jQuery( '#arf_field_' + window.arf_sender_id ).find( '.bootstrap-select' ).remove();
									} else {
										jQuery( "#arf_field_" + window.arf_sender_id ).find( '.select-wrapper' ).find( 'span' ).remove();
										jQuery( "#arf_field_" + window.arf_sender_id ).find( '.select-wrapper' ).find( '.arf-select-dropdown' ).remove();
										jQuery( "#arf_field_" + window.arf_sender_id ).find( 'select[name="item_meta[' + window.arf_sender_id + ']"]' ).unwrap();
									}
								}
								setTimeout(
									function() {
										arflite_initialize_control( window.arf_sender_id );
									},
									100
								);
							}
						} else {
							if (jQuery( ui.helper ).hasClass( 'arf_confirm_field' )) {
								jQuery( ui.helper ).parent( '.sortable_inner_wrapper' ).addClass( 'arf_confirm_field' );
							} else {
								jQuery( ui.helper ).parent( '.sortable_inner_wrapper' ).removeClass( 'arf_confirm_field' );
							}
						}
					}
				} else {
					var id                = jQuery( ui.helper ).find( '.arf_fieldiconbox' ).attr( 'data-field_id' );
					var SingleFieldValues = document.getElementById( 'arf_single_column_field_ids' ).value;
					if (SingleFieldValues != "") {
						var elm        = document.getElementById( 'arf_field_' + id );
						var parentNode = arfliteClosest( elm, '.arf_inner_wrapper_sortable' );;
						if ( ! arflitehasClass( parentNode, 'single_column_wrapper' )) {
							var singleFieldIds = arflite_parse_json( SingleFieldValues );
							var indexOfId      = singleFieldIds.indexOf( id );
							if (indexOfId > -1) {
								singleFieldIds.splice( indexOfId, 1 );
							}
							var updatedSingleField = JSON.stringify( singleFieldIds );
							document.getElementById( 'arf_single_column_field_ids' ).value = updatedSingleField;
						}
					}
					var field_data = arflite_retrieve_field_data( id );
					var field_type = field_data.type;
					if (field_type == 'select') {
						if (inputStyle != 'material') {
							jQuery( '#arf_field_' + id ).find( '.bootstrap-select' ).remove();
						} else {
							jQuery( "#arf_field_" + id ).find( '.select-wrapper' ).find( 'span' ).remove();
							jQuery( "#arf_field_" + id ).find( '.select-wrapper' ).find( '.arf-select-dropdown' ).remove();
							jQuery( "#arf_field_" + id ).find( 'select[name="item_meta[' + id + ']"]' ).unwrap();
						}
					}
					arflite_initialize_control( id );
				}
			} else {

				jQuery( ui.helper ).removeAttr( 'style' );
				var id          = jQuery( ui.helper ).find( '.arf_fieldiconbox' ).attr( 'data-field_id' );
				var fields_data = arflite_retrieve_field_data( id );
				if (fields_data != null) {
					var field_type = fields_data.type;
					if ((field_type == 'email' ) && jQuery( ui.helper ).hasClass( 'arf_confirm_field' )) {
						jQuery( ui.helper ).parent( '.sortable_inner_wrapper' ).addClass( 'arf_confirm_field' );
					} else {
						jQuery( ui.helper ).parent( '.sortable_inner_wrapper' ).removeClass( 'arf_confirm_field' );
					}
					var ui_helper_html = jQuery( ui.helper ).prop( 'outerHTML' );
					jQuery( ui.helper ).replaceWith( ui_helper_html );
				}
			}
			setTimeout(
				function() {
					arfliteinitialize_field_resize_width();
				},
				200
			);
		}
	} else {
		if (jQuery( ui.helper ).hasClass( 'arf_form_element_item' )) {

			var field_type    = jQuery( ui.helper ).attr( 'data-type' );
			var arfinputstyle = jQuery( "#arfmainforminputstyle" ).val();
			if (arfinputstyle == 'material') {
				var json_field_data = arflite_parse_json( Base64.decode( jQuery( "#arflite_convert_new_materialize_field_array_json" ).val() ) );
			} else {
				var json_field_data = arflite_parse_json( Base64.decode( jQuery( "#arflite_convert_new_field_array_json" ).val() ) );
			}

			var json_newfield_data      = json_field_data[field_type];
			var field_id                = arforms_sortable_obj.arforms_generate_form_field_id();
			var form_id                 = jQuery( "#id" ).val();
			var arf_unique_key          = arfliterandomString();
			var replace_string_variable = json_newfield_data;
			replace_string_variable     = replace_string_variable.replace( /\{arf_field_id\}/gi, field_id );
			replace_string_variable     = replace_string_variable.replace( /\{arf_form_id\}/gi, form_id );
			replace_string_variable     = replace_string_variable.replace( /\{arf_unique_key\}/gi, arf_unique_key );
			var added_div               = jQuery( replace_string_variable ).find( '#arf_field_' + field_id ).prop( 'outerHTML' );

			jQuery( ui.helper ).parent().attr( 'id', 'arfmainfieldid_' + field_id );

			jQuery( ui.helper ).replaceWith( added_div );
			(function(field_type, field_id) {
				setTimeout(
					function() {
						arflite_initialize_resizable();
						arflite_load_bootstrap_js_css( field_type, field_id );
						var field_data = arflite_retrieve_field_data( field_id );
						if (field_data != null) {

							var field_data_obj = {
								'field_id': field_id,
								'field_name': field_data.name,
								'field_type': field_data.type
							};
							window.added_new_fields.push( field_data_obj )
						}

						jQuery( '#arf_field_data_' + field_id ).val( JSON.stringify( field_data ) );

						arflite_update_name_dropdown( field_id, field_type, field_data.name );
					},
					10
				);
			})( field_type, field_id );
			(function(fid) {
				setTimeout(
					function() {
						arfliteheightdiv( 'individual', fid );
					},
					10
				);
			})( field_id );
			setTimeout(
				function() {
					arfliteinitialize_field_resize_width();
				},
				200
			);
		}

		if (jQuery( ui.helper ).hasClass( 'arfformfield' )) {

			if (obj.find( '.arfformfield' ).length > 0) {

				var total_inside_fields = obj.find( '.arfformfield' ).length;
				var fid                 = jQuery( ui.helper ).attr( 'id' ).replace( 'arf_field_', '' );
				var fdata               = arflite_retrieve_field_data( fid );

				if (total_inside_fields > 1) {
					var fid           = jQuery( ui.helper ).attr( 'id' ).replace( 'arf_field_', '' );
					var isSingleField = document.getElementById( 'arf_single_column_field_ids' ).value;
					var isSingle      = false;
					if (typeof isSingleField != 'undefined' && isSingleField != '') {
						var singleFields = arflite_parse_json( isSingleField );
						if (singleFields.indexOf( fid ) > -1) {
							isSingle = true;
						}
					}

					if ((isSingle && window.arf_sender_id != "" && typeof window.arf_sender_id != "undefined" && window.arf_sender_id == fid)) {
						var old_elm    = obj.find( '.arfformfield' )[1];
						var old_elm_id = old_elm.getAttribute( 'id' ).replace( 'arf_field_', '' );

						if (typeof old_elm == 'undefined' || (typeof old_elm != 'undefined' && old_elm_id == window.arf_sender_id)) {
							var old_elm = obj.find( '.arfformfield' )[0];
						}

						var ui_id = old_elm.getAttribute( 'id' ).replace( 'arf_field_', '' );

						jQuery( ui.helper ).replaceWith( old_elm.outerHTML );

						var uiElmId = 'arfmainfieldid_' + ui_id;
						(function(olm, elm_id) {
							setTimeout(
								function() {
									if (jQuery( olm ).parent().length == 0) {
										if ( typeof jQuery( olm ).parent().context == 'undefined' ) {
											var attrid = jQuery( olm ).attr( 'id' );
										} else {
											var attrid = jQuery( olm ).parent().context.getAttribute( 'id' );
										}
										if (jQuery( "#" + attrid ).length > 0) {
											jQuery( "#" + attrid ).parent().attr( 'id', elm_id );
										}
									} else {
										jQuery( olm ).parent().attr( 'id', elm_id );
									}
									arflite_initialize_field_order();
									arfliteinitialize_field_resize_width();
								},
								10
							);
						})( old_elm, uiElmId );
						var previousElm = window.arf_sender_previous[window.arf_sender_id];
						var new_elm     = window.arf_sender_parent[window.arf_sender_id];
						if (jQuery( new_elm ).find( '.arfformfield' ).hasClass( 'arf_confirm_field' )) {
							setTimeout(
								function() {
									jQuery( old_elm ).parent().removeClass( 'arf_confirm_field' );
								},
								20
							);
						}
						if (typeof previousElm == 'undefined' || previousElm == null) {
							jQuery( '#new_fields' ).prepend( new_elm );
						} else {
							jQuery( new_elm ).insertAfter( previousElm );
						}
						var field_data = arflite_retrieve_field_data( window.arf_sender_id );
						if (field_data != null) {
							var field_type = field_data.type;
							if (field_type == 'select') {
								if (inputStyle != 'material') {
									jQuery( '#arf_field_' + window.arf_sender_id ).find( '.bootstrap-select' ).remove();
								} else {
									jQuery( "#arf_field_" + window.arf_sender_id ).find( '.select-wrapper' ).find( 'span' ).remove();
									jQuery( "#arf_field_" + window.arf_sender_id ).find( '.select-wrapper' ).find( '.arf-select-dropdown' ).remove();
									jQuery( "#arf_field_" + window.arf_sender_id ).find( 'select[name="item_meta[' + window.arf_sender_id + ']"]' ).unwrap();
								}
							}
							setTimeout(
								function() {
									arflite_initialize_control( window.arf_sender_id );
								},
								100
							);
						}
					} else {
						jQuery( ui.helper ).removeAttr( 'style' );
						var id                = jQuery( ui.helper ).find( '.arf_fieldiconbox' ).attr( 'data-field_id' );
						var swapped_field_id  = attr_id.replace( 'arfmainfieldid_', '' );
						var fields_data       = arflite_retrieve_field_data( id );
						var swpped_field_data = arflite_retrieve_field_data( swapped_field_id );
						if (fields_data != null) {
							var field_type = fields_data.type;
							if ((field_type == 'email') && jQuery( ui.helper ).hasClass( 'arf_confirm_field' )) {
								jQuery( ui.helper ).parent( '.sortable_inner_wrapper' ).addClass( 'arf_confirm_field' );
							} else {
								jQuery( ui.helper ).parent( '.sortable_inner_wrapper' ).removeClass( 'arf_confirm_field' );
							}
							var ui_helper_html = jQuery( ui.helper ).prop( 'outerHTML' );
							var adjust_height  = false;

							jQuery( ui.helper ).replaceWith( ui_helper_html );
							var field_type         = fields_data.type;
							var swapped_field_type = '';
							if (swpped_field_data != null) {
								swapped_field_type = swpped_field_data.type;
							}
							if (field_type == 'select') {
								if (inputStyle != 'material') {
									jQuery( '#arf_field_' + id ).find( '.bootstrap-select' ).remove();
								} else {
									jQuery( "#arf_field_" + id ).find( '.select-wrapper' ).find( 'span' ).remove();
									jQuery( "#arf_field_" + id ).find( '.select-wrapper' ).find( '.arf-select-dropdown' ).remove();
									jQuery( "#arf_field_" + id ).find( 'select[name="item_meta[' + id + ']"]' ).unwrap();
								}
							}
							setTimeout(
								function() {
									if (swapped_field_type == 'select') {
										if (inputStyle != 'material') {
											jQuery( '#arf_field_' + swapped_field_id ).find( '.bootstrap-select' ).remove();
										} else {
											jQuery( "#arf_field_" + swapped_field_id ).find( '.select-wrapper' ).find( 'span' ).remove();
											jQuery( "#arf_field_" + swapped_field_id ).find( '.select-wrapper' ).find( '.arf-select-dropdown' ).remove();
											jQuery( "#arf_field_" + swapped_field_id ).find( 'select[name="item_meta[' + swapped_field_id + ']"]' ).unwrap();
										}
									}
									arflite_initialize_control( swapped_field_id );
									arflite_initialize_control( id );
								},
								500
							);
						} else {
							if (jQuery( ui.helper ).hasClass( 'arf_confirm_field' )) {
								jQuery( ui.helper ).parent( '.sortable_inner_wrapper' ).addClass( 'arf_confirm_field' );
							} else {
								jQuery( ui.helper ).parent( '.sortable_inner_wrapper' ).removeClass( 'arf_confirm_field' );
							}
						}
						setTimeout(
							function() {
								arfliteheightdiv();
							},
							500
						);
					}
					arflite_initialize_on_sortable_focus_tipso( get_sender_arf_row, '1' );
				} else {
					var id                = jQuery( ui.helper ).find( '.arf_fieldiconbox' ).attr( 'data-field_id' );
					var SingleFieldValues = document.getElementById( 'arf_single_column_field_ids' ).value;
					var fdata             = arflite_retrieve_field_data( id );
					if (fdata != null && fdata.type == 'captcha' ) {
						var old_elm    = obj.find( '.arfformfield' )[0];
						var old_elm_id = old_elm.getAttribute( 'id' ).replace( 'arf_field_', '' );
						if (typeof old_elm == 'undefined' || (typeof old_elm != 'undefined' && old_elm_id == window.arf_sender_id)) {
							var old_elm = obj.find( '.arfformfield' )[0];
						}

						jQuery( ui.helper ).replaceWith( '' );
						var ui_id   = old_elm.getAttribute( 'id' ).replace( 'arf_field_', '' );
						var uiElmId = 'arfmainfieldid_' + ui_id;
						(function(olm, elm_id) {
							setTimeout(
								function() {
									if (jQuery( olm ).parent().length == 0) {
										if ( typeof jQuery( olm ).parent().context == 'undefined' ) {
											var attrid = jQuery( olm ).attr( 'id' );
										} else {
											var attrid = jQuery( olm ).parent().context.getAttribute( 'id' );
										}
										if (jQuery( "#" + attrid ).length > 0) {
											jQuery( "#" + attrid ).parent().attr( 'id', elm_id );
										}
									} else {
										jQuery( olm ).parent().attr( 'id', elm_id );
									}
									arflite_initialize_field_order();
									arfliteinitialize_field_resize_width();
								},
								10
							);
						})( old_elm, uiElmId );
						var previousElm = window.arf_sender_previous[window.arf_sender_id];
						var new_elm     = window.arf_sender_parent[window.arf_sender_id];
						if (jQuery( new_elm ).find( '.arfformfield' ).hasClass( 'arf_confirm_field' )) {
							setTimeout(
								function() {
									jQuery( old_elm ).parent().removeClass( 'arf_confirm_field' );
								},
								20
							);
						}
						if (typeof previousElm == 'undefined' || previousElm == null) {
							jQuery( '#new_fields' ).prepend( new_elm );
						} else {
							jQuery( new_elm ).insertAfter( previousElm );
						}
						var field_data = arflite_retrieve_field_data( window.arf_sender_id );
						if (field_data != null) {
							var field_type = field_data.type;
							if (field_type == 'select') {
								if (inputStyle != 'material') {
									jQuery( '#arf_field_' + window.arf_sender_id ).find( '.bootstrap-select' ).remove();
								} else {
									jQuery( "#arf_field_" + window.arf_sender_id ).find( '.select-wrapper' ).find( 'span' ).remove();
									jQuery( "#arf_field_" + window.arf_sender_id ).find( '.select-wrapper' ).find( '.arf-select-dropdown' ).remove();
									jQuery( "#arf_field_" + window.arf_sender_id ).find( 'select[name="item_meta[' + window.arf_sender_id + ']"]' ).unwrap();
								}
							}
							setTimeout(
								function() {
									arflite_initialize_control( window.arf_sender_id );
								},
								100
							);
						}
					} else {
						var elm        = document.getElementById( 'arf_field_' + id );
						var parentNode = arfliteClosest( elm, '.arf_inner_wrapper_sortable' );
						if (parentNode == null && /_confirm/.test( id )) {
							parentNode = jQuery( ui.helper )[0];
						}
						if (SingleFieldValues != "") {
							var elm        = document.getElementById( 'arf_field_' + id );
							var parentNode = arfliteClosest( elm, '.arf_inner_wrapper_sortable' );;
							if ( ! arflitehasClass( parentNode, 'single_column_wrapper' )) {
								var singleFieldIds = arflite_parse_json( SingleFieldValues );
								var indexOfId      = singleFieldIds.indexOf( id );
								if (indexOfId > -1) {
									singleFieldIds.splice( indexOfId, 1 );
								}
								var updatedSingleField = JSON.stringify( singleFieldIds );
								document.getElementById( 'arf_single_column_field_ids' ).value = updatedSingleField;
							}
						}
						var fields_data = arflite_retrieve_field_data( id );
						if (fields_data != null) {
							jQuery( '#arf_field_data_' + id ).val( JSON.stringify( fields_data ) );
						}
					}
				}
			} else {
				jQuery( ui.helper ).removeAttr( 'style' );
				var id          = jQuery( ui.helper ).find( '.arf_fieldiconbox' ).attr( 'data-field_id' );
				var fields_data = arflite_retrieve_field_data( id );

				if (fields_data != null) {
					var field_type = fields_data.type;
					if (field_type == 'email' && jQuery( ui.helper ).hasClass( 'arf_confirm_field' )) {
						jQuery( ui.helper ).parent( '.sortable_inner_wrapper' ).addClass( 'arf_confirm_field' );
					}
					jQuery( '#arf_field_data_' + field_id ).val( JSON.stringify( fields_data ) );
					var ui_helper_html = jQuery( ui.helper ).prop( 'outerHTML' );
					jQuery( ui.helper ).replaceWith( ui_helper_html );
				}
			}
			setTimeout(
				function() {
					arfliteinitialize_field_resize_width();
				},
				200
			);
		}
	}
}

function arflite_reinitialize_single_sortable() {
	var init_single_column  = false;
	var two_column_length   = jQuery( '.newfield_div' ).find( '.two_column_wrapper' ).length;
	var three_column_length = jQuery( '.newfield_div' ).find( '.three_column_wrapper' ).length;
	if (two_column_length > 0 || three_column_length > 0) {
		arflite_initialize_resizable();
	}
}

function arflite_receive_on_common_sortable_func(obj, event, ui) {

	if (jQuery( ui.helper ).hasClass( 'arf_form_element_item' )) {
		var field_type = jQuery( ui.helper ).attr( 'data-type' );
		if (jQuery( ui.helper ).parent().hasClass( 'newfield_div' )) {
			var arfinputstyle = document.getElementById( "arfmainforminputstyle" ).value;
			if (arfinputstyle == 'material') {
				var json_field_data = arflite_parse_json( Base64.decode( jQuery( "#arflite_convert_new_materialize_field_array_json" ).val() ) );
			} else {
				var json_field_data = arflite_parse_json( Base64.decode( jQuery( "#arflite_convert_new_field_array_json" ).val() ) );
			}

			var json_newfield_data = json_field_data[field_type];

			var field_id       = arforms_sortable_obj.arforms_generate_form_field_id();
			var form_id        = document.getElementById( 'id' ).value;
			var arf_unique_key = arfliterandomString();

			var replace_string_variable = json_newfield_data;
			var arf_editor_index_row    = document.getElementById( 'arf_editor_total_rows' ).value;

			replace_string_variable = replace_string_variable.replace( /\{arf_field_id\}/gi, field_id );
			replace_string_variable = replace_string_variable.replace( /\{arf_form_id\}/gi, form_id );
			replace_string_variable = replace_string_variable.replace( /\{arf_unique_key\}/gi, arf_unique_key );

			arf_editor_index_row    = parseInt( arf_editor_index_row ) + 1;
			replace_string_variable = replace_string_variable.replace( /\{arf_editor_index_row\}/gi, arf_editor_index_row );

			jQuery( ui.helper ).replaceWith( replace_string_variable );
			var is_hide_label = document.getElementById( "arfhidelabels" ).value;
			if (is_hide_label == 1) {
				jQuery( "#arf_field_" + field_id ).addClass( 'none_container' );
			}
			document.getElementById( 'arf_editor_total_rows' ).value = arf_editor_index_row;

			arfliteSetDefaultColumnWidth();

			arflite_load_bootstrap_js_css( field_type, field_id );

			var tmp_field_data = arflite_retrieve_field_data( field_id );
			var field_name     = tmp_field_data.name;

			window.is_add_new_field = true;
			var field_data_obj      = {
				'field_id': field_id,
				'field_name': field_name,
				'field_type': field_type
			};
			window.added_new_fields.push( field_data_obj )
			window.loaded_settings  = [];
		}
	} else if (jQuery( ui.helper ).hasClass( 'arfformfield' )) {
		jQuery( ui.helper ).removeAttr( 'style' );
		var attr_id = jQuery( ui.helper ).attr( 'id' );
		var id      = attr_id.replace( 'arf_field_', '' );
		arflite_initialize_control( id, true );
		var blank_div   = "<div class='sortable_inner_wrapper'></div>";
		var fields_data = arflite_retrieve_field_data( id );

		if (fields_data != null) {
			var field_type = fields_data.type;
			jQuery( ui.helper ).parent().find( '.sortable_inner_wrapper' ).removeAttr( 'id' );
			jQuery( ui.helper ).parent().find( '.sortable_inner_wrapper' ).removeClass( 'edit_field_type_' + field_type );
			var ui_helper_html     = jQuery( ui.helper ).prop( 'outerHTML' );
			var multicol_html_data = arflite_multicol_html();
			var arf_row_index      = jQuery( '#arf_editor_total_rows' ).val();
			var new_html           = "<div class='arf_inner_wrapper_sortable arfmainformfield edit_form_item arffieldbox ui-state-default 1  ui-sortable-handle single_column_wrapper' data-id='arf_editor_main_row_" + arf_row_index + "'>" + multicol_html_data + "<div class='sortable_inner_wrapper edit_field_type_" + field_type + " arf_1col arf1columns' id='" + attr_id + "' inner_class='arf_1col'>" + ui_helper_html + "</div></div>";
			jQuery( ui.helper ).replaceWith( new_html );
			arflite_load_bootstrap_js_css( field_type, id );
		} else {
			var ui_helper_html     = jQuery( ui.helper ).prop( 'outerHTML' );
			var multicol_html_data = arflite_multicol_html();
			var arf_row_index      = jQuery( '#arf_editor_total_rows' ).val();
			var new_html           = "<div class='arf_inner_wrapper_sortable arfmainformfield edit_form_item arffieldbox ui-state-default 1  ui-sortable-handle single_column_wrapper' data-id='arf_editor_main_row_" + arf_row_index + "'>" + multicol_html_data + "<div class='sortable_inner_wrapper edit_field_type_" + field_type + " arf_1col arf1columns' id='" + attr_id + "' inner_class='arf_1col'>" + ui_helper_html + "</div></div>";
			jQuery( ui.helper ).replaceWith( new_html );
		}

		arflite_initialize_control( id );
		if ( ! /[\d+](_confirm)/ig.test( id )) {
			field_name = fields_data.name;
			arflite_update_name_dropdown( id, field_type, field_name );
		}
		arflite_reset_single_field_ids( id );
	}
	arfliteremoveBlankElm();
}

function arfliteaddinnerclasses(){
	let new_field_data        = '';
	let SortableWrapper       = document.getElementsByClassName( 'sortable_inner_wrapper' );
	let totalSortableWrappers = SortableWrapper.length;
	if (totalSortableWrappers > 0) {
		for (let ic = 0; ic < totalSortableWrappers; ic++) {
			let This        = SortableWrapper[ic];
			let inner_class = This.getAttribute( 'inner_class' );
			let outer_class = '';
			if (inner_class == 'arf_2col' || inner_class == 'arf21colclass') {
				outer_class = 'arf_2';
			} else if (inner_class == 'arf31colclass' || inner_class == 'arf_23col' || inner_class == 'arf_3col') {
				outer_class = 'arf_3';
			} else if (inner_class == 'arf41colclass' || inner_class == 'arf42colclass' || inner_class == 'arf43colclass' || inner_class == 'arf_4col') {
				outer_class = 'arf_4';
			} else if (inner_class == 'arf51colclass' || inner_class == 'arf52colclass' || inner_class == 'arf53colclass' || inner_class == 'arf54colclass' || inner_class == 'arf_5col') {
				outer_class = 'arf_5';
			} else if (inner_class == 'arf61colclass' || inner_class == 'arf62colclass' || inner_class == 'arf63colclass' || inner_class == 'arf64colclass' || inner_class == 'arf65colclass' || inner_class == 'arf_6col') {
				outer_class = 'arf_6';
			} else {
				outer_class = 'arf_1';
			}
			let formfield    = This.getElementsByClassName( 'arfformfield' );
			let formfieldlen = formfield.length;
			if (formfieldlen > 0) {
				let formfieldobj = formfield[0];
				if (formfieldobj != null) {
					let attr_id = formfieldobj.id;
					if (attr_id != undefined) {
						let id             = attr_id.replace( 'arf_field_', '' );
						let ConfirmField   = This.getElementsByClassName( 'arf_confirm_field' );
						let isConfirmField = ConfirmField.length;
						if (isConfirmField == 1) {
							let field_id_confirm = id.replace( '_confirm', '' );
							let field_data       = arflite_retrieve_field_data( field_id_confirm );
							if (field_data !== null) {
								if (field_data.type == 'email') {
									field_data.confirm_email_inner_classes = inner_class;
									field_data.confirm_email_classes       = outer_class;
								}
								new_field_data = JSON.stringify( field_data );
								document.getElementById( 'arf_field_data_' + field_id_confirm ).value = new_field_data;
								jQuery('#arf_field_data_' + field_id_confirm).trigger('change');
							}
						} else {
							let field_data = arflite_retrieve_field_data( id );
							if (field_data !== null) {
								field_data.inner_class = inner_class;
								field_data.classes     = outer_class;
								new_field_data         = JSON.stringify( field_data );
								document.getElementById( 'arf_field_data_' + id ).value = new_field_data;
								jQuery('#arf_field_data_' + id).trigger('change');
							}
						}
					}
				}
			}
		}
	}
}

function arfliteheightdiv(type, field_id) {
	if (typeof type == 'undefined') {
		type = 'all';
	} else if (typeof type != 'undefined' && field_id == 'undefined') {
		type = 'all';
	}
	if (type == 'all') {
		var wrapper_length = document.getElementsByClassName( 'arf_inner_wrapper_sortable' ).length;
		for (var i = 0; i < wrapper_length; i++) {
			var wrapper            = document.getElementsByClassName( 'arf_inner_wrapper_sortable' )[i];
			var wrapper_obj        = jQuery( wrapper );
			var innerWrapperLength = wrapper.getElementsByClassName( 'sortable_inner_wrapper' ).length;
			var max_height         = 0;
			for (var x = 0; x < innerWrapperLength; x++) {
				var $this = wrapper.getElementsByClassName( 'sortable_inner_wrapper' )[x];
				jQuery( $this ).css( 'height', 'auto' );
				var currentElmHeight = jQuery( $this ).outerHeight();
				if (max_height == 0 || x == 0) {
					max_height = currentElmHeight;
				} else {
					if (max_height < currentElmHeight) {
						max_height = currentElmHeight;
					}
				}
			}
			wrapper_obj.find( '.sortable_inner_wrapper' ).css( 'height', max_height );
		}
	} else {
		if (type == 'individual') {
			var wrapper = jQuery( "#arfmainfieldid_" + field_id ).parents( '.arf_inner_wrapper_sortable' );
		} else if (type == 'outerWrapper') {
			var wrapper = jQuery( field_id ).parents( '.arf_inner_wrapper_sortable' );
		} else if (type == 'delete_field') {
			var wrapper = field_id;
		}
		if (wrapper[0] !== null && wrapper[0] !== undefined) {
			var innerWrapperLength = wrapper[0].getElementsByClassName( 'sortable_inner_wrapper' ).length;
			var max_height         = 0;
			for (var x = 0; x < innerWrapperLength; x++) {
				var $this = wrapper[0].getElementsByClassName( 'sortable_inner_wrapper' )[x];
				jQuery( $this ).css( 'height', 'auto' );
				var currentElmHeight = jQuery( $this ).outerHeight();
				if (max_height == 0 || x == 0) {
					max_height = currentElmHeight;
				} else {
					if (max_height < currentElmHeight) {
						max_height = currentElmHeight;
					}
				}
			}
			wrapper.find( '.sortable_inner_wrapper' ).css( 'height', max_height );
		}
	}
}

function arfliteInnerWrap(className, n) {
	if (typeof n == 'undefined') {
		n = 0;
	}
	if (typeof className == 'undefined' || className == null || '' == className) {
		className = 'arf_inner_wrapper_sortable';
	}
	var wrapper = document.getElementsByClassName( className )[n];

	return wrapper;

}

function arfliteSetDefaultColumnWidth(obj) {
	if (typeof obj == 'undefined' || obj == false) {
		let sortableInnerWrapper = document.querySelectorAll( '.sortable_inner_wrapper' );
		let totalInnerWrapper    = sortableInnerWrapper.length;
		for (let s = 0; s < totalInnerWrapper; s++) {
			let elm          = sortableInnerWrapper[s];
			let innerWrapper = arfliteClosest( elm, '.arf_inner_wrapper_sortable' );
			let ARF_ROW_WIDTH_MAIN;
			if (typeof innerWrapper != 'undefined') {
				ARF_ROW_WIDTH_MAIN = innerWrapper.offsetWidth;
			} else {
				ARF_ROW_WIDTH_MAIN = 447;
			}
			if (ARF_ROW_WIDTH_MAIN < 1) {
				ARF_ROW_WIDTH_MAIN = 447;
			}

			ARF_ROW_WIDTH_MAIN           = ARF_ROW_WIDTH_MAIN - 10;
			let data_percent_overlay_val = (100 * Number( elm.offsetWidth )) / Number( ARF_ROW_WIDTH_MAIN );

			elm.setAttribute( 'data-width', data_percent_overlay_val.toFixed( 3 ) );
			let arf_width_overlay        = elm.getElementsByClassName( 'arf_field_width_overlay' );
			let arf_width_overlay_length = arf_width_overlay.length;

			if (arf_width_overlay_length == 0) {
				if (Number( data_percent_overlay_val ) > 100) {
					data_percent_overlay_val = 100;
				}
				let arf_width_overlay_div       = document.createElement( 'div' );
				arf_width_overlay_div.className = 'arf_field_width_overlay';
				arf_width_overlay_div.setAttribute( 'data-side', 'left' );
				arf_width_overlay_div.innerHTML = data_percent_overlay_val.toFixed( 1 ) + '%';
				elm.appendChild( arf_width_overlay_div );
			}
		}
	} else {
		let get_row_element          = arfliteClosest( obj, '.arf_inner_wrapper_sortable' );
		let obj_inner_wrapper        = get_row_element.querySelectorAll( '.sortable_inner_wrapper' );
		let obj_inner_wrapper_length = obj_inner_wrapper.length;
		if (obj_inner_wrapper_length > 0) {
			for (let oi = 0; oi < obj_inner_wrapper_length; oi++) {
				let This               = obj_inner_wrapper[oi];
				This.style.width       = '';
				let ARF_ROW_WIDTH_MAIN = This.parentNode.offsetWidth;
				if (ARF_ROW_WIDTH_MAIN < 1) {
					ARF_ROW_WIDTH_MAIN = 447;
				}
				ARF_ROW_WIDTH_MAIN           = ARF_ROW_WIDTH_MAIN - 10;
				let data_percent_overlay_val = (((100 * (Number( This.offsetWidth ))) / ARF_ROW_WIDTH_MAIN));

				This.setAttribute( 'data-width', data_percent_overlay_val.toFixed( 3 ) );
				let elm     = This.getElementsByClassName( 'arf_field_width_overlay' );
				let elm_len = elm.length;
				if (elm_len == 0) {
					if (Number( data_percent_overlay_val ) > 100) {
						data_percent_overlay_val = 100;
					}
					let div       = document.createElement( 'div' );
					div.className = 'arf_field_width_overlay';
					div.setAttribute( 'data-side', 'left' );
					div.innerHTML = data_percent_overlay_val + '%';
					This.appendChild( div );
				}
			}
		}
	}
	arfliteinitialize_field_resize_width();
}

function arflite_initialize_resizable(obj) {

	var $sortable_cls = '.two_column_wrapper .sortable_inner_wrapper, .three_column_wrapper .sortable_inner_wrapper, .four_column_wrapper .sortable_inner_wrapper, .five_column_wrapper .sortable_inner_wrapper, .six_column_wrapper .sortable_inner_wrapper';
	if (obj == null || obj == undefined) {
		obj = jQuery( '.sortable_inner_wrapper' );
	} else {
		obj = obj.find( '.sortable_inner_wrapper' );
	}

	var current_resizing_row              = '';
	var current_resizing_elm              = '';
	var current_resizing_next_elm_obj     = '';
	var current_resizing_prev_elm_obj     = '';
	var default_substract_column_width    = '0';
	var chk_inside_which_condition        = '';
	var current_resizing_elm_data_width   = '';
	var current_resizing_elm_width        = '';
	var get_next_column_data_width        = '';
	var get_current_elm_max_allowed_width = '';
	var resize_curr_data_elem_diff        = '';
	var increased_data_width              = '';
	var curr_data_width_percentage        = '';
	var next_data_width_percentage        = '';
	var check_next_column_resizing_width  = '';
	var decreased_data_width              = '';
	var get_prev_column_data_width        = '';
	var get_inner_column_data_width       = '';
	var check_prev_column_resizing_width  = '';
	var curr_data_width                   = '';
	var curr_width                        = '';
	var ARF_COLUMN_MIN_WIDTH              = 15.000;
	var ARF_FIELD_ADJUST_WIDTH            = 1;
	var ARF_ROW_WIDTH                     = jQuery( ".arf_inner_wrapper_sortable" ).width();
	if (ARF_ROW_WIDTH < 1) {
		ARF_ROW_WIDTH = 447;
	}
	var get_min_percentage_from_row_width = ((ARF_ROW_WIDTH * ARF_COLUMN_MIN_WIDTH) / 100);
	if (get_min_percentage_from_row_width < 1) {
		get_min_percentage_from_row_width = 50;
	} else {
		get_min_percentage_from_row_width = (get_min_percentage_from_row_width + Number( ARF_FIELD_ADJUST_WIDTH )).toFixed( 0 );
	}
	var default_min_column_width = get_min_percentage_from_row_width;
	var arf_resize_handle        = 'e';
	obj.each(
		function() {
			if (typeof jQuery( this ).resizable( 'instance' ) != 'undefined') {
				jQuery( this ).resizable( 'destroy' );
			}
		}
	);
	obj.resizable({
		handles: arf_resize_handle,
		minWidth: get_min_percentage_from_row_width,
		classes: {
			"ui-resizable": "arf_highlight_resizable"
		},
		start: function(event, ui) {
			event.stopPropagation();
			var ARF_ROW_WIDTH_CHECK = jQuery( ui.element ).parents( ".arf_inner_wrapper_sortable" ).width();

			if (ARF_ROW_WIDTH_CHECK != ARF_ROW_WIDTH) {
				ARF_ROW_WIDTH = ARF_ROW_WIDTH_CHECK;
			}

			get_min_percentage_from_row_width = ((ARF_ROW_WIDTH * ARF_COLUMN_MIN_WIDTH) / 100) + Number( ARF_FIELD_ADJUST_WIDTH );

			default_min_column_width = get_min_percentage_from_row_width.toFixed( 0 );

			current_resizing_elm = ui.helper;

			current_resizing_elm_data_width = (jQuery( current_resizing_elm ).attr( 'data-width' ) - (default_substract_column_width));

			current_resizing_elm_data_width = ARFliteResizeConvertPercentToWidth( ARF_ROW_WIDTH, current_resizing_elm_data_width );

			current_resizing_row = ui.helper.parent().attr( 'data-id' );

			current_resizing_next_elm_obj = jQuery( current_resizing_elm ).next( '.sortable_inner_wrapper' );

			current_resizing_prev_elm_obj = jQuery( current_resizing_elm ).prev( '.sortable_inner_wrapper' );
		},
		resize: function(event, ui) {
			event.stopPropagation();
			chk_inside_which_condition = '';
			current_resizing_elm_width = jQuery( current_resizing_elm ).outerWidth();
			if (current_resizing_next_elm_obj.length) {

				get_next_column_data_width = current_resizing_next_elm_obj.attr( 'data-width' );

				get_next_column_data_width = ARFliteResizeConvertPercentToWidth( ARF_ROW_WIDTH, get_next_column_data_width );

				get_current_elm_max_allowed_width = (Number( get_next_column_data_width ) - Number( default_min_column_width )) + current_resizing_elm_data_width;
				if (current_resizing_elm_data_width > current_resizing_elm_width) {
					resize_curr_data_elem_diff = (Number( current_resizing_elm_data_width ) - Number( current_resizing_elm_width ));
					increased_data_width       = (Number( get_next_column_data_width ) + Number( resize_curr_data_elem_diff ));
					curr_data_width_percentage = (((100 * (Number( current_resizing_elm_width ))) / ARF_ROW_WIDTH));
					jQuery( current_resizing_elm ).css( 'width', curr_data_width_percentage.toFixed( 3 ) + '%' );
					jQuery( current_resizing_elm ).find( '.arf_field_width_overlay' ).html( curr_data_width_percentage.toFixed( 1 ) + '%' ).attr( 'data-side', 'right' ).css( 'display', 'block' );
					next_data_width_percentage = (((100 * (Number( increased_data_width ))) / ARF_ROW_WIDTH));
					current_resizing_next_elm_obj.css( 'width', next_data_width_percentage.toFixed( 3 ) + '%' );
					current_resizing_next_elm_obj.find( '.arf_field_width_overlay' ).attr( 'data-side', 'left' ).html( next_data_width_percentage.toFixed( 1 ) + '%' ).css( 'display', 'block' );
				} else {

					check_next_column_resizing_width = current_resizing_next_elm_obj.outerWidth();

					resize_curr_data_elem_diff = (Number( current_resizing_elm_width ) - Number( current_resizing_elm_data_width ));

					decreased_data_width = (Number( get_next_column_data_width ) - Number( resize_curr_data_elem_diff ));

					if (check_next_column_resizing_width <= (Number( default_min_column_width ))) {
						chk_inside_which_condition = 1;
						curr_data_width_percentage = ((100 * (Number( get_current_elm_max_allowed_width ))) / ARF_ROW_WIDTH);
						jQuery( current_resizing_elm ).css( 'width', curr_data_width_percentage.toFixed( 3 ) + '%' );
						jQuery( current_resizing_elm ).find( '.arf_field_width_overlay' ).html( curr_data_width_percentage.toFixed( 1 ) + '%' ).attr( 'data-side', 'right' ).css( 'display', 'block' );
						next_data_width_percentage = (((100 * (Number( default_min_column_width ))) / ARF_ROW_WIDTH));
						current_resizing_next_elm_obj.css( 'width', next_data_width_percentage.toFixed( 3 ) + '%' );
						current_resizing_next_elm_obj.find( '.arf_field_width_overlay' ).attr( 'data-side', 'left' ).html( next_data_width_percentage.toFixed( 1 ) + '%' ).css( 'display', 'block' );
					} else {
						curr_data_width_percentage = (((100 * (Number( current_resizing_elm_width ))) / ARF_ROW_WIDTH));
						jQuery( current_resizing_elm ).css( 'width', curr_data_width_percentage.toFixed( 3 ) + '%' );
						jQuery( current_resizing_elm ).find( '.arf_field_width_overlay' ).html( curr_data_width_percentage.toFixed( 1 ) + '%' ).attr( 'data-side', 'right' ).css( 'display', 'block' );
						next_data_width_percentage = (((100 * (Number( decreased_data_width ))) / ARF_ROW_WIDTH));
						current_resizing_next_elm_obj.css( 'width', next_data_width_percentage.toFixed( 3 ) + '%' );
						current_resizing_next_elm_obj.find( '.arf_field_width_overlay' ).html( next_data_width_percentage.toFixed( 1 ) + '%' ).attr( 'data-side', 'left' ).css( 'display', 'block' );
					}
				}
			} else if (current_resizing_prev_elm_obj.length) {
				get_prev_column_data_width        = current_resizing_prev_elm_obj.attr( 'data-width' );
				get_prev_column_data_width        = ARFliteResizeConvertPercentToWidth( ARF_ROW_WIDTH, get_prev_column_data_width );
				get_current_elm_max_allowed_width = (Number( get_prev_column_data_width ) - Number( default_min_column_width )) + current_resizing_elm_data_width;
				if (current_resizing_elm_data_width > current_resizing_elm_width) {
					resize_curr_data_elem_diff  = (Number( current_resizing_elm_data_width ) - Number( current_resizing_elm_width ));
					get_inner_column_data_width = current_resizing_prev_elm_obj.attr( 'data-width' );
					get_inner_column_data_width = ARFliteResizeConvertPercentToWidth( ARF_ROW_WIDTH, get_inner_column_data_width );
					increased_data_width        = (Number( get_inner_column_data_width ) + Number( resize_curr_data_elem_diff ));
					curr_data_width_percentage  = (((100 * (Number( current_resizing_elm_width ))) / ARF_ROW_WIDTH));
					jQuery( current_resizing_elm ).css( 'width', curr_data_width_percentage.toFixed( 3 ) + '%' );
					jQuery( current_resizing_elm ).find( '.arf_field_width_overlay' ).html( curr_data_width_percentage.toFixed( 1 ) + '%' ).attr( 'data-side', 'right' ).css( 'display', 'block' );
					next_data_width_percentage = (((100 * (Number( increased_data_width ))) / ARF_ROW_WIDTH));
					current_resizing_prev_elm_obj.css( 'width', next_data_width_percentage.toFixed( 3 ) + '%' );
					current_resizing_prev_elm_obj.find( '.arf_field_width_overlay' ).html( next_data_width_percentage.toFixed( 1 ) + '%' ).attr( 'data-side', 'left' ).css( 'display', 'block' );
				} else {
					check_prev_column_resizing_width = current_resizing_prev_elm_obj.outerWidth();
					resize_curr_data_elem_diff       = (Number( current_resizing_elm_width ) - Number( current_resizing_elm_data_width ));
					get_inner_column_data_width      = current_resizing_prev_elm_obj.attr( 'data-width' );
					get_inner_column_data_width      = ARFliteResizeConvertPercentToWidth( ARF_ROW_WIDTH, get_inner_column_data_width );
					decreased_data_width             = (Number( get_inner_column_data_width ) - Number( resize_curr_data_elem_diff ));
					if (check_prev_column_resizing_width <= (Number( default_min_column_width ))) {
						get_prev_column_data_width
						chk_inside_which_condition = 2;
						curr_data_width_percentage = (((100 * (Number( get_current_elm_max_allowed_width ))) / ARF_ROW_WIDTH));
						jQuery( current_resizing_elm ).css( 'width', curr_data_width_percentage.toFixed( 3 ) + '%' );
						jQuery( current_resizing_elm ).find( '.arf_field_width_overlay' ).html( curr_data_width_percentage.toFixed( 1 ) + '%' ).attr( 'data-side', 'right' ).css( 'display', 'block' );
						next_data_width_percentage = (((100 * (Number( default_min_column_width ))) / ARF_ROW_WIDTH));
						current_resizing_prev_elm_obj.css( 'width', next_data_width_percentage.toFixed( 3 ) + '%' );
						current_resizing_prev_elm_obj.find( '.arf_field_width_overlay' ).html( next_data_width_percentage.toFixed( 1 ) + '%' ).attr( 'data-side', 'left' ).css( 'display', 'block' );
					} else {
						current_resizing_prev_elm_obj.css( 'width', decreased_data_width );
						curr_data_width_percentage = (((100 * (Number( current_resizing_elm_width ))) / ARF_ROW_WIDTH));
						jQuery( current_resizing_elm ).css( 'width', curr_data_width_percentage.toFixed( 3 ) + '%' );
						jQuery( current_resizing_elm ).find( '.arf_field_width_overlay' ).html( curr_data_width_percentage.toFixed( 1 ) + '%' ).attr( 'data-side', 'right' ).css( 'display', 'block' );
						next_data_width_percentage = (((100 * (Number( decreased_data_width ))) / ARF_ROW_WIDTH));
						current_resizing_prev_elm_obj.css( 'width', next_data_width_percentage.toFixed( 3 ) + '%' );
						current_resizing_prev_elm_obj.find( '.arf_field_width_overlay' ).html( next_data_width_percentage.toFixed( 1 ) + '%' ).attr( 'data-side', 'left' ).css( 'display', 'block' );
					}
				}
			} else {
				jQuery( current_resizing_elm ).css( 'width', '100%' );
				jQuery( current_resizing_elm ).find( '.arf_field_width_overlay' ).html( '100%' ).attr( 'data-side', 'right' ).css( 'display', 'block' );
			}
		},
		stop: function(event, ui) {
			event.stopPropagation();
			curr_data_width = jQuery( current_resizing_elm ).attr( 'data-width' );
			curr_data_width = ARFliteResizeConvertPercentToWidth( ARF_ROW_WIDTH, curr_data_width );

			jQuery( '[data-id="' + current_resizing_row + '"]' ).find( '.sortable_inner_wrapper' ).each(
				function() {
					var get_inner_column_data_width      = jQuery( this ).width();
					var get_inner_column_outer_width     = jQuery( this ).outerWidth();
					var get_inner_column_attr_data_width = jQuery( this ).attr( 'data-width' );
					var curr_data_width_percentage       = (((100 * (Number( get_inner_column_outer_width ))) / ARF_ROW_WIDTH));

					if (curr_data_width_percentage < ARF_COLUMN_MIN_WIDTH) {
						if (current_resizing_next_elm_obj.length) {
							var check_prev_data           = current_resizing_next_elm_obj.prev();
							var check_prev_datadata_width = check_prev_data.attr( 'data-width' );
							if (check_prev_data.length > 0) {
								if (Number( get_inner_column_attr_data_width ) >= Number( ARF_COLUMN_MIN_WIDTH )) {
									check_prev_data.css( 'width', (Number( check_prev_datadata_width ) + (Number( get_inner_column_attr_data_width ) - Number( ARF_COLUMN_MIN_WIDTH ))).toFixed( 3 ) + '%' );
								} else {
									check_prev_data.css( 'width', (Number( check_prev_datadata_width ) + (Number( ARF_COLUMN_MIN_WIDTH ) - Number( get_inner_column_attr_data_width ))).toFixed( 3 ) + '%' );
								}
							} else {
								check_prev_data           = current_resizing_next_elm_obj.next();
								check_prev_datadata_width = check_prev_data.attr( 'data-width' );
								if (Number( get_inner_column_attr_data_width ) >= Number( ARF_COLUMN_MIN_WIDTH )) {
									check_prev_data.css( 'width', (Number( check_prev_datadata_width ) + (Number( get_inner_column_attr_data_width ) - Number( ARF_COLUMN_MIN_WIDTH ))).toFixed( 3 ) + '%' );
								} else {
									check_prev_data.css( 'width', (Number( check_prev_datadata_width ) + (Number( ARF_COLUMN_MIN_WIDTH ) - Number( get_inner_column_attr_data_width ))).toFixed( 3 ) + '%' );
								}
							}
						}
						curr_data_width_percentage = Number( ARF_COLUMN_MIN_WIDTH );
						jQuery( this ).css( 'width', curr_data_width_percentage.toFixed( 3 ) + '%' );
					}
				}
			);

			jQuery( '[data-id="' + current_resizing_row + '"]' ).find( '.sortable_inner_wrapper' ).each(
				function() {
					get_inner_column_data_width = jQuery( this ).width();

					var ARF_ROW_WIDTH_CHECK2 = jQuery( this ).parents( '.arf_inner_wrapper_sortable' ).width();

					if (ARF_ROW_WIDTH_CHECK2 != ARF_ROW_WIDTH) {
						ARF_ROW_WIDTH = ARF_ROW_WIDTH_CHECK2;
					}

					var get_inner_column_outer_width = jQuery( this ).outerWidth();

					curr_data_width_percentage = (((100 * (Number( get_inner_column_outer_width ))) / ARF_ROW_WIDTH));

					jQuery( this ).attr( 'data-width', curr_data_width_percentage.toFixed( 3 ) );

					jQuery( this ).css( 'width', curr_data_width_percentage.toFixed( 3 ) + '%' );
				}
			);
			if (jQuery( ui.element ).attr( 'id' ) != null) {
				var field_id = jQuery( ui.element ).attr( 'id' ).replace( 'arfmainfieldid_', '' );
				arfliteheightdiv( 'individual', field_id );
			} else {
				arfliteheightdiv( 'outerWrapper', ui.element );
			}
			jQuery( ".arf_field_width_overlay" ).fadeOut( 'fast' );
			arfliteinitialize_field_resize_width();
			arforms_sortable_obj.arforms_init_sortable();
		}
	});
}

function ARFliteResizeConvertPercentToWidth(row_px_width, column_percent_width) {
	return ((row_px_width * (Number( column_percent_width ))) / 100);
}

function arflitegetcolumnhtmlfunction(parent_html, child_ele, enable_parent) {
	var element        = '';
	var element_length = parent_html.find( '.sortable_inner_wrapper:nth-child(' + child_ele + ')' ).find( '.arfformfield' ).length;
	if (element_length > 0) {
		element = parent_html.find( '.sortable_inner_wrapper:nth-child(' + child_ele + ')' ).prop( 'outerHTML' );
		if (enable_parent == 1) {
			element = arflite_replace_common_html( element );
		}
	}
	return element;
}

function arflitegetnewrowfunction(element_html, parent_html) {
	jQuery( element_html ).insertAfter( parent_html );
	var attr_id                = jQuery( element_html ).find( '.sortable_inner_wrapper' ).attr( 'id' );
	var arf_field_elem_attr_id = attr_id.replace( 'arfmainfieldid_', '' );
	jQuery( '#' + attr_id ).attr( 'inner_class', 'arf_1col' );
	jQuery( '#' + attr_id ).css( 'width', '100%' );
	jQuery( '#' + attr_id ).attr( 'data-width', '100.00' );
	var field_data = arflite_retrieve_field_data( arf_field_elem_attr_id );
	if (field_data != null && field_data != undefined) {
		field_data.classes     = 'arf_1';
		field_data.inner_class = 'arf_1col';
		var new_field_data     = JSON.stringify( field_data );
		jQuery( "#arf_field_data_" + arf_field_elem_attr_id ).val( new_field_data );
		arflite_initialize_control( arf_field_elem_attr_id );
	}
	return arf_field_elem_attr_id;
}
jQuery( document ).on(
	'click',
	'.arf_hide_form_element_wrapper',
	function() {
		if (jQuery( '.arf_hide_form_element_wrapper' ).hasClass( 'arf_hide_arrow_button_out' )) {
			var element_wrap_width = jQuery( '.arf_form_element_wrapper' ).css( 'width' );
			jQuery( '.arf_form_element_wrapper' ).addClass( 'remove_move_left_easing' );
			jQuery( '.arf_editor_header_form_width' ).removeClass( 'arf_title_editor_width_on_hide' );
			jQuery( '.arf_editor_header_form_title' ).removeClass( 'arf_title_editor_on_hide' ).addClass( 'arf_move_left_after_reset' );
			jQuery( '.arf_form_editor_content' ).removeClass( 'arf_editor_on_hide' ).addClass( 'arf_editor_after_hide' );
			if (jQuery( 'body' ).hasClass( 'rtl' )) {
				jQuery( '.arf_form_element_wrapper' ).css(
					{
						'margin-right': '0'
					},
					1000
				);
			} else {
				jQuery( '.arf_form_element_wrapper' ).css(
					{
						'margin-left': '0'
					},
					1000
				);
			}
			setTimeout(
				function() {
					jQuery( '.arf_form_editor_content' ).removeClass( 'arf_editor_after_hide' );
					if (arfwpversion <= '4.0.3') {
						jQuery( '#adminmenuwrap' ).removeAttr( 'style' );
					}
					arflite_initialize_resizable();
					arfliteheightdiv();
				},
				1000
			);
			jQuery( this ).removeClass( 'arf_hide_arrow_button_out' );
			jQuery( this ).addClass( 'arf_hide_arrow_button_in' );
			jQuery( '.arf_form_element_resize' ).show();
		} else {
			var element_wrap_width = jQuery( '.arf_form_element_wrapper' ).css( 'width' );
			if (arfwpversion <= '3.8') {
				element_wrap_width = element_wrap_width.replace( /\D/g, '' );
				element_wrap_width = (element_wrap_width - 2) + 'px';
			}
			if (arfwpversion <= '4.0.3') {
				jQuery( '#adminmenuwrap' ).css( 'z-index', '9999' );
			}
			jQuery( '.arf_form_element_wrapper' ).addClass( 'remove_move_left_easing' );
			jQuery( '.arf_editor_header_form_width' ).addClass( 'arf_title_editor_width_on_hide' );
			jQuery( '.arf_editor_header_form_title' ).addClass( 'arf_title_editor_on_hide' );
			jQuery( '.arf_form_editor_content' ).addClass( 'arf_editor_on_hide' );
			if (jQuery( 'body' ).hasClass( 'rtl' )) {
				jQuery( '.arf_form_element_wrapper' ).css(
					{
						'margin-right': '-' + element_wrap_width
					},
					1000
				);
			} else {
				jQuery( '.arf_form_element_wrapper' ).css(
					{
						'margin-left': '-' + element_wrap_width
					},
					1000
				);
			}
			jQuery( this ).removeClass( 'arf_hide_arrow_button_in' );
			jQuery( this ).addClass( 'arf_hide_arrow_button_out' );
			jQuery( '.arf_form_element_resize' ).hide();
			setTimeout(
				function() {
					arflite_initialize_resizable();
					arfliteheightdiv();
				},
				1000
			);
		}
	}
);
jQuery( document ).ready(
	function() {
		if (jQuery( '.arf_form_element_wrapper' ).length > 0) {
			var arfwpversion = jQuery( '#arfmainformversion' ).val();
			var elem_width   = jQuery( '.arf_form_element_wrapper' ).css( 'width' );
			elem_width       = elem_width.replace( /\D/g, '' );
			if (arfwpversion <= '3.8') {
				elem_width = elem_width - 2;
			}
			jQuery( '.arf_form_element_wrapper' ).resizable(
				{
					maxWidth: elem_width,
					minWidth: 229,
					handles: {
						'e': '.arf_form_element_resize'
					},
					resize: function(event, ui) {},
					stop: function(event, ui) {}
				}
			);
		}
		if (jQuery( '.arf_export_form_editor_note' ).length > 0) {
			var content = __ARF_EXPORT_FORM_NOTE || 'To export this form, first you need to save it.';
			jQuery( '.arf_export_form_editor_note' ).tipso(
				{
					position: 'bottom',
					width: 'auto',
					useTitle: false,
					background: '#444444',
					color: '#ffffff',
					content: content
				}
			);
		}

		if (jQuery( '#arf_mail_notification_model' ).length > 0) {
			if (typeof wp.editor != 'undefined') {
				var configObj = {
					tinymce: false,
					quicktags: {
						buttons: 'strong,em,link,block,del,ins,img,ul,ol,li,code,more,close'
					}
				};

				wp.editor.initialize( 'ar_email_message', configObj );

				wp.editor.initialize( 'ar_admin_email_message', configObj );
			}
		}

	}
);
(function($, undefined) {
	$.fn.getCursorPosition = function() {
		var el  = $( this ).get( 0 );
		var pos = 0;
		if ('selectionStart' in el) {
			pos = el.selectionStart;
		} else if ('selection' in document) {
			el.focus();
			var Sel       = document.selection.createRange();
			var SelLength = document.selection.createRange().text.length;
			Sel.moveStart( 'character', -el.value.length );
			pos = Sel.text.length - SelLength;
		}
		return pos;
	}
})( jQuery );
jQuery( document ).on(
	'click',
	'#arf_add_new_hidden_field,.arf_hidden_field_add',
	function() {
		var html    = "";
		var counter = jQuery( ".arf_hidden_fields_input_wrapper" ).find( 'div.arf_hidden_field_input_container' ).length;
		if (counter == 0) {
			counter = 1;
		} else {
			counter += 1;
		}
		var field_id                           = arforms_sortable_obj.arforms_generate_form_field_id();
		var field_data                         = {};
		field_data.type                        = "hidden";
		field_data.name                        = __ARF_UNTITLED_TEXT;
		field_data.default_value               = "";
		field_data.classes                     = "arf_1";
		field_data.inner_class                 = "arf_1col";
		var outer_wrapper                      = document.createElement( "div" );
		outer_wrapper.className                = "arf_hidden_field_input_container";
		outer_wrapper.id                       = "arf_hidden_field_input_container_" + counter;
		var arf_hidden_field_input_label       = document.createElement( 'label' );
		arf_hidden_field_input_label.className = 'arf_hidden_field_input_label';
		arf_hidden_field_input_label.setAttribute( 'for', 'arf_hidden_field_input_' + counter );
		outer_wrapper.appendChild( arf_hidden_field_input_label );
		var arf_hidden_field_input_label_input       = document.createElement( 'input' );
		arf_hidden_field_input_label_input.type      = 'text';
		arf_hidden_field_input_label_input.id        = 'arf_hidden_field_input_label_' + counter;
		arf_hidden_field_input_label_input.className = 'arf_large_input_box arf_hidden_field_label_input';
		arf_hidden_field_input_label_input.value     = __ARF_UNTITLED_TEXT;
		arf_hidden_field_input_label_input.setAttribute( 'data-field-id', field_id );
		arf_hidden_field_input_label.appendChild( arf_hidden_field_input_label_input );
		var arf_hidden_field_input       = document.createElement( 'input' );
		arf_hidden_field_input.type      = 'text';
		arf_hidden_field_input.name      = 'item_meta[' + field_id + ']';
		arf_hidden_field_input.id        = 'arf_hidden_field_input_' + counter;
		arf_hidden_field_input.className = 'arf_large_input_box';
		outer_wrapper.appendChild( arf_hidden_field_input );
		var arf_field_data_input   = document.createElement( 'input' );
		arf_field_data_input.type  = 'hidden';
		arf_field_data_input.name  = 'arf_field_data_' + field_id;
		arf_field_data_input.id    = 'arf_field_data_' + field_id;
		arf_field_data_input.value = JSON.stringify( field_data );
		arf_field_data_input.setAttribute( 'data-field-option', '[]' );
		outer_wrapper.appendChild( arf_field_data_input );
		var arf_hidden_field_bulk_add_remove       = document.createElement( "div" );
		arf_hidden_field_bulk_add_remove.className = "arf_hidden_field_input_action_button";
		outer_wrapper.appendChild( arf_hidden_field_bulk_add_remove );
		var arf_hidden_field_bulk_add       = document.createElement( "span" );
		arf_hidden_field_bulk_add.className = "arf_hidden_field_add";
		arf_hidden_field_bulk_add_remove.appendChild( arf_hidden_field_bulk_add );
		var xmlns   = "http://www.w3.org/2000/svg";
		var add_svg = document.createElementNS( xmlns, "svg" );
		add_svg.setAttributeNS( null, 'viewBox', '0 -4 32 32' );
		var add_svg_path = document.createElementNS( xmlns, "path" );
		add_svg_path.setAttributeNS( null, 'd', 'M11.134,20.362c-5.521,0-9.996-4.476-9.996-9.996c0-5.521,4.476-9.997,9.996-9.997s9.996,4.476,9.996,9.997C21.13,15.887,16.654,20.362,11.134,20.362z M11.133,2.314c-4.446,0-8.051,3.604-8.051,8.051c0,4.447,3.604,8.052,8.051,8.052s8.052-3.604,8.052-8.052C19.185,5.919,15.579,2.314,11.133,2.314z M12.146,14.341h-2v-3h-3v-2h3V6.372h2v2.969h3v2h-3V14.341z' );
		add_svg_path.setAttributeNS( null, 'fill', '#3f74e7' );
		add_svg_path.setAttributeNS( null, 'fill-rule', 'evenodd' );
		add_svg_path.setAttributeNS( null, 'clip-rule', 'evenodd' );
		add_svg.appendChild( add_svg_path );
		arf_hidden_field_bulk_add.appendChild( add_svg );
		var arf_hidden_field_bulk_remove       = document.createElement( "span" );
		arf_hidden_field_bulk_remove.className = "arf_hidden_field_remove";
		arf_hidden_field_bulk_remove.setAttribute( 'data-id', counter );
		arf_hidden_field_bulk_add_remove.appendChild( arf_hidden_field_bulk_remove );
		var minus_svg = document.createElementNS( xmlns, "svg" );
		minus_svg.setAttributeNS( null, 'viewBox', '0 -4 32 32' );
		var minus_svg_path = document.createElementNS( xmlns, "path" );
		minus_svg_path.setAttributeNS( null, 'd', 'M11.12,20.389c-5.521,0-9.996-4.476-9.996-9.996c0-5.521,4.476-9.997,9.996-9.997s9.996,4.476,9.996,9.997C21.116,15.913,16.64,20.389,11.12,20.389z M11.119,2.341c-4.446,0-8.051,3.604-8.051,8.051c0,4.447,3.604,8.052,8.051,8.052s8.052-3.604,8.052-8.052C19.17,5.945,15.565,2.341,11.119,2.341z M12.131,11.367h3v-2h-3h-2h-3v2h3H12.131z' );
		minus_svg_path.setAttributeNS( null, 'fill', '#3f74e7' );
		minus_svg_path.setAttributeNS( null, 'fill-rule', 'evenodd' );
		minus_svg_path.setAttributeNS( null, 'clip-rule', 'evenodd' );
		minus_svg.appendChild( minus_svg_path );
		arf_hidden_field_bulk_remove.appendChild( minus_svg );
		document.getElementsByClassName( 'arf_hidden_fields_input_wrapper' )[0].appendChild( outer_wrapper );
		jQuery( "#arf_add_new_hidden_field" ).hide();
		jQuery( ".arf_hidden_field_input_wrapper_header" ).addClass( 'arfactive' );
	}
);
jQuery( document ).on(
	'click',
	'.arf_hidden_field_remove',
	function() {
		var rowid    = jQuery( this ).attr( 'data-id' );
		var field_id = jQuery( "#arf_hidden_field_input_container_" + rowid ).find( '.arf_hidden_field_label_input' ).attr( 'data-field-id' );
		var f_id     = field_id;
		jQuery( "#arf_hidden_field_input_container_" + rowid ).remove();
		var counter = jQuery( ".arf_hidden_field_input_container" ).length;
		if (counter == 0) {
			jQuery( "#arf_add_new_hidden_field" ).show();
			jQuery( ".arf_hidden_field_input_wrapper_header" ).removeClass( 'arfactive' );
		}
		arflite_delete_name_dropdown( field_id, f_id );
		arflite_delete_submit_action_field( field_id, f_id );
	}
);
jQuery( document ).on(
	'change',
	'.arf_hidden_field_label_input',
	function() {
		var field_id   = jQuery( this ).attr( 'data-field-id' );
		var value      = jQuery( this ).val();
		var field_data = arflite_retrieve_field_data( field_id );
		var nfields    = field_data;
		nfields.name   = value;
		jQuery( "#arf_field_data_" + field_id ).val( JSON.stringify( nfields ) );
		arflite_update_name_dropdown( field_id, 'hidden', value );
	}
);
jQuery( document ).on(
	'change',
	'.arf_pre_dup_check_type_object',
	function() {
		var value = jQuery( this ).val();
		if (value == 'fields') {
			jQuery( "#select_ar_prevent_duplicate_field" ).show();
		} else {
			jQuery( "#select_ar_prevent_duplicate_field" ).hide();
		}
	}
);
jQuery( document ).on(
	'click',
	'.arf_field_cancel_button',
	function() {
		var attr_id = jQuery( this ).attr( 'data-field-id' );
		if (jQuery( this ).hasClass( 'arf_new_preset_cancel_button' )) {
			jQuery( '.arf_preset_field_content_wrapper_' + attr_id ).css( 'display', 'none' );
		} else {
			jQuery( '#arfshowfieldbulkoptions-' + attr_id ).css( 'display', 'none' );
		}
	}
);
jQuery( document ).on(
	'change',
	'.arf_disable_enable_optins',
	function() {
		var selected_optins = jQuery( this ).attr( 'data-attr' );
		var optin_id        = jQuery( this ).attr( 'id' );
		if (jQuery( '#' + optin_id ).is( ':checked' )) {
			jQuery( '.' + selected_optins + '_original' ).css( 'display', 'block' );
			jQuery( '.' + selected_optins + '_gray' ).css( 'display', 'none' );
			jQuery( '.' + selected_optins + '_configuration_wrapper' ).removeClass( 'arf_not_allowd_optins' );
			jQuery( '.' + selected_optins + '_configuration_wrapper' ).find( 'dt' ).removeClass( 'arf_disabled_container' );
			jQuery( '.' + selected_optins + '_configuration_wrapper' ).find( 'dl' ).removeClass( 'arf_not_allowd_optins' );
			jQuery( '.' + selected_optins + '_configuration_wrapper' ).find( '.arf_js_switch_wrapper' ).removeClass( 'arf_disable_switch' );
			jQuery( '.' + selected_optins + '_configuration_wrapper' ).find( 'textarea' ).removeAttr( 'readonly' );
		} else {
			jQuery( '.' + selected_optins + '_original' ).css( 'display', 'none' );
			jQuery( '.' + selected_optins + '_gray' ).css( 'display', 'block' );
			jQuery( '.' + selected_optins + '_configuration_wrapper' ).addClass( 'arf_not_allowd_optins' );
			jQuery( '.' + selected_optins + '_configuration_wrapper' ).find( 'dt' ).addClass( 'arf_disabled_container' );
			jQuery( '.' + selected_optins + '_configuration_wrapper' ).find( 'dl' ).addClass( 'arf_not_allowd_optins' );
			jQuery( '.' + selected_optins + '_configuration_wrapper' ).find( '.arf_js_switch_wrapper' ).addClass( 'arf_disable_switch' );
			jQuery( '.' + selected_optins + '_configuration_wrapper' ).find( 'textarea' ).attr( 'readonly', true );;
		}
	}
);

function arflite_validate_popup_data(popup_id) {
	var error = 0;
	switch (popup_id) {
		case 'arf_mail_notification_popup_button':
			if (jQuery( "#auto_responder" ).is( ':checked' ) && jQuery( "#ar_email_message" ).val() == '') {
				jQuery( '#ar_email_message' ).addClass( 'arf_error_border_to_editor' );
				jQuery( '#ar_email_message_error' ).css( 'display', 'block' );
				jQuery( "#ar_email_message" ).focus();
				error++;
			} else {
				jQuery( "#ar_email_message" ).removeClass( 'arf_error_border_to_editor' );
				jQuery( "#ar_email_message_error" ).css( 'display', 'none' );
			}
			if (jQuery( '#chk_admin_notification' ).is( ':checked' ) && jQuery( '#ar_admin_email_message' ).val() == '') {
				jQuery( '#ar_admin_email_message' ).addClass( 'arf_error_border_to_editor' );
				jQuery( '#ar_admin_email_message_error' ).css( 'display', 'block' );
				jQuery( '#ar_admin_email_message' ).focus();
				error++;
			} else {
				jQuery( '#ar_admin_email_message' ).removeClass( 'arf_error_border_to_editor' );
				jQuery( '#ar_admin_email_message_error' ).css( 'display', 'none' );
			}
			break;
		case 'arf_submit_popup_button':
			if (jQuery( "#success_action_message" ).is( ':checked' ) && jQuery( '#success_msg' ).val() == '') {
				jQuery( '#success_msg' ).addClass( 'arf_error_border' );
				jQuery( '#success_msg_error' ).css( 'display', 'block' );
				jQuery( '#success_msg' ).focus();
				error++;
			} else {
				jQuery( '#success_msg' ).removeClass( 'arf_error_border' );
				jQuery( '#success_msg_error' ).css( 'display', 'none' );
			}
			if (jQuery( "#success_action_redirect" ).is( ':checked' )) {
				if (jQuery( '#success_url' ).val() == '') {
					jQuery( '#success_url' ).addClass( 'arf_error_border' );
					jQuery( '#success_url_error' ).css( 'display', 'block' );
					error++;
				} else {
					jQuery( '#success_url' ).removeClass( 'arf_error_border' );
					jQuery( '#success_url_error' ).css( 'display', 'none' );
				}
			} else {
				jQuery( '#success_url' ).removeClass( 'arf_error_border' );
				jQuery( '#success_url_error' ).css( 'display', 'none' );
			}
			if (jQuery( '#success_action_page' ).is( ':checked' ) && jQuery( '#option_success_page_id_arf_wp_pages' ).val() == '') {
				jQuery( '.arf_selectbox[data-id="option_success_page_id_arf_wp_pages"]' ).addClass( 'arf_error_border' );
				jQuery( '.field_dropdown_menu_pages[data-id="option_success_page_id_arf_wp_pages"]' ).addClass( 'arf_error_border' );
				jQuery( '.frm-pages-dropdown .arfdropdown-menu.open' ).addClass( 'arf_error_border' );
				jQuery( '#option_success_page_id_error' ).css( 'display', 'block' );
				jQuery( '#option_success_page_id_arf_wp_pages' ).focus();
				error++;
			} else {
				jQuery( '.arf_selectbox[data-id="option_success_page_id_arf_wp_pages"]' ).removeClass( 'arf_error_border' );
				jQuery( '.field_dropdown_menu_pages[data-id="option_success_page_id_arf_wp_pages"]' ).removeClass( 'arf_error_border' );
				jQuery( '#option_success_page_id_error' ).css( 'display', 'none' );
			}
			if (jQuery( "#arf_show_post_value" ).is( ':checked' ) && jQuery( '#arf_post_value_url' ).val() == '') {
				jQuery( '#arf_post_value_url' ).addClass( 'arf_error_border' );
				jQuery( '#arf_post_value_url_error' ).css( 'display', 'block' );
				jQuery( '#arf_post_value_url' ).focus();
				error++;
			} else {
				jQuery( '#arf_post_value_url' ).removeClass( 'arf_error_border' );
				jQuery( '#arf_post_value_url_error' ).css( 'display', 'none' );
			}
			break;
	}
	window.arf_popup_data_error = error;
	wp.hooks.doAction( 'arflite_validate_popup_data_outside' );
	error = window.arf_popup_data_error;
	if (error > 0) {
		return false;
	} else {
		return true;
	}
}

jQuery( document ).on(
	'change',
	'input[name="image_position_from"]',
	function() {
		if (jQuery( this ).is( ':checked' )) {
			var form_id       = jQuery( "#id" ).val();
			var value         = jQuery( this ).val();
			var id            = jQuery( this ).attr( 'id' );
			var field_id      = id.replace( 'arfimage_position_', '' );
			field_id          = field_id.replace( '_' + value, '' );
			var left_control  = jQuery( "#arfimage_left_" + field_id );
			var top_control   = jQuery( "#arfimage_top_" + field_id );
			var form_width    = jQuery( "#arf_fieldset_" + form_id ).outerWidth();
			var form_height   = jQuery( "#arf_fieldset_" + form_id ).outerHeight();
			var helper        = jQuery( "#arf_imagefield_" + field_id );
			var helper_left   = helper.offset().left;
			var helper_top    = helper.offset().top;
			var helper_width  = helper.width();
			var helper_height = helper.height();
			var form_top      = jQuery( "#arf_fieldset_" + form_id ).offset().top;
			var form_left     = jQuery( "#arf_fieldset_" + form_id ).offset().left;
			var pos_left      = helper.offset().left - form_left;
			var pos_top       = helper.offset().top - form_top;
			var pos_right     = (form_width - (helper_left - form_left) - helper_width);
			var pos_bottom    = (form_height - ((helper_top - form_top) + helper_height));
			switch (value) {
				case 'top_left':
					left_control.val( pos_left + 'px' );
					top_control.val( pos_top + 'px' );
					break;
				case 'top_right':
					left_control.val( pos_right + 'px' );
					top_control.val( pos_top + 'px' );
					break;
				case 'bottom_left':
					left_control.val( pos_left + 'px' );
					top_control.val( pos_bottom + 'px' );
					break;
				case 'bottom_right':
					left_control.val( pos_right + 'px' );
					top_control.val( pos_bottom + 'px' );
					break;
				default:
					left_control.val( pos_left + 'px' );
					top_control.val( pos_top + 'px' );
					break;
			}
		}
	}
);

function arflite_replace_old_id_to_new(string, old_id, new_id, old_key, new_key) {
	if (string == '' || old_id == '' || new_id == '') {
		return string;
	}
	var old_key_regex     = new RegExp( "(" + old_key + ")", "g" );
	var regexjs           = /(javascript\:(.*?)\")/g;
	var m                 = string.match( regexjs );
	var required_pattern  = /(arflitemakerequiredfieldfunction)/g;
	var field_opt_pattern = /(arfliteshowfieldoptions)/g;
	var duplicate_pattern = /(arfliteduplicatefield)/g;
	var delete_pattern    = new RegExp( "(arflitechangedeletemodalwidth\\(\\'(arfdeletemodabox)\\'\\,\\s\\'(" + old_id + ")\\'\\))", "g" );
	if (delete_pattern.test( string )) {
		string = string.replace( delete_pattern, "arflitechangedeletemodalwidth('arfdeletemodabox', '" + new_id + "')" );
	}
	var delete_pattern2 = new RegExp( "(arflitechangedeletemodalwidth\\(\\'(arfdeletemodabox)\\'\\,\\s(" + old_id + ")\\))", "g" );
	if (delete_pattern2.test( string )) {
		string = string.replace( delete_pattern2, "arflitechangedeletemodalwidth('arfdeletemodabox', " + new_id + ")" );
	}
	var req_pattern_extnd        = new RegExp( "(arflitemakerequiredfieldfunction\\((" + old_id + ")\\,(0|1|2)\\,\\'(.*?)\\'\\))", "g" );
	var req_pattern_extnd2       = new RegExp( "(arflitemakerequiredfieldfunction\\((" + old_id + ")\\,(0|1|2)\\,\\s\\'(.*?)\\'\\))", "g" );
	var req_pattern_extnd3       = new RegExp( "(arflitemakerequiredfieldfunction\\((" + old_id + ")\\,(0|1|2)\\,(.*?)\\))", "g" );
	var req_pattern_extnd4       = new RegExp( "(arflitemakerequiredfieldfunction\\((" + old_id + ")\\,(0|1|2)\\,\\s(.*?)\\))", "g" );
	var field_opt_pattern_extnd  = new RegExp( "(arfliteshowfieldoptions\\(\\'(" + old_id + ")\\'\\,\\'(.*?)\\'\\))", "g" );
	var field_opt_pattern_extnd2 = new RegExp( "(arfliteshowfieldoptions\\((" + old_id + ")\\,\\'(.*?)\\'\\))", "g" );
	var duplicate_pattern_extnd  = new RegExp( "(arfliteduplicatefield\\(\\'(.*?)\\'\\,\\'(.*?)\\',\\'(" + old_id + ")\\',\\'(" + old_id + ")\\'\\))" );
	var duplicate_pattern_extnd2 = new RegExp( "(arfliteduplicatefield\\((.*?)\\,\\'(.*?)\\',(" + old_id + "),(" + old_id + ")\\))" );
	if (typeof m != 'undefined' && m != null && m.length > 0) {
		for (var x = 0; x < m.length; x++) {
			var func     = m[x].replace( regexjs, '$2' );
			var old_func = func = func.trim();
			if (required_pattern.test( func )) {
				if (req_pattern_extnd.test( func )) {
					func = func.replace( req_pattern_extnd, 'arflitemakerequiredfieldfunction(' + new_id + ',$3,\'$4\')' );
				}
				if (req_pattern_extnd3.test( func )) {
					func = func.replace( req_pattern_extnd3, 'arflitemakerequiredfieldfunction(' + new_id + ',$3,$4)' );
				}
				if (req_pattern_extnd4.test( func )) {
					func = func.replace( req_pattern_extnd4, 'arflitemakerequiredfieldfunction(' + new_id + ',$3, $4)' );
				}
			} else if (field_opt_pattern.test( func )) {
				if (field_opt_pattern_extnd.test( func )) {
					func = func.replace( field_opt_pattern_extnd, "arfliteshowfieldoptions('" + new_id + "','$3')" );
				}
				if (field_opt_pattern_extnd2.test( func )) {
					func = func.replace( field_opt_pattern_extnd2, "arfliteshowfieldoptions(" + new_id + ",'$3')" );
				}
			} else if (duplicate_pattern.test( func )) {
				if (duplicate_pattern_extnd.test( func )) {
					func = func.replace( duplicate_pattern_extnd, "arfliteduplicatefield('$2','$3','" + new_id + "','" + new_id + "')" );
				}
				if (duplicate_pattern_extnd2.test( func )) {
					func = func.replace( duplicate_pattern_extnd2, "arfliteduplicatefield($2,'$3'," + new_id + "," + new_id + ")" );
				}
			} else {
				if (func.indexOf( 'arflitemakerequiredfieldfunction' ) > -1) {
					if (req_pattern_extnd2.test( func )) {
						func = func.replace( req_pattern_extnd2, 'arflitemakerequiredfieldfunction(' + new_id + ',$3, \'$4\')' );
					}
				}
			}
			string = string.replace( old_func, func );
		}
	}
	var regex     = new RegExp( "(_" + old_id + "([^a-z\"]))", 'gi' );
	var newstring = string.replace( regex, "_" + new_id + "$2" );
	var regex2    = new RegExp( "(_" + old_id + "\")", "gi" );
	newstring     = newstring.replace( regex2, "_" + new_id + "\"" );
	var regex5    = new RegExp( "([\\(]\'" + old_id + "\')", 'g' );
	newstring     = newstring.replace( regex5, "(\'" + new_id + "\'" );
	var regex6    = new RegExp( "(\"" + old_id + "\")", 'g' );
	newstring     = newstring.replace( regex6, "\"" + new_id + "\"" );
	var regex7    = new RegExp( "(item_meta\\[" + old_id + "\\])", "g" );
	newstring     = newstring.replace( regex7, "item_meta[" + new_id + "]" );
	newstring     = newstring.replace( old_key_regex, new_key );

	return newstring;
}


function arflite_confirm_field_remove(field_id) {
	if (jQuery( "#arfmainfieldid_" + field_id + "_confirm" ).length > 0) {
		if (jQuery( "#arfmainfieldid_" + field_id + "_confirm" ).parents( '.arf_inner_wrapper_sortable' ).hasClass( 'single_column_wrapper' )) {
			jQuery( "#arfmainfieldid_" + field_id + "_confirm" ).parents( '.arf_inner_wrapper_sortable' ).remove();
		} else {
			var removeallelement = true;
			var column_field_id;
			jQuery( "#arfmainfieldid_" + field_id + "_confirm" ).parent().find( '.sortable_inner_wrapper' ).each(
				function() {
					column_field_id = jQuery( this ).attr( 'id' );
					if (column_field_id != null) {
						if ("arfmainfieldid_" + field_id + "_confirm" != column_field_id) {
							removeallelement = false;
						}
					}
				}
			);
			if (removeallelement) {
				jQuery( "#arfmainfieldid_" + field_id + "_confirm" ).parent().remove();
			}
			var confirm_wrapper_style = jQuery( "#arfmainfieldid_" + field_id + "_confirm" ).attr( 'style' );
			jQuery( "#arfmainfieldid_" + field_id + "_confirm" ).empty();
			var inner_class = jQuery( "#arfmainfieldid_" + field_id + "_confirm" ).attr( 'inner_class' );
			var empty_div   = '<div class="sortable_inner_wrapper ui-droppable ui-sortable ui-resizable" inner_class="' + inner_class + '" style="' + confirm_wrapper_style + '"></div>';
			jQuery( "#arfmainfieldid_" + field_id + "_confirm" ).replaceWith( empty_div );
			arfliteSetDefaultColumnWidth();
			arflite_initialize_resizable();
		}
		arflite_initialize_field_order();
		arfliteinitialize_field_resize_width();
		arfliteheightdiv( 'all' );
	}
}
jQuery( document ).on(
	'change',
	'.arf_field_data_hidden',
	function() {
		var attr_id = jQuery( this ).attr( 'id' );
		var id      = attr_id.replace( 'arf_field_data_', '' );

		var data        = jQuery( '#arfchange_field' ).val();
		var inner_field = false;

		if (data != '') {
			data = arflite_parse_json( data );
		} else {
			data = [];
		}
		if (jQuery.inArray( id, data ) == -1) {
			data.push( id );
		}
		jQuery( '#arfchange_field' ).val( JSON.stringify( data ) );
	}
);
jQuery( document ).on(
	'change',
	'#arffontsizesetting',
	function() {
		var label_font_size = jQuery( this ).val();
		var input_font_size = jQuery( "#arffieldfontsizesetting" ).val();
		var inputStyle      = jQuery( '#arfmainforminputstyle' ).val();
		if (inputStyle != 'material') {
			return false;
		}
		jQuery( '.arf_main_label' ).removeClass( 'arf_small_size_label,arf_regular_size_label,arf_medium_size_label,arf_large_size_label,arf_larger_size_label,arf_small_size_field,arf_regular_size_field,arf_medium_size_field,arf_large_size_field,arf_larger_size_field,arf_xlarger_size_field' );
		var $label_class        = "";
		var $label_active_class = "";
		if (label_font_size >= 8 && label_font_size <= 14) {
			$label_class = "arf_small_size_label";
		} else if (label_font_size > 14 && label_font_size <= 17) {
			$label_class = "arf_regular_size_label";
		} else if (label_font_size > 17 && label_font_size <= 22) {
			$label_class = "arf_medium_size_label";
		} else if (label_font_size > 22 && label_font_size <= 24) {
			$label_class = "arf_large_size_label";
		} else if (label_font_size > 24) {
			$label_class = "arf_larger_size_label";
		}
		if (input_font_size >= 8 && input_font_size <= 14) {
			$label_active_class = "arf_small_size_field";
		} else if (input_font_size > 14 && input_font_size <= 17) {
			$label_active_class = "arf_regular_size_field";
		} else if (input_font_size > 17 && input_font_size <= 22) {
			$label_active_class = "arf_medium_size_field";
		} else if (input_font_size > 22 && input_font_size <= 24) {
			$label_active_class = "arf_large_size_field";
		} else if (input_font_size > 24 && input_font_size <= 32) {
			$label_active_class = "arf_larger_size_field";
		} else if (input_font_size > 32) {
			$label_active_class = "arf_xlarger_size_field";
		}
		jQuery( '.arf_materialize_form .arf_main_label' ).addClass( $label_class );
		jQuery( '.arf_materialize_form .arf_main_label' ).addClass( $label_active_class );
		if (jQuery( 'input[name="arfmps"]:checked' ).val() == 'top') {
			jQuery( '.inplace_field' ).trigger( 'keyup' );
		}
	}
);

jQuery( document ).on(
	'change',
	'#arfmainform_opacity',
	function() {
		jQuery( "#arfformbgcolorsetting" ).trigger( 'change' );
	}
);
jQuery( document ).on(
	'click',
	'.arf_greensave_button_wrapper',
	function() {
		jQuery( this ).find( '.arf_edit_in_place_input' ).focus();
	}
);

function arflitehasClass(el, className) {
	if (el == null) {
		return false;
	}
	if (el.classList) {
		return el.classList.contains( className );
	} else {
		return ! ! el.className.match( new RegExp( '(\\s|^)' + className + '(\\s|$)' ) );
	}
}

function arfliteaddClass(el, className) {
	if (el == null) {
		return false;
	}
	if (el.classList) {
		el.classList.add( className );
	} else if ( ! arflitehasClass( el, className )) {
		el.className += " " + className;
	}
}

function arfliteremoveClass(el, className) {
	if (el == null) {
		return false;
	}
	if (el.classList) {
		el.classList.remove( className );
	} else if (arflitehasClass( el, className )) {
		var reg      = new RegExp( '(\\s|^)' + className + '(\\s|$)' )
		el.className = el.className.replace( reg, ' ' )
	}
}

function arflitefireEvent(el, event) {
	if (event == null) {
		return false;
	}
	try {
		var e = new Event( event );
		el.dispatchEvent( e );
	} catch (e) {
	}
}

function arflitegetCookie(cname) {
	var name          = cname + "=";
	var decodedCookie = decodeURIComponent( document.cookie );
	var ca            = decodedCookie.split( ';' );
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt( 0 ) == ' ') {
			c = c.substring( 1 );
		}
		if (c.indexOf( name ) == 0) {
			return c.substring( name.length, c.length );
		}
	}
	return "";
}

function arflite_get_favourite_color() {
	var arf_cookies = arflitegetCookie( 'arf_fav_color[colors]' );
	if (typeof arf_cookies == 'undefined' || arf_cookies == null) {
		return [];
	}
	if (arf_cookies.indexOf( ";" ) > -1) {
		arf_cookies = arf_cookies.split( ';' )[0];
	}
	var arf_fav_colors = [];
	for (var x in arf_cookies) {
		if (arf_cookies != '') {
			arf_fav_colors = arf_cookies.split( ',' );
		}
	}
	return arf_fav_colors;
}

function arfliteisHidden(el) {
	if (el == null) {
		return false;
	}
	var style = window.getComputedStyle( el );
	return (style.display === 'none')
}

function arflitefrmSetPosClassHide() {
	var value    = 'none';
	var $form_id = jQuery( '#id' ).val();
	if (jQuery( '#arfhidelabels' ).is( ':checked' )) {
		value = 'none';
		jQuery( '#arfhidelabels' ).val( '1' );
		jQuery( '#arfmainformeditorcontainer' ).find( 'div.arfformfield' ).removeClass( 'top_container none_container left_container right_container' ).addClass( value + '_container' );
		var hideStyle = '<style type="text/css" id="arf_' + $form_id + 'arfhidelabel">.arflite_main_div_' + $form_id + ' .none_container label.arf_main_label{display:none !important;}</style>';
		if (jQuery( "#arf_" + $form_id + "arfhidelabel" ).length > 0) {
			jQuery( "#arf_" + $form_id + "arfhidelabel" ).remove();
		}
		jQuery( "body" ).append( hideStyle );
	} else {
		jQuery( '#arfhidelabels' ).val( '0' );
		value = jQuery( "input[name=arfmps]:radio:checked" ).val();
		jQuery( '#arfmainformeditorcontainer' ).find( 'div.arfformfield' ).removeClass( 'top_container none_container left_container right_container' ).addClass( value + '_container' );
	}
}

function arfliteClosest(el, selector) {
	var matchesFn;
	['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(
		function(fn) {
			if (typeof document.body[fn] == 'function') {
				matchesFn = fn;
				return true;
			}
			return false;
		}
	)
	var parent;
	while (el) {
		parent = el.parentElement;
		if (parent && parent[matchesFn]( selector )) {
			return parent;
		}
		el = parent;
	}
	return null;
}

function arfliteNextClosest(el, selector) {
	var matchesFn;
	['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(
		function(fn) {
			if (typeof document.body[fn] == 'function') {
				matchesFn = fn;
				return true;
			}
			return false;
		}
	)
	var next;
	while (el) {
		next = el.nextElementSibling;
		if (next && next[matchesFn]( selector )) {
			return next;
		}
		el = next;
	}
	return null;
}

function arflitePrevClosest(el, selector) {
	var matchesFn;
	['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(
		function(fn) {
			if (typeof document.body[fn] == 'function') {
				matchesFn = fn;
				return true;
			}
			return false;
		}
	)
	var prev;
	while (el) {
		prev = el.previousElementSibling;
		if (prev && prev[matchesFn]( selector )) {
			return prev;
		}
		el = prev;
	}
	return null;
}

function arfliteInsertAfter(Node, ReferenceNode) {
	if (ReferenceNode !== null) {
		ReferenceNode.parentNode.insertBefore( Node, ReferenceNode.nextElementSibling );
	}
}

function arflite_initialize_control(field_id, arf_remove = false, from_external_js_function = false) {

	if (field_id == null || typeof field_id == 'undefined' || /[\d+](\_confirm)/gi.test( field_id )) {
		return false;
	}
	if (typeof arf_remove == 'undefined') {
		arf_remove = false;
	}
	if (typeof from_external_js_function == 'undefined') {
		from_external_js_function = false;
	}
	let form_id    = document.getElementById( 'id' ).value;
	let field_data = arflite_retrieve_field_data( field_id );
	
	let field_type    = field_data.type;
	let inputStyle    = document.getElementById( 'arfmainforminputstyle' ).value;
	let init          = true;
	let is_after_save = window.arf_after_save || false
	if ( ! is_after_save && from_external_js_function == true) {
		init = false;
	}

	if (init == true && typeof field_data.field_width != 'undefined' ) {
		if (field_type == 'textarea') {
			var cur_style = jQuery( "#arf_field_" + field_id ).find( '.controls' ).attr( 'style' );
			cur_style     = (cur_style != undefined && cur_style != '') ? cur_style : '';
			if (/width/i.test( cur_style )) {
				cur_style = cur_style.replace( /(width\:(.*?)\;)/ig, '' );
			}
			if (field_data.field_width != '') {
				jQuery( "#arf_field_" + field_id ).find( '.controls' ).attr( 'style', cur_style + 'width:' + field_data.field_width + 'px !important;' );
			} else {
				jQuery( "#arf_field_" + field_id ).find( '.controls' ).attr( 'style', cur_style );
			}
		} else if (field_type == 'select') {
			var cur_style = jQuery( "#arf_field_" + field_id ).find( '.controls' ).attr( 'style' );
			cur_style     = (cur_style != undefined && cur_style != '') ? cur_style : '';
			if (/width/i.test( cur_style )) {
				cur_style = cur_style.replace( /(width\:(.*?)\;)/ig, '' );
			}
			if (field_data.field_width != '') {
				jQuery( "#arf_field_" + field_id ).find( '.controls' ).attr( 'style', cur_style + 'width:' + field_data.field_width + 'px !important;' );
			} else {
				jQuery( "#arf_field_" + field_id ).find( '.controls' ).attr( 'style', cur_style );
			}
		} else {
			var cur_style = jQuery( "#arf_field_" + field_id ).find( '.controls' ).attr( 'style' );
			if (/width/i.test( cur_style )) {
				cur_style = cur_style.replace( /(width\:(.*?)\;)/ig, '' );
			}
			cur_style         = (cur_style != 'undefined' && cur_style != '') ? cur_style : '';
			var style_for_ele = (cur_style != undefined) ? cur_style + 'width:' + field_data.field_width + 'px !important;' : 'width:' + field_data.field_width + 'px !important;';
			if (field_data.field_width != '') {
				jQuery( "#arf_field_" + field_id ).find( '.controls' ).attr( 'style', style_for_ele );
			} else {
				jQuery( "#arf_field_" + field_id ).find( '.controls' ).attr( 'style', cur_style );
			}
			setTimeout(
				function() {
					if ((field_type == 'email' )) {
						if (jQuery( "#arf_field_" + field_id + "_confirm" ).length > 0) {
							var confirm_style = jQuery( "#arf_field_" + field_id + "_confirm" ).find( 'constrols' ).attr( 'style' );
							confirm_style     = (confirm_style != undefined && confirm_style != '') ? confirm_style : '';
							if (/width/i.test( confirm_style )) {
								confirm_style = confirm_style.replace( /(width\:(.*?)\;)/ig, '' );
							}
							if (field_data.field_width != '') {
								jQuery( "#arf_field_" + field_id + "_confirm" ).find( '.controls' ).attr( 'style', confirm_style + 'width:' + field_data.field_width + 'px !important;' );
							} else {
								jQuery( "#arf_field_" + field_id + "_confirm" ).find( '.controls' ).attr( 'style', confirm_style );
							}
						}
					}
				},
				100
			);
		}
	}
	if (field_type == 'date') {
		let default_data_formate = document.getElementById( 'frm_date_format' ).value;
		let dateLocale           = field_data.locale;
		let start_date           = field_data.start_date;
		let end_date             = field_data.end_date;
		let date_format          = (default_data_formate != "" && default_data_formate != null) ? default_data_formate : 'MM/DD/YYYY';
		let en_date_format       = 'YYYY-MM-DD';
		let show_timepicker      = (field_data.show_time_calendar == 1) ? true : false;
		let clock                = field_data.clock;
		let step                 = field_data.step;
		let show_min_date        = field_data.arf_show_min_current_date;
		let show_max_date        = field_data.arf_show_max_current_date;
		let currentDate          = new Date();
		let dd                   = currentDate.getDate();
		let mm                   = currentDate.getMonth() + 1;
		let yyyy                 = currentDate.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		var new_currentDate = dd + '/' + mm + '/' + yyyy;
		var default_date    = field_data.selectdefaultdate;
		var current_date    = field_data.currentdefaultdate;
		if (show_timepicker) {
			if (clock == 12) {
				date_format    += ' h:mm A';
				en_date_format += ' h:mm A';
			} else {
				date_format    += ' H:mm';
				en_date_format += ' H:mm';
			}
		}

		var useCurrentFlag = false;
		if (current_date == 1 || current_date == true) {
			useCurrentFlag = true;
		}
		var options          = {
			useCurrent: useCurrentFlag,
			format: date_format,
			locale: dateLocale,
			stepping: step,
			keyBinds: ""
		};
		var new_default_date = "";
		if (default_date != '') {
			new_default_date = default_date;
		}

		if ( true == useCurrentFlag ) {
			new_default_date = moment().format( date_format );
		}

		var final_date = '';

		if ( '' != new_default_date ) {

			var formated_date = moment( new_default_date,date_format, dateLocale ).format( en_date_format, 'en' );

			if (current_date == 1) {
				var formated_date = moment( new_currentDate, 'DD/MM/YYYY' ).format( en_date_format, 'en' );
			}

			var final_date = moment( formated_date, en_date_format, dateLocale ).format( date_format );
		}

		if (field_data.off_days != '') {
			var off_days               = field_data.off_days.split( ',' );
			options.daysOfWeekDisabled = off_days;
		}
		if (start_date != '' && show_min_date == 0) {
			options.minDate = moment( start_date + " 00:00 AM", "DD/MM/YYYY h:mm A" ).format( date_format );
		}
		if (end_date != '' && show_max_date == 0) {
			options.maxDate = moment( end_date + " 11:59 PM", "DD/MM/YYYY h:mm A" ).format( date_format );
		}
		if (show_min_date != '' && show_min_date == 1) {
			options.minDate = moment( new_currentDate + " 00:00 AM", "DD/MM/YYYY h:mm A" ).format( date_format );
		}
		if (show_max_date != '' && show_max_date == 1) {
			options.maxDate = moment( new_currentDate + " 11:59 PM", "DD/MM/YYYY h:mm A" ).format( date_format );
		}
		if (arf_remove) {
			if (jQuery( "#field_" + field_data.key ).length > 0) {
				if (typeof jQuery( "input[name='item_meta[" + field_id + "]']" ).data( 'DateTimePicker' ) != 'undefined') {
					jQuery( "input[name='item_meta[" + field_id + "]']" ).data( 'DateTimePicker' ).destroy();
				}
			}
		} else {
			jQuery( "input[name='item_meta[" + field_id + "]']" ).datetimepicker( options );

			var new_default_date_val = '';
			if ( final_date != '' ) {
				new_default_date_val = final_date;
			}

			jQuery( "input[name='item_meta[" + field_id + "]']" ).val( new_default_date_val );

		}
	} else if (field_type == 'time') {
		var clock  = field_data.clock;
		var steps  = field_data.step;
		var timepickerlocalization  = field_data.timepickerlocalization;
		if (typeof timepickerlocalization == "undefined" || timepickerlocalization == "") {
			timepickerlocalization = "en";
		}
		var format = (clock == 12) ? "h:mm A" : "H:mm";
		options    = {
			locale: timepickerlocalization,
			format: format,
			stepping: steps,
		};
		if (arf_remove) {
			if (jQuery( "#field_" + field_data.key ).length > 0) {
				if (typeof jQuery( "input[name='item_meta[" + field_id + "]']" ).data( 'DateTimePicker' ) != 'undefined') {
					jQuery( "input[name='item_meta[" + field_id + "]']" ).data( 'DateTimePicker' ).destroy();
				}
			}
		} else {
			jQuery( "input[name='item_meta[" + field_id + "]']" ).datetimepicker( options );
			if (typeof field_data.default_hour !== "undefined" && typeof field_data.default_minutes !== "undefined" && field_data.default_hour !== "" && field_data.default_minutes !== "") {
				var d = new Date();
				d.setHours(field_data.default_hour);
				d.setMinutes(field_data.default_minutes);
				var formatted_time = moment(d).locale(timepickerlocalization).format(format);
				jQuery( "input[name='item_meta[" + field_id + "]']" ).val(formatted_time);
			}
		}
		jQuery( "input[name='item_meta[" + field_id + "]']" ).on(
			'dp.change',
			function(e) {
				var date                   = new Date( e.date );
				var hour                   = date.getHours();
				var minute                 = date.getMinutes();
				field_data.default_hour    = hour;
				field_data.default_minutes = minute;
				field_data.default_value   = jQuery( 'input[name="item_meta[' + field_id + ']"]' ).val();
				var field_data_update      = JSON.stringify( field_data );
				jQuery( "#arf_field_data_" + field_id ).val( field_data_update );
			}
		);
	} else if (field_type == 'email') {
		var confirm_email = field_data.confirm_email;
		var cfemail       = document.getElementById( 'arfmainfieldid_' + field_id + '_confirm' );
		if (confirm_email == 1) {
			var confirm_email_label       = field_data.confirm_email_label;
			var confirm_email_placeholder = field_data.confirm_email_placeholder;

			var cfemail_defval                   = field_data.default_value;
			var email_enable_arf_prefix          = field_data.enable_arf_prefix;
			var email_arf_prefix_icon            = field_data.arf_prefix_icon;
			var email_enable_arf_suffix          = field_data.enable_arf_suffix;
			var email_arf_suffix_icon            = field_data.arf_suffix_icon;
			var arf_material_theme_container_cls = '';

			if ( email_enable_arf_prefix == 1 || email_enable_arf_suffix == 1 ) {
				arf_material_theme_container_cls = ' arf_material_theme_container_with_icons ';
			}

			if ( email_enable_arf_prefix == 1 && 1 != email_enable_arf_suffix ) {
				arf_material_theme_container_cls += ' arf_only_leading_icon ';
			}

			if ( 1 != email_enable_arf_prefix && email_enable_arf_suffix == 1 ) {
				arf_material_theme_container_cls += ' arf_only_trailing_icon ';
			}

			if ( 1 == email_enable_arf_prefix && 1 == email_enable_arf_suffix ) {
				arf_material_theme_container_cls += ' arf_both_icons ';
			}

			var arf_material_prefix_icon = '';
			var arf_material_suffix_icon = '';

			if ( 1 == email_enable_arf_prefix ) {
				arf_material_prefix_icon = '<i class="arf_leading_icon ' + email_arf_prefix_icon + '"></i>';
			}

			if ( 1 == email_enable_arf_suffix ) {
				arf_material_suffix_icon = '<i class="arf_trailing_icon ' + email_arf_suffix_icon + '"></i>';
			}

			if (jQuery( '#arfmainforminputstyle' ).val() != 'material') {
				var email_prefix_icon_html = '';
				var email_suffix_icon_html = '';
				if (email_enable_arf_prefix == 1) {
					email_prefix_icon_html = "<span class='arf_editor_prefix_icon'><i class='" + email_arf_prefix_icon + "'></i></span>";
				}
				if (email_enable_arf_suffix == 1) {
					email_suffix_icon_html = "<span class='arf_editor_suffix_icon'><i class='" + email_arf_suffix_icon + "'></i></span>";
				}
				var email_prefix_suffix_icon_container_start = '';
				var email_prefix_suffix_icon_container_end   = '';
				if (email_enable_arf_prefix == 1 && email_enable_arf_suffix == 1) {
					email_prefix_suffix_icon_container_start = '<div id="arf_editor_prefix_suffix_container_' + field_id + '_confirm" class="arf_editor_prefix_suffix_wrapper arf_both_pre_suffix">';
					email_prefix_suffix_icon_container_end   = '</div>';
				} else if (email_enable_arf_prefix == 0 && email_enable_arf_suffix == 1) {
					email_prefix_suffix_icon_container_start = '<div id="arf_editor_prefix_suffix_container_' + field_id + '_confirm" class="arf_editor_prefix_suffix_wrapper arf_suffix_only">';
					email_prefix_suffix_icon_container_end   = '</div>';
				} else if (email_enable_arf_prefix == 1 && email_enable_arf_suffix == 0) {
					email_prefix_suffix_icon_container_start = '<div id="arf_editor_prefix_suffix_container_' + field_id + '_confirm" class="arf_editor_prefix_suffix_wrapper arf_prefix_only">';
					email_prefix_suffix_icon_container_end   = '</div>';
				}
			}
			if (cfemail != null) {
				var cfemail_field_width = field_data.field_width;
				if (jQuery( '#arfmainforminputstyle' ).val() != 'material') {

					var new_html = '<div class="controls  " style="width:' + cfemail_field_width + 'px;">' + email_prefix_suffix_icon_container_start + email_prefix_icon_html + '<input id="field_confiorm_email" value="' + cfemail_defval + '" name="confirm_email" ' + confirm_email_placeholder + ' type="text" class=" arflite_float_left">' + email_suffix_icon_html + email_prefix_suffix_icon_container_end + '</div>';
					jQuery( cfemail ).find( 'div.controls' ).replaceWith( new_html );
				} else {
					var new_html = '<div class="controls  " style="width:' + cfemail_field_width + 'px;"><div class="arf_material_theme_container ' + arf_material_theme_container_cls + '">' + arf_material_prefix_icon + arf_material_suffix_icon + '<input id="field_confiorm_email" value="' + cfemail_defval + '" name="confirm_email" ' + confirm_email_placeholder + ' type="text" class=" arflite_float_left"><div class="arf_material_standard"><div class="arf_material_theme_prefix"></div><div class="arf_material_theme_notch"><label class="arf_main_label">' + confirm_email_label + '</label></div><div class="arf_material_theme_suffix"></div></div></div></div>';
					jQuery( cfemail ).find( 'div.controls' ).replaceWith( new_html );
				}

				if (confirm_email_placeholder != '' || cfemail_defval != '') {
					if (confirm_email_placeholder != '') {
						jQuery( cfemail ).find( '#field_confiorm_email' ).attr( 'placeholder', confirm_email_placeholder );
					}
					if (jQuery( '#arfmainforminputstyle' ).val() == 'material') {
						jQuery( cfemail ).find( '.arf_main_label' ).addClass( 'active' );
					}
				} else {
					jQuery( cfemail ).find( '#field_confiorm_email' ).removeAttr( 'placeholder' )
					if (jQuery( '#arfmainforminputstyle' ).val() == 'material') {
						jQuery( cfemail ).find( '.arf_main_label' ).removeClass( 'active' );
					}
				}
				jQuery( cfemail ).find( '.arf_main_label .arfeditorfieldopt_label' ).html( confirm_email_label );
				return;
			}
			var confirm_email_classes      = field_data.confirm_email_classes;
			var confirm_email_innerclasses = field_data.confirm_email_inner_classes;
			var multicol_html_data         = arflite_multicol_html();
			var active_class               = '';
			if (confirm_email_placeholder != '') {
				confirm_email_placeholder = 'placeholder = "' + confirm_email_placeholder + '"';
				active_class              = 'active';
			}

			if (cfemail_defval != '') {
				active_class = 'active';
			}
			var arf_row_index = document.getElementById( 'arf_editor_total_rows' ).value;

			if (jQuery( '#arfmainforminputstyle' ).val() == 'material') {

				var confirm_email_html = '<div class="arf_inner_wrapper_sortable arfmainformfield edit_form_item arffieldbox ui-state-default arf1columns 1 single_column_wrapper" data-id="arf_editor_main_row_' + arf_row_index + '">' + multicol_html_data + '<div class="sortable_inner_wrapper  edit_field_type_email arf_confirm_field ui-droppable ui-sortable ' + confirm_email_classes + '"  inner_class="' + confirm_email_innerclasses + '" id="arfmainfieldid_' + field_id + '_confirm"><div id="arf_field_' + field_id + '_confirm" class="arfformfield control-group arfmainformfield arf_confirm_field   top_container arf_field_' + field_id + '_confirm" style=""><div class="fieldname-row display-blck-cls"><div class="arf_fieldiconbox" data-field_id="' + field_id + '_confirm"><div class="arf_field_option_icon"><a class="arf_field_option_input"><svg id="moveing" height="20" width="21"><g><path fill="#ffffff" d="M20.062,10.027l-3.563-3.563V8.84h-4.75V4.088h2.376l-3.563-3.562L6.999,4.088h2.375V8.84h-4.75V6.464    l-3.563,3.563l3.563,3.563v-2.376h4.75v4.751H6.999l3.563,3.562l3.563-3.562h-2.376v-4.751h4.75v2.376L20.062,10.027z"></path></g></svg></a></div></div></div><div class="arf_field_css_model" id="arf_field_css_model"></div><div class="controls input-field"><div class="arf_material_theme_container' + arf_material_theme_container_cls + '">' + arf_material_prefix_icon + arf_material_suffix_icon + '<input id="field_confiorm_email" name="confirm_email" type="text" value="' + cfemail_defval + '" class="arflite_float_left" ' + confirm_email_placeholder + '><div class="arf_material_standard"><div class="arf_material_theme_prefix"></div><div class="arf_material_theme_notch"><label class="arf_main_label ' + active_class + '" id="field_' + field_id + '_confirm">' + confirm_email_label + '</label></div><div class="arf_material_theme_suffix"></div></div></div></div></div></div></div>';
			} else {

				var confirm_email_html = '<div class="arf_inner_wrapper_sortable arfmainformfield edit_form_item arffieldbox ui-state-default arf1columns 1 single_column_wrapper" data-id="arf_editor_main_row_' + arf_row_index + '">' + multicol_html_data + '<div class="sortable_inner_wrapper  edit_field_type_email arf_confirm_field ui-droppable ui-sortable ' + confirm_email_classes + '"  inner_class="' + confirm_email_innerclasses + '" id="arfmainfieldid_' + field_id + '_confirm"><div id="arf_field_' + field_id + '_confirm" class="arfformfield control-group arfmainformfield arf_confirm_field   top_container arf_field_' + field_id + '_confirm" style=""><div class="fieldname-row display-blck-cls"><div class="fieldname"><label class="arf_main_label" id="field_' + field_id + '_confirm"><span class="arfeditorfieldopt_label arf_edit_in_place">' + confirm_email_label + '</span></label></div></div><div class="arf_fieldiconbox" data-field_id="' + field_id + '_confirm"><div class="arf_field_option_icon"><a class="arf_field_option_input"><svg id="moveing" height="20" width="21"><g><path fill="#ffffff" d="M20.062,10.027l-3.563-3.563V8.84h-4.75V4.088h2.376l-3.563-3.562L6.999,4.088h2.375V8.84h-4.75V6.464    l-3.563,3.563l3.563,3.563v-2.376h4.75v4.751H6.999l3.563,3.562l3.563-3.562h-2.376v-4.751h4.75v2.376L20.062,10.027z"></path></g></svg></a></div></div><div class="arf_field_css_model" id="arf_field_css_model"></div><div class="controls  ">' + email_prefix_suffix_icon_container_start + email_prefix_icon_html + '<input id="field_confiorm_email" name="confirm_email" value="' + cfemail_defval + '" ' + confirm_email_placeholder + ' type="text" class=" arflite_float_left">' + email_suffix_icon_html + email_prefix_suffix_icon_container_end + '</div></div></div></div>';
			}
			var obj      = document.getElementById( 'arfmainfieldid_' + field_id );
			var selector = arfliteClosest( obj, '.arf_inner_wrapper_sortable' );
			var node     = jQuery( confirm_email_html )[0];
			arfliteInsertAfter( node, selector );
		} else if (confirm_email == 0 && cfemail != null) {
			arflite_confirm_field_remove( field_id );
		}
	} else if (field_type == 'phone') {
		if (typeof(field_data.phonetype) != 'undefined' && field_data.phonetype == 1) {
			var flag_key = 'field_' + field_id;
			var input    = jQuery( '#arf_field_' + field_id + ' .controls input' );
			input.addClass( 'arf_phone_utils' );
			if (field_data.enable_suffix == 0) {
				if (typeof phone_with_flags[flag_key] != 'undefined') {
					phone_with_flags[flag_key].destroy();
					delete phone_with_flags[flag_key];
				}
			}
			var selected_country_arr = [];
			if (jQuery( '#field_' + field_data.key + '_country_list' ).length == 0) {
				var country_list = field_data.phtypes;
				var country_keys = Object.keys( country_list );
				var cl_list      = [];
				var first_country;
				var cn = 0;
				for (var i = 0; i < country_keys.length; i++) {
					var key = country_keys[i];
					if (country_list[key] == '0') {
						continue;
					}
					if (cn == 0) {
						first_country = key.replace( 'phtypes_', '' ).toLowerCase();
						cn++;
					}
					cl_list.push( key.replace( 'phtypes_', '' ).toLowerCase() );
					selected_country_arr.push( key.replace( 'phtypes_', '' ).toLowerCase() );
				}
				var cl_list_string = JSON.stringify( cl_list );
				input[0].setAttribute( 'data-defaultcountrycode', first_country );
				var el   = document.createElement( 'input' );
				el.type  = 'hidden';
				el.id    = 'field_' + field_data.key + '_country_list';
				el.value = cl_list_string;
				jQuery( input ).after( el );
			} else {
				var country_list = field_data.phtypes;
				var country_keys = Object.keys( country_list );
				var cl_list      = [];
				var first_country;
				var cn = 0;
				for (var i = 0; i < country_keys.length; i++) {
					var key = country_keys[i];
					if (country_list[key] == '0') {
						continue;
					}
					if (cn == 0) {
						first_country = key.replace( 'phtypes_', '' ).toLowerCase();
						cn++;
					}
					cl_list.push( key.replace( 'phtypes_', '' ).toLowerCase() );
					selected_country_arr.push( key.replace( 'phtypes_', '' ).toLowerCase() );
				}
				var cl_list_string = JSON.stringify( cl_list );
				input[0].setAttribute( 'data-defaultcountrycode', first_country );
				jQuery( '#field_' + field_data.key + '_country_list' ).val( cl_list_string );
			}
			if (jQuery( "#field_" + field_data.key + "_default_country" ).length == 0) {
				var el   = document.createElement( 'input' );
				el.type  = 'hidden';
				el.id    = 'field_' + field_data.key + '_default_country';
				el.value = '';
				input.after( el );
			}
			phone_with_flags[flag_key] = window.intlTelInput(
				input[0],
				{
					preferredCountries: [],
					dropdownContainer: null,
					autoPlaceholder: 'aggressive',
				}
			);
			phone_with_flags[flag_key].telInput.addEventListener(
				'countrychange',
				function(e) {
					var selected_country_data        = phone_with_flags[flag_key].getSelectedCountryData();
					var selected_country             = selected_country_data.iso2;
					var new_fields_phone             = field_data;
					new_fields_phone.default_country = selected_country;
					var newFieldData                 = JSON.stringify( new_fields_phone );
					jQuery( "#arf_field_data_" + field_id ).val( newFieldData ).trigger( 'change' );
				}
			);
			var selected_country = jQuery( '#field_' + field_data.key + '_default_country' ).val();
			if (typeof selected_country != 'undefined' && selected_country != '') {
				if (selected_country_arr.indexOf( selected_country ) > -1) {
					phone_with_flags[flag_key].setCountry( selected_country );
				} else {
				}
			}
		} else {
			var flag_key = 'field_' + field_id;
			var input    = jQuery( '#arf_field_' + field_id + ' .controls input' );
			input.removeClass( 'arf_phone_utils' );
			if (typeof phone_with_flags[flag_key] != 'undefined') {
				phone_with_flags[flag_key].destroy();
				delete phone_with_flags[flag_key];
			}
		}
	} else if ( 'material' == inputStyle && ( 'checkbox' == field_type || 'radio' == field_type ) ) {
		var image_width = field_data.image_width;
		if (field_data.image_width == "") {
			image_width = 120;
		}
		var rStyle = '<style type="text/css">:root{ --checkbox_image_size_arf_field_' + field_id + ' :' + image_width + 'px;}.arf_field_' + field_id + ' .rect-cutoff{ transform: translateX( calc( var(--checkbox_image_size_arf_field_' + field_id + ') - 25px ) ) translateY(-6.5px); }</style>';
		jQuery( "body" ).append( rStyle );
	} else {

		wp.hooks.doAction( 'arflite_initialize_control_from_outside', field_id, arf_remove, field_type );
	}
	if (inputStyle == 'material') {
		arflite_material_style_init();
	}

	jQuery( '.arf_field_icon_tooltip' ).tipso( 'destroy' );

	jQuery( '#arf_field_' + field_id ).find( '.arf_field_option_icon' ).each(
		function(){
			var test = jQuery( this ).find( '.arf_field_icon_tooltip' ).attr( 'data-title' );
			jQuery( this ).find( '.arf_field_icon_tooltip' ).attr( 'title', test );
		}
	);

	jQuery( '#isrequired_' + field_id ).tipso( 'destroy' );
	jQuery( '#isrequired_' + field_id ).attr( 'title', 'Click to mark as compulsory field.' );
	jQuery( '#isrequired_' + field_id ).tipso(
		{
			position: 'top',
			maxWidth: 400,
			useTitle: true,
			background: '#444444',
			color: '#ffffff',
			width: 'auto'
		}
	);

	jQuery( '.arf_field_icon_tooltip' ).tipso(
		{
			position: 'top',
			maxWidth: '400',
			useTitle: true,
			background: '#444444',
			color: '#ffffff',
			width: 'auto',
			tooltipHover: true,
		}
	);

	setTimeout(
		function(){
			if (jQuery( '.tipso_bubble' ).length > 0) {
				jQuery( '.tipso_bubble' ).remove();
			}
		},
		500
	)

}

function arflitehidesetvaluefield() {
	var excluded_field_array   = ["html", "captcha"];
	var exclude_field_all_cond = [];
	var exclude_hidden_field   = ["hidden"];
	var enable_val_exclude, disable_val_exclude;
	enable_val_exclude = disable_val_exclude = ["captcha", "html", "hidden"];
}

jQuery( document ).on(
	'dragstart',
	'.arf_inner_wrapper_sortable.single_column_wrapper',
	function() {
		var $this     = jQuery( this );
		var $field    = $this.find( '.arfformfield' );
		var $field_id = $field.attr( 'id' ).replace( 'arf_field_', '' );
		var values    = document.getElementById( 'arf_single_column_field_ids' ).value;
		if (values == '' || typeof values == 'undefined') {
			var objs = [];
			objs.push( $field_id );
		} else {
			var objs = arflite_parse_json( values );
			if (objs.indexOf( $field_id ) < 0) {
				objs.push( $field_id );
			}
		}
		window.arf_sender_id = $field_id;
		objs                 = JSON.stringify( objs );
		document.getElementById( 'arf_single_column_field_ids' ).value = objs;
		var parentHTML                        = $this[0].outerHTML;
		window.arf_sender_parent[$field_id]   = parentHTML;
		var previousElm                       = arflitePrevClosest( $this[0], '.arf_inner_wrapper_sortable' );
		window.arf_sender_previous[$field_id] = previousElm;
	}
);
jQuery( document ).on(
	'dragstart',
	'.arf_inner_wrapper_sortable.single_column_wrapper .sortable_inner_wrapper',
	function(e) {
		var $this     = jQuery( this ).parents( '.arf_inner_wrapper_sortable.single_column_wrapper' );
		var $field    = $this.find( '.arfformfield' );
		var $field_id = $field.attr( 'id' ).replace( 'arf_field_', '' );
		var values    = document.getElementById( 'arf_single_column_field_ids' ).value;
		if (values == '' || typeof values == 'undefined') {
			var objs = [];
			objs.push( $field_id );
		} else {
			var objs = arflite_parse_json( values );
			if (objs.indexOf( $field_id ) < 0) {
				objs.push( $field_id );
			}
		}
		window.arf_sender_id = $field_id;
		objs                 = JSON.stringify( objs );
		document.getElementById( 'arf_single_column_field_ids' ).value = objs;
		var parentHTML                        = $this[0].outerHTML;
		window.arf_sender_parent[$field_id]   = parentHTML;
		var previousElm                       = arflitePrevClosest( $this[0], '.arf_inner_wrapper_sortable' );
		window.arf_sender_previous[$field_id] = previousElm;
	}
);

function arflite_reset_single_field_ids(field_id) {
	var SingleFields = document.getElementById( 'arf_single_column_field_ids' ).value;
	if (typeof SingleFields == 'undefined' || SingleFields == '') {
		var SFields = [];
		SFields.push( field_id );
	} else {
		var SFields = arflite_parse_json( SingleFields );
		if (SFields.indexOf( field_id ) > -1) {
			SFields.push( field_id );
		}
	}
	SFields = JSON.stringify( SFields );
	document.getElementById( 'arf_single_column_field_ids' ).value = SFields;
}
jQuery( document ).on(
	'keyup',
	'.arf_autocomplete dt input',
	function() {
		jQuery( this ).parent().parent().find( 'dd ul' ).scrollTop();
		var value = jQuery( this ).val();
		value     = value.toLowerCase();
		jQuery( this ).parent().parent().find( 'dd ul' ).show();
		jQuery( this ).parent().parent().find( 'dd ul li' ).each(
			function(x) {
				var text = jQuery( this ).attr( 'data-label' ).toLowerCase();
				(text.indexOf( value ) != -1) ? jQuery( this ).show() : jQuery( this ).hide();
			}
		);
	}
);
jQuery( document ).on(
	'mouseenter',
	'.arf_selectbox',
	function() {
		jQuery( this ).find( 'li.arf_hovered' ).removeClass( 'arf_hovered' );
	}
);

function arflite_initialize_dropdown_keypress(e, keyCode, obj) {
	var dl = jQuery( obj ).parents( 'dl' );
	var dt = dl.find( 'dt' );
	if ( ! dt.hasClass( 'arf_disable_selectbox' )) {
		var ul         = dl.find( 'ul' );
		var li_hovered = dl.find( 'li.arf_hovered' );
		if (keyCode >= 38 && keyCode <= 41) {
			arflitepreventDefault( e );
			arflitepreventDefaultForScrollKeys( e );
			if (ul.find( "li.arf_hovered" ).length > 0) {
				var current = ul.find( "li.arf_hovered" );
				if (keyCode == 38) {
					if (current.siblings( ':visible' ).addBack().index( current ) == 0) {
						ul.find( "li:visible:last" ).addClass( 'arf_hovered' );
						ul[0].scrollTop = ul.prop( 'scrollHeight' );
					} else {
						ul.find( "li.arf_hovered" ).prevAll( 'li:visible' ).first().addClass( 'arf_hovered' );
						ul.scrollTop( 30 * (li_hovered.siblings( ':visible' ).addBack().index( li_hovered ) - 3) );
					}
				} else if (keyCode == 40) {
					if (current.siblings( ':visible' ).addBack().index( current ) == ul.find( 'li:visible' ).length - 1) {
						ul.find( "li:visible:first" ).addClass( 'arf_hovered' );
						ul[0].scrollTop = ul.find( 'li:visible:first' ).prop( 'scrollHeight' ) - 30;
					} else {
						ul.find( "li.arf_hovered" ).nextAll( 'li:visible' ).first().addClass( 'arf_hovered' );
						ul.scrollTop( 30 * (li_hovered.siblings( ':visible' ).addBack().index( li_hovered ) - 1) );
					}
				}
				current.removeClass( 'arf_hovered' );
			} else {
				ul.find( "li:visible:first" ).addClass( 'arf_hovered' );
				ul.scrollTop( 30 * (li_hovered.index() - 3) );
			}
		} else if (keyCode == 13 || keyCode == 27) {
			arflitepreventDefault( e );
			li_hovered.trigger( 'click' );
			(function(ulObj) {
				setTimeout(
					function() {
						ulObj.hide();
					},
					100
				);
			})( ul );
			return false;
		}
	}
}
jQuery( document ).on(
	'keydown',
	function(e) {
		var keyCode = e.keyCode;
		if (jQuery( '.arf_selectbox dd ul:visible' ).length > 0) {
			arflite_initialize_dropdown_keypress( e, e.keyCode, jQuery( '.arf_selectbox dd ul:visible' ) );
		}
	}
);
jQuery( window ).on(
	"scroll",
	function(e) {
		if (jQuery( '.arf_selectbox dd ul:visible' ).length > 0) {
			arflitedisableScroll();
		} else {
			arflitenableScroll();
		}
	}
);

function arflitepreventDefault(e) {
	e = e || window.event;
	if (e.preventDefault) {
		e.preventDefault();
	}
	e.returnValue = false;
}

function arflitepreventDefaultForScrollKeys(e) {
	var keys = {
		37: 1,
		38: 1,
		39: 1,
		40: 1
	};
	if (keys[e.keyCode]) {
		arflitepreventDefault( e );
		return false;
	}
}

function arflitedisableScroll() {
	if (window.addEventListener) {
		window.addEventListener( 'wheel  DOMMouseScroll', arflitepreventDefault, false );
	}
	document.onkeydown = arflitepreventDefaultForScrollKeys;
}

function arflitenableScroll() {
	if (window.removeEventListener) {
		window.removeEventListener( 'wheel', arflitepreventDefault, false );
		window.removeEventListener( 'DOMMouseScroll', arflitepreventDefault, false );
	}
	document.onkeydown = null;
}

function arflite_parse_json(jsonString) {
	var jsonObject;
	if (jsonString == '' || typeof jsonString === 'undefined') {
		return null;
	}
	try {
		jsonObject = JSON.parse( jsonString );
	} catch (e) {
		jsonObject = JSON.parse( jsonString );
	}
	return jsonObject;
}
jQuery( document ).on(
	'keyup',
	'.ar_email_message_content',
	function() {
		var value = this.value;
		jQuery( "#ar_email_message_text" ).text( value );
		if (value != 'undefined' && value != '') {
			jQuery( '#ar_email_message_error' ).hide();
			jQuery( this ).removeClass( 'arf_error_border_to_editor' );
		}
	}
);
jQuery( document ).on(
	'keyup',
	'.ar_admin_email_message_content',
	function() {
		var value = this.value;
		jQuery( "#ar_admin_email_message_text" ).text( value );
		if (value != 'undefined' && value != '') {
			jQuery( '#ar_admin_email_message_error' ).hide();
			jQuery( this ).removeClass( 'arf_error_border_to_editor' );
		}
	}
);

function arflitechangebuttonstyle(value) {
	var input_style             = document.getElementById( 'arfmainforminputstyle' ).value;
	var submit_button_bgcolor   = document.getElementById( 'arfsubmitbuttonbgcolorsetting' ).value;
	var submit_button_hvcolor   = document.getElementById( 'arfsubmitbuttoncolorhoversetting' ).value;
	var submit_button_textcolor = document.getElementById( 'arfsubmitbuttontextcolorsetting' ).value;
	var $form_id                = document.getElementById( 'id' ).value;
	var submit_border_slider    = document.getElementById( 'arflite_btn_border_size' );
	var value_slider            = Math.round( submit_border_slider.noUiSlider.get() );
	var slider_id               = jQuery( '#arfsubmitbuttonborderwidhtsetting_exs' ).attr( 'data-slider-id' );
	var id                      = 'arfsubmitbuttonborderwidhtsetting_exs';
	var ac_id                   = id.replace( '_exs', '' );
	var slider_val              = 2;
	var slider_val1             = parseFloat( jQuery.trim( slider_val ) );
	if (value == 'border') {
		jQuery( '.arf_submit_btn' ).removeClass( 'arf_submit_btn_flat' ).removeClass( 'arf_submit_btn_reverse_border' ).addClass( 'arf_submit_btn_border' );
		if (value_slider == 0) {
			jQuery( '#' + slider_id ).trigger( 'mousedown' ).trigger( 'mouseup' );
			jQuery( '#' + slider_id ).trigger( 'slideStop' );
			var submit_border_slider = document.getElementById( 'arflite_btn_border_size' );
			submit_border_slider.noUiSlider.set( slider_val1 );
			jQuery( '#' + ac_id ).val( slider_val1 );
			jQuery( "#" + ac_id ).trigger( 'change' );
		}
	} else if (value == 'reverse border') {
		jQuery( '.arf_submit_btn' ).removeClass( 'arf_submit_btn_flat' ).removeClass( 'arf_submit_btn_border' ).addClass( 'arf_submit_btn_reverse_border' );
		if (value_slider == 0) {
			jQuery( '#' + slider_id ).trigger( 'mousedown' ).trigger( 'mouseup' );
			jQuery( '#' + slider_id ).trigger( 'slideStop' );
			var submit_border_slider = document.getElementById( 'arflite_btn_border_size' );
			submit_border_slider.noUiSlider.set( slider_val1 );
			jQuery( '#' + ac_id ).val( slider_val1 );
			jQuery( "#" + ac_id ).trigger( 'change' );
		}
	} else {
		jQuery( '.arf_submit_btn' ).removeClass( 'arf_submit_btn_reverse_border' ).removeClass( 'arf_submit_btn_border' ).addClass( 'arf_submit_btn_flat' );
	}
}

function arflitetooltipinitialization() {
	var tooltips    = document.getElementsByClassName( 'arftootltip_position' );
	var tooltip_len = tooltips.length;
	if (tooltip_len > 0) {
		var bgcolor   = document.getElementById( 'arf_tooltip_bg_color' ).value;
		var textcolor = document.getElementById( 'arf_tooltip_font_color' ).value;
		var topt      = {
			position: 'top',
			width: 'auto',
			useTitle: false,
			content: DataContent,
			background: bgcolor,
			color: textcolor
		};
		for (var t = 0; t < tooltip_len; t++) {
			var ctooltip    = tooltips[t];
			var DataContent = ctooltip.getAttribute( 'data-content' ) || ctooltip.getAttribute( 'data-title' );
			jQuery( ctooltip ).tipso( 'destroy' );
			topt.content = DataContent;
			jQuery( ctooltip ).tipso( topt );
		}
	}
	var focus_tips     = document.querySelectorAll( ".arf_materialize_form .edit_field_type_radio .arfhelptipfocus, .arf_materialize_form .edit_field_type_checkbox .arfhelptipfocus, .arf_materialize_form .edit_field_type_select .arfhelptipfocus, .arf_materialize_form .edit_field_type_arfslider .arfhelptipfocus" );
	var focus_tips_len = focus_tips.length;
	if (focus_tips_len > 0) {
		var bgcolor   = document.getElementById( 'arf_tooltip_bg_color' ).value;
		var textcolor = document.getElementById( 'arf_tooltip_font_color' ).value;
		var ftopt     = {
			position: 'top',
			width: 'auto',
			useTitle: false,
			background: bgcolor,
			color: textcolor
		};
		for (var f = 0; f < focus_tips_len; f++) {
			var cft         = focus_tips[f];
			var dataContent = cft.getAttribute( 'data-title' );
			if (dataContent != null && typeof dataContent != 'undefined') {
				ftopt.content = dataContent;
				jQuery( cft ).tipso( ftopt );
			}
		}
	}
}

jQuery(document).on('change', '.arf_submit_action', function() {
    var submit_action_id = jQuery(this).attr('id');
    jQuery('.arf_submit_action_inner_container').removeClass('arfactive');
    jQuery('#arf_' + submit_action_id).addClass('arfactive');
    if (submit_action_id != 'success_action_message') {
        jQuery("#arf_display_note_on_success_message").show();
    } else {
        jQuery("#arf_display_note_on_success_message").hide();
    }
});

jQuery( document ).on(
	'change',
	'.arf_enable_disable_post_values',
	function() {
		var post_value_enabled = jQuery( this ).attr( 'id' );
		if (jQuery( '#' + post_value_enabled ).is( ':checked' )) {
			jQuery( '.arf_submit_action_post_values_inner_block' ).css( 'display', 'inline-block' );
		} else {
			jQuery( '.arf_submit_action_post_values_inner_block' ).css( 'display', 'none' );
		}
	}
);
jQuery( document ).on(
	'change',
	'.arf_submit_button_textbox',
	function() {
		var submit_text  = jQuery( this ).val();
		var submit_width = document.getElementById( 'arfsubmitbuttonwidthsetting' ).value;
		if (submit_width == '') {
			jQuery( '#arfsubmitbuttontext2' ).text( submit_text );
			(function($this) {
				setTimeout(
					function() {
						var submit_outer = jQuery( '#arfsubmitbuttontext2' ).outerWidth();
						submit_outer     = (submit_outer + 20);
						jQuery( '#arfsubmitautowidth' ).val( submit_outer );
						$this.parents( '.arf_submit_btn' ).width( 'auto' );
						$this.parents( '.arf_submit_btn' ).width( submit_outer );
						$this.parents( '.arf_submit_btn' ).css( 'min-width', submit_outer + 'px' );
					},
					10
				);
			}(jQuery( this )));
		}
	}
);
jQuery( document ).on(
	'click',
	'#arf_shortcodes_info',
	function() {
		jQuery( ".arf_editor_form_shortcode_list_popup" ).toggleClass( "arfactive" );
	}
);
jQuery( document ).on(
	'click',
	function(event) {
		var hideShortcode = true;
		if (jQuery( event.target ).hasClass( 'arf_editor_shortcode_icon_wrapper' ) || jQuery( event.target ).hasClass( 'arf_editor_form_shortcode_list_popup' )) {
			hideShortcode = false;
		}
		if (jQuery( event.target ).closest( '.arf_editor_form_shortcode_list_popup' ).length > 0) {
			hideShortcode = false;
		}
		if (hideShortcode) {
			jQuery( ".arf_editor_form_shortcode_list_popup" ).removeClass( "arfactive" );
		}
	}
);
jQuery( document ).on(
	'change',
	'#arf_confirmation_summary',
	function() {
		var is_checked = this.checked;
		if (is_checked) {
			jQuery( '.arf_confirmation_summary_inner_block' ).show();
		} else {
			jQuery( '.arf_confirmation_summary_inner_block' ).hide();
		}
	}
);
jQuery( document ).on(
	'keypress',
	'#maxoptsel',
	function(e) {
		var keyCode = e.which ? e.which : e.keyCode;
		var ret     = ((keyCode >= 48 && keyCode <= 57) || keyCode == 8) ? true : false;
		return ret;
	}
);

jQuery( document ).on(
	'keypress',
	'#image_width',
	function(e){
		var keyCode = e.which ? e.which : e.keyCode;
		var ret     = ((keyCode >= 48 && keyCode <= 57) || keyCode == 8) ? true : false;
		return ret;
	}
);

jQuery( document ).on(
	'change',
	'.arf_confirmation_summary_display_control',
	function() {
		var display_summary = jQuery( this ).val();
		if (display_summary == 'before') {
			jQuery( "#arf_confirmation_summary_edit_button_wrapper" ).show();
			jQuery( "#arf_confirmation_summary_confirm_button_wrapper" ).show();
			jQuery( "#arf_confirmation_summary_close_button_wrapper" ).hide();
			jQuery( "#arf_confirmation_summary_note" ).hide();
			jQuery( "#arf_confirmation_summary_allow_print" ).hide();
			jQuery( "#arf_confirmation_summary_print_button_wrapper" ).hide();
		} else {
			jQuery( "#arf_confirmation_summary_edit_button_wrapper" ).hide();
			jQuery( "#arf_confirmation_summary_confirm_button_wrapper" ).hide();
			jQuery( "#arf_confirmation_summary_close_button_wrapper" ).show();
			if (jQuery( "#arf_confirmation_summary_allow_print_input" ).is( ':checked' )) {
				jQuery( "#arf_confirmation_summary_print_button_wrapper" ).show();
			}
			jQuery( "#arf_confirmation_summary_allow_print" ).show();
			jQuery( "#arf_confirmation_summary_note" ).show();
			var success_action = jQuery( 'input[name="options[success_action]"]:checked' ).val();
			if (success_action != 'message') {
				jQuery( '#arf_display_note_on_success_message' ).show();
			} else {
				jQuery( '#arf_display_note_on_success_message' ).hide();
			}
		}
	}
);
jQuery( document ).on(
	'change',
	'#arf_confirmation_summary_allow_print_input',
	function() {
		if (jQuery( this ).is( ':checked' )) {
			jQuery( "#arf_confirmation_summary_print_button_wrapper" ).show();
		} else {
			jQuery( "#arf_confirmation_summary_print_button_wrapper" ).hide();
		}
	}
);

function arflite_strip_tags(string) {
	if (string == '' || typeof string == 'undefined' || string == null) {
		return string;
	}
	return string.replace( /(<([^>]+)>)/ig, "" );
}
jQuery( document ).on(
	'click',
	'.arf_field_radio_reset_wrapper i',
	function() {
		var obj      = jQuery( '.arf_field_values_model.arfactive' );
		var field_id = obj.attr( 'id' ).replace( 'arf_field_values_model_skeleton_', '' );
		jQuery( 'input[name="arf_opt_item_meta[' + field_id + ']"]' ).removeAttr( 'checked' );
	}
);
jQuery( document ).on(
	'click',
	'.arf_field_option_content_cell .arf_field_option_content_cell_input .arf_pre_regex',
	function() {
		if ( ! jQuery( this ).hasClass( 'arf_pre_regex_disable' )) {
			var field_id = jQuery( this ).attr( "data-field-id" );
			var pattern  = jQuery( this ).attr( "data-pattern" );
			jQuery( "#arf_regular_expression_" + field_id ).val( pattern );
		}
	}
);
jQuery( document ).on(
	"click",
	"#arf_sa_data_with_url",
	function() {
		if (jQuery( this ).is( ':checked' )) {
			jQuery( ".arf_submit_action_options.arf_data_with_url_type_wrapper" ).show();
			jQuery( ".arf_submit_action_options.arf_chnge_field_key_container" ).show();
			jQuery( ".arf_submit_action_options.arf_field_list_name" ).show();
		} else {
			jQuery( ".arf_submit_action_options.arf_data_with_url_type_wrapper" ).hide();
			jQuery( ".arf_submit_action_options.arf_chnge_field_key_container" ).hide();
			jQuery( ".arf_submit_action_options.arf_field_list_name" ).hide();
		}
	}
);
jQuery( document ).on(
	"click",
	"#arf_sa_data_key_with_url",
	function() {
		if (jQuery( this ).is( ':checked' )) {
			jQuery( ".arf_submit_action_options.arf_field_list_name" ).show();
		} else {
			jQuery( ".arf_submit_action_options.arf_field_list_name" ).hide();
		}
	}
);
var scroll_bottom = 0;

jQuery( document ).on(
	'change',
	'#arf_frm_privacy_guidline',
	function() {
		if (this.checked) {
			jQuery( 'tr.arf_privacy_guidline' ).show();
		} else {
			jQuery( 'tr.arf_privacy_guidline' ).hide();
		}
	}
);

function arflite_update_form_bg_position(obj, axis, id, bg_div_id) {

	if (jQuery( obj ).val() != "px") {
		jQuery( "#" + id ).css( "display", "none" );
		var position = jQuery( obj ).val();
		jQuery( "#" + bg_div_id ).css( 'background-position-' + axis, position );
		jQuery( obj ).parents( ".arf_accordion_container_row" ).removeClass( "arf_bg_position_active_height" );
		jQuery( obj ).parents( ".arf_accordion_container_row" ).addClass( "arf_bg_position_inactive_height" );
	} else {
		if (jQuery( obj ).val() == "px") {
			jQuery( "#" + id ).css( "display", 'block' );
			jQuery( obj ).parents( ".arf_accordion_container_row" ).removeClass( "arf_bg_position_inactive_height" );
			jQuery( obj ).parents( ".arf_accordion_container_row" ).addClass( "arf_bg_position_active_height" );
		} else {
			jQuery( "#" + id ).css( "display", "none" );
			jQuery( obj ).parents( ".arf_accordion_container_row" ).removeClass( "arf_bg_position_active_height" );
			jQuery( obj ).parents( ".arf_accordion_container_row" ).addClass( "arf_bg_position_inactive_height" );
		}
	}
}

function arflite_set_form_bg_position(obj, axis, bg_div_id) {
	var position = jQuery( obj ).val();
	jQuery( "#" + bg_div_id ).css( 'background-position-' + axis, position + "px" );
}
jQuery( document ).on(
	'click',
	'.arf_failed_sample_popup_container_close',
	function() {
		jQuery( '.arf_failed_sample_popup_container' ).parent().removeClass( 'arfactive' );
	}
);

jQuery( document ).on(
	'click',
	'.arf_sample_popup_button',
	function() {
		jQuery( '.arf_failed_sample_popup_container' ).parent().removeClass( 'arfactive' );
	}
);

jQuery( document ).on(
	'click',
	'.arf_file_remove',
	function() {
		var entry_id = jQuery( this ).data( 'entry-id' );
		var field_id = jQuery( this ).data( 'id' );
		var file_id  = jQuery( this ).data( 'file' );
		if (entry_id && field_id && file_id) {
			if (jQuery('.delete_entry_message_' + file_id).length === 0) {
				var delete_popup_html = '';
				delete_popup_html    += '<div class="delete_popup delete_entry_popup arfactive arflite_file_uplaod_delmsg-div delete_entry_message_' + file_id + '" id="delete_form_message">';
				delete_popup_html    += '<input type="hidden" value="' + file_id + '" id="delete_entry_id"/>';
				delete_popup_html    += '<div class="delete_column_arrow"></div>';
				delete_popup_html    += '<div class="delete_title"><div class="delete_confirm_message">' + __ARF_DEL_FILE_MSG + '</div>';
				delete_popup_html    += '<div class="delete_popup_footer">';
				delete_popup_html    += '<button type="button" class="rounded_button add_button arf_delete_modal_left arfdelete_color_red" onclick="arfliteentry_file_actionfunc(' + entry_id + ',' + field_id + ',' + file_id + ');">' + __ARF_DELETE_TEXT + '</button>&nbsp;&nbsp;';
				delete_popup_html    += '<button type="button" class="rounded_button delete_button arfdelete_color_gray" onclick="arflite_file_delete_close_popup_entry(' + file_id + ');">' + __ARF_CANCEL_TEXT + '</button>';
				delete_popup_html    += '</div>';
				delete_popup_html    += '</div>';
				delete_popup_html    += '</div>';
				var select_content    = jQuery( '.arf_deletable_entry_icon_wrapper.arf_file_inner_' + file_id );
				jQuery( delete_popup_html ).insertAfter( select_content );
			}
			jQuery( '.delete_entry_message_' + file_id ).show();

		}

	}
);

window.randomCounter = 0;

function arflite_generate_field_id(field_id, forceGenerate) {
	if (typeof forceGenerate == 'undefined') {
		forceGenerate = false;
	}
	if (typeof field_id == 'undefined' || true == forceGenerate) {
		if (window.randomCounter > 25) {
			field_id = Math.floor( Math.random() * (100000 - 10000 + 1) + 10000 );
		} else {
			field_id = Math.floor( Math.random() * (10000 - 1000 + 1) + 1000 );
		}
	}

	if (jQuery( '#arf_field_' + field_id ).length > 0) {
		window.randomCounter++;
		return arflite_generate_field_id( field_id, true );
	}

	window.randomCounter = 0;
	return field_id;

}

function arflite_close_image(image_name) {
	if (image_name == 'button_hover_image') {
		if (jQuery( '#submit_hover_btn_img_div' ).find( '.arf_delete_image' ).length > 0) {
			jQuery( '#submit_hover_btn_img_div' ).find( '.arf_delete_image' ).remove();
		}
	} else if (image_name == 'button_image') {
		if (jQuery( '#submit_btn_img_div' ).find( '.arf_delete_image' ).length > 0) {
			jQuery( '#submit_btn_img_div' ).find( '.arf_delete_image' ).remove();
		}
	} else if (image_name == 'form_image') {
		if (jQuery( '#form_bg_img_div' ).find( '.arf_delete_image' ).length > 0) {
			jQuery( '#form_bg_img_div' ).find( '.arf_delete_image' ).remove();
		}
	}
}

function arflite_delete_image(image_name) {
	var html = '';
	var msg  = '';
	if (image_name == 'form_image') {
		msg   = __ARFLITE_DEL_IMG_MSG;
		event = 'arflite_remove_image("delete_form_bg_img")';
	} else if (image_name == 'button_hover_image') {
		msg   = __ARFLITE_DEL_IMG_MSG;
		event = 'arflite_remove_image("delete_submit_hover_bg_img")';
	} else if (image_name == 'button_image') {
		msg   = __ARFLITE_DEL_IMG_MSG;
		event = 'arflite_remove_image("delete_submit_bg_img")';
	}
	html += '<div class="delete_popup arfactive arf_delete_image arf-delimage-popup" id="arf_delete_image">';
	html += '<div class="delete_column_arrow">';
	html += '</div>';
	html += '<div class="delete_title"><div class="delete_confirm_message">' + msg + '</div>';
	html += '<div class="delete_popup_footer"><button type="button" class="rounded_button add_button arf_delete_modal_left arfdelete_color_red" onclick=' + event + '>' + __ARF_DELETE_TEXT + '</button>';
	html += '<button type="button" class="rounded_button delete_button arfdelete_color_gray" onclick="arflite_close_image(\'' + image_name + '\')">' + __ARF_CANCEL_TEXT + '</button>';
	html += '</div>';
	html += '</div>';
	html += '</div>';
	if (image_name == 'button_hover_image') {
		var select_content = '#submit_hover_btn_img_div span';
		if (jQuery( '#submit_hover_btn_img_div' ).find( '.arf_delete_image' ).length > 0) {
			jQuery( '#submit_hover_btn_img_div' ).find( '.arf_delete_image' ).remove();
		}
		jQuery( html ).insertAfter( select_content );
		jQuery( '.arf_delete_image' ).show();
	} else if (image_name == 'button_image') {
		var select_content = '#submit_btn_img_div span';
		if (jQuery( '#submit_btn_img_div' ).find( '.arf_delete_image' ).length > 0) {
			jQuery( '#submit_btn_img_div' ).find( '.arf_delete_image' ).remove();
		}
		jQuery( html ).insertAfter( select_content );
		jQuery( '.arf_delete_image' ).show();
	} else if (image_name == 'form_image') {
		var select_content = '#form_bg_img_div span';
		if (jQuery( '#form_bg_img_div' ).find( '.arf_delete_image' ).length > 0) {
			jQuery( '#form_bg_img_div' ).find( '.arf_delete_image' ).remove();
		}
		jQuery( html ).insertAfter( select_content );
		jQuery( '.arf_delete_image' ).show();
	}

}

function arflitefrmSetPosClass(value) {

	if (value == 'none') {
		value = 'none';
	}
	if (jQuery( '#arfhidelabels' ).val() == '1' || jQuery( '#arfhidelabels' ).is( ':checked' )) {
		value = 'none';
	}
	if (value == 'top') {
		var form_id = jQuery( '#id' ).val();
		jQuery( '#arf_' + form_id + '_label_width' ).remove();

		jQuery( "#arfmainformwidthsetting" ).attr( 'readonly', true );
		jQuery( '.inplace_field' ).trigger( 'keyup' );
	} else {
		jQuery( "#arfmainformwidthsetting" ).attr( 'readonly', false );
		jQuery( '.inplace_field' ).parents( '.arf_main_label' ).removeAttr( 'style' );
		jQuery( '#arfmainformwidthsetting' ).trigger( 'change' );
	}

	jQuery( "#arfmainformeditorcontainer" ).find( 'div.arfformfield' ).removeClass( 'top_container none_container left_container right_container' ).addClass( value + '_container' );
	jQuery( "#arfmainformeditorcontainer" ).find( 'div.arf_heading_div h2' ).removeClass( 'pos_top pos_none pos_left pos_right' ).addClass( 'pos_' + value );
	jQuery( "#arfmainformeditorcontainer" ).find( 'div.arf_submit_div' ).removeClass( 'top_container none_container left_container right_container' ).addClass( value + '_container' );
}

function arflite_change_form_title() {

	if (jQuery( '#display_title_form' ).is( ':checked' )) {
		jQuery( '#display_title_form' ).val( '1' );
		jQuery( '#form_title_style_div' ).show();
	} else {
		jQuery( '#display_title_form' ).val( '0' );
		jQuery( '#form_title_style_div' ).hide();
	}

	if (document.getElementById( "display_title_form" ).value == '0') {
		var value = 'none';
	} else {
		var value = 'block';
	}
	jQuery( "#arfmainformeditorcontainer" ).find( '.arftitlediv' ).css( 'display', value );
}

function arflite_change_form_bg_img() {
	var arf_bg_position_x       = jQuery( '#arf_bg_position_x' ).val();
	var arf_bg_position_y       = jQuery( "#arf_bg_position_y" ).val();
	var arf_bg_position_input_x = jQuery( "#arf_form_bg_position_input_x" ).val();
	var arf_bg_position_input_y = jQuery( "#arf_form_bg_position_input_y" ).val();
	var position_style          = '';

	if (arf_bg_position_y != '' && arf_bg_position_y != 'px') {
		position_style += 'background-position-y: ' + arf_bg_position_y + ";";
	} else if (arf_bg_position_y != '' && arf_bg_position_y == 'px') {
		position_style += 'background-position-y: ' + arf_bg_position_input_y + "px;";
	}

	if (arf_bg_position_x != '' && arf_bg_position_x != 'px') {
		position_style += 'background-position-x: ' + arf_bg_position_x + ";";
	} else if (arf_bg_position_x != '' && arf_bg_position_x == 'px') {
		position_style += 'background-position-x: ' + arf_bg_position_input_x + "px;";
	}
	var upload_css_url = jQuery( "#arflite_upload_css_url" ).val();
	var img            = jQuery( '#imagename_form' ).val();
	var image          = upload_css_url + img;
	jQuery( "#ajax_form_loader" ).removeAttr( 'style' );
	jQuery( "#ajax_form_loader" ).hide();
	var msg = "<input type='hidden' name='arfmfbi' onClick='arflite_clear_file_submit();' value='" + image + "' id='arfmainform_bg_img' />";
	msg    += "<img src='" + image + "' height='35' width='35' class='arf_form-bgimg' />&nbsp;";
	msg    += "<span onclick='arflite_delete_image(\"form_image\");' class='arf_form-bgimg-span'>";
	msg    += "<svg width='23px' height='27px' viewBox='0 0 30 30'>";
	msg    += "<path xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd' fill='#4786FF' d='M19.002,4.351l0.007,16.986L3.997,21.348L3.992,4.351H1.016V2.38  h1.858h4.131V0.357h8.986V2.38h4.146h1.859l0,0v1.971H19.002z M16.268,4.351H6.745H5.993l0.006,15.003h10.997L17,4.351H16.268z   M12.01,7.346h1.988v9.999H12.01V7.346z M9.013,7.346h1.989v9.999H9.013V7.346z' />";
	msg    += "</svg>";
	msg    += "</span>";
	jQuery( '#form_bg_img_div' ).html( msg );
	var form_id   = jQuery( "#id" ).val();
	var $class    = ".arflite_main_div_" + form_id + " .arf_fieldset";
	var $property = "background-image";
	var $style    = jQuery( $class ).attr( "style" );
	if (typeof $style != 'undefined') {
		if (/(background\-image\:(.*?)\;)/g.test( $style )) {
			$style = $style.replace( /(background\-image\:(.*?)\;)/g, '' );
		}
		if (/(background\-position\:(.*?)\;)/g.test( $style )) {
			$style = $style.replace( /(background\-position\:(.*?)\;)/g, '' );
		}
		if (/(background\-position\-x\:(.*?)\;)/g.test( $style )) {
			$style = $style.replace( /(background\-position\-x\:(.*?)\;)/g, '' );
		}
		if (/(background\-position\-y\:(.*?)\;)/g.test( $style )) {
			$style = $style.replace( /(background\-position\-y\:(.*?)\;)/g, '' );
		}
		if (/(background\-repeat\:(.*?)\;)/g.test( $style )) {
			$style = $style.replace( /(background\-repeat\:(.*?)\;)/g, '' );
		}
		$style = $style + 'background-image:url(' + image + ') !important;' + position_style + 'background-repeat:no-repeat !important;';
		jQuery( $class ).attr( 'style', $style );
	} else {
		$style = 'background-image:url(' + image + ') !important;' + position_style + 'background-repeat:no-repeat !important;';
		jQuery( $class ).attr( 'style', $style );
	}
}

function arflite_change_submit_img() {
	var upload_css_url = jQuery( "#arflite_upload_css_url" ).val();
	var img            = jQuery( '#imagename' ).val();
	var image          = upload_css_url + img;
	jQuery( "#ajax_submit_loader" ).hide();
	jQuery( "#ajax_submit_loader" ).removeAttr( "style" );
	var msg = "<input type='hidden' name='arfsbis' onClick='arflite_clear_file_submit();' value='" + image + "' id='arfsubmitbuttonimagesetting' />";
	msg    += "<img src='" + image + "' height='35' width='35' class='arflite-submit-bgimg' />&nbsp;";
	msg    += "<span onclick='arflite_delete_image(\"button_image\");' class='arflite-submit-bgimg-span'>";
	msg    += "<svg width='23px' height='27px' viewBox='0 0 30 30'>";
	msg    += "<path xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd' fill='#4786FF' d='M19.002,4.351l0.007,16.986L3.997,21.348L3.992,4.351H1.016V2.38  h1.858h4.131V0.357h8.986V2.38h4.146h1.859l0,0v1.971H19.002z M16.268,4.351H6.745H5.993l0.006,15.003h10.997L17,4.351H16.268z   M12.01,7.346h1.988v9.999H12.01V7.346z M9.013,7.346h1.989v9.999H9.013V7.346z' />";
	msg    += "</svg>";
	msg    += "</span>";
	jQuery( '#submit_btn_img_div' ).html( msg );
	var form_id        = jQuery( "#id" ).val();
	var $class         = ".arflite_main_div_" + form_id + " .arfsubmitbutton .arf_submit_btn";
	var $property      = "background-image";
	var $style         = jQuery( $class ).attr( "style" );
	var width_button   = jQuery( '#arfsubmitbuttonwidthsetting' ).val();
	var button_height  = jQuery( '#arfsubmitbuttonheightsetting' ).val();
	var border_size    = jQuery( "#arfsubmitbuttonborderwidhtsetting" ).val();
	var xoffset_shadow = jQuery( "#arfsubmitbuttonxoffsetsetting" ).val();
	var blur_shadow    = jQuery( "#arfsubmitbuttonblursetting" ).val();
	var yoffset_shadow = jQuery( "#arfsubmitbuttonyoffsetsetting" ).val();
	var border_radius  = jQuery( "#arfsubmitbuttonborderradiussetting" ).val();
	var spread_shadow  = jQuery( "#arfsubmitbuttonshadowsetting" ).val();
	var button_shadow  = jQuery( "#arfsubmitbtnshadow" ).val();
	var inpstyle       = jQuery( '#arfmainforminputstyle' ).val();

	if (inpstyle == 'material') {
		var input_style_class = '.arf_materialize_form';
	} else if (inpstyle == 'standard') {
		var input_style_class = '.arf_standard_form';
	} else if (inpstyle == 'rounded') {
		var input_style_class = '.arf_rounded_form';
	}

	if (typeof $style != 'undefined') {
		if (/(background\-image\:(.*?)\;)/g.test( $style )) {
			$style = $style.replace( /(background\-image\:(.*?)\;)/g, '' );
		}
		if (/(background\-position\:(.*?)\;)/g.test( $style )) {
			$style = $style.replace( /(background\-position\:(.*?)\;)/g, '' );
		}
		if (/(background\-repeat\:(.*?)\;)/g.test( $style )) {
			$style = $style.replace( /(background\-repeat\:(.*?)\;)/g, '' );
		}
		$style = $style + 'background-image:url(' + image + ') !important;background-position:top left;background-repeat:no-repeat !important;width:' + width_button + 'px;height:' + button_height + 'px;border-width:' + border_size + 'px !important;border-radius:' + border_radius + 'px !important;';
	} else {
		$style = 'background-image:url(' + image + ') !important;background-position:top left;background-repeat:no-repeat !important;width:' + width_button + 'px;height:' + button_height + 'px;border-width:' + border_size + 'px !important;border-radius:' + border_radius + 'px !important;';
	}
	jQuery( ".arflite_main_div_" + form_id + " .arfsubmitbutton .arf_submit_btn .arf_edit_in_place_input" ).css( 'display', 'none' );
	var submitBtnHoverImg = jQuery( "input[name='arfsbhis']" ).val();
	if (submitBtnHoverImg != '') {
		var aStyle = jQuery( ".arflite_main_div_" + form_id + " .arf_fieldset .arf_submit_btn" ).attr( 'style' );
		if (typeof aStyle != 'undefined') {
			if (/(background\-image\:(.*?)\;)/gi.test( aStyle )) {
				nStyle        = aStyle.replace( /(background\-image\:(.*?)\;)/gi, '' );
				var hStyle    = nStyle + 'background-image:url(' + submitBtnHoverImg + ') !important;';
				var $aStyle   = nStyle + 'background-image:url(' + image + ') !important;';
				var mouseOver = "jQuery(this).attr('style','" + hStyle + "');";
				var mouseOut  = "jQuery(this).attr('style','" + $aStyle + "');";
			}
		} else {
			var mouseOver = "jQuery(this).attr('style','background-image:url(" + submitBtnHoverImg + ") !important;width:" + width_button + "px;height:" + button_height + "px;');"
			var mouseOut  = "jQuery(this).attr('style','background-image:url(" + image + ") !important;width:" + width_button + "px;height:" + button_height + "px;')";
		}
	}

	if (image != '') {
		if (jQuery( '#arflite_main_div_' + form_id + '_submit_button' ).length > 0) {
			jQuery( '#arflite_main_div_' + form_id + '_submit_button' ).remove();
		}
		var btn_style_define = '<style id="arflite_main_div_' + form_id + '_submit_button">';
		btn_style_define    += '.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn.arf_submit_btn_border,.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn.arf_submit_btn_flat,.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn.arf_submit_btn_reverse_border{ background-image:url(' + image + ') !important;background-position:top left; }';

		btn_style_define += '.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn.arf_submit_btn_flat{box-shadow:' + xoffset_shadow + 'px ' + yoffset_shadow + 'px ' + blur_shadow + 'px ' + spread_shadow + 'px ' + button_shadow + '}';

		btn_style_define += '</style>';
		jQuery( "body" ).append( btn_style_define );
	}

	if (submitBtnHoverImg != '' && image != '') {
		if (jQuery( '#arflite_main_div_' + form_id + '_submit_hover_button' ).length > 0) {
			jQuery( '#arflite_main_div_' + form_id + '_submit_hover_button' ).remove();
		}
		var btn_style_hover_define = '<style id="arflite_main_div_' + form_id + '_submit_hover_button">';
		btn_style_hover_define    += '.arflite_main_div_' + form_id + ' .arf_fieldset .arf_submit_btn:hover,.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn:hover.arf_submit_btn_border,.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn:hover.arf_submit_btn_flat,.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn:hover.arf_submit_btn_reverse_border{ background-image:url(' + submitBtnHoverImg + ') !important;background-position:top left; }';
		btn_style_define          += '.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn:hover.arf_submit_btn_flat{box-shadow:' + xoffset_shadow + 'px ' + yoffset_shadow + 'px ' + blur_shadow + 'px ' + spread_shadow + 'px ' + button_shadow + '}';
		btn_style_hover_define    += '</style>';

		jQuery( "body" ).append( btn_style_hover_define );
	}
}

function arflite_change_submit_hover_img() {
	var upload_css_url = jQuery( "#arflite_upload_css_url" ).val();
	var img            = jQuery( '#imagename_submit_hover' ).val();
	var inpstyle       = jQuery( '#arfmainforminputstyle' ).val();

	if (inpstyle == 'material') {
		var input_style_class = '.arf_materialize_form';
	} else if (inpstyle == 'standard') {
		var input_style_class = '.arf_standard_form';
	} else if (inpstyle == 'rounded') {
		var input_style_class = '.arf_rounded_form';
	}
	var image = upload_css_url + img;
	var arflite_wp_nonce = jQuery('#arflite_validation_nonce').val();
	jQuery.ajax(
		{
			type: "POST",
			url: ajaxurl,
			data: "action=arflite_upload_submit_hover_bg&image=" + image + "&_wpnonce_arflite=" + arflite_wp_nonce,
			success: function(msg) {
				var submitBgImg      = jQuery( "input[name='arfsbis']" ).val();
				var submitBgHoverImg = image;
				var form_id          = jQuery( '#id' ).val();
				if (submitBgImg != '') {
					var aStyle = jQuery( ".arflite_main_div_" + form_id + " .arf_fieldset .arf_submit_btn" ).attr( 'style' );
					if (typeof aStyle != 'undefined') {
						if (/(background\-image\:(.*?)\;)/gi.test( aStyle )) {
							nStyle        = aStyle.replace( /(background\-image\:(.*?)\;)/gi, '' );
							var hStyle    = nStyle + 'background-image:url(' + submitBgHoverImg + ') !important;';
							var $aStyle   = nStyle + 'background-image:url(' + submitBgImg + ') !important;';
							var mouseOver = "jQuery(this).attr('style','" + hStyle + "');";
							var mouseOut  = "jQuery(this).attr('style','" + $aStyle + "');";
						}
					} else {
						var mouseOver = "jQuery(this).attr('style','background-image:url(" + submitBgHoverImg + ") !important;');"
						var mouseOut  = "jQuery(this).attr('style','background-image:url(" + submitBgImg + ") !important;')";
					}
				}
				if (submitBgImg != '') {
					if (jQuery( '#arflite_main_div_' + form_id + '_submit_button' ).length > 0) {
						jQuery( '#arflite_main_div_' + form_id + '_submit_button' ).remove();
					}
					var btn_style_define = '<style id="arflite_main_div_' + form_id + '_submit_button">';
					btn_style_define    += '.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn.arf_submit_btn_border,.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn.arf_submit_btn_flat,.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn.arf_submit_btn_reverse_border{ background-image:url(' + submitBgImg + ') !important;background-position:top left;}';
					btn_style_define    += '</style>';
					jQuery( "body" ).append( btn_style_define );
				}

				if (submitBgHoverImg != '' && submitBgImg != undefined && submitBgImg != '') {

					if (jQuery( '#arflite_main_div_' + form_id + '_submit_hover_button' ).length > 0) {
						jQuery( '#arflite_main_div_' + form_id + '_submit_hover_button' ).remove();
					}
					var btn_style_hover_define = '<style id="arflite_main_div_' + form_id + '_submit_hover_button">';
					btn_style_hover_define    += '.arflite_main_div_' + form_id + ' .arf_fieldset .arf_submit_btn:hover,.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn:hover.arf_submit_btn_border,.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn:hover.arf_submit_btn_flat,.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn:hover.arf_submit_btn_reverse_border{ background-image:url(' + submitBgHoverImg + ') !important;background-position:top left;background-repeat:no-repeat !important; }';
					btn_style_hover_define    += '</style>';
					jQuery( "body" ).append( btn_style_hover_define );
				}
				jQuery( "#ajax_submit_hover_loader" ).removeAttr( "style" );
				jQuery( "#ajax_submit_hover_loader" ).hide();
				jQuery( '#submit_hover_btn_img_div' ).html( msg );
			}

		}
	);
}

function arflite_remove_image(image_name) {
	var browser_info = JSON.parse( jQuery( "#arflite_browser_info" ).val() );
	var inpstyle     = jQuery( '#arfmainforminputstyle' ).val();

	if (inpstyle == 'material') {
		var input_style_class = '.arf_materialize_form';
	} else if (inpstyle == 'standard') {
		var input_style_class = '.arf_standard_form';
	} else if (inpstyle == 'rounded') {
		var input_style_class = '.arf_rounded_form';
	}

	var form_id = jQuery( '#id' ).val();
	if (image_name == 'delete_submit_bg_img') {
		var arf_bg_position_x       = jQuery( '#arf_bg_position_x' ).val();
		var arf_bg_position_y       = jQuery( "#arf_bg_position_y" ).val();
		var arf_bg_position_input_x = jQuery( "#arf_form_bg_position_input_x" ).val();
		var arf_bg_position_input_y = jQuery( "#arf_form_bg_position_input_y" ).val();
		var position_style          = '';

		if (arf_bg_position_y != '' && arf_bg_position_y != 'px') {
			position_style += 'background-position-y: ' + arf_bg_position_y + ";";
		} else if (arf_bg_position_y != '' && arf_bg_position_y == 'px') {
			position_style += 'background-position-y: ' + arf_bg_position_input_y + "px;";
		}

		if (arf_bg_position_x != '' && arf_bg_position_x != 'px') {
			position_style += 'background-position-x: ' + arf_bg_position_x + ";";
		} else if (arf_bg_position_x != '' && arf_bg_position_x == 'px') {
			position_style += 'background-position-x: ' + arf_bg_position_input_x + "px;";
		}

		jQuery( "#arflite_main_div_" + form_id + "_submit_button" ).remove();
		var define_style = '<style id="arflite_main_div_' + form_id + '_submit_button">';
		define_style    += '.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn.arf_submit_btn_border,.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn.arf_submit_btn_flat,.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn.arf_submit_btn_reverse_border{background-image:none !important;' + position_style + 'background-repeat:no-repeat !important;}';
		define_style    += '</style>';
		jQuery( 'body' ).append( define_style );

		if (jQuery( "#arflite_main_div_" + form_id + "_submit_hover_button" ).length >= 0) {
			jQuery( "#arflite_main_div_" + form_id + "_submit_hover_button" ).remove();
			var define_hover_style = '<style id="arflite_main_div_' + form_id + '_submit_hover_button">';
			define_hover_style    += '.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn:hover.arf_submit_btn_border,.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn:hover.arf_submit_btn_flat,.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn:hover.arf_submit_btn_reverse_border{background-image:none !important;' + position_style + 'background-repeat:no-repeat !important;}';
			define_hover_style    += '</style>';
			jQuery( 'body' ).append( define_hover_style );
		}
		$style = jQuery( ".arflite_main_div_" + form_id + " .arfsubmitbutton .arf_submit_btn" ).attr( 'style' );
		jQuery( ".arflite_main_div_" + form_id + " .arfsubmitbutton .arf_submit_btn .arf_edit_in_place_input" ).css( 'display', 'block' );
		var msg = "<div class='arfajaxfileupload'> ";
		msg    += "<div class='arf_form_style_file_upload_icon'>";
		msg    += "<svg width='16' height='18' viewBox='0 0 18 20' fill='#ffffff'><path xmlns='http://www.w3.org/2000/svg' d='M15.906,18.599h-1h-12h-1h-1v-7h2v5h12v-5h2v7H15.906z M13.157,7.279L9.906,4.028v8.571c0,0.552-0.448,1-1,1c-0.553,0-1-0.448-1-1v-8.54l-3.22,3.22c-0.403,0.403-1.058,0.403-1.46,0 c-0.403-0.403-0.403-1.057,0-1.46l4.932-4.932c0.211-0.211,0.488-0.306,0.764-0.296c0.275-0.01,0.553,0.085,0.764,0.296 l4.932,4.932c0.403,0.403,0.403,1.057,0,1.46S13.561,7.682,13.157,7.279z'/></svg>";
		msg    += "</div>";
		msg    += "<input type='file' name='submit_btn_img' id='submit_btn_img' class='original arflite_submit_btn_img' />";
		msg    += "</div>";
		msg    += "<input type='hidden' name='imagename' id='imagename' value='' />";
		jQuery( '#submit_btn_img_div' ).html( msg );
	} else if (image_name == 'delete_form_bg_img') {
		var arf_bg_position_x       = jQuery( '#arf_bg_position_x' ).val();
		var arf_bg_position_y       = jQuery( "#arf_bg_position_y" ).val();
		var arf_bg_position_input_x = jQuery( "#arf_form_bg_position_input_x" ).val();
		var arf_bg_position_input_y = jQuery( "#arf_form_bg_position_input_y" ).val();
		var position_style          = '';

		if (arf_bg_position_y != '' && arf_bg_position_y != 'px') {
			position_style += 'background-position-y: ' + arf_bg_position_y + ";";
		} else if (arf_bg_position_y != '' && arf_bg_position_y == 'px') {
			position_style += 'background-position-y: ' + arf_bg_position_input_y + "px;";
		}

		if (arf_bg_position_x != '' && arf_bg_position_x != 'px') {
			position_style += 'background-position-x: ' + arf_bg_position_x + ";";
		} else if (arf_bg_position_x != '' && arf_bg_position_x == 'px') {
			position_style += 'background-position-x: ' + arf_bg_position_input_x + "px;";
		}

		var $style = jQuery( ".arflite_main_div_" + form_id + " .arf_fieldset" ).attr( 'style' );
		if (typeof $style == 'undefined') {
			$style = "background-image:none !important;" + position_style + "background-repeat:no-repeat !important;";
		} else {
			$style = $style + "background-image:none !important;" + position_style + "background-repeat:no-repeat !important;";
		}
		jQuery( ".arflite_main_div_" + form_id + " .arf_fieldset" ).attr( 'style', $style );
		var msg = "<div class='arfajaxfileupload'>";
		msg    += "<div class='arf_form_style_file_upload_icon'>";
		msg    += "<svg width='16' height='18' viewBox='0 0 18 20' fill='#ffffff'><path xmlns='http://www.w3.org/2000/svg' d='M15.906,18.599h-1h-12h-1h-1v-7h2v5h12v-5h2v7H15.906z M13.157,7.279L9.906,4.028v8.571c0,0.552-0.448,1-1,1c-0.553,0-1-0.448-1-1v-8.54l-3.22,3.22c-0.403,0.403-1.058,0.403-1.46,0 c-0.403-0.403-0.403-1.057,0-1.46l4.932-4.932c0.211-0.211,0.488-0.306,0.764-0.296c0.275-0.01,0.553,0.085,0.764,0.296 l4.932,4.932c0.403,0.403,0.403,1.057,0,1.46S13.561,7.682,13.157,7.279z'/></svg>";
		msg    += "</div>";
		msg    += "<input type='file' name='form_bg_img' id='form_bg_img' data-val='form_bg' class='original arflite_form_bg_img-input' />";
		msg    += "</div>";
		msg    += "<input type='hidden' name='imagename_form' id='imagename_form' value='' />";
		msg    += "<input type='hidden' name='arfmfbi' onClick='arflite_clear_file_submit();' value='' id='arfmainform_bg_img' /> ";
		jQuery( '#form_bg_img_div' ).html( msg );
	} else if (image_name == 'delete_submit_hover_bg_img') {
		var arf_bg_position_x       = jQuery( '#arf_bg_position_x' ).val();
		var arf_bg_position_y       = jQuery( "#arf_bg_position_y" ).val();
		var arf_bg_position_input_x = jQuery( "#arf_form_bg_position_input_x" ).val();
		var arf_bg_position_input_y = jQuery( "#arf_form_bg_position_input_y" ).val();
		var position_style          = '';

		if (arf_bg_position_y != '' && arf_bg_position_y != 'px') {
			position_style += 'background-position-y: ' + arf_bg_position_y + ";";
		} else if (arf_bg_position_y != '' && arf_bg_position_y == 'px') {
			position_style += 'background-position-y: ' + arf_bg_position_input_y + "px;";
		}

		if (arf_bg_position_x != '' && arf_bg_position_x != 'px') {
			position_style += 'background-position-x: ' + arf_bg_position_x + ";";
		} else if (arf_bg_position_x != '' && arf_bg_position_x == 'px') {
			position_style += 'background-position-x: ' + arf_bg_position_input_x + "px;";
		}

		var form_id = jQuery( '#id' ).val();
		jQuery( "#arflite_main_div_" + form_id + "_submit_hover_button" ).remove();
		var define_hover_style = '<style id="arflite_main_div_' + form_id + '_submit_hover_button">';
		define_hover_style    += '.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn:hover.arf_submit_btn_border,.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn:hover.arf_submit_btn_flat,.arflite_main_div_' + form_id + ' ' + input_style_class + ' .arfsubmitbutton .arf_greensave_button_wrapper .arf_submit_btn:hover.arf_submit_btn_reverse_border{background-image:none !important;' + position_style + 'background-repeat:no-repeat !important;}';
		define_hover_style    += '</style>';
		jQuery( 'body' ).append( define_hover_style );
		var msg = "<input type='hidden' name='arfsbhis' onClick='arflite_clear_file_submit_hover();' value='' id='arfsubmithoverbuttonimagesetting' />";
		msg    += "<div class='arfajaxfileupload'>";
		msg    += "<div class='arf_form_style_file_upload_icon'>";
		msg    += "<svg width='16' height='18' viewBox='0 0 18 20' fill='#ffffff'><path xmlns='http://www.w3.org/2000/svg' d='M15.906,18.599h-1h-12h-1h-1v-7h2v5h12v-5h2v7H15.906z M13.157,7.279L9.906,4.028v8.571c0,0.552-0.448,1-1,1c-0.553,0-1-0.448-1-1v-8.54l-3.22,3.22c-0.403,0.403-1.058,0.403-1.46,0 c-0.403-0.403-0.403-1.057,0-1.46l4.932-4.932c0.211-0.211,0.488-0.306,0.764-0.296c0.275-0.01,0.553,0.085,0.764,0.296 l4.932,4.932c0.403,0.403,0.403,1.057,0,1.46S13.561,7.682,13.157,7.279z'/></svg>";
		msg    += "</div>";
		msg    += "<input type='file' name='submit_hover_btn_img' id='submit_hover_btn_img' data-val='submit_hover_bg' class='original arflite_submit_hover_btn_img' />";
		msg    += "</div>";
		msg    += "<input type='hidden' name='imagename_submit_hover' id='imagename_submit_hover' value='' />";
		jQuery( '#submit_hover_btn_img_div' ).html( msg );
	}

}

function arfliteShowColorSelect(checkradiosty) {
	var inputstyle = jQuery( "#arfmainforminputstyle" ).val();
	if (checkradiosty != "custom") {
		jQuery( '#check_radio_main_color' ).show();
		jQuery( '#check_radio_main_icon' ).hide();
	} else {
		jQuery( '#check_radio_main_color' ).hide();
		if (checkradiosty == "custom") {
			jQuery( '#check_radio_main_icon' ).show();
			if (inputstyle == 'rounded') {
				jQuery( "#arf_field_check_radio_wrapper" ).find( '.arf_radio_wrapper' ).css( 'display', 'none' );
			} else {
				jQuery( "#arf_field_check_radio_wrapper" ).find( '.arf_radio_wrapper' ).css( 'display', 'block' );
			}
		} else {
			jQuery( '#check_radio_main_icon' ).hide();
		}
	}
}

function frmsetfieldtransparancy() {
	if (jQuery( "input[name=arfmfo]:checkbox:checked" ).val() == 0) {
		jQuery( "input[name=arfmfo]:checkbox" ).val( '1' ).trigger( 'change' );
	} else {
		jQuery( "input[name=arfmfo]:checkbox" ).val( '0' ).trigger( 'change' );
	}
}

function arf_change_error_type() {
	var value   = jQuery( 'input[name="arfest"]:checked' ).val();
	var form_id = jQuery( '#id' ).val();
	jQuery( '#testiframe' ).contents().find( 'form [data-id="arflite_form_tooltip_error_' + form_id + '"]' ).val( value );
	if (value == "advance") {
		jQuery( "#showadvanceposition" ).css( "display", 'block' );
		jQuery( "#color_palate_advance" ).css( "display", 'block' );
		jQuery( "#color_palate_normal" ).css( "display", 'none' );
		jQuery( '#testiframe' ).contents().find( '.popover' ).remove();
		if (jQuery( '#testiframe' ).contents().find( 'input,textarea,select' ).hasClass( "arf_required" )) {
			jQuery( '#testiframe' ).contents().find( '.arf_submit_btn' ).trigger( 'click' );
		}
	} else {
		jQuery( "#color_palate_normal" ).css( "display", 'block' );
		jQuery( "#color_palate_advance" ).css( "display", 'none' );
		jQuery( "#showadvanceposition" ).css( "display", 'none' );
		jQuery( '#testiframe' ).contents().find( '.help-block' ).empty().removeClass( 'arfanimated bounceInDownNor' );
		if (jQuery( '#testiframe' ).contents().find( 'input,textarea,select' ).hasClass( "arf_required" )) {
			jQuery( '#testiframe' ).contents().find( '.arf_submit_btn' ).trigger( 'click' );
		}
	}
}

function arf_change_error_position() {
	var value   = jQuery( 'input[name="arfestbc"]:checked' ).val();
	var form_id = jQuery( '#id' ).val();
	jQuery( '#testiframe' ).contents().find( 'form  [data-id="arflite_form_tooltip_error_' + form_id + '"]' ).attr( 'data-position', value );
	jQuery( '#testiframe' ).contents().find( '.popover' ).remove();
	if (jQuery( '#testiframe' ).contents().find( 'input,textarea,select' ).hasClass( "arf_required" )) {
		jQuery( '#testiframe' ).contents().find( '.arf_submit_btn' ).trigger( 'click' );
	}
}

function arf_change_check_radio() {
	var checkbox_class         = '';
	var checked_checkbox_class = '';
	var checked_radio_class    = '';
	var chk_style              = jQuery( '#frm_check_radio_style' ).val();
	var chk_color              = jQuery( '#frm_check_radio_style_color' ).val();
	var chk_checkbox_icon      = jQuery( '#arf_checkbox_icon' ).val();
	var chk_radio_icon         = jQuery( '#arf_radio_icon' ).val();
	if (chk_style != 'none') {
		checkbox_class = chk_style;
		if (chk_style != 'custom' && chk_style != 'futurico' && chk_style != 'polaris' && chk_color != 'default') {
			checkbox_class = checkbox_class + '-' + chk_color;
		}

		if (chk_style == 'custom') {

			if (chk_checkbox_icon != '') {
				checked_checkbox_class = ' arfalite ' + chk_checkbox_icon;
			} else {
				checked_checkbox_class = '';
			}
			if (chk_radio_icon != '') {
				checked_radio_class = ' arfalite ' + chk_radio_icon;
			} else {
				checked_radio_class = '';
			}
		} else {

		}

	}

}

function arflite_change_date_format_new() {

	var value       = jQuery( '#frm_date_format' ).val();
	var prev_format = jQuery( "input#frm_date_format" ).attr( 'data-prev-value' );
	if (value == '' || typeof value == 'undefined') {
		value = 'MM/DD/YYYY';
	}
	var setdefdate = moment().format( value );

	jQuery( '.arf_field_option_model_container' ).find( '#arf_date_field_set_def_date' ).text( 'Set Date e.g. ' + setdefdate );

	jQuery( ".arf_editor_datetimepicker" ).each(
		function(e) {
			var value = jQuery( "#frm_date_format" ).val();
			jQuery( this ).data( "DateTimePicker" ).format( value );
			var $this           = jQuery( this );
			var attr_id         = $this.parents( '.arfmainformfield' ).attr( 'id' );
			var id              = attr_id.replace( 'arf_field_', '' );
			var field_data      = arflite_retrieve_field_data( id );
			var date_locale     = field_data.locale;
			var en_date_format  = 'YYYY-MM-DD';
			var show_timepicker = (field_data.show_time_calendar == 1) ? true : false;
			if ( show_timepicker ) {
				if (field_data.clock == 12) {
					value          += ' h:mm A';
					en_date_format += ' h:mm A';
				} else {
					value          += ' H:mm';
					en_date_format += ' H:mm';
				}
			}
			var placeholder_val = jQuery( this ).val();
			if (placeholder_val == null || placeholder_val == undefined || placeholder_val == '') {
				placeholder_val = jQuery( this ).attr( 'placeholder' );
			}
			if (placeholder_val != '' && placeholder_val != 'undefined' && placeholder_val != null) {
				var formated_placeholder      = moment( placeholder_val,prev_format, date_locale ).format( en_date_format,'en' );
				var placeholder_changed_value = moment( formated_placeholder, en_date_format, date_locale ).format( value );

				if (placeholder_changed_value == 'Invalid date') {
					var placeholder_val_splt = placeholder_val.split( '/' );
					if (placeholder_val_splt.length > 2) {
						placeholder_changed_value = placeholder_val_splt[1] + "/" + placeholder_val_splt[0] + "/" + placeholder_val_splt[2];

						placeholder_changed_value = moment( placeholder_changed_value ).format( value );
					} else {
						placeholder_changed_value = "";
					}
				}
				jQuery( this ).attr( 'placeholder', placeholder_changed_value );

				field_data.placeholdertext = placeholder_changed_value;
			}

			if (field_data.selectdefaultdate != '' || field_data.currentdefaultdate != 0 ) {
				var default_date = field_data.selectdefaultdate;

				var formated_date = moment( default_date, prev_format, date_locale ).format( en_date_format,'en' );

				if ( field_data.currentdefaultdate == 1 ) {
					default_date      = setdefdate;
					var formated_date = moment( default_date, value ).format( en_date_format,'en' );
				}

				var final_default_date  = moment( formated_date, en_date_format, date_locale ).format( value );
				var changed_default_val = final_default_date;

				if (changed_default_val == 'Invalid date') {
					var change_date_splt = default_date.split( '/' );

					if (change_date_splt.length > 2) {

						changed_default_val = change_date_splt[1] + "/" + change_date_splt[0] + "/" + change_date_splt[2];
						changed_default_val = moment( changed_default_val ).format( value );
					} else {
						changed_default_val = "";
					}
				}

				if (changed_default_val != '') {
					jQuery( "input[name='item_meta[" + id + "]']" ).val( final_default_date );
				}

				field_data.selectdefaultdate = changed_default_val;
			}

			var field_data_new = JSON.stringify( field_data );
			jQuery( "#arf_field_data_" + id ).val( field_data_new ).trigger( 'change' );
		}
	);
}

jQuery( document ).on(
	'click',
	'span[name=arfmfo]',
	function() {

		if (jQuery( 'input[name=arfmfo]' ).is( ':checked' )) {
			jQuery( "input[name=arfmfo]:checkbox" ).val( '1' ).trigger( "change" );
		} else {
			jQuery( "input[name=arfmfo]:checkbox" ).val( '0' ).trigger( "change" );
		}

	}
);

function arflitemainformedit(is_addtosite_page) {
	var def_title      = '(Click here to add text)';
	var arf_date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
	if (typeof(__ARFDEFAULTTITLE) != 'undefined') {
		var def_title = __ARFDEFAULTTITLE;
	}

	if (jQuery( '.arfeditorformname' ).text() == def_title || jQuery( '.arfeditorformname' ).text() == '') {
		jQuery( '#form_name_message' ).delay( 0 ).fadeIn( 'slow' );
		if ( typeof arflite_form_preview_load != 'function' ) {
			return;
		}

		setTimeout(
			function() {
				jQuery( '#form_name_message' ).fadeOut( "slow" );
			},
			5000
		);
		arflite_form_preview_load( 'form' );
		return false;
	}

	arfliteaddinnerclasses();

	var form          = jQuery( "#frm_main_form" ).serialize();
	var form_id       = jQuery( '#frm_main_form' ).find( '#id' ).val();
	var old_form_id   = form_id;
	var form_preview  = "none";
	var old_arfaction = jQuery( '#frm_main_form' ).find( '#arfaction' ).val();
	var allFields     = document.querySelectorAll( "#frm_main_form, .arf_custom_color_popup_container, .arf_custom_font_popup" );
	var field_length  = allFields.length;
	var objarray      = [];
	for (var x = 0; x < field_length; x++) {
		var obj  = allFields[x];
		var json = obj.serializeJSON();
		objarray.push( json );
	}
	var field_opts = {};
	var fields     = objarray.reduce(
		function(result, currentObject) {
			for (var key in currentObject) {
				if (currentObject.hasOwnProperty( key )) {
					result[key] = currentObject[key];
				}
			}
			return result;
		},
		{}
	);
	if (jQuery( '#form_name' ).val() == '') {
		jQuery( "#error_message" ).find( '.message_descripiton > div' ).first().html( __ARFLITE_FORM_TITLE );
		jQuery( '#error_message' ).delay( 500 ).animate(
			{
				width: 'toggle'
			},
			'slow'
		);
		jQuery( window.opera ? 'html, .arfmodal-body' : 'html, body, .arfmodal-body' ).animate(
			{
				scrollTop: jQuery( '#error_message' ).offset().top - 250
			},
			'slow'
		);
		jQuery( '#error_message' ).delay( 4000 ).fadeOut( 'slow' );
		return false;
	}
	jQuery( '.arf_top_menu_save_button' ).attr( 'disabled', true );
	jQuery( '#arfaddtosubmit' ).attr( 'disabled', true );
	jQuery( '#arfsaveformloader' ).show();

	if (-1 == window.loaded_settings.indexOf( 'mail_notification' ) && (true == window.is_add_new_field || true == window.is_updated_field || true == window.is_delete_field)) {
		arflite_update_dropdown( '#arf_mail_notification_model .arf_mail_notification_container', 'mail_notification' );
	}
	if (-1 == window.loaded_settings.indexOf( 'submit_action' ) && (true == window.is_add_new_field || true == window.is_updated_field || true == window.is_delete_field)) {
		arflite_update_dropdown( '#arf_submit_action_model .arf_submit_action_container', 'submit_action' );
	}
	if (-1 == window.loaded_settings.indexOf( 'email_marketers' ) && (true == window.is_add_new_field || true == window.is_updated_field || true == window.is_delete_field)) {
		arflite_update_dropdown( '#arf_optin_model .arf_optins_container', 'email_marketers' );
	}

	var current_tab = jQuery( '.arfformtab.current' ).attr( 'id' );

	fields['form_id']         = form_id;
	fields['form_preview']    = form_preview;
	fields['action']          = 'arfliteformsavealloptions';
	fields['arf_form_fields'] = field_opts;
	var jsondata              = jQuery.toJSON( fields );
	var arfsack               = new sack( ajaxurl );
	var arflite_wp_nonce      = jQuery( '#arflite_validation_nonce' ).val();
	arfsack.execute           = 0;
	arfsack.method            = 'POST';
	arfsack.setVar( "action", "arfliteformsavealloptions" );
	arfsack.setVar( "form_id", form_id );
	arfsack.setVar( "_wpnonce_arflite", arflite_wp_nonce );
	arfsack.setVar( "form_preview", form_preview );
	arfsack.setVar( "filtered_form", jsondata );
	arfsack.onError      = function () {
		if ( typeof arfsack.responseStatus[0] != 'undefined' && arfsack.responseStatus[0] == 400 ) {
			jQuery( document ).trigger( 'heartbeat-tick.wp-auth-check', [ {'wp-auth-check': false} ] );
			setTimeout(
				function(){
					if ( jQuery( 'iframe#wp-auth-check-frame' ).length < 1 ) {
						var src = jQuery( 'div#wp-auth-check-form' ).attr( 'data-src' );
						var win = window.open( src, '', 'width=400,height=500' );
						win.focus();
					}
				},
				100
			);
		} else {
			jQuery( "#error_message" ).find( '.message_descripiton > div' ).first().html( __ARFLITE_AJAX_SAVE_FORM_ERROR );
			jQuery( '#error_message' ).delay( 500 ).animate( {width: 'toggle'}, 'slow' );
			jQuery( window.opera ? 'html, .arfmodal-body' : 'html, body, .arfmodal-body' ).animate( {scrollTop : jQuery( '#error_message' ).offset().top - 250}, 'slow' );
			jQuery( '#error_message' ).delay( 4000 ).fadeOut( 'slow' );
		}
		jQuery( '#arfsaveformloader' ).hide();
		jQuery( '.arf_top_menu_save_button' ).attr( 'disabled', false );
		return false;
	};
	arfsack.onCompletion = arflite_loaded_ajax;
	arfsack.runAJAX();
	function arflite_loaded_ajax() {

		var msg         = arfsack.response;
		var reponse     = msg.split( '^|^' );
		var sucmessage  = reponse[0];
		var form_id     = reponse[1];
		var change_data = reponse[2];
		var new_html    = reponse[3];
		if (sucmessage == 'false') {
			error_message = JSON.parse( new_html );
			jQuery( "#error_message" ).find( '.message_descripiton > div' ).first().html( error_message[0] );
			jQuery( '#arfsaveformloader' ).hide();
			jQuery( '#error_message' ).delay( 500 ).animate(
				{
					width: 'toggle'
				},
				'slow'
			);
			jQuery( window.opera ? 'html, .arfmodal-body' : 'html, body, .arfmodal-body' ).animate(
				{
					scrollTop: jQuery( '#error_message' ).offset().top - 250
				},
				'slow'
			);
			jQuery( '#error_message' ).delay( 4000 ).fadeOut( 'slow' );
			jQuery( '.arf_top_menu_save_button' ).removeAttr( 'disabled' );
			jQuery( '#arfaddtosubmit' ).removeAttr( 'disabled' );
			return false;
		}
		if ( 'reauth' == sucmessage ) {
			jQuery( '#arfsaveformloader' ).hide();
			jQuery( '.arf_top_menu_save_button' ).attr( 'disabled', false );
			jQuery( document ).trigger( 'heartbeat-tick.wp-auth-check', [ {'wp-auth-check': false} ] );
			setTimeout(
				function(){
					if ( jQuery( 'iframe#wp-auth-check-frame' ).length < 1 ) {
						var src = jQuery( 'div#wp-auth-check-form' ).attr( 'data-src' );
						var win = window.open( src, '', 'width=400,height=500' );
						win.focus();
					}
				},
				100
			);
			return false;
		}

		var input_style = jQuery( "#arfmainforminputstyle" ).val();

		var json = arflite_parse_json( change_data );

		jQuery.each(
			json,
			function(index, val) {
				jQuery( '#' + index ).val( val );
			}
		);

		if (json.arf_default_newarr != '' && json.arf_default_newarr != null) {
			document.getElementById( 'default_style_attr' ).value = json.arf_default_newarr;
		}

		if (typeof json.arf_hidden_field_ids != 'undefined') {
			var hidden_fields       = json.arf_hidden_field_ids;
			var hidden_field_length = hidden_fields.length;

			for (var hf = 0; hf < hidden_field_length; hf++) {
				var ho_id       = hidden_fields[hf].old_id;
				var hn_id       = hidden_fields[hf].new_id;
				
				if( ho_id != null && ho_id != "" && "undefined" != ho_id ){
					var hiddenLabel = document.querySelector( '.arf_hidden_field_label_input[data-field-id="' + ho_id + '"]' );
					var hiddenValue = document.querySelector( 'input[name="item_meta[' + ho_id + ']"]' );
					var hiddenfdata = document.getElementById( 'arf_field_data_' + ho_id );

					hiddenLabel.setAttribute( 'data-field-id', hn_id );
					hiddenValue.setAttribute( 'name', 'item_meta[' + hn_id + ']' );
					hiddenfdata.setAttribute( 'name', 'arf_field_data_' + hn_id );
					hiddenfdata.setAttribute( 'id', 'arf_field_data_' + hn_id );
				}
			}
		}
		window.is_add_new_field = false;
		window.added_new_fields = [];

		window.is_updated_field = false;
		window.updated_fields   = [];

		window.is_delete_field = false;
		window.deleted_fields  = [];

		window.loaded_settings = [];

		var new_css_data = "";

		if ( 'material' == input_style ) {
			new_css_data = json.arf_new_materialize_css_data;
		} else {
			new_css_data = json.arf_new_standard_css_data;
		}

		jQuery( '.added_new_style_css' )[0].innerHTML = new_css_data;

		document.getElementById( 'new_fields' ).innerHTML = '';
		document.getElementById( 'new_fields' ).innerHTML = new_html;

		var field_order       = jQuery( "#arf_field_order" ).val();
		var field_order_saved = JSON.parse( field_order );

		document.getElementById( 'arf_single_column_field_ids' ).value = "";
		window.arf_sender_id       = '';
		window.arf_sender_parent   = {};
		window.arf_sender_previous = {};

		jQuery( '#arfsaveformloader' ).hide();

		if (sucmessage == 'deleted') {
			window.location = __ARFDELETEURL;
		} else {
			if (sucmessage != "") {
				arfliteSetDefaultColumnWidth();
				arflite_initialize_resizable();

				var stylesheet = document.getElementsByClassName( 'added_new_style_css' );

				if (stylesheet.length > 0) {
					for (var css = 0; css < stylesheet.length; css++) {
						var current_css       = stylesheet[css];
						var style_sheet       = current_css.innerHTML;
						var old_form_id_regex = new RegExp( old_form_id, 'g' );
						style_sheet           = style_sheet.replace( old_form_id_regex, form_id );
						current_css.innerHTML = style_sheet;
					}
				}

				jQuery( '#frm_main_form' ).find( '#id' ).val( form_id );
				jQuery( '#frm_main_form' ).find( '#arfaction' ).val( "update" );
				jQuery( '#arfmainformid' ).val( form_id );
				jQuery( "#arfmainformeditorcontainer" ).removeClass( 'arflite_main_div_' + old_form_id );
				jQuery( "#arfmainformeditorcontainer" ).addClass( 'arflite_main_div_' + form_id );
				jQuery( "#arfmainformeditorcontainer" ).find( '.arf_fieldset' ).attr( 'id', 'arf_fieldset_' + form_id );

				jQuery( "#arf_form_styling_tools" ).find( '#arf_bg_position_x' ).attr( "onChange","arflite_update_form_bg_position(this,'x','arf_form_bg_position_input_div_x','arf_fieldset_" + form_id + "')" );
				jQuery( "#arf_form_styling_tools" ).find( '#arf_form_bg_position_input_x' ).attr( "onfocusout","arflite_set_form_bg_position(this,'x','arf_fieldset_" + form_id + "')" );
				jQuery( "#arf_form_styling_tools" ).find( '#arf_bg_position_y' ).attr( "onChange","arflite_update_form_bg_position(this,'y','arf_form_bg_position_input_div_y','arf_fieldset_" + form_id + "')" );
				jQuery( "#arf_form_styling_tools" ).find( '#arf_form_bg_position_input_y' ).attr( "onfocusout","arflite_set_form_bg_position(this,'y','arf_fieldset_" + form_id + "')" );

				if (jQuery( 'body' ).find( ".append_theme" ).size() > 1) {
					jQuery( 'body' ).find( ".append_theme" ).remove();
				}
				if (is_addtosite_page == 1) {
					jQuery( '#success_message' ).delay( 1000 ).animate(
						{
							width: 'toggle'
						},
						'slow'
					);
					jQuery( '#form_name_message' ).css( "display", "none" );
					jQuery( '#success_message' ).delay( 4000 ).fadeOut( 'slow' );
					jQuery( window.opera ? 'html, .arfmodal-body' : 'html, body, .arfmodal-body' ).animate(
						{
							scrollTop: jQuery( '#success_message' ).offset().top - 250
						},
						'slow'
					);
					setTimeout(
						function() {
							jQuery( '#success_message' ).animate(
								{
									width: 'toggle'
								},
								'slow'
							);
							jQuery( '#arfsubmitall' ).attr( 'disabled', false );
							jQuery( '#arfaddtosubmit' ).attr( 'disabled', false );
						},
						4000
					);
				} else {
					jQuery( '#form_name_message' ).css( "display", "none" );
					jQuery( '#success_message .message_descripiton div:not(.message_svg_icon)' ).html( sucmessage );
					jQuery( '#success_message' ).animate(
						{
							width: 'toggle'
						},
						'slow'
					);
					setTimeout(
						function() {
							jQuery( '#success_message' ).animate(
								{
									width: 'toggle'
								},
								'slow'
							);
							jQuery( '.arf_top_menu_save_button' ).attr( 'disabled', false );
							jQuery( '#arfaddtosubmit' ).attr( 'disabled', false );
						},
						4000
					);
				}
				if (old_arfaction == 'new' || old_arfaction == 'duplicate') {

					var arf_shortcodes = jQuery( "#arf_editor_saved_form_shortcodes" ).html();
					arf_shortcodes     = arf_shortcodes.replace( /{arf_form_id}/ig, form_id );
					jQuery( "#arf_editor_saved_form_shortcodes" ).html( arf_shortcodes );
					jQuery( "#arf_editor_unsaved_form_shortcodes" ).hide();
					jQuery( "#arf_editor_saved_form_shortcodes" ).show();
					jQuery( "#arflite_export_current_form_link" ).removeClass( 'arf_export_form_editor_note' );
					jQuery( "#arflite_export_current_form_link" ).tipso( 'destroy' );
					jQuery( ".arf_save_form_id_note" ).html( "(Form ID: " + form_id + ")" );
					jQuery( ".arf_save_form_id_note" ).removeClass( 'arf_save_form_id_note' );
					jQuery( "#frm_add_form_id_name" ).val( form_id );
					wp.hooks.doAction( 'arflite_after_save_form_first_time' );
				}

				wp.hooks.doAction( 'arflite_after_save_form' );

				if ( 'material' == input_style ) {
					arflite_material_style_init();
				}

				if (window.history.pushState && form_id < 10000) {
					if ( typeof arflite_removeVariableFromURL != 'function' ) {
						return;
					}
					var pageurl = arflite_removeVariableFromURL( document.URL, 'arfaction' );
					pageurl     = arflite_removeVariableFromURL( pageurl, 'id' );
					pageurl     = arflite_removeVariableFromURL( pageurl, 'templete_style' );
					pageurl     = arflite_removeVariableFromURL( pageurl, 'form_name' );
					pageurl     = arflite_removeVariableFromURL( pageurl, 'form_desc' );
					pageurl     = arflite_removeVariableFromURL( pageurl, 'arf_rtl_switch_mode' );
					pageurl    += '&arfaction=edit&id=' + form_id;
					window.history.pushState(
						{
							path: pageurl
						},
						'',
						pageurl
					);
				}

				jQuery( '.arf_editor_slider' ).each(
					function() {
						jQuery( this ).arf_slider();
						jQuery( this ).arf_slider().on(
							'slideStop',
							function(ev) {
								var data       = jQuery( this ).arf_slider( 'getValue' );
								var attr_id    = jQuery( this ).attr( 'id' );
								var id         = attr_id.replace( 'arf_slider_', '' );
								var field_data = arflite_retrieve_field_data( id );
								if (field_data.arf_range_selector == 1) {
									for (var i = 0; i < data.length; i++) {
										if (i == 0) {
											field_data.arf_range_minnum = data[i];
											field_data.slider_value     = data[i];
										}
										if (i == 1) {
											field_data.arf_range_maxnum = data[i];
										}

									}
								} else {
									field_data.slider_value = data;
								}
								field_data = JSON.stringify( field_data );
								jQuery( "#arf_field_data_" + id ).val( field_data );
							}
						);
					}
				);
				var field_order          = {};
				var arf_f_order_index    = 1;
				var arf_f_in_order_index = 1;

				arflite_initialize_field_order();

				var field_order = JSON.parse( jQuery( '#arf_field_order' ).val() );

				var old_vals       = field_order_saved;
				var new_vals       = field_order;
				var keys_to_change = [];
				var keys_to_remove = [];
				var counter        = 0;

				var old_keys = [];
				var new_keys = [];

				for (var x in old_vals) {
					old_keys[old_vals[x] - 1] = x;
				}

				for (var i in new_vals) {
					new_keys[new_vals[i] - 1] = i;
				}

				if (old_keys.length == new_keys.length) {
					for (var o = 0; o < old_keys.length; o++) {
						var ok = old_keys[o];
						var nk = new_keys[o];
						if (ok != nk) {
							keys_to_change.push( ok + '|' + nk );
							counter++;
						}
					}
				}
				if (counter > 0) {
					for (var i = 0; i < counter; i++) {
						var k  = keys_to_change[i].split( '|' );
						var oi = k[0];
						var ni = k[1];
						arflite_update_id_dropdown( oi, ni );
					}
				}

				field_order = JSON.stringify( field_order );
				jQuery( 'input#arf_field_order' ).val( field_order ).attr( 'data-db-field-order', field_order );
				jQuery( 'input#arf_field_resize_width' ).attr( 'data-db-field-resize', jQuery( 'input#arf_field_resize_width' ).val() );

				var ikeys_to_change = [];
				var ikeys_to_remove = [];
				var icounter        = 0;

				var iold_keys = [];
				var inew_keys = [];

				if (icounter > 0) {
					for (var ii = 0; ii < icounter; ii++) {
						var ik  = ikeys_to_change[ii].split( '|' );
						var ioi = ik[0];
						var ini = ik[1];
						arflite_update_id_dropdown( ioi, ini );
					}
				}
				arfliteinitialize_field_resize_width();

				var input_style       = jQuery( "#arfmainforminputstyle" ).val();
				__arf_jspicker_object = [];
				arflite_load_external_js_function( true );

				var link        = document.getElementsByTagName( 'link' );
				var link_length = link.length;
				setTimeout(
					function() {

						if (jQuery( "#new_fields" ).length > 0 && jQuery( "#new_fields" ).find( 'div.arfformfield' ).length > 0) {
							jQuery( "#new_fields" ).find( 'div.arfformfield' ).each(
								function() {
									var field_id = jQuery( this ).attr( 'id' ).replace( 'arf_field_', '' );
									if ( typeof jQuery().tipso == 'function' ) {
										jQuery( '.arfhelptip' ).tipso(
											{
												position: 'top',
												maxWidth: '400',
												useTitle: true,
												background: '#444444',
												color: '#ffffff',
												width: 'auto',
												tooltipHover: true,
											}
										);
										jQuery( '#arf_field_' + field_id ).find( '#tooltip_field_' + field_id + '.arfhelptip' ).each(
											function() {
												jQuery( this ).tipso( 'destroy' );
												var bgcolor   = document.getElementById( 'arf_tooltip_bg_color' ).value;
												var textcolor = document.getElementById( 'arf_tooltip_font_color' ).value;
												var title     = jQuery( this ).attr( 'data-title' );
												jQuery( this ).tipso(
													{
														position: 'top',
														width: 'auto',
														useTitle: false,
														content: title,
														background: bgcolor,
														color: textcolor,
														tooltipHover: true
													}
												);
											}
										);
									}
								}
							);
						}

						jQuery( '.arf_editor_live_css' ).remove();
					},
					5000
				);
				setTimeout(
					function() {
						arfliteheightdiv( 'all' );
					},
					15
				);
				jQuery( '#changed_style_attr' ).val( '' );
				var arf_preview_default_url = jQuery( '.arf_top_menu_preview_button' ).attr( 'data-default-url' );
				if (arf_preview_default_url != '') {
					jQuery( '.arf_top_menu_preview_button' ).attr( 'data-url', arf_preview_default_url + '&form_id=' + form_id );
					jQuery( '.arf_top_menu_preview_button' ).attr( 'data-default-url', '' );
				}

			}
		}

	}
	return false;
}

function arflite_time() {
	var timestamp = Math.floor( new Date().getTime() / 1000 )
	return timestamp;
}

jQuery( document ).on(
	'click',
	'#arf_field_type_converter',
	function() {
		jQuery( "#arf_field_type_converter_model" ).addClass( 'arfactive' );
		jQuery( "#arf_field_type_converter_model" ).parent().addClass( 'arfactive' );
		jQuery('.arf_editor_header_belt').removeClass('arf_editor_header_belt_cls');
		setTimeout(
			function() {
				arflite_update_dropdown( '#arf_other_options_model .arf_other_options_container', 'arf_field_type_converter' );
			},
			500
		);
	}
);

jQuery( document ).on(
	'click',
	'.arf_popup_close_button_field_converter',
	function() {

		var current_field_type   = jQuery( "#arf_current_field_type" ).val();
		var field_type_change_to = jQuery( "#field_type_to_convert" ).val();

		if (current_field_type == '') {
			return false;
		} else if (field_type_change_to == '') {
			return false;
		}

		jQuery( "#arf_field_converter_loader" ).show();

		var field_id = jQuery( "#field_type_converter" ).val();

		var current_field_data = arflite_retrieve_field_data( field_id );

		var json_object = arflite_parse_json( Base64.decode( jQuery( "#arflite_skin_json" ).val() ) );
		var field_data  = json_object.field_data;

		var changing_field_data = field_data[field_type_change_to];

		var input_style = jQuery( "#arfmainforminputstyle" ).val();

		if (input_style == 'material') {
			var json_field_data = arflite_parse_json( Base64.decode( jQuery( "#arflite_convert_new_materialize_field_array_json" ).val() ) );
		} else {
			var json_field_data = arflite_parse_json( Base64.decode( jQuery( "#arflite_convert_new_field_array_json" ).val() ) );
		}

		var json_newfield_data = json_field_data[field_type_change_to];

		var new_field_json_data = {};

		for (var key in changing_field_data) {
			if (typeof current_field_data[key] != 'undefined') {
				if (key != 'type') {
					new_field_json_data[key] = current_field_data[key];
				} else {
					new_field_json_data[key] = changing_field_data[key];
				}
			} else {
				new_field_json_data[key] = changing_field_data[key];
			}
		}

		var form_id              = jQuery( '#id' ).val();
		var arf_unique_key       = new_field_json_data.key;
		var arf_editor_index_row = jQuery( "#arfmainfieldid_" + field_id ).parents( '.arf_inner_wrapper_sortable' ).attr( 'data-id' ).replace( 'arf_editor_main_row_', '' );

		json_newfield_data = json_newfield_data.replace( /\{arf_field_id\}/gi, field_id );
		json_newfield_data = json_newfield_data.replace( /\{arf_form_id\}/gi, form_id );
		json_newfield_data = json_newfield_data.replace( /\{arf_unique_key\}/gi, arf_unique_key );
		json_newfield_data = json_newfield_data.replace( /\{arf_editor_index_row\}/gi, arf_editor_index_row );

		if (jQuery( "#arfmainfieldid_" + field_id ).parents( '.arf_inner_wrapper_sortable' ).hasClass( 'single_column_wrapper' )) {
			jQuery( "#arfmainfieldid_" + field_id ).parents( '.arf_inner_wrapper_sortable' ).replaceWith( jQuery( json_newfield_data ) );
		} else {
			var inner_class = jQuery( "#arfmainfieldid_" + field_id ).attr( 'inner_class' );
			var style       = jQuery( "#arfmainfieldid_" + field_id ).attr( 'style' );
			var data_width  = jQuery( "#arfmainfieldid_" + field_id ).attr( 'data-width' );

			var new_control = jQuery( json_newfield_data ).find( '.sortable_inner_wrapper' );

			new_control.attr( 'inner_class', inner_class );
			new_control.attr( 'style', style );
			new_control.attr( 'data-width', data_width );
			jQuery( "#arfmainfieldid_" + field_id ).replaceWith( new_control );
		}

		var new_field_data = JSON.stringify( new_field_json_data );

		jQuery( "#arf_field_data_" + field_id ).val( new_field_data ).trigger( 'change' );

		jQuery( "#field_type_converter" ).val( '' );
		jQuery( "#arf_current_field_type" ).val( '' );
		jQuery( "#field_type_to_convert" ).val( '' );

		jQuery( ".arf_current_field_type" ).html( '' );

		jQuery( 'ul[data-id="field_type_converter"]' ).find( 'li[data-value="' + field_id + '"]' ).attr( 'data-type', new_field_json_data.type );

		var new_field_type = new_field_json_data.type;

		arflite_load_bootstrap_js_css( new_field_type, field_id );

		arfliteshowfieldoptions( field_id, new_field_type );

		jQuery( ".arf_field_option_model_cloned.arfactive" ).css( 'visibility', 'hidden' );
		jQuery( ".arf_field_values_model.arfactive" ).css( 'visibility', 'hidden' );

		if (new_field_type == 'checkbox' || new_field_type == 'radio' || new_field_type == 'select') {
			jQuery( "#arf_edit_value_option_button[data-field-id='" + field_id + "']" ).trigger( 'click' );
		}

		setTimeout(
			function() {

				var label = jQuery( 'ul[data-id="field_type_converter"]' ).find( 'li:first-child' ).attr( 'data-label' );
				jQuery( 'dl[data-name="field_type_converter"]' ).find( 'dt span' ).html( label );

				var label = jQuery( 'ul[data-id="field_type_to_convert"]' ).find( 'li:first-child' ).attr( 'data-label' );
				jQuery( 'dl[data-name="field_type_to_convert"]' ).find( 'dt span' ).html( label );

				jQuery( ".arf_ar_dropdown_wrapper_note_current_type" ).hide();

				jQuery( '.arf_popup_container.arfactive' ).removeClass( 'arfactive' );
				jQuery( '.arf_modal_overlay.arfactive' ).removeClass( 'arfactive' );
				jQuery( "#arf_field_converter_loader" ).hide();
				jQuery( ".arf_field_option_model_cloned.arfactive" ).css( 'visibility', 'visible' );
				jQuery( ".arf_field_values_model.arfactive" ).css( 'visibility', 'visible' );
				jQuery( '.arf_ar_dropdown_wrapper_note_changing_type' ).hide();
				jQuery( ".arf_field_option_submit_button[data-field_id='" + field_id + "']" ).trigger( 'click' );
				if (new_field_type == 'checkbox' || new_field_type == 'radio' || new_field_type == 'select') {
					jQuery( ".arf_field_values_submit_button[data-field-id='" + field_id + "']" ).trigger( 'click' );
				}

				if (current_field_data.type == 'email' && current_field_data.confirm_email == 1) {

					if (jQuery( "#arfmainfieldid_" + field_id + "_confirm" ).parent().hasClass( 'single_column_wrapper' )) {
						jQuery( "#arfmainfieldid_" + field_id + "_confirm" ).parent().remove();
					} else {
						jQuery( ".arf_confirm_field#arf_field_" + field_id + "_confirm:not(.sortable_inner_wrapper)" ).remove();
					}

				}
				setTimeout(
					function() {
						arfliteremoveBlankElm();
					},
					500
				);
			},
			500
		);
	}
);

jQuery( document ).on(
	'heartbeat-tick',
	function ( event, data ) {
		if ( typeof data != 'undefined' && 'undefined' != typeof data.nonces_expired && true == data.nonces_expired ) {
			arflite_regenerate_nonce();
		}
	}
);


function arflite_regenerate_nonce(){
	var arflite_wp_nonce = jQuery( '#arflite_validation_nonce' ).val();
	jQuery.ajax(
		{
			url:ajaxurl,
			data:{
				action: 'arf_regenerate_nonces'
			},
			dataType:'json',
			type:'POST',
			success:function( generated_nonces ){
				if (window.history.pushState) {
					var pageurl = arflite_removeVariableFromURL( document.URL, 'arflite_page_nonce' );
					if ( typeof generated_nonces.arflite_page_nonce != 'undefined' ) {
						pageurl += '&arflite_page_nonce=' + generated_nonces.arflite_page_nonce;
					}
					window.history.pushState(
						{
							path: pageurl
						},
						'',
						pageurl
					);
				}
				if ( typeof generated_nonces.arflite_validation_nonce != 'undefined' ) {
					 jQuery( 'input[id="arflite_validation_nonce"]' ).val( generated_nonces.arflite_validation_nonce );
				}
			}
		}
	);
}

jQuery( document ).on(
	'change',
	'input[name="arftds"]',
	function(){
		let direction = 'ltr';

		if ( '0' == this.value ) {
			direction = 'rtl';
		}

		if ( 'rtl' == direction ) {
			jQuery( '.arf-selectpicker-control.arf_form_field_picker' ).parents( '.arf_fieldset' ).addClass( 'arf_direction_right' );
			jQuery( '.arf-selectpicker-control.arf_form_field_picker' ).parents( '.arf_fieldset' ).removeClass( 'arf_direction_left' );
			jQuery( '.arf-selectpicker-control.arf_form_field_picker' ).find( 'dt' ).find( 'span' ).attr( 'style','float:right !important; rigth: 0px !important; left:unset !important;' );
			jQuery( '.arf-selectpicker-control.arf_form_field_picker' ).find( 'dt' ).find( 'i' ).attr( 'style','right: unset; left: 8px;' );
		} else {
			jQuery( '.arf-selectpicker-control.arf_form_field_picker' ).parents( '.arf_fieldset' ).addClass( 'arf_direction_left' );
			jQuery( '.arf-selectpicker-control.arf_form_field_picker' ).parents( '.arf_fieldset' ).removeClass( 'arf_direction_right' );
			jQuery( '.arf-selectpicker-control.arf_form_field_picker' ).find( 'dt' ).find( 'span' ).attr( 'style','float:left !important; left: 0px !important; right:unset;' );
			jQuery( '.arf-selectpicker-control.arf_form_field_picker' ).find( 'dt' ).find( 'i' ).attr( 'style','left: unset; right: 8px;' );
		}
	}
);

function arflite_validatepaste( event, e ){

  	var key = e.clipboardData.getData('text').match(/[^\d]/);
	if( e.clipboardData.getData('text').match(/[^\d]/) ){
		e.preventDefault();
	}
}

function arflite_check_numeric_input(evt, obj) {

	var charcode = (evt.which) ? evt.which : evt.keyCode;

	if (charcode == 49 || charcode == 50 || charcode == 51 || charcode == 52 || charcode == 53 || charcode == 54 || charcode == 55 || charcode == 56 || charcode == 57 || charcode == 48 || charcode == 49 || charcode == 45  ) {
		return true;
	} else {
		return false;
	}
	 
};

function arflite_check_decimal_point(evt, obj) {

	var charCode    = (evt.which) ? evt.which : event.keyCode;
	var value       = obj.value;
	var dotcontains = value.indexOf( "." ) != -1;

	if (charCode == 49 || charCode == 50 || charCode == 51 || charCode == 52 || charCode == 53 || charCode == 54 || charCode == 55 || charCode == 56 || charCode == 57 || charCode == 48 || charCode == 46 ) {
		if (dotcontains) {
			if (charCode == 46) {
				return false;
			}
		}
	} else {
		return false;
	}
	return true;
}

function arflite_frm_width( val ){

    if( val == "Desktop"){
        jQuery('#arf_form_width').css('display','block');
        jQuery('#arf_form_width_tablet').css('display','none');
        jQuery('#arf_form_width_mobile').css('display','none');

        jQuery('.arf_form_width').parent('.arf_selectpicker_wrapper').css('display','block');
        jQuery('.form_width_unit_tablet').parent('.arf_selectpicker_wrapper').css('display','none');
        jQuery('.arf_width_unit_mobile').parent('.arf_selectpicker_wrapper').css('display','none');
    } else if ( val == "Tablet"){
        jQuery('#arf_form_width_tablet').css('display','block');
        jQuery('#arf_form_width').css('display','none');
        jQuery('#arf_form_width_mobile').css('display','none');

        jQuery('.form_width_unit_tablet').parent('.arf_selectpicker_wrapper').css('display','block');
        jQuery('.arf_form_width').parent('.arf_selectpicker_wrapper').css('display','none');
        jQuery('.arf_width_unit_mobile').parent('.arf_selectpicker_wrapper').css('display','none');
    } else if( val == 'Mobile') {
        jQuery('#arf_form_width_mobile').css('display','block');
        jQuery('#arf_form_width_tablet').css('display','none');
        jQuery('#arf_form_width').css('display','none');

        jQuery('.arf_width_unit_mobile').parent('.arf_selectpicker_wrapper').css('display','block');
        jQuery('.arf_form_width').parent('.arf_selectpicker_wrapper').css('display','none');
        jQuery('.form_width_unit_tablet').parent('.arf_selectpicker_wrapper').css('display','none');
    }

}

function arflite_change_form_padding( val ){

    if( val == "Desktop" ){
        jQuery('#arf_padding_desktop').css('display','block');
        jQuery('#arf_padding_tablet').css('display','none');
        jQuery('#arf_padding_mobile').css('display','none');
    } else if ( val == "Tablet" ){

        jQuery('#arf_padding_desktop').css('display','none');
        jQuery('#arf_padding_tablet').css('display','block');
        jQuery('#arf_padding_mobile').css('display','none');
    } else if( val == "Mobile" ){

        jQuery('#arf_padding_desktop').css('display','none');
        jQuery('#arf_padding_tablet').css('display','none');
        jQuery('#arf_padding_mobile').css('display','block');
    }
}
function arflite_frm_button_width( val ){

    if( val == "Desktop" ){

        jQuery("#arfsubmitbuttonwidthsetting").css('display','block');
        jQuery("#arfsubmitbuttonwidthsetting_tablet").css('display','none');
        jQuery("#arfsubmitbuttonwidthsetting_mobile").css('display','none');

    } else if( val == "Tablet" ){

        jQuery("#arfsubmitbuttonwidthsetting").css('display','none');
        jQuery("#arfsubmitbuttonwidthsetting_tablet").css('display','block');
        jQuery("#arfsubmitbuttonwidthsetting_mobile").css('display','none');

    } else if( val == "Mobile" ){

        jQuery("#arfsubmitbuttonwidthsetting").css('display','none');
        jQuery("#arfsubmitbuttonwidthsetting_tablet").css('display','none');
        jQuery("#arfsubmitbuttonwidthsetting_mobile").css('display','block');
    }
}
function arflite_field_width_func( val ){

    if ( val == "Desktop"){
        jQuery('#arfmainfieldwidthsetting').css('display','block');
        jQuery('#arfmainfieldwidthsetting_tablet').css('display','none');
        jQuery('#arfmainfieldwidthsetting_mobile').css('display','none');

        jQuery('.arf_field_cls').parent('.arf_selectpicker_wrapper').css('display','block');
        jQuery('.arf_field_tablet_cls').parent('.arf_selectpicker_wrapper').css('display','none');
        jQuery('.arf_field_mobile_cls').parent('.arf_selectpicker_wrapper').css('display','none');

    } else if( val == "Tablet"){

        jQuery('#arfmainfieldwidthsetting').css('display','none');
        jQuery('#arfmainfieldwidthsetting_tablet').css('display','block');
        jQuery('#arfmainfieldwidthsetting_mobile').css('display','none');

        jQuery('.arf_field_cls').parent('.arf_selectpicker_wrapper').css('display','none');
        jQuery('.arf_field_tablet_cls').parent('.arf_selectpicker_wrapper').css('display','block');
        jQuery('.arf_field_mobile_cls').parent('.arf_selectpicker_wrapper').css('display','none');

    } else if( val == "Mobile"){

        jQuery('#arfmainfieldwidthsetting').css('display','none');
        jQuery('#arfmainfieldwidthsetting_tablet').css('display','none');
        jQuery('#arfmainfieldwidthsetting_mobile').css('display','block');

        jQuery('.arf_field_cls').parent('.arf_selectpicker_wrapper').css('display','none');
        jQuery('.arf_field_tablet_cls').parent('.arf_selectpicker_wrapper').css('display','none');
        jQuery('.arf_field_mobile_cls').parent('.arf_selectpicker_wrapper').css('display','block');
    }
}
function arflite_field_border_radius_func( val ){

    if( val == "Desktop" ){

        jQuery(".arf_slider_wrapper.arf_slider_desktop").css('display','block');
        jQuery(".arf_slider_wrapper.arf_slider_tablet").css('display','none');
        jQuery(".arf_slider_wrapper.arf_slider_mobile").css('display','none');

    } else if( val == "Tablet" ){

        jQuery(".arf_slider_wrapper.arf_slider_desktop").css('display','none');
        jQuery(".arf_slider_wrapper.arf_slider_tablet").css('display','block');
        jQuery(".arf_slider_wrapper.arf_slider_mobile").css('display','none');

    } else if( val == "Mobile" ){

        jQuery(".arf_slider_wrapper.arf_slider_desktop").css('display','none');
        jQuery(".arf_slider_wrapper.arf_slider_tablet").css('display','none');
        jQuery(".arf_slider_wrapper.arf_slider_mobile").css('display','block');
    }
}