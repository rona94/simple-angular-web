import { Component, OnInit, Input, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() hasArrow: boolean = true;
  @Input() lists: any = [];

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    let d = document.getElementsByClassName('dropdown');
    let dropdown = event.target.closest('.dropdown');
    
    for (let index = 0; index < d.length; index++) {
      let content = d[index].querySelectorAll('.dropdown__content')[0];

      // hide dropdown if clicked outside of the box
      if (!event.target.closest('.dropdown')) {
        d[index].querySelectorAll('.dropdown__content')[0].classList.add('hidden');
      }

      // hide all visible dropdown on another dropdown button click
      else { 
        if (event.target.tagName == 'A') {
          event.preventDefault();
        }

        if (dropdown != d[index]) { // non active dropdown
          content.classList.add('hidden');
        }
        else if (
          dropdown == d[index] &&
          (
            event.target.tagName == 'A' ||
            event.target.tagName == 'BUTTON' ||
            event.target.className.indexOf('dropdown__arrow') !== -1
          )
        ) { // active dropdown
          let isShow = content.className.indexOf('hidden') !== -1;
          
          if (isShow) {
            content.classList.remove('hidden');
          }
          else {
            content.classList.add('hidden');
          }
        }
      }

      // set active button
      if (content.className.indexOf('hidden') !== -1) {
        d[index].querySelectorAll('.dropdown__button')[0].classList.remove('active');
      }
      else {
        d[index].querySelectorAll('.dropdown__button')[0].classList.add('active');
      }
      
    }
    

  }
}
