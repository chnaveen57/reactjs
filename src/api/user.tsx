import { AddWallet } from './wallet';
import { GetVehicles } from './vehicle'
export async function IsUserExists(email:string, password:string) {
    let url = '/user/' + email;
    fetch(url)
        .then(res =>
            res.json())
        .then(async (data) => {
            if (data != null) {
                if (data.Password === password) {
                    localStorage.setItem('user', JSON.stringify({
                        'userID': data.ID,
                        'FirstName': data.FirstName,
                        'LastName': data.LastName
                    }))
                    await GetVehicles();
                    window.location.href = "/home";

                }
                else {
                    alert('Wrong Password');
                }
            }
            else {
                alert('No user Exist');
                window.location.href = "/register"
            }
        })
        .catch(console.log);
}
export async function RegisterUser(id:string, password:string) {
    fetch('/user', {
        method: 'POST',
        body: JSON.stringify({
            "ID": id,
            "Password": password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async res => {
        if (res.status === 200) {
            localStorage.setItem('user', JSON.stringify({
                'userID': id,
                'FirstName': '',
                'LastName': ''
            }))
            await AddWallet();
            await GetVehicles();
            window.location.href = "/home";
        }
        else {
            alert('Server unreachable');
        }
    }).catch(err => err);
}
export async function UpdateUser(FirstName:string, LastName:string) {
    fetch('/user', {
        method: 'PUT',
        body: JSON.stringify({
            "ID": JSON.parse(localStorage.getItem('user')!).userID,
            "FirstName": FirstName,
            "LastName": LastName
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status === 200) {
            const user = JSON.stringify({
                "FirstName": FirstName,
                "LastName": LastName,
                "userID": JSON.parse(localStorage.getItem('user')!).userID
            });
            localStorage.removeItem('user');
            localStorage.setItem('user', user);
            window.location.reload();
        }
        else {
            alert('Server unreachable to update balance');
        }
    }).catch(err => err);
}