
from eve import Eve
from eve_swagger import swagger, add_documentation

app = Eve()
app.register_blueprint(swagger)

# required. See http://swagger.io/specification/#infoObject for details.
app.config['SWAGGER_INFO'] = {
    'title': 'hybr.in API',
    'version': '1.0',
    'description': 'an API description',
    'termsOfService': 'BSD',
    'contact': {
        'name': 'yogesh sharma <sharma.yogesh.1234@gmail.com>',
        'url': 'http://hybr.in'
    },
    'license': {
        'name': 'BSD',
        'url': 'https://github.com/pyeve/eve-swagger/blob/master/LICENSE',
    }
}

# optional. Will use flask.request.host if missing.
# app.config['SWAGGER_HOST'] = 'hybr.in'

if __name__ == '__main__':
    app.run(port='8081')
