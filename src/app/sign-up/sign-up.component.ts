import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CountriesService } from '../countries.service';
import { Country } from '../country';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  genders = ['male', 'female'];
  countries: Country[] = [];

  constructor(private countriesService: CountriesService) {

  }

  ngOnInit() {
    this.countries = this.countriesService.getCountries();
    this.signUpForm = new FormGroup({
      personName: new FormGroup({
        firstName: new FormControl(null),
        lastName: new FormControl(null)
      }),
      email: new FormControl(null),
      mobile: new FormControl(null),
      dateOfBirth: new FormControl(null),
      gender: new FormControl(null),
      countryID: new FormControl(null),
      receiveNewsLetters: new FormControl(null),
      skills: new FormArray([])
    });

    this.signUpForm.valueChanges.subscribe((value: any) => {
      // console.log(value);
    });
  }

  onSubmitClick() {
    // display current form values
    // console.log(this.signUpForm.value);

    // setValue;
    // this.signUpForm.setValue({
    //   firstName: 'Adam',
    //   lastName: 'Smith',
    //   email: 'smith@gmail.com',
    //   mobile: 5699754654,
    //   dateOfBirth: '2020-01-01',
    //   gender: 'male',
    //   countryID: 3,
    //   receiveNewsLetters: true
    // });

    // patchValue;
    // this.signUpForm.patchValue({
    //   firstName: 'Adam',
    //   lastName: 'Smith',
    //   email: 'smith@gmail.com'
    // });

    // reset;
    // this.signUpForm.reset();

    // reset with parameters;
    this.signUpForm.reset({
      firstName: 'Adam',
      lastName: 'Smith',
      email: 'smith@gmail.com'
    });
  }

  get skillsArray() {
    return this.signUpForm.get('skills') as FormArray;
  }

  onAddSkill() {
    var formGroup = new FormGroup({
      skillName: new FormControl(null),
      level: new FormControl(null)
    });

    (<FormArray>this.signUpForm.get('skills')).push(formGroup);
  }

  onRemoveClick(index: number) {
    (<FormArray>this.signUpForm.get('skills')).removeAt(index);
  }
}
