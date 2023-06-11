# from pymongo import MongoClient
# import certifi
# import json

# ca = certifi.where()

# # Connect to MongoDB
# with open('config.json') as config_file:
#     config_data = json.load(config_file)

# connectionString = config_data["Database"]["connectionString"]
# print(connectionString)
# client = MongoClient(connectionString, tlsCAFile=ca)

# # Access the database
# db = client["WordWizardDB"]  # Replace "your_database_name" with your actual database name

# # Access the collection
# collection = db["user"]  # Replace "user" with your actual collection name

# # Fetch all documents from the collection
# documents = collection.find()

# # Print the documents
# for document in documents:
#     print(document)

# # Close the connection
# client.close()

import os
from pymongo import MongoClient
from dotenv import load_dotenv
load_dotenv()

# Access environment variable
connection_string = os.getenv("MONGODB_CONNECTION_STRING")
print(connection_string)

client = MongoClient(connection_string)


# Access the database
db = client["WordWizardDB"]  # Replace "your_database_name" with your actual database name

# Access the collection
collection = db["Parents"]  # Replace "user" with your actual collection name

# Fetch all documents from the collection
documents = collection.find()

# Print the documents
for document in documents:
    print(document)

# Close the connection
client.close()
