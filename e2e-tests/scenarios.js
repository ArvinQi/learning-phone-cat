'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/view1");
  });

  describe('PhoneListCtrl', function(){

    it('should create "phones" model with 3 phones', function() {
      var scope = {},
          ctrl = new PhoneListCtrl(scope);

      expect(scope.phones.length).toBe(3);
    });

    it('should be possible to control phone order via the drop down select box', function() {

      var phoneNameColumn = element.all(by.repeater('phone in phones').column('phone.name'));
      var query = element(by.model('query'));

      function getNames() {
        return phoneNameColumn.map(function(elm) {
          return elm.getText();
        });
      }

      query.sendKeys('tablet'); //let's narrow the dataset to make the test assertions shorter

      expect(getNames()).toEqual([
        "Motorola XOOM\u2122 with Wi-Fi",
        "MOTOROLA XOOM\u2122"
      ]);

      element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

      expect(getNames()).toEqual([
        "MOTOROLA XOOM\u2122",
        "Motorola XOOM\u2122 with Wi-Fi"
      ]);
    });

    it('should render phone specific links', function() {
      var query = element(by.model('query'));
      query.sendKeys('nexus');
      element.all(by.css('.phones li a')).first().click();
      browser.getLocationAbsUrl().then(function(url) {
        expect(url).toBe('/phones/nexus-s');
      });
    });

    it('should redirect index.html to index.html#/phones', function() {
      browser.get('app/index.html');
      browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/phones');
      });
    });

    describe('Phone list view', function() {
      beforeEach(function () {
        browser.get('app/index.html#/phones');
      });

      describe('Phone detail view', function () {

        beforeEach(function () {
          browser.get('app/index.html#/phones/nexus-s');
        });


        it('should display placeholder page with phoneId', function () {
          expect(element(by.binding('phoneId')).getText()).toBe('nexus-s');
        });

        it('should display the first phone image as the main phone image', function() {
          expect(element(by.css('img.phone')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
        });


        it('should swap main image if a thumbnail image is clicked on', function() {
          element(by.css('.phone-thumbs li:nth-child(3) img')).click();
          expect(element(by.css('img.phone')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.2.jpg/);

          element(by.css('.phone-thumbs li:nth-child(1) img')).click();
          expect(element(by.css('img.phone')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
        });
      });
    });
  });
  describe('filter', function() {

    beforeEach(module('phonecatFilters'));

    describe('checkmark', function() {

      it('should convert boolean values to unicode checkmark or cross',
          inject(function(checkmarkFilter) {
            expect(checkmarkFilter(true)).toBe('\u2713');
            expect(checkmarkFilter(false)).toBe('\u2718');
          }));
    });
  });
});
