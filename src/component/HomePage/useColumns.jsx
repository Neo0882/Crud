import { Button } from "antd";

export const useColumns = (handleEdit, handleDelete) => {
  return [
    {
      title: "FirstName",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "MiddleName",
      dataIndex: "middleName",
      key: "middleName",
    },
    {
      title: "NickName",
      dataIndex: "nickname",
      key: "nickname",
    },
    {
      title: "UserName",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "PassportSeries",
      dataIndex: "passportSeries",
      key: "passportSeries",
    },
    {
      title: "PassportNumber",
      dataIndex: "passportNumber",
      key: "passportNumber",
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Edit",
      key: "edit",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleEdit(record.id)}>
          Edit
        </Button>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (text, record) => (
        <Button danger onClick={() => handleDelete(record.id)}>
          Delete
        </Button>
      ),
    },
  ];
};
