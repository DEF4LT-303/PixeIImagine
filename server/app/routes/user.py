from app import app
from app.controllers.user import get_users, get_user, register_user, login_user, get_user_by_email, update_user, delete_user
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from functools import wraps

def verify_token(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            jwt = get_jwt_identity()

            if jwt['user_id'] != kwargs['_id'] and not jwt.get("isAdmin", False):
                return jsonify({'error': 'Unauthorized'}), 403

            return func(*args, **kwargs)
        except Exception as e:
            return jsonify({'error': 'Invalid token'}), 401

    return wrapper

def verify_admin(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            jwt = get_jwt_identity()

            if not jwt.get("isAdmin", False):
                return jsonify({'error': 'Unauthorized'}), 403

            return func(*args, **kwargs)
        except Exception as e:
            return jsonify({'error': 'Invalid token'}), 401

    return wrapper

user_blueprint = Blueprint('users', __name__)

user_blueprint.route('/', methods=['GET'])(get_users)
user_blueprint.route('/user/<_id>', methods=['GET'])(jwt_required()(get_user))
user_blueprint.route('/user/email/<email>', methods=['GET'])(get_user_by_email)
user_blueprint.route('/user/<_id>', methods=['PUT'])(jwt_required()(verify_token(update_user)))
user_blueprint.route('/user/<_id>', methods=['DELETE'])(jwt_required()(verify_token(delete_user)))

user_blueprint.route('/register', methods=['POST'])(register_user)
user_blueprint.route('/login', methods=['POST'])(login_user)