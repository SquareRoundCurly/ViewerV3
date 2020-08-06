window.addEventListener('load', function () {
    var $grid = $('.grid').packery({
        itemSelector: '.grid-item',
        percentPosition: true,
        gutter: 0,
        columnWidth: 100
    });

    // make all grid-items draggable
    $grid.find('.grid-item').each(function (i, gridItem) {
        var draggie = new Draggabilly(gridItem);
        // bind drag events to Packery
        $grid.packery('bindDraggabillyEvents', draggie);
        gridItem.innerHTML = '<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/submerged.jpg" />';
        console.log();
    });
});