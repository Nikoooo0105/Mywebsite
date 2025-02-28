/* PS Filepicker plugin */
;
(function($, window, document, undefined){
	// Use strict mode (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
	'use strict';
	
	PS.libs.Filepick = {
		// Meta
		name: 'Filepick',
		version: '0.8.0',
		picker: null, // Store a reference to Ink Filepicker JS on init,
		progressBar: null,
		progressBarOverlay: null,
		progressBarMessage: null,
		progressBarContainer: null,
		originalMimeType: "",
		instances: {},
		// Defaults
		settings: {
			init: false,
			store_location: 'S3',
			orgId: 0,
			callback: function(InkBlob){
				console.log(InkBlob);
			},
			error_callback: function(FPError){
				console.error(FPError.message);
			},
			store_after_pick: false,
			get_stats: false,
			convert_file: false,
			convert_to: 'jpg',
			convert_quality: 100,
			progress_bar: ".ps-admin-progressbar",
			progress_bar_overlay: ".ps-admin-progressbar-overlay",
			progress_bar_container: ".ps-admin-progressbar-container",
			progress_bar_message_container: ".ps-admin-progressbar-message",
			trigger_element: ".open-filepicker",
			trigger_element_type: "button",
			fp_container: PS.s3bucket,
			fp_location: "S3",
			fp_path: '/data/org/' + PS.site.organization_id + '/media/tmp/',
			fp_api_key: PS.filepickerAPIKey,
			fp_allowed_extensions: ['.jpe', '.jpg', '.jpeg', '.gif', '.png', '.webp'],
			fp_services: ['COMPUTER', 'FACEBOOK', 'BOX', 'DROPBOX', 'FLICKR', 'GOOGLE_DRIVE', 'IMAGE_SEARCH', 'INSTAGRAM', 'URL', 'WEBCAM'],
			fp_max_size: 2097152,
			fp_debug: false,
			fp_multiple: false,
			fp_dialog_container: "modal",
			fp_open_to: "COMPUTER",
			fp_drag_enter: "", // only applicable for drop panes
			fp_drag_leave: "", // only applicable for drop panes
			fp_on_start: "", // only applicable for drop panes
			fp_on_progress: ""
		},
		// Initialization
		init: function(scope, method, options){
			var id = "Filepick-" + PS.random_str(6);
			var instance = {};
			instance[id] = {};
			instance[id]["name"] = id;
			instance[id]["scope"] = scope || this.scope;
			// Make a copy of the default settings for the instance
			instance[id]["settings"] = $.extend(true, {}, this.settings, {}); // Tricky: Refer to jQuery API docs for this particular usage
			instance[id]["triggerAttributes"] = [];
			
			if (!this.picker) { // Store a reference to the filepicker object
				this.init_picker();
			}
			
			// Merge settings
			if (typeof(method) === 'object') { // method not specified; We're actually looking at the settings map
        $.extend(true, instance[id]["settings"], method);
        // Tricky! $.extend() merges, so we need to replace when an option is an array or object
        if (typeof(method.fp_services) !== 'undefined') {
          instance[id]["settings"]["fp_services"] = method.fp_services;
        }
        if (typeof(method.fp_allowed_extensions) !== 'undefined') {
          instance[id]["settings"]["fp_allowed_extensions"] = method.fp_allowed_extensions;
        }
      }
      else {
        if (typeof(options) !== 'undefined') { // method was specified; settings map is here
          $.extend(true, instance[id]["settings"], options);
          // Tricky! $.extend() merges, so we need to replace the entire object when an option is an array or object
          if (typeof(options.fp_services) !== 'undefined') {
            instance[id]["settings"]["fp_services"] = options.fp_services;
          }
          if (typeof(options.fp_allowed_extensions) !== 'undefined') {
            instance[id]["settings"]["fp_allowed_extensions"] = options.fp_allowed_extensions;
          }
        }
      }
      
			this.instances[id] = instance[id];
			this.cache_elements(id);
			if (typeof(method) !== 'string') {
				if (!this.instances[id]["settings"].init) {
					this.events(id);
				}
				return this.instances[id]["settings"].init;
			}
			else {
				return this[method].call(this, options);
			}
		},
		
		init_picker: function(){
			if (this.picker == null) {
				var apiKey = this.settings.fp_api_key;
				if ((typeof(arguments[0]) != 'undefined') && (arguments[0].length > 0)) {
					apiKey = arguments[0];
				}
				if (typeof(filepicker) != 'undefined') {
					this.picker = filepicker;
					this.picker.setKey(apiKey);
				}
				else {
					throw "Filepicker.io was not found!";
				}
			}
		},
		
		cache_elements: function(id){
			this.progressBar = $(this.settings.progress_bar);
			this.progressBarOverlay = $(this.settings.progress_bar_overlay);
			this.progressBarContainer = $(this.settings.progress_bar_container);
			this.progressBarMessage = $(this.settings.progress_bar_message_container);
			this.instances[id]["trigger"] = $(this.instances[id]["settings"]["trigger_element"]);
		},
		
		events: function(id){
			var data = {};
			data["plugin"] = this;
			data["instance"] = this.instances[id];
			$(data.instance.scope).on('post-upload.psjs.' + id, data, this.post_upload);
			if (data.instance.settings.trigger_element_type == 'button') {
				$(data.instance.scope).on('click', data.instance.settings.trigger_element, data, data.plugin.open);
			}
			else if(data.instance.settings.trigger_element_type == 'drop-pane') {
				// Droppane code
				data["plugin"].makeDropPane($(data.instance.settings.trigger_element), {
					multiple: false, // Allow only one at a time for drag-drop for now
					extensions: data.instance.settings.fp_allowed_extensions,
					maxSize: data.instance.settings.fp_max_size,
					location: data.instance.settings.fp_location,
					path: data.instance.settings.fp_path,
					container: data.instance.settings.fp_container,
					dragEnter: function(){
						data.plugin.drag_enter(data);
					},
					dragLeave: function(){
						data.plugin.drag_leave(data);
					},
					onStart: function(){
						data.plugin.on_start(data);
					},
					onSuccess: function(InkBlobs){
						data["InkBlob"] = InkBlobs[0]; // Allow only one at a time for drag-drop for now
						$(data.instance.scope).trigger('post-upload.psjs.' + data.instance.name, data);
					},
          onProgress: function(percentage) {
            data.plugin.on_progress(data, percentage);
          }
				});
			} else {
        throw "Unknown element type";
      }
			
			data.instance.settings.init = true;
		},
		
		open: function(e){
			if (typeof(e.data) != 'undefined') {
				var data = e.data
				var instance = data.instance;
				var id = instance.name;
				var plugin = data.plugin;
				instance.triggerAttributes = this.attributes;
				plugin.picker.setKey(instance.settings.fp_api_key);
				var options = {
					extensions: instance.settings.fp_allowed_extensions,
					container: instance.settings.fp_dialog_container,
					openTo: instance.settings.fp_open_to,
					maxSize: instance.settings.fp_max_size,
					multiple: instance.settings.fp_multiple,
					debug: instance.settings.fp_debug,
					services: instance.settings.fp_services
				};
				
				plugin.picker.pick(options, function(InkBlob){
					data["InkBlob"] = InkBlob;
					$(instance.scope).trigger('post-upload.psjs.' + id, data);
				}, function(FPError){
					plugin.log_error(FPError);
				});
			}
			else {
				throw "Plugin data was not received! Aborting";
			}
			e.preventDefault();
		},
		
		post_upload: function(e, data){
			var plugin = data.plugin;
			var instance = data.instance;
			// Save original MIME type
			plugin.originalMimeType = data.InkBlob.mimetype;
			
			if (instance.settings.convert_file && !plugin.is_valid_format(data.InkBlob)) {
				plugin.convert(data);
			}
			else {
				plugin.store(data);
			}
		},
		
		log_error: function(FPickError){
			if (typeof(window.trackJs) !== "undefined") {
				window.trackJs.track(FPickError.message);
			}
			console.error(FPickError.message);
		},
		
		// Check whether uploaded image is JPEG or PNG
		is_valid_format: function(InkBlob){
			if ((InkBlob.mimetype == 'image/jpeg') || (InkBlob.mimetype == 'image/png')) {
				return true;
			}
			else {
				return false;
			}
		},
		
		convert: function(data){
			var instance = data.instance;
			var plugin = data.plugin;
			//var that = this;
			var convertOptions = {
				'format': instance.settings.convert_to,
				'quality': instance.settings.convert_quality
			};
			
			plugin.show_progress_bar(data, 'Converting your file...');
			
			try {
				if (instance.settings.store_after_pick) {
					var storeOptions = {
						'location': instance.settings.store_location,
						'container': instance.settings.fp_container,
						'path': instance.settings.fp_path
					};
					plugin.picker.convert(data.InkBlob, convertOptions, storeOptions, function(InkBlob){
						data.InkBlob = InkBlob;
						plugin.post_store(data);
					}, function(FPickError){
						plugin.log_error(FPickError);
					}, function(percent){
						plugin.on_progress(data, percent);
					});
				}
				else {
					plugin.picker.convert(data.InkBlob, convertOptions, function(InkBlob){
						data.InkBlob = InkBlob;
						plugin.post_store(data);
					}, function(FPickError){
						plugin.log_error(FPickError);
					}, function(percent){
						plugin.on_progress(data, percent);
					});
				}
			} 
			catch (e) {
				throw (e);
			}
			
			
		},
		
		store: function(data){
			var instance = data.instance;
			var plugin = data.plugin;
			if (instance.settings.store_after_pick) {
				plugin.show_progress_bar(data, "Saving the file to your server...");
				plugin.picker.store(data.InkBlob, {
					'location': instance.settings.store_location,
					'mimetype': data.InkBlob.mimetype,
					'filename': data.InkBlob.filename,
					'container': instance.settings.fp_container,
					'path': instance.settings.fp_path
				}, function(InkBlob){
					data.InkBlob = InkBlob;
					plugin.post_store(data);
				}, function(FPickError){
					plugin.log_error(FPickError);
				}, function(percent){
					plugin.on_progress(data, percent);
				});
			}
			else {
				plugin.post_store(data);
			}
		},
		
		show_progress_bar: function(data, message){
      var instance = data.instance;
      if (typeof(instance.settings.fp_on_progress) != 'function') {
        $('body').css('overflow', 'hidden');
        data.plugin.progressBarMessage.html('<p>' + message + '</p>');
        data.plugin.progressBarContainer.css('display', 'block');
      }
		},
		
		hide_progress_bar: function(){
			var that = this;
			that.progressBarMessage.html('');
			that.progressBarContainer.css('display', 'none');
			that.progressBarOverlay.css('width', '0');
			$('body').css('overflow', 'visible');
		},
		
		on_progress: function(data, percentage){
      if(typeof(data.instance.settings.fp_on_progress) == 'function'){
        data.instance.settings.fp_on_progress.call(percentage);
      } else {
        data.plugin.progressBarOverlay.css('width', percentage + '%');
      }
		},
		
    drag_enter: function(data){ // Only applicable for drop-pane
     if (typeof(data.instance.settings.fp_drag_enter) == 'function') {
       data.instance.settings.fp_drag_enter();
     }  
    },
    
    drag_leave: function(data){ // Only applicable for drop-pane
      if(typeof(data.instance.settings.fp_drag_leave) == 'function') {
        data.instance.settings.fp_drag_leave();
      }
    },
    
    on_start: function(data){ // Only applicable for drop-pane
      if(typeof(data.instance.settings.fp_on_start) == 'function') {
        data.instance.settings.fp_on_start();
      }
    },
    
		post_store: function(data){
			var plugin = data.plugin;
			var instance = data.instance;
			plugin.hide_progress_bar();
			//Append the original MIME type to InkBlob
			data.InkBlob.originalMimeType = plugin.originalMimeType;
			data.InkBlob.triggerAttributes = instance.triggerAttributes;
			if (instance.settings.get_stats) {
				// get extended statistics for the file (width, height)
				plugin.show_progress_bar(data, 'Gathering information about your file...');
				plugin.on_progress(data, "100");
				plugin.picker.stat(data.InkBlob, {
					width: true,
					height: true
				}, function(metadata){
					plugin.hide_progress_bar();
					data.InkBlob.width = metadata.width;
					data.InkBlob.height = metadata.height;
					instance.settings.callback(data.InkBlob);
				});
			}
			else {
				instance.settings.callback(data.InkBlob);
			}
		},
		
		// Proxy certain filepicker functions
		makeDropPane: function(){
			this.init_picker(); // Initialize filepicker, in case this method was called directly
			return this.picker.makeDropPane.apply(this, arguments);
		}
		
	}
})(jQuery, window, document)
