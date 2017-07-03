#! /usr/bin/python

from eve import Eve
from eve.auth import BasicAuth
from flask import current_app as app

class HybrAuthenticator(BasicAuth):
    def check_auth(self, email_address, password, allowed_roles, resource, method):
        
        # get uses table handler
        users = app.data.driver.db['users']

        # make user search condition
        lookup = {'email_address': email_address}
        lookup['passwords'] = {'$in': password}

        if allowed_roles:
            # only retrieve a user if his roles match ``allowed_roles``
            lookup['roles'] = {'$in': allowed_roles}

        user = users.find_one(lookup)

        if user:
            return True


app = Eve(auth=HybrAuthenticator)
# app = Eve()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
