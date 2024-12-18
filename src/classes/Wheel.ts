class Wheel {
  private diameter: number;
  private tireBrand: string;

  constructor(diameter: number = 18, tireBrand: string = "GoodYear") {
    this.diameter = diameter;
    this.tireBrand = tireBrand;
  }

  get getDiameter(): number {
    return this.diameter;
  }

  get getTireBrand(): string {
    return this.tireBrand;
  }
}

export default Wheel;
