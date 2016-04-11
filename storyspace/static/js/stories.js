storyspaceStories = (function(){
    storyspaceStories = function(options) {
        this.endpoint = options.endpoint;
        this.csrftoken = options.csrftoken;
        this.stories = [];
    };

    storyspaceStories.prototype.get = function(eventname) {
        $.get(this.endpoint, $.proxy(function(data) {
            this.stories = data.stories;

            gotStoriesEvent = new CustomEvent(eventname);
            document.dispatchEvent(gotStoriesEvent);
        }, this), 'json');
    };

    storyspaceStories.prototype.post = function(formdata, eventname) {
        var self = this;
        var req = new XMLHttpRequest();
        req.open('POST', this.endpoint, true);
        req.responseType = 'json';

        req.onload = function(e) {
            if (req.status == 200) {
                newStoryEvent = new CustomEvent(eventname, {'detail': req.response.story});
                document.dispatchEvent(newStoryEvent);
            } else {
                console.log("Story POST failed");
                console.log(req.response);
            }
        };

        req.setRequestHeader('X-CSRFToken', this.csrftoken);
        req.send(formdata);
    };

    return storyspaceStories;
})();
