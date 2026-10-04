import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GamesApiClient } from "../../api/games.loader";
import { Params, Router } from "@angular/router";
import { gameActions } from "./game.actions";
import { catchError, map, of, switchMap } from "rxjs";



export const gameEffect = createEffect(
    (
        actions$ = inject(Actions),
        apiClient = inject(GamesApiClient),
        router = inject(Router)
    ) => {
        return actions$.pipe(
            ofType(gameActions.loadGames),
            switchMap(() => {
                return apiClient.loadGames().pipe(
                    map((response) => {
                        const params: Params = router.routerState.snapshot.root.queryParams;
                        const keyWord = 'personalCollection';
                        if (params[keyWord]) {
                            router.navigateByUrl('/questionnaire' + '?' + keyWord + '=' + params[keyWord]);
                        } else {
                            router.navigateByUrl('/questionnaire');
                        }
                        return gameActions.loadGamesSuccess({ games: response })
                    }),
                    catchError((error) => {
                        // TODO route to error page
                        return of(gameActions.loadGamesFailure({ error: error }))
                    })
                )
            })
      )
    },
    {
        functional: true
    }
);
