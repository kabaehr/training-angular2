describe('Expense overview list', function () {

    it('should should have Anakin Skywalker as first entry', function () {
        browser.get('/home');
        expect(browser.getTitle()).toEqual('Angular 2 Workshop');

        browser.get('/overview');

        expect(element(by.id('00000000-0000-0000-0000-000000000001')).getText()).toEqual('Anakin Skywalker');
    });
});