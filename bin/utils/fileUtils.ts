import fs from "fs";
import {getLogger} from "./logConfig";

const log = getLogger("model.FileOperations")

export class FileOperations {
    checkIfPathExists = (absolutePath: string) => {
        log.debug(`Check if the path ${absolutePath} exists`);
        if(fs.existsSync(absolutePath)) {
            log.debug(`Given path ${absolutePath} is valid.`);
        } else {
            log.warn(`Given path ${absolutePath} is not valid`);
            return false;
        }
        return true;
    }

    removeFilesAndFolders = (absolutePath: string, recursive = true) => {
        if(this.checkIfPathExists(absolutePath)) {
            log.debug(`Remove the path ${absolutePath}`);
            fs.rmSync(absolutePath, {recursive});
            log.debug(`Remove the path ${absolutePath}`);
        }
    }
}

