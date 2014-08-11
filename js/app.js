(function($) {

  var defaultLayerOptions = {};
  var map, layer;

  function reloadLayer(layerOptions) {
    var url;

    if (!map) {
      map = L.map('layer-map').setView([0, 0], 3);
    }

    if (map.hasLayer(layer)) {
      map.removeLayer(layer);
    }

    // https://s3.amazonaws.com/tiles.minnpost/testing/mbtiles2s3-issue-1/{z}/{x}/{y}.png
    url = $('.tileset-pattern').val() || 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png';
    layerOptions = $.extend({}, defaultLayerOptions, layerOptions);
    layer = new L.tileLayer(url, layerOptions);
    map.addLayer(layer);

    map.invalidateSize();
  }

  $(document).ready(function() {
    reloadLayer();

    $('.tileset-pattern').on('change', function() {
      reloadLayer();
    });

    $('.tms-xyz').on('click', function() {
      $(this).text($(this).text() === 'tms' ? 'xyz' : 'tms');

      reloadLayer({
        tms: ($(this).text() === 'tms')
      });
    });

  });

})(jQuery);
