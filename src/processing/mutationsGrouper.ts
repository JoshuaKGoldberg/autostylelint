import { ILocalFileMutations, ILocalMutation, IStylelintFileResult, IStylelintWarning } from "../stylelint";

/**
 * Groups stylelint file results into local file mutation suggestions.
 */
export class MutationsGrouper {
    /**
     * Groups stylelint complaints into file mutations.
     * 
     * @param complaints   File complaints from stylelint.
     * @returns File-grouped complaints, if any.
     */
    public groupFileResults(fileResults: IStylelintFileResult[]): ILocalFileMutations | undefined {
        if (!fileResults.length) {
            return undefined;
        }

        const fileMutations: ILocalFileMutations = {};
        let hadSuggestions: boolean = false;

        for (const fileResult of fileResults) {
            const suggestedFixes: ILocalMutation[] = fileResult.warnings
                .filter((warning: IStylelintWarning): boolean => !!warning.suggestedFix)
                .map((warning: IStylelintWarning): ILocalMutation => warning.suggestedFix!);

            if (suggestedFixes.length) {
                hadSuggestions = true;
                fileMutations[fileResult.source] = suggestedFixes;
            }
        }

        return hadSuggestions ? fileMutations : undefined;
    }
}
