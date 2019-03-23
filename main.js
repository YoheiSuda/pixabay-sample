var vidArray = [];
var vidSlide;
var video = document.getElementById('video');
var source = document.createElement('source');
//ボタンをクリック、またはエンターキーが押されたら
$('form .search-btn').on('click', function(e) {
  e.preventDefault();  //画面の更新をキャンセル
  clearInterval(vidSlide);
  vidArray.length = 0;
  //JSONデータの取得処理（ fetch() ）
  fetch( createURL(document.search.key.value) )
  .then( function( data ) {
    return data.json();
  })
  .then( function( json ) {
    createImage( json );

    var vidN = 0;
    vidSlide=setInterval(function() {
      if (vidN>vidArray.length - 1) {
        vidN = 0;
      }
      source.src = vidArray[vidN];  //プレビュー用のURL
      video.appendChild(source);
      video.load();
      video.play();
      vidN += 1;
    },10000);
  })
});

function createURL( value ) {
  var API_KEY = '11958254-482d8ff0de6c1a2ed9602b353';
  var baseUrl = 'https://pixabay.com/api/videos/?key=' + API_KEY;
  var keyword = '&q=' + encodeURIComponent( value );
  var option = '&orientation=horizontal&per_page=200';
  var URL = baseUrl + keyword + option;
  return URL;
}
function createImage( json ) {
  if( json.totalHits > 0 ) {
    json.hits.forEach( function( value ) {
      vidArray.push(value.videos.small.url);
      console.log(value.videos.small.url);
    });
  }
  else {
    alert('該当する映像がありません');
  }
}
