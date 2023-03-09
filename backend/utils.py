import random
from datetime import date

from db_utils import (get_course_with_id, get_lecture_with_id,
                      get_question_with_id)


def get_todays_date():
    """
    return the date as a string in the format mm/dd/yyyy
    """
    today = date.today().strftime('%m/%d/%Y').replace("/0", "/")
    if today[0] == '0':
        today = today[1:]
    return today


async def random_course_id():
    """
    return a random 6 digit course id that hasn't already been taken
    """
    random_int = random.randint(100000, 999999)
    while (await get_course_with_id(random_int)):
        random_int = random.randint(100000, 999999)
    return random_int


async def random_lecture_id():
    """
    return a random 6 digit lecture id that hasn't already been taken
    """
    random_int = random.randint(100000, 999999)
    while (await get_lecture_with_id(random_int)):
        random_int = random.randint(100000, 999999)
    return random_int


async def random_question_id():
    """
    return a random 6 digit question id that hasn't already been taken
    """
    random_int = random.randint(100000, 999999)
    while (await get_question_with_id(random_int)):
        random_int = random.randint(100000, 999999)
    return random_int
