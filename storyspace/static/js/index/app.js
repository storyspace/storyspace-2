$(document).ready(function() {
    var csrftoken = $('meta[name=csrf-token]').attr('content');

    stories = new storyspaceStories({
        endpoint: '/api/story',
        csrftoken: csrftoken,
    });

    map = new storyspaceMap({
        tile_url: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
        tile_options: {
            maxZoom: 15,
            id: 'tiffachoi.pbn9d7d4',
            accessToken: 'pk.eyJ1IjoidGlmZmFjaG9pIiwiYSI6ImNpbGphMGc4NTRiNmZ1dG0wMG5zMzFsMWIifQ.M8zCDPQqnFfczyJc79VMDQ'
        },
        icons: {
            race: L.icon({
                iconUrl: '/assets/img/icon-race.png',
                iconSize: [30, 30]
            }),
            gender: L.icon({
                iconUrl: '/assets/img/icon-gender.png',
                iconSize: [30, 30]
            }),
            sexuality: L.icon({
                iconUrl: '/assets/img/icon-sexuality.png',
                iconSize: [30, 30]
            }),
            social_class: L.icon({
                iconUrl: '/assets/img/icon-class.png',
                iconSize: [30, 30]
            }),
        },
    });

    locator = new storyspaceLocation();

    bind_interfaces(stories, map, locator);

    stories.get('storyspacegotstories');
});
