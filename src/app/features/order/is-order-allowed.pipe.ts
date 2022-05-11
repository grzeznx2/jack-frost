import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isOrderAllowed',
})
export class IsOrderAllowedPipe implements PipeTransform {
  transform(date?: Date | { seconds: number; nanoseconds: number }) {
    if (!date) return false;
    if (date instanceof Date) {
      return this.isToday(date);
    }
    const formattedDate = new Date(
      date.seconds * 1000 + date.nanoseconds / 1000000
    );
    return this.isToday(formattedDate);
  }

  private isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() == today.getDate() &&
      date.getMonth() == today.getMonth() &&
      date.getFullYear() == today.getFullYear()
    );
  };
}
