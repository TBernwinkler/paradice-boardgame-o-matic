import { min } from "rxjs";

export class Descriptions {
    DE: string;
    EN: string;

    constructor(DE: string, EN: string) {
        this.DE = DE;
        this.EN = EN;
    }
}

export class ApiGame {
    id: string;
    name: string;
    current_year: number;
    descriptions: Descriptions;
    difficulty_category: number;
    diffculty_limiters: Array<number>;
    game_mechanics: Array<string>;
    game_themes: Array<string>;
    is_cooperative: number;
    language_dependency_group: number;
    languages: Array<string>;
    location: string;
    min_players: number;
    max_players: number;
    play_time_multiplier: number;
    playing_time_category: number;
    rating: number;
    recommended_player_numbers: Array<number>;
    release_group: number;
    thumbnail: string;
    year_published: number;
    restricted: boolean;
    types: Array<string>;
    min_age: number;

    constructor(id: string, name: string, current_year: number, descriptions: Descriptions,  difficulty_category: number, diffculty_limiters: Array<number>, game_mechanics: Array<string>,
        game_themes: Array<string>, is_cooperative: number, language_dependency_group: number, languages: Array<string>, location: string, min_players: number, max_players: number,
        play_time_multiplier: number, playing_time_category: number, rating: number, recommended_player_numbers: Array<number>, release_group: number, thumbnail: string, 
        year_published: number, restricted: boolean, types: Array<string>, min_age: number) {
            this.id = id;
            this.name = name;
            this.current_year = current_year;
            this.descriptions = descriptions;
            this.difficulty_category = difficulty_category;
            this.diffculty_limiters = diffculty_limiters;
            this.game_mechanics = game_mechanics;
            this.game_themes = game_themes;
            this.is_cooperative = is_cooperative;
            this.language_dependency_group = language_dependency_group;
            this.languages = languages;
            this.location = location;
            this.min_players = min_players;
            this.max_players = max_players;
            this.play_time_multiplier = play_time_multiplier;
            this.playing_time_category = playing_time_category;
            this.rating = rating;
            this.recommended_player_numbers = recommended_player_numbers;
            this.release_group = release_group;
            this.thumbnail = thumbnail;
            this.year_published = year_published;
            this.restricted = restricted;
            this.types = types;
            this.min_age = min_age;
        }
}


export class Game {
    id: string;
    name: string;
    descriptions: Descriptions;
    currentYear: number;
    difficulty: number;
    difficultyThresholds: Array<number>;
    mechanics: Array<string>;
    themes: Array<string>;
    isCooperative: number; // 1=coop; 0=team-based; -1=competitive
    languageDependent: number;
    languages: Array<string>;
    paradiceLocation: string;
    minPlayers: number;
    maxPlayers: number;
    playTimeMultiplier: number;
    playingTimeCategory: number;
    rating: number;
    recommendedPlayerNumbers: Array<number>;
    releaseGroup: number;
    thumbnailUrl: string;
    yearPublished: number;
    score: number;
    restricted: boolean;
    types: Array<string>;
    minAge: number;

    // using the python generated JSON property names for the constructor to make the mapping clear
    constructor(id: string, name: string, current_year: number, descriptions: Descriptions, difficulty_category: number, difficulty_limiters: Array<number>, 
        game_mechanics: Array<string>, game_themes: Array<string>, is_cooperative: number, language_dependency_group: number, languages: Array<string>, location: string, 
        min_players: number, max_players: number, play_time_multiplier: number, playing_time_category: number, rating: number, recommended_player_numbers: Array<number>,
        release_group: number, thumbnail: string, year_published: number, restricted: boolean, types: Array<string>, min_age: number) {
        this.id = id;
        this.name = name
        this.currentYear = current_year;
        this.descriptions = descriptions;
        this.difficulty = difficulty_category;
        this.difficultyThresholds = difficulty_limiters;
        this.mechanics = game_mechanics;
        this.themes = game_themes;
        this.isCooperative = is_cooperative;
        this.languageDependent = language_dependency_group;
        this.languages = languages;
        this.paradiceLocation = location;
        this.minPlayers = min_players;
        this.maxPlayers = max_players;
        this.playTimeMultiplier = play_time_multiplier;
        this.playingTimeCategory = playing_time_category;
        this.rating = rating;
        this.recommendedPlayerNumbers = recommended_player_numbers;
        this.releaseGroup = release_group;
        this.thumbnailUrl = thumbnail;
        this.yearPublished = year_published;
        this.restricted = restricted;
        this.score = 0;
        this.types = types;
        this.minAge = min_age;
    }
}