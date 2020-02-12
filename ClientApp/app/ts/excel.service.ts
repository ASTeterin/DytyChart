import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
//import * as logoFile from './carlogo.js';
import { DatePipe } from '@angular/common';
@Injectable({
    providedIn: 'root'
})
export class ExcelService {
    constructor(private datePipe: DatePipe) {
    }
    generateExcel(data: any[], colorSettings: any[]) {

        //Excel Title, Header, Data
        const title = 'Car Sell Report';
        
        //Create workbook and worksheet
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet('chart');
        //Add Row and formatting
        let titleRow = worksheet.addRow([title]);
        titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
        worksheet.addRow([]);
   
        //Blank Row 
        worksheet.addRow([]);
        console.log(data);
        let colorIndex = 0;
        data.forEach(d => {

            let row = worksheet.addRow(d);
            let color = 'FF99FF99';

            for (let i = 0; i < d.length; i++) {
                let slot = row.getCell(i + 1); 
                color = colorSettings[colorIndex][i].substr(1);
                console.log(color);
                slot.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: color }
                }
            }
            colorIndex++;
           
        }
        );
        
        worksheet.addRow([]);
       
        
        //Generate Excel File with given name
        workbook.xlsx.writeBuffer().then((data) => {
            let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, 'CarData.xlsx');
        })
    }
}