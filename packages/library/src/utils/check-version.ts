import boxen from "boxen";
import chalk from "chalk";
import pkgJson from "package-json";
import semver from "semver";
import semverDiff from "semver-diff";

import { name, version } from "../../package.json";

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const checkUpdate = async () => {
  const { version: latestVersion } = await pkgJson(name);

  // check if local package version is less than the remote version
  const updateAvailable = semver.lt(version, latestVersion as string);

  if (updateAvailable) {
    let updateType = "";

    // check the type of version difference which is usually patch, minor, major etc.
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

    // notify the user about the available udpate
    console.log(
      boxen(`${msg.updateAvailable}\n${msg.runUpdate}`, {
        margin: 1,
        padding: 1,
        align: "center",
      })
    );
  }
};
