import { AutoMutator } from "automutate/lib/automutator";

import { StylelintMutationsProvider } from "./stylelintMutationsProvider";
import { IStylelintSettings } from "./stylelint";

/**
 * Runs autostylelint.
 */
export class Runner {
    /**
     * Settings to run stylelint.
     */
    private readonly settings: IStylelintSettings;

    /**
     * Initializes a new instance of the Runner class.
     * 
     * @param settings   Settings to run autostylelint.
     */
    public constructor(settings: IStylelintSettings) {
        this.settings = settings;
    }

    /**
     * @returns A Promise for running autostylelint.
     */
    public async run(): Promise<void> {
        const autoMutator: AutoMutator = new AutoMutator({
            mutationsProvider: new StylelintMutationsProvider({
                stylelintSettings: this.settings
            })
        });

        return autoMutator.run();
    }
}
