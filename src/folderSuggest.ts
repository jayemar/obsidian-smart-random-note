import { App, TFolder } from 'obsidian';
import { TextInputSuggest } from './textInputSuggest';

export class FolderSuggest extends TextInputSuggest<TFolder> {
    constructor(app: App, textInputEl: HTMLInputElement) {
        super(app, textInputEl);
        this.limit = 50;
    }

    getSuggestions(query: string): TFolder[] {
        const folders: TFolder[] = this.app.vault.getAllFolders(false);

        if (!query || query.trim() === '') {
            return folders;
        }

        const lowerQuery = query.toLowerCase();

        return folders.filter(folder =>
            folder.path.toLowerCase().contains(lowerQuery)
        );
    }

    renderSuggestion(folder: TFolder, el: HTMLElement): void {
        el.createDiv({
            text: folder.path,
            cls: 'folder-suggest-item'
        });
    }

    selectSuggestion(folder: TFolder, _evt: MouseEvent | KeyboardEvent): void {
        this.textInputEl.value = folder.path;
        this.textInputEl.dispatchEvent(new Event('input', { bubbles: true }));
        this.textInputEl.dispatchEvent(new Event('blur', { bubbles: true }));
        this.close();
    }
}
