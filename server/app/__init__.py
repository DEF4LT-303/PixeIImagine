# File: app/__init__.py

from flask import Flask
from flask_pymongo import PyMongo
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

mongo = PyMongo(app)

from app.routes.user import user_blueprint

app.register_blueprint(user_blueprint, url_prefix='/users')

from app import routes, models, controllers
