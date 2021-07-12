import React, { Component } from "react";
import moment from "moment";
import { CloseOutlined } from "@ant-design/icons";
import { SingleCardWrapper } from "@components/GridListLayout/GridList.style";

export default class extends Component {
  render() {
    const listClass = `isoSingleCard card ${this.props.view !== "table" ? this.props.view : ""}`;
    const style = { zIndex: 100 - this.props.index };

    return (
      <SingleCardWrapper id={this.props.id} className={listClass} style={style}>
        <div className="isoCardImage">
          <img alt="#" src={this.props.img} />
        </div>
        <div className="isoCardContent">
          <h3 className="isoCardTitle">{this.props.desc}</h3>
          <span className="isoCardDate">{moment(this.props.timestamp).format("MMM Do, YYYY")}</span>
        </div>
        <button className="isoDeleteBtn" onClick={this.props.clickHandler}>
          <CloseOutlined />
        </button>
        <button className="isoDeleteBtn" onClick={this.props.clickHandler}>
          <CloseOutlined />
        </button>
      </SingleCardWrapper>
    );
  }
}
