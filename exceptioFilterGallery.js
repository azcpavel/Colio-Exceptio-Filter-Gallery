/**
*   @extend by Ahsan Zahid Chowdhury <itszahid.info>
*   @date 2015-06-01
*	version 1.1
*   @abstract This is extend copy of  Colio - jQuery Portfolio Content Expander Plugin
*	http://plugins.gravitysign.com/colio
*/
;(function($){
	$.exceptioFilterGallery = {
		version: '1.0',
		abstract : 'Responsive Filter Gallery'
	};

	$.fn.exceptioFilterGallery = function(options){
		// default settings
		var options = $.extend({
			items : {},			
			theme: 'black',						// colio theme - "black" or "white"
			placement: 'after',					// viewport placement - "before", "after" or "#id"
			expandLink: '.colio-link',			// selector for element to expand colio viewport  
			expandDuration: 500,				// duration of expand animation, ms
			expandEasing: 'swing',				// easing for expand animation
			collapseDuration: 300,				// duration of collapse animation, ms
			collapseEasing: 'swing',			// easing for collapse animation
			scrollDuration: 300,				// page scroll duration, ms
			scrollEasing: 'swing',				// page scroll easing
			syncScroll: false,					// sync page scroll with expand/collapse of colio viewport
			scrollOffset: 10,					// page offset when colio viewport is expanded
			contentFadeIn: 500,					// content fade-in duration, ms
			contentFadeOut: 200,				// content fade-out duration, ms
			contentDelay: 200,					// content fade-in delay on expand, ms
			navigation: true,					// enable or disable next/previous navigation
			closeText: '<span>Close</span>',	// text/html for close button
			nextText: '<span>Next</span>',		// text/html for next button
			prevText: '<span>Prev</span>',		// text/html for previous button
			contentFilter: '',					// selector to filter content
			hiddenItems: '.hidden',				// selector to exclude hidden portfolio items 
			onExpand: function(){},				// on expand callback
			onCollapse: function(){},			// on collapse callback
			onContent: function(content){		// on content load callback
				$('.exFancybox', content).fancybox();
				$('.exFlexslider', content).flexslider({slideshow: false, animationSpeed: 300});
			}				
		}, options);

		options.id = 'exPortfolio';
		options.placement = ( ( options.placement == 'after' || options.placement == 'before' || options.placement.search('#') !== -1 ) ? options.placement : 'before');

		var ex = this;
		
		ex.css('position','relative');

		var exPortfolio = $('<div class="exPortfolio"></div>');

		var exPortfolioCategory = [];

		var exPortfolioList = [];

		var exPortfolioUl = $('<ul class="list"></ul>');

		var exPortfolioDetails = '';

		$.each(options.items , function(index, value){

			value = $.extend({liType : 'box'},value);
			var randonID = Math.floor((Math.random() * 9999999999) + 1);

			//GETTING ALL THE CATEGORY
			if(value.category.length > 0){
				$.each(value.category , function(indexCategory, valueCategory){
					exPortfolioCategory.push(valueCategory);
				});
			}
			var category = $.map(value.category, function(valueMap, indexMap){
								return valueMap.replace(' ','');
							}).join(' ');

			var sortContent = ''+
					'<li class="'+category+'"  data-content="#'+options.id+'_c'+randonID+'">'+
						'<div class="thumb">'+
							'<div class="view">'+
								'<a class="button colio-link" href="#">View Project</a>'+
							'</div>'+
							'<img src="'+value.image+'" alt="Pic"/>'+
						'</div>'+
						'<h4><a class="colio-link" href="#">'+value.title+'</a></h4>'+
						'<p>'+value.desc+'</p>'+
					'</li>';

			exPortfolioUl.append(sortContent);

			var contentsFeed = $('<ul class="feed"></ul>');

			var contentsSlide = $('<ul class="slides"></ul>');

			contentsSlide.wrap('<div class="exFlexslider"></div>');



			value.contents.side = $.extend({contents : ''},value.contents.side);

			$.each(value.contents.side.imgs,function(indexSide, valueSide){
				valueSide = $.extend({					
					imageAlt : '',
					imageClass : '',
					attr : ''
				},valueSide);				
				
				if(value.liType == 'box'){
					if(valueSide.attr == '')
						contentsFeed.append(
							'<li>'+
								'<a class="exFancybox" href="'+valueSide.image+'">'+
									'<img class="'+valueSide.imageClass+'" src="'+valueSide.image+'" alt="'+valueSide.imageAlt+'">'+
								'</a>'+
							'</li>');				
					else
						contentsFeed.append(
							'<li>'+
								'<a '+valueSide.attr+'>'+
									'<img class="'+valueSide.imageClass+'" src="'+valueSide.image+'" alt="'+valueSide.imageAlt+'">'+
								'</a>'+
							'</li>');
				}else{
					contentsSlide.append(
						'<li>'+							
							'<img class="'+valueSide.imageClass+'" src="'+valueSide.image+'" alt="'+valueSide.imageAlt+'" style="width:100%;">'+							
						'</li>');
				}

			});
			
			if(options.theme == 'black')
			exPortfolioDetails += ''+
					'<div id="'+options.id+'_c'+randonID+'" class="colio-content">'+					
						'<div class="main">'+
							'<h3>'+value.contents.main.head+'</h3>'+
							value.contents.main.contents+
						'</div>'+						
						'<div class="side">'+
							( (contentsFeed.children().length > 0) ? contentsFeed.clone().wrap('<div>').parent().html() : contentsSlide.parent().clone().wrap('<div>').parent().html())+
							'<div class="content">'+value.contents.side.contents+'</div>'+
						'</div>'+						
					'</div>';
			else
			exPortfolioDetails += ''+
					'<div id="'+options.id+'_c'+randonID+'" class="colio-content">'+					
						'<div class="side">'+
							( (contentsFeed.children().length > 0) ? contentsFeed.clone().wrap('<div>').parent().html() : contentsSlide.parent().clone().wrap('<div>').parent().html())+
							'<div class="content">'+value.contents.side.contents+'</div>'+
						'</div>'+
						'<div class="main">'+
							'<h3>'+value.contents.main.head+'</h3>'+
							value.contents.main.contents+
						'</div>'+												
					'</div>';


		});		

		exPortfolioCategory = $.unique(exPortfolioCategory).sort();

		var exPortfolioFilter = $('<div class="filters"></div>');
		exPortfolioFilter.append('<a href="#" class="filter-active">All</a>');

		$.each(exPortfolioCategory , function(index, value){

			exPortfolioFilter.append('<a href="#'+value.replace(' ','')+'">'+value+'</a>');
		});

		//adding unuque filter
		exPortfolio.html(exPortfolioFilter);

		//adding full list item
		exPortfolio.append(exPortfolioUl);				

		//printing filter and list content
		ex.html(exPortfolio);
		
		//printing all details content
		ex.append(exPortfolioDetails);

		ex.colioId = Math.floor((Math.random() * 9999999999999) + 1);

		ex.find('ul[class=list]').colio($.extend(options,{id : 'exPortfolio'+ex.colioId}));
		
		// "isotope" plugin
		ex.isoTop = function(filterItem) {
			var list = $(ex.selector+' .list').isotope({layoutMode : 'fitRows', filter: filterItem});		
			window.setTimeout(function(){
				list.trigger('colio','excludeHidden');
			}, 25);
		};

		var filter = '*';
		
		ex.find('div[class=filters] a').click(function(e){
			$(this).addClass('filter-active').siblings().removeClass('filter-active');			
			var href = $(this).attr('href').substr(1);
			filter = href ? '.' + href : '*';			
			ex.isoTop(filter);
			return false;
		});
		
		ex.isoTop(filter);		
	};
})(jQuery);
	



