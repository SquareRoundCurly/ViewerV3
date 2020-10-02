window.addEventListener('load', function () {
    var $grid = $('.grid').packery({
        itemSelector: '.grid-item',
        percentPosition: true,
        gutter: 0,
        rowHeight: 100,
        columnWidth: 100
    });

    // make all grid-items draggable
    $grid.find('.grid-item').each(function (i, gridItem) {
        var draggie = new Draggabilly(gridItem);
        // bind drag events to Packery
        $grid.packery('bindDraggabillyEvents', draggie);
        //gridItem.innerHTML = '<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/submerged.jpg" />';
    });

    function onLayout() {
        console.log('fitComplete'/*'layout done'*/);

        // Set layout grid
        var html = document.getElementById('grid').innerHTML;
        document.getElementById('grid2').innerHTML = html;

        var grid = document.querySelector('.grid2')
        var pckry = Packery.data(grid);

        pckry.reloadItems();

        var elems = pckry.getItemElements()
        //elems.forEach((element) => {
        //    var draggie = new Draggabilly(element);
        //    // bind drag events to Packery
        //    pckry.bindDraggabillyEvents(draggie);
        //});

        //pckry.shiftLayout();
        pckry.reloadItems();
    }

    // bind event listener
    $grid.on('dragItemPositioned', onLayout);
});