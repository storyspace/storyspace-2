# storyspace
Week 1

Prepare presentation for group studies. Create timeline of schedule for the quarter.

Week 2

This week, we fixed a small glitch with posting a story. Before, the message “Your story has been posted” would appear when the user closed out of the share your story form even if there was no story was submitted. 

We worked on the branding of Story Space by creating a simple logo. (We would love feedback on this!). Story Space was originally tied to the theme of different universes so the logo incorporates the idea of stories and space (in terms of intergalactic space - such as stars and universes) coming together. 

There is now an added option to upload an image with the story when posting a story. However, the image does not get posted with the story when it is submitted and we may need back end help to get images posted when submitted.

On the "share your story" overlay, we have added an additional method for users to exit the popup. Users are able to exit by a)submitting a story, b)clicking on the "x" button and (now) c)clicking outside of the overlay. This function uses the jQuery UI library to create a dialog box.

We also created Story Space into an organization on github so that we can now use github to properly collaborate and code this project together in a much simpler way than before. 

Week 3

After receiving feedback from students at our weekly class meeting, we decided to prioritize the "list view" function of our website. We began by researching and sketching formats to display non-location-based stories. In our brainstorm, we came across questions like "which view should users see first", "what are the preferences of returning users", "how will users toggle between the views", "how do we communicate that the list view functions similarly to the map view" and ultimately "how will users know what to do?!". After playing around with the idea of a "split-screen" interface and delayed animation, we decided on several things:
    1) users will receive the map view as a default view, and will be given the option to toggle    between the two views through a) horizontal scrolling and b) a toggle button
    2) users will be given a brief tutorial of how to navigate the website, with the option of exiting the tutorial through a direct "skip" button or by through independently navigating the website
    3) the list view will take on a multiple-column grid-like format that will be flexible to the length of each user's post
From there, we revisited our sketches, created a mockup of the interface and coded a template using the Masonry jQuery library. We are now in the process of researching libraries to implement a horizontal scrolling animation. 

In addition to beginning the work on the list view, we were able to begin work on the back end portion of Story Space (courtesy of our official back end developer for this project: Kelvin!). A new repository on github was created to merge the front end and back end, and a database was created to store our stories. 
