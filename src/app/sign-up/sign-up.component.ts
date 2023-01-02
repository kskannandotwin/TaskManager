import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../countries.service';
import { Country } from '../country';
import { CustomValidatorsService } from '../custom-validators.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm: FormGroup | any = null;
  genders = ['male', 'female'];
  countries: Country[] = [];

  constructor(private countriesService: CountriesService, private formBuilder: FormBuilder, private customValidatorsService: CustomValidatorsService) {

  }

  ngOnInit() {
    this.countries = this.countriesService.getCountries();

    this.signUpForm = this.formBuilder.group({
      personName: this.formBuilder.group({
        firstName: [null, [Validators.required, Validators.minLength(2)]],
        lastName: [null, [Validators.required, Validators.minLength(2)]],
      }),

      email: [null, [Validators.required, Validators.email]],
      mobile: [null, [Validators.required, Validators.pattern(/^[789]\d{9}$/)]],
      dateOfBirth: [null, [Validators.required, this.customValidatorsService.minimumAgeValidator(18)]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      countryID: [null, [Validators.required]],
      receiveNewsLetters: [null],
      skills: this.formBuilder.array([])
    }, {
      validators: [
        this.customValidatorsService.compareValidator("confirmPassword", "password")
      ]
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
