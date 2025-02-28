$(document).ready(function() {
	$("textarea").each(function(){  
		$(this).bind('input propertychange', function() {
			var maxLength = $(this).attr('maxlength');  
			if ($(this).val().length > maxLength) {
				$(this).val($(this).val().substring(0, maxLength));  
			}  
		});
	});      
		
	$(".ww-datepicker").each(function(){   
		var id = $(this).attr('id')
			id = (id != "") ? $.trim(id) : "";
			id =  (id != "") ? '#'+id : "";
		var datePast = $.trim( $(id).attr('data-datepast') );
		var dateFuture = $.trim( $(id).attr('data-datefuture') );
		var daysOfWeekStr = $.trim( $(id).attr('data-daysofweekstr') );
		var startDate = $.trim( $(id).attr('data-startdate') );
		var endDate = $.trim( $(id).attr('data-enddate') );
		var disabledCustomDates = $.trim( $(id).attr('data-disabledCustomDates') ).split("\n");

		var allowedPastDates = false;
		var allowedFutureDates = false;
		if (datePast == 1) {
			datePast = true;
		} else {
			datePast = false;
		}
		if (dateFuture == 1) {
			dateFuture = true;
		} else {
			dateFuture = false;
		}        
	
		if (datePast && (!dateFuture)){
			allowedPastDates = true;
		} else if ((!datePast) && dateFuture){
			allowedFutureDates = true;
		} else if ((!datePast) && (!dateFuture)){
			allowedPastDates = true;
			allowedFutureDates = true;
		}
		
		var daysOfWeekArr = daysOfWeekStr.toString().split(",");
		function checkAllowedDaysOfWeek(date){
			var day = date.getDay();			
			if (day == 0 && (jQuery.inArray("0", daysOfWeekArr) !== -1))
				return true;
			if (day == 1 && (jQuery.inArray("1", daysOfWeekArr) !== -1))
				return true;
			if (day == 2 && (jQuery.inArray("2", daysOfWeekArr) !== -1))
				return true;
			if (day == 3 && (jQuery.inArray("3", daysOfWeekArr) !== -1))
				return true;
			if (day == 4 && (jQuery.inArray("4", daysOfWeekArr) !== -1))
				return true;
			if (day == 5 && (jQuery.inArray("5", daysOfWeekArr) !== -1))
				return true;
			if (day == 6 && (jQuery.inArray("6", daysOfWeekArr) !== -1))
				return true;
			return false;
		}
		
		function checkCustomDates(date){
			var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
			return (jQuery.inArray(string, disabledCustomDates) == -1);
		}

		$(id).datepicker({
			changeMonth: true,
			changeYear: true,
			yearRange: "1930:2075",
			dateFormat : "yy-mm-dd"
		});

		if (allowedPastDates){
			$(id).datepicker('option', 'maxDate', 0);
		}

		if (allowedFutureDates){
			$(id).datepicker('option', 'minDate', 0);
		}

		if (daysOfWeekStr.length == 0){
			$(id).datepicker('option', 'beforeShowDay',function(date){
				if (checkAllowedDaysOfWeek(date)){
					return [true];
				}
				return [false];
			});
		} else {
			// Destroy 
			$(id).datepicker('destroy');
			// Initialize
			$(id).datepicker({
				changeMonth: true,
				changeYear: true,
				yearRange: "1930:2075",
				dateFormat: "yy-mm-dd"
			});

			if (allowedPastDates){
				$(id).datepicker('option', 'maxDate', "0");
			} else if (endDate.length > 0) {
				$(id).datepicker('option', 'maxDate', endDate);
			}

			if (allowedFutureDates){                 
				$(id).datepicker('option', 'minDate', "0");
			} else if (startDate.length > 0) {
				$(id).datepicker('option', 'minDate', startDate);
			}
			
			$(id).datepicker('option', 'beforeShowDay',function(date){
				if (checkAllowedDaysOfWeek(date)){
					if (checkCustomDates(date)){
						return [true];
					}
				}
				return [false];
			});
		}
	});
	
	$(".ratings-wrapper").each(function(){   
		var name = $(this).children('input').attr('name');
		var name = '.'+name;
		var id = $(this).children('input').attr('id');
		var id = '#'+id;
		
		$(name+"_reset").hide();

		var aStars = $(this).children('input').attr('data-aStars');
		
		for (var i = 1; i <= aStars; i++) {
			$(name+"_rating .ratings-wrap > span[data-val=" + i + "]").addClass("clicked");
		}
		
		$.artaraxRatingStar({ onClickCallBack: onRatingStar });
		function onRatingStar(rate){
			$(id).val(rate);
			$(name+"_reset").show().click(function() {                       
				$(name+"_rating .ratings-wrap > span").removeClass("clicked");
				$(name+"_reset").hide();
				$(id).val("");
			});
		}
	});
	
	/*select dropdown*/
	$("select#billing_country").change(function(){
		var facadeUrl = "/api/ajaxfacade.cfc?_cf_nodebug=true";
		$.ajax({
			type: 'POST',
			url: facadeUrl,
			data: {
				method: "getStates",
				_cf_nodebug: "true",
				'country': $(this).val()
			},
			dataType: 'json',
			success: function(res){
				var options = '';
				var code = '';
				var region = '';
				var country = '';
				if (res.DATA.length <= 1){
					options += '<option value="n/a">Not Applicable</option>';
				} else {
					for (var i = 0; i < res.DATA.length; i++) {
						code = res.DATA[i][res.COLUMNS.findIdx('CODE')];
						region = res.DATA[i][res.COLUMNS.findIdx('REGION')];
						country = res.DATA[i][res.COLUMNS.findIdx('COUNTRY_CODE')];
						if (i == 0)
							options += '<option value="">Select State/Region</option>';
						if (code != country)
							options += '<option value="' + code + '">' + region + '</option>';
						}
				}
				$("#billing_region").html(options);
				$('#billing_region option:first').attr('selected', 'selected');
			},
			error: function(xhr, status, errorThrown) {

			}
		});
	});
		
	$(".file-upload").on("click",function(){	
		$('.wait-upload').show();
		var fieldId = id = $(this).next().attr('id')
			id = (id != "") ? $.trim(id) : "";
			id =  (id != "") ? '#'+id : "";

		var jsFieldTypeArray = $.trim( $(id).attr('data-jsFieldTypeArray') ).split(",");
		var s3Bucket = $.trim( $(id).attr('data-s3Bucket') );
		var maximumFiles = Number( $.trim( $(id).attr('data-maximumFiles') ) );
		var maxFileSize = Number( $.trim( $(id).attr('data-maxFileSize') ) ); 
		var orgId = $.trim( $(id).attr('data-orgId') ); 
		var filepickerAPIKey = $(id).attr('data-filepickerAPIKey');   
		
		var picker = null;
		var alreadyUploadedData = [];
		var numFilesToUpload = 0;			
		
		var client = filestack.init("A9rpgyKBfTriWJiBBtDprz");
	
		if (numFilesToUpload == 0){
			numFilesToUpload = maximumFiles;                  
		}

		var options = {
			accept: jsFieldTypeArray,
			fromSources: ["local_file_system","instagram","facebook"],
			storeTo: {
				location: 's3',
				path: '/data/org/'+orgId+'/file/',
				container: s3Bucket,
				region: 'ap-southeast-1'
			},
			maxFiles: numFilesToUpload,
			maxSize: maxFileSize * 1024 * 1024,
			uploadInBackground: false,
			onFileSelected: function(file) {
				var extension = file.filename.substr(file.filename.indexOf('.')+ 1).toLowerCase();
				var found = $.inArray(extension,jsFieldTypeArray);
				if (file.size > (maxFileSize * 1024 * 1024)) {
					alertify.alert('File too big, select something smaller than ' + maxFileSize + 'MB');
				}
				if (found == -1){
					alertify.alert("You are allowed to upload files of the following extensions: " + jsFieldTypeArray.join(", "));
				}                       
			},
			onUploadDone: function(uploadData){
				var arr = [];
				var filenameList = "";
				$("#"+fieldId+"_uploaded_files").empty();
				$("#"+fieldId+"_uploaded_files").append("<p>Files Uploaded:</p>");
				
				$.each(uploadData.filesUploaded,function(index,value){
					var s3Filename = s3Bucket + ".s3.ap-southeast-1.amazonaws.com/"+uploadData.filesUploaded[index]["key"];
					alreadyUploadedData.push(uploadData.filesUploaded[index]);
				});
				
				$.each(alreadyUploadedData,function(index,value){
					arr.push(alreadyUploadedData[index]["key"].split("/").pop());
					$("#"+fieldId+"_uploaded_files").append("<p>"+alreadyUploadedData[index]["filename"]+" <a class='ps-del-file' data-filename='" + alreadyUploadedData[index]["filename"] + "' data-key='"+value["key"]+"'><i class='fa fa-times'></i></a></p>");
				});
				
				$(".ps-del-file").click(function(){
					var filename = $(this).data("filename");
					var key = $(this).data("key");
					
					var index = alreadyUploadedData.map(function(o) { return o.filename; }).indexOf(filename);
					alreadyUploadedData.splice(index, 1);
					
					var indexKey = $.inArray(key.split("/").pop(),arr);
					arr.splice(indexKey,1);
					
					filenameList = arr.join(",");
					$("."+fieldId+"_uploaded_filename").val(filenameList);
					$(this).parent().remove();
					numFilesToUpload = maximumFiles - alreadyUploadedData.length;
					
					if (alreadyUploadedData.length == 0){
						$("#"+fieldId+"_uploaded_files").empty();
					}
				});						
				numFilesToUpload = maximumFiles - alreadyUploadedData.length;
				filenameList = arr.join(",");
				$("."+fieldId+"_uploaded_filename").val(filenameList);
				$('.wait-upload').hide();
			},
			onCancel() {
				$('.wait-upload').hide();
			},
			onClose() {
				$('.wait-upload').hide();  
			}
		};
		
		if (alreadyUploadedData.length == maximumFiles){
			alertify.alert("You can only upload a maximum of " + maximumFiles + " file(s).");
		}
		else {
			picker = client.picker(options);				
			picker.open();
		}
	});
	

	$(".phone_number").each(function(){
		var fieldId = $.trim( $(this).siblings('.phone-details').attr('id') );
		var id = '#'+fieldId;
		var input = document.querySelector(id+"_tel"),
		validMsg = document.querySelector(id+"_valid"),
		errorMsg = document.querySelector(id+"_error_msg");
		var validateInvalidPhone = $(id).attr('data-validateInvalidPhone');
		var validateInvalidCountry = $(id).attr('data-validateInvalidCountry');
		var validateInvalidPhoneTooShort = $(id).attr('data-validateInvalidPhoneTooShort');
		var validateInvalidPhoneTooLong = $(id).attr('data-validateInvalidPhoneTooLong');
		var defaultCountryCode = $(id).attr('data-defaultCountryCode');
		
		$(id+"_valid").css({'color':'#008000'});
			
		// here, the index maps to the error code returned from getValidationError - see readme
		var errorMap = [validateInvalidPhone, validateInvalidCountry, validateInvalidPhoneTooShort, validateInvalidPhoneTooLong,validateInvalidPhone];
		
		var iti = window.intlTelInput(input,{
			nationalMode: true,
			initialCountry: defaultCountryCode,
			utilsScript: "/data/global/media/js/int-tel-input/js/utils.js"
		});
		
		var reset = function() {
		errorMsg.innerHTML = "";
		errorMsg.classList.add("hide");
		validMsg.classList.add("hide");
		};
		
		// on blur: validate
		input.addEventListener('blur', function() {
		reset();
		if ( $.trim( input.value ) ) {
			if (iti.isValidNumber()) {
				validMsg.classList.remove("hide");
				$(id).val(iti.getNumber());
			} else {
				var errorCode = iti.getValidationError();
				errorMsg.innerHTML = errorMap[errorCode];
				errorMsg.classList.remove("hide");
			}
		} else {
			$(id).val(input.value);
		}
		});
		
	});  

$("#Submit").click(function(){
	setTimeout(function () {
		$("#Submit").prop( "disabled", true );
	}, 5);
});

});   