################################################################################
#  config.py
#  PollAnywhere - CS 98 Capstone Project
#
#  This file contains the code for setting up and configuring login settings,
#  including audience and domain.
#
#  Last updated: 05/12/2023
################################################################################

from pydantic import BaseSettings, validator


class Settings(BaseSettings):
    auth0_audience: str
    auth0_domain: str
    client_origin_url: str

    @classmethod
    @validator("client_origin_url", "auth0_audience", "auth0_domain")
    def check_not_empty(cls, v):
        assert v != "", f"{v} is not defined"
        return v

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
