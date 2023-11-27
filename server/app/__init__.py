from flask import Flask, jsonify
from flask_pymongo import PyMongo
from config import Config
from flask_jwt_extended import JWTManager
import os
from flask_cors import CORS


app = Flask(__name__)
app.config.from_object(Config)
mongo = PyMongo(app)
CORS(app)

from app.routes.userRoute import user_blueprint
from app.routes.postRoute import post_blueprint

def initialize_jwt_manager(app):
    jwt = JWTManager(app)
    app.config['JWT_SECRET_KEY'] = os.getenv('FLASK_JWT_SECRET_KEY') or 'your-secret-key'
    return jwt

jwt = initialize_jwt_manager(app)

app.register_blueprint(user_blueprint, url_prefix='/users')
app.register_blueprint(post_blueprint, url_prefix='/posts')

# JWT error handlers

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({
        'status': 401,
        'sub_status': 42,
        'msg': 'The token has expired'
    }), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({
        'status': 401,
        'sub_status': 43,
        'msg': 'Invalid token'
    }), 401

@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({
        'status': 401,
        'sub_status': 44,
        'msg': 'Missing token'
    }), 401

from app import routes, models, controllers
