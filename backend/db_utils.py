from models import Course, InternalUser, Lecture, Question

################## Example code for storing images in Mongodb ##################

# import pymongo
# from bson.binary import Binary
# from PIL import Image

# Open the image file and convert it to binary data, and then you can store the image as a new document

# with open('image.jpg', 'rb') as f:
#     image_data = f.read()
# binary_data = Binary(image_data)

# # Create a new document with the image data
# document = {'name': 'my_image', 'image': binary_data}
# db['images'].insert_one(document)


# Can decode binary data and open image from the database:
# document = db['images'].find_one({'name': 'my_image'})
# binary_data = document['image']
# image_data = binary_data.decode('utf-8')
# image = Image.open(io.BytesIO(image_data))

async def get_user_with_email(email: str):
    """
    Get a InternalUser by email from the database
    """
    return await InternalUser.find_one(InternalUser.email == email)


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
