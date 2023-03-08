import json
import os
from configparser import ConfigParser
from os import environ as env
from urllib.parse import quote_plus, urlencode

import jwt
from authlib.integrations.flask_client import OAuth
from beanie import DeleteRules, init_beanie
from db_utils import get_course_with_id, get_lecture_with_id
from dotenv import find_dotenv, load_dotenv
from fastapi import Depends, FastAPI, HTTPException, Security
from fastapi.middleware.cors import CORSMiddleware
from fastapi_auth0 import Auth0, Auth0User
from markupsafe import escape
from models import (Course, DrawingQuestion, Lecture, MultipleChoiceOption,
                    MultipleChoiceQuestion, Question, QuestionType,
                    ShortAnswerQuestion)
from motor.motor_asyncio import AsyncIOMotorClient
from utils import get_todays_date, random_course_id, random_lecture_id
from validate import validate_mcq

app = FastAPI()

# Add cors to server
origins = [
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
    Detlete a lecture from a course
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

        # create a new question
        new_question = Question(
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
    raise HTTPException(status_code=501, detail="Not implemented")

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


##############################################################################
##############################################################################
###########################         LOGIN          ###########################
##############################################################################
##############################################################################

# Current version uses pollanywhereAPI and pollanywhere application
ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

auth0_domain = os.getenv('AUTH0_DOMAIN', '')
auth0_api_audience = os.getenv('AUTH0_API_AUDIENCE', '')

auth = Auth0(domain=auth0_domain, api_audience=auth0_api_audience, scopes={
    'read:teacher': 'Read teacher resource',
    'read:student': 'Read student resource'

})


@app.get("/public")
async def get_public():
    return {"message": "Anonymous user"}


@app.get("/secure", dependencies=[Depends(auth.implicit_scheme)])
async def get_secure(user: Auth0User = Security(auth.get_user)):
    return {"message": f"{user}"}


@app.get("/secure/teacher", dependencies=[Depends(auth.implicit_scheme)])
async def get_secure_scoped(user: Auth0User = Security(auth.get_user, scopes=["read:teacher"])):
    return {"message": f"{user}"}


@app.get("/secure/student", dependencies=[Depends(auth.implicit_scheme)])
async def get_secure_scoped2(user: Auth0User = Security(auth.get_user, scopes=["read:student"])):
    return {"message": f"{user}"}


# # API version
# def set_up():
#     """Sets up configuration for the app"""

#     env = os.getenv("ENV", ".config")

#     if env == ".config":
#         config = ConfigParser()
#         config.read(".config")
#         config = config["AUTH0"]
#     else:
#         config = {
#             "DOMAIN": os.getenv("DOMAIN", "your.domain.com"),
#             "API_AUDIENCE": os.getenv("API_AUDIENCE", "your.audience.com"),
#             "ISSUER": os.getenv("ISSUER", "https://your.domain.com/"),
#             "ALGORITHMS": os.getenv("ALGORITHMS", "RS256"),
#         }
#     return config
# class VerifyToken():
#     """Does all the token verification using PyJWT"""

#     def __init__(self, token):
#         self.token = token
#         self.config = set_up()

#         # This gets the JWKS from a given URL and does processing so you can
#         # use any of the keys available
#         jwks_url = f'https://{self.config["DOMAIN"]}/.well-known/jwks.json'
#         self.jwks_client = jwt.PyJWKClient(jwks_url)

#     def verify(self):
#         # This gets the 'kid' from the passed token
#         try:
#             self.signing_key = self.jwks_client.get_signing_key_from_jwt(
#                 self.token
#             ).key
#         except jwt.exceptions.PyJWKClientError as error:
#             return {"status": "error", "msg": error.__str__()}
#         except jwt.exceptions.DecodeError as error:
#             return {"status": "error", "msg": error.__str__()}

#         try:
#             payload = jwt.decode(
#                 self.token,
#                 self.signing_key,
#                 algorithms=self.config["ALGORITHMS"],
#                 audience=self.config["API_AUDIENCE"],
#                 issuer=self.config["ISSUER"],
#             )
#         except Exception as e:
#             return {"status": "error", "message": str(e)}

#         return payload


# @app.get("/api/public")
# def public():
#     """No access token required to access this route"""

#     result = {
#         "status": "success",
#         "msg": ("Hello from a public endpoint! You don't need to be "
#                 "authenticated to see this.")
#     }
#     return result


# # new code 👇
# @app.get("/api/private")
# def private(token: str = Depends(token_auth_scheme)):
#     """A valid access token is required to access this route"""

#     result = token.credentials

#     return result


# app.secret_key = env.get("APP_SECRET_KEY")

# oauth = OAuth(app)

# oauth.register(
#     "auth0",
#     client_id=env.get("AUTH0_CLIENT_ID"),
#     client_secret=env.get("AUTH0_CLIENT_SECRET"),
#     client_kwargs={
#         "scope": "openid profile email",
#     },
#     server_metadata_url=f'https://{env.get("AUTH0_DOMAIN")}/.well-known/openid-configuration'
# )


# @app.route("/login")
# def login():
#     return oauth.auth0.authorize_redirect(
#         redirect_uri=url_for("callback", _external=True)
#     )

# @app.route("/callback", methods=["GET", "POST"])
# def callback():
#     token = oauth.auth0.authorize_access_token()
#     session["user"] = token
#     return redirect("/")

# @app.route("/logout")
# def logout():
#     session.clear()
#     return redirect(
#         "https://" + env.get("AUTH0_DOMAIN")
#         + "/v2/logout?"
#         + urlencode(
#             {
#                 "returnTo": url_for("home", _external=True),
#                 "client_id": env.get("AUTH0_CLIENT_ID"),
#             },
#             quote_via=quote_plus,
#         )
#     )

# @app.route("/")
# def home():
#     return render_template("home.html", session=session.get('user'), pretty=json.dumps(session.get('user'), indent=4))
