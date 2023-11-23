from app import mongo
from bson import ObjectId
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token

bcrypt = Bcrypt()

class UserModel:
    @staticmethod
    def get_users():
        users = mongo.db.user.find()
        
        return [{key: str(value) if key == '_id' else value for key, value in user.items()} for user in users]

    @staticmethod
    def get_user(_id):
        user = mongo.db.user.find_one({'_id': ObjectId(_id)})
        
        if user:
          return {key: str(value) if key == '_id' else value for key, value in user.items()}
        
        else:
          return None
        
    @staticmethod
    def get_user_by_email(email):
        user = mongo.db.user.find_one({'email': email})
        
        if user:
          return {key: str(value) if key == '_id' else value for key, value in user.items()}
        
        else:
          return None

    @staticmethod   
    def get_user_by_email(email):
        user = mongo.db.user.find_one({'email': email})
        if user:
            return {key: str(value) if key == '_id' else value for key, value in user.items()}
        else:
            return None
        
    @staticmethod
    def update_user(_id, email=None, password=None, firstName=None, lastName=None):
      update_data = {}
      if email is not None:
          existing_user = UserModel.get_user_by_email(email)
          if existing_user and existing_user['_id'] != _id:
              raise ValueError('Email already taken')
          update_data['email'] = email

      if password is not None:
          update_data['password'] = password

      if firstName is not None:
          update_data['firstName'] = firstName

      if lastName is not None:
          update_data['lastName'] = lastName

      if update_data:
          mongo.db.user.update_one({'_id': ObjectId(_id)}, {'$set': update_data})

    @staticmethod
    def delete_user(_id):
        mongo.db.user.delete_one({'_id': ObjectId(_id)})

    @staticmethod
    def register_user(email, password, firstName, lastName):
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
        user_data = {
            'email': email,
            'password': hashed_password,
            'firstName': firstName,
            'lastName': lastName,
            'isAdmin': False,
            'avatar': '',
            'posts': []
        }

        user_id = mongo.db.user.insert_one(user_data).inserted_id
        return str(user_id)

    @staticmethod
    def authenticate_user(email, password):
        user = mongo.db.user.find_one({'email': email})

        if user and bcrypt.check_password_hash(user['password'], password):
            return user
        else:
            return None