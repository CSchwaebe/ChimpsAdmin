import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Question, FAQ } from 'src/app/models/admin/pages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Draggable, Swappable, Sortable } from '@shopify/draggable';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit, AfterViewInit {

  faq: FAQ;
  newQuestion: Question;
  add: boolean = false;

  FormGroup: FormGroup;

  constructor(private FormBuilder: FormBuilder) {



    this.FormGroup = this.FormBuilder.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
    });

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    console.log(document.querySelectorAll('#draggable-container'))

    const sortable = new Sortable(document.querySelectorAll('.draggable-container'), {
      draggable: '.draggable-item',
      mirror: {
        constrainDimensions: true,
      }
    });

  }

  addQuestion() {
    //this.add = true;
    this.addDraggable();

  }

  async addDraggable() {
    let container = <HTMLDivElement>document.getElementById("draggable-container");
      let div = document.createElement('div');
      div.innerHTML = 'Inner HTML';
      div.className = 'draggable-item'
      await container.appendChild(div);

      const sortable = new Sortable(document.querySelectorAll('.draggable-container'), {
        draggable: '.draggable-item',
        mirror: {
          constrainDimensions: true,
        }
      });
  }

  submit() {
    this.newQuestion = {
      question: this.FormGroup.value.question,
      answer: this.FormGroup.value.answer,
    }
    console.log(this.newQuestion)
  }

}
