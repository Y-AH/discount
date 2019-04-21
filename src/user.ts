export class User {
  private static MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

  constructor(
    public id: string,
    public createdAt: Date,
    public type: UserType = UserType.DEFAULT
  ) {}

  public yearsSinceJoined() {
    const now = Date.now();
    const msSinceJoined = now - this.createdAt.getTime();
    return Math.floor(msSinceJoined / User.MS_PER_YEAR);
  }
}

export enum UserType {
  DEFAULT,
  EMPLOYEE,
  AFFILIATE
}
