from enum import Enum

from storyspace import app
from storyspace.db import db



class Category(Enum):
    race            = 1
    gender          = 2
    sexuality       = 3
    social_class    = 4

    def text(self):
        return ({
            'race':         'Race',
            'gender':       'Gender',
            'sexuality':    'Sexuality',
            'social_class': 'Social Class',
        }).get(self.name, self.name)

CATEGORIES      = [(category.name, category.text()) for category in Category]
TITLE_MAX_LEN   = 256
AUTHOR_MAX_LEN  = 64
CONTENT_MAX_LEN = 256 * 10

class Story(db.Model):
    id          = db.Column(db.Integer, primary_key=True)

    category    = db.Column(db.Integer)
    latitude    = db.Column(db.Float)
    longitude   = db.Column(db.Float)

    title       = db.Column(db.String(256))
    author      = db.Column(db.String(64))

    content     = db.Column(db.Text)
    image_name  = db.Column(db.String(256))

    def dict_repr(self):
        return {
            'category':         Category(self.category).name,
            'category_text':    Category(self.category).text(),
            'latitude':         self.latitude,
            'longitude':        self.longitude,
            'title':            self.title,
            'author':           self.author if self.author else None,
            'content':          self.content,
            'image_url':        app.config['IMAGE_UPLOAD_URL'] + '/' + self.image_name if self.image_name else None,
        }
