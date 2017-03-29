export class Step {

  constructor(  
    public number: string = '',
    public obsolete: boolean = false,
    public name: string = '',
    public detail: string = '',
    public fields: array = []
  ) { }

  getKeysForForm() {
      return ['number', 'name', 'detail', 'fields'];
  }
  
  getTitle(key) {
    switch(key) {
      case 'number': return 'Step Number'; 
      case 'obsolete': return 'Old'; 
      case 'name': return 'Name'; 
      case 'detail': return 'About Step';
      case 'fields': return 'Fields';
    }
  }
  
  
}
