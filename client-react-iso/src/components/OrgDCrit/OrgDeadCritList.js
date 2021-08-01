import React from "react";
import { InputSearch } from "@components/uielements/input";
import { OrgDeadCritListWrapper } from "./OrgDeadCritList.style";
import Scrollbar from "@components/utility/customScrollBar";

export default function OrgDeadCritList(props) {
  const [search, setSearch] = React.useState("");

  function singleContact(direct) {
    const { selectedId, changeDirectCrit } = props;
    const activeClass = selectedId === direct.uuid ? "active" : "";
    const onChange = () => changeDirectCrit(direct.uuid);

    return (
      <div key={direct.uuid} className={`${activeClass} isoSingleContact`} onClick={onChange}>
        <div className="isoAvatar">{direct.avatar ? <img alt="#" src={direct.avatar} /> : ""}</div>
        <div className="isoContactName">
          <h3>{direct.description ? direct.description : "No Description"}</h3>
        </div>
        {/* TODO: Add more button here */}
      </div>
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
            {contacts.map((contact) => singleContact(contact))}
          </Scrollbar>
        </div>
      ) : (
        <span className="isoNoResultMsg">{"Không Tìm Thấy Kết Quả"}</span>
      )}
    </OrgDeadCritListWrapper>
  );
}
