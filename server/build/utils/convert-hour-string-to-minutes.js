"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.converthourStringToMinutes = void 0;
function converthourStringToMinutes(hourString) {
    const [hours, minutes] = hourString.split(':').map(Number);
    const minutesAmount = (hours * 60) + minutes;
    return minutesAmount;
}
exports.converthourStringToMinutes = converthourStringToMinutes;
