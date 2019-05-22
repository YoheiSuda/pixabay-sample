var vidArray = [];
var vidSlide;
var vidSlide2;
var video = document.getElementById('video');
var source = document.createElement('source');
var video2 = document.getElementById('video2');
var source2 = document.createElement('source');
var judge = 0;
var vjudge = 0;
//ボタンをクリック、またはエンターキーが押されたら
$(window).on('load', function() {
    console.log("load");
});
$('form .search-btn').on('click', function(e) {
  e.preventDefault();  //画面の更新をキャンセル
  clearInterval(vidSlide);
  clearInterval(vidSlide2);
  vidArray.length = 0;
  //JSONデータの取得処理（ fetch() ）
  fetch( createURL(document.search.key.value) )
  .then( function( data ) {
    return data.json();
  })
  .then( function( json ) {
    createImage( json );

    var vidN = 0;
    if (vidN>vidArray.length - 1) {
      vidN = 0;
    }
    source.src = vidArray[vidN];  //プレビュー用のURL
    vidN += 1;
    source2.src = vidArray[vidN];
    vidN += 1;
    video.appendChild(source);
    video2.appendChild(source2);
    video.load();
    video2.load();
    video.play();
    video2.play();
    vidSlide=setInterval(function() {
      if (vidN>vidArray.length - 1) {
        vidN = 0;
      }
      if (vjudge == 1) {
        vjudge -= 1;
        source.src = vidArray[vidN];  //プレビュー用のURL
        vidN += 1;
        video.appendChild(source);
        video.load();
        video.play();

      }else {
        vjudge += 1;
        source2.src = vidArray[vidN];
        vidN += 1;
        video2.appendChild(source2);
        video2.load();
        video2.play();
      }
    },5000);
    vidSlide2 = setInterval(function(){
      if (judge == 0) {
        $("#video").animate({
          opacity:0.0,
        },2000);
        $("#video2").animate({
          opacity:1.0,
        },1000);
        $("#video").removeClass("active");
        $("#video2").addClass("active");
        judge += 1;
      }else {
        $("#video").animate({
          opacity:1.0,
        },1000);
        $("#video2").animate({
          opacity:0.0,
        },2000);
        $("#video").addClass("active");
        $("#video2").removeClass("active");
        judge -=1;
      }
    },5000);
  })
});

function createURL( value ) {
  var API_KEY = '11958254-482d8ff0de6c1a2ed9602b353';
  var baseUrl = 'https://pixabay.com/api/videos/?key=' + API_KEY;
  var keyword = '&q=' + encodeURIComponent( value );
  var option = '&orientation=horizontal&per_page=100';
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
