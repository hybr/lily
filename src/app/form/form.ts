export class Form {
  number: string = '';
  title: string = '';
  obsolete: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
