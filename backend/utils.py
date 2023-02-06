import random
from models import Course

# return a random 6 digit id that hasn't already been taken
async def random_id():
    random_int = random.randint(100000, 999999)
    while (await Course.find_one(Course.numId == random_int)):
        random_int = random.randint(100000, 999999)
    return random_int