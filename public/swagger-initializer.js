window.onload = function () {
    SwaggerUIBundle({
        url: "./openapi.yaml",
        dom_id: "#swagger-ui",
        deepLinking: true,
        presets: [
            SwaggerUIBundle.presets.apis
        ],
        layout: "BaseLayout"
    });
};