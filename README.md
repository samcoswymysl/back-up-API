back-up-API
const directoryToCopy = here enter the path to the directory you want to move to another place or check if no new files have been added to it, e.g. C\\windows\\system
const targetPath =  here enter the path to the place where you want your copy to be saved, or where there is a copy to be completed, e.g. D\\copy


A simple project written in node.js allows you to make a backup or check the existing one.

    It does not delete any files, it only checks for a file with that name at the given path. If such a file / directory exists, it is skipped, unless a copy of it is made while preserving the directory structure
