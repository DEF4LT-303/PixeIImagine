from app.controllers.commentController import get_post_comments, create_comment, update_comment, delete_comment
from flask import Blueprint
from app.middleware.verification import verify_token, verify_admin, verify_author
from flask_jwt_extended import jwt_required

comment_blueprint = Blueprint('comments', __name__)

comment_blueprint.route('/<post_id>', methods=['GET'])(get_post_comments)
comment_blueprint.route('/<post_id>', methods=['POST'])(jwt_required()(create_comment))
comment_blueprint.route('/<_id>', methods=['PUT'])(jwt_required()(update_comment))
comment_blueprint.route('/<_id>', methods=['DELETE'])(jwt_required()(delete_comment))