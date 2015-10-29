var sideButton = $('.sidemenu a');

sideButton.click(function(event){ 	
	var sender = $(event.target)
	var num = sender.data("link")
	$("[data-article]").addClass("hidden");
	var content = $("[data-article=" + num + " ]").removeClass("hidden");
});