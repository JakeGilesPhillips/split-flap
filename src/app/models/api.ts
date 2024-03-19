export interface Schedule {
    Session: string;
    Room: string;
    RoomKey: string;
    AgendaOrder: number;
    StartTime: Date;
    EndTime: Date;
    StartDate: Date;
    Speakers: string;
    ScreenStartTime: Date;
    ScreenEndTime: Date;
    FlightStatus: string,
    FilterDateTime: Date;
    ShortDescription: string;
    QrCodePNG: string;
    QrCodeSVG: string;
    Level: string;
    PrimaryTheme: string;
}