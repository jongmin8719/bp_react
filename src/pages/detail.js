import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";

let EventBx = styled.div`
    font-size : 30px;
`;

let ItemDetail = (props) => {
    let [alert, setAlert] = useState(true);
    let { id } = useParams();
    let [inputValue, setInputValue] = useState('');
    let [opacity, setOpacity] = useState('');


    useEffect(()=>{
        let timer0 = setTimeout(()=>{
            setOpacity('end')
        }, 50)
        let timer = setTimeout(()=>{
            setAlert(false);
        }, 2000)
        if(isNaN(inputValue) === true){
            console.log('숫자만 쫌')
        }

        return () =>{
            setOpacity('start');
            clearTimeout(timer);
        }
    }, [inputValue, props])

    let filter = props.shoes.find(function(item){
        return item.id === Number(id)
    })

    return(
        <div className="container">
            <div className={'row ' + opacity }>
                {
                    alert === true ?
                    <EventBx className="timer">2초뒤 행사끝</EventBx> : null
                }
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes" + ( filter.id + 1 ) + ".jpg"} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{ filter.title }</h4>
                    <p>{ filter.content }</p>
                    <p>{ filter.price }</p>
                    <button className="btn btn-danger">주문하기</button> 
                </div>
                <input type="text" 
                    onInput={ (e)=>{
                        setInputValue(e.target.value)
                    }
                }
                />
            </div>
            <Outlet />
        </div>
    )
}

export default ItemDetail;