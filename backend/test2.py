import pymongo

# Set up MongoDB connection
client = pymongo.MongoClient("mongodb+srv://<username>:<password>@<cluster>.mongodb.net/test?retryWrites=true&w=majority")
db = client.test

# Ping the cluster
try:
    client.admin.command('ping')
    print("Successfully connected to MongoDB cluster")
except Exception as e:
    print("Failed to connect to MongoDB cluster:", e)

