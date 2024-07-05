# Todo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

**Testing philosophy**
Tests were created and conducted through several strategies:
    - Check initialization processes to ensure app behaves as expected
    - Analyze component functions and methods from a logic-based perspective
    - Check effect of inputs in different environmental conditions on outputs
    - Look through application from a user perspective to see if any oversights are present

**Tools used**
Karma was used to run automated test cases
Jasmine framework used to help build test cases and make them more understandable


## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Bug Report

### Bug ID: 001
**Description**: Input field fails to clear when "Add" button is clicked

**Steps to Reproduce**
1. Open application
2. Enter a new item in input field
3. Click the "Add" button

**Expected Behavior**: The input field element should be set to blank after an item is added to the list 

**Actual Behavior**: The input field remains filled with the previous input value

**Status** Open


