import json
import re
from http.server import BaseHTTPRequestHandler, HTTPServer

# Load country and city data
with open('data/countries_cities.json') as f:
    countries_data = json.load(f)['countries']

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.serve_file('static/index.html', 'text/html')
        elif self.path.startswith('/api/'):
            self.handle_api()
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')

    def serve_file(self, path, content_type):
        try:
            with open(path, 'rb') as f:
                content = f.read()
            self.send_response(200)
            self.send_header('Content-type', content_type)
            self.end_headers()
            self.wfile.write(content)
        except:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')

    def handle_api(self):
        if self.path == '/api/countries':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps([
                {'code': c['code'], 'name': c['name'], 'phone_code': c['phone_code']}
                for c in countries_data
            ]).encode())
        elif self.path.startswith('/api/cities/'):
            country_code = self.path.split('/')[-1]
            country = next((c for c in countries_data if c['code'] == country_code), None)
            if country:
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(country['cities']).encode())
            else:
                self.send_response(404)
                self.end_headers()
                self.wfile.write(b'Country not found')
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')

def run(server_class=HTTPServer, handler_class=RequestHandler, port=8080):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
