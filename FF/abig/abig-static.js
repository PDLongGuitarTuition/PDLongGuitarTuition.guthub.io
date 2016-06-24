var photoSwitch = 1; 
			
var imgCutpoints = [3]; //array of size = imgNoOfCuts, the height of each cut point in images in the 1st column. (leave empty for 0 cuts).
var imgCount = 18;
var imgNamePre = "ohnoitsavon-";
var imgExt = ".jpg";
var imgFolder = "images/";

var viewportWidth = 1920;
var viewportHeight = 1080;

$(document).ready(function() {

	$('#abig').html("<div id=\"photoCont\"><div id=\"photoInnerCont\"><div id=\"abPhotoGal\"></div></div><p class=\"photoBtnCont\"><a class=\"photoBtn\" href=\"#\">More...</a></p></div></div>");
	
	for (i = 1; i <= imgCount; i++) { 
	$("#abPhotoGal").append( "<div class=\"abPhoto\"><a class=\"abphotolink\" href=\"#\"><img src='"+ imgFolder + imgNamePre + i + imgExt +"'></a></div>" );
	}		
	
	$('.photoBtn').click(function (event) {
	event.preventDefault();
	
	photoSwitch = photoSwitch + 1;
	SetImgHeight(photoSwitch);
	
	});	
		
	function LoadImage (position) {
		
		var lbimg;
		var Limg;
		var Rimg;
		var nextI;
		
		viewportWidth = $(window).width();
		viewportHeight = $(window).height();
		
		var temphtmlL;
		
		if (position == 1) {
			temphtmlL = "";
		}
		else
		{
			temphtmlL = "<a class=\"leftImg\" href=\"#\"><i class=\"fa fa-chevron-left \"></i></a>";
			nextI = position - 1;
			Limg = nextI;
		}
		
		var temphtmlR;
		
		if (position == imgCount) {
			temphtmlR = "";
		}
		else
		{
			temphtmlR = "<a class=\"rightImg\" href=\"#\"><i class=\"fa fa-chevron-right \"></i></a>";
			nextI = position + 1;
			Rimg = nextI;
		}
		
		lbimg = $("<div class=\"fsimg\">" + temphtmlL + temphtmlR +"<a class=\"closeImg\" href=\"#\"><i class=\"fa fa-times\"></i></a><img class=\"fsinner\" src=\"" + imgFolder + imgNamePre + position + imgExt + "\"/></div>").prependTo("body");
		$('.fsimg').css("background-image", "url(\"" + imgFolder + imgNamePre + position + imgExt + "\")"); 

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

	$('.abphotolink').click(function (event) {

		event.preventDefault();
		LoadImage ($(this).parent().prevAll().length + 1);

	});
			
});

$(window).load(function() {
	
	SetImgHeight(photoSwitch);

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