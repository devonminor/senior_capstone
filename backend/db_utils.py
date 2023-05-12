################################################################################
#  db_utils.py
#  PollAnywhere - CS 98 Capstone Project
#
#  This file handles database queries.
#
#  Last updated: 05/12/2023
################################################################################

from models import Course, InternalUser, Lecture, Question


async def get_course_with_id(course_id: int):
    """
    Get a couse by id from the database
    """
    return await Course.find_one(Course.numId == course_id)


async def get_lecture_with_id(lecture_id: int):
    """
    Get a lecture by id from the database
    """
    return await Lecture.find_one(Lecture.numId == lecture_id)


async def get_question_with_id(question_id: int):
    """
    Get a question by id from the database
    """
    return await Question.find_one(Question.numId == question_id)


async def get_live_questions(course_id: int):
    """
    Get all live questions from the database
    """
    return await Question.find_many(Question.courseId == course_id, Question.live == True).to_list()


async def get_user_with_email(email: str):
    """
    Get a InternalUser by email from the database
    """
    return await InternalUser.find_one(InternalUser.email == email)
