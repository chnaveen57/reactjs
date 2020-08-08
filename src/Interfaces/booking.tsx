export interface IBookingData {
    ID: string,
    UserID: string,
    RentalOfferID: string,
    StartingPoint: string,
    EndingPoint: string,
    SeatsNeeded: number,
    IsAccepted: Boolean,
    IsRejected: Boolean,
    Date: Date,
    Time: string,
    Cost: number,
}