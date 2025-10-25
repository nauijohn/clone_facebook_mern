import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../src/app";

describe("GET /hello", () => {
  it("should return Hello world message", async () => {
    const res = await request(app).get("/api");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Hello world!" });
  });
});
