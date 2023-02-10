import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  showSeed: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};

export default config;
