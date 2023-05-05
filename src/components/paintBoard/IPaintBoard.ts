export type DrawShape = (x:any, y:any, shape:any) => void;

export interface IPaintBoardProps {
    setDrawShape: (fn: DrawShape) => void;
}