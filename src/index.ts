import { Elysia, t } from "elysia";

type User = {
  uuid: string;
  name: string;
  email: string;
};

let users: User[] = [];

const app = new Elysia()
  .get("/", () => "Hello World!\n")
  .get("/users", () => {
    let response = "";
    users.forEach((user) => {
      response += `${user.uuid}\n${user.name}\n${user.email}\n\n`;
    });
    return response;
  })
  .post(
    "/users",
    ({ body }) => {
      users.push({ ...body, uuid: crypto.randomUUID() })
      return 'User created'
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
      }),
    }
  )
  .delete('/users/:uuid', ({ params }) => {
    users = users.filter(user => user.uuid !== params.uuid)
    return `User ${params.uuid} deleted`
  },
  {
    params: t.Object({
      uuid: t.String()
    })
  })

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
