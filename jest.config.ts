import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  rootDir: "src",
  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: ["**/__tests__/*.(test|spec).(ts|tsx|js)"],
};

export default config;
