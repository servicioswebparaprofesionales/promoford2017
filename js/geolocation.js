$(function() {
 
	// Geolocation information
	var geo_api_url = "http://ip-api.com/json/";
	var form = $("form");
	if (form.length > 0) {
		$.getJSON(geo_api_url, function(data){
			//console.log(data);
			if (data.status == 'success') {
				if ($('#geo_data_ciudad').length == 0 ) {
					$("<input>").attr({"type":"hidden","name":"geo_data_ciudad","id":"geo_data_ciudad"}).val(data.city).appendTo(form);
				}else{
					$('#geo_data_ciudad').val(data.city);
				}
				if ($('#geo_data_provincia').length == 0 ) {
					$("<input>").attr({"type":"hidden","name":"geo_data_provincia","id":"geo_data_provincia"}).val(data.regionName).appendTo(form);
				}else{
					$('#geo_data_provincia').val(data.regionName);
				}
				if ($('#geo_data_pais').length == 0 ) {
					$("<input>").attr({"type":"hidden","name":"geo_data_pais","id":"geo_data_pais"}).val(data.country).appendTo(form);
				}else{
					$('#geo_data_pais').val(data.country);
				}
				if ($('#geo_data_lat').length == 0 ) {
					$("<input>").attr({"type":"hidden","name":"geo_data_lat","id":"geo_data_lat"}).val(data.lat).appendTo(form);
				}else{
					$('#geo_data_lat').val(data.lat);
				}
				if ($('#geo_data_long').length == 0 ) {
					$("<input>").attr({"type":"hidden","name":"geo_data_long","id":"geo_data_long"}).val(data.lon).appendTo(form);
				}else{
					$('#geo_data_long').val(data.lon);
				}
				
				autoSelectProvincia();
			}
		});
	}

	function autoSelectProvincia() {
		var geo_data_provincia = $('input[name="geo_data_provincia"]');
		var input = $('select[name="Provincia"]');
		
		if (input.length>0 && geo_data_provincia.length >0 && geo_data_provincia.val() != "") {
			var geoProvincia = limpiarNombreProvincia(geo_data_provincia.val());
			
			
			input.find("option").each (function (e) {
				var prov = limpiarNombreProvincia($(this).val());
				// comparamos las provincias en minusculas
				if (prov == geoProvincia) {
					input.find("option:selected").removeAttr("selected"); // clear
					$(this).attr("selected","selected");
					// Added for customSelect plugin https://github.com/adamcoulombe/jquery.customSelect
					if (input.hasClass("hasCustomSelect")) {
						input.trigger('render'); // Trigger an refresh on the select box.
					}
					return;
				}
			});
		}
		return ;
	}

	function limpiarNombreProvincia(provincia) {
		if (!provincia) return "";
		var nuevaprovincia = provincia.toLowerCase();
		nuevaprovincia = nuevaprovincia.replace(/[á|ã|â|à]/gi, "a");
		nuevaprovincia = nuevaprovincia.replace(/[é|ê|è]/gi, "e");
		nuevaprovincia = nuevaprovincia.replace(/[í|ì|î]/gi, "i");
		nuevaprovincia = nuevaprovincia.replace(/[õ|ò|ó|ô]/gi, "o");
		nuevaprovincia = nuevaprovincia.replace(/[ú|ù|û]/gi, "u");
		nuevaprovincia = nuevaprovincia.replace(/Buenos Aires F.D./gi, "capital federal");
		
		// Si es necesario, hace macheo de provincias obtenidas aqui.	
		return nuevaprovincia;
	}

});