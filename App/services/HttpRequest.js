
export default class HttpRequest {

    static get(url) {
        return fetch(url)
        .then(res => res.json())
        .then(res => res);
    }



}