import React from "react";
import { useDispatch, useSelector } from "react-redux";
import contactActions from "@redux/contacts/actions";
import { otherAttributes } from "./data";
import { Layout } from "antd";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import Button from "@components/uielements/button";
import OrgDeadCritList from "@components/Contacts/OrgDeadCritList";
import OrgDCritDetail from "@components/Contacts/OrgDCritDetail";
import IntlMessages from "@components/utility/intlMessages";
import Scrollbar from "@components/utility/customScrollBar";
import { OrgDeadCritWrapper } from "./OrgDeadCrit.style";

const { changeContact, addContact, editContact, deleteContact, viewChange } = contactActions;

const { Content } = Layout;
export default function Contacts() {
  const { contacts, selectedId, editView } = useSelector((state) => state.Contacts);
  const dispatch = useDispatch();

  const selectedContact = selectedId ? contacts.filter((contact) => contact.id === selectedId)[0] : null;
  const onVIewChange = () => dispatch(viewChange(!editView));
  return (
    <OrgDeadCritWrapper className="isomorphicContacts" style={{ background: "none" }}>
      {/* -------------------------------------- List Card View ----------------------------------------- */}
      <div className="isoContactListBar">
        <OrgDeadCritList
          contacts={contacts}
          selectedId={selectedId}
          changeContact={(id) => dispatch(changeContact(id))}
          deleteContact={(e) => dispatch(deleteContact(e))}
        />
      </div>
      {/* -------------------------------------- Detail Info View ----------------------------------------- */}
      <Layout className="isoContactBoxWrapper">
        {selectedContact ? (
          <Content className="isoContactBox">
            <div className="isoContactControl">
              <Button type="default" onClick={onVIewChange}>
                {editView ? <CheckOutlined /> : <EditOutlined />}
              </Button>
            </div>

            <Scrollbar className="contactBoxScrollbar">
              <OrgDCritDetail contact={selectedContact} otherAttributes={otherAttributes} />
            </Scrollbar>
          </Content>
        ) : (
          <div className="isoContactControl">
            <Button type="primary" onClick={() => dispatch(addContact())} className="isoAddContactBtn">
              <IntlMessages id="contactlist.addNewContact" />
            </Button>
          </div>
        )}
      </Layout>
    </OrgDeadCritWrapper>
  );
}
