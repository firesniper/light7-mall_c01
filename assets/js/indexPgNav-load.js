
+function ( $ )
{
	var idxPgNavStrTemp = function ( urlFileName )
	{
		var obj = {
			"index.html" : "" ,
			"category.html" : "" ,
			"me.html?scm=userset" : "" , 
		} ;
		// var index , category , me ;
		// index = category = me = "" ;
		obj[ urlFileName ] = "active" ; 
		
		var idxPgNavStrPatt = 
		  // '<nav class="bar bar-tab">'
		  '  <a class="tab-item ' + obj[ Object.keys( obj )[ 0 ] ] + ' no-transition replace" href=" ' + document.baseURI + 'home/' + Object.keys( obj )[ 0 ] + '"' + ' external>'
		+ '     <span class="icon icon-home"></span>'
		+ '     <span class="tab-label">首页</span>'
		+ '  </a>'
		+ '  <a class="tab-item ' + obj[ Object.keys( obj )[ 1 ] ] + ' no-transition replace" href=" ' + document.baseURI + 'home/' + Object.keys( obj )[ 1 ] + '"' + ' external>'
		+ '    <span class="icon icon-app"></span>'
		+ '    <span class="tab-label">分类</span>'
		+ '  </a>'
		+ '  <a class="tab-item ' + obj[ Object.keys( obj )[ 3 ] ] + ' no-transition replace" href=" ' + document.baseURI + 'home/' + Object.keys( obj )[ 2 ] + '"' + ' external>'
		+ '    <span class="icon icon-me"></span>'
		+ '    <span class="tab-label">我</span>'
		+ '  </a>'
		// + ' </nav>'	;
		return idxPgNavStrPatt ;
	} ;
	var indexPgNav_load = function (  )
	{
		var injAnchor = document.querySelector( ".inj-anchor-indexPgNav" ) ;
		var urlFileName = String.prototype.getUrlFileName() ;
		// console.log( "urlFileName:" , urlFileName ) ;
		injAnchor.innerHTML = idxPgNavStrTemp( urlFileName ) ;
	} ;
	// $( document ).on(
	// 	"pageInit" ,
	// 	function ( e , pageId , $page )
	// 	{
	// 		console.log( "e:" , e ) ;
	// 		if 
	// 		( 1 )
	// 		{
	// 			console.log( "pageId:" , pageId ) ;
	// 			indexPgNav_load( $page ) ;
	// 		} ;
	// 	} 
	// ) ;

	indexPgNav_load(  ) ;
	window.$indexPgNav_load = indexPgNav_load ;
	
	// window.$indexPgNav_load() ;
	// $.init() ;
} ( $ ) ;