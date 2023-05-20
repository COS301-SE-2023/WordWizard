from fastapi import FastAPI

app = FastAPI()

inventory = {
    1: {
        "name": "Eggs",
        "price": 1.99,
        "brand": "Happy Eggs, Inc.",
    }
}

@app.get("/items/{item_id}")
def get_item(item_id: int):
    return inventory[item_id]

@app.get("/")
def home():
    return {"Hello": "World"}

@app.get("/about")
def about():
    return {"about": "this is about page"}