import React, { useEffect, useRef } from 'react';
import DropDownMenu from '../dropDownMenu/DropDownMenu';
import { DrawShape } from '../paintBoard/IPaintBoard';

const ToolsBar = ({drawShape}:{drawShape:DrawShape|null}) => {

    const drawShapeFunction = () => {
        if(drawShape!=null)
        {
            drawShape(5,5,"cicle");
        }
    }

    return (
    <>
        <DropDownMenu />
        <div onClick={drawShapeFunction}>
            Click Me To Draw
        </div>
    </>
    )
}

export default ToolsBar;