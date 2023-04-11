from pymongo import MongoClient

client = MongoClient("mongodb+srv://phamtony1911:123@databasetest.090hg24.mongodb.net/?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true")
db = client["cryptospot"]

try:
    client.admin.command('ping')
    print("Database connection successful.")
except Exception as e:
    print("Error connecting to database:", e)
    client.close()