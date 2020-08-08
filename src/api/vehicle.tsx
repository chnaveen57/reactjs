export  async function GetVehicles() {
    let url = '/vehicle/user/' + JSON.parse(localStorage.getItem('user')!).userID;
    const res = await fetch(url);
    const json = await res.json();
    localStorage.setItem("vehicle",JSON.stringify({
        "count":json.length,
        "vehicles":json
    }));
    return json;
}
export async function RegisterVehicle(model:string,number:string,capacity:string)
{
    var vehicleId=JSON.parse(localStorage.getItem('user')!).userID+((JSON.parse(localStorage.getItem('vehicle')!).count)+1)
    fetch('/vehicle', {
        method: 'POST',
        body: JSON.stringify({
            "ID":vehicleId,
            "UserID": JSON.parse(localStorage.getItem('user')!).userID,
            "Model":model,
            "Number":number,
            "Capacity":parseInt(capacity)
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if(res.status===200)
        {
            window.location.reload();
        }
        else{
            alert('Server unreachable to add vehicle');
        }
    }).catch(err => err);
}