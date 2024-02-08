import React from "react";
import { CompanyList } from "./list";
import { Form, Input, Modal, Select } from "antd";
import { useGo } from "@refinedev/core";
import { useModalForm } from "@refinedev/antd";
import { CREATE_COMPANY_MUTATION } from "@/graphql/mutations";

const Create = () => {
  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: "companies", action: "list" },
      options: { keepQuery: true },
      type: "replace",
    });
  };

  const { formProps, modalProps } = useModalForm({
    action: "create",
    defaultVisible: true,
    resource: "companies",
    redirect: false,
    mutationMode: "pessimistic",
    onMutationSuccess: goToListPage,
    meta: {
      gqlMutation: CREATE_COMPANY_MUTATION,
    },
  });
  return (
    <CompanyList>
      <Modal
        {...modalProps}
        mask={true}
        onCancel={goToListPage}
        title="create Company"
        width={512}
      >
        <Form {...formProps} layout="vertical">
          <Form.Item
            label="Company name"
            name="name"
            rules={[{ required: true, message: "Company name is required" }]}
          >
            <Input placeholder="Please enter a company name" />
          </Form.Item>
          <Form.Item
            label="Sales owner"
            name="salesOwnerId"
            rules={[{ required: true }]}
          >
            <Select placeholder="Please select a sales owner" />
          </Form.Item>
        </Form>
      </Modal>
    </CompanyList>
  );
};

export default Create;
