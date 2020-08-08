export  function GetDate() {
    var tempDate = new Date();
    var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
    return date.toString();
}
export function DateFormat(data:Date)
{
    var date=new Date(data);
    var dateInFormat=date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
    return dateInFormat;
}
export function YearDateFormat(data:Date)
{
    var date=new Date(data);
    var month;
    if(date.getMonth()<9)
    {
        month='0'+(date.getMonth()+1);
    }
    else{
        month=date.getMonth();
    }
    var dateInFormat=date.getFullYear()+'-'+month+'-'+date.getDate();
    return dateInFormat;
}