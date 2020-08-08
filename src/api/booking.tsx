export async function GetOffers(jsonData:string) {
    let url = '/rentaloffer/AvailableRentalOffer/' + jsonData;
    const res = await fetch(url);
    const json = await res.json();
    return json;
}
export async function PostBooking(data:string) {
    fetch('/booking', {
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
export async function UpdateBooking(data:any) {
    const res = await fetch('/booking', {
        method: 'PUT',
        body: JSON.stringify(data),
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
export async function GetBookings() {
    let url = '/booking/user/' + JSON.parse(localStorage.getItem('user')!).userID;
    const res = await fetch(url);
    const json = await res.json();
    return json;
}
export async function OfferBookings(id:string) {
    let url = '/booking/BookingsByOffer/' + id;
    const res = await fetch(url);
    const json = await res.json();
    return json;
}
export async function DeleteBooking(id:string) {
    let url = '/booking/' + id;
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
            alert('Server unreachable to Delete Booking');
        }
    }).catch(err => err);
}
export async function DeleteOfferBooking(id:string) {
    let url = '/booking/OfferBookings/' + id;
    const res = await fetch(url, {
        method: 'DELETE',
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