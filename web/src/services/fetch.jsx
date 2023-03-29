import { LOCALSTORAGE_KEY } from '../components/SignIn';

//TODO: MOVER
const baseUrl = 'http://localhost:8080';

export default async function (url, options, expectsBlob = false) {
    const defaultHeaders = {}

    if (!options || !(options.body instanceof FormData))
        defaultHeaders['Content-Type'] = 'application/json';

    const token = localStorage.getItem(LOCALSTORAGE_KEY);
    if (token)
        defaultHeaders['Authorization'] = `Bearer ${token}`;

    const _options = Object.assign({ headers: {}, mode: 'cors' }, options);
    _options.headers = Object.assign(defaultHeaders, options && options.headers);

    return fetch(`${baseUrl}/${url}`, _options);
}