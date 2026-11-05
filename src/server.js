import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { apiReference } from '@scalar/express-api-reference';
import YAML from 'yaml';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();

const PORT = process.env.PORT || 4021;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = YAML.parse(
    fs.readFileSync(
        path.join(__dirname, '../docs/openapi.yaml'),
        'utf8'
    )
);

app.get('/openapi.yaml', (req, res) => {
    res.type('text/yaml').send(
        fs.readeFileSync(
            path.join(__dirname, '../docs/openapi.yaml'),
            'utf8'
        )
    );
});

app.use(
    '/swagger',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.use(
    '/scalar',
    apiReference({
        content: swaggerDocument
    })
);

app.listen(PORT, () => {
    console.log(`Documentação disponível na porta ${PORT}`);
});