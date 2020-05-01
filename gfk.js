const XLSX = require('xlsx');

const gfk = XLSX.utils.sheet_to_json(XLSX.readFile('./gfk.xlsx').Sheets[XLSX.readFile('./gfk.xlsx').SheetNames[0]], { header: 0 });

console.log( gfk );
