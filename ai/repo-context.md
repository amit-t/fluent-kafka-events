<project>
  <source>/Users/amittiwari/Projects/Invenco/Core/ics-event-stream-lib</source>
  <timestamp>20250423-094758</timestamp>
  <command>ffg </command>
</project>
<summary>
  Analyzing: /Users/amittiwari/Projects/Invenco/Core/ics-event-stream-lib
  Max file size: 10240KB
  Skipping build artifacts and generated files
Files analyzed: 36
</summary>
<directoryTree>
└── ics-event-stream-lib/
  ├── .eslintignore
  ├── .eslintrc.js
  ├── .github/
  │ └── workflows/
  │   ├── auto-format-and-coverage.yml
  │   ├── build.yml
  │   └── publish.yml
  ├── .gitignore
  ├── .husky/
  │ └── pre-commit
  ├── .npmignore
  ├── .npmrc
  ├── .nvmrc
  ├── .prettierignore
  ├── .prettierrc.js
  ├── env/
  │ ├── .env.dev
  │ ├── .env.local
  │ ├── .env.qa
  │ └── .env.r2
  ├── index.ts
  ├── package.json
  ├── README.md
  ├── src/
  │ ├── constants/
  │ │ ├── ics-event-stream.constants.ts
  │ │ └── kafka.constants.ts
  │ ├── ics-event-stream.class.ts
  │ ├── interfaces/
  │ │ └── index.ts
  │ ├── services/
  │ │ ├── config.service.ts
  │ │ └── kafka.service.ts
  │ └── utils/
  │   ├── action.ts
  │   ├── awsUtils.ts
  │   ├── env.ts
  │   ├── error.ts
  │   ├── get-logger.ts
  │   └── prep.ts
  ├── tests/
  │ ├── integration/
  │ │ ├── resources/
  │ │ │ └── docker-compose.yml
  │ │ └── test.ts
  │ └── unit/
  │   └── utils/
  │     └── prep.spec.ts
  ├── tsconfig.json
  └── vitest.config.ts

</directoryTree>
<files>
  <file path=".eslintignore">
# config files and scripts
.gitattributes
.gitignore
.npmignore
.nvmrc
.npmrc
.yamllint
.dockerignore
.eslintignore
.prettierignore
Dockerfile
package.json
package-lock.json
pnpm-lock.yaml
README.md
tsconfig.json
vitest.config.ts

# folders not needed to be linted
/build
/node_modules
/scripts
/.husky
/dist

# extensions to be excluded
*.sh
*.log
*.pem
*.pub
*.sql
*.xml
*.bin
*.bat
*.pdf
*.opts
*.properties


  </file>
  <file path=".eslintrc.js">
module.exports = {
  extends: ['@invenco-cloud-systems-ics/eslint-config'],
  rules: {},
};


  </file>
  <file path=".github/workflows/auto-format-and-coverage.yml">
---
# Performs an autocommit formatting the code and updating the coverage badges in the readme file
name: Auto Format and Auto Coverage

on:
  push:
    branches:
      - main

permissions:
  contents: write
  packages: read

jobs:
  auto-format-and-coverage:
    uses: Invenco-Cloud-Systems-ICS/github-actions-internal/.github/workflows/generic_auto_commit_format_and_coverage_pnpm.yml@v4


  </file>
  <file path=".github/workflows/build.yml">
---
name: Build

on:
  push:
  workflow_dispatch:
    inputs:
      release_number_override:
        required: false
        type: string

permissions:
  packages: read
  contents: read
  actions: read
  id-token: write

jobs:
  lint:
    uses: Invenco-Cloud-Systems-ICS/github-actions-internal/.github/workflows/generic_lint_pnpm.yml@v4
    secrets:
      JF_ACCESS_TOKEN: ${{ secrets.JF_ACCESS_TOKEN }}

  unit-tests:
    needs: lint
    uses: Invenco-Cloud-Systems-ICS/github-actions-internal/.github/workflows/generic_unit_test_pnpm.yml@v4
    secrets:
      JF_ACCESS_TOKEN: ${{ secrets.JF_ACCESS_TOKEN }}


  </file>
  <file path=".github/workflows/publish.yml">
name: Publish

on:
  push:
    branches:
      - main
  workflow_dispatch:
    inputs:
      packageversion:
        description: 'Package Version'
        required: false
        type: string

jobs:
  publish_github_package:
    uses: Invenco-Cloud-Systems-ICS/github-actions-internal/.github/workflows/publish_github_package_pnpm.yml@v4
    with:
      packageversion: ${{inputs.packageversion}}


  </file>
  <file path=".gitignore">
# dependencies
/node_modules

# IDE
/.idea
/.awcache
/.vscode
.DS_Store

# misc
npm-debug.log

# tests
/test
/coverage
/.nyc_output

# dist
dist

# Compiled Code
build/


  </file>
  <file path=".husky/pre-commit">

#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
 
npx lint-staged

  </file>
  <file path=".npmignore">
.github/
env/
tests/
coverage/
.husky/

vitest.config.ts


  </file>
  <file path=".npmrc">
always-auth=true
@invenco-cloud-systems-ics:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}

  </file>
  <file path=".nvmrc">
18.*


  </file>
  <file path=".prettierignore">
# config files and scripts
.git-blame-ignore-revs
.gitattributes
.gitignore
.npmignore
.npmrc
.nvmrc
.yamllint
.dockerignore
.eslintignore
.prettierignore
pnpm-lock.yaml
Dockerfile
.ebextensions


# folders not needed to be linted
/node_modules
/.husky
/coverage
/env

# extensions to be excluded
*.sh
*.log
*.pem
*.pub
*.sql
*.xml
*.bin
*.bat
*.pdf
*.opts
*.properties
*.png

  </file>
  <file path=".prettierrc.js">
module.exports = {
  ...require('@invenco-cloud-systems-ics/eslint-config/prettierConfig'),
};


  </file>
  <file path="env/.env.dev">
DEBUG=true
# KAFKA
KAFKA_URL=localhost:29092
KAFKA_CLIENT_ID=inv-ics-event-stream-kafka-local
KAFKA_PARTITION_CONSUMED_CONCURRENT=3
IS_CONSUMER_READ_FROM_BEGINNING=false
KAFKA_CONN_TIMEOUT=3000
KAFKA_RETRY_SETTINGS_INITIAL_RETRY=300
KAFKA_RETRY_SETTINGS_MAX_RETRY_TIME=30000
KAFKA_RETRY_SETTINGS_RETRIES=15
KAFKA_RETRY_SETTINGS_FACTOR=0.2
KAFKA_RETRY_SETTINGS_MULTIPLIER=2

#LOGGER
LOGGER_LEVEL=debug


  </file>
  <file path="env/.env.local">
DEBUG=true
# KAFKA
KAFKA_URL=localhost:9093
KAFKA_CLIENT_ID=inv-ics-event-stream-kafka-local
KAFKA_PARTITION_CONSUMED_CONCURRENT=3
IS_CONSUMER_READ_FROM_BEGINNING=false
KAFKA_CONN_TIMEOUT=3000
KAFKA_RETRY_SETTINGS_INITIAL_RETRY=300
KAFKA_RETRY_SETTINGS_MAX_RETRY_TIME=30000
KAFKA_RETRY_SETTINGS_RETRIES=15
KAFKA_RETRY_SETTINGS_FACTOR=0.2
KAFKA_RETRY_SETTINGS_MULTIPLIER=2

#LOGGER
LOGGER_LEVEL=debug


  </file>
  <file path="env/.env.qa">
DEBUG=true
# KAFKA
KAFKA_URL=localhost:29092
KAFKA_CLIENT_ID=inv-ics-event-stream-kafka-local
KAFKA_PARTITION_CONSUMED_CONCURRENT=3
IS_CONSUMER_READ_FROM_BEGINNING=false
KAFKA_CONN_TIMEOUT=3000
KAFKA_RETRY_SETTINGS_INITIAL_RETRY=300
KAFKA_RETRY_SETTINGS_MAX_RETRY_TIME=30000
KAFKA_RETRY_SETTINGS_RETRIES=15
KAFKA_RETRY_SETTINGS_FACTOR=0.2
KAFKA_RETRY_SETTINGS_MULTIPLIER=2

#LOGGER
LOGGER_LEVEL=debug


  </file>
  <file path="env/.env.r2">
DEBUG=true
# KAFKA
KAFKA_URL=localhost:29092
KAFKA_CLIENT_ID=inv-ics-event-stream-kafka-local
KAFKA_PARTITION_CONSUMED_CONCURRENT=3
IS_CONSUMER_READ_FROM_BEGINNING=false
KAFKA_CONN_TIMEOUT=3000
KAFKA_RETRY_SETTINGS_INITIAL_RETRY=300
KAFKA_RETRY_SETTINGS_MAX_RETRY_TIME=30000
KAFKA_RETRY_SETTINGS_RETRIES=15
KAFKA_RETRY_SETTINGS_FACTOR=0.2
KAFKA_RETRY_SETTINGS_MULTIPLIER=2

#LOGGER
LOGGER_LEVEL=debug


  </file>
  <file path="index.ts">
require('module-alias')(__dirname);

// eslint-disable-next-line import/first
import '@utils/env';

export * from './src/ics-event-stream.class';
export * from '@constants/ics-event-stream.constants';


  </file>
  <file path="package.json">
{
  "name": "@invenco-cloud-systems-ics/ics-event-stream-lib",
  "version": "1.0.23",
  "description": "This library is designed to facilitate communication between producers (publishers) and consumers (subscribers) within a system using Kafka for message-passing.",
  "author": "Invenco Group Ltd",
  "license": "UNLICENSED",
  "main": "dist/index.js",
  "scripts": {
    "prepare": "npx husky",
    "clean": "rimraf ./dist",
    "build": "rimraf ./dist && tsc && pnpm run copy-build",
    "run-debug": "rimraf ./dist && tsc -w && pnpm run copy-build",
    "copy-build": "copyfiles package.json* dist && cp -R ./env dist",
    "set-local": "export NODE_ENV=local",
    "set-dev": "export NODE_ENV=qa",
    "test": "env ENVIRONMENT=unit-test vitest run",
    "test:integration:local": "NODE_ENV=local && ts-node-dev ./tests/integration/test.ts",
    "test:integration:dev": "NODE_ENV=dev && && ts-node-dev ./tests/integration/test.js",
    "add-suffix-local": "cross-env SUFFIX=local node ~/.node_modules/pnpm-version-suffix/run-add-suffix.js",
    "publish:local": "pnpm run build && pnpm publish",
    "publish:dev": "pnpm run set-dev && pnpm run build && pnpm version prerelease --preid dev && pnpm publish",
    "publish:qa": "pnpm run set-qa && pnpm run build && pnpm version prerelease --preid qa && pnpm publish",
    "coverage": "env ENVIRONMENT=unit-test vitest run --coverage",
    "format": "prettier --write './**'",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  },
  "lint-staged": {
    "*.+(js|ts)": [
      "pnpm lint",
      "pnpm run format"
    ],
    "*.+(js|ts|json|md)": [
      "prettier -c --write"
    ]
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Invenco-Cloud-Systems-ICS/ics-event-stream-lib.git"
  },
  "bugs": {
    "url": "https://github.com/Invenco-Cloud-Systems-ICS/ics-event-stream-lib/issues"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "engines": {
    "node": ">=18"
  },
  "homepage": "https://github.com/Invenco-Cloud-Systems-ICS/ics-event-stream-lib#readme",
  "prettier": "@invenco-cloud-systems-ics/eslint-config/prettierConfig",
  "dependencies": {
    "aws-msk-iam-sasl-signer-js": "^1.0.0",
    "dotenv": "^16.4.5",
    "kafkajs": "^2.2.4",
    "lodash": "^4.17.21",
    "module-alias": "^2.2.3",
    "pino": "^9.1.0",
    "pino-pretty": "^11.0.0",
    "ulid": "^2.3.0"
  },
  "devDependencies": {
    "@invenco-cloud-systems-ics/eslint-config": "^2.2.4",
    "@invenco-cloud-systems-ics/vitest-config": "^1.0.3",
    "@types/lodash": "^4.17.4",
    "@vitest/coverage-v8": "^1.6.0",
    "copyfiles": "2.4.1",
    "eslint": "^8.57.0",
    "rimraf": "^5.0.7",
    "ts-node": "10.9.2",
    "ts-node-dev": "2.0.0",
    "typescript": "^5.4.5",
    "vitest": "^1.6.0"
  },
  "_moduleAliases": {
    "@utils": "src/utils",
    "@constants": "src/constants",
    "@interfaces": "src/interfaces",
    "@services": "src/services"
  }
}


  </file>
  <file path="README.md">
# ICS Event Stream Library README

## Unit Test Coverage

| Statements                                                                        | Branches                                                                      | Functions                                                                       | Lines                                                                   |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/statements-3.92%25-red.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-6.66%25-red.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-7.14%25-red.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-3.92%25-red.svg?style=flat) |

## Overview

ICS Event Stream Library serves as a hub in your event-driven platform, handling the reception, validation, preparation, enrichment, and dispatching of event-based messages. The library interfaces with Kafka or other similar message streaming platforms, making it ideal for cloud-based environments.

## Installation

Install the library from npm with the following command:

```bash
npm install @invenco-cloud-systems-ics/ics-event-stream-lib
```

## Configuration

To set up the library, ensure the Kafka URL in the corresponding `.env.<Environment>` file (located in the `env` folder) matches the environment (dev/qa/r2/production) you are deploying to.

For adding new actions or altering existing publishers or subscribers, refer to the `ics-event-stream.constants.ts` file. The `active` flag must be set to `true` and corresponding `subIds` given when adding or modifying publishers. For subscribers, the necessary actions and allowed publishers ought to be stated.

## Usage

After configuration, proceed to utilize the library:

1. Import the `IcsEventStream` class and relevant interfaces from the library.

```javascript
import { IcsEventStream } from '@invenco-cloud-systems-ics/ics-event-stream-lib';
import { ICSEventStreamConf } from '@interfaces/index';
```

2. Set up your logger.

```javascript
import { logger as parentLogger } from '@utils/get-logger';

const logger = parentLogger.child({
  filepath: 'src/test',
});
```

3. Construct a configuration object.

```javascript
const config: ICSEventStreamConf = {
  pubId: 'apiNodeJs'
};
```

4. Instantiate the `IcsEventStream` object.

```javascript
let ies: IcsEventStream | null = null;

try {
  ies = new IcsEventStream(config);
} catch (error) {
  logger.error({error})
}
```

5. Use `add` to append attributes to your message and `publish` to send it off.

```javascript
if (ies) {
  await ies
    .add('action', 'someone.DoesSomething')
    .add('corrId', 'test-corr-id')
    .add('schedule.tenant', 'tenantId')
    .add('someother.nested.key', 'value fo nested key')
    .publish();
}
```

6. Can also publish to specific partition or give key for the message

```javascript
if (ies) {
  await ies
    .add('action', 'someone.DoesSomething')
    .add('corrId', 'test-corr-id')
    .add('schedule.tenant', 'tenantId')
    .add('someother.nested.key', 'value fo nested key')
    .publish({ key: 'somekeystring' });
}
```

```javascript
if (ies) {
  await ies
    .add('action', 'someone.DoesSomething')
    .add('corrId', 'test-corr-id')
    .add('schedule.tenant', 'tenantId')
    .add('someother.nested.key', 'value fo nested key')
    .publish({ partition: 2 });
}
```

You can also use give your own broker url

```javascript
const customKafkaConfig : KafkaCustomConf = {
  brokerUrl : "b-2.devmskgin.5r6q58.c2.kafka.ap-south-1.amazonaws.com:9092,b-1.devmskgin.5r6q58.c2.kafka.ap-south-1.amazonaws.com:9092",
  retry : {
    initialRetryMS : 1
    }
  }

const ies2 = new IcsEventStream(config , customKafkaConfig as KafkaCustomConf) ;
```

You can also provide a broker with iam authentication enabled
We use [Aws Msk Iam Sasl Signer](https://github.com/aws/aws-msk-iam-sasl-signer-js) from aws to handle this.

```javascript
const customKafkaConfig : KafkaCustomConf = {
  brokerUrl : "b-2.martinievents.w1khga.c2.kafka.ap-southeast-2.amazonaws.com:9098,b-1.martinievents.w1khga.c2.kafka.ap-southeast-2.amazonaws.com:9098",
  iamAuth : { region : 'ap-southeast-2' }
}

const ies2 = new IcsEventStream(config , customKafkaConfig as KafkaCustomConf) ;
```

## Running Tests

Run unit tests:

```bash
pnpm run test
```

### Integration tests

Install required software for kafka:

```bash
sudo apt install docker-compose
sudo apt install kafkacat
```

Compose the local kafka docker image:

```bash
cd ./tests/integration/resources/
docker-compose up -d
```

Test that your kafka is working by running these commands:

```bash
# it lists brokers and topics
kafkacat -b localhost:9093 -L

# send a message. Write some text and then stop by typing Ctrl+D
kafkacat -b localhost:9093 -t test-topic -P

# receive a message. Stop by typing Ctrl+C
kafkacat -b localhost:9093 -t test-topic -C
```

To launch the test script, use these commands in your terminal:

1. Local environment:

```bash
pnpm run test:integration:local
```

2. Dev environment:

```bash
pnpm run test:integration:dev
```

Each script sets the environment, compiles the app, and executes `test.js` via `ts-node-dev`.

## Contribute to the Package

Should you wish to make contributions to this package, follow these steps:

1. **Source Code Access**: Start by cloning the repository to your local development environment:

```bash
git clone https://github.com/Invenco-Cloud-Systems-ICS/ics-event-stream-lib.git
```

2. **Implement Changes**: Make changes to the source code based on your requirements or fixes you want to implement.

3. **Update Version**: Before pushing your changes, update the version number in `package.json`. This will help track modifications and maintainers can better manage updates. Append `-dev`, `-qa`, `-r2`, or `-uat` for the respective environments or leave it blank for the production version.

4. **Publish Changes**: Once you've finished implementing changes and have updated the package version, publish the package to npm using the `pnpm publish` command:

```bash
pnpm publish
```

This ensures that anyone using this package will have access to your updates.

## Key Methods

- `add(key, value)`: To add properties to the message payload.
- `publish()`: To send the constructed message to its Kafka topic.


  </file>
  <file path="src/constants/ics-event-stream.constants.ts">
import { TOPIC_LIST } from '@constants/kafka.constants';

export const ICSEventStreamConfig = {
  client: {},
  action: {},
  publishers: {
    apiNode: {
      active: true,
      actions: {
        'schedule.deployEvents': {
          topic: TOPIC_LIST.deployEvents,
        },
        'crud.customAttribute': {
          topic: TOPIC_LIST.customAttributes,
        },
        'crud.device': {
          topic: TOPIC_LIST.devices,
        },
        'crud.sites': {
          topic: TOPIC_LIST.sites,
        },
        'crud.tenants': {
          topic: TOPIC_LIST.tenants,
        },
        'crud.siteTags': {
          topic: TOPIC_LIST.siteTags,
        },
        'ingest.dottedStrings': {
          topic: TOPIC_LIST.dottedStrings,
        },
        'ingest.playlistJobHistory': {
          topic: TOPIC_LIST.playlistJobHistory,
        },
      },
    },
    scheduleMs: {
      active: true,
      actions: {
        'process.scheduleEvents': {
          topic: TOPIC_LIST.scheduledEvents,
        },
      },
    },
    configManagementDeviceApi: {
      active: true,
      actions: {
        'process.updateConfigFileContentHash': {
          topic: TOPIC_LIST.ConfigFileContentHashUpdated,
        },
        'process.removeConfigFile': {
          topic: TOPIC_LIST.ConfigFileRemoved,
        },
      },
    },
    configFileDeviceStatus: {
      active: true,
      actions: {
        'process.panicService': {
          topic: TOPIC_LIST.panicService,
        },
        'process.eventProcessorService': {
          topic: TOPIC_LIST.eventProcessorService,
        }
      },
    },
    configAudit: {
      active: true,
      actions: {
        'injest.eventDetailService': {
          topic: TOPIC_LIST.eventDetailService,
        }
      },
    },
  },
};


  </file>
  <file path="src/constants/kafka.constants.ts">
/**
 * Typical topic name structure
 * icsEVS.<component/service>.<action>
 *   For ex - icsEVS.cmEventScheduler.schedule
 * icsEVS - ICS Event Stream
 */
export const TOPIC_LIST = {
  deployEvents: 'icsEVS.apiNode.deployEvents',
  customAttributes: 'icsEVS.apiNode.customAttributes',
  devices: 'icsEVS.apiNode.devices',
  sites: 'icsEVS.apiNode.sites',
  siteTags: 'icsEVS.apiNode.siteTags',
  tenants: 'icsEVS.apiNode.tenants',
  scheduledEvents: 'icsEVS.apiNode.scheduledEvents',
  dottedStrings: 'icsEVS.apiNode.dottedStrings',
  ConfigFileContentHashUpdated:
    'icsEVS.configManagementDeviceApi.ConfigFileContentHashUpdated',
  ConfigFileRemoved: 'icsEVS.configManagementDeviceApi.ConfigFileRemoved',
  panicService: 'icsEVS.configFileDeviceStatus.panicService',
  eventProcessorService: 'icsEVS.configFileDeviceStatus.eventProcessorService',
  playlistJobHistory: 'icsEVS.playlist.playlistJobHistory',
  eventDetailService: 'icsEVS.configAudit.eventDetailService',
} as const;


  </file>
  <file path="src/ics-event-stream.class.ts">
import { set } from 'lodash';
import { ulid } from 'ulid';
import { ICSEventStreamError } from '@utils/error';
import { ICSEventStreamConfig } from '@constants/ics-event-stream.constants';
import {
  ICSEventStreamConf,
  KafkaCustomConf,
  PropertyPath,
} from '@interfaces/index';
import { KafkaService } from '@services/kafka.service';
import { ConfigService } from '@services/config.service';
import { logger as parentLogger } from '@utils/get-logger';
import { prepareKafkaConfig, preparekafkaConfigFromEnv } from '@utils/prep';
import { getActionMeta } from '@utils/action';

const logger = parentLogger.child({
  filepath: 'src/ics-event-stream.class',
});

export class IcsEventStream {
  private payload: any;

  private context: {
    pubId: string;
    action: string;
    corrId: string | number;
  };

  private meta: {
    topic: string;
  };

  constructor(config: ICSEventStreamConf, customKafkaConfig?: KafkaCustomConf) {
    logger.debug({ config }, 'IcsEventStream | constructor');
    try {
      if (!ICSEventStreamConfig.publishers[config.pubId]?.active) {
        logger.error('Publisher not supported', config.pubId);
        throw new ICSEventStreamError('Publisher not supported');
      }
      if (!ICSEventStreamConfig.publishers[config.pubId]?.active) {
        logger.error('Publisher not supported', config.pubId);
        throw new ICSEventStreamError('Subscriber not supported');
      }
      // Initiate Config Service
      const configService = ConfigService.ref;
      configService.local = config;
      const kafka = customKafkaConfig
        ? prepareKafkaConfig(customKafkaConfig)
        : preparekafkaConfigFromEnv();
      configService.remote = { kafka };
    } catch (error) {
      logger.error({ error }, 'Config service bootstrap failed');
      throw new ICSEventStreamError('Config service bootstrap failed');
    }
    // Initiate Main payload objects to initial values
    this.init(config);
  }

  init(config: ICSEventStreamConf) {
    this.payload = {};
    this.context = {
      pubId: config.pubId,
      action: '',
      corrId: '',
    };
    this.meta = {
      topic: '',
    };
  }

  /**
   * Set the object property with value
   * @param key
   * @param {*} value The value to set
   */
  add(key: PropertyPath, value: any): this {
    try {
      switch (key) {
        case 'action':
          this.isActionAllowed(value);
          break;
        case 'corrId':
        case 'transactionId':
        case 'xnId':
          this.corrId = value;
          break;
        default:
          logger.debug({ key, value }, 'ies.class | add');
          this.makePayload = { key, value };
      }
    } catch (error) {
      logger.error({ error, data: { key, value } }, 'Unable to set value');
      return this;
    }
    return this;
  }

  /**
   * Publish message to kafka topic
   */
  async publish(settings?: { partition?: number; key?: string }) {
    try {
      const confInstance = ConfigService.ref;
      const config = {
        static: confInstance.local,
        remote: confInstance.remote,
      };
      const kafkaRef = KafkaService.ref(config.remote.kafka);
      logger.debug(
        { message: this.message, topic: this.topic },
        'ies.class | publish | topic message.'
      );
      await kafkaRef.sendToKafka(this.topic, this.message, settings);
      // RESET Main payload objects to initial values
      this.init(config.static);
    } catch (error) {
      logger.error(
        { kafkaConfig: JSON.stringify(ConfigService.ref.remote) },
        'Remote Config'
      );
      logger.error({ error, data: this.payload }, 'Unable to publish payload');
      throw new ICSEventStreamError('Unable to publish payload');
    }
  }

  isActionAllowed(action: string) {
    const { pubId } = this.context;
    const actionMeta = getActionMeta({ pubId, action });
    logger.debug({ actionMeta }, 'ies.class | isActionAllowed');
    if (!actionMeta) {
      throw new ICSEventStreamError(
        'isActionAllowed actionMeta fetch yielded a falsy'
      );
    }
    logger.debug({ actionMeta });
    this.topic = actionMeta.topic;
    this.action = action;
    return true;
  }

  get topic() {
    return this.meta.topic;
  }

  set topic(topic) {
    this.meta.topic = topic;
  }

  set action(action: string) {
    this.context.action = action;
  }

  set corrId(corrId: string) {
    this.context.corrId = corrId;
  }

  set makePayload(params: { key: PropertyPath; value: string }) {
    set(this.payload, params.key, params.value);
  }

  get message() {
    return {
      context: this.context,
      meta: this.meta,
      messageId: ulid(Date.now()),
      data: this.payload,
      timestamp: Date.now().valueOf(),
    };
  }
}


  </file>
  <file path="src/interfaces/index.ts">
type Many<T> = T | ReadonlyArray<T>;
type PropertyName = string | number | symbol;
export type PropertyPath = Many<PropertyName>;
export type IKafkaPayload = Record<string, unknown>[] | Record<string, unknown>;

export interface ConfigServiceConf {
  local: ICSEventStreamConf;
  remote: ICSEventStreamRemoteConf;
}

export interface ICSEventStreamConf {
  pubId: string;
}
export interface ICSEventStreamRemoteConf {
  kafka: KafkaConf;
}

interface KafkaConsumer {
  partitionsConsumedConcurrently?: number;
}
interface KafkaRetrySettings {
  initialRetryTime: number; // Initial value used to calculate the retry in milliseconds
  maxRetryTime: number; // Maximum wait time for a retry in milliseconds
  retries: number;
  factor: number;
  multiplier: number;
}

export interface KafkaConf {
  KAFKA_URL: string;
  KAFKA_CONSUMER_GROUP?: string;
  KAFKA_CLIENT_ID?: string;
  KAFKA_CONSUMER_CONFIG?: KafkaConsumer;
  CONN_TIMEOUT?: number;
  RETRY?: KafkaRetrySettings;
  IAM_AUTH?: {
    region?: string;
  };
}

export interface KafkaCustomConf {
  partitionsConsumedConcurrently?: number;
  brokerUrl: string; // comma separated broker urls,
  clientId?: string;
  connectionTimeOut?: number;
  retry?: {
    initialRetryMS?: number;
    maxRetryMS?: number;
    retries?: number;
    factor?: number;
    multiplier?: number;
  };
  iamAuth?: {
    region: string;
  };
}


  </file>
  <file path="src/services/config.service.ts">
import {
  ICSEventStreamConf,
  ConfigServiceConf,
  ICSEventStreamRemoteConf,
} from '@interfaces/index';

export class ConfigService {
  private static instance: ConfigService;

  private conf: ConfigServiceConf;

  private constructor() {
    this.conf = {
      local: {} as ICSEventStreamConf,
      remote: {} as ICSEventStreamRemoteConf,
    };
  }

  public static get ref(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  get local() {
    return this.conf.local;
  }

  set local(config: ICSEventStreamConf) {
    this.conf.local = config;
  }

  get remote() {
    return this.conf.remote;
  }

  set remote(config: ICSEventStreamRemoteConf) {
    this.conf.remote = config;
  }
}


  </file>
  <file path="src/services/kafka.service.ts">
import { oauthBearerTokenProvider } from '@utils/awsUtils';
import { Kafka, KafkaConfig, Producer, Partitioners } from 'kafkajs';
import { logger } from '@utils/get-logger';

import { IKafkaPayload, KafkaConf } from '../interfaces';

export class KafkaService {
  private static instance: KafkaService;

  private client: Kafka;

  private producer: Producer;

  private connectedProducer: any;

  private constructor(kafkaConfig: KafkaConf) {
    const clientKafkaConfig: KafkaConfig = {
      clientId: kafkaConfig.KAFKA_CLIENT_ID,
      brokers: kafkaConfig.KAFKA_URL?.split(',') || ['localhost:9092'],
      connectionTimeout: 3000,
      retry: {
        initialRetryTime: 300,
        maxRetryTime: 30000,
        retries: 15,
        factor: 0.2,
        multiplier: 2,
      },
    };
    if (kafkaConfig.IAM_AUTH) {
      clientKafkaConfig.ssl = true;
      clientKafkaConfig.sasl = {
        mechanism: 'oauthbearer',
        oauthBearerProvider: () =>
          oauthBearerTokenProvider(
            kafkaConfig.IAM_AUTH?.region ?? 'ap-southeast-2'
          ),
      };
    }
    this.client = new Kafka(clientKafkaConfig);

    this.producer = this.client.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
    });
  }

  sendToKafka = async (
    topic: string,
    payload: IKafkaPayload,
    settings?: { partition?: number; key?: string },
    producerConfigData = {}
  ): Promise<void> => {
    let messagesToSend: { value: string; key?: string; partition?: number }[] =
      [];
    if (!this.connectedProducer) {
      this.connectedProducer = await this.producer.connect().catch(error => {
        logger.error({ error }, '[EventStreamLib] Unable to connect to kafka');
        throw new Error('[EventStreamLib] Unable to connect to kafka');
      });
    }
    if (Array.isArray(payload)) {
      messagesToSend = payload.map(val => ({
        value: JSON.stringify(val),
        ...producerConfigData,
      }));
    } else {
      messagesToSend = [
        { value: JSON.stringify(payload), ...producerConfigData },
      ];
    }

    if (settings?.key) {
      messagesToSend = messagesToSend.map(message => ({
        ...message,
        key: settings.key,
      }));
    }

    if (settings?.partition) {
      messagesToSend = messagesToSend.map(message => ({
        ...message,
        partition: settings.partition,
      }));
    }

    await this.producer.send({
      topic,
      messages: messagesToSend,
    });
  };

  public static ref(kafkaConfig): KafkaService {
    if (!KafkaService.instance) {
      KafkaService.instance = new KafkaService(kafkaConfig);
    }
    return KafkaService.instance;
  }
}


  </file>
  <file path="src/utils/action.ts">
import { logger as parentLogger } from '@utils/get-logger';

import { ICSEventStreamConfig } from '../constants/ics-event-stream.constants';

const logger = parentLogger.child({
  filepath: 'src/ics-event-stream.class',
});

export function getActionMeta(params: { pubId: string; action: string }) {
  logger.debug({ params }, 'ConfigService | getAction');
  const { pubId, action } = params;
  const actionMeta = ICSEventStreamConfig.publishers[pubId]?.actions?.[action];
  if (actionMeta) {
    return actionMeta;
  }
  return {};
}


  </file>
  <file path="src/utils/awsUtils.ts">
import { generateAuthToken } from 'aws-msk-iam-sasl-signer-js';

export async function oauthBearerTokenProvider(region: string) {
  // Uses AWS Default Credentials Provider Chain to fetch credentials
  const authTokenResponse = await generateAuthToken({ region });
  return {
    value: authTokenResponse.token,
  };
}


  </file>
  <file path="src/utils/env.ts">
import dotenv from 'dotenv';
import path from 'path';
import * as process from 'process';

const envInit = dotenv.config({
  path: path.resolve(__dirname, `../../env/.env.local`),
  encoding: 'utf8',
  debug: getEnv(process.env.DEBUG as string) as boolean,
});

if (envInit.error) {
  throw envInit.error;
}

function getEnv(
  key: string,
  defaultValue: string | number | boolean = false
): string | number | boolean {
  const env = process.env[key];
  if (!env) {
    return defaultValue;
  }
  if (env.toLowerCase() === 'true') {
    return true;
  }
  if (env.toLowerCase() === 'false') {
    return false;
  }
  if (!Number.isNaN(+env)) {
    return +env;
  }
  return env;
}

// eslint-disable-next-line import/no-unused-modules
export default envInit;


  </file>
  <file path="src/utils/error.ts">
export class ICSEventStreamError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ICSEventStreamError';
    this.message = message;
  }
}


  </file>
  <file path="src/utils/get-logger.ts">
import pino from 'pino';
import process from 'process';

const transport = pino.transport({
  target: 'pino-pretty',
  options: { colorize: true },
});

export const logger = pino(
  {
    level: process.env.LOGGER_LEVEL || 'info',
    nestedKey: 'payload', // logs the json object in the payload key at the root
    customLevels: {
      trace: 10,
      debug: 20,
      info: 30,
      warn: 40,
      error: 50,
      fatal: 60,
    },
    useOnlyCustomLevels: true,
    formatters: {
      log(object) {
        return {
          ...object,
        } as unknown as Record<string, unknown>;
      },
      bindings(bindings) {
        return {
          pid: bindings.pid,
          hostname: bindings.hostname,
        };
      },
      level: label => ({ level: label }), // prints log level number instead of it's name
    },
  },
  transport
);


  </file>
  <file path="src/utils/prep.ts">
import { KafkaConf, KafkaCustomConf } from '@interfaces/index';

export function preparekafkaConfigFromEnv(): KafkaConf {
  return {
    KAFKA_CONSUMER_CONFIG: {
      partitionsConsumedConcurrently:
        parseInt(process.env.KAFKA_PARTITION_CONSUMED_CONCURRENT || '', 10) ||
        3,
    },
    KAFKA_URL: process.env.KAFKA_URL || '',
    KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID || '',
    CONN_TIMEOUT: parseInt(process.env.KAFKA_CONN_TIMEOUT || '', 10) || 3000,
    RETRY: {
      // Initial value used to calculate the retry in milliseconds
      initialRetryTime:
        parseInt(process.env.KAFKA_RETRY_SETTINGS_INITIAL_RETRY || '', 10) ||
        300,
      // Maximum wait time for a retry in milliseconds
      maxRetryTime:
        parseInt(process.env.KAFKA_RETRY_SETTINGS_MAX_RETRY_TIME || '', 10) ||
        30000,
      retries:
        parseInt(process.env.KAFKA_RETRY_SETTINGS_RETRIES || '', 10) || 15,
      factor:
        parseInt(process.env.KAFKA_RETRY_SETTINGS_FACTOR || '', 10) || 0.2,
      multiplier:
        parseInt(process.env.KAFKA_RETRY_SETTINGS_MULTIPLIER || '', 10) || 2,
    },
  };
}

export function prepareKafkaConfig(config: KafkaCustomConf): KafkaConf {
  return {
    KAFKA_CONSUMER_CONFIG: {
      partitionsConsumedConcurrently:
        config.partitionsConsumedConcurrently || 3,
    },
    KAFKA_URL: config.brokerUrl || '',
    KAFKA_CLIENT_ID: config.clientId || '',
    CONN_TIMEOUT: config.connectionTimeOut || 3000,
    RETRY: {
      // Initial value used to calculate the retry in milliseconds
      initialRetryTime: config.retry?.initialRetryMS || 300,
      // Maximum wait time for a retry in milliseconds
      maxRetryTime: config.retry?.maxRetryMS || 30000,
      retries: config.retry?.retries || 15,
      factor: config.retry?.factor || 0.2,
      multiplier: config.retry?.multiplier || 2,
    },
    IAM_AUTH: config?.iamAuth,
  };
}


  </file>
  <file path="tests/integration/resources/docker-compose.yml">
# docker-compose.yml
version: '3.7'
services:
  zookeeper:
    restart: always
    image: docker.io/bitnami/zookeeper:3.8
    ports:
      - '2181:2181'
    volumes:
      - 'zookeeper-volume:/bitnami'
    environment:
      - ALLOW_ANONYMOUS_LOGIN=yes
  kafka:
    restart: always
    image: docker.io/bitnami/kafka:3.3
    ports:
      - '9093:9093'
    volumes:
      - 'kafka-volume:/bitnami'
    environment:
      - KAFKA_BROKER_ID=1
      - KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181
      - ALLOW_PLAINTEXT_LISTENER=yes
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CLIENT:PLAINTEXT,EXTERNAL:PLAINTEXT
      - KAFKA_CFG_LISTENERS=CLIENT://:9092,EXTERNAL://:9093
      - KAFKA_CFG_ADVERTISED_LISTENERS=CLIENT://kafka:9092,EXTERNAL://localhost:9093
      - KAFKA_CFG_INTER_BROKER_LISTENER_NAME=CLIENT
    depends_on:
      - zookeeper
volumes:
  kafka-volume:
  zookeeper-volume:


  </file>
  <file path="tests/integration/test.ts">
/* eslint-disable no-plusplus */

import crypto from 'crypto';

import {
  ICSEventStreamConf,
  KafkaCustomConf,
} from '../../src/interfaces/index';
import { logger as parentLogger } from '../../src/utils/get-logger';
import '../../src/utils/env';
import { IcsEventStream } from '../../index';

const logger = parentLogger.child({
  filepath: 'src/test',
});
const config: ICSEventStreamConf = {
  pubId: 'apiNode',
};

const getContentArray = () => {
  const rk: Record<any, any>[] = [];
  for (let i = 1; i <= 10; i++) {
    rk.push({
      attributeDefinitionId: Math.floor(Math.random() * 10000),
      value: i * 10,
    });
  }

  return rk;
};

const getEntityIds = () => {
  const entityIds: number[] = [];
  for (let i = 1; i <= 10; i++) {
    entityIds.push(Math.floor(Math.random() * 1000));
  }
  return entityIds;
};

const sampleTask = {
  type: 'UpdateSiteCustomAttribute',
  entityId: `entity_id_${Date.now()}`,
  condition: {
    // Condition object properties
    deviceId: 'ABC123',
    location: 'Office',
    // Add more properties as needed
  },
  content: {
    attributes: getContentArray(),
    entityIds: getEntityIds(),
    deploymentType: 'immediate',
  },
  status: 'PENDING',
  scheduled_at: new Date('2023-12-15T08:00:00Z'),
  error_details: null,
  created_at: new Date(),
  created_by: 'Admin',
  updated_at: new Date(),
  updated_by: 'Admin',
  deleted_at: null,
  deleted_by: null,
};

async function fn(ies: IcsEventStream) {
  await ies
    ?.add('action', 'schedule.deployEvents')
    .add('corrId', 'test-corr-id')
    .add('schedule.tenant', 'tenantId')
    .add('someother.nested.key', 'value fo nested key')
    .publish()
    .then(() => {
      logger.info('finished');
    });

  await ies
    ?.add('action', 'schedule.deployEvents')
    .add('scheduledItemUuid', crypto.randomUUID())
    .add('payload', sampleTask)
    .publish()
    .then(() => {
      logger.info('Completed');
    });
}

const customKafkaConfig = {
  brokerUrl: 'localhost:9093',
};

const ies = new IcsEventStream(config, customKafkaConfig as KafkaCustomConf);

fn(ies).then(() => {
  logger.info('Task Completed');
});


  </file>
  <file path="tests/unit/utils/prep.spec.ts">
import { describe, it, expect } from 'vitest';
import { KafkaCustomConf } from '@interfaces/index';

import { prepareKafkaConfig } from '../../../src/utils/prep';

describe('Prep Test', () => {
  it('- prepareKafkaConfig should return valid clientId', () => {
    const config: KafkaCustomConf = {
      brokerUrl: '',
      retry: {},
      clientId: 'clientIdTest',
      connectionTimeOut: 2,
    };
    const kafkaConfig = prepareKafkaConfig(config);
    expect(kafkaConfig.KAFKA_CLIENT_ID).toBe('clientIdTest');
  });
});


  </file>
  <file path="tsconfig.json">
{
  "compilerOptions": {
    "target": "es6",
    /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */ "module": "commonjs",
    /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */ "noLib": false,
    "allowJs": true,
    /* Allow javascript files to be compiled. */ "resolveJsonModule": true,
    "outDir": "./dist",
    /* Redirect output structure to the directory. */
    "rootDir": "./",
    /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */ "strict": true,
    /* Enable all strict type-checking options. */ "noImplicitAny": false,
    /* Raise error on expressions and declarations with an implied 'any' type. */
    "strictPropertyInitialization": false,
    /* Enable strict checking of property initialization in classes. */ "sourceMap": false,
    /* Base directory to resolve non-absolute module names. */
    "typeRoots": ["./node_modules/@types"],
    "esModuleInterop": true,
    /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */ "experimentalDecorators": true,
    /* Enables experimental support for ES7 decorators. */ "emitDecoratorMetadata": true,
    /* Enables experimental support for emitting type metadata for decorators. */ /* Advanced Options */
    "skipLibCheck": true,
    /* Skip type checking of declaration files. */ "forceConsistentCasingInFileNames": true,
    /* Disallow inconsistently-cased references to the same file. */
    "declaration": true,
    "baseUrl": "./src",
    "paths": {
      "@utils/*": ["utils/*"],
      "@constants/*": ["constants/*"],
      "@interfaces/*": ["interfaces/*"],
      "@services/*": ["services/*"]
    }
  },
  "include": ["./src/**/*", "./env/**/*", "index.ts", "./tests/**/*"],
  "exclude": ["node_modules", "build"]
}


  </file>
  <file path="vitest.config.ts">
/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import icsVitestconfig from '@invenco-cloud-systems-ics/vitest-config';

// This configuration should be enough for most of the cases
// it will automatically detect if react is installed,
// and return an object configured for react testing library to be used as the testing suite

// Create an excludes array, to exclude folders from being tested and from coverage to be collected from them
const excludes = [
  '**/node_modules/**',
  '**/dist/**',
  '**/target/**',
  '**/build/**',
  './.husky/**',
  './.github/**',
  './tests/integration/**',
];

export default defineConfig({
  ...icsVitestconfig,
  test: {
    ...icsVitestconfig.test,
    exclude: excludes,
    coverage: {
      ...icsVitestconfig.test.coverage,
      exclude: excludes,
    },
  },
});
  </file>
</files>
