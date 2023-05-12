################################################################################
#  validate.py
#  PollAnywhere - CS 98 Capstone Project
#
#  This file handles validation for Multiple Choice and Short Answer Questions.
#
#  Last updated: 05/12/2023
################################################################################

from models import MultipleChoiceQuestion, ShortAnswerQuestion


def validate_mcq(mcq: MultipleChoiceQuestion) -> bool:
    """
    Validate a Multiple Choice Question
    """
    if (mcq is None):
        return False
    if not mcq.title:
        return False
    if mcq.options and len(mcq.options) > 0:
        for option in mcq.options:
            if not option.name:
                return False
            if not option.order:
                return False
    return True


def validate_saq(saq: ShortAnswerQuestion) -> bool:
    """
    Validate a Short Answer Question
    """
    if (saq is None):
        return False
    if not saq.title:
        return False
    return True
