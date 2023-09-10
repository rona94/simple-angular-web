import {
  Component, OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('animateMe', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue'
      })),

      transition('open => closed, closed => open', [
        animate('0.3s')
      ]),
      // transition('closed => open', [
      //   animate('0.5s')
      // ]),

      // transition('void => *', [
      //   style({ transform: 'translateX(-100%)', }),
      //   animate('0.3s')
      // ]),
      // transition('* => void', [
      //   animate('0.3s', style({ transform: 'translateX(-100%)', }))
      // ]),
    ])
  ]
})
export class HomeComponent implements OnInit {

  favMeat: string = '';
  color: string = 'red';
  orange: string = 'orange';
  uppercase: string = 'uppercase';
  test: any[];
  gg: FormGroup;
  img_hash: string = 'avatar';
  halot: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.test = [
      [
        {
          id: 1,
          name: "testb",
        },
        {
          id: 2,
          name: "testa",
        },
      ],
      [
        {
          name: "nyot",
        }
      ]
    ];

    this.gg = this.formBuilder.group({
      name: ""
    });
  }

  ngOnInit(): void {
  }

  testing(event:any, value:string) { 
    console.log(event, value);
  }

  ggForm() { 
    console.log(this.gg)
    this.router.navigate(['/about']); // redirect
  }

  nyotmi(value: string) {
    console.log(value)
    this.halot = value;
  }

  copyName() { 
    // this.copy_name = this.gg.get("name")?.value;
  }
}
