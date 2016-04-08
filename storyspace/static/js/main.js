$(document).ready(function () {

    //share overlay process form
    $('#share-overlay form#share-form input[type="submit"]').click(function (e) {
        //define a story object
        story = {
            title: document.share.title.value,
            name: document.share.name.value,
            body: document.share.body.value,
            latitude: latitude,
            longitude: longitude,
            category: document.share.universe.value,
            image: document.share.fileToUpload.value,
        };

        //prevents page from refreshing when story is submitted
        e.preventDefault();

        //error detection
        if (story.category == "" || story.title == "" || story.body == "") {
            alert("You haven't finished your story!");
        } else {
            //resets share story form
            document.share.reset();

            //closes share overlay
            $('section#share-overlay').css('visibility', 'hidden');
            $('section#instruction-bar h2#shared').fadeIn(2000);
            $('section#instruction-bar h2#shared').delay(7000);
            $('section#instruction-bar h2#shared').fadeOut(2000);
        };

        //create a marker based on author's location
        story.marker = L.marker([story.latitude, story.longitude], {
            icon: icons[story.category]
        }).bindPopup('<strong>' + story.title + '</strong>' + '<br>' + story.body + '<br><em>' + story.name + '</em>' + story.image).
        addTo(mymap);

        //push story object onto "stories" database so that it can be toggled through top-nav
        stories.push(story);
    });

    //hard coded sample stories
    var stories = [
        {
            title: 'Race Story',
            body: "This is a story about race... ",
            latitude: 38.534,
            longitude: -121.7591,
            category: 'race',
            marker: L.marker([38.534, -121.7591], {
                icon: icons['race']
            }).bindPopup("<strong>Not all Asians eat dog.</strong><br>In high school, my friends and I were walking to our lockers. We were two Asian girls. As we were walking we overheard these two guys who were following us loudly exclaim how we like to eat dog. Just becasue I'm Asian doesn't mean I eat dog. I never have and never will.<br> <em> AznGurlXoXo </em>").addTo(mymap),
      },
        {
            title: 'Race Story',
            body: "This is a story about race... ",
            latitude: 38.54,
            longitude: -121.75,
            category: 'race',
            marker: L.marker([38.550, -121.7389], {
                icon: icons['race']
            }).bindPopup("<strong>Racial Profiling</strong><br>I was stopped by a police officer while I was walking to campus. I asked: What is the problem? The officer responded: We are looking for a robbery suspect. I considered that strange since I was carrying a lot of books under my arm – and in my backpack. I was held up for a little while then let go, but I learned that the police do not make distinctions of education, occupation, class or social status when they deal with African American men.<br> <em> Ronaldo </em>").addTo(mymap),
      },

        {
            title: 'Gender Story',
            body: "This is a story about gender...",
            latitude: 38.546,
            longitude: -121.7555,
            category: 'gender',
            marker: L.marker([38.546, -121.7555], {
                icon: icons['gender']
            }).bindPopup("<strong>Because you're a girl</strong><br>Ever since I was little, I always had to wash the dishes. If I didn’t, then I would be grounded. I have three brothers who did nothing after dinner, so when I was 14 I asked my dad why I always had to wash the dishes. His only answer was, “Because you’re a girl.” I was pissed off and we got into a fight because he never made my brothers do anything around the house. My brothers and parents expect me to have a bunch of kids and become a housewife, but ever since that day I decided to start doing things for myself and myself only. <br> <em> Feminist </em>").addTo(mymap),
      },
        {
            title: 'Gender Story',
            body: "This is a story about gender...",
            latitude: 38.555,
            longitude: -121.766,
            category: 'gender',
            marker: L.marker([38.555, -121.766], {
                icon: icons['gender']
            }).bindPopup("<strong>I have a boyfriend...</strong><br>I was at a party and the only way I could get this one guy to leave me alone was to lie and say I was in a relationship. I realized that he only valued me as another guy’s property and not as a human being who deserves respect. <br> <em> SingleFeminist </em>").addTo(mymap),
      },
        {
            title: 'Sexuality Story',
            body: "This is a story about sexuality...",
            latitude: 38.537,
            longitude: -121.732,
            category: 'sexuality',
            marker: L.marker([38.537, -121.732], {
                icon: icons['sexuality']
            }).bindPopup("<strong>Parents don't accept me</strong><br>When I was in college, I started dating my roommate, who was also a girl. I never considered myself to be gay or even bisexual, so it was very different for me. I come from a very conservative, religious family, so I was constantly in denial of my feelings. My girlfriend was very patient. When I finally told my mom about our relationship, she helped me through it. Obviously, there was a lot of backlash, and my parents all but disowned me. I felt like I was the butt of every joke. I had always been the golden child with straight A’s, and suddenly I was the black sheep of my family just because of who I was dating. I couldn’t understand how my parents could suddenly stop loving me. <br> <em> LonelyGirl </em>").addTo(mymap),
      },
        {
            title: 'Sexuality Story',
            body: "This is a story about sexuality...",
            latitude: 38.547,
            longitude: -121.732,
            category: 'sexuality',
            marker: L.marker([38.547, -121.732], {
                icon: icons['sexuality']
            }).bindPopup("<strong>High School struggles bring trans</strong><br>Being trans in high school has to be one of the toughest things because on top of academic responsibility, your social life needs to be looked over. I believe this goes for everyone. But it’s exceptionally hard to deal with when people can’t just accept you for who you are. According to society, abnormal just isn’t right, and though I don’t do anything to purposefully make anyone upset with me, I am still dealing with a lot of harassment. My other trans friends say that’s why they didn’t come out in high school. <br> <em> Anonymous </em>").addTo(mymap),
      },
        {
            title: 'Social Class Story',
            body: "This is a story about social class.",
            latitude: 38.543,
            longitude: -121.720,
            category: 'class',
            marker: L.marker([38.543, -121.720], {
                icon: icons['class']
            }).bindPopup("<strong>Just trying to survive</strong><br>I’m just trying to survive. I don’t have any money in the bank. I pick up whatever minimum wage jobs that I can, mainly fast food. At the job program, they tell us that we should never tell an interviewer: ‘I need a job.’ Instead we’re supposed to say: ‘I like customer service.’ That’s true for me though. I do feel good when I'm providing customer service. It helps me not worry about all the other stuff in my life. <br> <em> Charles </em>").addTo(mymap),
      },
        {
            title: 'Social Class Story',
            body: "This is a story about social class.",
            latitude: 38.539,
            longitude: -121.748,
            category: 'class',
            marker: L.marker([38.539, -121.748], {
                icon: icons['class']
            }).bindPopup("<strong>Need for change</strong><br>Throughout human history, most people live and die in the social class into which they were born. If they were born poor, chances are they will die poor. One way societies can help people rise in social class is to initiate new enterprises, like improved educational opportunities or technological advancements. When this happens, the need for workers in higher-class jobs motivates and enables people to move up in social class, which can help them to escape poverty. <br> <em> Activist Gal </em>").addTo(mymap),
      }
    ];

    var allCategories = ['race', 'gender', 'sexuality', 'class'];
    var shownCategories = allCategories.slice(0);


    //define function that shows stories based on what is selected in top-nav
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
    }

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

        showStories(stories, shownCategories);
    });


    //show all button
    $('nav#top-nav ul li.universe a#all').click(function () {
        $('nav#top-nav ul li.universe a:not(#all)').addClass('shown');
        shownCategories = allCategories.slice(0);
        showStories(stories, shownCategories);
    });

}); //end
