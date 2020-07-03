import 'whatwg-fetch';

export async function fetchApi<T>(url: string, method: string, data?: T) {
    const response = await fetch(url, {
        method,
        body: data ? JSON.stringify(data) : undefined,
    });

    const body = await response.text();
    try {
        return JSON.parse(body);
    } catch (e) {
        return body;
    }
}
