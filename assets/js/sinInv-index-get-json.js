+function ( $ )
{
	"use strict" ;
	console.log( "index-get-json.js" ) ;
	// $.init() ;
	var searchPg = { scm : "malldata" , tbNamesStr : "shoe,overcoat" } ;

	var defGetDomStrPatt = 
	function 
	( 
		jsonData , 
		dataKey , 
		searchKey , 
		pgKey 
	)
	{
// 		console.log( "jsonData:" , jsonData ) ;
// 		dataKey = dataKey ? dataKey : pgKey ;
		var json = jsonData[ dataKey ] ;
		var curPageSearch = location.search ;
		// var searchPg = String.prototype.getSearch() ;
// 		$( document ).on(
// 			"pageInit" ,
// 			function ( e , pageId , $page ) 
// 			{
// 				if ( pageId == "detail-page" )
// 				{
// 					console.log( "pageId:" , pageId ) ;
// 					// console.log( "$page:" , $page[ 0 ].parentNode ) ;
// 				} ;
// 			} 
// 		) ;
		var dbPaire = searchPg[ "tbNamesStr" ] ? 
					  "&tbNamesStr=" + searchPg[ "tbNamesStr" ] :
					   searchPg[ "dicStr" ] ?
					  "&dicStr=" + searchPg[ "dicStr" ]	:
					  undefined ;

		var postage = ( postage = json.postage ) == 0 ? "免运费" : postage ;
		var domStrTemp = 
			   '<a href= ' + document.baseURI + 'home/goods-detail.html' 
			 + "?scm=" + searchPg[ "scm" ] + dbPaire + "&pgKey=" + searchKey + ' >'
			 + '      <div class="card color-default">'
			 + '         <div style="" valign="bottom" class="card-header color-white no-border no-padding">'
			 + '           <img class="card-cover" src= ' + json.link + ' alt="">'
			 + '         </div>'
			 + '         <div class="card-content">'
			 + '           <div class="card-content-inner">'
			 + '             <p> ' + json.title + ' </p>'
			 + '             <p class="color-gray">@2015/01/15</p>'
			 + '           </div>'
			 + '         </div>'
			 + '         <div class="card-footer">'
			 + '           <span class=" ' + json.sales + ' </span>'
			 + '           <span class="link">Comment(20)</span>'
			 + '         </div>'
			 + '       </div>'
			 + '</a>' ;

      	return domStrTemp ;

	} ;

	$( document ).on(
		"pageInit" ,
		function ( e , pageId , $page )
		{
			console.log( "e:" , e ) ;
			if 
			( pageId == "page-home" 
				// && !getAjaxLock 
			)
			{
				console.log( "pageId:" , pageId ) ;
// 				var searchPg = String.prototype.getSearch() ;
				console.log( "searchPg:" , searchPg );
				
				window.$searchGetJson
				.getAjax( 
					searchPg , 
					searchPg[ Object.keys( searchPg )[ 0 ] ] , 
					$( "#page-home .list" ) , 
					defGetDomStrPatt ,
					undefined ,
					$page ,
					"_bid"
				) ;
				

				// $.init() ;
			} ;
		} 

	) ;
	

// 	$.init() ;
} ( $ ) ;
