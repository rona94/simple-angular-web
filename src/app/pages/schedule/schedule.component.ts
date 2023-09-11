import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ScheduleService } from './../../services/schedule.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  scheduleData: object = [];
  scheduleOptions: any = {};
  scheduleTotal: number = 6; // need to get total in api
  user: any = null;

  // sort by
  filter: FormGroup;
  sort: any;
  activeSort: any = {
    sort: 'id',
    order: 1,
    value: 'Default',
  };

  // pagination
  currentPage = 0;
  pageSize = 25;

  constructor(
    private scheduleService: ScheduleService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.filter = this.formBuilder.group({
      name: true,
      day: true,
      time: true,
      teacher: true,
    });

    this.sort = [
      {
        sort: 'id',
        order: 1,
        value: 'Default',
      },
      {
        sort: 'name',
        order: 1,
        value: 'Subject (A-Z)',
      },
      {
        sort: 'name',
        order: 0,
        value: 'Subject (Z-A)',
      },
      {
        sort: 'time_from',
        order: 1,
        value: 'Time (ASC)',
      },
      {
        sort: 'time_from',
        order: 0,
        value: 'Time (DESC)',
      },
    ];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.user = this.authService.user;
      this.setDataOptions(this.user.role_id == 3);
    }, 30);
    
    this.getData();
  }

  getData(): void {
    this.scheduleService.getSchedule(
      this.activeSort.sort,
      this.activeSort.order,
      this.currentPage,
      this.pageSize
    ).subscribe(res => {
      this.scheduleData = res;
    });
  }

  setDataOptions(isStudent: boolean): void {
    let teacherCol = {};

    if (isStudent) {
      teacherCol = {
        'name': 'teacher',
        'value': 'Professor'
      };
    }

    this.scheduleOptions = {
      'content': [
        {
          'type': 'id',
          'name': 'id',
          'value': '',
        },
        {
          'name': 'name',
          'value': 'Subject',
        },
        {
          'name': 'day',
          'value': 'Day',
        },
        {
          'type': 'custom',
          'name': 'time',
          'value': 'Time',
          'custom': (data: any) => {
            return this.formatTime(data.time_from) + ' - '+ this.formatTime(data.time_to);
          }
        },
        teacherCol
      ]
    };
  }

  updateData(): void {
    this.scheduleOptions.content.map((value: any) => {
      if (value.type !== 'id') {
        value.visible = this.filter.get(value.name)?.value == true ? true : false;
      }
    });
  }
  
  updateSort(sort: any): void { 
    this.activeSort = sort;
    this.getData();
  }
  
  formatTime(time: string): string {
    let newTime = time.split(':');
  
    let convertTime = (time: any) => {
      if (time > 12) {
        time = parseInt(time) - 12;
      }

      return time.toString().length == 1 ? '0' + time : time;
    };

    let period = (time: any) => {
      return time > 11 && time != 24 ? 'PM' : 'AM';
    };

    return convertTime(newTime[0]) + ':' + convertTime(newTime[1]) +' '+ period(newTime[0]); 
  }

  setPage(page: any) {
    this.currentPage = page;
    this.getData();
  }
}
