import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxSearchComponent } from './box-search.component';

describe('BoxSearchComponent', () => {
    let component: BoxSearchComponent;
    let fixture: ComponentFixture<BoxSearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BoxSearchComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BoxSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
