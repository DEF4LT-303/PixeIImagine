from app.models.Post import PostModel
from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from app.models.User import UserModel
from app.models.Comment import CommentModel

def get_post_comments(post_id):
    comments = CommentModel.get_post_comments(post_id)

    return jsonify(comments)

@jwt_required()
def create_comment(post_id):
    if request.method == 'POST':
        data = request.get_json()
        author = UserModel.get_user((get_jwt_identity()['user_id']))
        content = data.get('content')

        post = PostModel.get_post(post_id)

        if not post:
            return jsonify({'error': 'Post not found'}), 404
        
        comment_id = CommentModel.create_comment(post, author, content)
        update_post = PostModel.update_post(post_id, comments=post['comments'] + [CommentModel.get_comment(comment_id)])

        return jsonify(CommentModel.get_comment(comment_id)), 200

    return jsonify({'error': 'Invalid request method'}), 405

def update_comment(_id):
    if request.method == 'PUT':
        data = request.get_json()
        content = data.get('content')

        if CommentModel.update_comment(_id, content):
            return jsonify(CommentModel.get_comment(_id)), 200
        else:
            return jsonify({'error': 'Comment not found'}), 404

    return jsonify({'error': 'Invalid request method'}), 405

def delete_comment(_id):
    if request.method == 'DELETE':
        comment = CommentModel.get_comment(_id)

        if not comment:
            return jsonify({'error': 'Comment not found'}), 404

        post = comment.get('post_id')
        CommentModel.delete_comment(_id)

        if post:
            updated_comments = [c for c in post.get('comments', []) if c != _id]
            PostModel.update_post(post['_id'], comments=updated_comments)

        return jsonify({'message': 'Comment successfully deleted'}), 200

    return jsonify({'error': 'Invalid request method'}), 405