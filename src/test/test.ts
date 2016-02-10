/**
 * Created by jasondent on 10/02/2016.
 */

class Calculator {
    add(x : number, y : number) : number {
        return x + y;
    }
}

describe('Calculator', () => {
    var subject : Calculator;

    beforeEach(function () {
        subject = new Calculator();
    });

    describe('#add', () => {
        it('should add two numbers together', () => {
            var result : number = subject.add(2, 3);
            if (result !== 5) {
                throw new Error('Expected 2 + 3 = 5 but was ' + result);
            }
        });
    });
});
