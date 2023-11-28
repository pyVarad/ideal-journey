import path from 'path';
import fs from 'fs';
import { FileOperations } from '../utils/fileUtils';
import { getLogger } from '../utils/logConfig';

const log = getLogger('model.RenamePackagePrefix')

const rootPath = path.join(__dirname, '..', '..');
const stencilPackagePath = path.join(rootPath, 'packages', 'stencil-library', 'src');
const angularPackagePath = path.join(rootPath, 'packages', 'angular-library', 'projects');
const fileOperations = new FileOperations();

/* Prefix and Packages to change. 
*  Rename the values accordingly to rebrand the outcome of stencil app.  
*/
const srcPrefix = 'pfx-';
const targetPrefix = 'nxs-';
const srcPackage = '@pfx/';
const targetPackage = '@nxs/';

export class BaseReBranding {
    replaceTagNamesOnFiles = [];
    replacePackageNamesOnFolders = [];

    getFilesRecursively = (directory: string) => {
        const filesInDirectory = fs.readdirSync(directory);
        for (const file of filesInDirectory) {
            const absolute = path.join(directory, file);
            if (fs.statSync(absolute).isDirectory()) {
                this.getFilesRecursively(absolute);
            } else {
                this.replaceTagNamesOnFiles.push(absolute);
            }
        }
    };

    makeDirectory = (dirPath: string, recursive = true) => {
        if (!fileOperations.checkIfPathExists(dirPath)) {
            fs.mkdirSync(dirPath, { recursive })
        }
    }

    writeFile = (absoluteFilePathWithName: string, data: string) => {
        if (!fileOperations.checkIfPathExists(absoluteFilePathWithName)) {
            fs.writeFileSync(absoluteFilePathWithName, data, { encoding: 'utf8', flag: 'w' });
        }
    }

    readFile = (absoluteFilePathWithName: string) => {
        let data = '';
        if (fileOperations.checkIfPathExists(absoluteFilePathWithName)) {
            data = fs.readFileSync(absoluteFilePathWithName, { encoding: 'utf8', flag: 'r' });
        }

        return data;
    }

    stringReplace = (data: string, matchPattern: string, replacePattern: string) => {
        const preFixStrPattern = new RegExp(matchPattern + `([a-zA-Z]+)`, 'g');

        return data.replaceAll(preFixStrPattern, `${replacePattern}$1`);
    }

    processFiles = (rootDirectory: string) => {
        this.getFilesRecursively(rootDirectory);

        // Rewrite files with new prefix.
        this.replaceTagNamesOnFiles.forEach(
            file => {
                const targetFilePath = this.stringReplace(file, srcPrefix, targetPrefix);
                this.makeDirectory(path.dirname(targetFilePath));
                let data = this.readFile(file);
                const preFixStrPattern = new RegExp(srcPackage, 'g');
                data = this.stringReplace(
                    data.replaceAll(preFixStrPattern, targetPackage),
                    srcPrefix,
                    targetPrefix
                );
                fileOperations.removeFilesAndFolders(file);
                this.writeFile(targetFilePath, data);
            }
        );

        // Remove migrated folders.
        this.replaceTagNamesOnFiles.sort((prev, next) => prev.length - next.length).reverse().forEach(
            file => {
                const baseDir = path.dirname(file);
                if (fileOperations.checkIfPathExists(baseDir)) {
                    const folderSize = fs.readdirSync(baseDir);
                    if (folderSize.length === 0) {
                        fileOperations.removeFilesAndFolders(baseDir);
                    }
                }
            }
        );

        // Replace package names.
        this.replacePackageNamesOnFolders.forEach(
            file => {
                let data = this.readFile(file);
                const preFixStrPattern = new RegExp(srcPackage, 'g');
                data = this.stringReplace(
                    data.replaceAll(preFixStrPattern, targetPackage),
                    srcPrefix,
                    targetPrefix
                );
                fileOperations.removeFilesAndFolders(file);
                this.writeFile(file, data);
            }
        );
    }

}


export class ProcessStencilPackage extends BaseReBranding {
    replacePackageNamesOnFolders = ['stencil.config.ts', 'package.json'].map(
        file => path.join(rootPath, 'packages', '-library', file)
    );
}

export class ProcessAngularPackage extends BaseReBranding {
    replacePackageNamesOnFolders = ['angular.json', 'package.json', 'tsconfig.json'].map(
        file => path.join(rootPath, 'packages', 'angular', file)
    );
}

/* Main Program */

const processStencilPackage = new ProcessStencilPackage();
processStencilPackage.processFiles(stencilPackagePath);

const processAngularPackage = new ProcessAngularPackage();
processAngularPackage.processFiles(angularPackagePath);