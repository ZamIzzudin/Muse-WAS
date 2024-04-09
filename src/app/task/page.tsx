/** @format */

import { loginIsRequiredServer } from "@util/auth";

import { Row, Col } from "react-bootstrap";
import FilterStatus from "@comp/filterStatus";
import ListCard from "@comp/listCard";

import { TaskList } from "@type/task";

export default async function Translate() {
  await loginIsRequiredServer();

  const data = [
    {
      id: "123",
      title: "Kono Subarashii Sekai ni Shukufuku wo! 3",
      type: "Need Translate",
      assigned_to: "Odin",
      status: "Assigned",
    },
    {
      id: "123",
      title: "Kono Subarashii Sekai ni Shukufuku wo! 3",
      type: "Need Translate",
      assigned_to: "Odin",
      status: "Assigned",
    },

    {
      id: "123",
      title: "Kono Subarashii Sekai ni Shukufuku wo! 3",
      type: "Need Edit",
      assigned_to: "Odin",
      status: "Assigned",
    },
    {
      id: "123",
      title: "Kono Subarashii Sekai ni Shukufuku wo! 3",
      type: "Need Review",
      assigned_to: "Odin",
      status: "Assigned",
    },
    {
      id: "123",
      title: "Kono Subarashii Sekai ni Shukufuku wo! 3",
      type: "Need Publish",
      assigned_to: "Odin",
      status: "Assigned",
    },
  ];

  return (
    <main>
      <section className="layout">
        <h1>Task Page</h1>
        <FilterStatus />
        <Row>
          <Col className="col-md-1">No.</Col>
          <Col className="col-md-3">Title </Col>
          <Col className="col-md-2">Type</Col>
          <Col className="col-md-2">Assigned To</Col>
          <Col className="col-md-2">Status</Col>
          <Col className="col-md-2">Action</Col>
        </Row>
        <div className="vertical-container">
          {data.map((each: TaskList, index) => (
            <ListCard variant="task" data={each} number={index + 1} />
          ))}
        </div>
      </section>
    </main>
  );
}
