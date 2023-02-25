from models import MultipleChoiceQuestion


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
