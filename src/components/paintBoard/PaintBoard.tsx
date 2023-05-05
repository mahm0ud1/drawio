import React, { useEffect, useRef } from 'react';
import { PaintBoardContainerStyle, PaintBoardStyle } from './styles';
import {
  mxGraph,
  mxRubberband,
  mxConstants,
} from '../../mxgraphWrapper'

import {IPaintBoardProps} from './IPaintBoard';

const PaintBoard = ({ setDrawShape }: IPaintBoardProps) => {
  const containerRef = useRef(null);
  const graphRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Check if the graph has already been initialized
    if (graphRef.current) return;

    const graph = new mxGraph(containerRef.current);
    graph.setEnabled(true);
    graph.setConnectable(true);
    graph.setCellsEditable(false);
    graph.setCellsResizable(false);
    graph.setDropEnabled(true);
    graph.setPanning(true);
    graph.setTooltips(true);
    graph.setAllowLoops(false);
    graph.setMultigraph(false);
    graph.setAllowDanglingEdges(false);
    graph.centerZoom = true;

    new mxRubberband(graph);

    // Store the graph instance in the useRef
    graphRef.current = graph;

    const drawShape = (x:any, y:any, shape:any) => {
      const style = `${mxConstants.STYLE_SHAPE}=${shape};${mxConstants.STYLE_STROKECOLOR}=red;${mxConstants.STYLE_FILLCOLOR}=green;`;
      const vertex = graph.insertVertex(graph.getDefaultParent(), null, shape, x, y, 80, 80, style);
    };
    console.log(6)
    setDrawShape(drawShape)
    console.log(7)
  }, [containerRef]);

  return (
    <PaintBoardContainerStyle>
      <PaintBoardStyle
        ref={containerRef}
        style={{ width: '100%', height: '100%' }}
      ></PaintBoardStyle>
    </PaintBoardContainerStyle>
  );
}

export default PaintBoard;