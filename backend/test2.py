import pymongo

# Set up MongoDB connection
client = pymongo.MongoClient("mongodb+srv://phamtony1911:123@databasetest.090hg24.mongodb.net/?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true")
db = client.test

# Ping the cluster
try:
    client.admin.command('ping')
    print("Successfully connected to MongoDB cluster")
except Exception as e:
    print("Failed to connect to MongoDB cluster:", e)

