#!/usr/bin/env python
# coding: utf-8

# In[1]:


from pymongo import MongoClient
from bson.objectid import ObjectId
from pprint import pprint

class AnimalShelter(object):
    """ CRUD operations for Animal collection in MongoDB """
    
    def __init__(self, user, password):
        # Initializing the MongoClient.
        # Setting up use in AAC db, animals collection, and aacuser account
        
        USER = user
        PASS = password
        HOST = 'nv-desktop-services.apporto.com'
        PORT = 32574
        DB = 'AAC'
        COL = 'animals'
        
        # Initialize connection
        
        self.client = MongoClient('mongodb://%s:%s@%s:%d' % (USER,PASS,HOST,PORT))
        self.database = self.client['%s' % (DB)]
        self.collection = self.database['%s' % (COL)]
        
    
    # Create function takes in data in dictionairy format and adds it to specified collection    
    def create(self, data):
        # First we make sure that the data isn't None
        if data is not None:
            # Here we call the insdert one function passing the data
            if self.database.animals.insert_one(data): 
                # if it succeeds we return true
                return True
            else:
                # If it fails we return false
                return False
        # If the data is None then we throw an exception
        else:
            raise Exception("Nothing to save because data parameter is empty")
            print(Exception)
    
    # Read function takes in a key in string format and a value then prints out all documents in a collection with
    # that key and value pair
    def read(self, data):
        # Result of search is saved in a list format
        result = list(self.database.animals.find(data))
        # Then it is printed out
        return result
    # Update function takes in a key and value pair to find the document
    # and another key and value pair to be updated or added
    def update(self, key, value, newKey, newValue):
        # The result is saved
        result = self.database.animals.update_many({key:value}, {"$set": {newKey:newValue}})
        # Then we print out the modcified count
        print(result.modified_count, ' documents updated.')
    
    # Delete function takes in a key and value pair to find all documents and then deletes them
    def delete(self, key, value):
        # Result of the delete many call is saved
        result = self.database.animals.delete_many({key:value})
        # Then we print out the deleted count
        print(result.deleted_count, ' documents deleted.')


# In[1]:


from PYCRUD import AnimalShelter
from pprint import pprint
testShelter = AnimalShelter('aacuser','SNHU1234')
readData = {'animal_type':'Dog','name':'Lucy'}
testShelter.read(readData)


# In[ ]:




