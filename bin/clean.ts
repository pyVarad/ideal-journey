import path from "path";
import { FileOperations } from "./utils/fileUtils";

const root = path.join(__dirname, '..');
const packagesFolder = path.join(root, 'packages');
const fileOperations = new FileOperations();

const cleanupFilesAndFolders = [
    path.join(root, 'node_modules'),
    path.join(root, 'yarn.lock'),
    path.join(packagesFolder, 'angular', 'dist'),
    path.join(packagesFolder, 'angular', 'node_modules'),
    path.join(packagesFolder, 'stencil', 'dist'),
    path.join(packagesFolder, 'stencil', 'node_modules'),
];

cleanupFilesAndFolders.forEach(
    filesOrFolder => fileOperations.removeFilesAndFolders(filesOrFolder)
)