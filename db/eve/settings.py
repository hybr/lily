
MONGO_HOST = 'localhost'
MONGO_PORT =  27017
MONGO_DBNAME = 'db2'

X_DOMAINS = "*"
X_HEADERS = ['Authorization','Content-type']
X_ALLOW_CREDENTIALS = True

# Enable reads (GET), inserts (POST) and DELETE for resources/collections
# (if you omit this line, the API will default to ['GET'] and provide
# read-only access to the endpoint).
RESOURCE_METHODS = ['GET', 'POST', 'DELETE']

# Enable reads (GET), edits (PATCH) and deletes of individual items
# (defaults to read-only item access).
ITEM_METHODS = ['GET', 'PATCH', 'DELETE']

# We enable standard client cache directives for all resources exposed by the
# API. We can always override these global settings later.
CACHE_CONTROL = 'max-age=10,must-revalidate',
CACHE_EXPIRES = 10

# ----------------------------------------------------------------
users = {
	'resource_title' : 'Users',
	'item_title': 'User',
	'soft_delete': True,

	'additional_lookup': {
		'url': 'regex("^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$")',
		'field': 'email_address'
	},

	'schema': {
		'web_domain': {
			'type': 'string',
			'required': True
		},
		'email_address': {
			'type': 'string',
			'required': True
		},
		'password': {
			'type': 'string',
			'required': True,
			'minlength': 8
		}
	}
}

# ----------------------------------------------------------------
people = {
	'resource_title' : 'People',
	'item_title': 'Person',
	'soft_delete': True,
	
	'schema' : {
		'web_domain': {
			'type': 'string',
			'required': True
		},	
		'names' : {
			'type' : 'list',
			'schema' : {
				'type' : 'dict',
				'schema' : {
					'first_name' : {
						'type' : 'string'
					},
					'last_name' : {
						'type' : 'string'
					}
				}
			}
		}
	}
}

# ----------------------------------------------------------------
DOMAIN = {
	'users' : users,
	'people' : people
}
