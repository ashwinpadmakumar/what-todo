from motor import motor_asyncio
from model import Todo

client = motor_asyncio.AsyncIOMotorClient('mongodb://root:password@localhost:27017/')
database = client.TodoList
collection = database.todo


async def fetch_one_todo(title):
    document = await collection.find_one({"title": title})
    return document


async def fetch_all_todos():
    todos = []
    documents = collection.find({})
    async for document in documents:
        todos.append(Todo(**document))
    return todos


async def create_todo(todo):
    document = todo
    result = await collection.insert_one(document)
    return document


async def update_todo(title, desc):
    await collection.update_one(
        {"title": title},
        {"description": desc}
    )
    document = await collection.find_one({"title": title})
    return document


async def remove_todo(title):
    await collection.delete_one({"title": title})
    return True
