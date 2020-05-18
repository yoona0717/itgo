var m_itgoUI={
	slider: function(){
		$.fn.mobileDragEvent2=function(options){
			options=$.extend({
				total: 10
			}, options);

			return this.each(function(){
				var $keyvisual=$(this); 
				var $total=$(options.total)[0]; 
				var w; 
				var h; 
				var previmgw; 
				var previmgh; 
				var imgw; 
				var n=0; 
				var amount=0; 
				var moving=false; 
				var xDown=null; 
				var yDown=null; 
				var direction=""; 
				$(".controller li").eq(n).addClass("active"); 

				$(window).resize(function(){
					$(".gallery img").removeAttr("style");
					w=$(window).width();
					h=$(window).height();
					previmgw=$(".gallery img").width();
					previmgh=$(".gallery img").height();
					imgw=previmgw*h/previmgh; // 1280:800=imgw:h
					$(".gallery").css({width:w*$total});
					$(".gallery li").css({width:$(".gallery").width()/$total, height:h});
					$(".gallery img").css({width:imgw, height:h, marginLeft:-(imgw/2)});
				});
				$(window).trigger("resize");

				$(".left").click(function(e){ 
					e.preventDefault();
					if(moving){
						return;
					}
					amount-=w;
					moving=true;

					if(n > 0){
						n--;
					}
					else{
						n=($total-1);
					}
					$(".controller li").removeClass("active");
					$(".controller li").eq(n).addClass("active");

					$(".gallery").css({left:amount});
					$(".gallery").prepend($(".gallery li").last());
					amount+=w;

					$(".gallery").animate({left:amount}, 500, function(){
						moving=false;
					});
				});
				$(".right").click(function(e){ 
					e.preventDefault();
					if(moving){
						return;
					}
					amount-=w;
					moving=true;

					if(n < ($total-1)){
						n++;
					}
					else{
						n=0;
					}
					$(".controller li").removeClass("active");
					$(".controller li").eq(n).addClass("active");

					$(".gallery").animate({left:amount}, 500, function(){
						moving=false;
						amount+=w;
						$(this).css({left:amount});
						$(this).append($(".gallery li").first());
					});
				});
				$keyvisual.on("touchstart", function(e){
					var evt=e.originalEvent;
					clearInterval(id);
					xDown=evt.touches[0].clientX;
					yDown=evt.touches[0].clientY;
				});
				$(".keyvisual").on("touchend", function(e){
					id=setInterval(function(){
						$(".right").trigger("click");
					}, 6000);
				});
				$keyvisual.on("touchmove", function(e){
					if(moving){
						return;
					}
					var evt=e.originalEvent;
					swipe(evt);

					if(direction == "left"){
						$(".right").trigger("click");
					}
					else if(direction == "right"){
						$(".left").trigger("click");
					}
				});
				var id=setInterval(function(){
					$(".right").trigger("click");
				}, 6000);

				// swipe API
				function swipe(evt){
					if(!xDown || !yDown){
						return;
					}
					var xUp=evt.touches[0].clientX;
					var yUp=evt.touches[0].clientY;
					var xDiff=xDown-xUp;
					var yDiff=yDown-yUp;

					if(Math.abs(xDiff) > Math.abs(yDiff)){
						if(xDiff > 0){
							// left swipe
							direction="left";
						}else{
							// right swipe
							direction="right";
						}
					}else{
						if(yDiff > 0){
							// up swipe
						}else{
							// down swipe
						}
					}
					xDown=null;
					yDown=null;
				}
			});
		}
		$(".keyvisual").mobileDragEvent2({total:3});
	},
	navigation: function(){
		$(".tab").click(function(e){
			e.preventDefault();
			$(".menu").addClass("active");
		});
		$(".close").click(function(e){
			e.preventDefault();
			$(".menu").removeClass("active");

			$("#gnb > ul > li").each(function(){
				if($(this).hasClass("active") == true){
					$(this).removeClass("active");
					//$(this).find("ul").slideUp(300); 
					$(this).find("ul").hide(); 
				}
			});
		});
		$("#gnb > ul > li").click(function(e){
			e.preventDefault();

			if($(this).hasClass("active") == false){
				$("#gnb > ul > li").removeClass("active");
				$(this).addClass("active");
				$("#gnb ul ul").slideUp(300);
				$(this).find("ul").slideDown(300);
			}
			else{
				$(this).removeClass("active");
				$(this).find("ul").slideUp(300);
			}
		});
	},
	new_class: function(){
		// swiper
		var swiper1 = new Swiper('.class_cont .swiper-container', {
		  pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		  },
		  navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		  },
		});
	},
	attendance_form: function(){
		$(".buy_form .attendance a").click(function(e){
			e.preventDefault();
			$(".buy_form .attendance .input_form1").toggleClass("active");
		});
		$(".buy_form .certificates a").click(function(e){
			e.preventDefault();
			$(".buy_form .certificates .input_form2").toggleClass("active");
		});
	},
	notice: function(){
		// swiper
		 var swiper2 = new Swiper('.notice_cont .swiper-container', {
		  pagination: {
			el: '.swiper-pagination',
			dynamicBullets: true,
		  },
		});
	},
	banner: function(){
		//swiper
		var swiper3 = new Swiper('.banners .swiper-container', {
		  pagination: {
			el: '.swiper-pagination',
			clickable: true,
			renderBullet: function (index, className) {
			  return '<span class="' + className + '">' + (index + 1) + '</span>';
			},
		  },
		});
	},
	reward: function(){
		var rewardW=360; 
		var reward_pos=0;

		$(".reward_btn .next").click(function(e){
			e.preventDefault();
			
			reward_pos=reward_pos-rewardW; 
			$(".rewards ul").animate({left:reward_pos}, 100, function(){
				$(this).append($(this).find("li:first-child")); 
				reward_pos=reward_pos+rewardW; 
				$(this).css({left:reward_pos}); 
			});
		});
		$(".reward_btn .prev").click(function(e){
			e.preventDefault();
			$(".rewards ul").prepend($(".rewards ul li:last-child")); 
			reward_pos=reward_pos-rewardW; 
			$(".rewards ul").css({left:reward_pos});

			reward_pos=reward_pos+rewardW; 
			// $(".rewards ul").animate({left:pos}, 100);
			$(".rewards ul").css({left:reward_pos});
		});
	},
	familysite: function(){
		var bannerW=150; 
		var f_pos=0;

		setInterval(function(){
			f_pos=f_pos-bannerW; 

			$(".family_wrapper ul").animate({left:f_pos}, 300, function(){
				$(this).append($(this).find("li:first-child")); 
				f_pos=f_pos+bannerW; 
				$(this).css({left:f_pos}); 
			});
		}, 5000);
	}
}