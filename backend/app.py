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
    print(db.list_collection_names())
    return 'music lib home'
#Update a song (various updates required)
#delete a song
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
    if request.method=='POST':
        try:
            content = request.get_json()
            
            song={f"name":content['name'],"userRating":0,"genres":[]}
            print(song)
            collection.insert_one(song)
            return {"message": "successfully added song"},200 
        except:
                return {"message": "An error occurred while adding new song"},400

if __name__ == '__main__':
    application.run(port=5000,debug=True)
    # application.run(host= '10.0.0.25',debug=True)