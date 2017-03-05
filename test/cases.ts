import { TestsFactory } from "automutate-tests/lib/testsFactory";
import * as fs from "fs";

import { StylelintMutationsProvider } from "../lib/stylelintMutationsProvider";
import { fileContentsGetter } from "../lib/fileContentsGetter";

const testsFactory = new TestsFactory(
    (fileName: string, settingsFileName: string) => {
        const config = JSON.parse(fs.readFileSync(settingsFileName).toString());

        return new StylelintMutationsProvider({
            stylelintSettings: {
                config,
                files: [fileName]
            }
        });
    },
    {
        actual: "actual.css",
        expected: "expected.css",
        original: "original.css",
        settings: ".stylelintrc"
    });

testsFactory.describe(__dirname);
