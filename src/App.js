import { useEffect, useState } from "react";
import "./App.css";
import {
  Button,
  Card,
  Image,
  Modal,
  Row,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Add from "./modal/addModal";
import axiosInstanceAuth from "./apiServices/axiosInstanceAuth";
const { confirm } = Modal;

function App() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [editData, setEditData] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const onChengEdit = (data) => {
    setEditData(data);
    setIsModalEdit(true);
  };

  const fetchData = () => {
    return fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  const showConfirm = (data) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      onOk() {
        fetch(`https://fakestoreapi.com/products/${data.id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((json) => message.success("success DELETE "));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
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
          <EditOutlined onClick={() => onChengEdit(record)} />
          <DeleteOutlined onClick={() => showConfirm(record)} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card>
        <Row justify={"end"}>
          <Button onClick={showModal}>ADD</Button>
        </Row>
        <Table columns={columns} dataSource={data} />
      </Card>
      {isModalOpen && (
        <Add
          handleOk={handleOk}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {isModalEdit && (
        <Add
          handleOk={() => setIsModalEdit(false)}
          isModalOpen={isModalEdit}
          editData={editData}
          setIsModalOpen={setIsModalEdit}
        />
      )}
    </>
  );
}

export default App;
