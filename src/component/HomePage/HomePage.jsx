import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  Table,
  Modal,
  notification,
} from "antd";
import axios from "axios";
import { useColumns } from "./useColumns";

const { Option } = Select;

const HomePage = () => {
  const [createForm] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [investorsData, setInvestorsData] = useState([]);
  const [filteredInvestorsData, setFilteredInvestorsData] = useState([]);
  const [currentInvestor, setCurrentInvestor] = useState(Object | null);

  const [filterValues, setFilterValues] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    nickname: "",
    username: "",
    passportSeries: "",
    passportNumber: "",
    currency: "",
    amount: "",
    phone: "",
  });

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(
        `https://dev-retail.jiddiy.uz/services/retail-admin/api/investors/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setCurrentInvestor(res.data.data);
      editForm.setFieldsValue(res.data.data);
      setEditModal(true);
    } catch (error) {
      console.error("Error fetching investor data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://dev-retail.jiddiy.uz/services/retail-admin/api/investors/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      notification.success({ message: "Investor deleted successfully!" });
      const updatedData = await axios.get(
        "https://dev-retail.jiddiy.uz/services/retail-admin/api/investors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setInvestorsData(updatedData.data.data.content);
    } catch (error) {
      notification.error({ message: "Error deleting investor." });
      console.error("Error deleting investor:", error);
    }
  };

  const editInvestor = async (values) => {
    try {
      await axios.put(
        `https://dev-retail.jiddiy.uz/services/retail-admin/api/investors/${currentInvestor.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      notification.success({ message: "Investor updated successfully!" });
      setEditModal(false);
      editForm.resetFields();
      const updatedData = await axios.get(
        "https://dev-retail.jiddiy.uz/services/retail-admin/api/investors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setInvestorsData(updatedData.data.data.content);
    } catch (error) {
      notification.error({ message: "Error updating investor." });
      console.error("Error updating investor:", error);
    }
  };

  const createInvestor = async (values) => {
    try {
      await axios.post(
        "https://dev-retail.jiddiy.uz/services/retail-admin/api/investors",
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      notification.success({ message: "Investor created successfully!" });
      createForm.resetFields();
      handleCancelCreate();
      const updatedData = await axios.get(
        "https://dev-retail.jiddiy.uz/services/retail-admin/api/investors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setInvestorsData(updatedData.data.data.content);
    } catch (error) {
      notification.error({ message: "Error creating investor." });
      console.error("Error creating investor:", error);
    }
  };

  const columns = useColumns(handleEdit, handleDelete);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://dev-retail.jiddiy.uz/services/retail-admin/api/investors",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setInvestorsData(res.data.data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = investorsData.filter((investor) =>
      Object.entries(filterValues).every(
        ([key, value]) =>
          value === "" ||
          (typeof investor[key] === "number"
            ? investor[key].toString()
            : investor[key]
            ? investor[key].toString().toLowerCase()
            : ""
          ).includes(value.toLowerCase())
      )
    );
    setFilteredInvestorsData(filteredData);
  }, [filterValues, investorsData]);

  const handleFilter = () => {
    setFilterModal(true);
  };

  const handleFilterCancel = () => {
    setFilterModal(false);
  };

  const handleFilterChange = (changedValues) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      ...changedValues,
    }));
  };

  const handleCancelCreate = () => {
    setCreateModal(false);
  };

  const handleCreate = () => {
    setCreateModal(true);
  };

  return (
    <>
      <div>
        <Row justify="space-between" style={{ marginBottom: "20px" }}>
          <Button type="primary" onClick={handleFilter}>
            Filter
          </Button>
          <Button type="primary" onClick={handleCreate}>
            Add New
          </Button>
        </Row>

        <Table dataSource={investorsData} columns={columns} />
      </div>

      <Modal
        title="Add New Investor"
        open={createModal}
        onCancel={handleCancelCreate}
        footer={null}
      >
        <Form form={createForm} onFinish={createInvestor} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input placeholder="Enter your first name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
              >
                <Input placeholder="Enter your last name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="middleName" label="Middle Name">
                <Input placeholder="Enter your middle name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="nickname" label="Nickname">
                <Input placeholder="Enter your nickname" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="username" label="Username">
                <Input placeholder="Enter your username" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="passportSeries" label="Passport Series">
                <Input placeholder="Enter your passport series" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="passportNumber" label="Passport Number">
                <Input placeholder="Enter your passport number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="currency" label="Currency">
                <Select placeholder="Select a currency">
                  <Option value="USD">USD</Option>
                  <Option value="EUR">EUR</Option>
                  <Option value="RUB">RUB</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="amount"
                label="Amount"
                rules={[{ required: true, message: "Please enter an amount" }]}
              >
                <Input placeholder="Enter amount" type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Row>
        </Form>
      </Modal>

      <Modal
        title="Edit Investor"
        open={editModal}
        onCancel={() => setEditModal(false)}
        footer={null}
      >
        <Form form={editForm} onFinish={editInvestor} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input placeholder="Enter your first name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
              >
                <Input placeholder="Enter your last name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="middleName" label="Middle Name">
                <Input placeholder="Enter your middle name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="nickname" label="Nickname">
                <Input placeholder="Enter your nickname" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="username" label="Username">
                <Input placeholder="Enter your username" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="passportSeries" label="Passport Series">
                <Input placeholder="Enter your passport series" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="passportNumber" label="Passport Number">
                <Input placeholder="Enter your passport number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="currency" label="Currency">
                <Select placeholder="Select a currency">
                  <Option value="USD">USD</Option>
                  <Option value="EUR">EUR</Option>
                  <Option value="RUB">RUB</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="amount"
                label="Amount"
                rules={[{ required: true, message: "Please enter an amount" }]}
              >
                <Input placeholder="Enter amount" type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Row>
        </Form>
      </Modal>

      <Modal
        title="Filter Investors"
        open={filterModal}
        onCancel={handleFilterCancel}
        footer={null}
        width={1800}
      >
        <Form
          form={filterForm}
          onValuesChange={handleFilterChange}
          initialValues={filterValues}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="firstName" label="First Name">
                <Input placeholder="Enter first name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="lastName" label="Last Name">
                <Input placeholder="Enter last name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="middleName" label="Middle Name">
                <Input placeholder="Enter middle name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="nickname" label="Nickname">
                <Input placeholder="Enter nickname" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="username" label="Username">
                <Input placeholder="Enter username" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="passportSeries" label="Passport Series">
                <Input placeholder="Enter passport series" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="passportNumber" label="Passport Number">
                <Input placeholder="Enter passport number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="currency" label="Currency">
                <Select placeholder="Select currency">
                  <Option value="USD">USD</Option>
                  <Option value="EUR">EUR</Option>
                  <Option value="RUB">RUB</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="amount" label="Amount">
                <Input placeholder="Enter amount" type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="Phone">
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Row gutter={16} style={{ marginTop: "20px" }}>
          <Col span={24}>
            <h3>Filtered Results</h3>
            <Table
              dataSource={filteredInvestorsData}
              columns={columns}
              pagination={false}
              rowKey="id"
              style={{overflow:"scroll"}}
              />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default HomePage;
