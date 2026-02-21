import type { ElectrobunConfig } from 'electrobun/bun';

const config: ElectrobunConfig = {
  app: {
    name: 'MedKitt',
    identifier: 'com.medkitt.em',
    version: '1.0.0',
    description: 'Emergency Medicine Medkitt - Fast, offline-first EM workflow tool',
  },
  
  build: {
    bun: {
      entrypoint: './src/main.ts',
    },
    views: {
      main: {
        entrypoint: './src/views/app.ts',
      },
    },
    copy: {
      './src/views/index.html': 'index.html',
      './src/views/style.css': 'style.css',
    },
  },
  
  mac: {
    codesign: false,
    notarize: false,
  },
};

export default config;
