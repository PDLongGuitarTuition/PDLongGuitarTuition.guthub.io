(function($) {
	$.fn.extend({

		abfbe : function(options) {

			var defaults = {
			    pageID: 540368232674135 //<-- fie mcfly --> 5959662955
			}
			
			var options = $.extend(defaults, options);
			
			return this.each(function() {
				var o = options;
				var htmltext = "";
				var noofevents = 0;
				var eventarray = [];
				var div = document.getElementById('abfbe');
				
			//return data
			$.getJSON("https://graph.facebook.com/"+ o.pageID +"/events?access_token=1644452822510545|KX0oTj12d9mqW6ACWO-_5f4k01M&since=" + Math.floor(Date.now() / 1000), function(data) {

				if (data == null) {
					return false;
				} else {
					if (data.data.length == 0) {
						htmltext = htmltext + "<h3 class=\"NoEvents\">No upcoming events</h3>"
					}
					else
					{
						htmltext = htmltext + '<div id="abfbe-table"><table cellspacing="0" style="width:100%;"><thead><tr><th class="fbeDate">DATE</th><th>VENUE</th><th>CITY</th><th class="fbeName">NAME</th><th class="fbeDesc">DESCRIPTION</th><th class="fbeLink">LINK</th></tr></thead><tbody>';		
					
					
				$.each(data.data, function(i, field) {
					//console.log(field);
					
					noofevents = noofevents + 1;
					
					if (!("start_time" in field)) {
						return true;
					}
					
					var aDate = [];
					aDate[0] = field.start_time.substr(8, 2);
					aDate[1] = field.start_time.substr(5, 2);
					aDate[2] = field.start_time.substr(0, 4);  
					
					if (aDate[0] == 1) { 
						aDate[0] = aDate[0] + "<sup>st</sup>";
					} else 
					if (aDate[0] == 2) {
						aDate[0] = aDate[0] + "<sup>nd</sup>";
					} else if (aDate[0] == 3) { 
						aDate[0] = aDate[0] + "<sup>rd</sup>";
					} else if (aDate[0] >= 4 && aDate[0] <= 20) { 
						aDate[0] = aDate[0] + "<sup>th</sup>";
					} else {
						
						if (aDate[0] == 0) {
							aDate[0] = "0th"
						} else {
							if (aDate[0].toString()[1] == '1') { 
							aDate[0] = aDate[0] + "<sup>st</sup>";
							} else if (aDate[0].toString()[1] == '2') {
								aDate[0] = aDate[0] + "<sup>nd</sup>";
							} else if (aDate[0].toString()[1] == '3') {
								aDate[0] = aDate[0] + "<sup>rd</sup>";
							} else {
								aDate[0] = aDate[0] + "<sup>th</sup>";
							}
						}
					}
					
					if (aDate[1] == 1) { 
						aDate[1] = "Jan"; 
					} else if (aDate[1] == 2) {
						aDate[1] = "Feb"; 
					} else if (aDate[1] == 3) { 
						aDate[1] = "Mar"; 
					} else if (aDate[1] == 4) { 
						aDate[1] = "Apr"; 
					} else if (aDate[1] == 5) { 
						aDate[1] = "May"; 
					} else if (aDate[1] == 6) { 
						aDate[1] = "June"; 
					} else if (aDate[1] == 7) { 
						aDate[1] = "July"; 
					}else if (aDate[1] == 8) { 
						aDate[1] = "Aug"; 
					}else if (aDate[1] == 9) { 
						aDate[1] = "Sept"; 
					}else if (aDate[1] == 10) { 
						aDate[1] = "Oct"; 
					}else if (aDate[1] == 11) { 
						aDate[1] = "Nov"; 
					}else { aDate[1] = "Dec"; }
											
					dDate = aDate.join(' ');
					
					
					if (!("name" in field)) {
						return true;
					}
					
					var descfix = "";
					
					if (!("description" in field)) {
						return true;
					}
					else
					{
				
						if (field.name == field.description) 
						{
							descfix = "";
						}
						else
						{
							descfix = field.description;
						}
					}
					
					var elocation = "";
					var placename = "";
					
					if (!("place" in field)) {
						elocation = "";
						placename = field.name;
					} else {
						elocation = field.place.location.city + " | " + field.place.location.country;
						placename = field.place.name;
					}
					
					
					
					eventarray.push("<tr style=\"cursor: pointer; cursor: hand;\" onclick=\"window.open ('https://www.facebook.com/events/" + field.id + "','_blank')\"><td class=\"fbeDate\"><div>" + dDate +"</div></td><td>" + placename + "</td><td>" + elocation + "</td><td class=\"fbeName\">" + field.name + "</td><td class=\"fbeDesc\">" + descfix + "</td><td class=\"fbeLink\"><span>Link</span></td>");

					
				});	
				}
			}		
					
			}).fail(function(jqxhr, textStatus, error) {

			}).then(function(){
				
				

				$(eventarray.reverse()).each(function(index) { htmltext = htmltext + eventarray[index] });


				
				
				
				htmltext = htmltext + "</tbody></table></div><div id=\"abfbehidden\" style=\"display:none;\"><p style=\"text-align:center;\"class=\"btmLrg\"><a href=\"#\">Show All</a></p></div>";
				
				div.innerHTML = htmltext;
				
				$('#abfbe-table').css("overflow","hidden");
				
				var abfbeHswitch = 0;
				
				
				var abfbeH5 = 0;
				
				FixResize();
				
				$(window).resize(function () {
						FixResize();
						
					});
				
				$('#abfbehidden a').click(function (event) {
						event.preventDefault();
						abfbeHswitch = 1;
						$("#abfbe-table").height("auto");
						$("#abfbehidden").css("display","none");
						$("#abfbe-table").css("paddingBottom","2%");
				});
				
				function FixResize() {
					
					$("td.fbeLink span").html("Link");
					$("th.fbeLink").html("LINK");
					$(".fbeDesc").css("display","table-cell")
					$(".fbeName").css("display","table-cell")
					$(".fbeLink").css("display","table-cell")
					$('#abfbe-table table td').css("font-size","120%")
					$('#abfbe-table table th').css("font-size","120%")
					$('#abfbe-table table td').css("font-size","break-all")
					$('#abfbe-table').css("overflow-x","hidden");
					//$('#abfbe-table').css("overflow","scroll");
				
					if ($('#abfbe-table table').outerWidth() > $('#abfbe-table').outerWidth()) 
					{
						//console.log("overflow");
						$(".fbeDesc").css("display","none")
						
						if ($('#abfbe-table table').outerWidth() > $('#abfbe-table').outerWidth()) 
						{
							$(".fbeName").css("display","none")
							$(".fbeLink").css("display","none")
							$(".fbeDate").css("width","10%");
							$('#abfbe-table table td').css("font-size","100%");
							
							if ($('#abfbe-table table').outerWidth() > $('#abfbe-table').outerWidth()) 
							{
								$('#abfbe-table table td').css("font-size","4vw");
								$('#abfbe-table table th').css("font-size","4vw");
							}
							
							if ($('#abfbe-table table').outerWidth() > $('#abfbe-table').outerWidth()) 
							{
								$('#abfbe-table table td').css("padding","5px");
								$('#abfbe-table table th').css("padding","5px");
								if ($('#abfbe-table table').outerWidth() > $('#abfbe-table').outerWidth()) 
									{
										$('#abfbe-table').css("overflow-x","scroll");
									}
							}
							
						}
					}
					
					if (noofevents > 5 && abfbeHswitch == 0) 
					{
						abfbeH5 = 0;
					
						$("#abfbehidden").css("display","block");
						
						for(var i = 0; i <= 5; i++) {
						
						//console.log($("#abfbe-table tr").eq(i).outerHeight());
						abfbeH5 = abfbeH5 + $("#abfbe-table tr").eq(i).outerHeight();
						
						}
						
						//console.log(abfbeH5);
						$("#abfbe-table").height(abfbeH5);
							
					}
	
					
				}

				
			});


			

			});
			
		}
	
	});
	
})(jQuery); 