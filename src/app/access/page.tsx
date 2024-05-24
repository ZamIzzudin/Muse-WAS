/** @format */

import { LOGIN_SERVER } from "@util/auth-options";
import { USER_DATA } from "@type/user";
import USER from "@handler/user";
import Link from "next/link";

import { Row, Col } from "react-bootstrap";
import PageNavigation from "@comp/pageNavigation";
import ListCard from "@comp/listCard";
import { SecondaryTrigger } from "@comp/triggerBtn";
import Icon from "@comp/icon";
import { DeleteForm } from "./form";

export default async function Access() {
  await LOGIN_SERVER();
  const { data: users } = await USER.GET_USERS();

  const navigation = ["Access", "Access List"];
  return (
    <main>
      <section className="layout">
        <div className="section-title">
          <h1>Access List</h1>
          <Link href="access/create">
            <button>
              <Icon variant="Add" />
            </button>
          </Link>
        </div>
        <PageNavigation navigation={navigation} />
        <section className="section-container">
          <div className="section-header">
            <Row>
              <Col className="col-md-1">No.</Col>
              <Col className="col-md-2">User ID </Col>
              <Col className="col-md-2">Username</Col>
              <Col className="col-md-2">Email</Col>
              <Col className="col-md-2">Role</Col>
              <Col className="col-md-1"></Col>
              <Col className="col-md-2">Action</Col>
            </Row>
          </div>
          <div className="vertical-container">
            {users?.map((user: USER_DATA, index: number) => (
              <ListCard
                variant="access"
                data={user}
                number={index + 1}
                key={user.id}
              >
                <Link href={`/access/manage/${user.id}`}>
                  <button className="secondary">
                    <Icon variant="Edit" />
                  </button>
                </Link>
                <SecondaryTrigger
                  title="Delete Access"
                  placeholder={<Icon variant="Delete" />}
                >
                  <DeleteForm data={user} />
                </SecondaryTrigger>
              </ListCard>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
