from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from api.HelloApiHandler import HelloApiHandler
from api.evDataApiHandler import evDataApiHandler

app = Flask(__name__, static_url_path='', static_folder='frontend/build1')
CORS(app) #comment this on deployment
api = Api(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index1.html')

api.add_resource(HelloApiHandler, '/flask/hello')
api.add_resource(evDataApiHandler, '/flask/ev-data')