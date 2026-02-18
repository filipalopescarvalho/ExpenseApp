const request = require("supertest");
const app = require("../server");

describe("Expenses API", () => {

  it("GET /expenses should return 200", async () => {
    const res = await request(app).get("/expenses");
    expect(res.statusCode).toBe(200);
  });

  it("POST /expenses should create a new expense", async () => {
    const res = await request(app)
      .post("/expenses")
      .send({ title: "Test Expense", amount: 100 });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Expense");
    expect(res.body.amount).toBe(100);
  });

  it("POST /expenses should reject invalid input", async () => {
    const res = await request(app)
      .post("/expenses")
      .send({ title: "", amount: "invalid" });

    expect(res.statusCode).toBe(400);
  });

});
