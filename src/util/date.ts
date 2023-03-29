import dayjs from "dayjs";

export const formatDateTime = (startDateTime: Date, endDateTime: Date) => {
    const start = dayjs(startDateTime.toISOString().slice(0, -1));
    const end = dayjs(endDateTime.toISOString().slice(0, -1));
    const startTime = start.format("HH:mm");
    const endTime = end.format("HH:mm");
    const date = start.format("DD/MM/YYYY");

    return [date, `${startTime} - ${endTime}`];
}