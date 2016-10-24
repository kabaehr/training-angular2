import { Injectable } from '@angular/core';
import { NavigationExtras } from "@angular/router";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class RouterStub {
    navigate(url: string) : string { return url; }
}

@Injectable()
export class ActivatedRouteStub {

    // ActivatedRoute.params is Observable
    private subject = new BehaviorSubject(this.testParams);
    params = this.subject.asObservable();

    // Test parameters
    private theTestParams: {};
    get testParams() { return this.theTestParams; }
    set testParams(params: {}) {
        this.theTestParams = params;
        this.subject.next(params);
    }

    // ActivatedRoute.snapshot.params
    get snapshot() {
        return { params: this.testParams };
    }
}