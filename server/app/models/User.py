from app import mongo
from bson import ObjectId
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token

bcrypt = Bcrypt()

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
        
    @staticmethod
    def get_user_by_email(email):
        user = mongo.db.users.find_one({'email': email})
        
        if user:
          return {key: str(value) if key == '_id' else value for key, value in user.items()}
        
        else:
          return None

    @staticmethod   
    def get_user_by_email(email):
        user = mongo.db.users.find_one({'email': email})
        if user:
            return {key: str(value) if key == '_id' else value for key, value in user.items()}
        else:
            return None

    @staticmethod
    def register_user(email, password, first_name, last_name):
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        user_data = {'email': email, 'password': hashed_password, 'first_name': first_name, 'last_name': last_name}
        user_id = mongo.db.users.insert_one(user_data).inserted_id
        return str(user_id)

    @staticmethod
    def authenticate_user(email, password):
        user = mongo.db.users.find_one({'email': email})

        if user and bcrypt.check_password_hash(user['password'], password):
            return str(user['_id'])
        else:
            return None