from app import app
from app.controllers.user import get_users, get_user, register_user, login_user
from flask import Blueprint

user_blueprint = Blueprint('users', __name__)

user_blueprint.route('/', methods=['GET'])(get_users)
user_blueprint.route('/user/<_id>', methods=['GET'])(get_user)

user_blueprint.route('/register', methods=['POST'])(register_user)
user_blueprint.route('/login', methods=['POST'])(login_user)