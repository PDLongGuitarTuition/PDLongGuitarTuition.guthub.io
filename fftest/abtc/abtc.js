/*Name : ABTweeCool
 *--- original info --- 
 *version: 1.9 
 *Description: Get the latest tweets from twitter.
 *Website: www.tweecool.com
 *Licence: No licence, feel free to do whatever you want.
 *Author: TweeCool
 */
(function($) {
	$.fn.extend({

		
	
		abtc : function(options) {

			var defaults = {
				//inital settings
				username : 'OhnoitsAvon',
				limit : 5,
				profile_image : true,
				show_time : true,
				show_media : false,
                show_media_size: 'thumb',  //values: small, large, thumb, medium 
                show_actions: false,
                action_reply_icon: '&crarr;',
                action_retweet_icon: '&prop;',
                action_favorite_icon: '&#10084',
                profile_img_url: 'profile', //Values: profile, tweet 
                show_retweeted_text: false, //This will show the original tweet in order to avoid any truncated text, and also the "RT @tweecool:" is removed which helps with 140 character limit
				accent_col: '#ff9900',
			}
			
			var tempname = [];
			var options = $.extend(defaults, options);
		
			//date time (not functioning correctly)
			function xTimeAgo(time) {
				var nd = new Date();
				//var gmtDate = Date.UTC(nd.getFullYear(), nd.getMonth(), nd.getDate(), nd.getHours(), nd.getMinutes(), nd.getMilliseconds());
				var gmtDate = Date.parse(nd);
				var tweetedTime = time * 1000; //convert seconds to milliseconds
				var timeDiff = (gmtDate - tweetedTime) / 1000; //convert milliseconds to seconds
				
				var second = 1, minute = 60, hour = 60 * 60, day = 60 * 60 * 24, week = 60 * 60 * 24 * 7, month = 60 * 60 * 24 * 30, year = 60 * 60 * 24 * 365;
                                
				if (timeDiff > second && timeDiff < minute) {
                                    return Math.round(timeDiff / second) + " second"+(Math.round(timeDiff / second) > 1?'s':'')+" ago";
				} else if (timeDiff >= minute && timeDiff < hour) {
					return Math.round(timeDiff / minute) + " minute"+(Math.round(timeDiff / minute) > 1?'s':'')+" ago";
				} else if (timeDiff >= hour && timeDiff < day) {
					return Math.round(timeDiff / hour) + " hour"+(Math.round(timeDiff / hour) > 1?'s':'' )+" ago";
				} else if (timeDiff >= day && timeDiff < week) {
					return Math.round(timeDiff / day) + " day"+(Math.round(timeDiff / day) > 1 ?'s':'')+" ago";
				} else if (timeDiff >= week && timeDiff < month) {
					return Math.round(timeDiff / week) + " week"+(Math.round(timeDiff / week) > 1?'s':'')+" ago";
				} else if (timeDiff >= month && timeDiff < year) {
					return Math.round(timeDiff / month) + " month"+(Math.round(timeDiff / month) > 1 ?'s':'')+" ago";
				} else {
					return 'over a year ago';
				}
			}
			
			return this.each(function() {
				var o = options;
				var wrapper = $(this);
				var wInner = $('<div id="abtcmain">').appendTo(wrapper);
				var urlpattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
				var usernamepattern = /@+(\w+)/ig;
				var hashpattern = /#+(\w+)/ig;
                                var pIMG, media, media2, timestamp, abox, mtext;

				//return data
				$.getJSON("http://www.tweecool.com/api/?screenname=" + o.username + "&count=" + o.limit, function(data) {

					if (data.errors || data == null) {
						wrapper.html('No tweets available.');
						return false;
					}
					
					//each tweet
					$.each(data.tweets, function(i, field) {
                                            
						//set prfile image from user account					
                        if (o.profile_image) {
                            if( o.profile_img_url == 'tweet' ){
                                pIMG = '<a class="namelink" href="https://twitter.com/' + o.username + '/status/'+field.id_str+'" target="_blank"><div id="pimgcont"><img src="' + data.user.profile_image_url + '" alt="' + o.username + '" /></div><p class="realname"><span>'+ data.user.name +'</span></p><p class="ursname">@' + o.username + '</p></a>';
                            }else{
                                pIMG = '<a class="namelink" href="https://twitter.com/' + o.username + '" target="_blank"><div id="pimgcont"><img src="' + data.user.profile_image_url + '" alt="' + o.username + '" /></div><p class="realname"><span>'+ data.user.name +'</span></p><p class="ursname">@' + o.username + '</p></a>';
                            }
                        }else{
                            pIMG = ''; 
                        }
						
						//show time (not currently working)
						if (o.show_time) {
						    timestamp = xTimeAgo(field.timestamp);
						}else{
                                 timestamp = ''; 
							}
								//show media
								if(o.show_media && field.media_url){
								   media = '<div class="mediacont"><a href="https://twitter.com/' + o.username + '/status/'+field.id_str+'" target="_blank"><img src="' + field.media_url + ':'+o.show_media_size+'" alt="' + o.username + '" class="media" /></a></div>';
								}else{
								   media = ''; 
								}
								
								//show actions
								if( o.show_actions ){
								   abox = '<div class="action-box"><ul>';
								   abox += '<li class="ab_reply"><a target="_blank" title="Reply" href="https://twitter.com/intent/tweet?in_reply_to='+field.id_str+'"><i class="fa fa-reply"></i></a></li>';
								   abox += '<li class="ab_retweet"><a target="_blank" title="Retweet" href="https://twitter.com/intent/retweet?tweet_id='+field.id_str+'"><i class="fa fa-retweet"></i> '+( field.retweet_count_f != '' ?'<span>'+field.retweet_count_f+'</span>':'' )+'</a></li>';
								   abox += '<li class="ab_favorite"><a target="_blank" title="Favorite" href="https://twitter.com/intent/favorite?tweet_id='+field.id_str+'"><i class="fa fa-heart"></i> '+( field.favorite_count_f != '' ?'<span>'+field.favorite_count_f+'</span>':'' )+'</a></li>';
								   abox += '</ul><ul class="twicon"><li><a href="https://twitter.com/' + o.username + '/status/'+field.id_str+'" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>';
								   abox += '</ul></div>';
								   
								}else{
								  abox = '';  
								}
								
								//set username
								var rtp = o.username;			
								
								//if retweet get retweet user
								if( o.show_retweeted_text && field.retweeted_text ){
									mtext = field.retweeted_text;  
																				   
									rtp= field.text.substr(4, field.text.indexOf(':') - 4); 
									
									tempname.push(rtp);
									
									//set RT user image temp									
									var RTpIMG = '<i class="fa fa-retweet rtlogo"></i><span class="rttext"> <a href="https://twitter.com/' + o.username + '" target="_blank">' + data.user.name +'</a> Retweeted</span><br><a class="namelink" href="https://twitter.com/' + rtp + '" target="_blank"><span class="RTimg"><div id="pimgcont"><img src="' + "http://res.cloudinary.com/demo/image/twitter_name/w_50/" + rtp + ".jpg" + '" alt="' + rtp + '" /></div></span><p class="realname"><span class="rtname">'+ rtp +'</span></p><p class="ursname">@' + rtp + '</p></a>';
								   
									pIMG = RTpIMG;
								   
								}else{
								   mtext =  field.text;
								}
								
								var finaltext = '';
								
								if(o.show_media && field.media_url){
								   finaltext = mtext.slice(0, -23);
								}else{
								   finaltext = mtext;
								}
								
								if(finaltext == '')
								{
									finaltext='<div style="height:2px;"></div>';
								}
								else
								{
									 finaltext = '<p>'+finaltext+'</p>';
								}
						
						//add to document
						wInner.append('<div class="maintweet"><div class="topBar">' + pIMG + '</div>' + '<div class="tweets_txt">' + finaltext.replace(urlpattern, '<a href="$1" target="_blank" id="txtlink">$1</a>').replace(usernamepattern, '<a href="https://twitter.com/$1" target="_blank" id="txtlink">@$1</a>').replace(hashpattern, '<a href="https://twitter.com/search?q=%23$1" target="_blank" id="txtlink">#$1</a>') + '</div>' + media +abox+'</div>');
						
					});
					
					 	
					
					
				}).fail(function(jqxhr, textStatus, error) {
					//var err = textStatus + ', ' + error;
					wrapper.html('No tweets available');
				}).then(function(){
					//console.log(tempname);
						//when complete get user name and correct images for RT users						 
						function getTRData(x){
						  return $.getJSON("http://www.tweecool.com/api/?screenname=" + tempname[x]).then(function(data){
							  $('.rtname:eq('+x+')').html(data.user.name);
							  $('.RTimg:eq('+x+')').html('<div id="pimgcont"><img src="' +  data.user.profile_image_url + '" alt="' + tempname[i] + '" /></div>');
							  
							  //set colour 
							  if (x == 0){
								  $('#abtc').css("display", "block");
								  var css = 'a#txtlink{	color:' + o.accent_col + ';} .topBar .rttext a:hover{color:' + o.accent_col + ';} .realname:hover {color:' + o.accent_col + ';} .topBar .rtlogo{background-color:' + o.accent_col + ';} .ab_reply a:hover {color: ' + o.accent_col + ';}';
									style = document.createElement('style');

									if (style.styleSheet) {
										style.styleSheet.cssText = css;
									} else {
										style.appendChild(document.createTextNode(css));
									}

									document.getElementsByTagName('head')[0].appendChild(style);
							  }
							  
							return data.user.name;
							
						  });
						}

						//and in your call will listen for the custom deferred's done
										
										
						for (var i = 0; i < tempname.length; i++) 
						{ 
							getTRData(i).then(function(returndata)
							{
							}); 
						}
						
				});
				
				

			});
			
		}
	
	});
	
})(jQuery); 

