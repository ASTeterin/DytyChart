var Worker = /** @class */ (function () {
    function Worker(id, name, isDuty, isDutyOnWedn, isDutyOnLetters, idGroup, countAbsencePeriod, color, unwantedSlots, desirableSlots) {
        this.id = id;
        this.name = name;
        this.isDuty = isDuty;
        this.isDutyOnWedn = isDutyOnWedn;
        this.isDutyOnLetters = isDutyOnLetters;
        this.idGroup = idGroup;
        this.countAbsencePeriod = countAbsencePeriod;
        this.color = color;
        this.unwantedSlots = unwantedSlots;
        this.desirableSlots = desirableSlots;
    }
    Worker.prototype.getWorkerName = function (workers) {
        var _this = this;
        var worker = workers.find(function (w) { return w.id == _this.id; });
        return worker ? worker.name : "";
    };
    Worker.prototype.getWorkerColor = function (workers, workerId) {
        var worker = workers.find(function (w) { return w.id == workerId; });
        return worker ? worker.color : "";
    };
    return Worker;
}());
export { Worker };
//# sourceMappingURL=worker.js.map