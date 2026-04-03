const { execSync } = require("node:child_process");

module.exports = async () => {
  const testDatabaseUrl =
    "postgresql://postgres:postgres@localhost:5433/rocketlog_test?schema=public";

  execSync("npx prisma migrate deploy --schema prisma/schema.prisma", {
    stdio: "inherit",
    env: {
      ...process.env,
      DATABASE_URL: testDatabaseUrl,
    },
  });
};
