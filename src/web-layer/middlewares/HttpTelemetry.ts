import { Handler } from 'express';
import { telemetry } from '../../telemetry';
import { logger } from '../../logs';

// Removes ":", heading/trailing / and replaces / by _ in a given route name
function sanitize(routeName) {
    return routeName.replace(/:/g, "").replace(/^\/|\/$/g, "").replace(/\//g, "_");
}

// Extracts a route name from the request or response
function findRouteName(req, res) {
    // Did we get a hard coded name, or should we figure one out?
    if (res.locals && res.locals.statsdUrlKey) {

        return res.locals.statsdUrlKey;
    }

    if (req.route && req.route.path) {
        var routeName = req.route.path;

        if (Object.prototype.toString.call(routeName) === '[object RegExp]') {
            routeName = routeName.source;
        }

        if (req.baseUrl) {
            routeName = req.baseUrl + routeName;
        } else if (routeName === '/') {
            routeName = 'root';
        }

        if (req.params) {
            Object.keys(req.params).forEach(function (key) {
                if (req.params[key] === '') return;
                routeName = routeName.replace(req.params[key], ':' + key);
            });
        }
        return sanitize(routeName);
    }
}


export function httpTelemetry(): Handler {
    return httpTelemetryImpl
}

function httpTelemetryImpl(req, res, next) {
    // start timer
    var startTime = new Date();
    var notFoundRouteName = 'unknown_express_route';

    // Shadow end request
    var end = res.end;
    res.end = function () {
        res.end = end;
        end.apply(res, arguments);

        let methodName: string = req.method.toLowerCase();
        let routerName = findRouteName(req, res) || notFoundRouteName;
        let urlPrefix: string = `http.${methodName}.${routerName}.`;

        telemetry.increment(`${urlPrefix}.response_code.${res.statusCode}`);
        telemetry.timing(`${urlPrefix}.response_time.${res.statusCode}`, startTime);
        let diff: number = new Date().getTime() - startTime.getTime();
        logger.info("urlPrefix: %s response_code: %s response_time: %s", urlPrefix, res.statusCode, diff);
    };
    next();
}