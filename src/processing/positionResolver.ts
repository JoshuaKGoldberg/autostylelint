import { IMutationRange } from "automutate/lib/mutation";

import { ILocalPosition, ILocalMutationRange } from "../stylelint";

/**
 * Converts stylelint's local positions to automutate's absolute positions.
 */
export class PositionResolver {
    /**
     * Converts a local file range to its absolute equivalent.
     * 
     * @param fileLines   Source lines from the source file.
     * @param localRange   Local range of for a mutation.
     * @returns Absolute mutation range equivalent.
     */
    public convertLocalRangeToAbsolute(fileLines: string[], localRange: ILocalMutationRange): IMutationRange {
        const begin: number = this.convertLocalPositionToAbsolute(fileLines, localRange.begin);
        const end: number = localRange.end
            ? this.convertLocalPositionToAbsolute(fileLines, localRange.end)
            : begin;

        return { begin, end };
    }

    /**
     * Converts a local file range to its absolute equivalent.
     * 
     * @param fileLines   Source lines from the source file.
     * @param localRange   Local position of for a mutation offset.
     * @returns Absolute mutation offset equivalent.
     */
    private convertLocalPositionToAbsolute(fileLines: string[], localPosition: ILocalPosition): number {
        let absolutePosition: number = 0;

        for (let i: number = 0; i < localPosition.line - 1; i += 1) {
            absolutePosition += fileLines[i].length;
        }

        absolutePosition += localPosition.column - 1;
        return absolutePosition;
    }
}
