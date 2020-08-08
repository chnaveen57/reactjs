export async function GetBookingRating(id:string) {
    let url = '/rating/' + id;
    const res = await fetch(url);
    const json = await res.json();
    return json;
}
export async function PostRating(data:string) {
    const res = await fetch('/rating', {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (res.status === 200) {
        return true;
    }
    else {
        return false;
    }
}