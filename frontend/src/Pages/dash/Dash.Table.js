
import React, { useEffect, useState } from "react";
import { Table, message, Modal, Card,  } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchLimitProducts, deleteToProduct, updateProduct } from "../../Redux/cart/productSlice";
import eventEmitter from "../../Utils/handlingEvents";
import { DeleteTwoTone, EditOutlined } from '@ant-design/icons';
import DashUpdate from './Dash.updateDialog.js';

const ProductTable = () => {
  const dispatch = useDispatch();
  const itemPagination = useSelector((state) => state.products.items);

  const products = useSelector((state) => state.products.items.products);

  const [showNotification, setShowNotification] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });


  const totalProducts = useSelector((state) => state.products.total); // Assume `total` is maintained in the Redux store
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [pageSize, setPageSize] = useState(10); // Items per page


  const closeDialog = () => {
    setIsDialogOpen(false); // Close the modal
  };

  const handleSubmit = (formValues) => {
    if (selectedRecord) {
      const updatedProduct = {
        ...selectedRecord,
        ...formValues,
      };
      dispatch(updateProduct(updatedProduct._id, updatedProduct));
      message.success("Product updated successfully!");
      setIsDialogOpen(false); // Close the modal after successful update
      loadProducts(); // Refresh the product list
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const loadProducts = async (page, limit) => {
    try {
      await dispatch(fetchLimitProducts(page, limit)); // Fetch products using Redux
    } catch (error) {
      console.error("Failed to fetch products:", error);
      message.error("Failed to fetch products. Please try again later.");
    }
  };

  useEffect(() => {
    loadProducts(currentPage,pageSize);
  }, [currentPage,pageSize]);
  useEffect(() => {
    const handleDelete = async () => {
      await loadProducts(); // Refresh the product list
    };

    // Add event listeners
    eventEmitter.addListener('DeleteData', handleDelete);

    return () => {
      // Cleanup listeners
      eventEmitter.removeListener('DeleteData', handleDelete);
    };
  }, [dispatch]);

  const showDeleteNotification = (record) => {
    setSelectedRecord(record);
    setShowNotification(true);
  };

  const handleDelete = () => {
    if (selectedRecord && selectedRecord._id) {
      dispatch(deleteToProduct(selectedRecord._id)); // Dispatch delete action
      message.success(`Product "${selectedRecord.name}" deleted successfully.`);
      setShowNotification(false);
      loadProducts();
    }
  };

  const handleDeny = () => {
    setShowNotification(false);
  };
  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current); // Update current page
    setPageSize(pagination.pageSize); // Update page size
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) => (
        <img
          src={imageUrl}
          alt="Product"
          style={{ width: "100px", height: "80px" }}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Date and Time",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <EditOutlined
            type="link"
            onClick={() => {
              setFormData(record); // Set selected record as form data
              setIsDialogOpen(true); // Open the modal
            }}
            style={{ marginRight: 8 }}
          />
          <DeleteTwoTone
            type="link"
            danger
            onClick={() => showDeleteNotification(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <Card>
      <Table
        dataSource={products}
        columns={columns}
        rowKey={(record) => record.id || record.key}
        pagination={{
          current: itemPagination?.currentPage,
          pageSize: pageSize,
          total: itemPagination?.totalProducts,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
        }}
        onChange={handleTableChange}
        style={{ marginTop: "30px", marginBottom: "30px" }}
      />
      <Modal
        title="Confirm Deletion"
        visible={showNotification}
        onOk={handleDelete}
        onCancel={handleDeny}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to delete{" "}
          <b>{selectedRecord?.name || "this product"}</b>?
        </p>
      </Modal>

      <DashUpdate
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onSubmit={handleSubmit}
        handleChange={handleChange}
        initialValues={formData}
      />
    </Card>
  );
};

export default ProductTable;
