import { AnswerOption } from "./answer.option";

export class SurveyEntry {
    public id: number;
    public headline: string;
    public headlineIcon: string;
    public question: string;
    public options: Array<AnswerOption>; // todo: selected option <-> number eval etc.
    public priority: boolean;
    public canMultiSelect: boolean;
    public multiSelectLabel: string;
    public canSkip: boolean;
    public canPrioritize: boolean;
    public isPrioritized: boolean;
    public priorityLabel: string;

    constructor(id: number, headline: string, headlineIcon: string, question: string, options: Array<AnswerOption>,
        canMultiSelect: boolean, multiSelectLabel: string, canSkip: boolean, canPrioritize: boolean,
        isPrioritized: boolean, priorityLabel: string

    ) {
        this.id = id;
        this.headline = headline;
        this.headlineIcon = headlineIcon;
        this.question = question;
        this.priority = false;
        this.options = options;
        this.canMultiSelect = canMultiSelect;
        this.multiSelectLabel = multiSelectLabel;
        this.canSkip = canSkip;
        this.canPrioritize = canPrioritize;
        this.isPrioritized = isPrioritized;
        this.priorityLabel = priorityLabel;
    }
}
