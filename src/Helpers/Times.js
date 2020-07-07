export const times = 
[
    {hour: "8", period: "AM", row: 1},
    {hour: "9", period: "AM", row: 2},
    {hour: "10", period: "AM", row: 3},
    {hour: "11", period: "AM", row: 4},
    {hour: "12", period: "AM", row: 5},
    {hour: "1", period: "PM", row: 6},
    {hour: "2", period: "PM", row: 7},
    {hour: "3", period: "PM", row: 8},
    {hour: "4", period: "PM", row: 9},
    {hour: "5", period: "PM", row: 10},
    {hour: "6", period: "PM", row: 11},
    {hour: "7", period: "PM", row: 12}
]

export const days = (day) =>
{
    switch(day)
    {
        case "monday": 
            return 1;
        case "tuesday": 
            return 2;
        case "wenesday":
            return 3;
        case "thursday":
            return 4;
        case "friday":
            return 5;
        default:
            return 1;
    }
}