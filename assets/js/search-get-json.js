// window.$searchGetJson = { "sadf" : "asdfsf"} ;

(function( $ )
{
	"use strict" ;
	
	
	Object.defineProperties(
		Array.prototype ,
		{
			JaSortByType : {
				enumerable : false ,
				configurable : true , 
				writable : true ,
				value : function ( field , reverse , array ) 
				{
					console.log( "this:" , this ) ;
					var args = Array.prototype.slice.call( arguments ) ;
					array = ( args.length == 3 && array ) ? 
							args[ args.length - 1 ] :
							function( $this )
							{
								if 
								( 
									$this.constructor.name == "Array"
									|| "length" in $this  
								)
								{
									return $this ;
								}
								else 
								{ 
									// throw new TypeError( "args must be Type String" ) ;
									console.log( "args must be Type String"  ) ;
								} ;
							}( this ) ;
							
					//数组长度小于2 或 没有指定排序字段 或 不是json格式数据
					if( array.length < 2 || !field || typeof array[ 0 ] !== "object" ) return array ;
					//数字类型排序
// 					array[ 0 ][ field ].match(/[^\d]/ig) ;
					if
					( 
						// typeof array[ 0 ][ field ] === "number" 
						!/[^\d]/ig.test( array[ 0 ][ field ] )
					) 
					{
						array.sort(
							function( x , y ) 
							{ 
								return x[ field ] > y[ field ] ;
							} 
						) ;
					} ;
					//字符串类型排序
					if
					( 
						// typeof array[ 0 ][ field ] === "string"
						/[^\d]/ig.test( array[ 0 ][ field ] ) 
					) 
					{
						array.sort( 
							function( x , y ) 
							{ 
								return x[ field ].localeCompare( y[ field ] ) ;
							}
						) ;
					} ;
					//倒序
					if( reverse ) 
					{
						array.reverse() ;
					} ;
					return array ;
			    } ,
			} ,
		} 

	) ;

	var defGetDomStrPatt = function ( jsonData , dataKey , pgKey )
	{
		var json = jsonData[ dataKey ] ;
		var searchStr = location.search ;

		/*$( document ).on(
			"pageInit" ,
			function ( e , pageId , $page ) 
			{
				if ( pageId == "detail-page" )
				{
					console.log( "pageId:" , pageId ) ;
					// console.log( "$page:" , $page[ 0 ].parentNode ) ;
				} ;
			} 
		) ;*/
		
		var postage = ( postage = json.postage ) == 0 ? "免运费" : postage ;
		var domStrTemp = 
				   '<li>'
                  +'    <div class="item-content list-item">'
                  +'        <div class="p">'
                  +'            <a href=" ' + document.baseURI + 'detail/' + searchStr + "&key=" + key + ' " title="">'
                  +'                <img class="p-pic" src=" ' + json.link + ' " style="visibility: visible;">'
                  +'                <span class="flag c-icon-pt"></span>'
                  +'              </a>'
                  +'        </div>'
                  +'        <div class="d">'
                  +'            <a href=" ' + document.baseURI + 'home/goods-detail.html' + searchStr + "&key=" + key + ' " title="">'
                  +'                <h3 class="d-title">  ' + json.title + ' </h3>'
                  +'            </a>'
                  +'            <p class="d-price">'
                  +'                <em class="h">'
                  +'                    <span class="price-icon">¥</span>'
                  +'                    <span class="font-num"> ' + json.price_integer + ' </span>'
                  +'                </em>'
                  +'                <del></del>'
                  +'            </p>'
                  +'            <div class="d-main">'
                  +'                <p class="d-freight"> ' + postage + ' </p>'
                  +'                <p class="d-num">'
                  +'				   <span class="font-num"> ' + json.sales + ' </span>人付款'
                  +'				</p>'
                  +'                <p class="d-area"> ' + json.delivery + ' </p>'
                  +'            </div>'
                  +'        </div>'
                  +'    </div>'
                  +'    <div class="icons-group"></div>'
                  +'</li>' ;
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
			var searchKey = subRetData[ subRetDataKey ][ "index" ] - 1 ;
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
		pgInfi( getDomStrRes.reduceData , $page , anchorDom , getDomStrPatt , pgKey ) ;

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
		
		var governStrBuf = new Array() ;
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

		
	/*	if ( searchPg.constructor.name == "Object" )
		{
			var governStrBuf = new Array() ;

			governStrBuf.push( "http://192.168.1.3:8080/mall_a01/" + searchPg[ "scm" ] + "?" ) ;
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
			

		} ; */
		$.ajax(
			{

				// url : "http://localhost:8081/mall_a01/overcoat?" ,
				url : governStrBuf.join( "" ) ,
				crossDomain : true ,
				type : "get" ,
				dataType : "jsonp" ,
				mimeType : "text/javascript" ,
				scriptCharSet : "utf-8" ,
				jsonp : "jsonp" ,
				jsonpCallback : "mSearchjsonp" + ( ( servCls ) + 1 ) ,
				success : function ( data )
				{
					// $.init() ;
					console.log( "data" , data ) ;
					
					
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
									// var sortDataField = "" ;
									switch ( sortType )
									{
										case "" :
											// sortDataField = "title" ;
											governAry.JaSortByType( "title" , false ) ;
										break ;
										case "_bid" :
											// sortDataField = "price_integer" ;
											governAry.JaSortByType( "price_integer" , false ) ;
										break ;
										case "bid" :
											// sortDataField = "price_integer" ;
											governAry.JaSortByType( "price_integer" , true ) ;
										break ;
									} ;
									
									
									// governAry[ sortDataField ].sort(
									// function ( a , b )
									// 	{
									// 		return a > b ;
									// 	} ;
									// ) ;
									
									return governAry ;
								} ;
					var conData = getConData() ;
					var result = !isNaN( pgKey ) && pgKey != undefined && pgKey != null && pgKey !== "" ? 
								function () 
								{
									return new Array( conData[ pgKey ] ) ;
								}() : 
								conData ;

					var getDomStrRes = getDomStrTemp( result , getDomStrPatt , 0 , 6 , pgKey ) ;
					anchorDom.append( getDomStrRes.domStrTemp.join( "" ) ) ;
					callback( getDomStrRes , anchorDom , getDomStrPatt , $page ) ;
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
	
// 	$( document ).on(
// 		"pageInit" ,
// 		function ( e , pageId , $page )
// 		{
// 			console.log( "e:" , e ) ;
// 			if 
// 			( pageId == "page-infinite-scroll" )
// 			{
// 				// console.log( "pageId:" , pageId ) ;
// 				// var searchPg = String.prototype.getSearch() ;
// 				// console.log( "searchPg:" , searchPg );
// 				// getAjax( searchPg , Object.keys( searchPg )[ 0 ] , true ) ;
			
// 			} ;
// 		} 
// 	) ;


	window.$searchGetJson = 
	{
		getAjax : getAjax ,
	} ;

	Object.defineProperties(
		window ,
		{
			"$searchGegJson" : {
				enumerable : false ,
				configurable : true ,
				writable : true ,
				value : getAjax ,
			} ,
		} 
		
	) ;

	// $.init() ;
	// location.reload() ;
})( $ ) ;
console.log( "search-get-json.js" ) 
// $.init() ;