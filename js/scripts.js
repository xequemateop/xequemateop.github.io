$(document).ready(function () {
    var itemsMainDiv = ('.MultiCarousel');
    var itemsDiv = ('.MultiCarousel-inner');
    var itemWidth = "";

    $('.leftLst, .rightLst').click(function () {
        var condition = $(this).hasClass("leftLst");
        if (condition)
            click(0, this);
        else
            click(1, this)
    });


    var touchStartX = {};

    $('.MultiCarousel-inner').on('touchstart', function (e) {
        var carouselId = $(this).parent().attr('id');
        touchStartX[carouselId] = e.originalEvent.touches[0].clientX;
    });

    $('.MultiCarousel-inner').on('touchmove', function (e) {
        e.preventDefault();

        var carouselId = $(this).parent().attr('id');
        var deltaX = e.originalEvent.touches[0].clientX - touchStartX[carouselId];
        ResCarousel(deltaX > 0 ? 0 : 1, '#' + carouselId, 1);
    });

    $('.MultiCarousel-inner').on('touchend', function () {
        var carouselId = $(this).parent().attr('id');
        touchStartX[carouselId] = null;
    });

    ResCarouselSize();




    $(window).resize(function () {
        ResCarouselSize();
    });

    //this function define the size of the items
    function ResCarouselSize() {
        var incno = 0;
        var dataItems = ("data-items");
        var itemClass = ('.item');
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';
        var sampwidth = $(itemsMainDiv).width();
        var bodyWidth = $('body').width();
        $(itemsDiv).each(function () {
            id = id + 1;
            var itemNumbers = $(this).find(itemClass).length;
            btnParentSb = $(this).parent().attr(dataItems);
            itemsSplit = btnParentSb.split(',');
            $(this).parent().attr("id", "MultiCarousel" + id);


            if (bodyWidth >= 1200) {
                incno = itemsSplit[3];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 992) {
                incno = itemsSplit[2];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 768) {
                incno = itemsSplit[1];
                itemWidth = sampwidth / incno;
            }
            else {
                incno = itemsSplit[0];
                itemWidth = sampwidth / incno;
            }
            $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
            $(this).find(itemClass).each(function () {
                $(this).outerWidth(itemWidth);
            });

            $(".leftLst").addClass("over");
            $(".rightLst").removeClass("over");

        });
    }


    //this function used to move the items
    function ResCarousel(e, el, s) {
        var leftBtn = ('.leftLst');
        var rightBtn = ('.rightLst');
        var translateXval = '';
        var divStyle = $(el + ' ' + itemsDiv).css('transform');
        var values = divStyle.match(/-?[\d\.]+/g);
        var xds = Math.abs(values[4]);
        if (e == 0) {
            translateXval = parseInt(xds) - parseInt(itemWidth * s);
            $(el + ' ' + rightBtn).removeClass("over");

            if (translateXval <= itemWidth / 2) {
                translateXval = 0;
                $(el + ' ' + leftBtn).addClass("over");
            }
        }
        else if (e == 1) {
            var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
            translateXval = parseInt(xds) + parseInt(itemWidth * s);
            $(el + ' ' + leftBtn).removeClass("over");

            if (translateXval >= itemsCondition - itemWidth / 2) {
                translateXval = itemsCondition;
                $(el + ' ' + rightBtn).addClass("over");
            }
        }
        $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
    }

    //It is used to get some elements from btn
    function click(ell, ee) {
        var Parent = "#" + $(ee).parent().attr("id");
        var slide = $(Parent).attr("data-slide");
        ResCarousel(ell, Parent, slide);
    }

    
});


function toggleReadMore() {
    var textContainer = document.getElementById("readMoreText");
    textContainer.classList.toggle("show-more");

    var alignament = textContainer.querySelector("#history-article");

    var button = textContainer.querySelector("#read-btn");
    if (textContainer.classList.contains("show-more")) {
        button.innerHTML = `Ler menos <i class="fas fa-chevron-up mx-3"></i>`;
        alignament.classList.add("col-lg-5");
    } else {
        button.innerHTML = `Ler mais <i class="fas fa-chevron-down  mx-3"></i>`;
        alignament.classList.remove("col-lg-5");

    }
}

function toggleCard(id) {
    var cardContent = document.getElementById(id);
    cardContent.classList.toggle("d-none");

    var icon = document.getElementById(id + "-icon");

    if (cardContent.classList.contains("d-none")){
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
    }else {
        icon.classList.add("fa-chevron-up");
        icon.classList.remove("fa-chevron-down");
    }
}