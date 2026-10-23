import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiGame, Game } from '../../models/game';
import { Observable } from 'rxjs';
import { gameFeatures, GamesState } from '../../states/games/game.feature';
import { Store } from '@ngrx/store';
import { faAngleDown, faAngleUp, faCakeCandles, faCalendarDays, faClock, faDumbbell, faEarthEurope, faHandshake, faLocationDot, faLock, faLockOpen, faSliders, faStar, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { selectLanguage } from '../../states/language/language.selector';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-results',
  imports: [RouterModule, FaIconComponent, TranslatePipe, AsyncPipe],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results {
[x: string]: any;
  faLocationDot = faLocationDot;
  faUsers = faUsers;
  faStar = faStar;
  faCalendarDays = faCalendarDays;
  faDumbbell = faDumbbell;
  faLock = faLock;
  faLockOpen = faLockOpen;
  faEarthEurope = faEarthEurope;
  faClock = faClock;
  faCakeCandles = faCakeCandles;
  faSliders = faSliders;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faHandshake = faHandshake

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private translate = inject(TranslateService);
  private readonly store = inject(Store<GamesState>);
  language$: Observable<string>;
  games$: Observable<Array<ApiGame>>;
  userAnswers: Array<number> = [];
  scoredResults: Array<Game> = [];
  displayedResults: Array<Game> = [];
  numberOfResults: number = 10;

  userInputLocationIds: Array<number> = [];
  userInputPlayerCountIds: Array<number> = [];
  userInputDifficultyIds: Array<number> = [];
  userInputPlayTimeIds: Array<number> = [];
  userInputGameTypeIds: Array<number> = [];
  userInputConflictIds: Array<number> = [];
  userInputPlayerAgeIds: Array<number> = [];
  userInputTextIds: Array<number> = [];
  userInputReleasesIds: Array<number> = [];

  userInputDifficultyPriority: boolean = false;
  userInputPlayTimePriority: boolean = false;
  userInputGameTypePriority: boolean = false;
  userInputConflictPriority: boolean = false;
  userInputPlayerAgePriority: boolean = false;
  userInputTextPriority: boolean = false;
  userInputReleasesPriority: boolean = false;

  /*
  While this part takes care of providing all information to the results overview page,
  it also includes the logic for filtering and scoring games. Ideally, the should be
  moved to a dedicated service to take care of all the calculations and rearranging the games.

  To save time and put the solution to work, everything is kept in 1 place (for the time being).
  The overall scoring scheme is based on the input of the quetionnaire part:
  ( 1) Location (values 0-6)
  ( 2) Club Membership (values 10=member, 11=not a member => location ID +100)
  ( 3) Number of players (values 20-26: 1, 2, 3, 4, 5, 6, 7+ players)
  ( 4) Difficulty level (values 30-34, increasing difficulty)
  ( 5) Play time (values 40-44, increasing time, to be multiplied by 1.25 for more realistic values)
  ( 6) Game type (values 50-56)
  ( 7) Koop/Teams/Competitive (values 60-62)
  ( 8) Age groups (values 70-73, kid games to more adult games)
  ( 9) Language dependency / amount of text (values 80-84)
  (10) Up to date/latest releases preferred (90-91)
  (11) relevance highlighting = question ID +1000

  */

  private locationMap = [
    {id: 0, value: 'JO&JOE Offenes Regal'},
    {id: 1, value: 'Gleis//Garten offenes Regal'},
    {id: 2, value: 'Paradice am See'},
    {id: 3, value: 'Paradice Boardgame Store'},
    {id: 4, value: 'Superbude offenes Regal'},
    {id: 5, value: 'Tischlerei'},
    {id: 6, value: 'Paradice im Zweiten'},
    {id: 100, value: 'JO&JOE Regal im 6. Stock'},
    {id: 101, value: 'Gleis//Garten verschlossenes Regal'},
    // {id: 102, value: 'Kein verschlossenes Regal am See'},
    // {id: 103, value: 'Kein verschlossenes Regal im Store'},
    {id: 104, value: 'Superbude verschlossenes Regal'},
    // {id: 105, value: 'verschlossenes Regal Tischlerei?'},
    // {id: 106, value: 'Kein verschlossenes Regal im Zweiten'}
    {id: 666, value: 'Personal Collection'}
  ];

  private playerCountMap = [
    {id: 20, value: 1},
    {id: 21, value: 2},
    {id: 22, value: 3},
    {id: 23, value: 4},
    {id: 24, value: 5},
    {id: 25, value: 6}
    // 7+
  ]

  private difficultyMap = [
    {id: 30, value: 1, str: 'pages.results.gameEntry.difficulty.1'},
    {id: 31, value: 2, str: 'pages.results.gameEntry.difficulty.2'},
    {id: 32, value: 3, str: 'pages.results.gameEntry.difficulty.3'},
    {id: 33, value: 4, str: 'pages.results.gameEntry.difficulty.4'},
    {id: 34, value: 5, str: 'pages.results.gameEntry.difficulty.5'}
  ]

  private playTimeMap = [
    {id: 40, value: 1, max: 45},
    {id: 41, value: 2, min: 45, max: 90},
    {id: 42, value: 3, min: 90, max: 120},
    {id: 43, value: 4, min: 120, max: 180},
    {id: 44, value: 5, min: 180}
  ]

  private langDependencyMap = [
    {id: 80, value: 1},
    {id: 81, value: 2},
    {id: 82, value: 3},
    {id: 83, value: 4},
    {id: 84, value: 5}
  ]

  private gameTypeMap = [
    {id: 50, value: "familygames"},
    {id: 51, value: "strategygames"},
    {id: 52, value: "thematic"},
    {id: 53, value: "partygames"},
    {id: 54, value: "childrensgames"},
    {id: 55, value: "abstracts"},
    {id: 56, value: "wargames"}
  ]

  // cooperative? 1=coop, 0=team-based, -1=competitive
  private gameConflictMap = [
    {id: 60, value: 1},
    {id: 61, value: 0},
    {id: 62, value: -1}
  ]


  private ageGroupMap = [
    {id: 70, minimum: 0, maximum: 8},
    {id: 70, minimum: 9, maximum: 13},
    {id: 70, minimum: 14, maximum: 17},
    {id: 70, minimum: 18, maximum: 150}
  ]

  private personalCollectionId: string = '';


  constructor() {
    this.language$ = this.store.select(selectLanguage)
    this.translate.addLangs(['de', 'en']);
    this.translate.setFallbackLang('de');
    this.translate.use('de'); // default

    this.games$ = this.store.select(gameFeatures.selectGames);

    const snapshot = this.route.snapshot;
    console.log({queryParams: snapshot.queryParams});
    
    this.route.snapshot.queryParamMap.get('answers')?.split('-').forEach(id => this.userAnswers.push(parseInt(id)));
    const pqParam = this.route.snapshot.queryParamMap.get('personalCollection')
    this.personalCollectionId = pqParam ? pqParam : '';
    this.assignUserInput(this.userAnswers);
    this.filterGames();
  }

  filterGames() {

    this.games$.subscribe(games => {
        console.log('Initially: ', games.length)

        if (games.length == 0) {
          this.router.navigateByUrl('/'); // currently, there's no support for a page refresh
        } else {
          this.scoredResults = []
          games.forEach(game => {
            this.scoredResults.push(new Game(game.id, game.name, game.current_year, game.descriptions, game.difficulty_category, game.diffculty_limiters, game.game_mechanics, game.game_themes,
              game.is_cooperative, game.language_dependency_group, game.languages, game.location, game.min_players, game.max_players, game.play_time_multiplier, game.playing_time_category, game.rating,
              game.recommended_player_numbers, game.release_group, game.thumbnail, game.year_published, game.restricted, game.types, game.min_age
            ))
          });

          this.scoredResults = this.filterLocation(this.scoredResults, this.userInputLocationIds);
          // possible enhancement: use recommended_player_numbers for sorting
          this.scoredResults = this.filterPlayerCount(this.scoredResults, this.userInputPlayerCountIds);

          this.scoredResults = this.removeDuplicates(this.scoredResults);
          console.log('After player count filter: ', this.scoredResults.length)

          this.scoredResults.forEach(game => {
            game.score = this.scoreByTable(game.rating, game.difficulty, this.userInputDifficultyIds, this.difficultyMap, this.userInputDifficultyPriority);
            game.score = this.scoreByTable(game.score, game.playingTimeCategory, this.userInputPlayTimeIds, this.playTimeMap, this.userInputPlayTimePriority);
            
            game.score = this.scoreByCategory(game.score, game.types, this.userInputGameTypeIds, this.userInputGameTypePriority);
            game.score = this.scoreByGameConflictType(game.score, game.isCooperative, this.userInputConflictIds, this.userInputConflictPriority);
            game.score = this.scoreByAgeGroup(game.score, game.minAge, this.userInputPlayerAgeIds, this.userInputPlayerAgePriority);

            game.score = this.scoreByTable(game.score, game.languageDependent, this.userInputTextIds, this.langDependencyMap, this.userInputTextPriority);
            game.score = this.scoreByReleaseDate(game.score, game.yearPublished, this.userInputReleasesIds.indexOf(90) >= 0, this.userInputReleasesPriority);
          });

          this.scoredResults = this.removeDuplicates(this.scoredResults);
          // sorting by score, descending order
          this.scoredResults = this.scoredResults.sort(function(a, b){
            return a.score < b.score ? 1 : a.score > b.score ? -1 : 0;
          })

          this.displayedResults = this.scoredResults.splice(0, this.numberOfResults);
        }
      });
  }


  assignUserInput(userInputIds: Array<number>) {
    const isMember = userInputIds.indexOf(10) >= 0; // -1 if value not present

    userInputIds.forEach(inputId => {
      // leaving some smaller margins for potential future extension
      if ((0 <= inputId && inputId <= 9) || inputId == 666) {
        this.userInputLocationIds.push(inputId);
        if (isMember) {
          this.userInputLocationIds.push(inputId + 100)
        }
      } else if (isMember && 100 <= inputId && inputId <= 109) {
        this.userInputLocationIds.push(inputId);
      } else if (20 <= inputId && inputId <= 29) {
        this.userInputPlayerCountIds.push(inputId);
      } else if (30 <= inputId && inputId <= 39) {
        this.userInputDifficultyIds.push(inputId);
      } else if (40 <= inputId && inputId <= 49) {
        this.userInputPlayTimeIds.push(inputId);
      } else if (50 <= inputId && inputId <= 59) {
        this.userInputGameTypeIds.push(inputId);
      } else if (60 <= inputId && inputId <= 69) {
        this.userInputConflictIds.push(inputId);
      } else if (70 <= inputId && inputId <= 79) {
        this.userInputPlayerAgeIds.push(inputId);
      } else if (80 <= inputId && inputId <= 89) {
        this.userInputTextIds.push(inputId);
      } else if (90 <= inputId && inputId <= 99) {
        this.userInputReleasesIds.push(inputId);
      } else if (inputId == 1003) {
        this.userInputDifficultyPriority = true;
      } else if (inputId == 1004) {
        this.userInputPlayTimePriority = true;
      } else if (inputId == 1005) {
        this.userInputGameTypePriority = true;
      } else if (inputId == 1006) {
        this.userInputConflictPriority = true;
      } else if (inputId == 1007) {
        this.userInputPlayerAgePriority = true;
      } else if (inputId == 1008) {
        this.userInputTextPriority = true;
      } else if (inputId == 1009) {
        this.userInputReleasesPriority = true;
      }
    });
  }

  
  filterLocation(games: Array<Game>, locationIds: Array<number>) {
    //let openLocationNames: Array<string> = [];
    //let restrictedLocationName = '';
    let eligibleGames: Array<Game> = [];
    
    // all available location IDs incl. membership are pre-assigned
    locationIds.forEach(userInputLocationId => {
      // lookup table for all available locations for name parsing
      this.locationMap.forEach(location => {
        if (location.id == userInputLocationId) {
          // retrieve JSON input data location name based on the selected input
          if (location.id == 666) {
            location.value = this.personalCollectionId;
          }
          console.log('Location', location.value)
          eligibleGames.push(... games.filter( game => game.paradiceLocation == location.value))
        }
      });
    });

    console.log('Location games: ' + eligibleGames.length)
    // return the total of both lists
    return eligibleGames;
  }

  filterPlayerCount(games: Array<Game>, playerCountIds: Array<number>) {
    let eligibleGames: Array<Game> = [];
    playerCountIds.forEach(playerCountId => {
      this.playerCountMap.forEach(playerCountMapping => {
        if (playerCountMapping.id == playerCountId) {
          if (playerCountId >= 20 && playerCountId < 26) {
            const playerCount = this.getPlayerCount(playerCountId);
            eligibleGames.push(... games.filter(filteredGames => filteredGames.minPlayers <= playerCount && filteredGames.maxPlayers >= playerCount));
          } else if (playerCountId == 26) {
            const minPlayerCount = 7;
            eligibleGames.push(... games.filter(filteredGames => filteredGames.minPlayers <= minPlayerCount));
            console.log('Adding games for 7+ players. Total games: ' + eligibleGames.length)
          }        
        }
      });
    });
    return eligibleGames;
  }

  removeDuplicates(games: Array<Game>) {
    const withoutDuplicates = (arr: Game[]): Game[] => {
        return games.filter((item,
            index) => arr[index].id === item.id && arr.indexOf(item) === index);
        }
    return withoutDuplicates(games);
  }
  

  getPlayerCount(answerId: number): number {
    let playerCount = -1;
    this.playerCountMap.forEach(element => {
      if (element.id == answerId) {
        playerCount = element.value
      }
    });
    return playerCount;
  }
  

  getPlayTimeString(category: number) {
    let playTimeStr = ''
    this.playTimeMap.forEach(element => {
      if (element.value == category) {
        if (element.min && element.max) {
          playTimeStr = element.min + ' - ' + element.max + ' ' + this.translate.instant('pages.results.gameEntry.playTime.minutes');
        } else if (!element.min && element.max) {
          playTimeStr = this.translate.instant('pages.results.gameEntry.playTime.upTo') + ' ' + element.max + ' ' + this.translate.instant('pages.results.gameEntry.playTime.minutes');
        } else if (element.min && !element.max) {
          playTimeStr = this.translate.instant('pages.results.gameEntry.playTime.moreThan') + ' ' + element.min + ' ' + this.translate.instant('pages.results.gameEntry.playTime.minutes');
        }
      }
    });
    return playTimeStr;
  }


  getDifficultyString(category: number) {
    let difficultyStr = ''
    this.difficultyMap.forEach(element => {
      if (element.value == category) {
        difficultyStr = this.translate.instant(element.str);
      }
    });
    return difficultyStr;
  }

  getTranslatedGameTypeString(gameTypes: Array<string>) {
    let translatedGameTypes = '';
    gameTypes.forEach(gameType => {
      if (translatedGameTypes != '') {
        translatedGameTypes += ', ';
      }
      translatedGameTypes += this.translate.instant('pages.results.gameEntry.gameTypes.' + gameType);
    });
    return translatedGameTypes
  }

  getTranslatedLanguageString(languages: Array<string>) {
    let translatedLanguages = '';
    languages.forEach(language => {
      if (translatedLanguages != '') {
        translatedLanguages += ', ';
      }
      translatedLanguages += this.translate.instant('pages.results.gameEntry.languages.' + language.toLowerCase())
    });
    return translatedLanguages;
  }

  isScoringRelevant(userInput: number, reference: Array<{id: number, value: boolean}>) {
    let isRelevant = false;
    reference.forEach(element => {
      if (userInput == element.id)
        isRelevant = element.value;
    });
    return isRelevant;
  }

  // reduces a game store based on the user input
  // the further the distance to the picked values, the harsher the score deduction
  // FYI: the priorities of a certain selection are already part of the input
  scoreByDeviation(gameScore: number, distance: number, punishment: number, genericPunishmentFactor: number = 1.4) {
    return gameScore - (distance * punishment * genericPunishmentFactor);
  }


  scoreByTable(gameScore: number, gameAttribute: number, userInputIds: Array<number>, 
    table: Array<{id: number, value: number}>, isPriority: boolean) {
      // debugger;
      if (userInputIds.length == 0) {
        return gameScore;
      }
      if (gameAttribute < 0) {
        // maximum punishment, assuming the other end of the table
        return this.scoreByDeviation(gameScore, table.length-1, isPriority ? 2 : 1);
      }
      let distance = -1;
      userInputIds.forEach(optionId => {
        const tableReference = table.find((element) => element.id == optionId)?.value;
        const property: number = tableReference ? tableReference : 0;
        const currentOptionDistance = Math.abs(property-gameAttribute)
        if (distance < 0 || distance > currentOptionDistance) {
          // get minimum distance to any of the selected options
          distance = currentOptionDistance;
        }
      });
      return this.scoreByDeviation(gameScore, distance, isPriority ? 2 : 1);
  }


  scoreByCategory(gameScore: number, gameTypes: Array<string>, userInputIDs: Array<number>, isPriority: boolean) {
    let isMatchingCategory = false;
    userInputIDs.forEach(optionId => {
      const optionValue = this.gameTypeMap.find((element) => element.id == optionId)?.value;
      if (optionValue) {
        gameTypes.forEach(gameType => {
          if (optionValue === gameType) {
            // match found, no punishment for score
            isMatchingCategory = true;
          }
        });
      }
    });
    return isMatchingCategory ? gameScore : this.scoreByDeviation(gameScore, 1, isPriority ? 2 : 1, 1.5);
  }

  scoreByGameConflictType(gameScore: number, gameConflictVariant: number, userInputIds: Array<number>, isPriority: boolean) {
    let distance = -1;
    const shiftedConflictReference = gameConflictVariant + 1; // -1 to 1 ranged shifted to 0-2
    userInputIds.forEach(optionId => {
      const tableReference = this.gameConflictMap.find((element) => element.id == optionId)?.value;
      const property: number = tableReference ? tableReference + 1 : -3;
      const currentOptionDistance = property >= 0 ? Math.abs(property-shiftedConflictReference) : property
      if (distance < 0 || distance > currentOptionDistance) {
        distance = currentOptionDistance;
      }
    });
    return this.scoreByDeviation(gameScore, distance, isPriority ? 2 : 1, 2.50)
  }

  scoreByAgeGroup(gameScore: number, gameMinAge: number, userInputIds: Array<number>, isPriority: boolean) {
    let isMatchingAge = false;
    let distance = -10; // arbitrary value
    userInputIds.forEach(optionId => { 
      const optionReference = this.ageGroupMap.find((element) => element.id == optionId);
      if (optionReference) {
        const minAge = optionReference.minimum;
        const maxAge = optionReference.maximum;

        if (minAge <= gameMinAge && gameMinAge <= maxAge) {
          isMatchingAge = true;
        } else if (!isMatchingAge) {
          const currentOptionDistance = Math.min(Math.abs(gameMinAge - minAge), Math.abs(gameMinAge - maxAge));
          if (distance < 0 || distance > currentOptionDistance) {
            distance = currentOptionDistance;
          }
        }
      }
    });

    if (isMatchingAge) {
      return gameScore;
    }
    const punishmentImpactFactor = 2;
    return this.scoreByDeviation(gameScore, distance, isPriority ? 2 : 1, punishmentImpactFactor);
  }

  scoreByReleaseDate(gameScore: number, gameReleaseYear: number, preferNewGames: boolean, isPriority: boolean) {
    if (!preferNewGames) {
      return gameScore;
    }
    const defaultFactor = 0.4;
    let deviationFactor = isPriority ? 2*defaultFactor : defaultFactor;
    return gameScore - (((new Date()).getFullYear() - gameReleaseYear) * deviationFactor);
  }


  loadMore() {
    this.displayedResults.push(...this.scoredResults.splice(0, this.numberOfResults));
    // DEBUGGING LOGS
    //console.log(this.numberOfResults);
    //console.log(this.scoredResults);
    //console.log(this.displayedResults);
  }

  toggleDescription(gameId: string, expand: boolean) {
    let expandDiv = document.getElementById(gameId);
    let parentContainer = expandDiv?.parentElement;
    if (!expand) { // collapse
      parentContainer?.classList.remove('active');
      parentContainer?.nextElementSibling?.classList.remove('expand');
    } else { // expand
      parentContainer?.classList.add('active')
      parentContainer?.nextElementSibling?.classList.add('expand');
    }
  }

}
