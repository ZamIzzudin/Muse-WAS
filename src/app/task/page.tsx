/** @format */

import { LOGIN_SERVER } from "@util/auth-options";
import Link from "next/link";
// import { TaskList } from "@type/task";
import TASK from "@handler/task";

import { Row, Col } from "react-bootstrap";
import FilterStatus from "@comp/filterStatus";
import ListCard from "@comp/listCard";
import PageNavigation from "@comp/pageNavigation";
import Icon from "@comp/icon";

import data from "@static/task.json";

export default async function Translate() {
  await LOGIN_SERVER();
  const { data: tasks } = await TASK.GET_ALL_TASK();
  const { data: count_tasks } = await TASK.GET_COUNT_ALL_TASK();
  const navigation = ["Task", "Task List"];
  return (
    <main>
      <section className="layout">
        <div className="section-title">
          <h1>Task List</h1>
        </div>
        <PageNavigation navigation={navigation} />
        <FilterStatus data={count_tasks} active={"Assigned"} />
        <section className="section-container">
          <div className="section-header">
            <Row>
              <Col className="col-md-1">No.</Col>
              <Col className="col-md-3">Title </Col>
              <Col className="col-md-2">Type</Col>
              <Col className="col-md-2">Status</Col>
              <Col className="col-md-3">Assigned To</Col>
              <Col className="col-md-1">Action</Col>
            </Row>
          </div>
          <div className="vertical-container">
            {tasks.map((each: any, index: number) => (
              <ListCard
                variant="task"
                key={each.id}
                data={each}
                number={index + 1}
              >
                <Link href={`/task/manage/${each.task_id}`}>
                  <button className="secondary">
                    <Icon variant="Details" />
                  </button>
                </Link>
              </ListCard>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
