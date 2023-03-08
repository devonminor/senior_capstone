from models import Course, Lecture, Question


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
