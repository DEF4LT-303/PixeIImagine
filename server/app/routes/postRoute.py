from app.controllers.postController import get_posts, get_post, create_post, update_post, delete_post
from flask import Blueprint
from app.middleware.verification import verify_token, verify_admin, verify_author
from flask_jwt_extended import jwt_required

post_blueprint = Blueprint('posts', __name__)

post_blueprint.route('/', methods=['GET'])(get_posts)
post_blueprint.route('/<_id>', methods=['GET'])(get_post)
post_blueprint.route('/create', methods=['POST'])(jwt_required()(create_post))
post_blueprint.route('/<_id>', methods=['PUT'])(jwt_required()(update_post))
post_blueprint.route('/<_id>', methods=['DELETE'])(jwt_required()(verify_author(delete_post)))