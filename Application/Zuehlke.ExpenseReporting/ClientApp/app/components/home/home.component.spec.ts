import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';

let homeComponent: HomeComponent;
let fixture: ComponentFixture<HomeComponent>;
let debugElement: DebugElement;
let htmlElement: HTMLElement;

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

describe('HomeComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent], // declare the test component
        });

        fixture = TestBed.createComponent(HomeComponent);
        homeComponent = fixture.componentInstance; // HomeComponent test instance

        // query for the title <panel-heading> by CSS class selector
        htmlElement = fixture.debugElement.query(By.css('.panel-heading')).nativeElement;
    });

    it('should display original title', () => {
        fixture.detectChanges();

        expect(htmlElement.textContent).toContain(homeComponent.pageTitle);
    });

    it('should display a different test title', () => {
        homeComponent.pageTitle = 'Test Title';
        fixture.detectChanges();

        expect(htmlElement.textContent).toContain('Test Title');
    });
});
