import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputSearch } from "@components/uielements/input";
import { OrgDeadCritListWrapper, OrgDeadCritSingleItemWrapper } from "./OrgDeadCritList.style";
import Scrollbar from "@components/utility/customScrollBar";

export default function OrgDeadCritList(props) {
  const [search, setSearch] = React.useState("");
  const directTypes = useSelector((state) => state.filterData.directTypes);

  function singleContact(direct, _directTypes) {
    const { selectedId, changeDirectCrit } = props;
    const activeClass = selectedId === direct.uuid ? "active" : "";
    const onChange = () => changeDirectCrit(direct.uuid);
    const directCatInfo = _directTypes?.find((cat) => cat.id === direct.category);

    return (
      <OrgDeadCritSingleItemWrapper key={direct.uuid} bgColor={directCatInfo?.bg_color}>
        <div className={`${activeClass} isoSingleContact`} onClick={onChange}>
          <div className="isoAvatar">{directCatInfo?.code ? directCatInfo.code : null}</div>
          <div className="isoContactName">
            <h3>{direct.description ? direct.description : "No Description"}</h3>
          </div>
          {/* TODO: Add more button here */}
        </div>
      </OrgDeadCritSingleItemWrapper>
    );
  }

  function filterContacts(directs, search) {
    search = search.toUpperCase();
    return search ? directs.filter((direct) => direct.description.toUpperCase().includes(search)) : directs;
  }

  function onChange(event) {
    setSearch(event.target.value);
  }

  const contacts = filterContacts(props.directs, search);
  return (
    <OrgDeadCritListWrapper className="isoContactListWrapper">
      <InputSearch placeholder={"Tìm Kiếm"} value={search} onChange={onChange} className="isoSearchBar" />
      {contacts && contacts.length > 0 ? (
        <div className="isoContactList">
          <Scrollbar className="contactListScrollbar" style={{ height: "calc(100vh - 200px)" }}>
            {contacts.map((contact) => singleContact(contact, directTypes))}
          </Scrollbar>
        </div>
      ) : (
        <span className="isoNoResultMsg">{"Không Tìm Thấy Kết Quả"}</span>
      )}
    </OrgDeadCritListWrapper>
  );
}
