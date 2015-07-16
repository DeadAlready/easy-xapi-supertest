/**
 * Created by karl on 16/07/15.
 */
/// <reference path='typings/tsd.d.ts' />
'use strict';
var request = require('supertest');
function getAgentFactory(app, transform) {
    return function getAgent(headers) {
        if (transform) {
            headers = transform.apply(transform, arguments);
        }
        function addHeaders(r) {
            return Object.keys(headers).reduce(function (prev, current) {
                return prev.set('x-' + current, headers[current]);
            }, r);
        }
        function makeRequest(type, url, add) {
            if (add === void 0) { add = false; }
            var r = request(app)[type](url);
            if (add) {
                return addHeaders(r);
            }
            return r;
        }
        function bodyLess(method) {
            return function (url) {
                return makeRequest(method, url, true);
            };
        }
        function withBody(method) {
            return function (url) {
                return {
                    send: function (data) {
                        var r = makeRequest(method, url).send(data);
                        return addHeaders(r);
                    },
                    attach: function (arg1, arg2) {
                        var r = makeRequest(method, url).attach(arg1, arg2);
                        return addHeaders(r);
                    }
                };
            };
        }
        return {
            get: bodyLess('get'),
            delete: bodyLess('delete'),
            post: withBody('post'),
            patch: withBody('patch'),
            put: withBody('put')
        };
    };
}
exports.getAgentFactory = getAgentFactory;
//# sourceMappingURL=index.js.map