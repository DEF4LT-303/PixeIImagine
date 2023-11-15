# File: app/__init__.py

from flask import Flask
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config.from_pyfile('../config.py')

mongo = PyMongo(app)

from app import routes, models, controllers
