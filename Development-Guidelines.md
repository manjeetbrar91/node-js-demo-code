# Development Guidelines

## How to use logger

```TypeScript
import { logger } from "./logs";
logger.info("Express server listening on port %s", port);
logger.warn("name: %s order %j", "name", SomeOrderObject); -> %j will call JSON.stringfy() automatically
```

Read more about formats here <https://nodejs.org/dist/latest/docs/api/util.html#util_util_format_format_args>

## Visual Studio Code Extensions

See *Visual Studio Code Extensions* section <https://dev.azure.com/DeMeNew/DeMeNew/_git/xxxxxxx-environment?path=%2FDevelopment-Guidelines.md&version=GBmaster>