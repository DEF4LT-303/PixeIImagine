from app.models import UserModel
from flask import jsonify, abort

def get_users():
    users = UserModel.get_users()

    return jsonify(users)


def get_user(_id):
    user = UserModel.get_user(_id)

    if user:
        return jsonify(user)
    else:
        abort(404, description="User not found")
