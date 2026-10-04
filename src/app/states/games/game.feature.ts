import { createFeature, createReducer, on } from "@ngrx/store";
import { ApiGame } from "../../models/game"
import { gameActions } from "./game.actions";


export type GamesState = {
    games: Array<ApiGame>;
    error: string;
}

export const initialGamesState: GamesState = {
    games: [],
    error: ""
};

export const gameFeatures = createFeature({
    name: 'games',
    reducer: createReducer(
        initialGamesState,
        on(gameActions.loadGamesSuccess, (state, {games}) => ({
            ...state,
            games
        })),

        on(gameActions.loadGamesFailure, (state, {error}) => ({
            ...state,
            error
        }))
    )
})
