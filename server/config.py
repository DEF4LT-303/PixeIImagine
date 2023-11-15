# config.py

import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key'
    DEBUG = os.environ.get('DEBUG') == 'True'
    MONGO_URI = os.environ.get('MONGO_URI') or 'mongodb://localhost:27017/your-database'
