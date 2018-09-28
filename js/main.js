// MENU FUNCTIONS
function openMenu() {
    $("#menu").css("left", "0");
    $("body").toggleClass("dialogIsOpen", true);
    $('body').addClass('is-dimmed');

}

function closeMenu() {
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

function resizeMenu() {
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

function checkMenu() {
    if ($("#menu").css("left") == "0px") {
        openMenu();
    }
    else {
        resizeMenu();
        closeMenu();
    }
}

$(document).click(function (event) {
    //if you click on anything except the modal itself close the modal
    if (!$(event.target).closest(".menu, .sidebar").length) {
        closeMenu();
    }
});
// SCROLLBAR FUNCTIONS
$(document).ready(function () {
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


    //Popovers
    $('#font-settings').popover({
        trigger: 'click',
        html: true,
        title: '<input id="fontRangeSlider" type="range" class="custom-range" min="12" max="24" step="0.8">',
        content: '<p style="font-family: \'Times New Roman\', Times, serif;" onclick="changeFont(\'times\')">Times New Roman</p>'
            + '<p style="font-family: Georgia, \'Times New Roman\', Times, serif;" onclick="changeFont(\'georgia\')">Georgia</p>' +
            '<p style="font-family: Arial, Helvetica, sans-serif;" onclick="changeFont(\'arial\')">Arial</p>',
        placement: 'right',
        boundary: 'window',
        toggleClass: 'popover',
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    })
        .on('shown.bs.popover', function () {
            $("#fontRangeSlider").change(function () {
                $('.main').css("font-size", $("#fontRangeSlider").val() + "px");
            });
        });

    $('#reader-settings').popover({
        trigger: 'click',
        html: true,
        content: '<div class="square" onclick="changeReaderPageColor(\'white\')"><i class="fas fa-sun fa-3x"></i>Beyaz</div>'
            + '<div class="square" onclick="changeReaderPageColor(\'sepia\')"><i class="fas fa-adjust fa-3x"></i>Sepya</div>'
            + '<div class="square" onclick="changeReaderPageColor(\'dark\')"><i class="fas fa-moon fa-3x"></i>Siyah</div>',
        placement: 'right',
        boundary: 'window',
        toggleClass: 'popover',
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-body"></div></div>'
    })
        .on('shown.bs.popover', function () {
            $("#fontRangeSlider").change(function () {
                $('.main').css("font-size", $("#fontRangeSlider").val() + "px");
            });
        });



    //Popover Closer
    $(document).click(function (event) {
        //if you click on anything except the modal itself close the modal
        if (!$(event.target).closest("#font-settings, .popover").length) {
            $('#font-settings').popover('hide');

        }
        if (!$(event.target).closest("#reader-settings, .popover").length) {
            $('#reader-settings').popover('hide');

        }
    });

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

var ctrlIsDown = false;

$(document).keydown(function (e) {
    var key = e.charCode || e.keyCode;
    console.log('keydown' + key);
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

function changeFont(font) {
    if (font == 'times')
        $('.main').css("font-family", "'Times New Roman', Times, serif");
    else if (font == 'georgia')
        $('.main').css("font-family", " Georgia, 'Times New Roman', Times, serif");
    else if (font == 'arial')
        $('.main').css("font-family", "Arial, Helvetica, sans-serif");
}


function changeReaderPageColor(color) {
    $('body').removeClass("sepia");
    $('body').removeClass("dark");
    $('.menu').removeClass("sepia");
    $('.menu').removeClass("dark");
    $('.nav__btn').removeClass("fa-inverse");
    if (color == 'sepia') {
        $('body').addClass("sepia");
        $('.menu').addClass("sepia");
    }
    else if (color == 'dark') {
        $('body').addClass("dark");
        $('.menu').addClass("dark");
        $('.nav__btn').addClass("fa-inverse");
    }

}

function bookmark(){
    $('#bookmark').tooltip('show');
    setTimeout(function(){ $('#bookmark').tooltip('hide'); }, 750);
}