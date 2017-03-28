export class Activity {

  constructor(  
    public number:     string = '',
    public obsolete: boolean = false,
    public name: string = '',
    public detail: string = ''
  ) { }

  getKeysForForm() {
      return ['number', 'name', 'detail'];
  }
  
  getTitle(key) {
    switch(key) {
      case 'number': return 'Activity Number'; 
      case 'obsolete': return 'Old'; 
      case 'name': return 'Name'; 
      case 'detail': return 'About Activity';
    }
  }
  
  
}
