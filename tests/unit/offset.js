describe('Popper.js - offset', function() {
    // define modules paths
    require.config({
        paths: {
            popper: 'base/.tmp/popper'
        }
    });

    var TestPopper;

    beforeEach((done) => {
        require(['popper'], function(Popper) {
            TestPopper = Popper;
            expect(Popper).toBeDefined();
            done();
        });
    });

    it('creates a popper with single implicit px offset', function(done) {
        var reference = appendNewRef(1);
        reference.style.marginLeft = '100px';
        var popper    = appendNewPopper(2);

        var offset = 10;

        new TestPopper(reference, popper, {
            placement: 'bottom',
            modifiers: {
                offset: {
                    offset: offset
                }
            }
        }).onCreate(function(data) {
            var refLeft = reference.getBoundingClientRect().left;
            var refWidth = reference.offsetWidth;
            var popperLeft = popper.getBoundingClientRect().left;
            var popperWidth = popper.offsetWidth;
            var expectedPopperLeft = refLeft + (refWidth / 2) - (popperWidth / 2) + offset;

            expect(popperLeft).toBe(expectedPopperLeft);
            done();
        });
    });

    it('creates a popper with double implicit px offset', function(done) {
        var reference = appendNewRef(1);
        reference.style.marginLeft = '100px';
        var popper    = appendNewPopper(2);

        var offset = '10 10';
        var arrowHeight = 5;

        new TestPopper(reference, popper, {
            placement: 'bottom',
            modifiers: {
                offset: {
                    offset: offset
                }
            }
        }).onCreate(function(data) {
            var refLeft = reference.getBoundingClientRect().left;
            var refBottom = reference.getBoundingClientRect().bottom;
            var refWidth = reference.offsetWidth;
            var popperLeft = popper.getBoundingClientRect().left;
            var popperTop = popper.getBoundingClientRect().top;
            var popperWidth = popper.offsetWidth;
            var expectedPopperLeft = refLeft + (refWidth / 2) - (popperWidth / 2) + +offset.split(' ')[0];

            expect(popperLeft).toBe(expectedPopperLeft);
            expect(popperTop - arrowHeight).toBe(refBottom + +offset.split(' ')[1]);
            done();
        });
    });

    it('creates a popper with single explicit % offset', function(done) {
        var reference = appendNewRef(1);
        reference.style.marginLeft = '100px';
        var popper    = appendNewPopper(2);

        var offset = '25%';

        new TestPopper(reference, popper, {
            placement: 'bottom',
            modifiers: {
                offset: {
                    offset: offset
                }
            }
        }).onCreate(function(data) {
            var refLeft = reference.getBoundingClientRect().left;
            var refWidth = reference.offsetWidth;
            var popperLeft = popper.getBoundingClientRect().left;
            var popperWidth = popper.offsetWidth;
            var expectedPopperLeft = refLeft + (refWidth / 2) - (popperWidth / 2) + (refWidth / 4);

            expect(popperLeft).toBe(expectedPopperLeft);
            done();
        });
    });

    it('creates a popper with double explicit % offset', function(done) {
        var reference = appendNewRef(1);
        reference.style.marginLeft = '100px';
        var popper    = appendNewPopper(2);

        var offset = '25% 25%';
        var arrowHeight = 5;

        new TestPopper(reference, popper, {
            placement: 'bottom',
            modifiers: {
                offset: {
                    offset: offset
                }
            }
        }).onCreate(function(data) {
            var refLeft = reference.getBoundingClientRect().left;
            var refBottom = reference.getBoundingClientRect().bottom;
            var refWidth = reference.offsetWidth;
            var refHeight = reference.offsetHeight;
            var popperLeft = popper.getBoundingClientRect().left;
            var popperTop = popper.getBoundingClientRect().top;
            var popperWidth = popper.offsetWidth;
            var expectedPopperLeft = refLeft + (refWidth / 2) - (popperWidth / 2) + (refWidth / 4);

            expect(popperLeft).toBe(expectedPopperLeft);
            expect(popperTop - arrowHeight).toBe(Math.round(refBottom + (refHeight / 4)));
            done();
        });
    });
});
