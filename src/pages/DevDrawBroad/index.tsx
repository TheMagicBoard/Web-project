import { Component, createSignal, onCleanup, onMount } from "solid-js";
import {default as DrawBroad, DrawBroadController, DrawPoint, TouchType} from "../../widgets/DrawBroad";

const DevDrawBroad: Component = () => {
    const [currentPoint, setCurrentPoint] = createSignal<DrawPoint>();
    const [hasForce, setHasForce] = createSignal<boolean>(false);
    const [pressure, setPressure] = createSignal<number>(0);
    const [touchType, setTouchType] = createSignal<TouchType>();
    const broadCtl = new DrawBroadController('blue', 20);

    return <>
        <p style="position: absolute; z-index: 1;" class="noselect">
            Current Point: (x: {currentPoint()?.x}, y: {currentPoint()?.y}, lineWidth: {currentPoint()?.lineWidth}, color: {currentPoint()?.color.toString()})<br />
            hasForce: {String(hasForce())}<br />
            Pressure: {pressure()}<br />
            Touch Type: {touchType()}<br />
            Scroll Range X: {broadCtl.scrollCtl.getRangeX().toString()}<br />
            Scroll Range Y: {broadCtl.scrollCtl.getRangeY().toString()}<br />
        </p>
        <DrawBroad
            onStart={(stroke, ev) => {
                setCurrentPoint(stroke[stroke.length-1]);
                setHasForce(ev.hasForce);
                setPressure(ev.pressure);
            }}
            onDrawing={(stroke, ev) => {
                setCurrentPoint(stroke[stroke.length-1]);
                setHasForce(ev.hasForce);
                setPressure(ev.pressure);
            }}
            onEnd={(ev) => {
                setCurrentPoint();
                setHasForce(ev.hasForce);
                setPressure(ev.pressure);
            }}
            onTouchTypeChanged={setTouchType}
            ctl={broadCtl}
            width={3000}
            height={3000}
        />
    </>
}

export default DevDrawBroad;
