const stylelint = require("stylelint/lib/standalone");

import { IMutationsProvider, IMutationsWave } from "automutate/lib/mutationsProvider";

import { MutationsGrouper } from "./processing/mutationsGrouper";
import { MutationsProcessor } from "./processing/mutationsProcessor";
import { IFileFactory, FileFactory } from "./processing/fileFactory";
import { ILocalFileMutations, IStylelintFileResult, IStylelintSettings } from "./stylelint";

/**
 * Settings to initialize a new StylelintMutationsProvider.
 */
export interface IStylelintMutationsProviderSettings {
    /**
     * Reads file contents.
     */
    fileFactory?: IFileFactory;

    /**
     * Settings to run stylelint.
     */
    stylelintSettings: IStylelintSettings;
}

/**
 * Provides waves of stylelint failure fixes as file mutations.
 */
export class StylelintMutationsProvider implements IMutationsProvider {
    /**
     * Groups stylelint file results into local file mutation suggestions.
     */
    private readonly mutationsGrouper: MutationsGrouper = new MutationsGrouper();

    /**
     * Converts stylelint's local file mutations into automutate file mutations.
     */
    private readonly mutationsProcessor: MutationsProcessor;

    /**
     * Settings to run stylelint.
     */
    private readonly stylelintSettings: IStylelintSettings;

    /**
     * Initializes a new instance of the StylelintMutationsProvider class.
     * 
     * @param settings   Settings to run stylelint.
     */
    public constructor(settings: IStylelintMutationsProviderSettings) {
        this.stylelintSettings = {
            ...settings.stylelintSettings,
            formatter: "json",
            suggestFixes: true
        };

        this.mutationsProcessor = new MutationsProcessor(settings.fileFactory || new FileFactory());
    }

    /**
     * @returns A Promise for a wave of file mutations.
     */
    public async provide(): Promise<IMutationsWave> {
        const stylelintOutput: any = await stylelint(this.stylelintSettings);

        const complaints = stylelintOutput.results
            .filter((result: IStylelintFileResult): boolean => !!result.warnings.length);

        const localMutations: ILocalFileMutations | undefined = this.mutationsGrouper.groupFileResults(complaints);
        if (!localMutations) {
            return {};
        }

        return {
            fileMutations: await this.mutationsProcessor.processLocalMutations(localMutations)
        };
    }
}
