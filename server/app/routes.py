from app import app
from app.controllers import get_users, get_user


@app.route('/')
def index():
    return 'Hello, World!'


@app.route('/users', methods=['GET'])
def users():
    return get_users()

@app.route('/users/<_id>', methods=['GET'])
def user(_id):
    return get_user(_id)


# @app.route('/add_task/<task_name>')
# def add_task_route(task_name):
#     return add_task(task_name)
