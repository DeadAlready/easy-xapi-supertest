# easy-xapi-supertest

It is a wrapper for creating an Agent type supertest object, that adds x-headers to the outgoing request object.

## Usage

	var eSupertest = require('easy-xapi-supertest');
	var app = require('../app');
	
	var getAgent = eSupertest.getAgentFactory(app);
	
	var agent = getAgent({
		user: 'Jack',
		role: 'user'
	});
	
You can also pass a transform function to the agentFactory function

	var eSupertest = require('easy-xapi-supertest');
	var app = require('../app');
	
	var getAgent = eSupertest.getAgentFactory(app, function (user, role) {
		return {
			user: user,
			role: role || 'user'
		}
	});
	
	var agent = getAgent('Jack');
	
## Licence

The MIT License (MIT)

Copyright (c) 2015 Karl Düüna

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

