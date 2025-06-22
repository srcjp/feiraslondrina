import { Pipe, PipeTransform } from '@angular/core';
import { PropertySubtypeLabels, PropertyItemLabels, BuildingItemLabels, PropertySubtype, PropertyItemEnum, BuildingItemEnum } from './property.enums';

@Pipe({
  name: 'enumLabel',
  standalone: true
})
export class EnumLabelPipe implements PipeTransform {
  transform(value: string): string {
    return (
      PropertySubtypeLabels[value as PropertySubtype] ||
      PropertyItemLabels[value as PropertyItemEnum] ||
      BuildingItemLabels[value as BuildingItemEnum] ||
      value
    );
  }
}
