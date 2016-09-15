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

var iframe = null;
var hdiv1 = null;
var notfoundmsg = null;

updateIframe = function() {
    if (!iframe)
        return;

    var parts = document.URL.split("watch?v=");
    if (parts.length < 2) {
        iframe.parentNode.removeChild(iframe);
        iframe = null;
        hdiv1.parentNode.removeChild(hdiv1);
        hdiv1 = null;
        if (notfoundmsg) {
            notfoundmsg.parentNode.removeChild(notfoundmsg);
            notfoundmsg = null;
        }
        return;
    }
    var parts2 = parts[parts.length-1].split("&");

    var parts0 = document.URL.split("list=");
    var parts02 = parts0[parts0.length-1].split("&");
    var part_list = "";
    if (parts0.length >= 2)
        part_list = "?list=" + parts02[0];

    iframe.setAttribute("src", "//www.youtube.com/embed/" + parts2[0] + part_list);

    var pl1_ = document.getElementById('watch7-sidebar');
    if (pl1_) {
        pl1_.style.transition = "initial";
        pl1_.style.marginTop = "0px";
        pl1_.style.top = "0px";
    }

    var pl_c = document.getElementById('placeholder-player');
    if (pl_c)
        pl_c.parentNode.removeChild(pl_c);

    var pl_c2 = document.getElementById('placeholder-playlist');
    if (pl_c2)
        pl_c2.parentNode.removeChild(pl_c2);
}

initFix = function () {
    if (iframe)
        return;

    var parts = document.URL.split("watch?v=");
    if (parts.length < 2) return;

    iframe = document.createElement("iframe");
    iframe.setAttribute("width", window.innerWidth-20);
    iframe.setAttribute("height", window.innerHeight-20);
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "");

    hdiv1 = document.createElement("div");

    var title_1 = document.getElementById('masthead-positioner');
    if (title_1) //WTF?
        title_1.style.position = "absolute";


    //place new video window
    var pl = document.getElementById('player');
    if (pl === null) {
        pl = document.getElementById('placeholder-player');
        if (pl)
            pl.parentNode.style.maxWidth = "100000px"; //...
    }
    if (pl != null) {
        //try to stop everything
       var i;
       var list2 = document.getElementsByTagName("video");
       for (i = 0; i < list2.length; i++) {
                                       //console.log(j, list2[i].paused, list2[i].currentTime);
           list2[i].autoplay = false;
           list2[i].pause();
           //list2[i].src = "";
           //list2[i].innerHTML = "";
           //list2[i].load();
       }
       var list3 = document.getElementsByTagName("audio");
       for (i = 0; i < list3.length; i++) {
           list3[i].autoplay = false;
           list3[i].pause();
           //list3[i].src = "";
           //list3[i].innerHTML = "";
           //list3[i].load();
       }
       //console.log(list2.length, list3.length);

        //remove
        var pl1 = pl.parentNode;
        pl.style.display = "none";
        pl.id = "asd2";
        pl.setAttribute("class", "asd");
        pl1.removeChild(pl);

        //replace
        pl1.insertBefore(iframe, pl1.firstChild);
        if (iframe.nextSibling)
            pl1.insertBefore(hdiv1, iframe.nextSibling);
        else
            pl1.appendChild(hdiv1);

        setTimeout(function() { window.scrollTo(0,findPos(iframe)); }, 700);
    } else {
        document.body.appendChild(iframe);
        document.body.appendChild(hdiv1);

        notfoundmsg=document.createElement("button");
        var t1=document.createTextNode("Video not found. Click here to scroll to HTML5 enabled video at bottom of this page.");
        notfoundmsg.setAttribute("style", "height: 200px; width: 100%; text-align: center;");
        notfoundmsg.appendChild(t1);
        notfoundmsg.addEventListener("click", function () { scrollBottom(); }, false );
        document.body.insertBefore(notfoundmsg, document.body.firstChild);
    }

    updateIframe();

    //create size buttons
    var hb0=document.createElement("button");
    var tb0=document.createTextNode("Select size:");
    hb0.setAttribute("style", "height: 20px; width: 200px; text-align: center; ");
    hb0.appendChild(tb0);
    hb0.addEventListener("click", function () { window.scrollTo(0,findPos(iframe)); }, false );
    hdiv1.appendChild(hb0);

    var hb1=document.createElement("button");
    var tb1=document.createTextNode("Fit size");
    hb1.setAttribute("style", "height: 20px; width: 100px; text-align: center; border: 1px solid black;");
    hb1.appendChild(tb1);
    hb1.addEventListener("click", function () { iframe.setAttribute("width", window.innerWidth-20); iframe.setAttribute("style", "");
                                                iframe.setAttribute("height", window.innerHeight-20); window.scrollTo(0,findPos(iframe)); }, false );
    hdiv1.appendChild(hb1);

    var hb2=document.createElement("button");
    var tb2=document.createTextNode("360p");
    hb2.setAttribute("style", "height: 20px; width: 100px; text-align: center; border: 1px solid black;");
    hb2.appendChild(tb2);
    hb2.addEventListener("click", function () { iframe.setAttribute("width", 480); iframe.setAttribute("style", "margin-left: " + (window.innerWidth - 480) / 2 + "px; ");
                                                iframe.setAttribute("height", 360); window.scrollTo(0,findPos(iframe)); }, false );
    hdiv1.appendChild(hb2);

    var hb3=document.createElement("button");
    var tb3=document.createTextNode("480p");
    hb3.setAttribute("style", "height: 20px; width: 100px; text-align: center; border: 1px solid black;");
    hb3.appendChild(tb3);
    hb3.addEventListener("click", function () { iframe.setAttribute("width", 640); iframe.setAttribute("style", "margin-left: " + (window.innerWidth - 640) / 2 + "px; ");
                                                iframe.setAttribute("height", 480); window.scrollTo(0,findPos(iframe)); }, false );
    hdiv1.appendChild(hb3);

    var hb4=document.createElement("button");
    var tb4=document.createTextNode("720p");
    hb4.setAttribute("style", "height: 20px; width: 100px; text-align: center; border: 1px solid black;");
    hb4.appendChild(tb4);
    hb4.addEventListener("click", function () { iframe.setAttribute("width", 1280); iframe.setAttribute("style", "margin-left: " + (window.innerWidth - 1280) / 2 + "px; ");
                                                iframe.setAttribute("height", 720); window.scrollTo(0,findPos(iframe)); }, false );
    hdiv1.appendChild(hb4);

    var hb5=document.createElement("button");
    var tb5=document.createTextNode("1080p");
    hb5.setAttribute("style", "height: 20px; width: 100px; text-align: center; border: 1px solid black;");
    hb5.appendChild(tb5);
    hb5.addEventListener("click", function () { iframe.setAttribute("width", 1920); iframe.setAttribute("style", "margin-left: " + (window.innerWidth - 1920) / 2 + "px; ");
                                                iframe.setAttribute("height", 1080); window.scrollTo(0,findPos(iframe)); }, false );
    hdiv1.appendChild(hb5);
}

var oldURL = "";
function checkURLchange(currentURL){
   if(currentURL != oldURL){
       oldURL = currentURL;
       if (iframe)
           setTimeout(updateIframe, 100);
       else
           setTimeout(initFix, 200);
   }
}

document.addEventListener( "DOMContentLoaded",
function () {
        //actually, this same script also runs in inframe too...
    var parts = document.URL.split("/embed/");
    if (parts.length >= 2)
        return;

    setTimeout(initFix, 200);

   //setup dynamic page change check
  oldURL = window.location.href;
  setInterval(function() {checkURLchange(window.location.href);
         }, 1000);
}, false )
