"use strict";

import React, { Fragment } from "react";
import ReactDOM from 'react-dom';
import Ishop from './components/ishopBlock'

let itemsArr=require('./items.json');
let shopName = "I`shop store" 


ReactDOM.render (
   <Ishop brend = {shopName} items = {itemsArr} mode={0}/>,
   document.getElementById("container")
)