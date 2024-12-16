import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldnewpictureComponent } from './oldnewpicture.component';

describe('OldnewpictureComponent', () => {
  let component: OldnewpictureComponent;
  let fixture: ComponentFixture<OldnewpictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OldnewpictureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldnewpictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
