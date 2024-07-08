import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  //initialization checks
  it('Should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`Should have the 'My To Do List' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.componentTitle).toEqual('My To Do List');
  });

  it('Should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('My To Do List');
  });

  it(`Should initialize with correct number of items`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.allItems.length).toEqual(4);
  });

  it(`Should initialize with "all" filter`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.filter).toEqual('all');
  });


  //add item test
  it(`Should add items, update number of items, and be marked as not done`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.addItem('testItem');

    fixture.detectChanges();
    
    expect(app.allItems.length).toEqual(5);
    expect(app.allItems[0].done).toEqual(false);
    expect(app.allItems[0].description).toEqual('testItem');
  });

  //testing for empty item add attempts
  it(`Should not add items that are empty`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    //adds empty items
    app.addItem('');

    //ensures changes are made
    fixture.detectChanges();
    
    //initialized item list length is 4
    expect(app.allItems.length).toEqual(4); //checks for list length to be 4 
    expect(app.allItems[0].description).not.toEqual(''); //checks that empty element is not added
  });

  //remove item test
  it(`Should remove items and update number of items`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    //assigns a const testItem with the first item in item array
    const testItem = app.allItems[0];
    
    //removing an item
    app.remove(testItem);

    //ensures changes are reflected
    fixture.detectChanges();
    
    //test for list length change and if item is still within list
    expect(app.allItems.length).toEqual(3);
    expect(app.allItems).not.toContain(testItem);
  });

  


  //checks filtering (not sure if a bit redundant with integration testing)
  it('Should change filter value to "all"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    //sets filter to all
    app.filter = 'all';
    expect(app.filter).toBe('all'); //tests to see if value is correct

    //additional tests to ensure it is not set to other incorrect values
    expect(app.filter).not.toBe('active');
    expect(app.filter).not.toBe('done');
  });

  it('Should change filter value to "done"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    //sets variable to done
    app.filter = 'done';
    expect(app.filter).toBe('done'); //tests to see if value is correct

    //additional tests to ensure it is not set to other incorrect values
    expect(app.filter).not.toBe('active');
    expect(app.filter).not.toBe('all');
  });

  it('Should change filter value to "active"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    //sets filter variable to active
    app.filter = 'active';
    expect(app.filter).toBe('active'); //tests to see if value is correct

    //additional tests to ensure it is not set to other incorrect values
    expect(app.filter).not.toBe('done');
    expect(app.filter).not.toBe('all');
  });
  
  //get function test with "all" filter
  it(`Should retrieve correct items with "all" filter`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    //sets filter to all and added a single completed test item
    app.filter = 'all';
    app.addItem('doneTestItem');
    app.allItems[0].done= true;
    
    //manually update cahnges
    fixture.detectChanges();

    const retrievedItems = app.items;
    let completed = 0;
    let incompleted = 0;
    let errorItem = 0;

    retrievedItems.forEach((element) => {
      if(element.done === true){
        completed++;
      }
      else if(element.done === false){
        incompleted++;
      }
      else{
        errorItem++;
      }
    });

    //tests for correct nunmber of complete and incomplete items
    expect(completed).toBe(2);
    expect(incompleted).toBe(3);

    //check to see if array length is complete
    expect(retrievedItems.length).toBe(app.allItems.length);
    expect(errorItem).toBe(0); //should be zero
  });

  //get function test with "active" filter
  it(`Should retrieve correct items with "active" filter`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    //sets filter to active and added a single completed test item
    app.filter = 'active';
    app.addItem('doneTestItem');
    app.allItems[0].done= true;
    
    //manually update cahnges
    fixture.detectChanges();

    const retrievedItems = app.items;
    let incompleted = 0;
    let errorItem = 0;

    retrievedItems.forEach((element) => {
      if(element.done === false){
        incompleted++;
      }
      else{
        errorItem++;
      }
    });

    //tests for correct nunmber of incomplete items
    expect(incompleted).toBe(3);

    //check to see if array length is correct
    expect(retrievedItems.length).toBe(3);
    expect(errorItem).toBe(0); //should be zero
  });

  //get function test with "done" filter
  it(`Should retrieve correct items with "done" filter`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    //sets filter to done and added a single completed test item
    app.filter = 'done';
    app.addItem('doneTestItem');
    app.allItems[0].done= true;
    
    //manually update cahnges
    fixture.detectChanges();

    const retrievedItems = app.items;
    let completed = 0;
    let errorItem = 0;

    retrievedItems.forEach((element) => {
      if(element.done === true){
        completed++;
      }
      else{
        errorItem++;
      }
    });

    //tests for correct nunmber of incomplete items
    expect(completed).toBe(2);

    //check to see if array length is correct
    expect(retrievedItems.length).toBe(2);
    expect(errorItem).toBe(0); //should be zero
  });

  //integration testing for 
  it('Should change filter value to "All" on click', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    
    //easier way is to add html id to each button and select directly
    //but this is another way to select desired button
    const allButtonElements = compiled.querySelectorAll('button'); //find all button elements
    let buttonElement: HTMLButtonElement | null = null; //declare variable to hold desired button element
    
    //iterate through all button elements and find desired one for testing
    allButtonElements.forEach((button)=> {
      if (button.textContent?.trim() === 'All') {
        buttonElement = button as HTMLButtonElement;
      }
    });
    
    //making a check to determine that it no longer stores a null value
    expect(buttonElement).not.toBeNull();

    //if not null, proceed with test
    if(buttonElement){
      //declare const as htmlbutton and perform test
      const selectedButtonElement = buttonElement as HTMLButtonElement;
      selectedButtonElement.click();
      fixture.detectChanges();
      expect(app.filter).toBe("all");

    }
  });


  //moreso integration testing (for filter options)
  it('Should change filter value to "all" on click', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    
    //easier way is to add html id to each button and select directly
    //but this is another way to select desired button
    const allButtonElements = compiled.querySelectorAll('button'); //find all button elements
    let buttonElement: HTMLButtonElement | null = null; //declare variable to hold desired button element
    
    //iterate through all button elements and find desired one for testing
    allButtonElements.forEach((button)=> {
      if (button.textContent?.trim() === 'All') {
        buttonElement = button as HTMLButtonElement;
      }
    });
    
    //making a check to determine that it no longer stores a null value
    expect(buttonElement).not.toBeNull();

    //if not null, proceed with test
    if(buttonElement){
      //declare const as htmlbutton and perform test
      const selectedButtonElement = buttonElement as HTMLButtonElement;
      selectedButtonElement.click();
      fixture.detectChanges();
      expect(app.filter).toBe("all");
    }
  });

  it('Should change filter value to "done" on click', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    
    //easier way is to add html id to each button and select directly
    //but this is another way to select desired button
    const allButtonElements = compiled.querySelectorAll('button'); //find all button elements
    let buttonElement: HTMLButtonElement | null = null; //declare variable to hold desired button element
    
    //iterate through all button elements and find desired one for testing
    allButtonElements.forEach((button)=> {
      if (button.textContent?.trim() === 'Done') {
        buttonElement = button as HTMLButtonElement;
      }
    });
    
    //making a check to determine that it no longer stores a null value
    expect(buttonElement).not.toBeNull();

    //if not null, proceed with test
    if(buttonElement){
      //declare const as htmlbutton and perform test
      const selectedButtonElement = buttonElement as HTMLButtonElement;
      selectedButtonElement.click();
      fixture.detectChanges();
      expect(app.filter).toBe("done");
    }
  });
  
  it('Should change filter value to "active" on click', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    
    //easier way is to add html id to each button and select directly
    //but this is another way to select desired button
    const allButtonElements = compiled.querySelectorAll('button'); //find all button elements
    let buttonElement: HTMLButtonElement | null = null; //declare variable to hold desired button element
    
    //iterate through all button elements and find desired one for testing
    allButtonElements.forEach((button)=> {
      if (button.textContent?.trim() === 'To Do') {
        buttonElement = button as HTMLButtonElement;
      }
    });
    
    //making a check to determine that it no longer stores a null value
    expect(buttonElement).not.toBeNull();

    //if not null, proceed with test
    if(buttonElement){
      //declare const as htmlbutton and perform test
      const selectedButtonElement = buttonElement as HTMLButtonElement;
      selectedButtonElement.click();
      fixture.detectChanges();
      expect(app.filter).toBe("active");
    }
  });

  //button should behave the same as enter key, reset value of input element 
  it(`Should clear input element on button press`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLInputElement;

    //only one input element in the app html file, uses this to select it
    const inputElement = compiled.querySelector('#addItemInput') as HTMLInputElement;

    //sets input value to testItem
    inputElement.value = 'testItem';

    //declares const to retrieve all button elements
    const buttonElement = compiled.querySelector('button.btn-primary') as HTMLButtonElement;

    buttonElement.click();
    fixture.detectChanges();

    //tests to see if input element has been cleared after adding via button
    expect(inputElement.value).toBe("");
  });

    //button should behave the same as enter key, reset value of input element 
  it(`Should clear input element on key press`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLInputElement;

    //only one input element in the app html file, uses this to select it
    const inputElement = compiled.querySelector('#addItemInput') as HTMLInputElement;

    //sets input value to testItem
    inputElement.value = 'testItem';

    //manually triggers event for input element directly
    const keyEvent = new KeyboardEvent('keyup', {key: 'Enter'});
    inputElement.dispatchEvent(keyEvent);

    fixture.detectChanges();

    //checks to see if the reset was made
    expect(inputElement.value).toBe("");
  });
});
