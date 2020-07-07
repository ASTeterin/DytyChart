var Worker = /** @class */ (function () {
    function Worker(id, name, isDuty, isDutyOnWedn, isDutyOnLetters, idGroup, countAbsencePeriod, color, fontColor, unwantedSlots, desirableSlots) {
        this.id = id;
        this.name = name;
        this.isDuty = isDuty;
        this.isDutyOnWedn = isDutyOnWedn;
        this.isDutyOnLetters = isDutyOnLetters;
        this.idGroup = idGroup;
        this.countAbsencePeriod = countAbsencePeriod;
        this.color = color;
        this.fontColor = fontColor;
        this.unwantedSlots = unwantedSlots;
        this.desirableSlots = desirableSlots;
    }
    return Worker;
}());
export { Worker };
//# sourceMappingURL=worker.js.map