from models import Course, Lecture, Question

# Get a couse by id from the database
async def get_course_with_id(course_id: int):
    return await Course.find_one(Course.numId == course_id)

# get a lecture by id from the database
async def get_lecture_with_id(lecture_id: int):
    return await Lecture.find_one(Lecture.numId == lecture_id)