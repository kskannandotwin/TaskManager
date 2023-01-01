import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../countries.service';
import { Country } from '../country';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm: FormGroup | any = null;
  genders = ['male', 'female'];
  countries: Country[] = [];

  constructor(private countriesService: CountriesService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.countries = this.countriesService.getCountries();

    this.signUpForm = this.formBuilder.group({
      personName: this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
      }),
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[789]\d{9}$/)]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      countryID: ['', [Validators.required]],
      receiveNewsLetters: [''],
      skills: this.formBuilder.array([])
    });

    this.signUpForm.valueChanges.subscribe((value: any) => {
      // console.log(value);
    });
  }

  onSubmitClick() {
    // display current form values
    this.signUpForm['submitted'] = true;
    console.log(this.signUpForm);

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
    // this.signUpForm.reset({
    //   firstName: 'Adam',
    //   lastName: 'Smith',
    //   email: 'smith@gmail.com'
    // });
  }

  get skillsArray() {
    return this.signUpForm.get('skills') as FormArray;
  }

  onAddSkill() {
    var formGroup = this.formBuilder.group({
      skillName: [null, [Validators.required]],
      level: [null, [Validators.required]]
    });

    (<FormArray>this.signUpForm.get('skills')).push(formGroup);
  }

  onRemoveClick(index: number) {
    (<FormArray>this.signUpForm.get('skills')).removeAt(index);
  }
}
