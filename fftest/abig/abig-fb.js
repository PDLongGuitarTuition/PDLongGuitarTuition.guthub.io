var photoSwitch = 1; 
			
var imgCutpoints = [3]; //array of size = imgNoOfCuts, the height of each cut point in images in the 1st column. (leave empty for 0 cuts).
var imgCount = 0;

var viewportWidth = 1920;
var viewportHeight = 1080;

var albumID = 1179997892044496;//540549909322634;

var abphotoarray = [];
	
//return data
$.getJSON("https://graph.facebook.com/"+ albumID +"/photos?access_token=1644452822510545|KX0oTj12d9mqW6ACWO-_5f4k01M&limit=100", function(data) {

	if (data == null) {
		//wrapper.html('No tweets available.');
		return false;
	}
		
	$.each(data.data, function(i, field) {
		abphotoarray.push(field.id);	
	});	
		
		
}).fail(function(jqxhr, textStatus, error) {
	//wrapper.html('No tweets available');
}).then(function(){
	
	function Shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
	};
	
	$(document).ready(function() {
			
		$('#abig').html("<div id=\"photoCont\"><div id=\"photoInnerCont\"><div id=\"abPhotoGal\"></div></div><p class=\"photoBtnCont\"><a class=\"photoBtn\" href=\"#\">More...</a></p></div></div>");	
		
		Shuffle(abphotoarray);
		imgCount = abphotoarray.length;
		for (i = 1; i <= imgCount; i++) { 
		
		$("#abPhotoGal").append( "<div class=\"abPhoto\"><a class=\"abphotolink\" href=\"#\"><img src=\"https://graph.facebook.com/"+ abphotoarray[i-1] +"/picture\"/></a></div>");	
			
					
		}
		
		$('#abig').waitForImages(function() {
			// All descendant images have loaded, now slide up.
			SetImgHeight(photoSwitch);	
		});
			
		
		
		$('.photoBtn').click(function (event) {
			event.preventDefault();
		
			photoSwitch = photoSwitch + 1;
			SetImgHeight(photoSwitch);
		
		});	
		
		$('.abphotolink').click(function (event) {
			event.preventDefault();
			console.log($(this).parent().prevAll().length);
			LoadImage($(this).parent().prevAll().length);
		});
	
	});
		

	$(window).resize(function () {

		SetImgHeight(photoSwitch);
		
		viewportWidth = $(window).width();
		viewportHeight = $(window).height();
		
		if ($(".fsinner").height() >= viewportHeight || $(".fsinner").width() >= viewportWidth) 
		{
			$('.fsimg').css("background-size", "contain");  
		}
		else
		{
			$('.fsimg').css("background-size", "auto");  
		}
				
	});

	function LoadImage (position) {
		
		var lbimg;
		var Limg;
		var Rimg;
		var nextI;
		
		viewportWidth = $(window).width();
		viewportHeight = $(window).height();
		
		var temphtmlL;
		
		if (position == 0) {
			temphtmlL = "";
		}
		else
		{
			temphtmlL = "<a class=\"leftImg\" href=\"#\"><i class=\"fa fa-chevron-left \"></i></a>";
			nextI = position - 1;
			Limg = nextI;
		}
		
		var temphtmlR;
		
		if (position == imgCount-1) {
			temphtmlR = "";
		}
		else
		{
			temphtmlR = "<a class=\"rightImg\" href=\"#\"><i class=\"fa fa-chevron-right \"></i></a>";
			nextI = position + 1;
			Rimg = nextI;
		}
		
		lbimg = $("<div class=\"fsimg\">" + temphtmlL + temphtmlR +"<a class=\"closeImg\" href=\"#\"><i class=\"fa fa-times\"></i></a><img class=\"fsinner\" src=\"https://graph.facebook.com/"+ abphotoarray[position] +"/picture\"/></div>").prependTo("body");
		$('.fsimg').css("background-image", "url(\"https://graph.facebook.com/"+ abphotoarray[position] +"/picture\")"); 

		if ($(".fsinner").height() >= viewportHeight || $(".fsinner").width() >= viewportWidth) 
		{
			$('.fsimg').css("background-size", "contain");  
		}
		else
		{
			$('.fsimg').css("background-size", "auto");  
		}

		$('.closeImg').click(function (event) {
			event.preventDefault();
			lbimg.remove();
		});
		
		$('.leftImg').click(function (event) {
			event.preventDefault();
			lbimg.remove();
			LoadImage (Limg);
		});
		
		$('.rightImg').click(function (event) {
			event.preventDefault();
			lbimg.remove();
			LoadImage (Rimg);
		});
		
	};
	
	
	function SetImgHeight(a){
		var ih = [];
		var ht = 0;
		
		if (a-1 < imgCutpoints.length) {
			for (i = 1; i <= imgCutpoints[a-1]; i++) { 
		
				if (i == imgCutpoints[a-1]) {
					ih.push($(".abPhoto").eq(i-1).height());
				} 
				else
				{
					ih.push($(".abPhoto").eq(i-1).outerHeight());
				}
				
				ht = ht + ih[i-1];
			}	
		
			//console.log(ht);
		
			$("#photoInnerCont").css({
				'overflow' : 'hidden',
				'height' : ht
			});
		}
		else
		{
			$('.photoBtnCont').hide();
			$("#photoInnerCont").css({
				'overflow' : 'auto',
				'height' : 'auto'
			});
		}
		
		
		
	}

});