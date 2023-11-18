from app.models.User import UserModel
from flask import jsonify, abort, request
from flask_jwt_extended import create_access_token, create_refresh_token

def get_users():
    users = UserModel.get_users()

    return jsonify(users)


def get_user(_id):
    user = UserModel.get_user(_id)

    if user:
        return jsonify(user)
    else:
        abort(404, description="User not found")

def get_user_by_email(email):
    user = UserModel.get_user_by_email(email)

    if user:
        return jsonify(user)
    else:
        abort(404, description="User not found")

def register_user():
    if request.method == 'POST':
        data = request.get_json()  
        email = data.get('email')
        password = data.get('password')
        firstName = data.get('firstName')
        lastName = data.get('lastName')

        if not email or not password or not firstName or not lastName:
            return jsonify({'error': 'Missing fields'}), 400

        existing_user = UserModel.get_user_by_email(email)
        if existing_user:
            return jsonify({'error': 'email already taken'}), 400

        user_id = UserModel.register_user(email, password, firstName, lastName)
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
            access_token = create_access_token(identity=user_id)
            refresh_token = create_refresh_token(identity=user_id)

            tokens_data = {'access_token': access_token, 'refresh_token': refresh_token}
            response_data = {'user': UserModel.get_user(user_id), 'tokens': tokens_data}
            
            return jsonify(response_data)

    return jsonify({'error': 'Invalid email or password'}), 401