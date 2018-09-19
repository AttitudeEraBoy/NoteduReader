// MENU FUNCTIONS
function openMenu() {
    $("#menu").css("left", "0");
    $("body").toggleClass("dialogIsOpen", true);
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
    else{
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
    
    $('.pop').popover({
        trigger: 'focus'
      })

    // $(".pop").popover({ trigger: "manual" , html: true, animation:false})
    // .on("mouseenter", function () {
    //     var _this = this;
    //     $(this).popover("show");
    //     $(".popover").on("mouseleave", function () {
    //         $(_this).popover('hide');
    //     });
    // }).on("mouseleave", function () {
    //     var _this = this;
    //     setTimeout(function () {
    //         if (!$(".popover:hover").length) {
    //             $(_this).popover("hide");
    //         }
    //     }, 300);
    // });

    
});

