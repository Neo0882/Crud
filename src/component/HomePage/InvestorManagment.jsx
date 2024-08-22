import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Row, Col, Modal, Form, Input, Select } from "antd";

const { Option } = Select;

const InvestorManagment = () => {
  const getData = async () => {
    try {
      const res = await axios.get(
        "https://dev-retail.jiddiy.uz/services/retail-admin/api/investors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      return res.data.data.content;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const editData = async (id, updatedData) => {
    try {
      await axios.put(
        `https://dev-retail.jiddiy.uz/services/retail-admin/api/investors/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("Data updated successfully");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(
        `https://dev-retail.jiddiy.uz/services/retail-admin/api/investors/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("Data deleted successfully");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const HomePage = () => {
    const [investorsData, setInvestorsData] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getData();
          setInvestorsData(data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchData();
    }, []);

    const handleEdit = (record) => {
      setEditingId(record.id);
      form.setFieldsValue(record);
      setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
      try {
        await deleteData(id);
        setInvestorsData(investorsData.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const handleModalOk = async () => {
      try {
        const values = await form.validateFields();
        await editData(editingId, values);
        setInvestorsData(
          investorsData.map((item) =>
            item.id === editingId ? { ...item, ...values } : item
          )
        );
        setIsModalVisible(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const handleModalCancel = () => {
      setIsModalVisible(false);
    };

    const columns = [
      {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName",
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
      },
      {
        title: "Actions",
        key: "actions",
        render: (text, record) => (
          <>
            <Button onClick={() => handleEdit(record)}>Edit</Button>
            <Button onClick={() => handleDelete(record.id)} danger>
              Delete
            </Button>
          </>
        ),
      },
    ];
  };

  return (
    <>
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <Row justify="space-between" style={{ marginBottom: "20px" }}>
          <Button type="primary">Filter</Button>
          <Button type="primary">Add New</Button>
        </Row>
        <Table dataSource={investorsData} columns={columns} rowKey="id" />
      </div>

      {/* Модальное окно для редактирования */}
      <Modal
        title="Edit Investor"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Please enter the first name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please enter the last name" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default InvestorManagment;
