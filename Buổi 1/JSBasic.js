function Car (make, speed) {
    this.make = make;
    this.speed= speed;
}

Car.prototype.accelerate = function () {
    console.log(this.speed += 10);
}

Car.prototype.brake = function () {
    console.log(this.speed -= 5);
}

const BMW = new Car("BMW", 90);
const Mercerdes = new Car("Mercerdes", 100);

BMW.accelerate();
BMW.accelerate();
BMW.accelerate();

Mercerdes.brake();