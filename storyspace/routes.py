from storyspace import app, api, views



# Static files
app.add_url_rule(app.static_url_path + '/<path:filepath>', endpoint='static', view_func=views.StaticView.as_view('assets'))

# Uploads
app.add_url_rule('/uploads/images/<path:filename>', view_func=views.UploadsImagesView.as_view('uploads_images'))

# API routes

# Webpages
app.add_url_rule('/', view_func=views.IndexView.as_view('index'))
