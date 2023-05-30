from pymongo import MongoClient
import certifi

ca = certifi.where()

# Connect to MongoDB
client = MongoClient("mongodb+srv://DBUser:WWcos301@wordwizardcluster.dx1d9ft.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=ca)

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
