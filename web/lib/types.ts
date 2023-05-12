/*
 *  server_requests.ts
 *  PollAnywhere - CS 98 Capstone Project
 *
 *  This file contains the types used throughout the project.
 *
 *  Last updated: 05/12/2023
 */

export enum QuestionTypeEnum {
    MULTIPLE_CHOICE = "multiple_choice",
    SHORT_ANSWER = "short_answer",
    DRAWING = "drawing"
}

export type QuestionType = keyof typeof QuestionTypeEnum;
