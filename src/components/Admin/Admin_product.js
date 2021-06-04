import React ,{useState,useEffect} from "react"
import {Table,Modal,Button,Form} from 'react-bootstrap';
import "./Admin_home.css"
import {db} from '../../firebase'
import Admin_navbar from './Admin_navbar'


function Example() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  

  const [key, setKey] = useState("");
  const [category, setCategory] = useState("");
  const [title, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [desc, setDesc] = useState("");
  const [img,setImg] =useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("products")
      .add({
        key:key,
        category:category,
        title:title,
        price:price,
        qty:qty,
        desc:desc,
        img:img,
      })
      .then(() => {
        handleClose(false);
        setLoader(false);
        alert("Your product has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setKey("");
    setCategory("");
    setPrice("");
    setQty("");
    setName("");
    setDesc("");
    setImg("");
    
    };
      

    //  FECTH DATA

     const [pro,setPro]=useState([])
     window.addEventListener('load', () => {
      fetchPro();
    });
     const fetchPro=async()=>{
       const response=db.collection('products');
       const data=await response.get();
       data.docs.forEach(item=>{
        setPro(pro=>[...pro,item.data()])
       })
     }
     useEffect(() => {
       fetchPro();
     }, [])

   

    return (
      <>
<div style={{backgroundColor:" #e1e5ea"}}>
 <Admin_navbar/>
<div>
   {/* MENU */}
  <div className="row col-md-12">
      <div className="col-md-3">
      <dl className="menu_list">
          <dd className="menu_heading">Menu</dd>
          <dd><a href="/Admin_product" style={{color:"#bd965b"}} className="admin_link">Add Product</a></dd>
          <dd><a href="/Admin_contact" className="admin_link">Contact Us</a></dd>
      </dl>
      </div>

      {/* PRODUCT */}
      <div className="category_menu col-md-9 ">
         <div className="row category_row">
          <div className="category_heading col-md-10">Product</div>
          <div className="col-md-2 " ><button onClick={handleShow} className="add_category">Add Product</button></div>
         </div>
         <div className="col-md-12 p-3 category_table">
         <Table responsive hover>
           <thead>
              <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>img</th>
              <th>Edit</th>
              <th>Delete</th>
              </tr>
           </thead>
           <tbody>
           { pro && pro.map(products=>{
            return(
            <tr>
              <td>{products.key}</td>
              <td>{products.category}</td>
              <td>{products.title}</td>
              <td>{products.desc}</td>
              <td>{products.price}</td>
              <td>{products.qty}</td>
              <td>{products.img}</td>
              <td><Button className="btn-dark">Edit</Button></td>
              <td><Button className="btn-dark">Delete</Button></td>
            </tr> 
            
        )}
           )
            }


           </tbody>
           </Table>
         </div>
      </div>
  </div>
</div>
</div>
{/* MODAL FORM */}
<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group id="key">
              <Form.Label>Id</Form.Label>
              <Form.Control type="text"  required placeholder="Enter id"  value={key} onChange={(e) => setKey(e.target.value)}/>
            </Form.Group>
            <Form.Group id="category">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" required placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Click to Choose</option>
            <option>Fashion</option>
            <option>Electronics</option>
            <option>Grocery</option>
             </Form.Control>
             </Form.Group>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text"  required placeholder="Enter Name"  value={title} onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group id="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows="3" required placeholder="Type a Description"  value={desc} onChange={(e) => setDesc(e.target.value)}/>
            </Form.Group>
            <Form.Group id="price">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text"  required placeholder="Enter Price"  value={price} onChange={(e) => setPrice(e.target.value)}/>
            </Form.Group>
            <Form.Group id="qty">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="text"  required placeholder="Enter Quantity"  value={qty} onChange={(e) => setQty(e.target.value)}/>
            </Form.Group>
            <Form.Group id="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="string"  required placeholder="Upload Image"  value={img} onChange={(e) => setImg(e.target.value)}/>
            </Form.Group>
            <Button  className="w-100 mt-3"  style={{ background: loader ? 'afb9c8' : '#34656d' }} type="submit">
              Submit
            </Button>
            </Form>
         </Modal.Body> 
      </Modal>
</>
    );
      
}
export default Example;