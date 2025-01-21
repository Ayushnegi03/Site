import React, { useEffect, useState } from "react";
import { Button, Card, message } from "antd";
import ProductTable from "./Dash.Table";
import ProductDialog from "./Dash.Dialogbox";
import "./FormPage.css";
import { PlusOutlined } from "@ant-design/icons";
import { fetchLimitProducts } from "../../Redux/products/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    price: "",
    description: "",
    quantity: "",
  });
  //const productsa = useSelector((state) => console.log(state));

  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [items, setItems] = useState([]);

   

  const openDialog = () => {
    //console.log('click')
    setFormData({
      name: "",
      imageUrl: "",
      price: "",
      description: "",
      quantity: "",
    });
    setIsEdit(false);
    setIsDialogOpen(true);
  };
  
  const closeDialog = () => setIsDialogOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    try {
      const currentDateTime = new Date().toLocaleString();

      if (isEdit) {
        const updatedItems = [...items];
        updatedItems[editIndex] = { ...formData, date: currentDateTime };
        setItems(updatedItems);
        message.success("Item updated successfully!");
      } else {
        const updatedFormData = { ...formData, date: currentDateTime };
        setItems([...items, updatedFormData]);
        message.success("Item added successfully!");
      }

      setFormData({
        name: "",
        imageUrl: "",
        price: "",
        description: "",
        quantity: "",
      });
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Failed to add/update item:", err);
      message.error("An error occurred while adding/updating the item.");
    }
  };

  const handleEdit = (index) => {
    setFormData(items[index]);
    setEditIndex(index);
    setIsEdit(true);
    setIsDialogOpen(true);
  };
  
  useEffect(() => {
    const handleSearch = () => {
      dispatch(fetchLimitProducts(1, 10, searchQuery?.trim()));
    };

    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, dispatch]);

  

  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    message.success("Item deleted successfully!");
  };

  return (
    <Card className="dashboard-container">
    
      
      
      
    <Card className="primary-add">
  <div className="searching" style={{ display: "flex", alignItems: "center" }}>
    <input
      placeholder="Search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{ width: "70%", marginRight: "32px", padding: "5px" }}
    />
    {/* <Button onClick={handleSearch} style={{ marginRight: "32px" }}>
      Search
    </Button> */}
    <Card style={{ display: "flex", alignItems: "center" }}>
  <label tyle={{ marginRight: "28px"}}>
    Add_Items
  </label>
</Card>

    <button
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
      }}
      onClick={openDialog}
    >
      <PlusOutlined />
    </button>
    
  </div>
</Card>

      <ProductTable
        items={items}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
     
      <ProductDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onSubmit={handleSubmit}
        handleChange={handleChange}
        initialValues={formData}
      />
    </Card>
  );
};

export default Dashboard;

