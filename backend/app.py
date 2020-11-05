from flask import Flask, jsonify, request, render_template, make_response, send_file, redirect
from flask_cors import CORS
import json
# from flask_pymongo import PyMongo
from pymongo import MongoClient
from bson import ObjectId
from config import address


application = Flask(__name__)
CORS(application, supports_credentials=True)
client = MongoClient(address)
db = client.music_lib
collection = db.test


@application.route('/')
def home():
    print(db.list_collection_names())
    return 'music lib home'
#Update a song (various updates required)
#delete a song
@application.route('/songs',methods = ['GET','POST','PUT'])
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
            print(content)
            song={f"name":content['name'],"userRating":content['rating'],"genres":content['genres']}
            collection.insert_one(song)
            return {"message": "successfully added song",
                    "status":200
            },200 
        except:
                return {"message": "An error occurred while adding new song"},400
    if request.method=='PUT':
        try:
            content = request.get_json()
            print(content)
            name=content['data']['name']
            rating=content['data']['rating']
            genres=content['data']['genres']
            objID=ObjectId(content['_id'])
            collection.update_one({"_id":{"$eq": objID}},{"$set": { "name":name,"userRating":rating,"genres": genres }})
            
            return {"message": "successfully updated song"},200 
        except:
                return {"message": "An error occurred while adding genre to song"},400
if __name__ == '__main__':
    application.run(port=5000,debug=True)
    # application.run(host= '10.0.0.25',debug=True)
