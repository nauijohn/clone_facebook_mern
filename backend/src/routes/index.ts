import { Router } from "express";

import usersRoute from "./users";

const api = Router();

api.use("/users", usersRoute);

export default api;
