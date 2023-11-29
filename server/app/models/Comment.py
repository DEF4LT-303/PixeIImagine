from app import mongo
from bson import ObjectId
from datetime import datetime

class CommentModel:
  @staticmethod
  def get_comment(_id):
    comment = mongo.db.comments.find_one({'_id': ObjectId(_id)})
    
    if comment:
      return {key: str(value) if key == '_id' else value for key, value in comment.items()}
    
    else:
      return None

  @staticmethod
  def get_post_comments(post_id):
    comments = mongo.db.comments.find({'post_id': post_id})
    
    return [{key: str(value) if key == '_id' else value for key, value in comment.items()} for comment in comments]
  
  @staticmethod
  def create_comment(post_id, author, content):
    current_time = datetime.now()

    comment = {
      'post_id': post_id,
      'author': author,
      'content': content,
      'createdAt': current_time
    }

    comment_id = mongo.db.comments.insert_one(comment).inserted_id

    return str(comment_id)
  
  @staticmethod
  def update_comment(_id, content=None):
    update_data = {}
    if content is not None:
      update_data['content'] = content

    mongo.db.comments.update_one({'_id': ObjectId(_id)}, {'$set': update_data})

  @staticmethod
  def delete_comment(_id):
    mongo.db.comments.delete_one({'_id': ObjectId(_id)})