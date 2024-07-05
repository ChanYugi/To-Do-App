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
});

