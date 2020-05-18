var itgoUI={
	navigation: function(){
		$("nav > ul > li").hover(
			function(){
				$(this).addClass("active");
				$(".menu").stop().animate({height: 400}, 300);
			},
			function(){
				$(this).removeClass("active");
				$(".menu").stop().animate({height: 67}, 300);
			}	
		);
		$("nav > ul > li> a").focusin(function(){
			$(this).parent().addClass("active");

			if($(this).parent().index() == 0){ 
				$(".menu").stop().animate({height: 400}, 300);
			}
		});
		
		var total=$("nav > ul > li").length;

		$("nav li li:last-child a").focusout(function(){
			var $depth1Li=$(this).parent().parent().parent(); 
			$depth1Li.removeClass("active");
		
			if($depth1Li.index() == (total-1)){ 
				$(".menu").stop().animate({height: 67}, 300);
			}
		});
	},
	slider: function(){
		$('.owl-carousel').owlCarousel({
			loop:true,
			margin:0, 
			nav:true,
			responsive:{ 
				0:{ 
					items:1 
				}
			}
		})
		
		$(".owl-carousel").trigger("refresh.owl.carousel");
	},
	notice: function(){
		var tabN=0;

		$(".notice .title li").eq(tabN).addClass("active"); 
		$(".notice .description div").eq(tabN).addClass("active");

		$(".notice .title li").click(function(e){
			e.preventDefault();
			tabN=$(this).index(); 
			$(".notice .title li").removeClass("active");
			$(".notice .description div").removeClass("active");
			$(".notice .title li").eq(tabN).addClass("active");
			$(".notice .description div").eq(tabN).addClass("active");
		});
	},
	attendance_form: function(){
		$(".btns dt a").click(function(e){ 
			e.preventDefault();

			if($(this).parent().next("dd").css("display")=="none"){ 
				$(this).addClass("active");
				$(".btns dd").slideUp(300); 
				$(this).parent().next("dd").slideDown(300);
			}else{ 
				$(this).removeClass("active");
				$(this).parent().next("dd").slideUp(300);
			}
		});
		
		var listName="";

		$(".btns dd a").click(function(e){
			e.preventDefault();
			var $dd=$(this).parent().parent().parent();
			listName=$(this).text();

			$dd.slideUp(300);
			$dd.prev("dt").find("a").removeClass("active");
			$dd.prev("dt").find("a").text(listName); 
		});
	},
	media_slider: function(){
		var mediaN=0;
		var mediaPos=0;

		$(".controlls li").eq(mediaN).addClass("active"); 

		$(".controlls li").click(function(e){
			e.preventDefault();
			$(".controlls li").removeClass("active"); 
			$(this).addClass("active"); 
			mediaN=$(this).index();
			mediaPos=mediaN*-1*368; 
			$(".media_img").animate({left:mediaPos}, 300); 
		});
	},
	familysite: function(){
		var n=0; 
		var bannerW=165; 
		var pos=0;

		$(".prev").click(function(e){
			e.preventDefault();
			
			pos=pos-bannerW; 
			$(".site_wrapper ul").animate({left:pos}, 300, function(){
				$(this).append($(this).find("li:first-child")); 
				pos=pos+bannerW; 
				$(this).css({left:pos}); 
			});
		});
		$(".next").click(function(e){
			e.preventDefault();
			$(".site_wrapper ul").prepend($(".site_wrapper ul li:last-child")); 
			pos=pos-bannerW; 
			$(".site_wrapper ul").css({left:pos});

			pos=pos+bannerW; 
			$(".site_wrapper ul").animate({left:pos}, 300);
		});
	}
}