import { Card, Col, Row } from "antd";
import "../../sass/common.scss";
import React, { FC } from "react";
interface ISingleCard {
  icon:string,
  count:string,
  text:string,
  background?:string,
}
const SingleCard:FC<ISingleCard> = (props) => {
  const {icon,count,text,background} = props;
  return (
    <Row className="single-card">
      <Col sm={24}>
      <Card   className="card-hover-color cursor-pointer"
                style={{
                  boxShadow: "none",
                  borderRadius: "22px",
                  minHeight: "260px",
                }}>
<Row>
<Col>
        <div className="img-wrapper" style={{background:background}}>
          <img src={icon} alt={""} />
        </div>
      </Col>
      <Col>
        <p className="card-count">{count}</p>
        <p className="card-text" style={{marginLeft:"12px "}}>{text}</p>
      </Col>
</Row>
      </Card>
      
      </Col>
    </Row>
  );
};

export default SingleCard;
