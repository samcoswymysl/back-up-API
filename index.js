const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream').promises;
const fs = require('fs').promises;


const tableWithPatch = [];
const tabletToCopy = [];
const onlyUniquePatch = [];




const directoryToCopy = //your patch to files to copy
const targetPath =  //your patch to target


let counterFile = 0;
let counterDir = 0;

async function copyFile(fileToCopyPatch, destinationPath) {
  const readFile = createReadStream(fileToCopyPatch);
  const writeFile = createWriteStream(destinationPath);

  await pipeline(
    readFile,
    writeFile,
  );

}

async function checkContent(patch, boardWithPaths, originalPath) {
  try {
    const files = await fs.readdir(patch);
    for (const file of files) {
      const uniqiePath = `${patch}\\${file}`;
      const patchToTabel = uniqiePath.slice(originalPath.length);
      boardWithPaths.push(patchToTabel);
      const fileAndDirStats = await fs.lstat(uniqiePath);

      if (fileAndDirStats.isDirectory()) {
        await checkContent(uniqiePath, boardWithPaths, originalPath);
      }
    }
  } catch (err) {
    console.log(err);
  }
}


async function findUniFiles() {
  for (const elementToCopy of tableWithPatch) {
    const find = tabletToCopy.find((element) => element === elementToCopy);
    if (find === undefined) {
      onlyUniquePatch.push(elementToCopy);
    }
  }
}

async function bulidPatch() {
  for (const buildPatch of onlyUniquePatch) {
    const originalFilePath = directoryToCopy + buildPatch;
    const destinationPatch = targetPath + buildPatch;

    const test = await fs.lstat(originalFilePath);

    if (test.isDirectory()) {
      await fs.mkdir(destinationPatch);
      counterDir++
    } else {
      await copyFile(originalFilePath, destinationPatch);
      counterFile++
    }
  }

  console.log(`${counterFile} files and ${counterDir} directories were copied`);
}

async function main() {
  await checkContent(directoryToCopy, tableWithPatch, directoryToCopy);
  await checkContent(targetPath, tabletToCopy, targetPath);
  await findUniFiles();
  await bulidPatch();

}

main();
