import { User } from "./user";
import { expect } from "chai";
import "mocha";

describe("Testing User Functions", () => {
    it("Years since joined", () => {
        const firstJan2015 = new Date(2015, 1, 1, 12, 0, 0, 0);
        const now = new Date();
        const user = new User("joined2015", firstJan2015);
        const years = now.getFullYear() - firstJan2015.getFullYear();
        expect(user.yearsSinceJoined()).to.equal(years);
    });
});
