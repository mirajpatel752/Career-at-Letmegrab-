import { Button, Modal, message } from "antd";
import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import axiosInstanceAuth from "../apiServices/axiosInstanceAuth";
const Add = ({ handleOk, isModalOpen, setIsModalOpen, editData }) => {
  const [preview, setPreview] = useState([]);
  const [logo, setLogo] = useState();
  const [form] = Form.useForm();

  useEffect(() => {}, [editData]);

  const onFinish = async (values) => {
    if (!editData) {
      const encrypt = JSON.stringify({
        title: values.title,
        price: values.price,
        description: values.description,
        image: logo,
        category: values.category,
      });
      const formData = new FormData();
      formData.append("data", encrypt);
      await axiosInstanceAuth
        .post(`products`, formData)
        .then((res) => {
          if (res.status === 200) {
            message.success("success add ");
            setIsModalOpen(false);
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const encrypt = JSON.stringify({
        title: values.title,
        price: values.price,
        description: values.description,
        image: logo,
        category: values.category,
      });
      await axiosInstanceAuth
        .put(`products/${editData.id}`, encrypt)
        .then((res) => {
          if (res.status === 200) {
            message.success("success EDIT");
            setIsModalOpen(false);
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        footer={false}
        onCancel={handleOk}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            title: editData.title,
            price: editData.price,
            description: editData.description,
            category: editData.category,
          }}
          onFinish={onFinish}
        >
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
};
export default Add;
