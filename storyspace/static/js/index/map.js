storyspaceMap = (function(){
    storyspaceMap = function(options) {
        this.map = L.map('mapid', {
            zoomControl: false
        }).setView([30, 0], 2);

        L.tileLayer(options.tile_url, options.tile_options).addTo(this.map);

        new L.Control.Zoom({
            position: 'bottomleft'
        }).addTo(this.map);

        this.icons = options.icons;
    };

    storyspaceMap.prototype.panzoom = function(zoom, latitude, longitude) {
        this.map.setZoom(zoom);
        this.map.panTo([latitude, longitude]);
    };

    return storyspaceMap;
})();
