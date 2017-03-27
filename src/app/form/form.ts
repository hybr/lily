export class Form {
  form_number: string = '';
  obsolete: boolean = false;
  name: string = '';
  detail: string = '';
  
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
