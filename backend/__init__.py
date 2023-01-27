from flask import Flask, jsonify

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie

from models import Course

app = Flask(__name__)

@app.route("/")
def hello_world():
    return jsonify("Hello World.")

# return a random 6 digit id that hasn't already been taken
async def random_id():
    random_int = random.randint(100000, 999999)
    while (await Course.find_one(Course.numId == random_int)):
        random_int = random.randint(100000, 999999)
    return random_int

# add a new course
@app.route("/courses", methods=["POST"])
async def add_course(name, description, active, hasActiveLecture):

    new_course = Course(name=name,
        numId=await random_id(),
        description=description,
        active=active,
        hasActiveLecture=hasActiveLecture)
    course = await new_course.insert()
    return jsonify(course)

# get a course
@app.route("/courses/<int:id>")
async def get_course(id):
    course = await Course.find_one(Course.numId == id)
    return jsonify(course)

# start the mongodb database
async def start_mongo():
    print("Starting MongoDB...")
    client = AsyncIOMotorClient("mongodb://localhost:27017/PollAnywhere")
    await init_beanie(database=client.PollAnywhere, document_models=[Course])

if __name__ == "__main__":
    print("Starting Flask...")
    asyncio.run(start_mongo())
    app.run()