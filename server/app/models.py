from app import mongo
from bson import ObjectId

class UserModel:
    @staticmethod
    def get_users():
        users = mongo.db.users.find()
        
        return [{key: str(value) if key == '_id' else value for key, value in user.items()} for user in users]

    @staticmethod
    def get_user(_id):
        user = mongo.db.users.find_one({'_id': ObjectId(_id)})
        
        if user:
          return {key: str(value) if key == '_id' else value for key, value in user.items()}
        
        else:
          return None
