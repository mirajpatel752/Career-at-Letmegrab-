import { useEffect, useState } from "react";
import "./App.css";
import { Button, Card, Image, Modal, Row, Space, Table, Tag, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input, Radio  } from "antd";
import axiosInstanceAuth from "./apiServices/axiosInstanceAuth";
function App() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState([]);
  const [logo, setLogo] = useState();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const encrypt = JSON.stringify({
      title: "test product",
      price: 13.5,
      description: "lorem ipsum set",
      image: "https://i.pravatar.cc",
      category: "electronic",
    });

    const formData = new FormData();
    formData.append("data", encrypt);
    await axiosInstanceAuth
      .post(`products`, formData)
      .then((res) => {
        console.log(res,"res")
        if (res.status === 200) {
          message.success('success add ');
          setIsModalOpen(false);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const fetchData = () => {
    return fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Image",
      dataIndex: "title",
      key: "title",
      render: (_, record) => (
        <div>
          <Image width={40} src={record.image} />
        </div>
      ),
    },

    {
      title: "Product Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Product Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Product Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Product Category",
      key: "category",
      dataIndex: "category",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined />
          <DeleteOutlined />
        </Space>
      ),
    },
  ];

  const handleLogoChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setLogo(file);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Card>
        <Row justify={"end"}>
          <Button onClick={showModal}>ADD</Button>
        </Row>
        <Table columns={columns} dataSource={data} />
      </Card>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        footer={false}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="image" required>
            <div>
              <div className="image-center">
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogoChange(e)}
                />
              </div>
            </div>
          </Form.Item>
          <Form.Item name="title" label="Title" required>
            <Input placeholder="title" />
          </Form.Item>
          <Form.Item name="price" label="Price" required>
            <Input type="number" placeholder="input placeholder" />
          </Form.Item>
          <Form.Item name="description" label="Description" required>
            <Input placeholder="description" />
          </Form.Item>
          <Form.Item name="category" label="category">
            <Input placeholder="category" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default App;
