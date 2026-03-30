export class Timestamp {
  readonly value: Date;

  constructor(date: Date | string | number) {
    this.value = new Date(date);
    if (isNaN(this.value.getTime())) {
      throw new Error('Invalid timestamp');
    }
  }

  static create(date: Date | string | number): Timestamp {
    return new Timestamp(date);
  }

  toISOString(): string {
    return this.value.toISOString();
  }

  toDate(): Date {
    return this.value;
  }
}
