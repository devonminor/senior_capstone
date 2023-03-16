import secure
from beanie import DeleteRules, init_beanie
from db_utils import (get_course_with_id, get_lecture_with_id,
                      get_question_with_id)
from dependencies import validate_token
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from markupsafe import escape
from models import (Course, DrawingQuestion, Lecture, MultipleChoiceOption,
                    MultipleChoiceQuestion, Question, QuestionType,
                    ShortAnswerQuestion)
from motor.motor_asyncio import AsyncIOMotorClient
from utils import (get_todays_date, random_course_id, random_lecture_id,
                   random_question_id)
from validate import validate_mcq

app = FastAPI()

csp = secure.ContentSecurityPolicy().default_src(
    "'self'").frame_ancestors("'none'")
hsts = secure.StrictTransportSecurity().max_age(31536000).include_subdomains()
referrer = secure.ReferrerPolicy().no_referrer()
cache_value = secure.CacheControl().no_cache(
).no_store().max_age(0).must_revalidate()
x_frame_options = secure.XFrameOptions().deny()

secure_headers = secure.Secure(
    csp=csp,
    hsts=hsts,
    referrer=referrer,
    cache=cache_value,
    xfo=x_frame_options,
)


@app.middleware("http")
async def set_secure_headers(request, call_next):
    response = await call_next(request)
    secure_headers.framework.fastapi(response)
    return response

# Add cors to server
origins = [
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
    max_age=86400,
)

##############################################################################
##############################################################################
###########################     (CRUD) COURSES     ###########################
##############################################################################
##############################################################################


@app.post("/courses/")
async def add_course(name: str, description: str, active: bool = False, hasActiveLecture: bool = False):
    """
    Add a new course
    """
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


@app.get("/courses/")
async def get_courses():
    """
    Get all courses
    TODO: EITHER MAKE THIS ROUTE PROTECTED OR REMOVE IT
    """
    courses = await Course.find_all().to_list()
    return courses


@app.get("/courses/{course_id}")
async def get_course(course_id: int):
    """
    Get a course by id
    """
    course = await get_course_with_id(course_id)

    if not course:
        return {'message': 'Course not found'}

    return course


@app.put("/courses/{course_id}")
async def update_course(course_id: int, name: str, description: str, active: bool = False, hasActiveLecture: bool = False):
    """
    Update a course
    """
    course = await get_course_with_id(course_id)

    if not course:
        return {'message': 'Course not found'}

    course.name = escape(name)
    course.description = escape(description)
    course.active = active
    course.hasActiveLecture = hasActiveLecture

    await course.save()
    return course


@app.delete("/courses/{course_id}")
async def delete_course(course_id: int):
    """
    Delete a course
    """
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

@app.post("/courses/{course_id}/lectures/")
async def add_lecture(course_id: int, name: str, description: str, active: bool = False):
    """
    Add a new lecture to a course
    """
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
    course.lectures.append(new_lecture)
    await course.save()

    return new_lecture


@app.get("/courses/{course_id}/lectures/")
async def get_lectures(course_id: int):
    """
    Get all lectures from a course
    """
    # get course
    course = await get_course_with_id(course_id)
    if not course:
        return {'message': 'Course not found'}

    # get lectures
    lectures = await Lecture.find(Lecture.courseId == course.numId).to_list()

    return lectures


@app.get("/courses/{course_id}/lectures/{lecture_id}")
async def get_lecture(course_id: int, lecture_id: int):
    """
    Get a lecture from a course
    """
    # get course
    course = await get_course_with_id(course_id)
    if not course:
        return {'message': 'Course not found'}

    # get lecture
    lecture = await get_lecture_with_id(lecture_id)
    if not lecture:
        return {'message': 'Lecture not found'}

    return lecture


@app.put("/courses/{course_id}/lectures/{lecture_id}")
async def update_lecture(course_id: int, lecture_id: int, name: str, description: str, active: bool = False):
    """
    Update a lecture from a course
    """
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


@app.delete("/courses/{course_id}/lectures/{lecture_id}")
async def delete_lecture(course_id: int, lecture_id: int):
    """
    Delete a lecture from a course
    """
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


@app.post("/courses/{course_id}/lectures/{lecture_id}/questions/")
async def add_question(course_id: int, lecture_id: int, questionType: str, mcq: MultipleChoiceQuestion | None = None, saq: ShortAnswerQuestion | None = None, dq: DrawingQuestion | None = None, active: bool = False):
    """
    Add a new question to a lecture
    """

    # get course
    course = await get_course_with_id(course_id)
    if not course:
        return {'message': 'Course not found'}

    # get lecture
    lecture = await get_lecture_with_id(lecture_id)
    if not lecture:
        return {'message': 'Lecture not found'}

    if (QuestionType.MULTIPLE_CHOICE == questionType):
        # validate the Multiple Choice Question
        if not validate_mcq(mcq):
            raise HTTPException(status_code=400, detail="Invalid MCQ")

        # get a random lecture id
        numId = await random_question_id()

        # create a new question
        new_question = Question(
            numId=numId,
            questionType=QuestionType.MULTIPLE_CHOICE,
            lectureId=lecture.numId
        )

        # create multiple coice question
        new_mc = MultipleChoiceQuestion(
            title=escape(mcq.title),
            subtitle=escape(mcq.subtitle) if mcq.subtitle else None,
            image=escape(mcq.image) if mcq.image else None,
        )

        # create options if they exist
        if mcq.options and len(mcq.options) > 0:
            for (i, option) in enumerate(mcq.options):
                new_option = MultipleChoiceOption(
                    name=escape(option.name),
                    image=escape(option.image) if option.image else None,
                    order=escape(option.order)
                )

                new_mc.options.append(new_option)

        new_question.multipleChoiceQuestion = new_mc

        await new_question.insert()

        # update lecture to reflect new question
        lecture.questions.append(new_question)
        await lecture.save()

        return new_question


@app.get("/courses/{course_id}/lectures/{lecture_id}/questions/")
async def get_questions(course_id: int, lecture_id: int):
    """
    Questions all questions from a lecture
    """
    # get course
    course = await get_course_with_id(course_id)
    if not course:
        return {'message': 'Course not found'}

    # get lecture
    lecture = await get_lecture_with_id(lecture_id)
    if not lecture:
        return {'message': 'Lecture not found'}

    # get questions
    questions = await Question.find(Question.lectureId == lecture.numId).to_list()

    return questions


@app.get("/courses/{course_id}/lectures/{lecture_id}/questions/{question_id}")
async def get_question(course_id: int, lecture_id: int, question_id: int):
    """
    Get a question from a lecture
    """
    raise HTTPException(status_code=501, detail="Not implemented")


@app.put("/courses/{course_id}/lectures/{lecture_id}/questions/{question_id}")
async def update_question(course_id: int, lecture_id: int, question_id: int, questionType: str, mcq: MultipleChoiceQuestion, saq: ShortAnswerQuestion, dq: DrawingQuestion, active: bool = False):
    """
    Update a question from a lecture
    """
    raise HTTPException(status_code=501, detail="Not implemented")


@app.delete("/courses/{course_id}/lectures/{lecture_id}/questions/{question_id}")
async def delete_question(course_id: int, lecture_id: int, question_id: int):
    """
    Delete a question from a lecture
    """
    # get course
    course = await get_course_with_id(course_id)
    if not course:
        return {'message': 'Course not found'}

    # get lecture
    lecture = await get_lecture_with_id(lecture_id)
    if not lecture:
        return {'message': 'Lecture not found'}

    # get question
    question = await get_question_with_id(question_id)
    if not question:
        return {'message': 'Question not found'}

    # delete lecture from course
    if (course.lectures and lecture in course.lectures and lecture.questions and question in lecture.questions):
        lecture.questions.remove(question)
    await lecture.save()

    # delete lecture
    await question.delete(link_rule=DeleteRules.DELETE_LINKS)

    return {'message': 'Question deleted'}

##############################################################################
##############################################################################
#######################        FOR TESTING ONLY        #######################
##############################################################################
##############################################################################


@app.get("/api/messages/public")
def public():
    return {"text": "This is a public message."}


@app.get("/api/messages/protected", dependencies=[Depends(validate_token)])
def protected():
    return {"text": "This is a protected message."}


##############################################################################
##############################################################################
###########################        START UP        ###########################
##############################################################################
##############################################################################


@app.on_event("startup")
async def app_init():
    """
    Start mongodb (beanie) connection on startup
    """
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    # app.db = client.PollAnywhere
    await init_beanie(database=client.PollAnywhere, document_models=[Course, Lecture, Question])
