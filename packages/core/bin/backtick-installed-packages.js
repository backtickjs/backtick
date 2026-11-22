#!/usr/bin/env node

import { installedPackages } from "../dist/node.js";

// The app's dependencies at their installed versions, as JSON, for its
// postinstall: backtick-installed-packages > client/installed-packages.json
process.stdout.write(
  `${JSON.stringify(installedPackages(process.cwd()), null, 2)}\n`,
);
