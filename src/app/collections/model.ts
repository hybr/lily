export class Collection {

  constructor(
    public number: string = '',
    public active: boolean = true,
    public name: string = '',
    public detail: string = '',
    public fields: Array<any> = []
  ) { }

  getKeysForForm() {
      return ['number', 'name', 'detail', 'fields'];
  }
  
  getTitle(key) {
    switch(key) {
      case 'number': return 'Collection Number'; 
      case 'active': return 'Active'; 
      case 'name': return 'Name'; 
      case 'detail': return 'About Collection';
      case 'fields': return 'Fields';
    }
  }
  
  
}
