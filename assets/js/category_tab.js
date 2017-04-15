+function( $ )
{
	
	
	/*Object.defineProperties(
		String.prototype ,
		{
			stringBuffer : {
				enumerable : false ,
				configurable : true ,
				writable : true ,
				value : function ( str )
				{
					console.log( "string buffer") ;
					var ary = [] ;
					ary.push( this ) ;
					ary.push( str ) ;
					// res = ary.join( ""　) ;

					return ary ;
				} ,
			} ,
		} 
	) ;*/

	Object.defineProperties(
		Object.prototype ,
		{
			thisIdx : {
				enumerable : false ,
				configurable : true ,
				writable : true ,
				value : function ( htmlcol ) 
				{
					for ( var i = 0 ; i < htmlcol.length ; i++ ) 
					{
						if ( this == htmlcol[ i ] )
						{
							return i ;
						} ;
					} ;
				} ,
			} ,
		}
	) ;

	var getDomStrTemp = function ( result , flag )
	{
		function getDomStrPatt_a01( moduleList ) 
		{
			
			var strBuffer = [] ;
			var str1 = 
				  '<div class="module-list" data-spm=" ' + result.spmc + ' ">'
				+ '	 <div class="module module-hot">'
	            + '	   <p class="module-title"> ' + moduleList.title + ' </p>'
	            + '    <div class="module-content item-list">'
	            + '        <div class="row" >' ;
            var hotItemStr = 
	              '          <a class="cat-item hot-item" href=" ' + moduleList.items[ 0 ].url + ' ">'
	            + '            <span class="img-wrap valign-middle">'
	            + '              <img alt="" src=" ' + moduleList.items[ 0 ].pic + ' ">'
	            + '            </span>'
	            + '              <div class="desc-panel">'
	            + '                  <div class="desc">' 
            	+ 						moduleList.desc 
	            + '                    <span class="cat-name">'
	            +						 moduleList.items[ 0 ].name 
	            + '                        <span> </span>'
	            + '                    </span>'
	            + '                  </div>'
	            + '              </div>'
	            + '          </a><!-- cat-item hot-item end -->' ;

	        if ( flag ) 
        	{
        		strBuffer.push( str1 , hotItemStr ) ;
        		var condition1 = function () { return key1 == "0" } ;
        		var condition2 = function () { return ( parseInt( key1 ) - 1 ) % 3 == 0 } ;
        		var modItemsLen = moduleList.items.length ;
        	}
        	else
    		{
    			strBuffer.push( str1 ) ;
    			var condition1 = function () { return false } ;
    			var condition2 = function () { return ( parseInt( key1 ) - 2 ) % 3 == 0 } ;
    			var modItemsLen = moduleList.items.length - moduleList.items.length%3 ;
    		} ;
	        var strSep = 
	        	  '     </div><!-- row end -->' 
	            + '     <div class="row">' ;
            var strHotEnd = 
	              '   </div><!-- module-content item-list end -->'
	         	+ '</div><!-- module module-hot end -->' ;
	        fhA01 : for ( var key1 in moduleList.items ) 
	        {
	        	if ( parseInt( key1 ) == modItemsLen ) break fhA01 ;
	        	if ( moduleList.items.hasOwnProperty( key1 ) == false || condition1() ) continue fhA01 ;
	        	// console.log( "moduleList.items:" , moduleList.items[ key1 ] ) ;
	        	var strTemp = 
	           	  '        <a class="cat-item" href=" ' + moduleList.items[ key1 ].url + ' ">'
	            + '            <span class="img-wrap valign-middle">'
	            + '              <img alt="" src=" ' + moduleList.items[ key1 ].pic + ' ">'
	            + '            </span>'
	            + '            <span class="cat-name"> ' + moduleList.items[ key1 ].name + ' </span>'
	            + '        </a>' ;
	            if ( condition2() ) strTemp += strSep ;
	            if ( key1 == modItemsLen - 1 ) strTemp += strHotEnd ;
	            // console.log( "strTemp:" , strTemp ) ;
	            strBuffer.push( strTemp ) ;

	
	        } ;
	        console.log( "strBuffer:" , strBuffer ) ;
	        


            var strEnd = 
              '</div><!-- module-list end -->' ;
         	

         	strBuffer.push( strEnd ) ;
         	return strBuffer ;
     	} ;
     	function getDomStrPatt_brand( moduleList )
     	{
     		var strBuffer = [] ;

     		var strBrandStart = 
	        	  '  <div class="module module-brand">'
                + '     <p class="module-title"> ' + moduleList.title + ' </p>'
                + '     <div class="module-content item-list flexible-box">' ;

            strBuffer.push( strBrandStart ) ;
                
            fhA01 : for ( var key1 in moduleList.items )
     		{
	        	if ( moduleList.items.hasOwnProperty( key1 ) == false ) continue fhA01 ;

     			var strBrandCon1 =
            	  '         <a class="brand-item" href=" ' + moduleList.items[ key1 ].url + ' ">'
	            + '             <span class="img-wrap valign-middle">'
	            + '                 <img alt="" src=" ' + moduleList.items[ key1 ].pic + ' ">'
	            + '             </span>'
	            + '         </a>' ; 

	            // console.log( "strBrandCon1:" , strBrandCon1 ) ;
	            strBuffer.push( strBrandCon1 ) ;

     		} ;
            
	        var strBrandEnd = 
	        	  '      </div><!-- module-content end -->'
                + '  </div><!-- module-brand end -->' ;

            strBuffer.push( strBrandEnd ) ;
            return strBuffer ;

     	} ;
		var strBufferH1 = [] ;
		var moduleList = result.moduleList ;
		for ( var key2 in moduleList ) 
		{
			if ( key2 == moduleList.length - 1 && flag == false ) 
			{	
				var strBrand = getDomStrPatt_brand( moduleList[ key2 ] ) ; 
				strBufferH1.push( strBrand.join( "" ) ) ;

			}
			else 
			{
				var strBufferH0 = getDomStrPatt_a01( moduleList[ key2 ] ) ;
				strBufferH1.push( strBufferH0.join( "" ) ) ;
			} ;
			
		} ;

     	// console.log( "strBufferH1:" , strBufferH1.join( "" ) ) ;
     	return strBufferH1 ;
     	
	} ;

	var navMap = [ "recommend" , "women_wear" , "men_wear" , "shoe" , "package" , "under_wear" , "electrical" ] ;


	function getAjax( jsonName , idx , flag )
	{
		$.ajax(
			{

				// url : "http://localhost:8081/mall_a01/overcoat?" ,
				url : document.baseURI + "json/" + jsonName[ idx ] + ".json" ,
				crossDomain : true ,
				type : "get" ,
				dataType : "jsonp" ,
				// mimeType : "text/javascript" ,
				scriptCharSet : "utf-8" ,
				jsonp : "callback" ,
				jsonpCallback : "mtopjsonp" + ( ( idx ) + 1 ) ,
				success : function ( data )
				{
					// console.log( "data" , data ) ;
					var result = data.data.result[ 0 ] ;
					// var moduleList = data.data.result[ 0 ].moduleList ;
					var strBufferH1 = getDomStrTemp( result , flag ) ;
					$( ".inj-anc" ).html( strBufferH1.join( "" ) ) ;
					 // $.init() ;
				} ,
				error : function ( XMLHttpRequest, textStatus, errorThrown )
				{
					console.log( "XMLHttpRequest:" , XMLHttpRequest ) ;
					console.log( "textStatus:" , textStatus ) ;
					console.log( "errorThrown:" , errorThrown ) ;
				} ,
			}
		) ;

	} ;
	function tabEveLoad ()
	{
		$( "#page-tab .tab-link" )
		.on( 
			"click" ,
			function ( e ) 
			{
				// console.log( "this:" , this) ;
				// console.log( "this:" , $( this ) ) ;
				$( "#page-tab .tab-link" ).removeClass( "active" ) ;
				$( this ).addClass( "active" ) ;	
				// console.log( "this.parent:" , this.parent ) ;
				// console.log( "$( this ).parent:" , $( this ).parent ) ;
				var htmlcol = document.querySelectorAll( "#page-tab .tab-link" ) ;
				// console.log("this == :" , this == htmlcol[ 0 ]) ;
				
				var curIdx = this.thisIdx( htmlcol ) ;
				// console.log( "curIdx:" , curIdx ) ;
				var flag = curIdx == 0 || !curIdx ? true : false ;
				getAjax( navMap , curIdx , flag ) ;

			}
		) ;	
	} ;
	getAjax( navMap , 0 , true ) ;
	tabEveLoad () ;
// 	$( document ).on(
// 		"pageInit" ,
// 		function ( e , pageId , $page )
// 		{
// 			if ( pageId == "page-tab" )
// 			{
				
// 			} ;
// 		} 
// 	) ;
	

	 document.onunload = function () 
	 { 
		console.log( "onunload"  ) ;
	 } ;
	 
// 	 document.cookie = lock + "=" + true
// 	 document.onreadystatechange = function ()
// 	 {
// 	 	if ( document.readyState == "complete" && document.cookie.indexOf( "lock" ) == -1 ) 
// 	 	lock = false ;
// 		console.log( "onreadystatechange"  ) ;
// 		document.cookie = ( "lock" + "=" + "true" ) ;
// 		console.log( "document.cookie:" , document.cookie ) ;
// // 		location.reload( false ) ;
// //  		location.replace(location.href);
// 		document.execCommand('Refresh') 
// 	 } ;
// 		location.reload( false ) ;

	// $( document ).on(
	// 	"pageInit" ,
	// 	function ( e , pageId , $page ) 
	// 	{
	// 		console.log( "pageId:" , pageId ) ;
	// 		console.log( "$page:" , $page ) ;
	// 		if ( pageId == "page-infinite-scroll" ) 
	// 		{
	// 			var searchPg = String.prototype.getSearch() ;
	// 			window.$searchGetJson.getAjax( searchPg , Object.keys( searchPg )[ 0 ] , $( ".list-container.page-container" ) ) ;
	// 		} ;
	// 	} 

	// ) ;


	 // $.init() ;


}( $ ) ;
