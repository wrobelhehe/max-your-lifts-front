import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'exerciseCategory'
})
export class ExerciseCategoryPipe implements PipeTransform {
    transform(values: number[]): string {
        if (!values || values.length === 0) {
            return '';
        }

        let result = '';
        for (let i = 0; i < values.length; i++) {
            const value = values[i];
            switch (value) {
                case 1:
                    result += 'Benchpress';
                    break;
                case 2:
                    result += 'Squat';
                    break;
                case 3:
                    result += 'Deadlift';
                    break;
                default:
                    result += 'Other';
                    break;
            }
            if (i < values.length - 1) {
                result += ', ';
            }
        }
        return result;
    }


}