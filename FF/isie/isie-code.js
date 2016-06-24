	
if (isIE(9,'lte')) {
	

	
	var div = document.getElementById('ieYtFix');
	div.style.overflow = "auto";
    
	
	div.innerHTML = '<div style="position:relative; width:75%; padding:0 0 42.1875% 0; margin:0 auto 40px auto; height:0;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" width="560" height="315" src="https://www.youtube.com/embed?max-results=1&rel=0&listType=user_uploads&list=fietheband" frameborder="0" allowfullscreen></iframe></div>'; 
	
	var div = document.getElementById('abtc');
	div.style.maxWidth = "700px";
	
	var div = document.getElementById('ieEvFix');
	div.style.overflow = "auto";
	div.innerHTML = '<p  class="btmLrg"><a target="_blank" href="https://www.facebook.com/fietheband/events">View Events</a></p>'; 
	
	
	var div = document.getElementById('abig');
	div.innerHTML = '<p class="btmLrg1"><a target="_blank" href="https://www.facebook.com/fietheband/photos">View Gallery</a></p>';

	var css = '#absc .abscinfo2 {border-bottom: none !important;} #absc .audiojs {border-bottom: 1px solid rgb(255, 255, 255); border-bottom: 1px solid rgba(255, 255, 255, 0.3); border-top: 1px solid rgb(255, 255, 255); border-top: 1px solid rgba(255, 255, 255, 0.3);}',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

	style.type = 'text/css';
	if (style.styleSheet){
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}

head.appendChild(style);
	
}	

	
//is it IE? isIE(); 

//is it IE6? isIE(6);

//is it less than or equal to IE 8?
if (isIE(8,'lte')) {
	
	document.body.style.width = '700px';
	document.body.style.background = '#000';
	document.body.style.margin = '0 auto';
	
	
	var div = document.getElementById('main');
	
	div.innerHTML = '<div style="display: block; background-color:#EE2222; width: 700px; text-align:center"><p style="margin:0px;">Browser not supported: Please update Internet Explorer, or use a different browser.</p></div><div><img width="100%"" src="images/simple.png"/></div><div><ul class="iesocial"><li><a style="color:#fff;" href="https://www.facebook.com/fietheband">Facebook</a></li><li><a style="color:#fff;" href="http://twitter.com/fiefiefie1">Twitter</a></li><li><a style="color:#fff;" href="http://www.youtube.com/user/fietheband">YouTube</a></li><li><a style="color:#fff;" href="https://soundcloud.com/fie-fie-fie">Soundcloud</a></li></ul></div>';
	
	var div = document.getElementById('bg');
	div.innerHTML = "";
}

//if (isIE(7,'lte')) {
		//var div = document.getElementById('main');
	//div.innerHTML = div.innerHTML + '<div style="display: block; background-color:#EE2222; width: 650px; float:right;"><p style="margin:0px; padding-right: 20px;">Browser not supported: Please update Internet Explorer, or use a different browser.</p></div>';
	
	//document.getElementById('banner').style.display = 'none';		
	
//}

