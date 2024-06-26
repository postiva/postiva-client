// checkUpdate.ts
import boxen from "boxen";
import chalk from "chalk";
import pkgJson from "package-json";
import semver from "semver";
import semverDiff from "semver-diff";

import { name, version } from "../../package.json";

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

let updateChecked = false;

export const checkUpdate = async () => {
  if (updateChecked) return;
  updateChecked = true;

  const { version: latestVersion } = await pkgJson(name);

  const updateAvailable = semver.lt(version, latestVersion as string);

  if (updateAvailable) {
    let updateType = "";

    let verDiff = semverDiff(version, latestVersion as string);

    if (verDiff) {
      updateType = capitalizeFirstLetter(verDiff);
    }

    const msg = {
      updateAvailable: `${updateType} update available ${chalk.dim(
        version
      )} → ${chalk.green(latestVersion)}`,
      runUpdate: `Run ${chalk.cyan(`npm i -g ${name}`)} to update`,
    };

    console.log(
      boxen(`${msg.updateAvailable}\n${msg.runUpdate}`, {
        margin: 1,
        padding: 1,
        align: "center",
      })
    );
  }
};
