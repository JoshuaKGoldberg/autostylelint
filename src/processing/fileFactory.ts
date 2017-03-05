import * as fs from "fs";

/**
 * Reads file contents.
 */
export interface IFileFactory {
    /**
     * Reads file contents.
     * 
     * @param fileName   Name of a file.
     * @returns A Promise for the contents of the file.
     */
    provide(fileName: string): Promise<string>;
}

/**
 * Reads file contents from disk.
 */
export class FileFactory implements IFileFactory {
    /**
     * Reads file contents from disk.
     * 
     * @param fileName   Name of a file.
     * @returns A Promise for the contents of the file.
     */
    public provide(fileName: string): Promise<string> {
        return new Promise((resolve, reject): void => {
            fs.readFile(fileName, (error: Error | undefined, data: Buffer): void => {
                error ? reject(error) : resolve(data.toString());
            });
        });
    }
}
