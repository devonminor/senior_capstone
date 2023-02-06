from fastapi import FastAPI

from markupsafe import escape

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie

from models import Course, Lecture, Question

from utils import random_id

app = FastAPI()

# add a new course
@app.post("/courses")
async def add_course(name: str, description: str, active: bool = False, hasActiveLecture: bool = False):
    numId = await random_id()

    new_course = Course(name=escape(name),
        numId=numId,
        description=escape(description),
        active=active,
        hasActiveLecture=hasActiveLecture)
        
    await new_course.insert()
    return new_course

# get a course
@app.get("/courses/{id}")
async def get_course(id: int):
    course = await Course.find_one(Course.numId == id)
    return course

# start mongodb (beanie) connection on startup
@app.on_event("startup")
async def app_init():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    app.db = client.PollAnywhere
    await init_beanie(database=app.db, document_models=[Course, Lecture, Question])
    