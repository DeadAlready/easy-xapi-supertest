/**
 * Created by karl on 16/07/15.
 */
/// <reference path='typings/tsd.d.ts' />

'use strict';

import express = require('express');
import request = require('supertest');

interface BodyAgent {
    send(data: Object): any;
    attach(arg1: any, arg2?: any): any;
}

interface Agent {
    get(url): any;
    delete(url): any;
    post(url): BodyAgent;
    patch(url): BodyAgent;
    put(url): BodyAgent;
}

export function getAgentFactory(app: express.Application, transform?: Function): Function {
    return function getAgent(headers: Object): Agent {

        if(transform) {
            headers = transform.apply(transform, arguments);
        }

        function addHeaders(r) {
            return Object.keys(headers).reduce(function (prev, current) {
                return prev.set('x-' + current, headers[current]);
            }, r);
        }

        function makeRequest(type, url, add = false) {
            var r = request(app)[type](url);
            if(add) {
                return addHeaders(r);
            }
            return r;
        }

        function bodyLess(method) {
            return function (url) {
                return makeRequest(method, url, true);
            }
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
                }
            }
        }

        return {
            get: bodyLess('get'),
            delete: bodyLess('delete'),
            post: withBody('post'),
            patch: withBody('patch'),
            put: withBody('put')
        };
    }
}