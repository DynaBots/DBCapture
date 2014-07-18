var Query = function(queryString) {
    "use strict";
    var parseQuery = function(q) {
        var i, ps, p, keyval, arr = [];
        if ("undefined" == typeof q || null === q || "" === q) return arr;
        0 === q.indexOf("?") && (q = q.substring(1));
        ps = q.toString().split(/[&;]/);
        for (i = 0; ps.length > i; i++) {
            p = ps[i];
            keyval = p.split("=");
            arr.push([ keyval[0], keyval[1] ]);
        }
        return arr;
    }, params = parseQuery(queryString), toString = function() {
        var i, param, s = "";
        for (i = 0; params.length > i; i++) {
            param = params[i];
            s.length > 0 && (s += "&");
            s += param.join("=");
        }
        return s.length > 0 ? "?" + s : s;
    }, decode = function(s) {
        s = decodeURIComponent(s);
        s = s.replace("+", " ");
        return s;
    }, getParamValue = function(key) {
        var param, i;
        for (i = 0; params.length > i; i++) {
            param = params[i];
            if (decode(key) === decode(param[0])) return param[1];
        }
    }, getParamValues = function(key) {
        var i, param, arr = [];
        for (i = 0; params.length > i; i++) {
            param = params[i];
            decode(key) === decode(param[0]) && arr.push(param[1]);
        }
        return arr;
    }, deleteParam = function(key, val) {
        var i, param, keyMatchesFilter, valMatchesFilter, arr = [];
        for (i = 0; params.length > i; i++) {
            param = params[i];
            keyMatchesFilter = decode(param[0]) === decode(key);
            valMatchesFilter = decode(param[1]) === decode(val);
            (1 === arguments.length && !keyMatchesFilter || 2 === arguments.length && !keyMatchesFilter && !valMatchesFilter) && arr.push(param);
        }
        params = arr;
        return this;
    }, addParam = function(key, val, index) {
        if (3 === arguments.length && -1 !== index) {
            index = Math.min(index, params.length);
            params.splice(index, 0, [ key, val ]);
        } else arguments.length > 0 && params.push([ key, val ]);
        return this;
    }, replaceParam = function(key, newVal, oldVal) {
        var i, param, index = -1;
        if (3 === arguments.length) {
            for (i = 0; params.length > i; i++) {
                param = params[i];
                if (decode(param[0]) === decode(key) && decodeURIComponent(param[1]) === decode(oldVal)) {
                    index = i;
                    break;
                }
            }
            deleteParam(key, oldVal).addParam(key, newVal, index);
        } else {
            for (i = 0; params.length > i; i++) {
                param = params[i];
                if (decode(param[0]) === decode(key)) {
                    index = i;
                    break;
                }
            }
            deleteParam(key);
            addParam(key, newVal, index);
        }
        return this;
    };
    return {
        getParamValue: getParamValue,
        getParamValues: getParamValues,
        deleteParam: deleteParam,
        addParam: addParam,
        replaceParam: replaceParam,
        toString: toString
    };
};

var Uri = function(uriString) {
    "use strict";
    var strictMode = false, parseUri = function(str) {
        var parsers = {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }, keys = [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor" ], q = {
            name: "queryKey",
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        }, m = parsers[strictMode ? "strict" : "loose"].exec(str), uri = {}, i = 14;
        while (i--) uri[keys[i]] = m[i] || "";
        uri[q.name] = {};
        uri[keys[12]].replace(q.parser, function($0, $1, $2) {
            $1 && (uri[q.name][$1] = $2);
        });
        return uri;
    }, uriParts = parseUri(uriString || ""), queryObj = new exports.Query(uriParts.query), protocol = function(val) {
        "undefined" != typeof val && (uriParts.protocol = val);
        return uriParts.protocol;
    }, hasAuthorityPrefixUserPref = null, hasAuthorityPrefix = function(val) {
        "undefined" != typeof val && (hasAuthorityPrefixUserPref = val);
        return null === hasAuthorityPrefixUserPref ? -1 !== uriParts.source.indexOf("//") : hasAuthorityPrefixUserPref;
    }, userInfo = function(val) {
        "undefined" != typeof val && (uriParts.userInfo = val);
        return uriParts.userInfo;
    }, host = function(val) {
        "undefined" != typeof val && (uriParts.host = val);
        return uriParts.host;
    }, port = function(val) {
        "undefined" != typeof val && (uriParts.port = val);
        return uriParts.port;
    }, path = function(val) {
        "undefined" != typeof val && (uriParts.path = val);
        return uriParts.path;
    }, query = function(val) {
        "undefined" != typeof val && (queryObj = new Query(val));
        return queryObj;
    }, anchor = function(val) {
        "undefined" != typeof val && (uriParts.anchor = val);
        return uriParts.anchor;
    }, setProtocol = function(val) {
        protocol(val);
        return this;
    }, setHasAuthorityPrefix = function(val) {
        hasAuthorityPrefix(val);
        return this;
    }, setUserInfo = function(val) {
        userInfo(val);
        return this;
    }, setHost = function(val) {
        host(val);
        return this;
    }, setPort = function(val) {
        port(val);
        return this;
    }, setPath = function(val) {
        path(val);
        return this;
    }, setQuery = function(val) {
        query(val);
        return this;
    }, setAnchor = function(val) {
        anchor(val);
        return this;
    }, getQueryParamValue = function(key) {
        return query().getParamValue(key);
    }, getQueryParamValues = function(key) {
        return query().getParamValues(key);
    }, deleteQueryParam = function(key, val) {
        2 === arguments.length ? query().deleteParam(key, val) : query().deleteParam(key);
        return this;
    }, addQueryParam = function(key, val, index) {
        3 === arguments.length ? query().addParam(key, val, index) : query().addParam(key, val);
        return this;
    }, replaceQueryParam = function(key, newVal, oldVal) {
        3 === arguments.length ? query().replaceParam(key, newVal, oldVal) : query().replaceParam(key, newVal);
        return this;
    }, toString = function() {
        var s = "", is = function(s) {
            return null !== s && "" !== s;
        };
        if (is(protocol())) {
            s += protocol();
            protocol().indexOf(":") !== protocol().length - 1 && (s += ":");
            s += "//";
        } else hasAuthorityPrefix() && is(host()) && (s += "//");
        if (is(userInfo()) && is(host())) {
            s += userInfo();
            userInfo().indexOf("@") !== userInfo().length - 1 && (s += "@");
        }
        if (is(host())) {
            s += host();
            is(port()) && (s += ":" + port());
        }
        is(path()) ? s += path() : is(host()) && (is(query().toString()) || is(anchor())) && (s += "/");
        if (is(query().toString())) {
            0 !== query().toString().indexOf("?") && (s += "?");
            s += query().toString();
        }
        if (is(anchor())) {
            0 !== anchor().indexOf("#") && (s += "#");
            s += anchor();
        }
        return s;
    }, clone = function() {
        return new Uri(toString());
    };
    return {
        protocol: protocol,
        hasAuthorityPrefix: hasAuthorityPrefix,
        userInfo: userInfo,
        host: host,
        port: port,
        path: path,
        query: query,
        anchor: anchor,
        setProtocol: setProtocol,
        setHasAuthorityPrefix: setHasAuthorityPrefix,
        setUserInfo: setUserInfo,
        setHost: setHost,
        setPort: setPort,
        setPath: setPath,
        setQuery: setQuery,
        setAnchor: setAnchor,
        getQueryParamValue: getQueryParamValue,
        getQueryParamValues: getQueryParamValues,
        deleteQueryParam: deleteQueryParam,
        addQueryParam: addQueryParam,
        replaceQueryParam: replaceQueryParam,
        toString: toString,
        clone: clone
    };
};

exports.Query = Query;

exports.Uri = Uri;