#! /usr/bin/python

from eve import Eve
from eve.auth import BasicAuth

class MyAuthenticate(BasicAuth):
    def check_auth(self, email_address, password, allowed_roles, resource, method):
        if method == 'GET':
            users = app.data.driver.db['users']
            user = users.find_one({'email_address':email_address,'password':password})
            if user:
                return True
            else:
                return False
        elif method == 'POST':
            return email_address == 'admin@hybr.in' and password == 'abc123'
        else:
            return True


# app = Eve(auth=MyAuthenticate)
app = Eve()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
