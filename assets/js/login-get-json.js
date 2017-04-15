// window.$searchGetJson = { "sadf" : "asdfsf"} ;

(function( $ )
{
	
	var searchPg = String.prototype.getSearch() ;
	var dbPaire = searchPg[ "tbNamesStr" ] ? 
					  "&tbNamesStr=" + searchPg[ "tbNamesStr" ] :
					   searchPg[ "dicStr" ] ?
					  "&dicStr=" + searchPg[ "dicStr" ]	:
					  undefined ;

	var defGetDomStrPatt = 
	function 
	( 
		jsonData , 
		dataKey , 
		searchKey , 
		pgKey 
	)
	{
		var json = jsonData[ dataKey ] ;
		var curPageSearch = location.search ;

		$( document ).on(
			"pageInit" ,
			function ( e , pageId , $page ) 
			{
				if ( pageId == "detail-page" )
				{
					console.log( "pageId:" , pageId ) ;
					// console.log( "$page:" , $page[ 0 ].parentNode ) ;
				} ;
			} 
		) ;
		
		var postage = ( postage = json.postage ) == 0 ? "免运费" : postage ;
		var domStrTemp = 
  '<div class="page-settings">'
+ '		<div class="list-block media-list person-card">'
+ '			<ul>'
+ '				<li>'
+ '					<div href="#" class="item-content">'
+ '					<div class="item-media">'
+ '						<img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" width="80">'
+ '					</div>'
+ '					<div class="item-inner">'
+ '						<div class="item-title-row">'
+ '							<div class="item-title"> ' + json.nick + ' </div>'
+ '                 	</div>'
+ '						<div class="item-subtitle"> ' + json.sign + ' </div>'
+ '							<div class="item-text"><strong> ' + 321 + ' </strong> Follow</div>'
+ '						</div>'
+ '					</div>'
+ '				</li>'
+ '			</ul>'
+ '		</div>'
+ '		<div class="row text-center">'
+ '			<div class="col-25">'
+ '				<h4>12</h4>'
+ '				<div class="color-gray">in Cart</div>'
+ '			</div>'
+ '			<div class="col-25">'
+ '				<h4>5</h4>'
+ '				<div class="color-gray">Sent</div>'
+ '			</div>'
+ '			<div class="col-25">'
+ '				<h4>2</h4>'
+ '				<div class="color-gray">Delivery</div>'
+ '			</div>'
+ '			<div class="col-25">'
+ '				<h4>85</h4>'
+ '				<div class="color-gray">Comments</div>'
+ '			</div>'
+ '		</div>'
+ '		<div class="list-block list">'
+ '			<ul>'
+ '				<li class="item-content item-link">'
+ '					<div class="item-media"><i class="icon icon-settings"></i></div>'
+ '					<div class="item-inner">'
+ '						<div class="item-title">Account</div>'
+ '					</div>'
+ '				</li>'
+ '				<li class="item-content item-link">'
+ '					<div class="item-media"><i class="icon icon-me"></i></div>'
+ '					<div class="item-inner">'
+ '						<div class="item-title">Me</div>'
+ '					</div>'
+ '				</li>'
+ '				<li class="item-content item-link">'
+ '					<div class="item-media"><i class="icon icon-message"></i></div>'
+ '					<div class="item-inner">'
+ '						<div class="item-title">Noti</div>'
+ '					</div>'
+ '				</li>'
+ '				<li class="item-content item-link">'
+ '					<div class="item-media"><i class="icon icon-star"></i></div>'
+ '					<div class="item-inner">'
+ '						<div class="item-title">Fav</div>'
+ '					</div>'
+ '				</li>'
+ '				<li class="item-content item-link">'
+ '					<div class="item-media"><i class="icon icon-friends"></i></div>'
+ '					<div class="item-inner">'
+ '						<div class="item-title">Help</div>'
+ '					</div>'
+ '				</li>'
+ '			</ul>'
+ '		</div>'
+ '		<div class="content-block">'
+ '			<a href="' + document.baseURI + 'home/me.html?scm=UserSet&amp;userAct=logout" class="button button-big button-fill button-danger external">Logout</a>'
+ '		</div>'
+ '</div>'
;

      	return domStrTemp ;

	} ;
	var reduceCount = 0 ;
	var idxData = null ;
	var getDomStrTemp = function ( data , callback , startIdx , length , pgKey ) 
	{
		if ( !data ) 
		{ 
			$.toast( "暂无数据" ) ;
// 			throw new TypeError( "jsonData null" ) ;
// 			return ;
		} ;
		idxData = idxData ? idxData : data.setIndex() ;
		var subRetData = data.splice( startIdx , length ) ;
		console.log( "subRetData:" , subRetData.length ) ;
// 		reduceCount = reduceCount == 0 ? length : reduceCount ;
		reduceCount += subRetData.length ;
		
		var strBuffer = [] ;
		
		hfA01 : for ( var subRetDataKey in subRetData )
		{
			if ( !subRetData.hasOwnProperty( subRetDataKey ) ) continue hfA01 ;
// 			var searchKey = reduceCount - Math.abs( subRetData.length - subRetDataKey ) ;
			var searchKey = subRetData[ subRetDataKey ][ "index" ] ;
			var domStrTemp = callback( subRetData , subRetDataKey , searchKey , pgKey ) ;
			strBuffer.push( domStrTemp ) ;
		} ;
		// console.log( "strBuffer:" , strBuffer ) ;
		return { reduceData : data , domStrTemp : strBuffer } ;
	} ;
	
	var pgInfi = function ( reduceData , domDom , anchorDom , getDomStrPatt , pgKey )
	{
    	console.log( "pgInfireduceData:" , reduceData ) ;
    	var loading = false ;
         
        domDom
        .on( 
            'infinite' , 
            function ( e ) 
            {
//             	console.log( "e:" , e ) ;
                if (loading) return ;

                loading = true ;
                setTimeout( 
                    function () 
                    {
                        loading = false ;

                        var domStrTemp = getDomStrTemp( reduceData , getDomStrPatt , 0  , 4 , pgKey ).domStrTemp ;
                      	anchorDom.append( domStrTemp.join( "" ) ) ;	
                    } , 
                    1000 
                ) ;
            }
        ) ;
      
	} ;
	function defCallBack 
	( getDomStrRes , anchorDom , getDomStrPatt , $page , pgKey )
	{
		$page = $page ? $page : $( "#page-infinite-scroll" ) ;
		pgInfi( getDomStrRes.reduceData , $page , anchorDom , getDomStrPatt , pgKey );

	} ;
	function getAjax
	( searchPg , servCls , anchorDom , getDomStrPatt , callback , $page , sortType )
	{
		sortType = sortType ? sortType : "_bid" ;
		getDomStrPatt = getDomStrPatt ? 
						getDomStrPatt : 
						getDomStrPatt === null ?
						getDomStrPatt :
						defGetDomStrPatt ;

		callback = callback ? 
				   callback : 
				   callback === null ? 
				   function () { return } : 
				   defCallBack ;

		var servClsKey = ( servClsKey = Object.keys( searchPg )[ 0 ] ) ? servClsKey : "scm" ;
		servCls = servCls ? servCls : searchPg[ servClsKey ] ;
		var pgKey = searchPg[ "pgKey" ] ;
		if ( searchPg.constructor.name == "Object" )
		{
			// var governStrKey = Object.keys( searchPg )[ 0 ] ;
			var governStrBuf = [] ;
			governStrBuf.push( "http://www.spitc-cn.com/mall_a01_ol/" + searchPg[ "scm" ] + "?" ) ;
			hfA01 : for ( var sechKey in searchPg )
			{
				if ( !searchPg.hasOwnProperty( sechKey ) && sechKey == "scm" ) continue hfA01 ;
				governStrBuf.push(
					  sechKey
					+ "="
					+ searchPg[ sechKey ] 
					+ "&"
				) ;
				 
			} ;
			

		} ; 
		$.ajax(
			{

// 				url : "http://192.168.1.3:8080/mall_a01/mallData?" ,
				url : governStrBuf.join( "" ) ,
				crossDomain : true ,
				type : "get" ,
				dataType : "jsonp" ,
				mimeType : "text/javascript" ,
				scriptCharSet : "utf-8" ,
				jsonp : "jsonp" ,
				jsonpCallback : "mLoginJsonp" + (  1 ) ,
				success : function ( data )
				{
					// $.init() ;
					console.log( "data" , data  ) ;
					
					
					var getConData = function()
								{
									var governAryKey = Object.keys( data )[ 0 ] ;
									if ( !governAryKey ) 
									{ 
										$.toast( "暂无数据" ) ;
							// 			throw new TypeError( "jsonData null" ) ;
							// 			return ;
									} ;
									var governAry = data[ governAryKey ] ;
									hfR01 : for( var dk in data )
									{
										if ( !data.hasOwnProperty( dk ) || dk == governAryKey ) continue hfR01 ;
										governAry = governAry.concat( data[ dk ] ) ;
									} ;
									
									
									return governAry ;
								} ;

					var conData = getConData() ;
					var result = pgKey && pgKey != "undefined" && pgKey != "null" && pgKey != "" ? 
								function () 
								{
									return new Array( conData[ pgKey ] ) ;
								}() : 
								conData ;
					if 
					( 
						Object.keys( data )[ 0 ]  = "hasSid" 
						&& result[ Object.keys( result )[ 0 ] ] == 0
					)
					{
						location.href = 
						document.baseURI + "login.html" ;
					}
					else
					{
						var getDomStrRes = getDomStrTemp( result , getDomStrPatt , 0 , 6 , pgKey ) ;
						anchorDom.append( getDomStrRes.domStrTemp.join( "" ) ) ;
// 						callback( getDomStrRes , anchorDom , getDomStrPatt , $page ) ;
					} ;
					
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
	
	$( document ).on(
		"pageInit" ,
		function ( e , pageId , $page )
		{
			console.log( "e:" , e ) ;
			if 
			( pageId == "page-settings" )
			{
				console.log( "pageId:" , pageId ) ;
				var searchPg = String.prototype.getSearch() ;
				console.log( "searchPg:" , searchPg );
				// getAjax( searchPg , searchPg[ Object.keys( searchPg )[ 0 ] ] , true ) ;
				getAjax( 
					searchPg , 
					searchPg[ Object.keys( searchPg )[ 0 ] ] , 
					$( ".content" ) , 
					defGetDomStrPatt , 
					null , 
					$page 
				) ;
			} ;
		} 
	) ;


	/*window.$searchGetJson = 
	{
		getAjax : getAjax ,
	} ;*/

	// $.init() ;
	// location.reload() ;
})( $ ) ;
console.log( "login-get-json.js" ) 
// $.init() ;