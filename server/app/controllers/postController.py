from app.models.Post import PostModel
from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from app.models.User import UserModel

def get_posts():
    posts = PostModel.get_posts()

    return jsonify(posts)

def get_post(_id):
    post = PostModel.get_post(_id)

    if post:
        return jsonify(post)
    else:
        return jsonify({'error': 'Post not found'}), 404

@jwt_required()    
def create_post():
    if request.method == 'POST':
        data = request.get_json()  
        title = data.get('title')
        description = data.get('description')
        prompt = data.get('prompt')
        tags = data.get('tags')
        image = data.get('image')
        author = UserModel.get_user((get_jwt_identity()['user_id']))

        post_id = PostModel.create_post(title, description, prompt, tags, author, image)
        UserModel.update_user(author['_id'], posts=author['posts'] + [post_id])

        return jsonify(PostModel.get_post(post_id)), 200
    
    return jsonify({'error': 'Invalid request method'}), 405

def update_post(_id):
    if request.method == 'PUT':
        data = request.get_json()
        title = data.get('title')
        description = data.get('description')
        prompt = data.get('prompt')
        tags = data.get('tags')
        image = data.get('image')
        likes = data.get('likes')

        if PostModel.update_post(_id, title, description, prompt, image, tags, likes):
            # UserModel.update_user(PostModel.get_post(_id)['author']['_id'], posts=[post for post in UserModel.get_user(PostModel.get_post(_id)['author']['_id'])['posts'] if post['_id'] != _id] + [PostModel.get_post(_id)])
            return jsonify(PostModel.get_post(_id)), 200
        else:
            return jsonify({'error': 'Post not found'}), 404

    return jsonify({'error': 'Invalid request method'}), 405

def delete_post(_id):
    if request.method == 'DELETE':
        post = PostModel.get_post(_id)

        if not post:
            return jsonify({'error': 'Post not found'}), 404
        
        user_posts = UserModel.get_user(post['author']['_id'])['posts']
        if user_posts:
            user_posts.remove(post['_id'])
        
        PostModel.delete_post(_id)
        UserModel.update_user(post['author']['_id'], posts=user_posts)
        return jsonify({'success': True})

    return jsonify({'error': 'Invalid request method'}), 405

