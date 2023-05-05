import React, { useEffect, useRef, useState } from 'react';
import ToolsBar from '../../components/toolsBar/ToolsBar';
import PaintBoard from '../../components/paintBoard/PaintBoard';
import TestComponent from '../../components/testComponent/TestComponent';
import { DrawShape } from '../../components/paintBoard/IPaintBoard';

const BoarderPage = () => {
    const [drawShape, setDrawShape] = useState<DrawShape | null>(null);

    const drawShapeController = (x:any, y:any, shape:any) => {
        console.log("1")
        if(drawShape!=null)
        {
            console.log("2")
            drawShape(x,y,shape)
            console.log("3")
        }
        console.log("4")
    }

    return (
        <>
            <ToolsBar drawShape={drawShapeController}/>
            <PaintBoard setDrawShape={setDrawShape}/>
            <TestComponent />
        </>
    )
}

export default BoarderPage;