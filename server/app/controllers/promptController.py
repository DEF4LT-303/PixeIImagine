from app.models.Prompt import PromptModel
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.User import UserModel

def get_prompts():
    prompts = PromptModel.get_prompts()

    return jsonify(prompts)

def get_prompt(_id):
    prompt = PromptModel.get_prompt(_id)

    if prompt:
        return jsonify(prompt)
    else:
        return jsonify({'error': 'Prompt not found'}), 404

@jwt_required()    
def create_prompt():
    if request.method == 'POST':
        data = request.get_json()  
        prompt = data.get('prompt')
        image = data.get('image')
        author = UserModel.get_user((get_jwt_identity()['user_id']))
        
        prompt_id = PromptModel.create_prompt(prompt, author, image)
        UserModel.update_user(author['_id'], prompts=author['prompts'] + [PromptModel.get_prompt(prompt_id)])

        return jsonify(PromptModel.get_prompt(prompt_id)), 200
    
    return jsonify({'error': 'Invalid request method'}), 405

def delete_prompt(_id):
    if request.method == 'DELETE':
        prompt = PromptModel.get_prompt(_id)

        if not prompt:
            return jsonify({'error': 'Prompt not found'}), 404
        
        PromptModel.delete_prompt(_id)
        UserModel.update_user(prompt['author']['_id'], prompts=[prompt for prompt in UserModel.get_user(prompt['author']['_id'])['prompts'] if prompt['_id'] != _id])
        return jsonify({'success': True})

    return jsonify({'error': 'Invalid request method'}), 405


def get_prompts_by_user_id(user_id):
    prompts = PromptModel.get_prompts_by_user_id(user_id)
    return jsonify(prompts)
