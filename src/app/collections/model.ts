export class CollectionOfCollections {

  constructor(
    public cnumber: string = '',
    public active: boolean = true,
    public name: string = '',
    public detail: string = '',
    public fields: string[] = []
    ) { }

  getKeysForForm() {
    return ['cnumber', 'name', 'detail', 'fields'];
  }
  
  getTitle(key) {
    switch(key) {
      case 'cnumber': return 'Collection Number'; 
      case 'active': return 'Active'; 
      case 'name': return 'Name'; 
      case 'detail': return 'About Collection';
      case 'fields': return 'Fields';
    }
  }
  
}
