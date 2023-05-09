import os

import cloudinary
import cloudinary.api
import cloudinary.uploader
import secure
from beanie import DeleteRules, init_beanie
from db_utils import (get_course_with_id, get_lecture_with_id,
                      get_live_questions, get_question_with_id,
                      get_user_with_email)
from dependencies import validate_token
from dotenv import load_dotenv
# from PIL import Image
from fastapi import (Body, Depends, FastAPI, File, HTTPException, UploadFile,
                     status)
from fastapi.middleware.cors import CORSMiddleware
from markupsafe import escape
from models import (Course, DrawingQuestion, InternalUser, Lecture,
                    MultipleChoiceOption, MultipleChoiceQuestion,
                    MultipleChoiceResponse, Question, QuestionType,
                    ShortAnswerQuestion, ShortAnswerResponse)
from motor.motor_asyncio import AsyncIOMotorClient
from utils import (get_todays_date, random_course_id, random_lecture_id,
                   random_question_id)
from validate import validate_mcq, validate_saq

load_dotenv()

CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY")
CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")

cloudinary.config(
    cloud_name=CLOUDINARY_CLOUD_NAME,
    api_key=CLOUDINARY_API_KEY,
    api_secret=CLOUDINARY_API_SECRET,
    secure=True
)

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
##########################           USER           ##########################
##############################################################################
##############################################################################


@app.get("/me")
async def me(token: str = Depends(validate_token)):
    """
    Return the user from the token
    """
    email = token["https://github.com/dorinclisu/fastapi-auth0/email"]

    # Get the user from the database. Create one if there is none
    user = await get_user_with_email(email)
    if (user is None):
        # Create a new user
        new_user = InternalUser(
            email=email
        )

        await new_user.insert()
        return new_user

    return user

##############################################################################
##############################################################################
###########################     (CRUD) COURSES     ###########################
##############################################################################
##############################################################################


@app.post("/courses/")
async def add_course(name: str = Body(...), description: str = Body(...), season: str = Body(...), active: bool = False, hasActiveLecture: bool = False, token: str = Depends(validate_token)):
    """
    Add a new course
    """
    # get user from token
    email = token["https://github.com/dorinclisu/fastapi-auth0/email"]
    user = await get_user_with_email(email)

    # create a new course
    numId = await random_course_id()
    new_course = Course(
        name=escape(name),
        numId=numId,
        description=escape(description),
        season=season,
        active=active,
        hasActiveLecture=hasActiveLecture,
        teacherEmails=[user.email]
    )

    await new_course.insert()

    user.teacherCourses.append(new_course)
    await user.save()

    return new_course


@app.get("/courses/")
async def get_courses(token: str = Depends(validate_token)):
    """
    Get all courses
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


@app.post("/courses/{course_id}/student")
async def add_student_to_course(course_id: int, token: str = Depends(validate_token)):
    """
    Add a student to a course
    """
    # get user from token
    email = token["https://github.com/dorinclisu/fastapi-auth0/email"]

    user = await get_user_with_email(email)
    if not user:
        return {'message': 'User not found'}

    course = await get_course_with_id(course_id)
    if not course:
        return {'message': 'Course not found'}

    if email not in course.studentEmails:
        course.studentEmails.append(email)
        if course not in user.studentCourses:
            user.studentCourses.append(course)
            await user.save()
        await course.save()

    return {'message': 'Student added to course'}


@app.delete("/courses/{course_id}")
async def delete_course(course_id: int, token: str = Depends(validate_token)):
    """
    Delete a course
    """
    email = token["https://github.com/dorinclisu/fastapi-auth0/email"]

    user = await get_user_with_email(email)
    if not user:
        return {'message': 'User not found'}

    course = await get_course_with_id(course_id)
    if not course:
        return {'message': 'Course not found'}

    if email not in course.teacherEmails:
        return {'message': 'You are not the teacher of this course'}

    await course.delete(link_rule=DeleteRules.DELETE_LINKS)
    return {'message': 'Course deleted'}


##############################################################################
##############################################################################
###########################     (CRUD) LECTURE     ###########################
##############################################################################
##############################################################################

@app.post("/courses/{course_id}/lectures/")
async def add_lecture(course_id: int, name: str = Body(...), description: str = Body(...), active: bool = False, token: str = Depends(validate_token)):
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

    email = token["https://github.com/dorinclisu/fastapi-auth0/email"]
    if email not in course.teacherEmails:
        return {'message': 'You are not authorized to add a lecture to this course.'}

    print(course)

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
async def get_lectures(course_id: int, token: str = Depends(validate_token)):
    """
    Get all lectures from a course
    """
    # get course
    course = await get_course_with_id(course_id)
    if not course:
        return {'message': 'Course not found'}

    email = token["https://github.com/dorinclisu/fastapi-auth0/email"]
    if email not in course.teacherEmails and email not in course.studentEmails:
        return {'message': 'You are not authorized to view lectures from this course.'}

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


async def create_question(type: str, courseId: int, lectureId: int) -> Question:
    """
    Create a question using model
    """
    numId = await random_question_id()

    # create a new question
    new_question = Question(
        numId=numId,
        questionType=type,
        lectureId=lectureId,
        courseId=courseId
    )

    return new_question


@app.post("/courses/{course_id}/lectures/{lecture_id}/questions/")
async def add_question(course_id: int, lecture_id: int, questionType: str, mcq: MultipleChoiceQuestion | None = None, saq: ShortAnswerQuestion | None = None, dq: DrawingQuestion | None = None, active: bool = False, token: str = Depends(validate_token)):
    # async def add_question(course_id: int, lecture_id: int, questionType: str, mcq: MultipleChoiceQuestion | None = None, saq: ShortAnswerQuestion | None = None, dq: DrawingQuestion | None = None, active: bool = False, token: str = Depends(validate_token)):
    """
    Add a new question to a lecture
    """

    # get course
    course = await get_course_with_id(course_id)
    if not course:
        return {'message': 'Course not found'}

    email = token["https://github.com/dorinclisu/fastapi-auth0/email"]
    if email not in course.teacherEmails and email not in course.studentEmails:
        return {'message': 'You are not authorized to add questions to this course.'}

    # get lecture
    lecture = await get_lecture_with_id(lecture_id)
    if not lecture:
        return {'message': 'Lecture not found'}

    if (QuestionType.MULTIPLE_CHOICE == questionType):
        # validate the Multiple Choice Question
        if not validate_mcq(mcq):
            raise HTTPException(status_code=400, detail="Invalid MCQ")

        # create a new question
        new_question = await create_question(
            QuestionType.MULTIPLE_CHOICE, course.numId, lecture.numId)

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
    elif (QuestionType.SHORT_ANSWER == questionType):
        # validate the Short Answer Question
        if not validate_saq(saq):
            raise HTTPException(status_code=400, detail="Invalid SAQ")

        # create a new question
        new_question = await create_question(
            QuestionType.SHORT_ANSWER, course.numId, lecture.numId)

        # create short answer question
        new_sc = ShortAnswerQuestion(
            title=escape(saq.title),
        )
        new_question.shortAnswerQuestion = new_sc

        # insert question
        await new_question.insert()

        # update lecture to reflect new question
        lecture.questions.append(new_question)
        await lecture.save()

        return new_question


@app.get("/courses/{course_id}/lectures/{lecture_id}/questions/")
async def get_questions(course_id: int, lecture_id: int, token: str = Depends(validate_token)):
    """
    Questions all questions from a lecture
    """
    # get course
    course = await get_course_with_id(course_id)
    if not course:
        return {'message': 'Course not found'}

    email = token["https://github.com/dorinclisu/fastapi-auth0/email"]
    if email not in course.teacherEmails and email not in course.studentEmails:
        return {'message': 'You are not authorized to get questions from this course.'}

    # get lecture
    lecture = await get_lecture_with_id(lecture_id)
    if not lecture:
        return {'message': 'Lecture not found'}

    # get questions
    questions = await Question.find(Question.lectureId == lecture.numId).to_list()

    return questions


@app.get("/courses/{course_id}/questions/{question_id}")
@app.get("/courses/{course_id}/lectures/{lecture_id}/questions/{question_id}")
async def get_question(course_id: int, question_id: int, lecture_id: int | None = None, token: str = Depends(validate_token)):
    """
    Get a question from a lecture
    """
    # get course
    course = await get_course_with_id(course_id)
    if not course:
        return {'message': 'Course not found'}

    email = token["https://github.com/dorinclisu/fastapi-auth0/email"]
    if email not in course.teacherEmails and email not in course.studentEmails:
        return {'message': 'You are not authorized to get questions from this course.'}

    # Only students are allowed to read questions without a lecture id
    if not lecture_id and email in course.teacherEmails:
        return {'message': 'Invalid query.'}

    # get lecture
    if lecture_id:
        lecture = await get_lecture_with_id(lecture_id)
        if not lecture:
            return {'message': 'Lecture not found'}

    # get question
    question = await get_question_with_id(question_id)
    return question


@app.put("/courses/{course_id}/lectures/{lecture_id}/questions/{question_id}")
async def update_question(course_id: int, lecture_id: int, question_id: int, questionType: str, mcq: MultipleChoiceQuestion, saq: ShortAnswerQuestion, dq: DrawingQuestion, active: bool = False):
    """
    Update a question from a lecture
    """
    raise HTTPException(status_code=501, detail="Not implemented")


@app.put("/courses/{course_id}/lectures/{lecture_id}/questions/{question_id}/live")
async def update_question_live(course_id: int, lecture_id: int, question_id: int, live: bool, token: str = Depends(validate_token)):
    """
    Update a question from a lecture
    """
    # get course
    course = await get_course_with_id(course_id)
    if not course:
        return {'message': 'Course not found'}

    # validate user is teacher
    email = token["https://github.com/dorinclisu/fastapi-auth0/email"]
    if email not in course.teacherEmails:
        return {'message': 'You are not authorized to update questions in this course.'}

    # get lecture
    lecture = await get_lecture_with_id(lecture_id)
    if not lecture:
        return {'message': 'Lecture not found'}

    # get question
    question = await get_question_with_id(question_id)
    if not question:
        return {'message': 'Question not found'}

    # if there are any live quesions, set them to not live
    previous_live_questions = await get_live_questions(course_id)
    for question in previous_live_questions:
        question.live = False
        await question.save()

    # if we are taking a question offline, then we need to set the course liveQuestion to null
    if not live:
        course.liveQuestion = None
        await course.save()
    # otherwise, set the course liveQuestion to the question we are updating
    else:
        course.liveQuestion = question.numId
        await course.save()

    # update question
    question.live = live
    await question.save()

    return question


@app.put("/courses/{course_id}/lectures/{lecture_id}/questions/{question_id}/mcq")
async def add_mcq_response(course_id: int, lecture_id: int, question_id: int, order: int, token: str = Depends(validate_token)):
    """
    Add a multiple choice question response
    """
    # get course
    course = await get_course_with_id(course_id)
    if not course:
        return {'message': 'Course not found'}

    # validate user is teacher
    email = token["https://github.com/dorinclisu/fastapi-auth0/email"]
    if email not in course.studentEmails:
        return {'message': 'You are not authorized to respond to this question.'}

    # get lecture
    lecture = await get_lecture_with_id(lecture_id)
    if not lecture:
        return {'message': 'Lecture not found'}

    # get question
    question = await get_question_with_id(question_id)
    if not question:
        return {'message': 'Question not found'}

    # if the user had already responded to this question, update their response
    for response in question.multipleChoiceQuestion.responses:
        if response.email == email:
            if response.order == order:
                return question
            response.order = order
            await question.save()
            return question

    # create response
    mcr = MultipleChoiceResponse(
        order=order,
        email=email,
    )

    # add response to question
    question.multipleChoiceQuestion.responses.append(mcr)
    await question.save()

    return question


@app.put("/courses/{course_id}/lectures/{lecture_id}/questions/{question_id}/saq")
async def add_saq_response(course_id: int, lecture_id: int, question_id: int, freeResponse: str = Body(embed=True), token: str = Depends(validate_token)):
    """
    Add a multiple choice question response
    """
    # get course
    course = await get_course_with_id(course_id)
    if not course:
        return {'message': 'Course not found'}

    # validate user is teacher
    email = token["https://github.com/dorinclisu/fastapi-auth0/email"]
    if email not in course.studentEmails:
        return {'message': 'You are not authorized to respond to this question.'}

    # get lecture
    lecture = await get_lecture_with_id(lecture_id)
    if not lecture:
        return {'message': 'Lecture not found'}

    # get question
    question = await get_question_with_id(question_id)
    if not question:
        return {'message': 'Question not found'}

    # if the user had already responded to this question, update their response
    for res in question.shortAnswerQuestion.responses:
        if res.email == email:
            if res.response == freeResponse:
                return question
            res.response = freeResponse
            await question.save()
            return question

    # create response
    mcr = ShortAnswerResponse(
        email=email,
        response=freeResponse
    )

    # add response to question
    question.shortAnswerQuestion.responses.append(mcr)
    await question.save()

    return question


@ app.delete("/courses/{course_id}/lectures/{lecture_id}/questions/{question_id}")
async def delete_question(course_id: int, lecture_id: int, question_id: int, token: str = Depends(validate_token)):
    """
    Delete a question from a lecture
    """
    # get course
    course = await get_course_with_id(course_id)
    if not course:
        return {'message': 'Course not found'}

    # validate token
    email = token["https://github.com/dorinclisu/fastapi-auth0/email"]
    if email not in course.teacherEmails:
        return {'message': 'You are not authorized to delete questions from this course.'}

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


@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    try:
        contents = file.file.read(1024 * 1024)
    except Exception:
        return {"message": "There was an error uploading the file"}
    finally:
        print(file.filename)
        res = cloudinary.uploader.upload(contents,
                                         folder="questions/",
                                         overwrite=True,
                                         public_id="123456")
        url = res.get('url')
        file.file.close()

    return {"message": f"Successfully uploaded file. Can be found at {url}"}


@app.put("/courses/{course_id}/lectures/{lecture_id}/questions/{question_id}/image")
async def question_image_upload(course_id: int, lecture_id: int, question_id: int, file: UploadFile = File(...)):
    """
    Upload an image for an existing question
    """
    # get course
    course = await get_course_with_id(course_id)
    if not course:
        return {'message': 'Course not found'}

    # TODO: add back validation to this route
    # validate token
    # email = token["https://github.com/dorinclisu/fastapi-auth0/email"]
    # if email not in course.teacherEmails:
    #     return {'message': 'You are not authorized to edit questions from this course.'}

    # get lecture
    lecture = await get_lecture_with_id(lecture_id)
    if not lecture:
        return {'message': 'Lecture not found'}

    # get question
    question = await get_question_with_id(question_id)
    if not question:
        return {'message': 'Question not found'}

    try:
        contents = file.file.read(1024 * 1024)
    except Exception:
        return {"message": "There was an error reading the file."}
    finally:
        res = cloudinary.uploader.upload(contents,
                                         folder="questions/",
                                         overwrite=True,
                                         public_id="123456")
        url = res.get('url')
        file.file.close()

        # update question with image url based on question type
        if (question.questionType == QuestionType.MULTIPLE_CHOICE):
            question.multipleChoiceQuestion.image = url
        elif (question.questionType == QuestionType.SHORT_ANSWER):
            question.shortAnswerQuestion.image = url

        await question.save()

    return question


##############################################################################
##############################################################################
###########################        START UP        ###########################
##############################################################################
##############################################################################


@ app.on_event("startup")
async def app_init():
    """
    Start mongodb (beanie) connection on startup
    """
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    # app.db = client.PollAnywhere
    await init_beanie(database=client.PollAnywhere, document_models=[InternalUser, Course, Lecture, Question])
