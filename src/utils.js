const Apify = require('apify');
const url = require('url');

function getOriginUrl(request) {
    const parsed = url.parse(request.url, true, true);
    const originUrl = url.format({
        protocol: parsed.protocol,
        hostname: parsed.hostname,
    });
    return originUrl;
}

function getHostname(request) {
    const parsed = url.parse(request.url, true, true);
    const originUrl = url.format({
        hostname: parsed.hostname,
    });
    return originUrl;
}

function getCurrency(request) {
    const parsed = url.parse(request.url, true, true);
    switch (parsed.hostname) {
        case 'www.amazon.com':
            return 'USD';
        case 'www.amazon.co.uk':
            return 'GBP';
        case 'www.amazon.de':
            return 'EUR';
        case 'www.amazon.fr':
            return 'EUR';
        case 'www.amazon.it':
            return 'EUR';
        case 'www.amazon.in':
            return 'INR';
        case 'www.amazon.ca':
            return 'CAD';
        case 'www.amazon.es':
            return 'EUR';
    }
}

module.exports = { getOriginUrl, getHostname, getCurrency };
