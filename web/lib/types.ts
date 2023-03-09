export enum QuestionTypeEnum {
    MULTIPLE_CHOICE = "multiple_choice",
    SHORT_ANSWER = "short_answer",
    DRAWING = "drawing"
}

export type QuestionType = keyof typeof QuestionTypeEnum;
