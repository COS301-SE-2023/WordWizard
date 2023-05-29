from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")

# Access the database
db = client["WordWizardDB"]  # Replace "your_database_name" with your actual database name

# Access the collection
collection = db["user"]  # Replace "user" with your actual collection name

# Fetch all documents from the collection
documents = collection.find()

# Print the documents
for document in documents:
    print(document)

# Close the connection
client.close()
