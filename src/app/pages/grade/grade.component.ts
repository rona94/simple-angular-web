import { Component, OnInit } from '@angular/core';
import { StudentService } from './../../services/student.service';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {
  grades: any;
  gradeAverage: any = [];
  studentName: string = '';
  studentAge: any = '';

  constructor(
    private studentService: StudentService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getData();
    setTimeout(() => {
      const user = this.authService.user;
      this.studentName = user.firstname + ' ' + user.lastname;
      this.studentAge = user.age;
    }, 30);
  }

  async getData() {
    const result: any = await new Promise(resolve => {
      this.studentService.getGrade().subscribe(res => {
        resolve(res);
      });
    });

    const existGrade: any = [];
    const newResult: any = [];

    result.forEach((res: any) => {
      let newGrade = {
        [`grade${res.term}`]: res.grade
      };

      // push if subject not yet exist
      if (existGrade.indexOf(res.name) == -1) {
        existGrade.push(res.name);
        newResult.push({
          id: res.id,
          name: res.name,
          ...newGrade
        });
      }
      // add new grade if subject exist
      else {
        newResult[newResult.length - 1] = {
          ...newResult[newResult.length - 1],
          ...newGrade
        }
      }

      // get average grade
      this.gradeAverage[res.term-1] = res.grade + (this.gradeAverage[res.term-1] || 0);
    });

    this.grades = newResult;
  }

  getAverage(index: number): any {
    if (this.gradeAverage[index]) {
      return Math.floor(this.gradeAverage[index] / this.grades.length);
    }
    
    return null;
  }

}
