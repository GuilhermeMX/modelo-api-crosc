export function extractQueryParams(query) {
    return query.substr(1).split('&').reduce((queryParams, param) => {

    }, {}) 
}