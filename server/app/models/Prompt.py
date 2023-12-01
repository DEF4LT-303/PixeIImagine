from app import mongo
from bson import ObjectId

class PromptModel:
  @staticmethod
  def get_prompt(_id):
    prompt = mongo.db.prompts.find_one({'_id': ObjectId(_id)})
    
    if prompt:
      return {key: str(value) if key == '_id' else value for key, value in prompt.items()}
    
    else:
      return None
    
  @staticmethod
  def get_prompts():
    prompts = mongo.db.prompts.find()
    
    return [{key: str(value) if key == '_id' else value for key, value in prompt.items()} for prompt in prompts]

  @staticmethod
  def create_prompt(prompt, author, image):
    prompt = {
      'prompt': prompt,
      'author': author,
      'image': image,
    }

    prompt_id = mongo.db.prompts.insert_one(prompt).inserted_id

    return str(prompt_id)
  
  @staticmethod
  def delete_prompt(_id):
    mongo.db.prompts.delete_one({'_id': ObjectId(_id)})
