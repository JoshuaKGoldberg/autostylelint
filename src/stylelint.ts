import { IMutation } from "automutate/lib/mutation";

/**
 * Standalone settings to run stylelint.
 */
export interface IStylelintSettings {
    /**
     * Configuration options.
     */
    config: IStylelintConfig;

    /**
     * One or more files/directories to recursively scan.
     */
    files: string[];

    /**
     * How to format the results.
     */
    formatter?: string;

    /**
     * Whether to suggest fixes with results.
     */
    suggestFixes?: boolean;
}

/**
 * stylelint configuration options.
 */
export interface IStylelintConfig {
    /**
     * Enabled rule configurations, keyed by name.
     */
    rules: {
        [i: string]: any;
    };
}

/**
 * Results from linting a single file.
 */
export interface IStylelintFileResult {
    /**
     * Name of the file.
     */
    source: string;

    /**
     * Rule violations in the file.
     */
    warnings: IStylelintWarning[];
}

/**
 * A single warning for a linted file.
 */
export interface IStylelintWarning {
    /**
     * Starting column number of the complaint.
     */
    column: number;

    /**
     * Starting line number of the complaint.
     */
    line: number;

    /**
     * Rule that was violated.
     */
    rule: string;

    /**
     * Severity of the complaint.
     */
    severity: "warning" | "error";

    /**
     * Suggested mutation(s) to fix the complaint.
     */
    suggestedFix?: IMutation;

    /**
     * Verbose complaint message.
     */
    text: string;
};
