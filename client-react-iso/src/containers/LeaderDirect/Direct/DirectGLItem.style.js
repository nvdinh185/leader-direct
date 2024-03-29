import styled from "styled-components";
import { palette } from "styled-theme";
import { transition, borderRadius, boxShadow } from "@lib/helpers/style_utils";
import WithDirection from "@lib/helpers/rtl";

const WDSingleCardWrapper = styled.div`
  padding: 15px;
  background-color: #ffffff;
  position: relative;
  border-radius: 8px;
  margin-bottom: 5px;
  ${boxShadow("0 0 3px rgba(0,0,0,0.15)")};

  &:hover {
    cursor: pointer;
    transform: translateY(-0.1rem);
    box-shadow: 0 0.5rem 2rem 0 rgb(33 40 50 / 25%);
    transition: transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .isoCardWrapperFlex {
    display: flex;
    flex-direction: ${(props) => (props.view === "grid" ? "column" : "row")};
  }

  .isoCardImage {
    white-space: nowrap;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    // background-color: ${palette("grayscale", 6)};
    color: white;
    background: ${(props) => (props.bgColor ? props.bgColor : "linear-gradient(135deg, #ed5565 0%, #d52739 100%)")};

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .isoCardContent {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 15px;
    overflow: hidden;

    .isoCardTitle {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 16px;
      font-weight: 500;
      color: ${palette("text", 0)};
      margin: 0 0 3px;
    }

    .isoCardDescription {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: initial;

      @supports (-webkit-line-clamp: 2) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: initial;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    .isoCardDate {
      font-size: 12px;
      font-weight: 400;
      color: ${palette("grayscale", 0)};
    }
  }

  .isoDeleteBtn {
    position: absolute;
    right: 0;
    top: 0;
    width: 24px;
    height: 24px;
    border: 0;
    // margin-top: ${(props) => (props.view === "grid" ? "5px" : "0")};
    flex-shrink: 0;
    font-size: 14px;
    color: ${(props) => (props.view === "grid" ? "grey" : "grey")};
    opacity: 0.5;
    cursor: pointer;
    background-color: transparent;
    ${transition()};
    &:hover {
      color: ${palette("primary", 0)};
    }
  }

  .isoLeaderInfoTag {
    /* background: ${(props) => props.leaderCat.bg_color}; */
    /* color: ${(props) => props.leaderCat.text_color}; */
    color: grey;
    border: 1px lightgray line;
    font-weight: bold;
    font-size: 11px;
    border-radius: 5px;
    margin: 5px 0;
  }

  &.list {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: no-wrap;
    align-items: stretch;

    .isoCardImage {
      width: 45px;
      height: 45px;
      margin: auto;
      display: -webkit-inline-flex;
      display: -ms-inline-flex;
      display: inline-flex;
      ${borderRadius("50%")};
    }
  }

  &.grid {
    // width: calc(100% / 3 - 15px);
    display: flex;
    flex-direction: column;
    margin: 0 7px 15px;
    padding: 0;

    @media only screen and (max-width: 767px) {
      // width: calc(100% / 2 - 10px);
      margin: 0 5px 10px;
    }

    @media only screen and (max-width: 480px) {
      width: 100%;
      margin-right: ${(props) => (props["data-rtl"] === "rtl" ? "inherit" : "0")};
      margin-left: ${(props) => (props["data-rtl"] === "rtl" ? "0" : "inherit")};
    }

    @media only screen and (min-width: 1400px) {
      // width: calc(100% / 4 - 15px);
      margin: 0 7px 15px;
    }

    .isoCardImage {
      width: 100%;
      height: 5px;
      display: flex;

      @media only screen and (min-width: 960px) {
        height: 5px;
      }
    }

    .isoCardContent {
      padding: 15px;
      margin: 0;
    }

    .isoDeleteBtn {
      position: absolute;
      top: 0;
      right: ${(props) => (props["data-rtl"] === "rtl" ? "inherit" : "0")};
      left: ${(props) => (props["data-rtl"] === "rtl" ? "0" : "inherit")};
    }
  }
`;

const WDSortableCardWrapper = styled.div`
  padding: 15px 35px;

  @media only screen and (max-width: 767px) {
    padding: 30px 20px;
  }

  .isoControlBar {
    width: 100%;
    display: flex;
    margin-bottom: 30px;
    align-items: center;

    @media only screen and (max-width: 767px) {
      align-items: flex-end;
      flex-direction: column;
    }

    > * {
      display: flex;
      align-items: center;

      .isoControlBtn {
        font-size: 12px;
        font-weight: 400;
        text-transform: uppercase;
        color: #ffff;
        background-color: ${palette("secondary", 0)};
        border: 0;
        outline: 0;
        display: -webkit-inline-flex;
        display: -ms-inline-flex;
        display: inline-flex;
        align-items: center;
        height: 35px;
        padding: 0 15px;
        margin-right: ${(props) => (props["data-rtl"] === "rtl" ? "0" : "0px")};
        margin-left: ${(props) => (props["data-rtl"] === "rtl" ? "0px" : "0")};
        cursor: pointer;
        ${borderRadius("3px")};
        ${transition()};

        @media only screen and (max-width: 430px) {
          padding: 0 10px;
        }

        i {
          padding-right: ${(props) => (props["data-rtl"] === "rtl" ? "0" : "10px")};
          padding-left: ${(props) => (props["data-rtl"] === "rtl" ? "10px" : "0")};
        }

        &:last-child {
          margin-right: ${(props) => (props["data-rtl"] === "rtl" ? "0" : "0")};
          margin-left: ${(props) => (props["data-rtl"] === "rtl" ? "0" : "0")};
        }

        &:hover {
          background-color: #2d354699;
        }
      }

      &.isoControlBtnGroup {
        margin-left: ${(props) => (props["data-rtl"] === "rtl" ? "inherit" : "auto")};
        margin-right: ${(props) => (props["data-rtl"] === "rtl" ? "auto" : "inherit")};

        @media only screen and (max-width: 767px) {
          margin-left: ${(props) => (props["data-rtl"] === "rtl" ? "inherit" : "0")};
          margin-right: ${(props) => (props["data-rtl"] === "rtl" ? "0" : "inherit")};
          margin-top: 20px;
        }
      }
    }
  }

  .isoAddRemoveControlBar {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;

    .isoControlBtnGroup {
      display: flex;
      align-items: center;

      .isoControlBtn {
        font-size: 12px;
        font-weight: 400;
        padding: 0;
        text-transform: uppercase;
        color: #ffffff;
        background-color: ${palette("primary", 0)};
        border: 0;
        outline: 0;
        height: 30px;
        padding: 0 15px;
        margin-right: ${(props) => (props["data-rtl"] === "rtl" ? "0" : "10px")};
        margin-left: ${(props) => (props["data-rtl"] === "rtl" ? "10px" : "0")};
        cursor: pointer;
        ${borderRadius("3px")};
        ${transition()};

        i {
          padding-right: ${(props) => (props["data-rtl"] === "rtl" ? "0" : "10px")};
          padding-left: ${(props) => (props["data-rtl"] === "rtl" ? "10px" : "0")};
        }

        &:last-child {
          margin: 0;
        }

        &:hover {
          background-color: ${palette("primary", 1)};
        }
      }
    }
  }

  &.grid {
    .isoSortableCardsContainer {
      ul {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
      }
    }
  }
`;
const SingleCardWrapper = WithDirection(WDSingleCardWrapper);
const SortableCardWrapper = WithDirection(WDSortableCardWrapper);

export { SingleCardWrapper, SortableCardWrapper };
