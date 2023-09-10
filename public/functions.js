var bmr = '';
// Utility functions [UNIVERSAL]


if(JSON.parse(localStorage.getItem("subs")) !== null){
subslisted = ''; subslistedarray = JSON.parse(localStorage.getItem("subs"));
for(x in subslistedarray){
subslisted += '<a href="subreddit.html?r='+subslistedarray[x]+'" class="homelinks">'+subslistedarray[x]+'</a>';
}
document.getElementById('subscribed').innerHTML = subslisted;
}


if(localStorage.getItem('color') == 'dark'){
toggletheme('dark');
}
else {}

function toggletheme(color){
if(color == 'dark'){
	
	document.getElementById('cthemew').innerHTML = '<a onclick="toggletheme(\'light\')" id="themebtn">Light mode</a>';
document.documentElement.style.setProperty('--bodyc', '#111222');
document.documentElement.style.setProperty('--textc', 'white');
document.documentElement.style.setProperty('--linkc', '#d9d983');
document.documentElement.style.setProperty('--greyc', '#222233');
document.documentElement.style.setProperty('--lightc', '#ddd');
localStorage.setItem('color','dark');
}
else {
	
		document.getElementById('cthemew').innerHTML = '<a onclick="toggletheme(\'dark\')" id="themebtn">Dark mode</a>';
document.documentElement.style.setProperty('--bodyc', 'white');
document.documentElement.style.setProperty('--textc', 'black');
document.documentElement.style.setProperty('--linkc', '#27598c');
document.documentElement.style.setProperty('--greyc', '#eee');
document.documentElement.style.setProperty('--lightc', '#444');
localStorage.setItem('color','light');
}
	
}

function toggle(id){
var x = document.getElementsByClassName("show");
for (k = 0; k < x.length; k++) {
if(x[k].id != id) {
  x[k].classList.toggle("hidden");
  x[k].classList.toggle("show");  }
}
document.getElementById(id).classList.toggle("hidden");
document.getElementById(id).classList.toggle("show");
if(id == "subssearch"){
document.getElementById("subssearchi").focus();
}
}
//function htmlDecode(input){
 // var e = document.createElement('textarea');
 // e.innerHTML = input;
  // handle case of empty input
 // return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
//}
function htmlDecode(input) {
  var parser = new DOMParser();
  var decoded = parser.parseFromString(input, 'text/html');
  return decoded.body.textContent;
}
function timeago(o){var t=Math.floor((new Date-o)/1e3),a=t/31536e3;return a>1?Math.floor(a)+"y":(a=t/2592e3)>1?Math.floor(a)+"mo":(a=t/86400)>1?Math.floor(a)+"d":(a=t/3600)>1?Math.floor(a)+"h":(a=t/60)>1?Math.floor(a)+"m":Math.floor(t)+"s"}
function addlc(to,data){
addarr = JSON.parse(localStorage.getItem(to) || '[]');
addarr.push(data);
localStorage.setItem(to,JSON.stringify(addarr));
}

function checklc(to,cfor){
chkarr = JSON.parse(localStorage.getItem(to) || '[]');
return chkarr.includes(cfor);

}
function removelc(to,cfor){
addarr = JSON.parse(localStorage.getItem(to) || '[]');
addarr = addarr.filter(function(item) {
    return item !== cfor
})

localStorage.setItem(to,JSON.stringify(addarr));
}

function searchsubs(q,event) {
if(bmr){bmr.abort();}
var xhr = new XMLHttpRequest();
 bmr = xhr;
xhr.onreadystatechange = function()
{
    if (xhr.readyState === 4 && xhr.status == 200)
    {
        subslist = xhr.response;
		fillsubs = '';
		for (var singlesub in subslist['subreddits'] )   
{
console.log(subslist[singlesub]);
fillsubs += '<a href="subreddit.html?r=' + subslist['subreddits'][singlesub]['name']+'">'+subslist['subreddits'][singlesub]['name']+'</a>';
}
document.getElementById('subslist').innerHTML = fillsubs;
		}
}
xhr.responseType = 'json';
xhr.open('GET', 'https://www.reddit.com//api/subreddit_autocomplete/.json?query='+q+'&include_profiles=false&include_over_18=true', true)
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xhr.send();
if(q.length > 1){
var key = event.keyCode || event.charCode;
if( key == 13 ) {
if(typeof subslist['subreddits'] !== undefined) {
window.location = 'subreddit.html?r=' + subslist['subreddits'][0]['name']+'';}
}}
}

function unsubscribe(sub){removelc('subs',sub); subbtn = document.getElementById('subbtn');  
 subbtn.setAttribute( "onclick",  'subscribe(\''+sub+'\')' ); subbtn.innerHTML = 'Subscribe';}
function subscribe(sub){addlc('subs',sub);
subbtn = document.getElementById('subbtn');
subbtn.setAttribute( "onclick",  'unsubscribe(\''+sub+'\')' );
 subbtn.innerHTML = 'Unsubscribe';}

function replaceRedditLinks(htmlContent) {
  var replacedText = htmlContent.replace(/href="\/u\/([^"]+)"/g, 'href="user.html?u=$1"').replace(/href="\/r\/([^"]+)"/g, 'href="subreddit.html?r=$1"')
  .replace(/(href=\"https:\/\/(old.|www.|)reddit\.com\/r\/[^\/]+\/comments\/[^"]+)(\?[^"]+)?/g, function(match, p1, p2) {
                                  return 'href="comments.html?url=' + encodeURIComponent(p1).replace(/href%3D%22/g,'');
                                }).replace(/(href=\"https:\/\/reddit\.com\/r\/[^\/]+\/comments\/[^"]+)(\?[^"]+)?/g, function(match, p1, p2) {
                                  return 'comments.html?url=' + encodeURIComponent(p1 + (p2 || ""));
                                });  return replacedText;
}


function postbuilder(post){
returnfpost = '';
timeagoed = timeago(post['created_utc']*1000);
sticky = post['stickied'] ? " sticky" :" ";
over18 = '';
if(checklc('a18','yes') != true) {
over18 = post['over_18'] ? "over18" :" ";
}
ismod = (post['distinguished'] == "moderator") ? " moderator" :" ";
returnfpost +=  '<div class="post" id="'+post['id']+'"><div class="post_author"><a href="subreddit.html?r='+post["subreddit"]+'">'+post["subreddit_name_prefixed"]+'</a> &bull;  <a href="user.html?u='+post["author"]+'">'+post["author"]+'</a>  &bull; '+timeagoed+'</div><div class="post_link'+ sticky+' '+ismod+'"><a href="comments.html?url=https://www.reddit.com'+ post['permalink']+'">'+post['title']+'</a></div>';
if(post["selftext_html"] != null){
var replacedText = replaceRedditLinks(post["selftext_html"]);

returnfpost += '<div class="postc selftext">'+htmlDecode(replacedText)+'</div>';
}
urli = post['url_overridden_by_dest'];
console.log((typeof  post['crosspost_parent_list'] !== 'undefined' &&  post['crosspost_parent_list'].length > 0));

if((post['crosspost_parent_list'] != null &&  post['crosspost_parent_list'].length > 0) ||  (typeof  post['crosspost_parent_list'] !== 'undefined' &&  post['crosspost_parent_list'].length > 0)){
returnfpost += postbuilder(post['crosspost_parent_list'][0]);
}
else {
if(over18 === 'over18') {returnfpost += '<button onclick="allown_sfw()" class="sfwtoggle">Click to Allow this content</button>';}
if(typeof urli != "undefined"){  returnfpost += '<div class="urlpreview '+over18+'">'+urlpreview(urli,post)+'</div><div style="text-align: right;font-size:12px;"><a href="'+post['url']+'"><small>Open URL</small></a></div>'; }
if(post['poll_data'] != null){
returnfpost += pollbuilder(post);
}
}

returnfpost += '<div class="post_meta">'+post['score']+' votes &bull; '+post['num_comments']+' comments</div></div>';
return returnfpost;
}
function allown_sfw(){
	addlc('a18','yes');
	window.location.reload();
}
function urlpreview(urli,postjson) {
returnpost = '';	
	if (urli.match(/.(jpg|jpeg|png|gif)$/i))
	{
		returnpost += '<div class="postc singleimage"><img src="'+ urli +'"/></div>';
	}
	else if (urli.match(/www.reddit.com\/gallery/g))
	{
	returnpost += '<div class="postc gallery">';
	pjmd = postjson['media_metadata'];
	pjgd= postjson['gallery_data'];
	const pjmdsorted = {};

pjgd.items.forEach((item, index) => {
  const mediaId = item.media_id;
  if (pjmd.hasOwnProperty(mediaId)) {
    pjmdsorted[mediaId] = pjmd[mediaId];
  }
});



	for(var singlept in pjmdsorted) {
		
		if(pjmdsorted[singlept]['status'] != 'failed') {
		singleptlink = pjmdsorted[singlept]['s']['u'];
		if(typeof singleptlink == "undefined"){          singleptlink = pjmdsorted[singlept]['s']['gif'];          }
		else {
		singleptlink = singleptlink.replace("preivew.redd", "i.redd");}
		returnpost +='<img src="'+singleptlink+'" />';
		}
	}
	returnpost += '</div>';
	}
	else if (urli.match(/v.redd.it/g))
	{
	returnpost += '<div class="postc video">';
		if(postjson['secure_media'] != null) {
		vidurl =  postjson['secure_media']['reddit_video']['dash_url']; 
		hlsurl =  postjson['secure_media']['reddit_video']['dash_url']; 
		fallbackurl = postjson['secure_media']['reddit_video']['fallback_url']; 
		//returnpost +='<video id="v'+postjson['id']+'" src="'+vidurl+'" poster="'+postjson["thumbnail"]+'" width="100%" height="240" preload="metadata" onplay="playaud(\'a'+postjson['id']+'\')"  onpause="pauseaud(\'a'+postjson['id']+'\')"  onseeking="pauseaud(\'a'+postjson['id']+'\')"  onseeked="seeked(\''+postjson['id']+'\')"   controls> </video><audio src="'+urli+'/DASH_audio.mp4" id="a'+postjson['id']+'" controls></audio>	';
		returnpost +='<video id="v'+postjson['id']+'" src="'+vidurl+'" data-fallback="'+fallbackurl+'" data-hls="'+hlsurl+'" poster="'+postjson["preview"]['images']['0']['source']['url']+'" width="100%" height="240" preload="metadata" class="reddit_hls"  controls> </video>';
		}
		else {returnpost += 'crosspost';}
	returnpost += '</div>';
	}
	else if (urli.match(/redgifs/g) && postjson.preview)
	{
	returnpost += '<div class="postc video">';
	vidurl = postjson['secure_media']['oembed']['thumbnail_url']; 
	if(typeof vidurl == "undefined"){
		vidurl = urli.replace("redgifs.com/watch/", "redgifs.com/ifr/");
		vidurl = '<iframe src="'+vidurl+'?autoplay=0" class="gifframe"></iframe>';
		returnpost += vidurl;
	}
	else {
		if(typeof postjson['preview']['reddit_video_preview'] != "undefined") {
		vidurl = postjson['preview']['reddit_video_preview']['fallback_url'];
		}
		else if (postjson['secure_media']['oembed']['thumbnail_url']) {
		vidurl = postjson['secure_media']['oembed']['thumbnail_url'];
		}
		vidurl = vidurl.replace("size_restricted.gif", "mobile.mp4")
		returnpost +='<video src="'+vidurl+'" poster="'+postjson["thumbnail"]+'" width="100%" height="240" preload="metadata" controls> </video>';
	}
	returnpost += '</div>';
	}
	else if (urli.match(/gfycat.com/g)){
	returnpost += '<div class="postc video">';
	if(postjson['secure_media'] == null || typeof postjson['secure_media']['oembed']['thumbnail_url'] == "undefined" ){
	

		vidurl = urli.replace("gfycat.com/", "gfycat.com/ifr/");
		vidurl = '<iframe src="'+vidurl+'?autoplay=0" class="gifframe"></iframe>';
		returnpost += vidurl;
	}
	else {
		if(typeof postjson['preview']['reddit_video_preview'] != "undefined") {
		vidurl = postjson['preview']['reddit_video_preview']['fallback_url'];
		}
		else if (postjson['secure_media']['oembed']['thumbnail_url']) {
		vidurl = postjson['secure_media']['oembed']['thumbnail_url'];
		}
		vidurl = vidurl.replace("size_restricted.gif", "mobile.mp4")
		returnpost +='<video src="'+vidurl+'" poster="'+postjson["thumbnail"]+'" width="100%" height="240" preload="metadata" controls> </video>';
		}
	returnpost += '</div>';
	}
	else if (urli.match(/i.imgur.com(.*?)gifv/g))
	{
	returnpost += '<div class="postc video">';
	vidurl = urli.replace(".gifv", ".mp4") 
	returnpost +='<video src="'+vidurl+'" poster="'+postjson["thumbnail"]+'" width="100%" height="240" preload="metadata" controls> </video>';
	returnpost += '</div>';
	}
	else {
	thumbnailforit = '';
	if(postjson["thumbnail"].length > 9){
		returnpost += '<a href="'+ urli +'" target="_blank" class="wholethumb"><div class="postc thumblink"><div class="thumb"><img src="'+postjson["thumbnail"]+'"/></div><div class="thumblinklink">'+urli +'</div></div></a>';
	}
	else {
		returnpost += '<div class="postc link"><a href="'+ urli +'" target="_blank">'+thumbnailforit+''+urli +'</a></div>';
	}
	returnpost = replaceRedditLinks(returnpost);
	}
	return returnpost;
}
function pollbuilder(postjson) {
	returnpoll = '<div class="poll">';
	for(popt in postjson['poll_data']['options']){
		vote_count = postjson['poll_data']['options'][popt]['vote_count'];
		"undefined"==typeof vote_count&&(vote_count=" ");
		returnpoll += '<div class="polloption"><span class="polloptiontext">'+postjson['poll_data']['options'][popt]['text']+'</span> <span  class="votecount">'+vote_count+'</span>';
		if(vote_count != ' '){
			returnpoll += '<div class="optionmeter" style="width:'+postjson['poll_data']['options'][popt]['vote_count']/postjson['poll_data']['total_vote_count']*100+'%;"></div>';
		}
		returnpoll += '</div>';
	}
	returnpoll += '<div class="totalvotes">Total votes: '+postjson['poll_data']['total_vote_count']+'</div>';
	returnpoll += '</div>';
	return returnpoll;
}
function playaud(id){
document.getElementById(id).play();
}
function pauseaud(id){
document.getElementById(id).pause();
}
function seeked(id){
//document.getElementById(id).pause();
document.getElementById('a'+id).currentTime  = document.getElementById('v'+id).currentTime;
}
function getget(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function cbuilder(comment){
timeagoed = timeago(comment['created_utc']*1000);
isop = comment['is_submitter'] == true ? "isop" : "";
ismod = comment['distinguished'] == 	" moderator" ? "ismod" : "";



cret = '<div class="comment ccp'+comment['depth']+'" id="'+comment['id']+'"><div class="comment_author"><span class="authorttext '+isop+''+ismod+'"><a class="authorlink" href="user.html?u='+ comment['author'] +'">'+ comment['author'] +'</a></span>  <span class="comment_meta">'+ comment['score'] +' votes &bull; '+timeagoed+' </span></div><div class="comment_text">'+ replaceRedditLinks(htmlDecode(comment['body_html'])) +'</div></div>';
return cret;
}
function runhsl(){
 const videos = document.querySelectorAll('.reddit_hls');
                

        videos.forEach(video => {
        	const videoContainer = video.parentElement;
          //  if (video.canPlayType('application/vnd.apple.mpegurl')) {
                // Browser natively supports HLS
           //     video.src = video.src;
       //     } else if (Hls.isSupported()) {
                // Use hls.js for HLS playback
       //         const hls = new Hls();
        //        hls.loadSource(video.src);
         //       hls.attachMedia(video);

          //  } else {
                // Provide a fallback for unsupported browsers
            //    video.src = video.getAttribute('data-fallback');
                
           // }
           const isIOS = /iPhone|iPad/i.test(navigator.userAgent);
if (isIOS) {
 video.src = video.getAttribute('data-hls');
}
else {
           const hls = dashjs.MediaPlayer().create();
hls.initialize(video,video.src, false);
         }
        });

}
  

window.onload = function(){
	curq = getget('q') ? getget('q'): '';
	html1  =          '<form class="search" action="search.html"><input type="search" name="q" value="'+curq+'"/><br style="clear:both;">';
	    if (window.location.href.indexOf("?r=") > -1 || window.location.href.indexOf("&r=") > -1) {
    html1 += '<input type="checkbox" id="chk1" name="r" value="'+getget('r')+'" checked><label for="chk1">Only search r/'+getget('r')+'</label>';
    }
		    if (window.location.href.indexOf("?u=") > -1 || window.location.href.indexOf("&u=") > -1) {
    html1 += '<input type="checkbox" id="chk1" name="u" value="'+getget('u')+'" checked><label for="chk1">Only search u/'+getget('u')+'</label>';
    }
	
		    if (window.location.href.indexOf("/r/") > -1) {
				ther = window.location.href.match(/r\/(.*?)\//s)[1];
    html1 += '<input type="checkbox" id="chk1" name="r" value="'+ther+'" checked><label for="chk1">Only search r/'+ther+'</label>';
    }
	html1 += '<input type="submit" value="Search"/></form>';

	
	document.getElementById("leftbar").insertAdjacentHTML("afterBegin",
          html1);

	
}






