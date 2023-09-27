import './comments.css';
import Nav from "../../../components/Nav/Nav";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

function CommentsPage(){
    const {tid} =useParams();
    return(
        <Nav/>
    )
}

export default CommentsPage; 