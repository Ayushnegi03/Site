import React, { useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct, fetchLimitProducts } from "../../Redux/products/productSlice";

const ProductDialog = ({ isOpen, onClose, initialValues }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // Initialize form values when the dialog opens
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);  // Pre-fill the form if editing
    } else {
      form.resetFields();  // Reset form if adding a new product
    }
  }, [initialValues, form]);

  // Handle product add or update
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields(); // Validate form fields

      if (initialValues) {
        // Handle product update if initialValues exist
        const updatedProduct = {
          ...initialValues, // Existing product data
          ...values, // Updated form values
        };

        await updateProduct(updatedProduct._id, updatedProduct); // Dispatch update
        message.success("Product updated successfully!");
      } else {
        // Handle adding new product
        await addProduct(values); // Dispatch add
        message.success("Product added successfully!");
      }
      
      // Refresh the product list after adding or updating
       //dispatch(fetchLimitProducts());
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error("Failed to submit product:", error);
      message.error("Failed to submit product. Please try again.");
    }
  };

  return (
    <Modal
      title={initialValues ? "Edit Product" : "Add Product"}  // Dynamic title based on context
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={initialValues}  // Pass initial values for edit
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
          rules={[{ required: true, message: "Please enter the image URL" }, { type: "url", message: "Please enter a valid URL" }]}
        >
          <Input placeholder="Enter image URL" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter the product description" }]}
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
            {initialValues ? "Update Product" : "Add Product"}  {/* Change button text dynamically */}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductDialog;
