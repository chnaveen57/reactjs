export async function UserWallet() {
    let url = '/wallet/balance/' + JSON.parse(localStorage.getItem('user')!).userID;
    const res = await fetch(url);
    const json = await res.json();
    return json;
}
export async function AddWallet() {
    fetch('/wallet', {
        method: 'POST',
        body: JSON.stringify({
            "ID": JSON.parse(localStorage.getItem('user')!).userID,
            "balance": 0
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status === 200) {
            return true;
        }
        else {
            return false;
        }
    }).catch(err => err);
}
export async function UpdateBalance(balance:number, id:string) {
    const res = await fetch('/wallet', {
        method: 'PUT',
        body: JSON.stringify({
            "ID": id,
            "balance": balance
        }),
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