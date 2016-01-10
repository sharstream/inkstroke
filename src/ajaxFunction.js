// This example was created using Protovis & jQuery
// Base64 provided by http://www.webtoolkit.info/javascript-base64.html
// Modern web browsers have a builtin function to this as well 'btoa'

exports.encodeImg = function encode_as_img_and_link() {
    // Add some critical information
    $("svg").attr({ version: '1.1', xmlns: "http://www.w3.org/2000/svg" });

    var svg = $("#chart-canvas").html();
    var b64 = Base64.encode(svg); // or use btoa if supported

    // Works in recent Webkit(Chrome)
    $("body").append($("<img src='data:image/svg+xml;base64,\n" + b64 + "' alt='file.svg'/>"));

    // Works in Firefox 3.6 and Webit and possibly any browser which supports the data-uri
    $("body").append($("<a href-lang='image/svg+xml' href='data:image/svg+xml;base64,\n" + b64 + "' title='file.svg'>Download</a>"));
    
}

//GET REQUEST

exports.jsonMimeType = "application/json;charset=UTF-8";
$.ajax({
    type: "GET",
    url: 'http://localhost:54193/index.html',
    dataType: "html json",//expecting back from server
    data: data,//expecting send to server
    cache: false,//only to GET and HEAD requests
    beforeSend: function (send) {// to fix request received mime type
        if (send && send.overrideMimeType) {
            send.overrideMimeType(jsonMimeType);//sanatizing the response
        }
    },
    success: function (response) {
        // use the parseJSON function to convert the string  
        // into a useable object 
        var json = jQuery.parseJSON(response);
    },
    error: function (e, xhr) {
        console.log('parser error...')
    }
}).done(function () {
    $(this).addClass('done');
});

$(document).ready(function () {
    $("#signature").jSignature({ color: "#00f", lineWidth: 5 });
});

//
// #########################################################
// ## Using Hand.js Pointer Events
// #########################################################
//
exports.supportedEventsNames = ["PointerDown", "PointerUp", "PointerMove", "PointerOver", "PointerOut",
                            "PointerCancel", "PointerEnter", "PointerLeave",
                            "pointerdown", "pointerup", "pointermove", "pointerover", "pointerout",
                            "pointercancel", "pointerenter", "pointerleave"];

exports.makeTouchAware = function (item, eventName) {
    // If item is already touch aware, do nothing
    if (item.onpointerdown !== undefined) {
        return;
    }

    // IE 10
    if (item.onmspointerdown !== undefined) {
        var msEventName;

        if (eventName == eventName.toLowerCase()) {
            var indexOfUpperCase = supportedEventsNames.indexOf(eventName) -
                      (supportedEventsNames.length / 2);
            msEventName = "MS" + supportedEventsNames[indexOfUpperCase];
        }
        else {
            msEventName = "MS" + eventName;
        }

        item.addEventListener(msEventName,
           function (evt) { generateTouchClonedEvent(evt, eventName); }, false);

        // We can return because MSPointerXXX integrate mouse support
        return;
    }
    // Chrome, Firefox
    if (item.ontouchstart !== undefined) {
        switch (eventName.toLowerCase()) {
            case "pointerdown":
                item.addEventListener("touchstart", function (evt) {
                    handleOtherEvent(evt, eventName);
                }, false);
                break;
            case "pointermove":
                item.addEventListener("touchmove", function (evt) {
                    handleOtherEvent(evt, eventName);
                }, false);
                break;
            case "pointerup":
                item.addEventListener("touchend", function (evt) {
                    handleOtherEvent(evt, eventName);
                }, false);
                break;
            case "pointercancel":
                item.addEventListener("touchcancel", function (evt) {
                    handleOtherEvent(evt, eventName);
                }, false);
                break;
        }
    }
}

//
// ###################################
// ## Working with Images
// ###################################
//
exports.loadImage = function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var sources = {
    darthVader: 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg',
    yoda: 'http://www.html5canvastutorials.com/demos/assets/yoda.jpg'
};

exports.loadImages(sources, function (images) {
    context.drawImage(images.darthVader, 100, 30, 200, 137);
    context.drawImage(images.yoda, 350, 55, 93, 104);
});

exports.postData = "text";
$.ajax({
    type: "post",
    url: "url",
    data: postData,
    contentType: "application/x-www-form-urlencoded",
    success: function (responseData, textStatus, jqXHR) {
        alert("data saved")
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    }
})