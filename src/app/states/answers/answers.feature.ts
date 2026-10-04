import { createFeature, createReducer, on } from "@ngrx/store";
import { AnswerOption } from "../../models/answer.option";
import { setAnswers } from "./answers.action";


export type AnswersState = {
    answers: Array<Array<AnswerOption>>;
}

export const initialGamesState: AnswersState = {
    answers: []
};

export const answersFeatures = createFeature({
    name: 'answers',
    reducer: createReducer(
        initialGamesState,
        on(setAnswers, (state, {answers}) => ({
            ...state,
            answers
        }))
    )
})
