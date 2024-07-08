import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item.component';
import { Item } from '../item';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;

    component.item = {description: 'testItem', done: false};
    fixture.detectChanges();
  });

  //configuration/initilization tests
  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should initilize items to not be editable', () => {
    expect(component.editable).toBeFalse();
  });

  //save method testingy
  it('Should set editable to be false on save', () => {
    //set editable to be true
    component.editable = true;

    //perform saveitem method
    component.saveItem('newTestItem');
    
    fixture.detectChanges();
    //checks that item is no longer editable
    expect(component.editable).toBeFalse();
  });

  it('Should save items', () => {
    //set description value
    component.saveItem('newTestItem');

    fixture.detectChanges();
    //performs checks on editability and item description
    expect(component.editable).toBeFalse();
    expect(component.item.description).toBe('newTestItem');
    expect(component.item.description).not.toBe('testItem');
  });

  it('Should not save empty items edits', () => {
    //perform empty save
    component.saveItem('');
    
    fixture.detectChanges();
    //performs checks on editability and item description
    expect(component.editable).toBeFalse();
    expect(component.item.description).toBe('testItem');
    expect(component.item.description).not.toBe('');
  });
  
  //testing @input
  it('Should correctly take on passed @input value', () => {
    //declares new 
    const newItem: Item = {description:'newTestItem', done:false}
    component.item = newItem;

    fixture.detectChanges();
    expect(component.item.description).toBe('newTestItem');
  });

  //testing @output
  it('Should emite remove event on remove', () => {
    spyOn(component.remove, 'emit');

    //Trigger parent remove method in parent component
    component.remove.emit(component.item);

    expect(component.remove.emit).toHaveBeenCalledWith(component.item);
  });

  //save button integration testing
  it('Should set item description to input field and change editable on "save" button click', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    component.editable = true; //set editable to be true
    fixture.detectChanges();

    const saveButton = compiled.querySelector('button.btn-save') as HTMLButtonElement;
    let inputField = compiled.querySelector('input.sm-text-input') as HTMLInputElement;

    const newItem: Item = {description:'testItem', done:false}
    component.item = newItem;

    inputField.value = 'newTestItem'; //set input field to be new value

    saveButton.click();

    //manually update changes to dom
    fixture.detectChanges();

    //test for editable value to change
    expect(component.editable).toBe(false);
    expect(component.item.description).toBe('newTestItem');

  });  

  //save button integration testing
  it('Should set save to set editable to be false on "cancel" button click', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    component.editable = true; //set editable to be true
    fixture.detectChanges();

    const allButtonElements = compiled.querySelectorAll('button');
    let buttonElement: HTMLButtonElement | null = null; //declare variable to hold desired button element

    let inputField = compiled.querySelector('input.sm-text-input') as HTMLInputElement;

    const newItem: Item = {description:'testItem', done:false}
    component.item = newItem;

    inputField.value = 'newTestItem';

    //would be easier with queryselector(#id)
    allButtonElements.forEach((button)=> {
      if (button.textContent?.trim() === 'Cancel') {
        buttonElement = button as HTMLButtonElement;
      }
    });

    expect(buttonElement).not.toBeNull();

    //if not null, proceed with test
    if(buttonElement){
      //declare const as htmlbutton and perform test
      const selectedButtonElement = buttonElement as HTMLButtonElement;
      selectedButtonElement.click();

      //manually update changes to dom
      fixture.detectChanges();

      //test for editable value to change
      expect(component.editable).toBe(false);
      expect(inputField.value).toBe('testItem');
    }
  });  
});

