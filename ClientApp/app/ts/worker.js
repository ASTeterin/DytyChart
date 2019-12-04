var Worker = /** @class */ (function () {
    function Worker(id, name, isDuty, isDutyOnWedn, isDutyOnLetters, idGroup, countAbsencePeriod, color, unwantedSlots) {
        this.id = id;
        this.name = name;
        this.isDuty = isDuty;
        this.isDutyOnWedn = isDutyOnWedn;
        this.isDutyOnLetters = isDutyOnLetters;
        this.idGroup = idGroup;
        this.countAbsencePeriod = countAbsencePeriod;
        this.color = color;
        this.unwantedSlots = unwantedSlots;
    }
    return Worker;
}());
export { Worker };
//# sourceMappingURL=worker.js.map