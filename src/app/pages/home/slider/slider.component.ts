import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input() text: string = '';
  @Output() text2 = new EventEmitter<string>();
  
  constructor() {
    
  }

  ngOnInit(): void {
    this.text2.emit('haloaa oi');
  }

}
