import { Injectable } from '@angular/core';
import { Block } from 'src/app/components/admin/pages/types/block';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  blocks: Block[];
  public dirty: Subject<boolean> = new Subject<boolean>();
  public preview: boolean = false;

  constructor() {
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


  togglePreview() {
    this.preview = !this.preview;
  }
}
