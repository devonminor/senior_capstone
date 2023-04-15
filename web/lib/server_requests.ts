export const fetcher = async (uri: string) => {
    const response = await fetch(uri);
    return response.json();
};

export async function postRequest(url: string, { arg }: { arg: any}) {
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(arg)
    })
}

export async function putRequest(url: string, { arg }: { arg: any}) {
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(arg)
    })
}

export async function deleteRequest(url: string, { arg }: { arg: any}) {
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(arg)
    })
}