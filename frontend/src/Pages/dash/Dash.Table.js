


import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Table, message, Modal, Card, Spin, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLimitProducts,
  deleteToProduct,
  updateProduct,
} from "../../Redux/products/productSlice";
import eventEmitter from "../../Utils/handlingEvents";
import { DeleteTwoTone, EditOutlined, LoadingOutlined } from "@ant-design/icons";
import DashUpdate from "./Dash.updateDialog";

const ProductTable = () => {
  const dispatch = useDispatch();

  const itemPagination = useSelector((state) => state.products.items);
  const products = useSelector((state) => state.products.items.products);
  const totalProducts = useSelector((state) => state.products.total);

  const [searchQuery, setSearchQuery] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const loadingIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

  const closeDialog = () => {
    setIsDialogOpen(false);
    setFormData({ name: "", description: "" }); // Reset form data
  };

  const handleSubmit = useCallback(
    (formValues) => {
      if (selectedRecord) {
        const updatedProduct = {
          ...selectedRecord,
          ...formValues,
        };
        updateProduct(updatedProduct._id, updatedProduct);
        message.success("Product updated successfully!");
        setIsDialogOpen(false);
      }
    },
    [dispatch, selectedRecord]
  );

  const loadProducts = useCallback(
    async (page, limit, searchQuery = "") => {
      try {
        setLoading(true);
        await dispatch(fetchLimitProducts(page, limit, searchQuery));
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    loadProducts(currentPage, pageSize, searchQuery); // Initial load
  }, [currentPage, pageSize, searchQuery, loadProducts]);

  useEffect(() => {
    const handleDataRefresh = () => {
      loadProducts(currentPage, pageSize, searchQuery);
    };

    eventEmitter.on("UpdateData", handleDataRefresh);
    eventEmitter.on("DeleteData", handleDataRefresh);

    return () => {
      eventEmitter.off("UpdateData", handleDataRefresh);
      eventEmitter.off("DeleteData", handleDataRefresh);
    };
  }, [currentPage, pageSize, searchQuery, loadProducts]);

  const showDeleteNotification = (record) => {
    setSelectedRecord(record);
    setShowNotification(true);
  };

  const handleDelete = useCallback(() => {
    if (selectedRecord && selectedRecord._id) {
      deleteToProduct(selectedRecord._id);
      message.success(`Product "${selectedRecord.name}" deleted successfully.`);
      setShowNotification(false);
    }
  }, [dispatch, selectedRecord]);

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const columns = useMemo(
    () => [
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
              onClick={() => {
                setFormData(record);
                setIsDialogOpen(true);
              }}
              style={{ marginRight: 8 }}
            />
            <DeleteTwoTone
              danger
              onClick={() => showDeleteNotification(record)}
            />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <Card>
      {error && <Alert message={error} type="error" showIcon closable />}
      <Spin spinning={loading} indicator={loadingIcon} tip="Loading products...">
        <Table
          dataSource={products}
          columns={columns}
          rowKey={(record) => record._id} // Ensure a unique key
          pagination={{
            current: itemPagination?.currentPage || currentPage,
            pageSize: pageSize,
            total: itemPagination?.totalProducts || totalProducts,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
          }}
          onChange={handleTableChange}
          style={{ marginTop: "30px", marginBottom: "30px" }}
        />
      </Spin>
      <Modal
        title="Confirm Deletion"
        visible={showNotification}
        onOk={handleDelete}
        onCancel={() => setShowNotification(false)}
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
        initialValues={formData}
      />
    </Card>
  );
};

export default ProductTable;
