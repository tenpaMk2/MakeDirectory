import * as fs from "fs/promises";
import path from "path";
import { Command } from 'commander/esm.mjs';

// config
const regex = /^(.+)(\ -\ )/g;
const regIdx = 1;

// argument parse
const program = new Command();
program.requiredOption('-i, --input <path>', 'input path');
program.parse(process.argv);

const options = program.opts();
const targetRoot = path.resolve(options.input);
console.log(`targetRoot: ${targetRoot}`);

// main
const main = async () => {
  let userNameWithDupes = [];

  const extractUserName = (dirEnt) => {
    if (dirEnt.isDirectory()) {
      return;
    }

    let nameParts = [...dirEnt.name.matchAll(regex)];
    if (nameParts.length === 0) {
      console.warn(`unexpected file: ${dirEnt.name}`);
      return;
    }

    userNameWithDupes.push(nameParts[0][regIdx]);
  };

  const makeUserNameDir = async (userName) => {
    const targetPath = path.join(targetRoot, userName);
    await fs.mkdir(targetPath, { recursive: true });
    console.log(`${targetPath}`);
  };

  try {
    // read all files and directories.
    const files = await fs.readdir(targetRoot, { withFileTypes: true });

    // extract user name from files(ignore directories and unexpected file names).
    files.forEach(extractUserName);

    // delete duplication.
    const userNames = Array.from(new Set(userNameWithDupes));
    console.log(userNames);

    // create user names directories.
    for (const userName of userNames) {
      await makeUserNameDir(userName);
    }
  } catch (err) {
    console.error(err);
  }
};

main();
