export interface IOfferData {
    ID: string,
    UserID: string,
    VehicleID: string,
    StartingPoint: string,
    EndingPoint: string,
    ViaPoints: string,
    SeatsAvailable: number,
    MoneyRecieved: number,
    IsClosed: Boolean,
    Date: Date,
    Time: string,
    OfferPrice: number,
}