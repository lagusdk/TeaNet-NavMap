from fastapi import FastAPI
from typing import Union
from db import conn

app = FastAPI()

conn.create_tables()

@app.get("/")
def root():
    return {"hello root"}

@app.get("/world")
def world():
    return {"hello world"}

@app.get("/table/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}