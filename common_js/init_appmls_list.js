$append_mls.appendBase( null , "" ) ;
$append_mls.appendIni(
{
	meta : [
			{
				zepto : {
						src : document.baseURI + "assets/js/zepto.js" ,
						domParent : "head" ,
					} ,
			} ,
	] ,			
	link : [
				{
					0 : "//at.alicdn.com/t/font_1431676360_347254.css" ,
					"light7" : document.baseURI + "dist/css/light7.css" ,
					"light7-swiper" : document.baseURI + "dist/css/light7-swiper.css" ,
					"light7-swipeout" : document.baseURI + "dist/css/light7-swipeout.css" ,

				} ,
				{
					docs : document.baseURI + "assets/css/docs.css" ,
					// zepto : document.baseURI + "assets/js/zepto.js" ,

				} ,
				
			] ,
	script : [
				{
					// angular :  "http://code.angularjs.org/angular-1.0.1.min.js" ,
					// zepto : document.baseURI + "assets/js/zepto.js" ,
					// jquery : document.baseURI + "assets/js/jquery-2.1.4.js" ,
					

				} ,
				{
					
				

					light7 : document.baseURI + "dist/js/light7.js" ,

					"light7-swiper" : document.baseURI + "dist/js/light7-swiper.js" ,
					"light7-swipeout" : document.baseURI + "dist/js/light7-swipeout.js" ,

				} ,
				{

					"light7-city-picker" : document.baseURI + "dist/js/light7-city-picker.js" ,
	
				} ,
			] ,
		} 
	, false 
) ;
