from datetime import datetime
from enum import Enum
from typing import List, Optional

from beanie import Document, Link
from pydantic import BaseModel

##############################################################################
##############################################################################
##########################      QUESTION MODEL      ##########################
##############################################################################
##############################################################################

class QuestionType(str, Enum):
    multiple_choice = "multiple_choice"
    short_answer = "short_answer"
    drawing = "drawing"

class MultipleChoiceOption(BaseModel):
    name: str
    image: str
    order: int

class MultipleChoiceQuestion(BaseModel):
    title: str
    subtitle: str
    image: str
    options: list[MultipleChoiceOption]

class ShortAnswerQuestion(BaseModel):
    title: str
    subtitle: str
    image: str

class DrawingQuestion(BaseModel):
    title: str
    subtitle: str
    image: str

class Question(Document):
    questionType: QuestionType
    active: bool = False
    lastUpdated: datetime = datetime.now()
    createdAt: datetime = datetime.now()
    multipleChoiceQuestion: Optional[MultipleChoiceQuestion] = None
    shortAnswerQuestion: Optional[ShortAnswerQuestion] = None
    drawingQuestion: Optional[DrawingQuestion] = None
    lectureId: int

##############################################################################
##############################################################################
##########################      LECTURE MODEL       ##########################
##############################################################################
##############################################################################

class Lecture(Document):
    numId: int
    name: str
    description: Optional[str] = None
    lastUpdated: datetime = datetime.now()
    createdAt: datetime = datetime.now()
    active: bool = False
    courseId: int
    questions: Optional[List[Link[Question]]] = None


##############################################################################
##############################################################################
##########################       COURSE MODEL       ##########################
##############################################################################
##############################################################################

class Course(Document):
    numId: int
    name: str
    description: Optional[str] = None
    createdAt: datetime = datetime.now()
    active: bool = False
    hasActiveLecture: bool = False
    lectures: Optional[List[Link[Lecture]]] = None


Course.update_forward_refs()
Lecture.update_forward_refs()
Question.update_forward_refs()