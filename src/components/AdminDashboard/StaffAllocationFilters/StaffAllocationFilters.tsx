import { useState } from "react";
import {  Col, Row, Slider } from "antd";

import "./StaffAllocationFilters.scss";

import AppSnackbar from "../../../utils/AppSnackbar";
import DeleteModal from "../../../shared/DeleteModal/DeleteModal";

const handleStyling: any = {
  color: "blue",
  border: "7px solid white",
  borderRadius: 5,
  height: 29,
  width: 16,
  position: "absolute",
  top: -4,
  boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
};

const StaffAllocationFilters = (props: any) => {
  const {
    filterValues,
    setFilterValues,
    careHomeOptions,
    userTypeOptions,
    selectedRows,
    careHomeId,
    selectedRowKeys,
    setSelectedRowKeys,
  } = props;

  const [inputValue, setInputValue] = useState(50);
  const [isAllocateCarerModal, setIsAllocateCarerModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const onChange = (newValue: number) => {
    setInputValue(newValue);
  };


  return (
    <div className="inner-wrap-filters">
      <div className="select-radius-wrapper">
        <Row align="middle" className="sliderbar-wrapper">
          <div className="slider-text">Select Radius:</div>
          <div className="slider-text">0</div>
          <Col style={{ width: "100%", maxWidth: "294px", marginTop: -10 }}>
            <Slider
              className="slider-bar"
              handleStyle={handleStyling}
              trackStyle={{
                background: "linear-gradient(90deg, #6BCAFF 0%, #426BFF 100%)",
                height: 12,
                borderRadius: 6,
              }}
              railStyle={{
                background: "linear-gradient(90deg, #FFFFFF 0%, #EAEAEA 100%)",
                height: 12,
                borderRadius: 6,
              }}
              min={0}
              max={100}
              onChange={onChange}
              value={typeof inputValue === "number" ? inputValue : 0}
            />
          </Col>
          <Col>
            <p className="slider-text">{inputValue}</p>
          </Col>
        </Row>
      </div>
    
    
      <DeleteModal deleteModal={deleteModal} title={"Are you sure you want to remove this record?"} submitTitle={"Yes, Remove"} cancelTitle={"Cancel"} setDeleteModal={() => setDeleteModal(false)} />
    </div>
  );
};

export default StaffAllocationFilters;
