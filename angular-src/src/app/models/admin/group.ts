export class Group {

    constructor(
        public type: string,
        public name: string,
        public image: string,
        public active: boolean,
        public categories?: string[],
        public subcategories?: string[],
        public collection?: string,
        public category?: string,
        public subcategory?: string,
        public stub?: string,
        public shop?: string
        
      ) {  }

}

