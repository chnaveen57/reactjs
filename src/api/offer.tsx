export async function PostOffer(data:string) {
    fetch('/rentaloffer', {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status === 200) {
            window.location.reload();
        }
        else {
            alert('Server unreachable to Post Offer');
        }
    }).catch(err => err);
}
export async function GetOffers() {
    let url = '/rentaloffer/user/' + JSON.parse(localStorage.getItem('user')!).userID;
    const res = await fetch(url);
    const json = await res.json();
    return json;
}
export async function UpdateOffer(data:string) {
    const res = await fetch('/rentaloffer', {
        method: 'PUT',
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
export async function DeleteOffer(id:string) {
    let url = '/rentaloffer/' + id;
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status === 200) {
            window.location.reload();
        }
        else {
            alert('Server unreachable to Delete offer');
        }
    }).catch(err => err);
}