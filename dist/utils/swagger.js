import config from "./env.js";
import swaggerJSDoc from "swagger-jsdoc";
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-Commerce API Documentation ",
            version: "1.0.0",
            description: "dokumentasi lengkap API ecommerce",
            contact: {
                name: "Backend Developer",
            }
        },
        servers: [
            { url: `${config.HOST}:${config.PORT}/api`, description: "Development Server"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFromat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            },
        ],
    },
    apis: ["src/routes/*.ts"]
};
const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
//# sourceMappingURL=swagger.js.map
