import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../../constants/baseUrl.const';

@Component({
  selector: 'personalData',
  templateUrl: './personalData.template.html',
  styleUrls: ['./personalData.style.less']
})
export class PersonalDataComponent implements OnInit {
  title = [' '];

  resultText: string;
  approveClass: boolean;
  rejectClass: boolean;
  clientAns = 1;

  result_showed = false;
  personalForm: FormGroup;
  educationForm: FormGroup;
  lastWorkForm: FormGroup;
  dreamWorkForm: FormGroup;
  resultForm: FormGroup;
  sex: string;
  relocation: string;
  ans: any;

  constructor(private builder: FormBuilder,
              private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.personalForm = this.builder.group({
      citizenship: [''],
      work_location: [''],
      skills_count: [''],
    });

    this.educationForm = this.builder.group({
      education_type: [''],
      university_name: [''],
      profession: [''],
      cource_name: ['']
    });

    this.lastWorkForm = this.builder.group({
      company_name: [''],
      position: [''],
      experience_type: ['']
    });

    this.dreamWorkForm = this.builder.group({
      salary_from: [''],
      salary_to: [''],
      schedule_type: [''],
      work_type: ['']
    });
  }

  onClick() {
    this.ans = {
      'cource_name': [this.educationForm.value.cource_name],
      'work_location': [this.personalForm.value.work_location],
      'position': [this.lastWorkForm.value.position],
      'university_name': [this.educationForm.value.university_name],
      'skills_count': [(this.personalForm.value.skills_count as string).split(', ').length],
      'salary_from': [this.dreamWorkForm.value.salary_from],
      'salary_to': [this.dreamWorkForm.value.salary_to],
      'schedule_type': [this.dreamWorkForm.value.schedule_type],
      'company_name': [this.lastWorkForm.value.company_name],
      'profession': [this.educationForm.value.profession],
      'title': this.title,
      'work_type': [this.dreamWorkForm.value.work_type],
      'experience_type': [this.lastWorkForm.value.experience_type],
      'education_type': [this.educationForm.value.education_type],
      'citizenship': [this.personalForm.value.citizenship],
      'relocation': this.relocation,
      'sex': this.sex
    };

    console.log(JSON.stringify(this.ans));

    this.httpClient.post(`${BASE_URL}/hr`, this.ans).subscribe((res: any) => {
      console.log(res.ans);
      this.clientAns = res.ans as number;

      if (Math.abs(this.clientAns - 1) < 0.00000000001) {
        this.resultText = 'Подходящий кандидат';
        this.approveClass = true;
        this.rejectClass = false;
      } else {
        this.resultText = 'Неподходящий кандидат';
        this.approveClass = false;
        this.rejectClass = true;
      }
    });

    this.result_showed = true;
  }
}
