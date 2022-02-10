import React,{useState, useEffect} from 'react'
import {
    Navbar,
    NavbarBrand,
    Button,
    Badge,
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Alert,
    Table    } from 'reactstrap';
import { connect } from 'react-redux';
import bgimage from '../asset/images/shopping_img.jpg'

const images = require.context('../asset/shop', true);

function Dashboard(props) {
    const [modal, setModal] = useState(false);
    const [itemsList, setItemList] = useState([])
    const [quantity, setQuantity] = useState();
    const [totalAmount, settotalAmount] = useState();
    const [viewCart, setviewCart] = useState(false);
    const [cartList, setCartList] = useState([])

    useEffect(()=>{
                  
    },)


    const toggle = () => {
        setModal(!modal)

        const sessionlist =  sessionStorage.getItem("itemlist");
        if(sessionlist){
            const seslist = JSON.parse(sessionlist) 
            sessionStorage.setItem("itemlist", JSON.stringify(seslist))
            setItemList(seslist)
            setQuantity(quantityCheck(seslist))
            settotalAmount(amountCheck(seslist))
            
        }
        else{
            console.log("else")
            setItemList(props.items)
            setQuantity(quantityCheck(props.items))
            settotalAmount(amountCheck(props.items))
            

        }
    }

    const viewCartCheck = () => {
        setviewCart(!viewCart)
        var arr = itemsList
        const quantityFilter = arr.filter( x => x.quantity !== 0 ); 
        setCartList(quantityFilter)
    }

    const quantityCheck = (arr) => {
        const calculateTotalQuantity = arr.map(value => value.quantity);
        const totalQuantity =  calculateTotalQuantity.reduce((a, b) => a + b, 0)
        return totalQuantity
    }

    const amountCheck = (arr) => {
        const calculateTotalQuantity = arr.map(value => value.quantity);
        const calculateTotalAmount = arr.map(value => value.price);
        const finalTotalAmount = calculateTotalQuantity.reduce(function(r,a,i){return r+a*calculateTotalAmount[i]},0);
        return finalTotalAmount
    }
    
    const addItem = (item) => {
        var arr = itemsList
        var prevQuantity = item.quantity

        const objIndex = arr.findIndex((obj => obj.id == item.id));
        arr[objIndex].quantity = prevQuantity + 1
        setItemList(arr)
        setQuantity(quantityCheck(arr))
        settotalAmount(amountCheck(arr))

        sessionStorage.setItem("itemlist", JSON.stringify(arr))
        
    }

    const removeItem = (item) => {
        var arr = itemsList
        var prevQuantity = item.quantity
        if(prevQuantity < 1) {
            alert("Quantity is Zero");
        }
        else{
            const objIndex = arr.findIndex((obj => obj.id == item.id));
            arr[objIndex].quantity = prevQuantity - 1
            setItemList(arr)
            setQuantity(quantityCheck(arr))
            settotalAmount(amountCheck(arr))

            sessionStorage.setItem("itemlist", JSON.stringify(arr))

        }

    }

    const removeAllItem = (item) => {
        var arr = itemsList
        const objIndex = arr.findIndex((obj => obj.id == item.id));
        arr[objIndex].quantity = 0
        setItemList(arr)
        setQuantity(quantityCheck(arr))
        settotalAmount(amountCheck(arr))

        sessionStorage.setItem("itemlist", JSON.stringify(arr))

    }


    return (
        <div>
            <Navbar color="primary" light expand="md">
                <NavbarBrand className='text-white'>Shopping Application</NavbarBrand>
                <Badge  onClick={toggle} color="danger" className="pointer"><i className="fas fa-shopping-cart fa-2x"></i></Badge>
            </Navbar>
            
            <img src={bgimage} className="img-fluid" alt="Responsive image"></img>
            
            <Modal backdrop="static" isOpen={modal} toggle={toggle} style={{minWidth:'60vw', maxWidth:'auto'}}>
                <ModalHeader toggle={toggle} cssModule={{'modal-title': 'w-100 text-center'}}> {quantity} Item is Added To Your Cart</ModalHeader>
                {viewCart ? 
                <ModalBody>
                    <Table>
                        <thead>
                        <tr>
                            <th>Sno</th>
                            <th>Product Name</th>
                            <th>SKU</th>
                            <th>Price/unit</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                            {cartList.map((item,i)=>{
                                return(
                                    <tr>
                                        <th>{i+1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.sku}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.quantity * item.price}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Alert color="secondary" className='d-flex justify-content-between'>
                    <h4>Total Amount To Be Paid</h4>
                    <h4>$ {totalAmount}</h4>
                </Alert>
                </ModalBody>
                 
                :
                <ModalBody>
                    {itemsList.map((item,i)=>{
                        return(
                            <div key={i} className="row d-flex align-items-center mb-4">
                                <div className="col-lg-3">
                                    <img className="shopimg" src={images(`./${item.image}.jpg`)} width="200" height="150"/>
                                </div>
                                <div className="col-lg-6">
                                    <h3>{item.sku}</h3>
                                    <p>{item.name}</p>
                                </div>
                                <div className="col-lg-3">
                                    <h4>$ {item.price} / each</h4>
                                    <div className="d-flex">
                                        <div className="item-control">
                                            <i class="fas fa-minus p-3 pointer" onClick={() => {removeItem(item)}}></i>
                                            <span>{item.quantity}</span>
                                            <i class="fas fa-plus p-3 pointer" onClick={() => {addItem(item)}}></i>
                                        </div>
                                        &nbsp;&nbsp;
                                        <i class="fas fa-times text-danger pt-3 pointer" onClick={() => {removeAllItem(item)}}></i>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                
                <Alert color="secondary" className='d-flex justify-content-between'>
                    <h4>Subtotal</h4>
                    <h4>$ {totalAmount}</h4>
                </Alert>
                </ModalBody>
                }
                
                <ModalFooter>
                    {viewCart ? 
                    <Button color="danger" onClick={viewCartCheck}>Back</Button>
                    :
                    <Button color="primary" onClick={viewCartCheck}>View Cart</Button>
                    }
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
        
    )
}

const mapStateToProps = state => {
    return {
        items: state.items
    } 
}


export default connect(mapStateToProps)(Dashboard) 