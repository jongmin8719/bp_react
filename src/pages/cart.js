import { Table } from 'react-bootstrap'
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";

let Cart = () => {
    return(
        <Table>
            <thead>
                <tr>
                <th>#</th>
                <th>상품명</th>
                <th>수량</th>
                <th>변경하기</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>안녕</td>
                <td>안녕</td>
                <td>안녕</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default Cart;