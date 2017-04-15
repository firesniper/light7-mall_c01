+function ( $ )
{
	console.log( "search-detail-json.js" ) ;
	// $.init() ;
	var defGetDomStrPatt = function ( jsonData , dataKey , searchKey , pgKey )
	{
		var searchPg = String.prototype.getSearch() ;
// 		var pgKey = Object.keys( searchPg )[ 1 ] ;
		var json = jsonData[ 0 ] ;
		console.log( "json:" , json ) ;
		var curPageSearch = location.search ;
		var prePageSearch = searchPg[ "prePageSearch" ] ;
		console.log( "prePageSearch:" , prePageSearch ) ;
		// $( document ).on(
		// 	"pageInit" ,
		// 	function ( e , pageId , $page ) 
		// 	{
		// 		if ( pageId == "detail-page" )
		// 		{
		// 			console.log( "pageId:" , pageId ) ;
		// 			// console.log( "$page:" , $page[ 0 ].parentNode ) ;
		// 		} ;
		// 	} 
		// ) ;
		
		var postage = ( postage = json.postage ) == 0 ? "免运费" : postage ;
		
      	var domStrPatt = 
  	// '<div class="page-detail">'
  //   '    <div class="swiper-container swiper-container-horizontal" data-space-between="10">'
  // + '      <div class="swiper-wrapper">'
  // + '        <div class="swiper-slide">'
  // + '          <img class="card-cover" src=" ' + json.link + ' " alt="">'
  // + '        </div>'
  // + '        <div class="swiper-slide">'
  // + '          <img class="card-cover" src=" ' + json.link + ' " alt="">'
  // + '        </div>'
  // + '        <div class="swiper-slide">'
  // + '          <img class="card-cover" src=" ' + json.link + ' " alt="">'
  // + '        </div>'
  // + '      </div>'
  // + '      <div class="swiper-pagination"><span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span><span class="swiper-pagination-bullet"></span><span class="swiper-pagination-bullet"></span></div>'
  // + '    </div><!-- swiper-container end -->'
    '    <div class="content-block goods-card">'
  + '      <h3> ' + json.title + ' </h3>'
  + '      <p><strong>$ ' + json.price_integer + ' </strong> <del>$ ' + json.price_origin + ' </del></p>'
  + '      <div class="row text-center color-gray">'
  + '        <div class="col-25"> ' + postage + ' </div>'
  + '        <div class="col-50"> ' + json.sales + ' </div>'
  + '        <div class="col-25"> ' + json.delivery + ' </div>'
  + '      </div>'
  + '    </div><!-- goods-card end -->'
  + '    <div class="list-block media-list">'
  + '      <ul>'
  + '        <li>'
  + '          <a href="#" class="item-link item-content">'
  + '            <div class="item-inner">'
  + '              <div class="item-title-row">'
  + '                <div class="item-title">Choose Size and Color</div>'
  + '              </div>'
  + '            </div>'
  + '          </a>'
  + '        </li>'
  + '      </ul>'
  + '    </div><!-- media-list end -->'
  + '    <div class="content-block">'
  + '      <div class="buttons-row">'
  + '        <a href="#tab-detail" class="tab-link active button">Detail</a>'
  + '        <a href="#tab-comments" class="tab-link button">Comments(123)</a>'
  + '      </div>'
  + '      <div class="tabs">'
  + '        <div class="tab active" id="tab-detail">'
  + '          <h3>真正适合裸睡的面料</h3>'
  + '          <p>只有当你接触到床的那一刻，才会被前所未有的柔软打动。天丝般的爽滑质感，完美的设计，漂亮的色彩搭配。</p>'
  + '          <p><img src="//img.alicdn.com/imgextra/i4/238126515/TB25x8rdXXXXXaWXXXXXXXXXXXX_!!238126515.jpg" alt="" style="width:100%"></p>'
  + '          <h3>活性色彩，我的正能量</h3>'
  + '          <p>活性印刷，生活不在一成不变，跟上时代的脚步。A版大花纹，古典大气，民族的就是最美。零压力的舒适感，让人完美享受美好的床上时光。</p>'
  + '          <p><img src="//img.alicdn.com/imgextra/i3/238126515/TB2ht8qdXXXXXbmXXXXXXXXXXXX_!!238126515.jpg" alt="" style="width:100%"></p>'
  + '        </div>'
  + '        <div class="tab" id="tab-comments">'
  + '          <div class="list-block media-list">'
  + '            <ul>'
  + '              <li>'
  + '                <div class="item-content">'
  + '                  <div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" width="44"></div>'
  + '                  <div class="item-inner">'
  + '                    <div class="item-title-row">'
  + '                      <div class="item-title">张**三</div>'
  + '                      <div class="item-after">12/12 13:11</div>'
  + '                    </div>'
  + '                    <div class="item-text">聚划算买的，只要888，料子很舒服。</div>'
  + '                  </div>'
  + '                </div>'
  + '              </li>'
  + '              <li>'
  + '                <div class="item-content">'
  + '                  <div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" width="44"></div>'
  + '                  <div class="item-inner">'
  + '                    <div class="item-title-row">'
  + '                      <div class="item-title">Xi***ng</div>'
  + '                      <div class="item-after">12/12 13:11</div>'
  + '                    </div>'
  + '                    <div class="item-text">太喜欢了，做工精细，质量非常好。</div>'
  + '                  </div>'
  + '                </div><!-- item-content end -->'
  + '              </li>'
  + '              <li>'
  + '                <div class="item-content">'
  + '                  <div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" width="44"></div>'
  + '                  <div class="item-inner">'
  + '                    <div class="item-title-row">'
  + '                      <div class="item-title">张**严</div>'
  + '                      <div class="item-after">12/12 13:11</div>'
  + '                    </div>'
  + '                    <div class="item-text">不好意思评价晚了，第三次买了，一如既往的好评</div>'
  + '                  </div><!-- item-content end -->'
  + '                </div>'
  + '              </li>'
  + '              <li>'
  + '                <div class="item-content">'
  + '                  <div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" width="44"></div>'
  + '                  <div class="item-inner">'
  + '                    <div class="item-title-row">'
  + '                      <div class="item-title">张**三</div>'
  + '                      <div class="item-after">12/12 13:11</div>'
  + '                    </div>'
  + '                    <div class="item-text">聚划算买的，只要888，料子很舒服。</div>'
  + '                  </div>'
  + '                </div>'
  + '              </li>'
  + '              <li>'
  + '                <div class="item-content">'
  + '                  <div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" width="44"></div>'
  + '                  <div class="item-inner">'
  + '                    <div class="item-title-row">'
  + '                      <div class="item-title">Xi***ng</div>'
  + '                      <div class="item-after">12/12 13:11</div>'
  + '                    </div>'
  + '                    <div class="item-text">太喜欢了，做工精细，质量非常好。</div>'
  + '                  </div>'
  + '                </div>'
  + '              </li>'
  + '              <li>'
  + '                <div class="item-content">'
  + '                  <div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" width="44"></div>'
  + '                  <div class="item-inner">'
  + '                    <div class="item-title-row">'
  + '                      <div class="item-title">张**严</div>'
  + '                      <div class="item-after">12/12 13:11</div>'
  + '                    </div>'
  + '                    <div class="item-text">不好意思评价晚了，第三次买了，一如既往的好评</div>'
  + '                  </div>'
  + '                </div><!-- item-content end -->'
  + '              </li>'
  + '            </ul>'
  + '          </div><!-- list-block end -->'
  + '        </div><!-- tab-comments end -->'
  + '      </div><!-- tabs end -->'
  + '    </div><!-- content-block end -->' ;
  // + '  </div><!-- page-detail end -->' ;
  // console.log( "$( '.swiper-container img' ):" , $( ".swiper-container img" )[ 0 ].src ) ;
  $( ".swiper-container img" )
  .attr( 
	  {
	  	"src" : json.link ,
	  } 
  ) ;
      	return domStrPatt ;

	} ;

	$( document ).on(
		"pageInit" ,
		function ( e , pageId , $page )
		{
			console.log( "e:" , e ) ;
			if 
			( pageId == "detail-page" 
				// && !getAjaxLock 
			)
			{
				console.log( "pageId:" , pageId ) ;
				var searchPg = String.prototype.getSearch() ;
				console.log( "searchPg:" , searchPg );
				window.$searchGetJson.getAjax( 
					searchPg , 
					searchPg[ Object.keys( searchPg )[ 0 ] ] , 
					$( ".page-detail" ) , 
					defGetDomStrPatt , 
					null , 
					$page ,
					null

				) ;
// 				var swiper = new Swiper('.swiper-container');
				// $.init() ;
			} ;
		} 

	) ;
	
	
	$.init() ;
} ( $ ) ;
// $.init() ;