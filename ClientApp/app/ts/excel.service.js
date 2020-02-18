var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { DatePipe } from '@angular/common';
var ExcelService = /** @class */ (function () {
    function ExcelService(datePipe) {
        this.datePipe = datePipe;
    }
    ExcelService.prototype.generateExcel = function (data, colorSettings) {
        //Create workbook and worksheet
        var workbook = new Workbook();
        var worksheet = workbook.addWorksheet('chart');
        //Blank Row 
        worksheet.addRow([]);
        var colorIndex = 0;
        data.forEach(function (d) {
            var row = worksheet.addRow(d);
            var color = "";
            for (var i_1 = 0; i_1 < d.length; i_1++) {
                var slot = row.getCell(i_1 + 1);
                color = colorSettings[colorIndex][i_1].substr(1);
                //console.log(color);
                slot.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: color }
                };
            }
            colorIndex++;
        });
        for (var i = 1; i < 10; i++) {
            worksheet.getColumn(i).width = 30;
        }
        //Generate Excel File with given name
        workbook.xlsx.writeBuffer().then(function (data) {
            var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, 'сhart.xlsx');
        });
    };
    ExcelService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [DatePipe])
    ], ExcelService);
    return ExcelService;
}());
export { ExcelService };
//# sourceMappingURL=excel.service.js.map