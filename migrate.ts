import { Sequelize } from "sequelize";
import * as Umzug from "umzug";
import * as path from "path";

import { db } from "./models/index";

const umzug = new Umzug({
  storage: "sequelize",
  storageOptions: {
    sequelize: db.sequelize as Sequelize,
  },

  // see: https://github.com/sequelize/umzug/issues/17
  migrations: {
    params: [
      db.sequelize.getQueryInterface(), // queryInterface
      db.sequelize.constructor, // DataTypes
      function() {
        throw new Error(
          'Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.',
        );
      },
    ],
    path: path.join(__dirname, "./migrations"),
    pattern: /\.ts$/,
  },

  logging: function() {
    console.log.apply(null, arguments);
  },
});

function logUmzugEvent(
  eventName: "migrating" | "migrated" | "reverting" | "reverted",
) {
  return function(name: string) {
    console.log(`${name} ${eventName}`);
  };
}
umzug.on("migrating", logUmzugEvent("migrating"));
umzug.on("migrated", logUmzugEvent("migrated"));
umzug.on("reverting", logUmzugEvent("reverting"));
umzug.on("reverted", logUmzugEvent("reverted"));

export { umzug };
