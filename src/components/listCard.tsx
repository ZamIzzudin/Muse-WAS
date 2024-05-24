/** @format */

import { Row, Col } from "react-bootstrap";
import Image from "next/image";
import { ReactNode } from "react";
import Icon from "./icon";

import styles from "@style/components/listCard.module.css";

interface Props {
  variant: string;
  data: any;
  number: number;
  children: ReactNode;
}

function setIcon(status: string) {
  switch (status) {
    case "Assigned":
      return <Icon variant="Assign" />;
    case "On Progress":
      return <Icon variant="Progress" />;
    case "Revision":
      return <Icon variant="Revision" />;
    case "Done":
      return <Icon variant="Done" />;
    default:
      return null;
  }
}

export default function ListCard({ variant, data, number, children }: Props) {
  switch (variant) {
    case "task":
      return (
        <div className={styles.card}>
          <Row>
            <Col className="col-md-1">{number}.</Col>
            <Col className="col-md-3">
              <span>{data.title}</span>
            </Col>
            <Col className="col-md-2">
              <span className={styles.tag_secondary}>{data.type}</span>
            </Col>
            <Col className="col-md-2">
              <span className={styles.tag_primary}>
                {setIcon(data.status)}
                {data.status}
              </span>
            </Col>
            <Col className="col-md-3">
              <div className={styles.user_detail_layout}>
                <Image
                  height={20}
                  width={20}
                  src={data.display_picture}
                  alt="display picture"
                />
                <span>{data.display_name}</span>
              </div>
            </Col>
            <Col className="col-md-1">
              <div className="card-cta">{children}</div>
            </Col>
          </Row>
        </div>
      );
    case "access":
      return (
        <Row className={styles.card}>
          <Col className="col-md-1">{number}.</Col>
          <Col className="col-md-2">
            <span>{data.id}</span>
          </Col>
          <Col className="col-md-2">{data.username}</Col>
          <Col className="col-md-2">{data.email}</Col>
          <Col className="col-md-2">{data.role}</Col>
          <Col className="col-md-1">
            <Image
              src={data.display_picture}
              alt="profile picture"
              width={20}
              height={20}
            />
          </Col>
          <Col className="col-md-2">
            <div className="card-cta">{children}</div>
          </Col>
        </Row>
      );
    default:
      return <></>;
  }
}
