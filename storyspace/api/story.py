from flask.views import MethodView
from flask import request
from werkzeug import secure_filename
import os
import json
import binascii

from storyspace import app
from storyspace.api.forms import StoryForm
from storyspace.db import db
from storyspace.db.models import Story, Category



class StoryAPI(MethodView):
    def post(self):
        form = StoryForm()

        if form.validate_on_submit():
            filename = None

            if form.image.data:
                filename = binascii.b2a_hex(os.urandom(6)) + '_' + secure_filename(form.image.data.filename)
                form.image.data.save(os.path.join(app.config['IMAGE_UPLOAD_PATH'], filename))

            story = Story(
                category    = Category[form.category.data].value,
                latitude    = form.latitude.data,
                longitude   = form.longitude.data,
                title       = form.title.data,
                author      = form.author.data,
                content     = form.content.data,
                image_name  = filename,
            )

            db.session.add(story)
            db.session.commit()

            return '', 204

        return json.dumps(form.errors), 400
