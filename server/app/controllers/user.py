from app.models.User import UserModel
from flask import jsonify, abort, request
from flask_login import login_user

def get_users():
    users = UserModel.get_users()

    return jsonify(users)


def get_user(_id):
    user = UserModel.get_user(_id)

    if user:
        return jsonify(user)
    else:
        abort(404, description="User not found")

def register_user():
    if request.method == 'POST':
        data = request.get_json()  
        email = data.get('email')
        password = data.get('password')
        first_name = data.get('first_name')
        last_name = data.get('last_name')

        if not email or not password or not first_name or not last_name:
            return jsonify({'error': 'Missing fields'}), 400

        existing_user = UserModel.get_user_by_email(email)
        if existing_user:
            return jsonify({'error': 'email already taken'}), 400

        user_id = UserModel.register_user(email, password)
        return jsonify(UserModel.get_user(user_id))

    return jsonify({'error': 'Invalid request method'}), 405

def login_user():
    if request.method == 'POST':
        data = request.get_json()  
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'error': 'Missing email or password'}), 400

        user_id = UserModel.authenticate_user(email, password)

        if user_id:
            return jsonify(UserModel.get_user(user_id))

    return jsonify({'error': 'Invalid email or password'}), 401