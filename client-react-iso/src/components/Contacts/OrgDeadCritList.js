import React from "react";
import { InputSearch } from "@components/uielements/input";
import { OrgDeadCritListWrapper } from "./OrgDeadCritList.style";
import Scrollbar from "@components/utility/customScrollBar";

function filterContacts(contacts, search) {
  search = search.toUpperCase();
  return search ? contacts.filter((contact) => contact.name.toUpperCase().includes(search)) : contacts;
}

export default function OrgDeadCritList(props) {
  const [search, setSearch] = React.useState("");

  function singleContact(contact) {
    const { selectedId, deleteContact, changeContact } = props;
    const activeClass = selectedId === contact.id ? "active" : "";
    const onChange = () => changeContact(contact.id);
    return (
      <div key={contact.id} className={`${activeClass} isoSingleContact`} onClick={onChange}>
        <div className="isoAvatar">{contact.avatar ? <img alt="#" src={contact.avatar} /> : ""}</div>
        <div className="isoContactName">
          <h3>{contact.name ? contact.name : "No Name"}</h3>
        </div>
        {/* TODO: Add more button here */}
      </div>
    );
  }
  function onChange(event) {
    setSearch(event.target.value);
  }

  const contacts = filterContacts(props.contacts, search);
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
