var sideButton = $('.sidemenu a');

sideButton.click(function(event){ 	
	var sender = $(event.target)
	var num = sender.data("link")
	$("[data-article]").addClass("hidden");
	var content = $("[data-article=" + num + " ]").removeClass("hidden");
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHNpZGVCdXR0b24gPSAkKCcuc2lkZW1lbnUgYScpO1xuXG5zaWRlQnV0dG9uLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KXsgXHRcblx0dmFyIHNlbmRlciA9ICQoZXZlbnQudGFyZ2V0KVxuXHR2YXIgbnVtID0gc2VuZGVyLmRhdGEoXCJsaW5rXCIpXG5cdCQoXCJbZGF0YS1hcnRpY2xlXVwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcblx0dmFyIGNvbnRlbnQgPSAkKFwiW2RhdGEtYXJ0aWNsZT1cIiArIG51bSArIFwiIF1cIikucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=