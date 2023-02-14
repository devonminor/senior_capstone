from beanie import DeleteRules, init_beanie
from db_utils import get_course_with_id, get_lecture_with_id
from fastapi import FastAPI
from markupsafe import escape
from models import (Course, DrawingQuestion, Lecture, MultipleChoiceQuestion,
                    Question, ShortAnswerQuestion)
from motor.motor_asyncio import AsyncIOMotorClient
from utils import get_todays_date, random_course_id, random_lecture_id

app = FastAPI()

##############################################################################
##############################################################################
###########################     (CRUD) COURSES     ###########################
##############################################################################
##############################################################################

# add a new course
@app.post("/courses/")
async def add_course(name: str, description: str, active: bool = False, hasActiveLecture: bool = False):
    numId = await random_course_id()

    new_course = Course(
        name=escape(name),
        numId=numId,
        description=escape(description),
        active=active,
        hasActiveLecture=hasActiveLecture
    )

    await new_course.insert()
    return new_course

# get all courses
# TODO: EITHER MAKE THIS ROUTE PROTECTED OR REMOVE IT
@app.get("/courses/")
async def get_courses():
    courses = await Course.find_all().to_list()
    return courses

# get a course
@app.get("/courses/{course_id}")
async def get_course(course_id: int):
    course = await get_course_with_id(course_id)

    if not course:
        return {'message': 'Course not found'}

    return course

# update a course
@app.put("/courses/{course_id}")
async def update_course(course_id: int, name: str, description: str, active: bool = False, hasActiveLecture: bool = False):
    course = await get_course_with_id(course_id)

    if not course:
        return {'message': 'Course not found'}

    course.name = escape(name)
    course.description = escape(description)
    course.active = active
    course.hasActiveLecture = hasActiveLecture

    await course.save()
    return course

# delete a course
@app.delete("/courses/{course_id}")
async def delete_course(course_id: int):
    course = await get_course_with_id(course_id)

    if not course:
        return {'message': 'Course not found'}

    await course.delete(link_rule=DeleteRules.DELETE_LINKS)
    return {'message': 'Course deleted'}


##############################################################################
##############################################################################
###########################     (CRUD) LECTURE     ###########################
##############################################################################
##############################################################################

# add a new lecture to a course
@app.post("/courses/{course_id}/lectures/")
async def add_lecture(course_id: int, name: str, description: str, active: bool = False):
    # validate input
    if not name:
        name = get_todays_date()
    if not description:
        return {'message': 'Description is required'}

    # get course
    course = await get_course_with_id(course_id)
    if not course:
        return {'message': 'Course not found'}

    # get a random lecture id
    numId = await random_lecture_id()

    # create and insert new lecture
    new_lecture = Lecture(
        name=escape(name),
        numId=numId,
        description=escape(description),
        active=active,
        courseId=course.numId
    )
    await new_lecture.insert()

    # update course to reflect new lecture
    # Update this to use mongodb native syntax
    # https://beanie-odm.dev/tutorial/updating-%26-deleting/
    await course.update({ "$push": { Course.lectures: new_lecture }})

    return new_lecture

# get all lectures from a course
@app.get("/courses/{course_id}/lectures/")
async def get_lectures(course_id: int):
    # get course
    course = await get_course_with_id(course_id)
    if not course:
        return {'message': 'Course not found'}

    # get lectures
    lectures = await Lecture.find(Lecture.courseId == course.numId).to_list()

    return lectures

# get a lecture from a course
@app.get("/courses/{course_id}/lectures/{lecture_id}")
async def get_lecture(course_id: int, lecture_id: int):
    # get course
    course = await get_course_with_id(course_id)
    if not course:
        return {'message': 'Course not found'}

    # get lecture
    lecture = await get_lecture_with_id(lecture_id)
    if not lecture:
        return {'message': 'Lecture not found'}

    return lecture

# update a lecture from a course
@app.put("/courses/{course_id}/lectures/{lecture_id}")
async def update_lecture(course_id: int, lecture_id: int, name: str, description: str, active: bool = False):
    # get course
    course = await get_course_with_id(course_id)
    if not course:
        return {'message': 'Course not found'}

    # get lecture
    lecture = await get_lecture_with_id(lecture_id)
    if not lecture:
        return {'message': 'Lecture not found'}

    # update lecture
    if (name):
        lecture.name = escape(name)
    if (description):
        lecture.description = escape(description)
    lecture.active = active
    await lecture.save()

    return lecture

# delete a lecture from a course
@app.delete("/courses/{course_id}/lectures/{lecture_id}")
async def delete_lecture(course_id: int, lecture_id: int):
    # get course
    course = await get_course_with_id(course_id)
    if not course:
        return {'message': 'Course not found'}

    # get lecture
    lecture = await get_lecture_with_id(lecture_id)
    if not lecture:
        return {'message': 'Lecture not found'}

    # delete lecture from course
    if (course.lectures and lecture in course.lectures):
        course.lectures.remove(lecture)
    await course.save()

    # delete lecture
    await lecture.delete(link_rule=DeleteRules.DELETE_LINKS)

    return {'message': 'Lecture deleted'}

##############################################################################
##############################################################################
##########################     (CRUD) QUESTIONS     ##########################
##############################################################################
##############################################################################

# add a new question to a lecture
@app.post("/courses/{course_id}/lectures/{lecture_id}/questions/")
async def add_question(course_id: int, lecture_id: int, questionType: str, \
    mcq: MultipleChoiceQuestion, saq: ShortAnswerQuestion, dq: DrawingQuestion, active: bool = False):
    return {'message': 'Not implemented'}

# get a question from a lecture
@app.get("/courses/{course_id}/lectures/{lecture_id}/questions/{question_id}")
async def get_question(course_id: int, lecture_id: int, question_id: int):
    return {'message': 'Not implemented'}

# update a question from a lecture
@app.put("/courses/{course_id}/lectures/{lecture_id}/questions/{question_id}")
async def update_question(course_id: int, lecture_id: int, question_id: int, questionType: str, \
    mcq: MultipleChoiceQuestion, saq: ShortAnswerQuestion, dq: DrawingQuestion, active: bool = False):
    return {'message': 'Not implemented'}

# remove a question from a lecture
@app.delete("/courses/{course_id}/lectures/{lecture_id}/questions/{question_id}")
async def delete_question(course_id: int, lecture_id: int, question_id: int):
    return {'message': 'Not implemented'}

##############################################################################
##############################################################################
###########################        START UP        ###########################
##############################################################################
##############################################################################

# start mongodb (beanie) connection on startup
@app.on_event("startup")
async def app_init():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    # app.db = client.PollAnywhere
    await init_beanie(database=client.PollAnywhere, document_models=[Course, Lecture, Question])
    