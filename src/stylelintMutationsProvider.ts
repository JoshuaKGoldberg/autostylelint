const stylelint = require("stylelint/lib/standalone");

import { IMutation } from "automutate/lib/mutation";
import { IFileMutations, IMutationsProvider, IMutationsWave } from "automutate/lib/mutationsProvider";

import { IStylelintFileResult, IStylelintSettings, IStylelintWarning } from "./stylelint";

/**
 * Provides waves of stylelint failure fixes as file mutations.
 */
export class StylelintMutationsProvider implements IMutationsProvider {
    /**
     * Settings to run stylelint.
     */
    private readonly settings: IStylelintSettings;

    /**
     * Initializes a new instance of the StylelintMutationsProvider class.
     * 
     * @param settings   Settings to run stylelint.
     */
    public constructor(settings: IStylelintSettings) {
        this.settings = {
            ...settings,
            formatter: "json",
            suggestFixes: true
        };
    }

    /**
     * @returns A Promise for a wave of file mutations.
     */
    public async provide(): Promise<IMutationsWave> {
        const stylelintOutput: any = await stylelint(this.settings);

        const complaints = stylelintOutput.results
            .filter((result: IStylelintFileResult): boolean => !!result.warnings.length);

        return {
            fileMutations: this.groupMutationsByFiles(complaints)
        };
    }

    /**
     * Groups stylelint complaints into file mutations.
     * 
     * @param complaints   File complaints from stylelint.
     * @returns File-grouped complaints, if any.
     */
    private groupMutationsByFiles(fileResults: IStylelintFileResult[]): IFileMutations | undefined {
        if (!fileResults.length) {
            return undefined;
        }

        const fileMutations: IFileMutations = {};
        let hadSuggestions: boolean = false;

        for (const fileResult of fileResults) {
            const suggestedFixes: IMutation[] = fileResult.warnings
                .filter((warning: IStylelintWarning): boolean => !!warning.suggestedFix)
                .map((warning: IStylelintWarning): IMutation => warning.suggestedFix!);

            if (suggestedFixes.length) {
                hadSuggestions = true;
                fileMutations[fileResult.source] = suggestedFixes;
            }
        }

        return hadSuggestions ? fileMutations : undefined;
    }
}
