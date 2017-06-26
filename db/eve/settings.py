
MONGO_HOST = 'localhost'
MONGO_PORT =  27017
MONGO_DBNAME = 'db2'

X_DOMAINS = "*"
X_HEADERS = ['Authorization','Content-type', 'If-Match', 'Origin', 'X-Auth-Token']
X_ALLOW_CREDENTIALS = True

# Enable reads (GET), inserts (POST) and DELETE for resources/collections
# (if you omit this line, the API will default to ['GET'] and provide
# read-only access to the endpoint).
RESOURCE_METHODS = ['GET', 'POST', 'DELETE']

# Enable reads (GET), edits (PATCH) and deletes of individual items
# (defaults to read-only item access).
ITEM_METHODS = ['GET', 'PATCH', 'PUT', 'DELETE']

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
			'required': True,
			'regex' : '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
		},
		'passwords': {
			'type': 'list',
			'minlength': 1,
			'schema' : {
				'type' : 'string',
				'minlength': 8,
				'required': True
			},
				
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
			'minlength': 1,
			'schema' : {
				'type' : 'dict',
				'schema' : {
					'prefix' : {
						'type' : 'string',
						'regex' : '^[a-zA-Z.]*$'
					},
					'first' : {
						'type' : 'string',
						'required' : True,
						'regex' : '^[a-zA-Z]+$'
					},
					'middle' : {
						'type' : 'string',
						'regex' : '^[a-zA-Z]*$'
					},
					'last' : {
						'type' : 'string',
						'regex' : '^[a-zA-Z]*$'
					},
					'suffix' : {
						'type' : 'string',
						'regex' : '^[a-zA-Z.]*$'
					}
				}
			}
		},
		'gender' : {
			'type' : 'string',
			'allowed' : ['female', 'male', 'other']
		},

		'login_credentials': {
			'type': 'list',
			'minlength': 1,
			'schema' : {
				'type': 'objectid',
            	'data_relation': {
                	'resource': 'users',
                	'field' : '_id'
            	}
			},		
		},

		'phone_numbers': {
			'type': 'list',
			'schema' : {
				'type': 'objectid',
            	'data_relation': {
                	'resource': 'phones',
                	'field' : '_id',
                	'embeddable' : True
            	}
			},		
		}
	}
}

# ----------------------------------------------------------------
phones = {
	'resource_title' : 'Phones',
	'item_title': 'Phone',
	'soft_delete': True,
	
	'schema' : {

		'web_domain': {
			'type': 'string',
			'required': True
		},	

		'phone_number' : {
			'type' : 'string',
			'regex' : '^[0-9]{10,13}$'
		},

		'use': {
			'type': 'list',
			'minlength': 1,
			'schema' : {
				'type' : 'string',
				'allowed' : ['for home', 'for work', 'by madam', 'by sir', 'of landline', 'of mobile', 'as primary', 'on contact us webpage', 'other']
			},	
		},

		'other_use': {
			'type' : 'string',
			'regex' : '^$|[0-9a-zA-Z ]{3,15}'
		}
	}
}

# ----------------------------------------------------------------
web_sliders = {
	'resource_title' : 'Web Sliders',
	'item_title': 'Web ',
	'soft_delete': True,
	
	'schema' : {

		'web_domain': {
			'type': 'string',
			'required': True
		},	

		'title' : {
			'type' : 'string'
		},

		'link' : {
			'type' : "string"
		}

	}
}

# ----------------------------------------------------------------
web_pages = {
	'resource_title' : 'Web Pages',
	'item_title': 'Web Page',
	'soft_delete': True,
	
	'schema' : {

		'web_domain': {
			'type': 'string',
			'required': True
		},	

		'use' : {
			'type' : 'string',
			'allowed' : ['home page', 'about us page', 'other']
		},

		'key_words': {
			'type': 'string',
			'required': True
		},

		'title' : {
			'type' : 'string',
			'required': True
		},

		'sections' : {
			'type' : 'list',
			'minlength': 1,
			'schema' : {
				'type' : 'dict',
				'schema' : {
					'type' : {
						'type' : 'string',
						'allowed' : ['paragraph', 'slider']
					},
					'paragraph' : {
						'type' : 'string'
					},
					'slider': {
						'type': 'list',
						'schema' : {
							'type': 'objectid',
			            	'data_relation': {
			                	'resource': 'web_sliders',
			                	'field' : '_id',
			                	'embeddable' : True
			            	}
						},		
					}


				}
			}
		}

	}
}
# ----------------------------------------------------------------
DOMAIN = {
	'users' : users,
	'phones' : phones,
	'people' : people,
	'web_sliders' : web_sliders,
	'web_pages' : web_pages
}

# cd git\lily\db\eve