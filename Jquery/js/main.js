//Variables
var fontSize = 14;
var ctrlIsDown = false;

// MENU FUNCTIONS
function OpenMenu() {
    $("#menu").css("left", "0");
    $("body").toggleClass("dialogIsOpen", true);
    $('body').addClass('is-dimmed');

}

function CloseMenu() {
    $("body").toggleClass("dialogIsOpen", false);
    if ($(window).width() >= 960) {
        $("#menu").css("left", "-20%");
    }
    else if ($(window).width() >= 576) {
        $("#menu").css("left", "-30%");
    }
    else {
        $("#menu").css("left", "-80%");
    }

    $('body').removeClass('is-dimmed');
}

function ResizeMenu() {
    if ($(window).width() >= 960) {
        $("#menu").css("width", "20%");
    }
    else if ($(window).width() >= 576) {
        $("#menu").css("width", "30%");
    }
    else {
        $("#menu").css("width", "80%");
    }
}

function CheckMenu() {
    if ($("#menu").css("left") == "0px") {
        OpenMenu();
    }
    else {
        ResizeMenu();
        CloseMenu();
    }
}

$(document).click(function (event) {
    //if you click on anything except the modal itself close the modal
    if (!$(event.target).closest(".menu, .sidebar").length) {
        CloseMenu();
    }

    //Popover Closer
    //if you click on anything except the modal itself close the modal
    if (!$(event.target).closest("#font-settings, .popover").length) {
        $('#font-settings').popover('hide');

    }
    if (!$(event.target).closest("#reader-settings, .popover").length) {
        $('#reader-settings').popover('hide');

    }
});


//Window loaded process
$(window).on('load', function (e) {
    ChangeReaderPageColor(getCookie("readerColor"));
    ChangeFont(getCookie("fontFamily"));
    ChangeFontSize(getCookie("fontSize"));
})

//Document ready processes
$(document).ready(function () {
    //Get first markdown page
    // $.get('dummy/markdown/page1.md', function (data) {
    //     var converter = new showdown.Converter();
    //     html = converter.makeHtml(data);
    //     $("#page").html(html);
    // }, 'text');



    //Text Highlighter
    var hltr = new TextHighlighter(document.getElementById('page'), {
        onBeforeHighlight: function (range) {
            var response = hltr.isHighlight(this.el);

            console.log(this.el);
            console.log(response);
            return true;
        },
        onAfterHighlight: function (range, highlights) {
            // window.alert('Created ' + highlights.length + ' highlight(s): ' + highlights.map(function (h) {
            //     return '"' + h.innerText + '"';
            // }).join(', '));
            console.log("response");
            return true;
        },
        onRemoveHighlight: function (hl) {
            console.log("response2");
            return true;
        }
    });

    // Scrollbar for main page
    $("body").niceScroll({
        cursorcolor: "#424242", // change cursor color in hex
        cursoropacitymin: 0, // change opacity when cursor is inactive (scrollabar "hidden" state), range from 1 to 0
        cursoropacitymax: 1, // change opacity when cursor is active (scrollabar "visible" state), range from 1 to 0
        cursorwidth: "7px", // cursor width in pixel (you can also write "5px")
        cursorborder: "0px solid #fff", // css definition for cursor border
        cursorborderradius: "3px", // border radius in pixel for cursor
        autohidemode: true, // how hide the scrollbar works, possible values: 
        //background:"grey",

    });

    // Scrollbar for menu tabs
    $(".tab-content").niceScroll({

    });

    //CreatePopovers
    CreatePopovers(false, "font-settings");
    CreatePopovers(false, "reader-settings");

    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'manual',
        placement: 'bottom',
        boundary: 'window'
    });


    //Prevent Right Click
    // $("body").on("contextmenu", function () {
    //     return false;
    // });

});


//Prevent shortcuts
$(document).keydown(function (e) {
    var key = e.charCode || e.keyCode;
    if (key == 17) {
        ctrlIsDown = true;
    }
    else if (ctrlIsDown) {
        //e.preventDefault();
    }
});
$(document).keyup(function (e) {
    var key = e.charCode || e.keyCode;
    if (key == 17) {
        ctrlIsDown = false;
    }
});


// Popovers
function CreatePopovers(dispose, popover) {
    if (popover == "font-settings") {
        if (dispose)
            $('#font-settings').popover('dispose');

        $('#font-settings').popover({
            trigger: 'click',
            html: true,
            title: '<input id="fontRangeSlider" type="range" class="custom-range" min="12" max="24" step="0.8" value="' + fontSize + '">',
            content: '<p style="font-family: \'Times New Roman\', Times, serif;" onclick="ChangeFont(\'times\')">Times New Roman</p>'
                + '<p style="font-family: Georgia, \'Times New Roman\', Times, serif;" onclick="ChangeFont(\'georgia\')">Georgia</p>' +
                '<p style="font-family: Arial, Helvetica, sans-serif;" onclick="ChangeFont(\'arial\')">Arial</p>',
            placement: 'right',
            boundary: 'window',
            toggleClass: 'popover',
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        })
            .on('shown.bs.popover', function () {
                $("#fontRangeSlider").change(function () {
                    fontSize = $("#fontRangeSlider").val();
                    ChangeFontSize(fontSize);
                });
            })
            .on('hidden.bs.popover', function () {
                CreatePopovers(true, "font-settings");
            });
    }
    else if (popover == "reader-settings") {
        if (dispose)
            $('#reader-settings').popover('dispose');

        $('#reader-settings').popover({
            trigger: 'click',
            html: true,
            content: '<div class="square" onclick="ChangeReaderPageColor(\'white\')"><i class="fas fa-sun fa-3x"></i>Beyaz</div>'
                + '<div class="square" onclick="ChangeReaderPageColor(\'sepia\')"><i class="fas fa-adjust fa-3x"></i>Sepya</div>'
                + '<div class="square" onclick="ChangeReaderPageColor(\'dark\')"><i class="fas fa-moon fa-3x"></i>Siyah</div>',
            placement: 'right',
            boundary: 'window',
            toggleClass: 'popover',
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-body"></div></div>'
        })
            .on('shown.bs.popover', function () {

            });
    }
}

//Change font family by User
function ChangeFont(font) {

    if (font == 'times' || font == 'georgia' || font == 'arial')
        setCookie("fontFamily", font, 30);

    if (font == 'times')
        $('.main').css("font-family", "'Times New Roman', Times, serif");
    else if (font == 'georgia')
        $('.main').css("font-family", " Georgia, 'Times New Roman', Times, serif");
    else if (font == 'arial')
        $('.main').css("font-family", "Arial, Helvetica, sans-serif");
    $('body').getNiceScroll().resize();
}

function ChangeFontSize(size) {
    if (size >= 14 || size <= 24) {
        fontSize = size;
        setCookie("fontSize", size, 30);
        $('.main').css("font-size", size + "px");
        $('body').getNiceScroll().resize();
    }
}

//Change color theme by user
function ChangeReaderPageColor(color) {
    if (color == 'white' || color == 'sepia' || color == 'dark') {
        $('body').removeClass("sepia");
        $('body').removeClass("dark");
        $('.menu').removeClass("sepia");
        $('.menu').removeClass("dark");
        $('.sidebar').removeClass("white");
        $('.sidebar').removeClass("sepia");
        $('.sidebar').removeClass("dark");
        $('.nav__btn').removeClass("fa-inverse");
        setCookie("readerColor", color, 30);
    }

    if (color == 'sepia') {
        $('body').addClass("sepia");
        $('.menu').addClass("sepia");
        $('.sidebar').addClass("sepia");
    }
    else if (color == 'dark') {
        $('body').addClass("dark");
        $('.menu').addClass("dark");
        $('.sidebar').addClass("dark");
        $('.nav__btn').addClass("fa-inverse");
    }
    else if (color == 'white') {
        $('.sidebar').addClass("white");
    }

}

//Bookmark page by user
function Bookmark() {
    $('#bookmark').tooltip('show');
    setTimeout(function () { $('#bookmark').tooltip('hide'); }, 750);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}