// ==UserScript==
// @name YouTube HTML5
// @author Kix
// @namespace 0
// @include http://youtube.com/*
// @include http://*.youtube.com/*
// @include https://youtube.com/*
// @include https://*.youtube.com/*
// ==/UserScript==

scrollBottom = function() {
window.scrollTo(0,20000);
};
function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while ((obj = obj.offsetParent) != null);
    return curtop;
    }
    return 0;
}

document.addEventListener( "DOMContentLoaded",
function () {
var parts = document.URL.split("watch?v=");
if (parts.length < 2) return;
var parts2 = parts[parts.length-1].split("&");

var parts0 = document.URL.split("list=");
var parts02 = parts0[parts0.length-1].split("&");
var part_list = "";
if (parts0.length >= 2)
    part_list = "?list=" + parts02[0];

var h = document.createElement("iframe");
h.setAttribute("width", window.innerWidth-20);
h.setAttribute("height", window.innerHeight-20);
h.setAttribute("src", "//www.youtube.com/embed/" + parts2[0] + part_list);
h.setAttribute("frameborder", "0");
h.setAttribute("allowfullscreen", "");

var hdiv1 = document.createElement("div");

var title = document.getElementById('masthead-positioner');
title.style.position = "absolute";

var pl = document.getElementById('player');
if (pl != null) {
    var pl1 = pl.parentNode;
    pl1.removeChild(pl);
    pl1.insertBefore(h, pl1.firstChild);
    if (h.nextSibling)
        pl1.insertBefore(hdiv1, h.nextSibling);
    else
        pl1.appendChild(hdiv1);

    setTimeout(function() { window.scrollTo(0,findPos(h)); }, 1000);

    var pl1 = document.getElementById('watch7-sidebar');
    pl1.style.transition = "initial";
    pl1.style.marginTop = "0px";
    pl1.style.top = "0px";
} else {
    document.body.appendChild(h);
    document.body.appendChild(hdiv1);

    var h1=document.createElement("button");
    var t1=document.createTextNode("Video not found. Click here to scroll to HTML5 enabled video at bottom of this page.");
    h1.setAttribute("style", "height: 200px; width: 100%; text-align: center;");
    h1.appendChild(t1);
    h1.addEventListener("click", function () { scrollBottom(); }, false );
    document.body.insertBefore(h1, document.body.firstChild);
}

    var hb0=document.createElement("button");
    var tb0=document.createTextNode("Select size:");
    hb0.setAttribute("style", "height: 20px; width: 200px; text-align: center; ");
    hb0.appendChild(tb0);
    hb0.addEventListener("click", function () { window.scrollTo(0,findPos(h)); }, false );
    hdiv1.appendChild(hb0);

    var hb1=document.createElement("button");
    var tb1=document.createTextNode("Fit size");
    hb1.setAttribute("style", "height: 20px; width: 100px; text-align: center; border: 1px solid black;");
    hb1.appendChild(tb1);
    hb1.addEventListener("click", function () { h.setAttribute("width", window.innerWidth-20); h.setAttribute("style", "");
                                                h.setAttribute("height", window.innerHeight-20); window.scrollTo(0,findPos(h)); }, false );
    hdiv1.appendChild(hb1);

    var hb2=document.createElement("button");
    var tb2=document.createTextNode("360p");
    hb2.setAttribute("style", "height: 20px; width: 100px; text-align: center; border: 1px solid black;");
    hb2.appendChild(tb2);
    hb2.addEventListener("click", function () { h.setAttribute("width", 480); h.setAttribute("style", "margin-left: " + (window.innerWidth - 480) / 2 + "px; ");
                                                h.setAttribute("height", 360); window.scrollTo(0,findPos(h)); }, false );
    hdiv1.appendChild(hb2);

    var hb3=document.createElement("button");
    var tb3=document.createTextNode("480p");
    hb3.setAttribute("style", "height: 20px; width: 100px; text-align: center; border: 1px solid black;");
    hb3.appendChild(tb3);
    hb3.addEventListener("click", function () { h.setAttribute("width", 640); h.setAttribute("style", "margin-left: " + (window.innerWidth - 640) / 2 + "px; ");
                                                h.setAttribute("height", 480); window.scrollTo(0,findPos(h)); }, false );
    hdiv1.appendChild(hb3);

    var hb4=document.createElement("button");
    var tb4=document.createTextNode("720p");
    hb4.setAttribute("style", "height: 20px; width: 100px; text-align: center; border: 1px solid black;");
    hb4.appendChild(tb4);
    hb4.addEventListener("click", function () { h.setAttribute("width", 1280); h.setAttribute("style", "margin-left: " + (window.innerWidth - 1280) / 2 + "px; ");
                                                h.setAttribute("height", 720); window.scrollTo(0,findPos(h)); }, false );
    hdiv1.appendChild(hb4);

    var hb5=document.createElement("button");
    var tb5=document.createTextNode("1080p");
    hb5.setAttribute("style", "height: 20px; width: 100px; text-align: center; border: 1px solid black;");
    hb5.appendChild(tb5);
    hb5.addEventListener("click", function () { h.setAttribute("width", 1920); h.setAttribute("style", "margin-left: " + (window.innerWidth - 1920) / 2 + "px; ");
                                                h.setAttribute("height", 1080); window.scrollTo(0,findPos(h)); }, false );
    hdiv1.appendChild(hb5);

}, false )
