import random
from models import Course, Lecture, Question
from datetime import date

from db_utils import get_course_with_id, get_lecture_with_id

# return the date as a string in the format mm/dd/yyyy
def get_todays_date():
    today = date.today().strftime('%m/%d/%Y').replace("/0", "/")
    if today[0] == '0':
        today = today[1:]
    return today

# return a random 6 digit course id that hasn't already been taken
async def random_course_id():
    random_int = random.randint(100000, 999999)
    while (await get_course_with_id(random_int)):
        random_int = random.randint(100000, 999999)
    return random_int

# return a random 6 digit lecture id that hasn't already been taken
async def random_lecture_id():
    random_int = random.randint(100000, 999999)
    while (await get_lecture_with_id(random_int)):
        random_int = random.randint(100000, 999999)
    return random_int