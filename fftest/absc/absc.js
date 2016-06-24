(function($) {
	$.fn.extend({

		absc : function(options) {

			var defaults = {
				//inital settings
			    plId: '11332196',
				clientid: 'c49dbadfc919f49d68903229c48f1d3d',
				col1: '255,255,255',
				col2: '255,153,0',
				trans: '0.1',
				textcol: '255,255,255',
				backupmp3: 'audio/01-A-Song-About-Me.mp3',
				backupsong: 'A Song About Me',
				backupartist: 'ohnoitsAvon',
				backupimg: 'images/IDK.jpg'
				
			}
			
			var options = $.extend(defaults, options);
			
			return this.each(function() {
				var o = options;
				var htmltext = "";
				var absctitle = "";
				var trackarray = new Array();
				var div = $(this);	
				//console.log(div);
				$('<style type="text/css">\
				#'+div.context.id+'\
				{\
					overflow:auto;\
				}\
				#'+div.context.id+' #absccont\
				{\
					text-align:left;\
					max-width:800px;\
					width:92%;\
					margin:0 auto 0 auto;\
					color:rgb(255,255,255);\
				}\
				\
				#'+div.context.id+' .abscinfo\
				{\
					padding: 10px 10px 2px 10px;\
				}\
				#'+div.context.id+' .abscinfo2\
				{\
					padding: 10px;\
					border-bottom:1px solid rgb('+o.col1+'); \
					border-bottom:1px solid rgba('+o.col1+',0.3);\
				}\
				#'+div.context.id+' .borderfix1\
				{\
					padding: 0px 10px 0px 10px;\
					margin: 0px 0px -21px 0px;\
				}\
				#'+div.context.id+' .borderfix2\
				{\
					border-bottom:1px solid rgb('+o.col1+'); \
					border-bottom:1px solid rgba('+o.col1+',0.3);\
				}\
				\
				#'+div.context.id+' .abscimgcont \
				{\
					display:inline-block;\
					vertical-align: top;\
					width:20%;\
				}\
				\
				#'+div.context.id+' #absccont li, #'+div.context.id+' #absccont a\
				{\
					outline: 0;\
					text-decoration: none;\
					color: rgb('+o.textcol+');\
					line-height:130%;\
					-moz-transition: all 0.5s;\
						 -o-transition: all 0.5s;\
					-webkit-transition: all 0.5s;\
							transition: all 0.5s;\
				\
				}\
				\
				#'+div.context.id+' #absccont li:hover{\
					color: rgb('+o.col2+');\
				}\
				\
				#'+div.context.id+' #absccont li:hover a{\
					color: rgb('+o.col2+');\
				}\
				\
				#'+div.context.id+' #absccont a:hover{\
					color: rgb('+o.col2+');\
				}\
				\
				#'+div.context.id+' #absccont li.playing\
				{\
					color: rgb('+o.col2+');	\
				}\
				\
				\
				#'+div.context.id+' #absccont li.playing a\
				{\
					color: rgb('+o.col2+');	\
				}\
				\
				\
				#'+div.context.id+' .abscinfotext\
				{\
					display:inline-block;\
					vertical-align: top;\
					padding: 0 0 0 0;\
					width:80%;\
					\
				}\
				\
				#'+div.context.id+' .abscplaylistname\
				{\
					font-size:90%;\
					line-height:170%;\
					padding-left:10px;\
				}\
				\
				#'+div.context.id+' .currentsong\
				{\
					font-size:180%;\
					line-height:170%;\
					padding-left:10px;\
				}\
				#'+div.context.id+' .currentartist\
				{\
					font-size:100%;\
					line-height:170%;\
					padding-left:10px;\
				}\
				\
				#'+div.context.id+' #absccont ol\
				{\
					list-style-position: inside;\
					list-style-type: decimal;\
					margin:10px 0;\
					padding:10px 10px 20px 10px;\
				}\
				\
				#'+div.context.id+' #absccont li\
				{\
					margin:2px 0;\
					padding:5px;\
					border-bottom:1px solid rgb('+o.col1+'); \
					border-bottom:1px solid rgba('+o.col1+',0.3);\
				}\
				\
				\
				#'+div.context.id+' .scicon\
				{\
					width: 100%;\
					padding: 0;\
					font-size:70%;\
					line-height:100%;\
					margin: -20px 0 0 0;\
					text-align: right;\
				}\
				#'+div.context.id+' #absccont .scicon a:hover\
				{\
					color: rgb(255,153,0);\
				}\
				#'+div.context.id+' .scicon i\
				{\
						font-size:110%;\
						padding:10px 0 0 5px;\
				}\
				\
				#'+div.context.id+' .audiojs audio \
				{ \
					position: absolute; left: -1px; \
				}\
				\
				#'+div.context.id+' .audiojs \
				{ \
					width: 100%;\
					max-width:800px;\
					height: 36px;\
					overflow: hidden; \
					font-family: monospace; \
					font-size: 12px;\
				\
					\
					/* \
					background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #444), color-stop(0.5, #555), color-stop(0.51, #444), color-stop(1, #444)); \
					background-image: -moz-linear-gradient(center top, #444 0%, #555 50%, #444 51%, #444 100%); \
					-webkit-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); -moz-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); \
					-o-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); */\
				} \
						  \
				#'+div.context.id+' .audiojs .play-pause \
				{ \
					height: 28px; \
					width: 25px;\
					padding: 4px 2px 4px 10px; \
					margin: 0px; \
					overflow: hidden; \
					float:left;\
					/*border-right: 1px solid #000; */\
				} \
				\
				#'+div.context.id+' .audiojs p \
				{ \
					display: none; \
					width: 25px; \
					height: 40px; \
					margin: 0px; \
					cursor: pointer; \
				} \
				\
				#'+div.context.id+' .audiojs .play \
				{ \
					display: block; \
				} \
				\
				#'+div.context.id+' .audiojs .scrubber \
				{ \
					position: relative; \
					margin: 10px 110px 0 50px;\
					background: #5a5a5a; \
					height: 14px; \
					border-top: 1px solid #3f3f3f; \
					border-left: 0px; \
					border-bottom: 0px; \
					overflow: hidden; \
				} \
				\
				#'+div.context.id+' .audiojs .progress \
				{ \
					position: absolute; \
					top: 0px; \
					left: 0px;\
					height: 14px;\
					width: 0px; \
					background: #ccc; \
					z-index: 1; \
					background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #ccc), color-stop(0.5, #ddd), color-stop(0.51, #ccc), color-stop(1, #ccc)); \
					background-image: -moz-linear-gradient(center top, #ccc 0%, #ddd 50%, #ccc 51%, #ccc 100%);\
				} \
				 \
				#'+div.context.id+' .audiojs .loaded \
				{ \
					position: absolute; \
					top: 0px; \
					left: 0px; \
					height: 14px;\
					width: 0px; \
					background: #000; \
					background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #222), color-stop(0.5, #333), color-stop(0.51, #222), color-stop(1, #222)); \
					background-image: -moz-linear-gradient(center top, #222 0%, #333 50%, #222 51%, #222 100%); \
				 } \
				  \
				#'+div.context.id+' .audiojs .time \
				{ 	\
					height: 36px; \
					line-height: 36px; \
					margin: -26px 0px 0px 6px; \
					padding: 0px 20px 0px 6px; \
					/*border-left: 1px solid #000; */\
					color:rgb('+o.textcol+');\
					float:right;\
				} \
				\
				#'+div.context.id+' .audiojs .time em \
				{ \
					padding: 0px 2px 0px 0px; \
					color:rgb('+o.textcol+');\
					font-style: normal; \
				} \
				\
				#'+div.context.id+' .audiojs .time strong \
				{ \
					padding: 0px 0px 0px 2px; \
					font-weight: normal; \
				} \
				\
				#'+div.context.id+' .audiojs .error-message \
				{ \
					float: left; \
					display: none; \
					margin: 0px 10px; \
					height: 36px; \
					width: 400px; \
					overflow: hidden; \
					line-height: 36px; \
					white-space: nowrap; \
					color: #fff; \
					text-overflow: ellipsis; -o-text-overflow: ellipsis; -icab-text-overflow: ellipsis; -khtml-text-overflow: ellipsis; -moz-text-overflow: ellipsis; -webkit-text-overflow: ellipsis; \
				} \
				  \
				#'+div.context.id+' .audiojs .error-message a \
				{\
					color: #eee;\
					text-decoration: none; \
					padding-bottom: 1px; \
					border-bottom: 1px solid #999; \
					white-space: wrap; \
				} \
				\
				#'+div.context.id+' .playing .play, #'+div.context.id+' .playing .loading, #'+div.context.id+' .playing .error \
				{ \
					display: none; \
				} \
				\
				#'+div.context.id+' .playing .pause \
				{ \
					display: block; \
				} \
				\
				#'+div.context.id+' .loading .play, #'+div.context.id+' .loading .pause, #'+div.context.id+' .loading .error \
				{ \
					display: none; \
				} \
				\
				#'+div.context.id+' .loading .loading \
				{\
					display: block; \
				} \
				\
				#'+div.context.id+' .error .time, #'+div.context.id+' .error .play, #'+div.context.id+' .error .pause, #'+div.context.id+' .error .scrubber, #'+div.context.id+' .error .loading \
				{\
					display: none; \
				} \
				\
				#'+div.context.id+' .error .error \
				{ \
					display: block; \
				} \
				\
				#'+div.context.id+' .error .play-pause p \
				{ \
					cursor: auto; \
				} \
				\
				#'+div.context.id+' .error .error-message \
				{ \
					display: block; \
				}\
				\
				\
				@media screen and (max-width :705px){\
					#'+div.context.id+' .abscinfotext{\
						width:100%;\
						text-align:center;\
					}\
					\
					#'+div.context.id+' .abscplaylistname\
					{\
						padding-left:0px;\
					}\
					\
					#'+div.context.id+' .currentsong\
					{\
						padding-left:0px;\
					}\
					#'+div.context.id+' .currentartist\
					{\
						padding-left:0px;\
					}\
					\
					#'+div.context.id+' .abscinfo{\
						text-align:center;\
					}\
					\
					#'+div.context.id+' .abscimgcont \
					{\
						display:inline-block;\
						vertical-align: top;\
						width:70%;\
					}\
					#'+div.context.id+' .scicon\
					{\
						width: 100%;\
						padding: 0;\
						font-size:70%;\
						line-height:100%;\
						margin: 0 0 0 0;\
						text-align: right;\
					}\
				\
				}				\
				</style>').appendTo($('head'));
				
				if (!isIE(9,'lte')) {
					
				//return data
				$.getJSON("https://api.soundcloud.com/playlists/" + o.plId + "?client_id=" + o.clientid,
				
				function(data){
					var pt = data.title;
					pt = pt.replace(/"/g, '\\"');
					pt = pt.replace(/'/g, '&#39;');
					absctitle = pt;	
					
					$.each(data.tracks, function(i, track){
						var tt = track.title;
						tt = tt.replace(/"/g, '&#34;');
						tt = tt.replace(/'/g, '&#39;');
						var tu = track.user.username;
						tu = tu.replace(/"/g, '&#34;');
						tu = tu.replace(/'/g, '&#39;');
						trackarray.push([track.stream_url + "?client_id=" + o.clientid, tt, tu, track.artwork_url.replace('large', 't500x500'), track.permalink_url]);			
					})
					
				
				}).then(function(){
					
					htmltext = htmltext + "<div id='absccont'><div class='abscinfo'><div class='abscinfo2'><div class='abscimgcont'><img src='" + trackarray[0][3] + "' alt='" + trackarray[0][2]+" - "+trackarray[0][1] + "'width='100%';/></div><div class='abscinfotext'><p class='currentsong'>"+trackarray[0][1]+"</p><p class='currentartist'>"+trackarray[0][2]+"</p><p class='abscplaylistname'>"+absctitle+"</p></div><div class='scicon'><a href='" + trackarray[0][4] + "' target='_blank'>SOUNDCLOUD <i class='fa fa-soundcloud'></i></a></div></div></div>";
					htmltext = htmltext + "<audio preload></audio><div class='borderfix1'><div class='borderfix2'></div></div><ol id=\"abaudiool\">";
					$.each(trackarray, function( i, v ) {
						htmltext = htmltext + "<li><a type='audio/mp3' href='#' data-src="+trackarray[i][0]+">"+trackarray[i][2]+" - "+trackarray[i][1]+"</a></li>";
					});
					htmltext = htmltext + "</ol></div><div id=\"abschidden\" style=\"display:none; margin:0px 0 30px 0;\"><p style=\"text-align:center; padding-bottom:10px;\"class=\"btmLrg1\"><a href=\"#\">More...</a></p></div>";
					$(htmltext).appendTo($(div));
					var cs = div.find(".abscinfo");
					$(function() { 
						// Setup the player to autoplay the next track
						var a = audiojs.createAll({
						  trackEnded: function() {
							var next = $('ol li.playing').next();
							if (!next.length) next = $('ol li').first();
							next.addClass('playing').siblings().removeClass('playing');
							var i = $("li").index(next);
							cs.html("<div class='abscinfo2'><div class='abscimgcont'><img src='" + trackarray[i][3] + "' alt='" + trackarray[i][2]+" - "+trackarray[i][1] + "'width='100%';/></div><div class='abscinfotext'><p class='currentsong'>"+trackarray[i][1]+"</p><p class='currentartist'>"+trackarray[i][2]+"</p><p class='abscplaylistname'>"+absctitle+"</p></div><div class='scicon'><a href='" + trackarray[i][4] + "' target='_blank'>SOUNDCLOUD <i class='fa fa-soundcloud'></i></a></div></div>")
							audio.load($('a', next).attr('data-src'));
							audio.play();
						  }
						});
						
						// Load in the first track
						var audio = a[0];
							first = $('ol a').attr('data-src');
						$('ol li').first().addClass('playing');
						audio.load(first);

						// Load in a track on click
						$('ol li').click(function(e) {
						  e.preventDefault();
						  $(this).addClass('playing').siblings().removeClass('playing');
						  var i = $("li").index(this);
						  cs.html("<div class='abscinfo2'><div class='abscimgcont'><img src='" + trackarray[i][3] + "' alt='" + trackarray[i][2]+" - "+trackarray[i][1] + "'width='100%';/></div><div class='abscinfotext'><p class='currentsong'>"+trackarray[i][1]+"</p><p class='currentartist'>"+trackarray[i][2]+"</p><p class='abscplaylistname'>"+absctitle+"</p></div><div class='scicon'><a href='" + trackarray[i][4] + "' target='_blank'>SOUNDCLOUD <i class='fa fa-soundcloud'></i></a></div></div>")
						  audio.load($('a', this).attr('data-src'));
						  audio.play();
						});
						// Keyboard shortcuts
						$(document).keydown(function(e) {
						  var unicode = e.charCode ? e.charCode : e.keyCode;
							 // right arrow
						  if (unicode == 39) {
							var next = $('li.playing').next();
							if (!next.length) next = $('ol li').first();
							next.click();
							// back arrow
						  } else if (unicode == 37) {
							var prev = $('li.playing').prev();
							if (!prev.length) prev = $('ol li').last();
							prev.click();
							// spacebar
						  } else if (unicode == 32) {
							audio.playPause();
						  }
						})
					});	
					
					var abscsHswitch = 0;
					
					$("#abaudiool").css("overflow","hidden");
					
					abscheight();
							
					$('#abschidden a').click(function (event) {
						event.preventDefault();
						abscsHswitch = 1;
						$("#abaudiool").height("auto");
						$("#abschidden").css("display","none");
						$("#absccont").css("margin","0 auto 30px auto");
					});
					
					function abscheight() {
						
						if (trackarray.length > 5 && abscsHswitch == 0) {
						
							var high5 = 0;
						
							$("#abschidden").css("display","block");
							
							for(var i = 1; i <= 5; i++) {
					
							high5 = high5 + $( "#abaudiool li:nth-child("+i+")" ).outerHeight();
							
							}
							
							//console.log(high5);
							$("#abaudiool").height(high5);
							
						}
					};

					$(window).resize(function ()
					{
						abscheight();
					});
							
				});
				
				}
				else
				{
					htmltext = htmltext + "<div id='absccont' style='padding-bottom:2%;'><div class='abscinfo'><div class='abscinfo2'><div class='abscimgcont'><img src='" + o.backupimg + "' alt='" + o.backupartist +" - " + o.backupsong + "'width='100%';/></div><div class='abscinfotext'><p class='currentsong'>" + o.backupsong + "</p><p class='currentartist'>" + o.backupartist + "</p></div></div></div>" + "<audio src=\""+ o.backupmp3 +"\" preload=\"auto\"/></div>";
					$(htmltext).appendTo($(div));
					var a = audiojs.createAll();
				}
					
			});

		}
			
	})
	
})(jQuery); 
