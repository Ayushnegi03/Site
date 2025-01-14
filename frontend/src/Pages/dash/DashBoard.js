
import React, { useState } from "react";
import { Button, Card, message } from "antd";
import ProductTable from "./Dash.Table";
import ProductDialog from "./Dash.Dialogbox";
import "./FormPage.css";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    price: "",
    description: "",
    quantity: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [items, setItems] = useState([]);

  const openDialog = () => {
    console.log('click')
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
  
  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    message.success("Item deleted successfully!");
  };

  return (
    <Card className="dashboard-container">
    
      {/* <h2 className="dashboard-heading" style={{textAlign:"center"}}>Dashboard</h2> */}
      <Card className="primary-add">
      <div className="Searching" style={{padding:"10px"}}>
      <input placeholder="Search"/>
      <Button>Search</Button>
      </div>
      <Button type="primary" onClick={openDialog}>
        +
      </Button>
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

