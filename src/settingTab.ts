import SmartRandomNotePlugin from './main';
import { PluginSettingTab, Setting } from 'obsidian';
import { FolderSuggest } from './folderSuggest';

export class SmartRandomNoteSettingTab extends PluginSettingTab {
    plugin: SmartRandomNotePlugin;

    constructor(plugin: SmartRandomNotePlugin) {
        super(plugin.app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        containerEl.createEl('h2', { text: 'Smart Random Note Settings ' });

        new Setting(containerEl)
            .setName('Open in New Leaf')
            .setDesc('Default setting for opening random notes')
            .addToggle((toggle) => {
                toggle.setValue(this.plugin.settings.openInNewLeaf);
                toggle.onChange(this.plugin.setOpenInNewLeaf);
            });

        new Setting(containerEl)
            .setName('Enable Ribbon Icon')
            .setDesc('Place an icon on the ribbon to open a random note from search')
            .addToggle((toggle) => {
                toggle.setValue(this.plugin.settings.enableRibbonIcon);
                toggle.onChange(this.plugin.setEnableRibbonIcon);
            });

        new Setting(containerEl)
            .setName('Directory Path')
            .setDesc('Limit random note selection to a specific directory and its subdirectories. Leave empty to use the entire vault. Example: "Projects/Work"')
            .addText((text) => {
                text.setPlaceholder('Leave empty for entire vault')
                    .setValue(this.plugin.settings.directoryPath || '')
                    .onChange(async (value) => {
                        this.plugin.settings.directoryPath = value;
                        await this.plugin.saveData(this.plugin.settings);
                    });

                text.inputEl.setAttribute('autocapitalize', 'none');
                text.inputEl.setAttribute('autocorrect', 'off');
                text.inputEl.setAttribute('autocomplete', 'off');
                text.inputEl.setAttribute('spellcheck', 'false');

                text.inputEl.addEventListener('blur', () => {
                    this.plugin.validateDirectoryPath(this.plugin.settings.directoryPath);
                });

                new FolderSuggest(this.app, text.inputEl);
            });
    }
}
