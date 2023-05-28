from pymongo import MongoClient

client = MongoClient("mongodb+srv://Janro:<password>@wordwizardcluster.dx1d9ft.mongodb.net/?retryWrites=true&w=majority")
db = client["word-wizard"]
collections = db.list_collection_names()
for collection in collections:
    print(collection)