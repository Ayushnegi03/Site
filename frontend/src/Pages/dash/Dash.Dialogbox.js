import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { addProduct } from "../../Redux/cart/productSlice"; // Import addProduct function
import { useDispatch } from "react-redux";

const ProductDialog = ({ isOpen, onClose, onSubmit, initialValues }) => {
  const dispatch = useDispatch(); // Correct usage of useDispatch hook
  const [form] = Form.useForm();

  // Initialize form values when the dialog opens
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = async (values) => {
    try {
      console.log("Form Values:", values);

      // Dispatch addProduct to Redux
      const result = await dispatch(addProduct(values)) // Using unwrap to handle potential async thunks
      console.log("Redux Result:", result);

      message.success("Product added successfully!");

      // Call parent-provided onSubmit handler if it exists
      if (onSubmit) {
        await onSubmit(values);
      }

      form.resetFields(); // Clear form
      onClose(); // Close modal
    } catch (error) {
      message.error("Failed to save product. Please try again.");
      console.error("Error in ProductDialog:", error);
    }
  };

  return (
    <Modal
      title={"Add Product"}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={initialValues}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the product name" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="imageUrl"
          rules={[
            { required: true, message: "Please enter the image URL" },
            { type: "url", message: "Please enter a valid URL" },
          ]}
        >
          <Input placeholder="Enter image URL" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please enter the product description" },
          ]}
        >
          <Input.TextArea placeholder="Enter product description" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter the price" }]}
        >
          <Input type="number" placeholder="Enter product price" />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please enter the quantity" }]}
        >
          <Input type="number" placeholder="Enter product quantity" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {"Add Product"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductDialog;
