import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { DatePipe } from '@angular/common';
@Injectable({
    providedIn: 'root'
})
export class ExcelService {
    constructor(private datePipe: DatePipe) {
    }
    generateExcel(data: any[], colorSettings: any[]) {
        
        //Create workbook and worksheet
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet('chart');
       
        //Blank Row 
        worksheet.addRow([]);
        let colorIndex = 0;
        data.forEach(d => {
            let row = worksheet.addRow(d);
            let color = "";

            for (let i = 0; i < d.length; i++) {
                let slot = row.getCell(i + 1); 
                color = colorSettings[colorIndex][i].substr(1);
                //console.log(color);
                slot.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: color }
                }
            }
            colorIndex++;
           
        });
        for (var i = 2; i < 10; i++) {
            worksheet.getColumn(i).width = 20;
        }
       
        //Generate Excel File with given name
        workbook.xlsx.writeBuffer().then((data) => {
            let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, 'сhart.xlsx');
        })
    }
}