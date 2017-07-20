$(function() {
	var emailreg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

	$(".boton").click(function(){
		$(".error").fadeOut().remove();

		if ($(".Nombre").val() == "") {
			$(".Nombre").focus().after('<span class="error">Ingres&aacute; tu Nombre</span>');
			return false;
		}
		if ($(".Email").val() == "" || !emailreg.test($(".Email").val())) {
			$(".Email").focus().after('<span class="error">Ingres&aacute; un Email correcto</span>');
			return false;
		}
		if ($(".Cod").val() == "") {
			$(".Cod").focus().after('<span class="error">Ingres&aacute; un C&oacute;digo de area</span>');
			return false;
		}
		if ($(".Telefono").val() == "") {
			$(".Telefono").focus().after('<span class="error">Ingres&aacute; un Tel&eacute;fono</span>');
			return false;
		}
		if ($(".Provincia").val() == "") {
		$(".Provincia").focus().after('<span class="error">Seleccion&aacute; una Provincia</span>');
		return false;
	}

	if ($(".Modelo").val() == "") {
			$(".Modelo").focus().after('<span class="error">Ingres&aacute; un modelo</span>');
			return false;
		}
		if ($(".Comentario").val() == "") {
			$(".Comentario").focus().after('<span class="error">Ingres&aacute; un Mensaje</span>');
			return false;
		}
	});

	$(".Nombre, .Email, .Cod, .Telefono, .Modelo, .Comentario").bind('blur keyup', function(){
		if ($(this).val() != "") {
			$('.error').fadeOut();
			return false;
		}
	});
	$(".Email").bind('blur keyup', function(){
		if ($(".Email").val() != "" && emailreg.test($(".Email").val())) {
			$('.error').fadeOut();
			return false;
		}
	});

	var $contacto = $('.contacto');

	$contacto.submit(function(e) {
		e.preventDefault();
		$.ajax({
			url: 'https://formspree.io/p.oesteautosf+formWeb@gmail.com',
			method: 'POST',
			data: $(this).serialize(),
			dataType: 'json',
			beforeSend: function() {
				$(".error").fadeOut().remove();
				$(".boton").after('<span class="error jxBefore">Enviando mensaje...</span>');
				$(".boton").click(function() { return false; });
			},
			success: function(data) {
				$(".error").fadeOut().remove();
				$(".boton").after('<span class="error jxSuccess">¡Mensaje enviado!</span>');
			},
			error: function(err) {
				$(".boton").after('<span class="error jxError">Disculpe, mensaje no enviado</span>');
			}
		});
	});
});