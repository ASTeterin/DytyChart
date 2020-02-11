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
    ExcelService.prototype.generateExcel = function () {
        //Excel Title, Header, Data
        var title = 'Car Sell Report';
        var header = ["Year", "Month", "Make", "Model", "Quantity", "Pct"];
        var data = [
            [2007, 1, "Volkswagen ", "Volkswagen Passat", 1267, 10],
            [2007, 1, "Toyota ", "Toyota Rav4", 819, 6.5],
            [2007, 1, "Toyota ", "Toyota Avensis", 787, 6.2],
            [2007, 1, "Volkswagen ", "Volkswagen Golf", 720, 5.7],
            [2007, 1, "Toyota ", "Toyota Corolla", 691, 5.4],
            [2007, 1, "Peugeot ", "Peugeot 307", 481, 3.8],
            [2008, 1, "Toyota ", "Toyota Prius", 217, 2.2],
            [2008, 1, "Skoda ", "Skoda Octavia", 216, 2.2],
            [2008, 1, "Peugeot ", "Peugeot 308", 135, 1.4],
            [2008, 2, "Ford ", "Ford Mondeo", 624, 5.9],
            [2008, 2, "Volkswagen ", "Volkswagen Passat", 551, 5.2],
            [2008, 2, "Volkswagen ", "Volkswagen Golf", 488, 4.6],
            [2008, 2, "Volvo ", "Volvo V70", 392, 3.7],
            [2008, 2, "Toyota ", "Toyota Auris", 342, 3.2],
            [2008, 2, "Volkswagen ", "Volkswagen Tiguan", 340, 3.2],
            [2008, 2, "Toyota ", "Toyota Avensis", 315, 3],
            [2008, 2, "Nissan ", "Nissan Qashqai", 272, 2.6],
            [2008, 2, "Nissan ", "Nissan X-Trail", 271, 2.6],
            [2008, 2, "Mitsubishi ", "Mitsubishi Outlander", 257, 2.4],
            [2008, 2, "Toyota ", "Toyota Rav4", 250, 2.4],
            [2008, 2, "Ford ", "Ford Focus", 235, 2.2],
            [2008, 2, "Skoda ", "Skoda Octavia", 225, 2.1],
            [2008, 2, "Toyota ", "Toyota Yaris", 222, 2.1],
            [2008, 2, "Honda ", "Honda CR-V", 219, 2.1],
            [2008, 2, "Audi ", "Audi A4", 200, 1.9],
            [2008, 2, "BMW ", "BMW 3-serie", 184, 1.7],
            [2008, 2, "Toyota ", "Toyota Prius", 165, 1.6],
            [2008, 2, "Peugeot ", "Peugeot 207", 144, 1.4]
        ];
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
        var headerRow = worksheet.addRow(header);
        // Cell Style : Fill and Border
        headerRow.eachCell(function (cell, number) {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFFFF00' },
                bgColor: { argb: 'FF0000FF' }
            };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        });
        // worksheet.addRows(data);
        // Add Data and Conditional Formatting
        data.forEach(function (d) {
            var row = worksheet.addRow(d);
            var qty = row.getCell(5);
            var color = 'FF99FF99';
            if (+qty.value < 500) {
                color = 'FF9999';
            }
            qty.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: color }
            };
        });
        worksheet.getColumn(3).width = 30;
        worksheet.getColumn(4).width = 30;
        worksheet.addRow([]);
        //Footer Row
        var footerRow = worksheet.addRow(['This is system generated excel sheet.']);
        footerRow.getCell(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFCCFFE5' }
        };
        footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        //Merge Cells
        worksheet.mergeCells("A" + footerRow.number + ":F" + footerRow.number);
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