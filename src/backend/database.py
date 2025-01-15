from pymongo import MongoClient
import os

def get_database_connection():
    mongodb_uri = os.environ.get('MONGODB_URI')
    if not mongodb_uri:
        raise ValueError("A variável de ambiente 'MONGODB_URI' não está definida")
    client = MongoClient(mongodb_uri)
    return client.spectroscopy
