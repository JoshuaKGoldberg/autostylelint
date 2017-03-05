import { IMutation } from "automutate/lib/mutation";
import { IFileMutations } from "automutate/lib/mutationsProvider";

import { ILocalMutation, ILocalFileMutations } from "../stylelint";
import { IFileFactory } from "./fileFactory";
import { PositionResolver } from "./positionResolver";

/**
 * Converts a file's local mutations into automutate file mutations.
 */
export class MutationsProcessor {
    /**
     * Converts stylelint's local positions to automutate's absolute positions.
     */
    private readonly positionResolver: PositionResolver = new PositionResolver();

    /**
     * Reads file contents.
     */
    private readonly fileFactory: IFileFactory;

    /**
     * Initializes a new instance of the MutationsProcessor class.
     * 
     * @param fileFactory   Reads file contents.
     */
    public constructor(fileFactory: IFileFactory) {
        this.fileFactory = fileFactory;
    }

    /**
     * Converts local file mutations to their absolute equivalents.
     * 
     * @param localMutations   Local mutation suggestions for a file.
     * @returns A Promise for the mutations' absolute equivalents.
     */
    public async processLocalMutations(localMutations: ILocalFileMutations): Promise<IFileMutations> {
        const output: IFileMutations = {};

        for (const fileName in localMutations) {
            output[fileName] = await Promise.all(
                localMutations[fileName]
                    .map(async (localMutation: ILocalMutation): Promise<IMutation> => {
                        return await this.processLocalMutation(fileName, localMutation);
                    }));
        }

        return output;
    }

    /**
     * Processes a local mutation into its absolute equivalent.
     * 
     * @param fileName   Name of the mutation's file.
     * @param localMutations   Local mutation suggestions for the file.
     * @returns A Promise for the mutations' absolute equivalents.
     */
    private async processLocalMutation(fileName: string, localMutation: ILocalMutation): Promise<IMutation> {
        const fileContents: string = await this.fileFactory.provide(fileName);
        const fileLines: string[] = fileContents.match(/[^\n]+(?:\r?\n|$)/g) || [];

        return {
            ...localMutation,
            range: this.positionResolver.convertLocalRangeToAbsolute(fileLines, localMutation.range)
        };
    }
}
