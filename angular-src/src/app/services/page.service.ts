import { Injectable } from '@angular/core';
import { Block } from 'src/app/components/admin/pages/types/block';
import { Subject } from 'rxjs';
import { Page, PageResponse, MultiplePageResponse } from '../components/admin/pages/models/page';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  url: string = environment.baseURL + 'api/pages/';
  blocks: Block[];
  public dirty: Subject<boolean> = new Subject<boolean>();
  public preview: boolean = false;

  constructor(private http: HttpClient) {
    this.blocks = [];
  }

  isDirty() {
    return this.dirty.asObservable();
  }

  addBlock(block: Block) {
    block.data.sortOrder = this.blocks.length;
    this.blocks.push(block);
    this.dirty.next(true);
  }


  async loadPage(stub: string) {
    let page = await this.getByStub(stub);
    console.log(page)
    if (page) {
      return true;
    } else
      return false;
  }


  swap(sortOrder, direction: string) {
    if (direction === 'up' && sortOrder === 0)
      return
    if (direction === 'down' && sortOrder === (this.blocks.length - 1))
      return

    console.log(sortOrder);
    let oldIndex = sortOrder;

    if (direction === 'up') {
      let newIndex = sortOrder - 1;

      const temp = this.blocks[oldIndex];
      this.blocks[oldIndex] = this.blocks[newIndex];
      this.blocks[newIndex] = temp;

      this.blocks[newIndex].data.sortOrder = newIndex;
      this.blocks[oldIndex].data.sortOrder = oldIndex;
    }
    else if (direction === 'down') {
      let newIndex = sortOrder + 1;

      const temp = this.blocks[oldIndex];
      this.blocks[oldIndex] = this.blocks[newIndex];
      this.blocks[newIndex] = temp;

      this.blocks[newIndex].data.sortOrder = newIndex;
      this.blocks[oldIndex].data.sortOrder = oldIndex;
    }


    console.log(this.blocks);
    this.dirty.next(true);
  }

  splice(sortOrder) {
    this.blocks.splice(sortOrder, 1);
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].data.sortOrder = i;
    }
    this.dirty.next(true);
  }


  togglePreview() {
    this.preview = !this.preview;
  }


  async save(page: Page) {
    console.log(page);
    if (page._id) {
      return this.update(page);
    }

    let res = await this.getByStub(page.stub);

    console.log(page)
    if (res) {
      let confirmation = confirm('A page with this title already exists, would you like to overwrite it?')
      if (confirmation)
        return this.update(page);
      else
        return false;
    }
    else
      return this.post(page);
  }

  //////////////////////////////////////////////////////////////////////
  //                    HTTP METHODS
  //////////////////////////////////////////////////////////////////////

  async post(page: Page) {
    return new Promise<Page>(async (resolve, reject) => {
      this.http.post(this.url, page).subscribe((res: PageResponse) => {
        resolve(res.data);
      });
    })
  }

  async update(page: Page) {
    return new Promise<Page>(async (resolve, reject) => {
      this.http.post(this.url + 'update', page).subscribe((res: PageResponse) => {
        resolve(res.data);
      });
    })
  }

  async getByStub(stub: String) {
    return new Promise<Page>(async (resolve, reject) => {
      this.http.get(this.url + stub).subscribe((res: PageResponse) => {
        resolve(res.data);
      });
    })
  }

  async getByID(id: String) {
    return new Promise<Page>(async (resolve, reject) => {
      this.http.get(this.url + '/id/' + id).subscribe((res: PageResponse) => {
        resolve(res.data);
      });
    })
  }

  async getAll() {
    return new Promise<Page[]>(async (resolve, reject) => {
      this.http.get(this.url).subscribe((res: MultiplePageResponse) => {
        resolve(res.data);
      });
    })
  }

  async delete(page: Page) {
    return new Promise<Page>(async (resolve, reject) => {
      this.http.post(this.url + 'delete', page).subscribe((res: PageResponse) => {
        resolve(res.data);
      });
    })
  }

}
