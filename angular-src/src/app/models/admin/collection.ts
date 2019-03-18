/*
export interface Collection {
    name: string,
    stub?: string,
    active?: boolean,
    //categories?: Category[],
    //subcategories?: Subcategory[],
    //products?: [Product],
    
}
*/

export interface CollectionResponse {
  data: Collection
}

export interface AllCollectionsResponse {
  data: [Collection]
}

export class Collection {
  public active: boolean;
  public featured: boolean;
  public type: string;
  public name: string;
  public image: string;
  public stub: string;
  public shop?: string;
  public category?: string;
  public _id?: string;

  constructor() {

  }



  /*
  async getCategories() {
    return new Promise<Collection[]>(async (resolve, reject) => {
      let categories = [];
      let categoryArray = await this.CollectionService.getAll('Category');
      //for (let i = 0; i < categoryArray.length; i++) {
      //this.categories.push(categoryArray[i].name);
      //}
      resolve(categoryArray);
    })
  }

  async getSubcategories() {
    return new Promise(async (resolve, reject) => {
      let subcategories = [];
      let subcategoryArray = await this.CollectionService.getAll('Subcategory');
      //for (let i = 0; i < subcategoryArray.length; i++) {
      //  this.subcategories.push(subcategoryArray[i].name);
      //}
      resolve(subcategoryArray);
    })
  }
  */
  //////////////////////////////////////////////////////////////////////////////

  /*
  async get(stub: string) {
    return await this.CollectionService.get(stub);
  }
  
  async post() {
    return await this.CollectionService.post(this);
  }

  async update() {
    return await this.CollectionService.update(this);
  }

  async deactivate() {
    return await this.CollectionService.deactivate(this);
  }
  */

}
