import { createAction, props } from "@ngrx/store";
import { AnswerOption } from "../../models/answer.option";

export const setAnswers = createAction('[User Answers] setAnswers', props<{answers: Array<Array<AnswerOption>>}>());
