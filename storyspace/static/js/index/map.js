storyspaceMap = (function(){
    storyspaceMap = function(options) {
        this.map = L.map('mapid', {
            zoomControl: false
        }).setView([30, 0], 2);

        L.tileLayer(options.tile_url, options.tile_options).addTo(this.map);

        new L.Control.Zoom({
            position: 'bottomleft'
        }).addTo(this.map);

        this.icon_radius = options.icon_options.icon_radius;
        this.icons = {};
    };

    storyspaceMap.prototype.panzoom = function(zoom, latitude, longitude) {
        this.map.setZoom(zoom);
        this.map.panTo([latitude, longitude]);
    };

    storyspaceMap.prototype.icon = function(categories) {
        categories.sort();
        hash = categories.join();

        if (this.icons.hasOwnProperty(hash)) {
            return this.icons[hash];
        } else {
            return (this.icons[hash] = L.divIcon({
                iconSize: [this.icon_radius * 2, this.icon_radius * 2],
                html: make_story_icon(this.icon_radius, categories),
            }));
        }
    };

    return storyspaceMap;
})();

function make_story_icon(r, categories) {
    a = a_section = (2 * Math.PI) / categories.length;

    x1 = 2 * r;
    y1 = r;

    svg_string = '<svg class="story_icon">';

    if (categories.length > 1) {
        for (i = 0; i < categories.length; ++i) {
            x2 = r + r * Math.cos(a);
            y2 = r + r * Math.sin(a);

            svg_string += '<path class="' + categories[i] + '" d="M' + r + ',' + r + ' L' + x1 + ',' + y1 + ' A' + r + ',' + r + ' 1 0, 1 ' + x2 + ',' + y2 + ' z"></path>';

            x1 = x2;
            y1 = y2;
            a += a_section;
        }
    } else {
        svg_string += '<circle class="' + categories[0] + '" cx="' + r + '" cy="' + r + '" r="' + r + '"></circle>';
    }



    svg_string += '</svg>';

    return svg_string;
}
