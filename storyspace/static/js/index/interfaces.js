function bind_interfaces(stories, map, locator) {
    document.addEventListener('storyspacechangelocation', function() {
        map.panzoom(14, event.detail.latitude, event.detail.longitude);
        $('section#welcome-overlay').css('visibility', 'hidden');
        $('section#instruction-bar h2#beginning').fadeIn(2000);
        $('section#instruction-bar h2#beginning').delay(15000);
        $('section#instruction-bar h2#beginning').fadeOut(2000);

        document.share.latitude.value = event.detail.latitude;
        document.share.longitude.value = event.detail.longitude;
    });

    //clicked yes-location, brings up dialogue box
    $('section#welcome-overlay ul#share-location li a#yes-location').click(function () {
        locator.retrieve('storyspacechangelocation');
    });

    //clicked no-enter, closes overlay
    $('section#welcome-overlay ul#share-location li a#no-enter').click(function () {
        $('section#welcome-overlay').css('visibility', 'hidden');
        $('section#instruction-bar h2#beginning').fadeIn(2000);
        $('section#instruction-bar h2#beginning').delay(15000);
        $('section#instruction-bar h2#beginning').fadeOut(2000);
    });

    //about overlay
    $('nav#top-nav ul li a.info-nav').click(function () {
        $('section#about-overlay').css('visibility', 'visible');
        return false;
    });

    //about overlay close
    $('section#about-overlay #about-close a').click(function () {
        $('section#about-overlay').css('visibility', 'hidden');
    });

    //contact overlay
    $('nav#top-nav ul.left-nav li a.contact-nav').click(function () {
        $('section#contact-overlay').css('visibility', 'visible');
        return false;
    });

    //contact overlay close
    $('section#contact-overlay #contact-close a').click(function () {
        $('section#contact-overlay').css('visibility', 'hidden');
    });

    $('nav#top-nav ul li#share a').click(function (event) {
        console.log("clicked share button");
        // event.stopPropagation();
        // $('section#share-overlay').css('visibility', 'visible');
        $('#dialog').dialog('open');
    });

    $('body').bind('click', function(e) {
        if($('#dialog').dialog('isOpen')
            && !$(e.target).is('.ui-dialog, a')
            && !$(e.target).closest('.ui-dialog').length
        ) {
            $('#dialog').dialog('close');
        }
    });

    //share overlay
    $('#dialog').dialog({
        autoOpen: false,
        modal: false,
        draggable: false,
        resizable: false,
        position:[250,65],
        width:800,
        // height:600,
        // open: function() {
        //     $('.ui-widget-overlay').bind('click', function() {
        //         $('#dialog').dialog('close');
        //     })
        // },
    });

     //share overlay close
    $('#share-overlay nav#share-close a').click(function () {
        //$('section#share-overlay').css('visibility', 'hidden');
        $('#dialog').dialog('close');
    });

    var allCategories = ['race', 'gender', 'sexuality', 'social_class'];
    var shownCategories = allCategories.slice(0);

    var makeMarkers = function(stories) {
        for (i in stories) {
            story = stories[i];

            story.marker = L.marker([story.latitude, story.longitude], {
                icon: map.icons[story.category]
            }).bindPopup(
                '<strong>' + story.title + '</strong>' + '<br>' + story.content + '<br><em>' + (story.author || 'anonymous') + '</em>' + (story.image_url ? ('<br><br><img class="storyimage" src="' + story.image_url + '"/>') : '')
            ).addTo(map.map);
        }
    };

    var showStories = function (stories, categories) {
        for (i in stories) {
            story = stories[i];

            if (categories.indexOf(story.category) == -1) {
                story.marker.setOpacity(0.0);
                story.marker.clickable = false;
            } else {
                story.marker.setOpacity(1.0);
                story.marker.clickable = true;
            }
        }
        return false;
    };

    document.addEventListener('storyspacegotstories', function() {
        makeMarkers(stories.stories);
        showStories(stories.stories, shownCategories);
    });

    document.addEventListener('storyspacenewstory', function(event) {
        makeMarkers([event.detail]);
        showStories(stories.stories, shownCategories);
    });

    //share overlay process form
    $('#share-overlay form#share-form input[type="submit"]').click(function (e) {
        //prevents page from refreshing when story is submitted
        e.preventDefault();

        //error detection
        if (!document.share.category.value || !document.share.title.value || !document.share.content.value) {
            alert("You haven't finished your story!");
        } else {
            //closes share overlay
            $('section#share-overlay').css('visibility', 'hidden');
            $('section#instruction-bar h2#shared').fadeIn(2000);
            $('section#instruction-bar h2#shared').delay(7000);
            $('section#instruction-bar h2#shared').fadeOut(2000);

            stories.post(new FormData(document.forms.share), 'storyspacenewstory');

            //resets share story form
            document.share.reset();
        };
    });

    //define function that shows stories based on what is selected in top-nav


    // toggling of categories
    $('nav#top-nav ul li.universe a:not(#all)').click(function () {
        category = $(this).attr('id');

        if ((i = shownCategories.indexOf(category)) == -1) {
            shownCategories.push(category);
            $(this).addClass('shown');
        } else {
            shownCategories.splice(i, 1);
            $(this).removeClass('shown');
        }

        showStories(stories.stories, shownCategories);
    });

    //show all button
    $('nav#top-nav ul li.universe a#all').click(function () {
        $('nav#top-nav ul li.universe a:not(#all)').addClass('shown');
        shownCategories = allCategories.slice(0);
        showStories(stories.stories, shownCategories);
    });
};
