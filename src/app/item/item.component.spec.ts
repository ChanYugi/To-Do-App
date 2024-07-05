import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item.component';

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
    fixture.detectChanges();
  });

  //configuration/initilization tests
  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should initilize items to not be editable', () => {
    expect(component.editable).toBeFalse();
  });

  it('Should set editable to be false on save', () => {
    //set editable to be true
    component.editable = true;

    //perform saveitem method
    component.saveItem('testItem');
    
    //checks that item is no longer editable
    expect(component.editable).toBeFalse();
  });

  it('Should save items', () => {
    component.item.description = 'testItem';
    //set description value
    component.saveItem('newTestItem');

    //performs checks on editability and item description
    expect(component.editable).toBeFalse();
    expect(component.item.description).toBe('newTestItem');
    expect(component.item.description).not.toBe('testItem');
  });

  it('Should not save empty items edits', () => {
    
    //set description value
    component.item.description = 'testItem';

    //perform empty save
    component.saveItem('');
    
    //performs checks on editability and item description
    expect(component.editable).toBeFalse();
    expect(component.item.description).toBe('testItem');
    expect(component.item.description).not.toBe('');
  });
});
