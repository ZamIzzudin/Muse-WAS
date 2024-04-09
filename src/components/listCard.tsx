/** @format */

import { Row, Col } from "react-bootstrap";

import styles from "@style/components/listCard.module.css";

interface Props {
  variant: string;
  data: any;
  number: number;
}

export default function ListCard({ variant, data, number }: Props) {
  switch (variant) {
    case "task":
      return (
        <Row className={styles.card}>
          <Col className="col-md-1">{number}.</Col>
          <Col className="col-md-3">
            <span>{data.title}</span>
          </Col>
          <Col className="col-md-2">{data.type}</Col>
          <Col className="col-md-2">{data.assigned_to}</Col>
          <Col className="col-md-2">{data.status}</Col>
          <Col className="col-md-2">
            <div className="table-cta">
              <button>Details</button>
            </div>
          </Col>
        </Row>
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
          <Col className="col-md-3">
            <div className="table-cta">
              <button>Update</button>
              <button>Delete</button>
            </div>
          </Col>
        </Row>
      );
    default:
      return <></>;
  }
}
