import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ApiGame } from "../../models/game";


export const gameActions = createActionGroup({
    source: 'Games',
    events: {
        loadGames: emptyProps(),
        loadGamesSuccess: props<{games: Array<ApiGame>}>(),
        loadGamesFailure: props<{error: string}>()
    }
})
