from app import mongo
from bson import ObjectId
from datetime import datetime

class PostModel:
  @staticmethod
  def get_posts():
    posts = mongo.db.posts.find()
    
    return [{key: str(value) if key == '_id' else value for key, value in post.items()} for post in posts]
  
  @staticmethod
  def get_post(_id):
    post = mongo.db.posts.find_one({'_id': ObjectId(_id)})
    
    if post:
      return {key: str(value) if key == '_id' else value for key, value in post.items()}
    
    else:
      return None
    
  @staticmethod
  def create_post(title, description, prompt, tags, author, createdAt):
    current_time = datetime.now()

    post = {
      'title': title,
      'description': description,
      'prompt': prompt,
      'tags': tags,
      'author': author,
      'createdAt': current_time
    }

    post_id = mongo.db.posts.insert_one(post).inserted_id

    return str(post_id)
  
  @staticmethod
  def update_post(_id, title=None, description=None, prompt=None, tags=None):
    update_data = {}
    if title is not None:
      update_data['title'] = title

    if description is not None:
      update_data['description'] = description

    if prompt is not None:
      update_data['prompt'] = prompt

    if tags is not None:
      update_data['tags'] = tags

    if update_data:
      mongo.db.posts.update_one({'_id': ObjectId(_id)}, {'$set': update_data})
      return True

    else:
      return False
    
  @staticmethod
  def delete_post(_id):
    mongo.db.posts.delete_one({'_id': ObjectId(_id)})
    