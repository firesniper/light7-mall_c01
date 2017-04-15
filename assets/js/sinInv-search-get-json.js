+function ( $ )
{
	console.log( "search-get-json.js" ) ;
	// $.init() ;
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
		var searchPg = String.prototype.getSearch() ;
		var prePageSearch = searchPg[ "prePageSearch" ] ;
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
				   '<li>'
                  +'    <div class="item-content list-item">'
                  +'        <div class="p">'
                  +'            <a href=" ' + document.baseURI + 'home/goods-detail.html' + "?scm=" + searchPg[ "scm" ] + dbPaire + "&pgKey=" + searchKey + ' " title="">'
                  +'                <img class="p-pic" src=" ' + json.link + ' " style="visibility: visible;">'
                  +'                <span class="flag c-icon-pt"></span>'
                  +'              </a>'
                  +'        </div>'
                  +'        <div class="d">'
                  +'            <a href=" ' + document.baseURI + 'home/goods-detail.html' + "?scm=" + searchPg[ "scm" ] + dbPaire + "&pgKey=" + searchKey + ' " title="">'
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

	$( document ).on(
		"pageInit" ,
		function ( e , pageId , $page )
		{
			console.log( "e:" , e ) ;
			if 
			( pageId == "page-infinite-scroll" 
				// && !getAjaxLock 
			)
			{
				console.log( "pageId:" , pageId ) ;
				var searchPg = String.prototype.getSearch() ;
				console.log( "searchPg:" , searchPg );
				
				window.$searchGetJson
				.getAjax( 
					searchPg , 
					Object.keys( searchPg )[ 0 ] , 
					$( ".list-container.page-container" ) , 
					defGetDomStrPatt ,
					undefined ,
					null ,
					"_bid"
				) ;
				
				var sechIpt = document.querySelector( "form#J_Search input[name=dicStr]" ) ;

				var clsBtn = document.querySelector( "form#J_Search button" ) ;
				clsBtn.addEventListener(
					"touchstart" ,
					function ( e )
					{
						e.preventDefault() ;
						// console.log( "e:" , e ) ;
						e.stopPropagation() ;
						e.cancelBubble = true ; 

						sechIpt.value = "" ;
						this.style = "display: none ;"
					} ,
					true

				) ;

				var logo = document.querySelector( ".logo" ) ;
				var topBarBtnClosed = document.querySelector( ".top-bar-btn.closed" ) ;
				var suggestContainer = document.querySelector( ".suggest-container") ;
				var toolbar = document.querySelector( ".toolbar" ) ;
				var topBar = document.querySelector( ".top-bar" ) ;
				var iconsSearch = document.querySelector( ".icons-search" ) ;
				sechIpt.addEventListener(
					"focus" ,
					function ( e )
					{
						// console.log( "e:" , e ) ;
						$( ".toolbar>div" ).css( { "display" : "none" ,} ) ;
						suggestContainer.style = "display : block ;" ;
						// topBarBtnClosed.style = "display : block ;" ;
						// logo.style = "display : none ;" ;
						var topBarFlag = $( topBar ).hasClass( "on" ) ;
						if ( !topBarFlag ) 
						{
							topBar.className += " on" ; 

						} ;
					}
				) ;
				/*sechIpt.addEventListener(
					"click" ,
					function ( e )
					{
						// console.log( "e:" , e ) ;
						$( ".toolbar>div" ).css( { "display" : "none" ,} ) ;
						suggestContainer.style = "display : block ;" ;
						// topBarBtnClosed.style = "display : block ;" ;
						// logo.style = "display : none ;" ;
						var topBarFlag = $( topBar ).hasClass( "on" ) ;
						if ( !topBarFlag ) 
						{
							topBar.className += " on" ; 

						} ;
					}
				) ;*/
				topBarBtnClosed.addEventListener(
					"touchstart" ,
					function ( e )
					{
						// console.log( "e:" , e ) ;
						$( ".toolbar>div" ).css( { "display" : "block" ,} ) ;
						suggestContainer.style = "display : none ;" ;
						// this.style = "display : none ;" ;
						// logo.style = "display : block ;" ;
						$( topBar ).removeClass( "on" ) ;
					}
				) ;
				sechIpt.addEventListener(
					"keydown" ,
					function ( e )
					{
						// console.log( "e:" , e ) ;
						// console.log( "this:" , this.value.length ) ;
						if ( this.value.length > 1 )
						{
							clsBtn.style = "display: inline-block ;"
						}
						else if ( this.value.length == 0 )
						{
							clsBtn.style = "visibility: hidden ;"

						} ;	
					}
				) ;

				// var sugstHotKey = $( ".suggest-hotkey li" ) ;
				$( ".suggest-hotkey li" )
				.on(
					"touchstart" ,
					function ( e )
					{
// 						console.log( "this:" + this ) ;
						sechIpt.value = this.innerText ;
						suggestContainer.style = "display : none ;" ;
						iconsSearch.click() ;
						
					} 
				) ;

				var closeDropListHandle = function ( e ) 
				{
					// dropList.className += " droplist-expand" ;
					// console.log( "$(dropList):" , $(dropList) ) ;
					var clsFlag = $( dropList ).hasClass( "droplist-expand" ) ;
					if ( clsFlag )
					{
						$( dropList ).removeClass( "droplist-expand" ) ;
					}
					else
					{
						dropList.className += " droplist-expand" ;
					} ;
				}
				var droplistTrigger = document.querySelector( ".droplist-trigger" ) ;
				var dropList = document.querySelector( ".droplist" ) ;
				droplistTrigger.addEventListener(
					"touchstart" ,
					 function ( e ) 
					{
						closeDropListHandle( e ) ;
					}
				) ;


				var sort = $( ".droplist .sorts .sort" ) ;
				sort.on(
					"touchstart" ,
					function ( e )
					{
						var clsFlag = $( this ).hasClass( "selected" ) ;
						if ( !clsFlag )
						{

							sort.removeClass( "selected" ) ;
							this.className += " selected" ;

						} ;

						var dataValue = this.getAttribute( "data-value" ) ;
						window.$searchGetJson
						.getAjax( 
							searchPg , 
							searchPg[ Object.keys( searchPg )[ 0 ] ] , 
							$( ".list-container.page-container" ) , 
							defGetDomStrPatt ,
							undefined ,
							$page ,
							dataValue
						) ;
						closeDropListHandle( e ) ;
						// switch ( dataValue )
						// {
						// 	case "" :

						// } ;
					} 
				) ;

				// $.init() ;
			} ;
		} 

	) ;
	

	$.init() ;
} ( $ ) ;
