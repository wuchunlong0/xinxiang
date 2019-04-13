$(function(){
	
	//返回顶部
	var heade_top=90,
		$back_top=$('.back_top'),
		$top=$('.top');
		
	
	if($(window).width()<999){
		heade_top=65;
	}
	
	//子栏目fixed
		try{
			subnavh=$('.subnav').offset().top;
			$(window).scroll(function() {
			   if($(this).scrollTop()>heade_top) $back_top.fadeIn(200);
			   else  $back_top.fadeOut(200);
			   
			   if($(this).scrollTop()>(subnavh-heade_top)){
				  $('.subnav').addClass('fixed'); 
				  $('.subnav').css({'top':heade_top});
			   }
			   else  $('.subnav').removeClass('fixed');
			 });
			
		}catch(err){}
		
		$back_top.click(function() {
			$('html,body').animate({scrollTop: '0px'},500)
		});
		
		
	//子导航定位滚动
	$('.subnav nav li').click(function(e) {
        var id=$(this).attr('data-id');
		var thish=$(this).outerHeight();
		var thish=$(this).height();
		var sh=$('#'+id).offset().top;
			$(this).children('a').addClass('act');
			$(this).siblings().children('a').removeClass('act');
			$('html,body').animate({scrollTop:sh-heade_top-thish},500);	
    });
	
	
	//手机按钮
	$('.btn_menu').click(function() {
		$(this).toggleClass('open');
        $('body').toggleClass('open');
    });
	
	//main_paddd
	function mainpad(){
		$('main').css('padding-top',heade_top);
		if($(window).width()>999){
			$(window).scroll(function() {
                if($(this).scrollTop()>heade_top) $top.slideUp();
				else $top.slideDown();
            });
		}
	}
	
	//动画
	function anmation(){
		$('.page').each(function(index, element) {
				var pagetop=$(this).offset().top;
					$(window).scroll(function(e){
						var s_top=$(this).scrollTop();
						var w_h=$(this).height();
							if(pagetop<s_top+w_h){
								$('.page').eq(index).addClass('active');
							}	 
                    });
			});
	}anmation();
	
	
	//翻页
	$('.m_page a.num').on('click',function(){
		$('.zoom_flip').slideDown();
	});
	$('.i_zoom_flip li').on('click',function(){
		$('.zoom_flip').slideUp();
	});
	
	//banner
	var num = 0,
		bannerroll = setInterval(move,4000);
		//定时器运行的函数
		function move(){
			var w_width = $(window).width();
				num<$('.n_baner li').length-1?num++:num=0;
				$('.n_baner .num a').eq(num).addClass('on').siblings().removeClass('on');
				//根据条件不同，滚动的距离
				if(w_width>999){
					$('.n_baner').find('ul').stop().animate({marginLeft:-num*1920},800)
				}else{
					$('.n_baner').find('ul').stop().animate({marginLeft:-num*w_width},800)
				};		
		};

			
		//点击指示点，banner运行相应的图片
		$('.n_baner .num a').click(function() {
			var index   = $(this).index(),
				w_width = $(window).width();
				$(this).addClass('on').siblings().removeClass('on');
				num=index;
				if(w_width>999){
					$('.n_baner').find('ul').stop().animate({marginLeft:-num*1920},800);
				}else{
					$('.n_baner').find('ul').stop().animate({marginLeft:-num*w_width},800);
				}
		});


		//鼠标经过banner清除定时，离开继续
		$('.n_baner').hover(function() {
			clearInterval(bannerroll); 
		},function(){
			bannerroll=setInterval(move,4000);
		});

		//根据窗口大小判断加载不同的尺寸的图
		function change(){
			var w_width=$(window).width();
				$('.n_baner').width(w_width);
				$('.n_baner').find('li').width(w_width);
				$('img').each(function(){
					if(w_width>999){
						$(this).attr('src',$(this).attr('data-1920'));
						$('.n_baner').width(1920);
						$('.n_baner').find('li').width(1920);
					}
					else if(w_width<=999&&w_width>640){
						$(this).attr('src',$(this).attr('data-990'));
					}
					else if(w_width<=640){
						$(this).attr('src',$(this).attr('data-640'));
					}
				})
		 }change();


		

		//窗口变化
		$(window).resize(function() {
			var w_width=$(window).width();
				change();
				if(w_width>999){
					$('.n_baner').find('ul').stop().animate({marginLeft:-num*1920},800);
				}else{
					$('.n_baner').find('ul').stop().animate({marginLeft:-num*w_width},800);
				};
			//手机部分
			if($(this).width()>900) $('body').removeClass('open');
			mainpad();
			anmation();
		});
		
		//移动端手滑动事件
		function touchleft(){
			var w_width=$(window).width(),
				Istrue=$('.n_baner').find('ul').is(':animated');
				if(!Istrue){
					num<$('.n_baner li').length-1?num++:num=0;
					$('.n_baner .num a').eq(num).addClass('on').siblings().removeClass('on');
					$('.n_baner').find('ul').stop().animate({marginLeft:-num*w_width},800);
				}
		};

		function touchright(){
			var w_width=$(window).width(),
				Istrue=$('.n_baner').find('ul').is(':animated');
				if(!Istrue){
					num>0?num--:num=$('.n_baner li').length-1;
					$('.n_baner .num a').eq(num).addClass('on').siblings().removeClass('on');
					$('.n_baner').find('ul').stop().animate({marginLeft:-num*w_width},800);
				}
		};

		var startX, startY, moveEndX, moveEndY, X, Y;
		$('.n_baner').find('li').on('touchstart',function(e){
			e.preventDefault();
			clearInterval(bannerroll);
			startX = e.originalEvent.changedTouches[0].pageX,
			startY = e.originalEvent.changedTouches[0].pageY;
		});

		$('.n_baner').find('li').on('touchmove',function(e){
			e.preventDefault();
			moveEndX = e.originalEvent.changedTouches[0].pageX,
			moveEndY = e.originalEvent.changedTouches[0].pageY,
			X = moveEndX - startX,
			Y = moveEndY - startY;
			if (Math.abs(X) > Math.abs(Y)) {
				if(X>20){
					touchright()
				}else if(X<0) {
					touchleft()
				}
			}
		});
		$('.n_baner').find('li').on('touchend',function(e){
			e.preventDefault();
			moveEndX = e.originalEvent.changedTouches[0].pageX,
			moveEndY = e.originalEvent.changedTouches[0].pageY,
			X = moveEndX - startX,
			Y = moveEndY - startY;
			if(X==0&&Y==0){
				var _link=$(this).children('a').attr('href');
				window.open(_link)
			};
			bannerroll=setInterval(move,4000);
		});


	//页面加载
	$(window).load(function() {
		change();
		mainpad();
		$(window).trigger('scroll');
		$('.loading').remove();
		$('.i_service').addClass('active');
	});

})

