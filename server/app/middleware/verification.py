from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from functools import wraps
from app.models.Post import PostModel

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

def verify_author(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            jwt = get_jwt_identity()

            post_id = kwargs['_id']
            post = PostModel.get_post(post_id)

            if not post:
                return jsonify({'error': 'Post not found'}), 404

            post_author_id = post.get('author', {}).get('_id')

            if jwt['user_id'] != post_author_id and not jwt.get("isAdmin", False):
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
