from app.controllers.promptController import get_prompts, get_prompt, create_prompt, delete_prompt, get_prompts_by_user_id
from flask import Blueprint
from app.middleware.verification import verify_token, verify_admin, verify_author
from flask_jwt_extended import jwt_required

prompt_blueprint = Blueprint('prompts', __name__)

prompt_blueprint.route('/', methods=['GET'])(get_prompts)
prompt_blueprint.route('/<_id>', methods=['GET'])(get_prompt)
prompt_blueprint.route('/user/<user_id>', methods=['GET'])(get_prompts_by_user_id)
prompt_blueprint.route('/', methods=['POST'])(jwt_required()(create_prompt))
prompt_blueprint.route('/<_id>', methods=['DELETE'])(jwt_required()(delete_prompt))