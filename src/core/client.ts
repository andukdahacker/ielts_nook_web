import createClient from "openapi-fetch";
import { paths } from "../schema/schema";

const client = createClient<paths>({ baseUrl: "http://localhost:3000" });

export default client;
