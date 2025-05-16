// file-size.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
  // standalone: true  // Remove this if using NgModule-based app
})
export class FileSizePipe implements PipeTransform {
  transform(bytes: number | undefined | null, decimals: any = 2): string {
    if (bytes == null || isNaN(bytes) || bytes < 0) return '0 B';
    if (bytes === 0) return '0 B';

    // Handle decimals parameter
    let decimalPlaces = Number(decimals);
    decimalPlaces = isNaN(decimalPlaces) ? 2 : Math.floor(decimalPlaces);
    decimalPlaces = Math.max(0, Math.min(20, decimalPlaces));

    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let value = bytes;
    let unitIndex = 0;

    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex++;
    }

    // Handle values that round to 0 after decimal places
    const roundedValue = value.toFixed(decimalPlaces);
    const trimmedValue = roundedValue.replace(/\.?0+$/, ''); // Remove trailing zeros

    return `${trimmedValue} ${units[unitIndex]}`;
  }
}