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

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>2J Systems | API Documentation</title>

            <style>
                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #101827;
                    color: #fff;
                    font-family: Arial, sans-serif;
                }

                .container {
                    width: 90%;
                    max-width: 750px;
                    text-align: center;
                }

                h1 {
                    font-size: 36px;
                    margin-bottom: 10px;
                }

                p {
                    color: #aab4c5;
                    margin-bottom: 40px;
                }

                .options {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                }

                a {
                    padding: 30px;
                    border: 1px solid #344258;
                    border-radius: 12px;
                    color: white;
                    text-decoration: none;
                    background: #1b293d;
                    transition: .2s;
                }

                a:hover {
                    transform: translateY(-5px);
                    border-color: #38bdf8;
                }

                h2 {
                    margin-top: 0;
                }

                span {
                    color: #aab4c5;
                    font-size: 14px;
                }

                @media (max-width: 550px) {
                    .options {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        </head>

        <body>
            <main class="container">
                <h1>2J Systems</h1>
                <p>Central de documentação das APIs</p>

                <div class="options">
                    <a href="/swagger">
                        <h2>Swagger UI</h2>
                        <span>Documentação técnica tradicional</span>
                    </a>

                    <a href="/scalar">
                        <h2>Scalar</h2>
                        <span>Documentação moderna e interativa</span>
                    </a>
                </div>
            </main>
        </body>
        </html>
    `);
});

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