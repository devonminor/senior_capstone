from datetime import datetime
from enum import Enum
from typing import List, Optional

from beanie import Document, Indexed, Link
from pydantic import BaseModel

##############################################################################
##############################################################################
##########################      QUESTION MODEL      ##########################
##############################################################################
##############################################################################


class QuestionType(str, Enum):
    MULTIPLE_CHOICE = "multiple_choice"
    SHORT_ANSWER = "short_answer"
    DRAWING = "drawing"

    @classmethod
    def has_value(cls, value):
        return value in cls._value2member_map_


class MultipleChoiceOption(BaseModel):
    name: str
    image: Optional[str]
    order: int


class MultipleChoiceQuestion(BaseModel):
    title: str
    subtitle: Optional[str]
    image: Optional[str]
    options: Optional[list[MultipleChoiceOption]] = []


class ShortAnswerQuestion(BaseModel):
    prompt: str
    subtitle: str
    answer_space: str
    image: str


class DrawingQuestion(BaseModel):
    title: str
    subtitle: str
    image: str
    # medium: DrawingCanvas


class Question(Document):
    numId: Indexed(int)
    questionType: QuestionType
    active: bool = False
    lastUpdated: datetime = datetime.now()
    createdAt: datetime = datetime.now()
    multipleChoiceQuestion: Optional[MultipleChoiceQuestion] = None
    shortAnswerQuestion: Optional[ShortAnswerQuestion] = None
    drawingQuestion: Optional[DrawingQuestion] = None
    lectureId: Indexed(int)
    imageUrl: Optional[str]


##############################################################################
##############################################################################
##########################      LECTURE MODEL       ##########################
##############################################################################
##############################################################################


class Lecture(Document):
    numId: Indexed(int)
    name: str
    description: Optional[str] = None
    lastUpdated: datetime = datetime.now()
    createdAt: datetime = datetime.now()
    active: bool = False
    courseId: Indexed(int)
    questions: Optional[List[Link[Question]]] = []


##############################################################################
##############################################################################
##########################       COURSE MODEL       ##########################
##############################################################################
##############################################################################

class Course(Document):
    numId: Indexed(int)
    name: str
    description: Optional[str] = None
    createdAt: datetime = datetime.now()
    active: bool = False
    hasActiveLecture: bool = False
    lectures: Optional[List[Link[Lecture]]] = []


Course.update_forward_refs()
Lecture.update_forward_refs()
Question.update_forward_refs()

##############################################################################
##############################################################################
##########################       USER MODEL       ############################
##############################################################################
##############################################################################

class User(Document):
    numId: Indexed(int)
    first_name: str
    last_name: str
    email: str
    registration_date: datetime = datetime.now()
    courses_created: Optional[List[Course]]
    courses_joined:  Optional[List[Course]]
    


