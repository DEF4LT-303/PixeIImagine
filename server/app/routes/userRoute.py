from app.controllers.userController import get_users, get_user, register_user, login_user, get_user_by_email, update_user, delete_user
from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.middleware.verification import verify_token, verify_admin


user_blueprint = Blueprint('users', __name__)

user_blueprint.route('/', methods=['GET'])(get_users)
user_blueprint.route('/user/<_id>', methods=['GET'])(jwt_required()(verify_admin(get_user)))
user_blueprint.route('/user/email/<email>', methods=['GET'])(get_user_by_email)
user_blueprint.route('/user/<_id>', methods=['PUT'])(jwt_required()(verify_token(update_user)))
user_blueprint.route('/user/<_id>', methods=['DELETE'])(jwt_required()(verify_token(delete_user)))

user_blueprint.route('/register', methods=['POST'])(register_user)
user_blueprint.route('/login', methods=['POST'])(login_user)