/** @format */
import { loginIsRequiredServer } from "@util/auth";
import { Row, Col } from "react-bootstrap";
import USER from "@handler/user";
import { UserList } from "@type/user";
import ListCard from "@comp/listCard";

import { CreateForm, EditForm, DeleteForm } from "./form";

export default async function Access() {
  await loginIsRequiredServer();
  const { data: users } = await USER.getUsers();

  return (
    <main>
      <section className="layout">
        <div className="section-title">
          <h1>Access List</h1>
          <CreateForm />
        </div>
        <Row>
          <Col className="col-md-1">No.</Col>
          <Col className="col-md-2">User ID </Col>
          <Col className="col-md-2">Username</Col>
          <Col className="col-md-2">Email</Col>
          <Col className="col-md-2">Role</Col>
          <Col className="col-md-3">Action</Col>
        </Row>
        <div className="vertical-container">
          {users?.map((user: UserList, index: number) => (
            <ListCard variant="access" data={user} number={index + 1}>
              <EditForm />
              <DeleteForm />
            </ListCard>
          ))}
        </div>
      </section>
    </main>
  );
}
