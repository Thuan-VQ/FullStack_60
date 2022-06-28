function Car (make, speed) {
    this.make = make;
    this.speed= speed;
}

Car.prototype.accelerate = function () {
   return(this.speed += 10);
}

Car.prototype.brake = function () {
    return(this.speed -= 5);
}

const BMW = new Car("BMW", 90);
const Mercerdes = new Car("Mercerdes", 100);

BMW.accelerate();
BMW.accelerate();
BMW.accelerate();
console.log("xe " + BMW.make + " đi với tốc độ " + BMW.speed);

Mercerdes.brake();
console.log("xe " + Mercerdes.make + " đi với tốc độ " + Mercerdes.speed);