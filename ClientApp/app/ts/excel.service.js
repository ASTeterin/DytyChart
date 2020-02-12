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
//import * as logoFile from './carlogo.js';
import { DatePipe } from '@angular/common';
var ExcelService = /** @class */ (function () {
    function ExcelService(datePipe) {
        this.datePipe = datePipe;
    }
    ExcelService.prototype.generateExcel = function (data, colorSettings) {
        //Excel Title, Header, Data
        var title = 'Car Sell Report';
        //Create workbook and worksheet
        var workbook = new Workbook();
        var worksheet = workbook.addWorksheet('Car Data');
        //Add Row and formatting
        var titleRow = worksheet.addRow([title]);
        titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
        worksheet.addRow([]);
        var subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')]);
        //Blank Row 
        worksheet.addRow([]);
        //Add Header Row
        // worksheet.addRows(data);
        // Add Data and Conditional Formatting
        console.log(data);
        var colorIndex = 0;
        data.forEach(function (d) {
            var row = worksheet.addRow(d);
            //let qty = row.getCell(1);
            var color = 'FF99FF99';
            /*if (+qty.value < 500) {
                color = 'FF9999'
            }*/
            for (var i = 0; i < d.length; i++) {
                var slot = row.getCell(i + 1);
                slot.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: colorSettings[colorIndex][i] }
                };
            }
            colorIndex++;
        });
        worksheet.addRow([]);
        //Generate Excel File with given name
        workbook.xlsx.writeBuffer().then(function (data) {
            var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, 'CarData.xlsx');
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