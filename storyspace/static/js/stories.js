storyspaceStories = (function(){
    storyspaceStories = function(options) {
        this.endpoint = options.endpoint;
        this.stories = [];
    };

    storyspaceStories.prototype.get = function(eventname) {
        $.get(this.endpoint, $.proxy(function(data) {
            this.stories = data.stories;

            gotStoriesEvent = new CustomEvent(eventname);
            document.dispatchEvent(gotStoriesEvent);
        }, this), 'json');
    };

    storyspaceStories.prototype.post = function(data, eventname) {
        $.post(this.endpoint, data, $.proxy(function(data) {
            story = data.story;

            this.stories.push(story);

            newStoryEvent = new CustomEvent(eventname, {'detail': story});
            document.dispatchEvent(newStoryEvent);
        }, this), 'json').fail(function(data) {
            console.log(data);
        });
    };

    return storyspaceStories;
})();
