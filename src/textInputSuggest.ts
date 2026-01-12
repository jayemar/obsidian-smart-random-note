import { AbstractInputSuggest, App } from 'obsidian';

export abstract class TextInputSuggest<T> extends AbstractInputSuggest<T> {
    protected textInputEl: HTMLInputElement;

    constructor(app: App, textInputEl: HTMLInputElement) {
        super(app, textInputEl);
        this.textInputEl = textInputEl;
    }

    abstract getSuggestions(query: string): T[];
    abstract renderSuggestion(value: T, el: HTMLElement): void;
    abstract selectSuggestion(value: T, evt: MouseEvent | KeyboardEvent): void;
}
