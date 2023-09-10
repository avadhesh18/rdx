<?php
$headhtml = ' <!DOCTYPE html><html><head>
    <title>rdx -  A Lightweight mobile Web Viewer for Reddit</title>
    <meta name="description" content="rdx is a fast, lightweight mobile Web Viewer for Reddit. Reader for reddit."/>
    <link rel="shortcut icon" href="favicon.ico">
  <link rel="icon" href="favicon.png">
      <link rel="manifest" href="/manifest.json" />
 <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="wefwef" />
    
    <meta
      name="apple-mobile-web-app-status-bar-style"
      content="black-translucent"
    />
     <meta name="viewport" content="width=device-width, initial-scale=1.0, 
minimum-scale=1.0">
    <meta charset="utf-8">
    <link rel="stylesheet" href="styles.css" type="text/css">
        <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>

</head>   

<body>
    <header id="header">
        <div id="pagetitle">
            <span id="plus" onclick="toggle(\'leftbar\')">+</span>
            <span id="pagetitletext" onclick="toggle(\'subssearch\')">Loading...</span>
            <svg onclick="toggle(\'subssearch\')" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" id="icon-target" style=""><path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>
            <span id="menu" onclick="toggle(\'rightbar\')"><span class="menubars">Menu</span></span>
        </div>
    </header>
    <div id="menus">
        <div id="subssearch" class="hidden">
            <input type="text" id="subssearchi" name="qury" onkeyup="searchsubs(this.value,event)" autocomplete="off">
            <div id="subslist"></div>
        </div>
        <div id="leftbar" class="hidden">
            <div class="list">
                <a href="index.html" class="homelinks">Home</a>
                <a href="subreddit.html?r=all" class="homelinks">All</a>
                <a href="subreddit.html?r=popular" class="homelinks">Popular</a>
                <div id="subscribed">Subscribe to subreddits to view them here.</div>
                <div id="cthemew"><a onclick="toggletheme(\'dark\')" id="themebtn">Dark mode</a>
                
                </div>
                <a href="https://github.com/avadhesh18/rdx/" style="display: block;
    color: #999;color:var(--lightc);padding:5px;
">Github</a></div>
        </div>
        <div id="rightbar" class="hidden"></div>
    </div>
    <div id="body"></div>
    <script src="functions.js"></script><!-- Web Analytics --><script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon=\'{"token": "5ce6e4ad5599462c8e3c36f2223a7184"}\'></script> ';
$files = glob("html/*.html");
foreach($files as $file){
echo "Processing ".$file."...";
$data = file_get_contents($file);
$data = str_replace('<!--headhtml-->',$headhtml,$data);
$newfilename = str_replace('html/','public/',$file);
file_put_contents($newfilename,$data);
   }


?>
