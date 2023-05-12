const http = require('http');
const { join } = require('path');
const carsDatabase = join(__dirname, './../../database', 'cars.json');

class Server {
    constructor() {
        this.routes = {
            '/rent:post': async (request, response) => {
                // const carService = new CarService({ cars: carsDatabase });
        
                const body = await this.getBody(request);
        
                console.log({ body })
        
        
                response.writeHead(200);
                response.write('');
        
                return response.end();
            },
            default: (request, response) => {
                response.writeHead(404);
                response.write('Not Found');
        
                return response.end();
            }
        }
    }

    handler(request, response) {
        const { url, method } = request;
        const routeKey = `${url}:${method.toLowerCase()}`;
        console.log(this.routes)
        const selectedRoute = this.routes[routeKey] || routes.default;
    
        response.writeHead(200, {
            'Content-Type': 'text/json',
        });
    
        return selectedRoute(request, response);
    }

    getBody(request) {
        return new Promise((resolve, reject) => {
            let body = []

            request
                .on('data', (chunk) => {
                    body.push(chunk);
                })
                .on('end', () => {
                    body = Buffer.concat(body).toString();
                    resolve(JSON.parse(body));
                })
                .catch(error => reject(error));
        })
    }

    app() {
        return http.createServer(this.handler).listen(8000, () => console.log('app running at', 3000));
    }
}

module.exports = Server;