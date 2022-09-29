import { Config } from "./config/Config";
import { logger } from "./logs";
import { App } from './app';
import 'reflect-metadata'
import { getFromContainer, MetadataStorage } from 'class-validator' // tslint:disable-line
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { getMetadataArgsStorage } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'

const port = Config.getInstance().getPort();

try {
    const menewApp = new App();
    const app = menewApp.app;
    handleSwaggerCodeGenerator(menewApp);
    app.listen(port, () => {
        logger.info("Express server listening on port %s", port);
    });

} catch (error) {
    logger.error(error, "caught exception while starting app message: %s", error.message);
    throw error;
}


function handleSwaggerCodeGenerator(menewApp: App) {
    const app = menewApp.app;
    // Parse class-validator classes into JSON Schema:
    const metadata = (getFromContainer(MetadataStorage) as any).validationMetadatas
    const schemas = validationMetadatasToSchemas(metadata, {
        refPointerPrefix: '#/components/schemas/'
    })

    // Parse routing-controllers classes into OpenAPI spec:
    const storage = getMetadataArgsStorage()
    const spec = routingControllersToSpec(storage, menewApp.getRoutingControllersOptions(), {
        components: {
            schemas,
            securitySchemes: {
                basicAuth: {
                    scheme: 'basic',
                    type: 'http'
                }
            }
        },
        info: {
            description: 'Maintained by `manjeetbrar91@gmail.com`',
            title: 'EFuel REST APIs',
            version: '2.0.0'
        }
    })

    // swagger spec json file
    app.get('/swagger/v1/swagger.json', (_req, res) => {
        res.json(spec)
    });

    // swagger UI
    const swaggerUi = require('swagger-ui-express');
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(spec));
}
