export class AnswerOption {
    public id: number;
    public value: string;
    public selected: boolean;
    public priority: boolean;

    constructor(id: number, value: string, selected: boolean, priority: boolean = false) {
        this.id = id;
        this.value = value;
        this.selected = selected;
        this.priority = priority
    }   
}
