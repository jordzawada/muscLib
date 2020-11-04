from flask import Flask, jsonify, request, render_template, make_response, send_file, redirect
from flask_cors import CORS
import json
# from flask_pymongo import PyMongo
from pymongo import MongoClient


application = Flask(__name__)
CORS(application, supports_credentials=True)
client = MongoClient('mongodb+srv://jordanzawada:1Gasbulb@cluster0.5hn6n.mongodb.net/<dbname>?retryWrites=true&w=majority')
db = client.music_lib
collection = db.test


@application.route('/')
def home():
    # db = client.music_lib
    # collection = db.test
    # print(db)
    # print(collection)
    print(db.list_collection_names())
    # print(collection.find_one())
    return 'music lib home'



# GET songs
#Update a song (various updates required)
#delete a song


# @application.route('/adduser',methods = ['POST'])
# def addUser():
@application.route('/songs',methods = ['GET','POST'])
def songs():
    if request.method=='GET':
        try:
            cursor=collection.find({})
            songsArr=[]
            for document in cursor:
                document['_id']=str(document['_id'])
                # print(str(document['_id']))
                songsArr.append(document)
                # print(type(document['_id']))
            return {"message": "success",
                    "songs":songsArr,
                    },200 
        except:
                return {"message": "An error occurred while getting songs"},400

if __name__ == '__main__':
    application.run(port=5000,debug=True)
    # application.run(host= '10.0.0.25',debug=True)