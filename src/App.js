import { Button, Nav, Navbar, Container, Row, Col } from 'react-bootstrap'
// import mainBg from './img/bg.png'
import './App.css';
import { useEffect, useState } from 'react';
import data from './data.js';
import Dteail from './pages/detail.js';
import Cart from './pages/cart.js';
import { Route, Routes, Link , useNavigate, Outlet, useParams } from 'react-router-dom';
import axios from 'axios';
import { click } from '@testing-library/user-event/dist/click.js';


function App() {
let [shoes, setShoes] = useState(data)
let navi = useNavigate();
let clickCnt = 0;

  return (
    <div className='App'>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick ={()=>{ navi('/') }}>MainShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick ={()=>{ navi('/') }}>Home</Nav.Link>
            <Nav.Link onClick ={()=>{ navi('/cart') }}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'></div>
            <div className='sort-btn'>
              <button type='button'
                className="sort-btn" onClick={ ()=>{
                  let copyShoes = [...shoes];
                  copyShoes.reverse();
    
                  setShoes(copyShoes)
                }}
              >정렬버튼</button>
            </div>
            <Container>
              <Row className='product-box'>
                <ProductItem shoes={ shoes } />
              </Row>
              {
              /* 버튼 1회 클릭 당 3개씩 추가 ( 1,2 )까지, 3번째 누르면 알럿창 노출( 상품이 없어요 ) */
              // 버튼 클릭 시 로딩 이미지 노출 호출 완료 시 로딩 이미지 제거
              }
              <button type="button"
              onClick={ () =>{

                if(clickCnt === 0){
                  let itemUrl = axios.get(`https://codingapple1.github.io/shop/data2.json`);
                  itemUrl.then((item)=>{
                    let shoesCopy = [...shoes];
                    shoesCopy.push(...item.data);
                    setShoes(shoesCopy)
                  })
                  clickCnt += 1;
                }else if(clickCnt === 1){
                  let itemUrl = axios.get(`https://codingapple1.github.io/shop/data3.json`);
                  itemUrl.then((item)=>{
                    let shoesCopy = [...shoes];
                    shoesCopy.push(...item.data);
                    setShoes(shoesCopy)
                  })
                }
                
                console.log(clickCnt)

              } }
              >버튼</button>
            </Container>
          </>
        } />
        <Route path='/detail/:id' element={ <Dteail shoes={shoes} /> }>
          <Route path='About' element={ <About />} />
        </Route>
        <Route path='/cart' element={ <Cart /> } />
        <Route path='/event' element={ <Event />}>
          <Route path='one' element={<div>첫 주문 양배추 서비스!</div>} />
          <Route path='two' element={<div>생일기념 쿠폰받기!</div>} />
        </Route>

        <Route path='*' element={ <div>페이지없다?</div> }/>
      </Routes>
    </div>
  )
}


let Event = ()=>{
  return (
    <div>
      <div>오늘의 이벤트는?</div>
      <Outlet />
    </div>
  )
}

let About = ()=>{
  return (
    <div>
      <h4>회사정보임</h4>
    </div>
  )
}


function ProductItem(props){
  return props.shoes.map((item, idx) => {
      return (
        <Col className='product__item' key={ idx }>
          <Link to={'/detail/' + (item.id)}>
            <img 
              src={"https://codingapple1.github.io/shop/shoes" + ( item.id + 1 ) + ".jpg"} 
              alt="" 
              style={ {width: '100%'} } />
            <h4>{ item.title }</h4>
            <p>{ item.content}</p>
            <p>{ item.price}</p>
          </Link>
        </Col>
      )
    })
  }

export default App;
