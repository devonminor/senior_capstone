################################################################################
#  dependencies.py
#  PollAnywhere - CS 98 Capstone Project
#
#  This file handles token validation.
#
#  Last updated: 05/12/2023
################################################################################

from authorization_header_elements import get_bearer_token
from fastapi import Depends
from json_web_token import JsonWebToken


def validate_token(token: str = Depends(get_bearer_token)):
    return JsonWebToken(token).validate()
