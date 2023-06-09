<?php
$headhtml = '<!DOCTYPE html><html><head>
    <title>rdx -  A Lightweight mobile Web Viewer for Reddit</title>
    <meta name="description" content="rdx is a fast, lightweight mobile Web Viewer for Reddit."/>
    <link rel="shortcut icon" href="favicon.png">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
    <meta charset="utf-8">
    <link rel="stylesheet" href="styles.css" type="text/css">
</head>
<body>
    <header id="header">
        <div id="pagetitle">
            <span id="plus" onclick="toggle(\'leftbar\')">+</span>
            <span id="pagetitletext" onclick="toggle(\'subssearch\')">Loading...</span>
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
                <div id="cthemew"><a onclick="toggletheme(\'dark\')" id="themebtn">Dark mode</a></div>
            </div>
        </div>
        <div id="rightbar" class="hidden"></div>
    </div>
    <div id="body"></div>
    <script src="functions.js"></script>';
$files = glob("html/*.html");
foreach($files as $file){
echo "Processing ".$file."...";
$data = file_get_contents($file);
$data = str_replace('<!--headhtml-->',$headhtml,$data);
$newfilename = str_replace('html/','public/',$file);
file_put_contents($newfilename,$data);
   }


?>