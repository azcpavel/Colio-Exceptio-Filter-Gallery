# Colio-Exceptio-Filter-Gallery
Extended Colio plugin in both black and white version.

This is a extend plugin from `http://plugins.gravitysign.com/colio/`

Just call with dynamic options..

```
$(document).ready(function(){

	//default options
	var options = {
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
		};

			
	$('#test').exceptioFilterGallery({
		placement : 'before',				
		items : [
			{
				image : 'pictures/pic1.jpg',
				title : 'Test Title',
				desc : 'Few words that describe this work',
				contents : {
						'main' : {
							'head' : 'Main Content',
							'contents' : 'Some Text Here'
							},
						'side' : [
							{
								'image' : 'pictures/pic2.jpg',
								'imageAlt' : 'Test Alt',
								'imageClass' : 'Test',
								'title' : 'Test Title',
								'attr' : 'onClick="alert(\'test\');"'
							},
							{
								'image' : 'pictures/pic3.jpg'										
							},
							{
								'image' : 'pictures/pic5.jpg'										
							}
						]
					},
				category : ['Test 1', 'Test 2']	
			},
			{
				image : 'pictures/pic2.jpg',
				title : 'Test Title',
				desc : 'Few words that describe this work',
				contents : {
						'main' : {
							'head' : 'Main Content',
							'contents' : 'Some Text Here'
							},
						'side' : [
							{
								'image' : 'pictures/pic2.jpg',
								'imageAlt' : 'Test Alt',
								'imageClass' : 'Test',
								'title' : 'Test Title',
								'attr' : 'onClick="alert(\'test\');"'
							},
							{
								'image' : 'pictures/pic3.jpg'										
							},
							{
								'image' : 'pictures/pic5.jpg'										
							}
						]
					},
				category : ['Test 2']	
			},
			{
				image : 'pictures/pic3.jpg',
				title : 'Test Title',
				liType : 'slide',						
				desc : 'Few words that describe this work',
				contents : {
						'main' : {
							'head' : 'Main Content',
							'contents' : 'Some Text Here'
							},
						'side' : [
							{
								'image' : 'pictures/pic2.jpg',										
							},
							{
								'image' : 'pictures/pic3.jpg'										
							},
							{
								'image' : 'pictures/pic5.jpg'										
							}
						]
					},
				category : ['Test 3']	
			}
		],
	});
});

```
