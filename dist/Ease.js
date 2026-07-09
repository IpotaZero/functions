export var Ease;
(function (Ease) {
    Ease.Linear = (x) => x;
    Ease.In = (x) => x ** 2;
    Ease.Out = (x) => 1 - (1 - x) ** 2;
    Ease.InOut = (x) => 3 * x ** 2 - 2 * x ** 3;
    Ease.Sin = (x) => Math.sin(x * Math.PI);
    Ease.InSin = (x) => 1 - Math.cos((x * Math.PI) / 2);
    Ease.join = (A, B) => (x) => A(B(x));
})(Ease || (Ease = {}));
