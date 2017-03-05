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
    suggestedFix?: ILocalMutation;

    /**
     * Verbose complaint message.
     */
    text: string;
};

/**
 * Mutations to be applied to files, keyed by file name.
 * 
 * @remarks This mirrors the automutate IMutation, but with line and column positions.
 */
export interface ILocalFileMutations {
    [i: string]: ILocalMutation[];
}

/**
 * Description of a mutation to be applied to a file.
 * 
 * @remarks This mirrors the automutate IMutation, but with line and column positions.
 */
export interface ILocalMutation {
    /**
     * Character positions this affects.
     */
    range: ILocalMutationRange;

    /**
     * Unique type name identifying this mutation.
     */
    type: string;
}

/**
 * Character positions a mutation affects.
 * 
 * @remarks This mirrors the automutate IMutation, but with line and column positions.
 */
export interface ILocalMutationRange {
    /**
     * Inclusive character position this starts at.
     */
    begin: ILocalPosition;

    /**
     * Exclusive character position this ends at.
     */
    end?: ILocalPosition;
}

/**
 * 
 */
export interface ILocalPosition {
    /**
     * 
     */
    column: number;

    /**
     * 
     */
    line: number;
}
