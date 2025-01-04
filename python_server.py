from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class PythonRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/data':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {
                'message': 'Hello from Python server!',
                'data': [1, 2, 3, 4, 5]
            }
            self.wfile.write(json.dumps(response).encode())
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')

def run(server_class=HTTPServer, handler_class=PythonRequestHandler, port=5000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Python server running on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
